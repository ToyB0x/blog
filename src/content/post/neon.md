---
title: Neonについて調べた
description: スケーラブルかつ安価なデータベースを目指して開発されたNeonについて調べた
publishDate: 2023-8-3
tags: ['NEON', 'DATABASE']
---

## はじめに

[What is Neon?](https://neon.tech/docs/introduction/about)に以下の記載があります(with Google翻訳)  
それぞれの特徴等に関するドキュメントを引用する形で読み進めてみます。

> Neonは、豊富な無料枠を備えたフルマネージドのサーバーレスPostgreSQLです。Neonはストレージとコンピューティングを分離し、サーバーレス、ブランチング、ボトムレス ストレージなどの最新の開発者機能を提供します。Neonはオープンソースであり、Rustで書かれています。  
> [What is Neon?](https://neon.tech/docs/introduction/about)

## サーバレス

他のドキュメントと合わせて読んでみるとサーバレスと関連して以下の特徴があるようです。

- スケーラブル(ゼロにスケールダウン出来るので安価)
- コールドスタート時もある程度高速
- データベースのストレージとコンピューティングを分離
- デフォルトではコールドスタート〜アイドル迄は5分だが、秒単位で設定可能

> Neonは、アプリケーションのワークロードに応じて、オンデマンドでコンピューティングを自動的かつ透過的にスケールアップします。 ネオンも非アクティブ時にはゼロにスケールダウンします。 Neonはサーバーレスであるため、使用した分だけ料金が発生し、コストを最大10倍削減できます。 詳細については、「自動スケーリングと自動一時停止の構成」を参照してください。  
> [Serverless](https://neon.tech/docs/introduction/about#serverless)

## 開発生産性

ブランチ機能により高い開発生産性をサポートしてくれるようです

- 高速・安価にブランチ作成可能
- CI・CDでも利用可能(本番データに近い内容で負荷テストやマイグレーション検証等が可能？)
- Mainのブランチをベースとして開発メンバ毎(またはCI環境毎等)にブランチ作成可能
  - 他の開発メンバに気兼ねなく自分のブランチでDB操作を伴う検証が出来そう
  - 例えばCloudRunのリビジョン機能とDBブランチを活用すればPR毎のプレビュー環境が作れそう
- ロールバックも可能

> Neonストレージでは「コピーオンライト」技術を使用して実装されているため、分岐は瞬時に行われ、オーバーヘッドはほぼゼロです。実際、ブランチは非常に安価なので、CI/CDパイプライン内のすべてのコードデプロイメントに対してブランチを作成できます。分岐機能の詳細については、「分岐」を参照してください。  
> [Built for developer productivity](https://neon.tech/docs/introduction/about#built-for-developer-productivity)

## フルマネージド

メンテナンス時も高可用性が保証されているよう？に見えます。
CloudSQL等ではパッチ適用等のメンテナンス時に一次停止が必要な認識なので嬉しいですね。

> Neonは、管理、メンテナンス、スケーリングの負担をかけずに高可用性を提供します。  
> [Fully managed](https://neon.tech/docs/introduction/about#fully-managed)

## 底なしのストレージ

ストレージのスケーリング性能が高いようです。
またコールドデータ(page layer等の概念とも関係)をS3などのストレージに移動することでコストを抑えることが出来るようです。

> 当社のエンジニアリングチームは、クラウド専用のマルチテナントストレージシステムを開発しました。Neonストレージは、高可用性と耐久性を保証しながら、事実上無制限のストレージを可能にします(以下略)  
> [Bottomless storage](https://neon.tech/docs/introduction/about#bottomless-storage)

## 互換性

PostgreSQL15と完全な互換性があるようです。

> Neon computeはPostgreSQLの最新バージョンです。PostgreSQLの公式リリースを使用するアプリケーションと100%互換性があります。現在、PostgreSQL14とPostgreSQL15がサポートされており、PostgreSQL15がデフォルトです。詳細については、PostgreSQLの互換性ページを参照してください。  
> [Compatibility](https://neon.tech/docs/introduction/about#compatibility)

## どのくらい安いのか？

それほど利用時間が多くないケースではサーバレスな特性からCloudSQLよりも安くなるようです。

![Neon Price](/posts/neon/img.png)
