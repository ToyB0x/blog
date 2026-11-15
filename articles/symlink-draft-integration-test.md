---
title: "Symlink 経由の GitHub PR 下書き連携テスト"
emoji: "🧪"
type: "tech"
topics: ["zenn", "github"]
published: false
---

この記事は、モノレポ内の記事をシンボリックリンク経由で Zenn の PR 下書き連携に取り込めるか確認するためのテスト記事です。

## 検証する構成

実ファイルは `zenn/articles/symlink-draft-integration-test.md` に置き、リポジトリルートの `articles` を `zenn/articles` へのシンボリックリンクにしています。

## 確認項目

- PR の下書き連携で、このタイトルと本文が表示されること
- 本文中の識別文字列 `zenn-symlink-draft-test-20261115` が表示されること
- 公開記事として配信されないこと（`published: false`）

検証が終わったら削除する、一時的なテスト記事です。
