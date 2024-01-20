FROM node:20.11.0 as build

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


FROM node:20.11.0
WORKDIR /opt/turborepo

# APIサーバのビルド結果とnode_modulesをコピー
COPY --from=build /opt/turborepo/apps/api/dist apps/api/dist
COPY --from=build /opt/turborepo/apps/api/node_modules apps/api/node_modules

# 内部パッケージとrootに巻き上げられたnode_modulesのコピー
COPY --from=build /opt/turborepo/packages packages
COPY --from=build /opt/turborepo/node_modules node_modules

WORKDIR /opt/turborepo/apps/api
CMD [ "node", "dist/main.js" ]
