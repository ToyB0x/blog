# Zenn

Zenn CLI の依存関係と操作スクリプトを管理するワークスペースです。
記事・本はリポジトリルートの `articles/`・`books/` に実ファイルとして配置します。
各スクリプトはリポジトリルートに移動して CLI を実行します。

リポジトリルートから実行します。

```sh
pnpm install --frozen-lockfile
pnpm --filter @toyb0x/zenn new:article --slug my-first-article
pnpm --filter @toyb0x/zenn new:book --slug my-first-book
pnpm --filter @toyb0x/zenn preview
```

プレビューは `http://localhost:8000` で確認できます。終了は Ctrl+C です。
記事は下書き（`published: false`）で作成されます。
Zenn 側の GitHub 連携・公開設定は別途必要です。

## GitHub 連携の検証結果

`articles` を `zenn/articles` へのシンボリックリンクにした構成では、
リポジトリ参照エラーが発生し、記事の取り込みを確認できませんでした。
同じ下書き記事をルートの `articles/` に実ファイルで配置すると、
Zenn のデプロイが成功し、1ファイルの更新と記事へのリンクが表示されました。
この結果に合わせて、コンテンツはルートで管理します。
検証用の記事は削除済みです。

Zenn CLI は、依存関係の公開後3日待機ポリシーに適合する 0.5.14 に固定しています。

- [Zenn CLI のインストール・初期設定](https://zenn.dev/zenn/articles/install-zenn-cli)
- [Zenn CLI の使い方](https://zenn.dev/zenn/articles/zenn-cli-guide)
