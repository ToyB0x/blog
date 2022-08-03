import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { GetStaticProps } from 'next'
import { Stack } from '@chakra-ui/react'
import { BlogLayout } from '../components/layout'
import { FC } from 'react'
import { PostItem } from '../components/pages/posts'

type Props = {
  posts: Post[]
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const sortedPosts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts: sortedPosts } }
}

export const Index: FC<Props> = ({ posts }) => (
  <BlogLayout>
    <Head>
      <title>記事一覧</title>
    </Head>

    <Stack spacing={8} mt={12}>
      {posts.map((post, idx) => (
        <PostItem key={idx} {...post} />
      ))}
    </Stack>
  </BlogLayout>
)

export default Index
