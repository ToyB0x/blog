---
title: Turborepoのリモートキャッシュ費用節約
description: Githubのactions/cacheを利用してTurborepoのリモートキャッシュ費用を節約する方法
publishDate: 2022-6-14
tags: ["CI"]
---

## リモートキャッシュの料金体系

Turborepoのリモートキャッシュは結構高額かなと思います。
本記事執筆時点の料金体系は以下です。

![price](/posts/tubpore-cache-with-actions-cache/price.png)
https://vercel.com/docs/concepts/monorepos/remote-caching

## リモートキャッシュのコスト試算

サイズの大きいモノレポならば一度のCIで100MBぐらいは消費してしまうのではないでしょうか？
その場合100回CIを回すと無料枠を使い切ってしまい、さらに100回CIを回すと5ドルかかる計算になります。

開発人数が多いと1日100回ぐらいCIを回すことは十分あり得ます。
その場合の月間コストは大雑把に5 * 30 = 150ドル程度になります。

## 無料のactions/cacheによる代用

リモートキャッシュは便利なので、この程度ならばそのまま利用しても良いのですが、
Githubの無料の10GBのキャッシュ枠をactions/cacheから利用することで節約することができます。

そしてこのためのコードは以下のようにとても簡単です。

またリモートキャッシュを利用した場合に比べて時間がかかるといったこともありません。
私の経験では誤差と言って良い数秒程度の違いしかありませんでした。
(actions/cacheの方が誤差程度ですが、僅かに早い)

```yaml
# ref: https://github.com/vercel/turborepo/issues/451
- name: Turborepo Cache
  uses: actions/cache@v3
  id: turborepo-cache
  with:
    # turborepoのデフォルトのキャッシュ生成ディレクトリ
    path: node_modules/.cache/turbo # turbo v2 では .turbo/cache を指定
    # 以下は必要に応じて調整
    # ref: https://docs.github.com/ja/actions/learn-github-actions/contexts
    key: turbo-${{ github.job }}-${{ github.ref_name }}-${{ github.sha }}
    restore-keys: |
      turbo-${{ github.job }}-${{ github.ref_name }}-
```
