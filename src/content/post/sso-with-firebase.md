---
title: SSO with Firebase Authentication(Identity Platform)
description: Firebase Authentication(Identity Platform)単体ではSSOに対応していませんが工夫することで簡単にSSOを実現することが出来ます。
publishDate: 2023-8-12
tags: ["SECURITY"]
---

## はじめに

Firebase Authentication(又はIdentity Platform)単体ではSSOに対応していません。  
しかしCookieを利用することでSSOを実現することが出来ます。  
以下で具体的な方法を紹介します。  
(以降ではFirebase Authentication(又はIdentity Platform)をIDPと略します)

## SSOにおけるIDPの課題

前述の通り、IDP単体ではSSOに対応していません。  
またIDPを用いたバックエンドサーバの認証では、通常以下のフローで認証処理を行うかと思います。
1. クライアントサイドでFirebase Auth(IDP)へログイン
2. 上記で発行されたJWTをヘッダにつけてバックエンドサーバに送信
3. バックエンドサーバはFirebaseSDKなどを利用して上記ヘッダ内のJWTをVerify

ここで1.のステップがFirebase Auth単体では a.domain.com / b.domain.comでログイン状態を共有できないことがSSO時に課題となります。

## SSOとCookie

SSOを実現したいサイトのFQDNがa.domain.com / b.domain.comのように、メインのドメイン部分が同じ`domain.com`の場合はCookieをシェアできます。Firebase利用時もこのドメイン属性指定したCookieを利用することでSSOを実現可能です。  
(Cookieのドメイン属性に`domain=domain.com`を指定)



参考資料: [MDN Domain 属性](https://developer.mozilla.org/ja/docs/Web/HTTP/Cookies)

> Domain 属性は、Cookie を受信することができるホストを指定します。サーバーが Domain を指定しなかった場合、ブラウザーは既定でドメインを Cookie を設定したのと同じホストとし、サブドメインは除外します。 Domain が指定された場合、サブドメインは常に含まれます。したがって、 Domain を指定すると省略時よりも制限が緩和されます。ただし、サブドメイン間でユーザーに関する情報を共有する場合は有用になるでしょう。  
> 例えば、Domain=mozilla.org を設定すると、developer.mozilla.org のようなサブドメインも含まれます。

## Firebase Auth(IDP)とCookieの利用

上記のようにCookieを利用してログイン状態を共有するために
Firebase Auth(IDP)自体に備わったセッションCookie用の機能を利用することが出来ます。

参考資料: [セッション Cookie を管理する](https://firebase.google.com/docs/auth/admin/manage-cookies?hl=ja)

> Firebase Authは、セッションCookieに依存する従来型のウェブサイト向けに、サーバー側でのセッションCookieの管理機能を提供します。

## Firebase Auth(IDP)のセッションCookieの特徴と注意点

上記の公式ドキュメントによると以下の特徴があるようです。  
特にセッションCookieは最長2週間で期限切れとなることに注意しましょう。

> - 認可済みのサービスアカウントを使用する場合のみ生成可能なJWTベースのセッショントークンによるセキュリティの強化。
> - 認証にJWTを使用するさまざまな利点が得られるステートレスセッションCookie。このセッションCookieの要件は（カスタムの要件を含め）IDトークンと同じであるため、セッションCookieに同じ権限チェックを適用できます。
> - 5分から2週間までの範囲でカスタムの有効期限を設定してセッションCookieを作成する機能。
> - ドメイン、パス、セキュア、httpOnlyなど、アプリケーションの要件に基づいてCookieポリシーを適用できる柔軟性。
> - トークンの盗用が疑われる場合に、既存の更新トークン取り消しAPIを使用してセッションCookieを取り消す機能。
> - 大規模なアカウントの変更時にセッション取り消しを検出する機能。

## 参考資料等

以下はFirebase Authentication(Identity Platform)を利用したSSOについて調べた際に見つけた有意義な資料です。

ただし上記の方法とは異なりCookieベースの認証ではなく、敢えて(恐らくシステム的な要件により)、カスタムトークンを利用したり、非Cookieベースの認証を利用している記事もあるようです。

- [Cross-Domain Firebase Authentication: A Simple Approach](https://dev.to/brianburton/cross-domain-firebase-authentication-a-simple-approach-337k)
- [Firebase Authenticationを使ってSSOをしてみた](https://note.com/yusukeoshiro/n/n4fe9eeac499a)
- [Firebase で SSOを実現する](https://www.tsone.co.jp/tech-blog/archives/1371)
