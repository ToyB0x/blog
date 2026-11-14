# Zenn

Zenn CLI で初期化した、記事・本を執筆するためのワークスペースです。
`articles/` に記事、`books/` に本を配置します。

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

Zenn CLI は、依存関係の公開後3日待機ポリシーに適合する 0.5.14 に固定しています。

- [Zenn CLI のインストール・初期設定](https://zenn.dev/zenn/articles/install-zenn-cli)
- [Zenn CLI の使い方](https://zenn.dev/zenn/articles/zenn-cli-guide)
