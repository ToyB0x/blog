# ToyB0x Blog

[toyb0x.me](https://toyb0x.me)

## Zenn

Zenn CLI は独立した pnpm ワークスペース [`zenn/`](./zenn/) で管理します。
GitHub 連携で取り込む記事・本は、ルートの `articles/`・`books/` に配置します。

```sh
pnpm install --frozen-lockfile
pnpm --filter @toyb0x/zenn preview
```

記事・本の作成方法は [Zenn ワークスペースの README](./zenn/README.md) を参照してください。
