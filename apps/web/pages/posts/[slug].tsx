import { allPosts, Post } from 'contentlayer/generated'
import { GetStaticPaths, GetStaticProps } from 'next'
import { BlogLayout } from '../../components/layout'
import { PostLayout } from '../../components/layout'
import Head from 'next/head'

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

const Post = (props: Props) => (
  <>
    <Head>
      <title>{props.post.title}</title>
      <meta property="og:site_name" content="ToyB0x" />
      <meta property="og:title" content={props.post.title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={props.post.description} />
      <meta property="og:url" content={props.post.url} />
    </Head>

    <BlogLayout>
      <PostLayout post={props.post} />
    </BlogLayout>
  </>
)

export default Post
