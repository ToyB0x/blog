import { allPosts, Post } from 'contentlayer/generated'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PostLayout } from '../../components/layout'
import Head from 'next/head'
import { Avatar, Center, Container, Text } from '@chakra-ui/react'
import Link from 'next/link'

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

    <Container>
      {/* Avatar */}
      <Link href="/">
        <Center mt={6}>
          <Text fontSize="xl" fontWeight="semibold" letterSpacing={1}>
            ToyB
            <Text as="span" color="blue.400">
              0
            </Text>
            x
          </Text>
        </Center>
        <Center mb={8}>
          <Avatar
            mt={1}
            size="lg"
            bg="transparent"
            borderRadius={0}
            src="/avatar/avatar.png"
          />
        </Center>
      </Link>

      <PostLayout post={props.post} />
    </Container>
  </>
)

export default Post
