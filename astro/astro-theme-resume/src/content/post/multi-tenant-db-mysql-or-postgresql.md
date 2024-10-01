---
title: マルチテナントサービスのDB選定(MySQLかPostgreSQLか？)
description: マルチテナントサービス、高速なMySQLと高機能なPostgreSQL、そしてRow Level Security（RLS）について
publishDate: 2022-6-12
---

## TL;DR

- PostgreSQLにはRow Level Security（RLS）機能があるよ！
- マルチテナント的なサービスでFail Safeな設計を実現できるよ！
- 「クエリ間違えた」-->「センシティブな企業情報が誰でも閲覧可能」みたいな事を防げるよ！

## 前提知識

### マルチテナントサービスとは？

「テナント」という用語は難しく感じてしまいますが、要は「組織」です。
複数組織に対応したサービスはマルチテナントに対応したサービスと言うこと出来ます。
そして「組織」を扱うサービスなのでB向けサービスであることが多いです。

例: クラウド人事労務サービスのSmartHRさん等

### シングルテナントの例

もう少ししっかり理解するために、マルチテナントでは無いサービスを考えてみましょう。
例えばECサイトのAmazon等はどうでしょうか？(Amazonは法人向けサービスも提供しているようですが、ここでは簡略化してC向けサービスとします)

AmazonのサインアップフローはEメールとパスワードさえあれば誰でもサインアップできる仕様になっています。
また通常ログイン後も自分が何処かの組織に属していなければならないといった制限もありません。
ざっくりいうとこれはマルチテナントでは「ない」サービスです。

#### マルチテナントの例

上記と比較して、クラウド人事労務サービスのSmartHRさんについて考えてみましょう
SmartHRさんは「人事労務サービス」と銘打ったSaasなため、当然「組織」を前提としています。

組織を前提としていることの証左としてログイン画面に「新しく企業アカウントを作成する」という文言が記載されています。
これは明らかにマルチテナント的なサービスです。
![smart-hr-login](/posts/multi-tenant-db-mysql-or-postgresql/smart-hr-login-screen.png)

## 本題: マルチテナントサービスのDB選定(MySQLかPostgreSQLか？)

### DBコネクションのコスト

本題に入ります。マルチテナントサービスのDBとしてMySQLかPostgreSQLのどちらが適しているでしょうか？
おおざっぱに言ってMySQLはマルチスレッド型で軽量なRDBかと思います。
一方でPostgreSQLはマルチプロセス型で機能が豊富なRDB(ORDBMS)と理解して良いかと思います。

