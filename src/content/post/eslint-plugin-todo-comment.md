---
title: チケット管理が捗るOSSを公開しました
description: TODOコメントにチケットURLを記載してもらうためのカスタムルールを作りました。
publishDate: 2023-6-25
recommend: true
tags: ['OSS', 'ESLint']
---

## 概要

以下のようにTODOコメントにチケットURLを記載してもらうためのカスタムルールを作りました。

- [NPMパッケージ](https://www.npmjs.com/package/eslint-plugin-todo-comment)
- [リポジトリ](https://github.com/ToyB0x/eslint-plugin-todo-comment)

```typescript
🙅 BADな例: チケットURLが記載されていない(永久に消化されないTODOチケット)

// TODO: 以下にテストを追加して動作確認する(マイナス値や極端に大きな値も動作確認する)
const sum = (numbers: number[]) =>  numbers.reduce((acc, cur) => acc + cur, 0)
```

```typescript
🙆 GOODな例: チケットURLが記載されている(チケット管理システム等で負債を可視化できる)

// TODO: 以下にテストを追加して動作確認する(マイナス値や極端に大きな値も動作確認する)
// https://app.asana.com/ticketId/123456789
const sum = (numbers: number[]) =>  numbers.reduce((acc, cur) => acc + cur, 0)
```

## 背景

今年から今までのテックリードの役割に加えて、EM(engineering manager)としても活動することになりました。

立場的に自分でバリバリコードを書くというだけではなく、チームの生産性を上げるための仕組み作りの視点も必要になってきます。

例えば「整理されたTODOコメント」はチームの生産性や技術的負債の一つの指標となり得るのでは無いかと思うのですが、
一般的なプロジェクトでは「整理されたTODOコメント」というのが夢物語のようなものだと思います。

そこで、TODOコメントにチケットURLを記載してもらうためのカスタムルールを作りました。

## 運用

yarn lintでTODOコメントをチェックするようにして、GithubAction等のCI中でルール違反の場合にエラーを出すよう設定しておくと良いと思います。

```jsonc
# package.json
{
  "scripts": {
    "lint": "eslint src/**"
  }
}
```

```yaml
# github-action.yml
- name: lint package
  run: yarn lint
```
