---
title: Vitestと型チェック
description: Vitestの場合、テストファイルは別途型チェックが必要です
publishDate: 2022-6-21
tags: ['TEST']
---

## はじめに

Vitestの場合、テストファイルは別途型チェックが必要です。
Vitestはテスト高速化のためテスト実行時の型チェックを省略しているためです。
(@swc/jestも同じです)

以下、[Vitest公式リポジトリ](https://github.com/vitest-dev)を参考に設定を追加したメモです。

## 各種設定

### 型チェックコマンドの追加

```json
// package.json
{
	"scripts": {
		// tsconfigで別途`"exclude": ["node_modules"]`等しておきましょう
		// 以下指定ではtestファイル以外も型チェックしています。テストファイルだけチェックしたい場合はtsconfigの分離等で対応できます。
		"typecheck": "tsc --noEmit"
	}
}
```

### CIの追加

```yml
# .github/workflows/ci.yml
typecheck:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3

    - name: Setup node
      uses: actions/setup-node@v3
      with:
        node-version: 16.x

    - name: Install
      run: yarn install --frozen-lockfile

    - name: Typecheck
      run: yarn typecheck
```