マルチスレッドがマルチプロセスかという違いが大きな影響を与えるのは新規コネクション数の生成に必要なコストです。
特に1コネクション当たりに必要なメモリ量は[PostgresSQLでは10MB程度必要](https://cloud.ibm.com/docs/databases-for-postgresql?topic=databases-for-postgresql-managing-connections&locale=ja#-)という説明を良く見かけます。

詳細なレポートの掲載は割愛しますが、PostgreSQLのコネクション生成コストが高いことの対策として、pgbouncerやpgpoolといったコネクションプーリング用のツールはある程度普及しているかと思います。

一方でMySQLのコネクションプーリングは相対的にPostgreSQLに比べて小さく[Webシステムにおけるデータベース接続アーキテクチャ概論](https://blog.yuuk.io/entry/architecture-of-database-connection#PostgreSQL%E3%81%A8MySQL)に記載されているように、当時のMobageはMySQLをコネクションプーリング無しで運用していたようです。

さて、DB選定は選定フローチャートに従えば答えが出るような簡単な話ではありません。
DBのパフォーマンスについてはMySQLとPostgreSQLのどちらが優れているかはサービスの性質によります。
ただし上記のMySQLはPostgreSQLに比べてコネクションプーリングを考えなくて良いと言う点は大きなメリットです。

### 高速なMySQLと高機能なPostgreSQL、そしてRow Level Security（RLS）

さて、前述のマルチテナント的なサービスについてはMySQLかPostgreSQLかを余り迷うこと無く、決め手となる一つのキーポイントがあります。
それはRow Level Security（RLS）と呼ばれる、MySQL(2022/6時点)には存在しないPostgreSQLだけが持つ機能です。

大雑把に言うとこの機能を使うことで、クエリの書き間違いをした場合でも、A社のテナントがB社のテナントの情報を閲覧したり編集したりすることを防止できます。

```sql
# 記載例
CREATE POLICY "tenant_policy" ON "table_name"
USING ("tenant_id" = current_setting('tenant.id'));
```

## Row Level Security（RLS）を利用しない場合のリスク

さて、RLSを使用しないことはどれだけ危険なのでしょうか？

RLSを使用しない場合自前のコードだけで他のテナントへのアクセスを防止する必要があります。
例えばテーブルのマイグレーションに関わるPRが数年で100回発生した場合に100回全て、

- アプリケーション側のクエリが完璧である
- 上記で実装ミスしていたとしてもPRのレビューで防止できる

といった運用は100%可能でしょうか？
私の体感ではメンバーの力量にもよりますが、**1回や2回以上はテストもレビューもすり抜けてしまうのではないでしょうか？**
そしてその結果、契約企業の情報が閲覧し放題になってしまったとすると、ビジネス的なダメージは深刻ではないでしょうか？

というわけで、マルチテナント対応なアプリの場合はRow Level Security（RLS）機能のあるPostgreSQLを選ぶのが無難かなぁというお話でした。

## Row Level Security（RLS）の適用スコープ

さてこのRLSですが以下の2つの値を比較した結果がTRUE / FALSEのどちらになるかが重要です。

- 構成設定関数(set_config等)で設定された値
  - 上記例ではcurrent_setting('tenant.id')
- レコード内の特定のカラムの値
  - 上記例ではtenant_id

前者の set_config について公式ドキュメントでは以下のように記載されており、is_localでスコープをトランザクション単位なのかセッション単位なのかを指定できます。

> set_config ( setting_name text, new_value text, is_local boolean ) → text
>
> setting_nameパラメータにnew_valueを設定し、その値を返します。 is_localが渡され、それがtrueなら新しい値は現在のトランザクションの間にのみ適用されます。 現在のセッションで以降に新しい値を適用したければ、代わりにfalseとしてください。 このコマンドはSQLコマンドのSETに関連します。
>
> [https://www.postgresql.jp/docs/16/functions-admin.html](https://www.postgresql.jp/docs/16/functions-admin.html)

### セッション単位で利用する場合

もしセッション単位で利用する場合で、例えば PostgreSQLをコネクションプーリングと共に運用している場合、
別テナントのユーザからのリクエストにも関わらず以前にset_configされた他テナントのコネクションを再利用するような実装は避けなければなりません。

これを実現する最も簡単な実装は、クライアントからのリクエストの度にコネクションを張り直すことです。  
(ただし再接続のためパフォーマンスが悪くなる点に注意が必要です)

例えばNestjsでは[Injection scopes](https://docs.nestjs.com/fundamentals/injection-scopes)に記載されている`Scope.REQUEST`で実現できます。

また、わざわざ再接続しなくても同じセッション中でset_config し直すことで設定を上書できますが、set_configした設定が、その後そのまま他のテナントで再利用されないことを担保する設計が必要です。

サーバフレームワークやORMの中には自動でコネクションプーリングしてくれる(有る意味してしまう)物が多いので注意が必要です。

### トランザクション単位で利用する場合

トランザクション単位で set_config する場合は、トランザクションが終了するとテナント設定がリセットされるため、セッション単位での利用よりも安全です。
DBコネクションプーリングと併用しても問題ないため、パフォーマンス上の問題も発生しません。可能であればこちらの方法がおすすめです。

なお、ORMのPrismaを使う場合は以下のExampleコードが参考になるかと思います。
(本記事の初稿時点ではPrismaのExtensionが無かったので自前でコードを書いて実現していましたが、現在はExtensionベースで書くのが良いかと思います)

[prisma-client-extensions/row-level-security](https://github.com/prisma/prisma-client-extensions/blob/03a45bdf777fe31591fb1c33568d22731af334dd/row-level-security/script.ts)
