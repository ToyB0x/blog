---
title: CloudRunにTurborepo内のNestjsをデプロイ
description: CloudRunにTurborepo内のNestjsをデプロイした際のメモ
publishDate: 2022-7-1
tags: ["GCP", "CloudRun"]
---

## TL;DL

- GAE と違ってデフォルトのデプロイ方法だけでは API はパブリックに公開されない
- 慣れないうちは調整のため何度かデプロイすることになるので、軽いイメージで試す

## 大まかな流れ

### API サーバの準備

API サーバをポート 8080 固定で Listen or 環境変数`process.env.PORT`から PORT 取得

```ts
// 公式のサンプルコード
// ref: https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World'
  res.send(`Hello ${name}!`)
})

// process.env.PORTからポート取得
const port = parseInt(process.env.PORT) || 8080
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`)
})
```

### Dockerfile を書く

#### Port 指定について

アプリ側で Listen しておけばコンテナ側では expose やポートバインディングは不要です。

#### Ignore 指定について

`.dockerignore`や`.gcloudignore`を利用して不要なファイルのアップロードやコンテナ化を防ぎましょう。

#### モノレポ対応について

以下の Dockerfile のように必要最低限のファイルのみコピーすることでコンテナ化が高速になります。
Turborepo 内の NestJS の場合、主に必要なファイルは以下です

- モノレポルートの package.json
- turborepo の利用に不可欠な turbo.json
- apps の中の API サーバ (他の apps のファイルは高速化のためコピーしない)
- 内部 packages は apps で import しているので/packages 丸ごとコピー  
  (API サーバで import している内部 packages だけコピーすればより高速化するはずです)

#### マルチステージビルドについて

サンプル例では 200MB ほどサイズ削減できました。
![multi-stage-build](/posts/cloudrun/multi-stage-build.png)

#### Dockerfile について

以下にモノレポ(Turborepo)配下の NestJS コンテナ化の例を記載しました。

```dockerfile
# マルチステージビルドを利用してコンテナイメージを小さくします
FROM node:16 as build

WORKDIR /opt/turborepo

# モノレポ全体のpackage.jsonとturbo.jsonをコピー
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY turbo.json turbo.json

# APIサーバのファイルをコピー
COPY apps/api apps/api

# APIサーバで利用している内部パッケージをコピー
COPY packages packages

# 依存パッケージのインスール
RUN yarn install --frozen-lockfile

# APIサーバのビルド(コード変更が多い箇所なので最後のステップで実行)
RUN yarn turbo run build --scope="api"


FROM node:16
WORKDIR /opt/turborepo

# APIサーバのビルド結果とnode_modulesをコピー
COPY --from=build /opt/turborepo/apps/api/dist apps/api/dist
COPY --from=build /opt/turborepo/apps/api/node_modules apps/api/node_modules

# 内部パッケージとrootに巻き上げられたnode_modulesのコピー
COPY --from=build /opt/turborepo/packages packages
COPY --from=build /opt/turborepo/node_modules node_modules

WORKDIR /opt/turborepo/apps/api
CMD [ "node", "dist/main.js" ]
```

### cloudbuild.yaml を書く

以下のステップを含む cloudbuild.yaml を書く

- コンテナイメージのビルド
- コンテナイメージを GCR に Push
- CloudRun のデプロイ(上記で GCR に Push したイメージを利用)

```yaml
# service-nameは任意のCloudrunサービス名名
# service-image-nameは任意のコンテナイメージ名

steps:
  # Build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'asia.gcr.io/$PROJECT_ID/service-image-name', '.']
  # Push the container image to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'asia.gcr.io/$PROJECT_ID/service-image-name']
  # Deploy container image to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    # --allow-unauthenticatedで公開（未認証）アクセスを許可
    # ref: https://cloud.google.com/run/docs/authenticating/public?hl=ja#command-line
    args: [
        'run',
        'deploy',
        'service-name', # サービス名
        '--image',
        'asia.gcr.io/$PROJECT_ID/service-image-name',
        '--region',
        'asia-northeast1',
        '--max-instances',
        '10',
        # --allow-unauthenticatedで公開（未認証）アクセスを許可 (許可範囲変更には初回デプロイ後数分かかる)出来るはずだが以下理由で適用されない場合があるためGUI等で設定
        # ref1: https://stackoverflow.com/a/68085858
        # ref2: https://cloud.google.com/sdk/gcloud/reference/run/deploy
        # '--allow-unauthenticated',
      ]

images:
  - asia.gcr.io/$PROJECT_ID/service-image-name
# マシンスペックを1段階上げて高速化したい場合(デフォルトだと1vcpu)
# options:
#  ref: https://cloud.google.com/build/pricing?hl=ja
#  machineType: 'E2_HIGHCPU_8'
```

#### Cloudbuild から CloudRun をデプロイする場合の権限

権限足りていない場合はデプロイ時のエラーメッセージを元に以下等を追加して下さい。

- Cloud Build サービス アカウント (CloudBuildAPI 有効化時にデフォルトで追加されているはず)
- Storage オブジェクト閲覧者 (Cloudbuild 用にアップロードしたソースコードの閲覧に必要)
- Cloud Run デベロッパー (CloudRun のデプロイに必要)
- サービス アカウント ユーザー (CloudRun のデプロイに必要)

![iam](/posts/cloudrun/iam.png)

#### 公開範囲の設定

以下を参考に公開範囲を設定する

- https://cloud.google.com/run/docs/authenticating/public
- https://cloud.google.com/run/docs/securing/managing-access

以下でも設定できる
![public](/posts/cloudrun/public.png)
