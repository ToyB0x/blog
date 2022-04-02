import Head from 'next/head'
import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { GetStaticProps } from 'next'

type Props = {
  posts: Post[]
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const sortedPosts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts: sortedPosts } }
}

const PostCard = (post: Post) => {
  return (
    <>
      <time dateTime={post.date} className="block text-sm text-gray-600">
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <h2>
        <Link href={post.url}>
          <a>{post.title}</a>
        </Link>
      </h2>
    </>
  )
}

export const Index = (props: Props) => {
  const { posts } = props
  return (
    <>
      <Head>
        <title>Contentlayer Blog Example</title>
      </Head>

      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </>
  )
}

export default Index
