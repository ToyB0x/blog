---
title: Vitest導入
description: Vitest導入メモです
publishDate: 2022-6-20
tags: ["TEST"]
---

## はじめに
テストの高速化と設定の簡略化のためVitestを導入しました。

@swc/jestも試したのですがTypescriptコードのテストではvitestの方が設定が簡単です。
これはJestと異なり、vitestはTypescriptコードを前提としているからなのかなと思います。
(Jest関連の設定はややこしくハマると時間がとられる事があるので簡単に設定できることは大きなメリットと感じます)

## セットアップ

### 依存パッケージの追加
```shell
# vitestの追加
yarn add -D vitest

# Reactの場合
yarn add -D @testing-library/react
```

### テストコマンドの追加
```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  },
}
```

### vitest.config.tsの追加
```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Reactの場合
  },
})
```
