import Head from 'next/head'
import { compareDesc } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { GetStaticProps } from 'next'
import { Page } from '../ui/pages/posts'
import { FC } from 'react'

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

      <Page posts={posts} />
    </>
  )
}

export default Index
