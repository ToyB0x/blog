---
title: Nextのテストをswcで高速化
description: swcをnext/jest経由で利用してテストを高速化しました。
publishDate: 2022-7-16
---

## TR;DR
- jestはswcで高速化出来ます。
- `@swc/jest`を直接使うのではなく、`next/jest`経由で利用すると楽です。

※ 実際のコードは[こちらのPR](https://github.com/g-dash/g-dash/pull/14)でご確認頂けます。

作業は以下を参考に進めます。

- [Setting up Jest (with the Rust Compiler)](https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler)

## 作業内容
```shell
# turborepoの場合 apps/web等
yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
```

```js
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom'
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
```


上記の設定をすることで以下のようなことを自動でしてくれます。

Under the hood, next/jest is automatically configuring Jest for you, including:
- Setting up transform using SWC
- Auto mocking stylesheets (.css, .module.css, and their scss variants) and image imports
- Loading .env (and all variants) into process.env
- Ignoring node_modules from test resolving and transforms
- Ignoring .next from test resolving
- Loading next.config.js for flags that enable SWC transforms

