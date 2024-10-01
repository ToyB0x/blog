---
title: NestJSに設定モジュール追加
description: NestJSに設定モジュールを追加して環境変数をバリデーションする方法等のメモ
publishDate: 2022-7-18
---

## TL;DL

- @nestjs/configを使いましょう
- 環境変数のバリデーションをしましょう
- 環境変数もDIしましょう
- 詳細は[こちらのPR](https://github.com/g-dash/g-dash/pull/19)から確認できます

## 全体の流れ
[公式ドキュメント](https://docs.nestjs.com/techniques/configuration)を参考に以下の流れで導入します。

### 依存パッケージのインストール
```shell
# config用
yarn add @nestjs/config

# バリデーション用
yarn add joi

```

### 設定モジュールを全体適用
```ts
// app.module.ts
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 設定モジュールを全体適用し後述のvalidationSchemaで環境変数をバリデーション
    ConfigModule.forRoot({ isGlobal: true, cache: true, validationSchema }),
  ],
})
export class AppModule {}
```

### 設定サービスの作成
```ts
// /src/modules/configs/configs.service.ts 等
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  // required
  get NODE_ENV(): string {
    return this.configService.get('NODE_ENV');
  }

  // optional
  get SERVER_PORT(): number {
    console.log(typeof this.configService.get('SERVER_PORT'));
    return this.configService.get('SERVER_PORT');
  }
}
```

### バリデータの追加
```ts
// /src/modules/configs/configs.validator.ts 等
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // required
  NODE_ENV: Joi.string()
    .required()
    .valid('development', 'production', 'test'),

  // optional
  SERVER_PORT: Joi.number(),
});
```

### プロバイダに設定サービス追加

```ts
{
  // ...snip
  providers: [SomeService, ApiConfigService]
}
```

### コンストラクタに設定サービス追加
```ts
// ...snip
constructor(private readonly apiConfigService: ApiConfigService) {}
```
