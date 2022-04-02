import Head from 'next/head'
import { allPosts, Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { MDXComponents } from '@mdx-lib/chakra'
import { GetStaticPaths, GetStaticProps } from 'next'

type Props = {
  post: Post
}

type Query = {
  slug: string
}

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

const PostLayout = (props: Props) => {
  const { post } = props
  const MDXComponent = useMDXComponent(post.body.code)

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <MDXComponent components={MDXComponents} />
      </article>
    </>
  )
}

export default PostLayout
