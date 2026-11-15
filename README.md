# ToyB0x Blog

[toyb0x.me](https://toyb0x.me)

## Zenn

Zenn CLI はルートの開発依存として管理します。
記事・本は、GitHub 連携で取り込めるようルートの `articles/`・`books/` に実ファイルで配置します。
以下のコマンドはリポジトリルートで実行します。

```sh
pnpm install --frozen-lockfile
pnpm exec zenn new:article --slug my-first-article
pnpm exec zenn new:book --slug my-first-book
pnpm exec zenn preview
```

プレビューは `http://localhost:8000` で確認できます。終了は Ctrl+C です。
記事は下書き（`published: false`）で作成されます。
Zenn 側の GitHub 連携・公開設定は別途必要です。

ルートに実ファイルを配置した下書き記事で、Zenn 側のデプロイ成功と記事の取り込みを確認済みです。
検証用の記事は削除しています。

- [Zenn CLI のインストール・初期設定](https://zenn.dev/zenn/articles/install-zenn-cli)
- [Zenn CLI の使い方](https://zenn.dev/zenn/articles/zenn-cli-guide)
