---
title: GithubのレビューリクエストのリマインドをSlackに通知
description: GithubのSlack連携のメモ
publishDate: 2023-10-20
tags: ['Github', 'Slack']
---

毎回忘れるのでメモ。

Github上のレビューリクエストをSlackに通知する方法

- renovate.jsonのReviewreviewersを以下のように更新

  "reviewers": ["team:[TEAM_NAME]"]

- チームのリマインド設定を編集する

  https://github.com/orgs/[OWNER]/teams/[TEAM_NAME]/settings/reminders

- 以下ページからチームに対象リポジトリへのアクセス権を付与する

  https://github.com/[OWNER]/[REPO_NAME]/settings/access

- 以下ページから組織のSlackアプリに対象リポジトリへのアクセス権を付与する

  https://github.com/organizations/[OWNER]/settings/installations/[SLACL_APP_INSTALATION_ID]
