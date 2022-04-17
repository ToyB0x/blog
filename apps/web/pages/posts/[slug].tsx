import { allPosts, Post } from 'contentlayer/generated'
import { GetStaticPaths, GetStaticProps } from 'next'
import { BlogLayout } from '../../ui/layout/BlogLayout'
import { PostLayout } from '../../ui/layout/PostLayout'

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
  <BlogLayout>
    <PostLayout post={props.post} />
  </BlogLayout>
)

export default Post
