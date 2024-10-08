---
title: 本ブログの技術選定
description: 本ブログの技術選定のメモ
publishDate: 2022-5-10
tags: ['blog', 'architecture']
---

本ブログの記事は以下の技術で構成されています。  
(2022年時点)

- Markdown記法: MDX
- メタ情報の記述: Frontmatter
- MDXファイルの読込み: ContentLayer
- MDXのレンダリング: 自作OSSのmdx-lib

## Markdown記法

マークダウンではなくMDXを採用した理由は、例えばYoutubeの動画プレーヤ等を埋め込む際にマークダウンよりも使い勝手が良いためです。

Next以外のフレームワーク(Gatsby等)に乗り換える際にもそのままコンテンツを流用できます。

## メタ情報の記述

メタ情報の記載についてはFrontmatterを利用しています。
ちなみに、以下のようにTypeScriptで定義することもできます。

ContentLayerを使えばFrontmatterの型チェックが出来るので、より一般的なFrontmatterを採用しました。
(将来シンプルなマークダウンへと移行したい場合も対応が楽)

```ts
type Meta = {
	title: string
	date: Date
}

const meta: Meta = {
	title: 'タイトル',
	date: new Date('2020-1-1')
}
```

## MDXファイルの読込み

とあるOSSのソースコードを眺めているとContentLayerというパッケージを利用してMDXファイルを読み込んでいることに気付きました。

ContentLayerを使うことで`fs.readFile`のようなnodejsレベルのコードを書く手間が省けます。利用例は以下です。

```tsx
// posts/[slug].tsx

import { allPosts, Post } from 'contentlayer/generated'

export const getStaticProps: GetStaticProps<Props, Query> = async (context) => {
	const { params } = context
	const post = allPosts.find((post) => post._raw.flattenedPath === params?.slug)
	if (!post) throw Error('no slug route found')
	return { props: { post } }
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = allPosts.map((post) => post.url)
	return { paths, fallback: false }
}

const PostLayout: FC<Props> = ({ post }) => {
	const MDXComponent = useMDXComponent(post.body.code)

	return (
		<>
			<Stack>
				<Heading isTruncated>{post.title}</Heading>
				<Box as='time' fontSize='sm' color='gray.600' dateTime={post.date}>
					{format(parseISO(post.date), 'LLLL d, yyyy')}
				</Box>
			</Stack>

			<MDXComponent components={MDXComponents} />
		</>
	)
}

const Post = (props: Props) => (
	<>
		<Head>
			<title>{props.post.title}</title>
		</Head>

		<BlogLayout>
			<PostLayout post={props.post} />
		</BlogLayout>
	</>
)
```

## MDXのレンダリング

MDXのレンダリングは自作OSSのmdx-libをnpmにパブリッシュした上で利用しています。(Vercel等からOSS認定も受けています)
