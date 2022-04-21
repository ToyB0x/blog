import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { GetStaticProps } from 'next'
import { FC } from 'react'
import { BlogLayout } from '../../components/layout'
import { Stack } from '@chakra-ui/react'
import { Footer, PostWithContinueMask } from '../../components/pages/index'

type Props = {
  posts: Post[]
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const sortedPosts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts: sortedPosts } }
}

export const Index: FC<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>ToyB0x</title>
      </Head>

      <BlogLayout>
        <Stack spacing={12}>
          {posts.slice(0, 10).map((post, idx) => (
            <PostWithContinueMask key={idx} {...post} />
          ))}
        </Stack>

        <Footer />
      </BlogLayout>
    </>
  )
}

export default Index
