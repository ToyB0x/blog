import 'server-only'

import Link from 'next/link'
import type { Metadata } from 'next'
import { allPosts } from 'contentlayer/generated'
import { PostLayout } from '../../../components/layout'
import { Avatar, Center, Container, Text } from '@chakra-ui/react'

type Props = {
  params: { id: string }
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    id: post._raw.flattenedPath,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id
  const post = allPosts.find((post) => post._raw.flattenedPath === params.id)
  if (!post) throw Error('no slug route found')

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      siteName: 'ToyB0xのBlog',
      type: 'website',
      description: post.description,
      url: post.fullPath,
    },
  }
}

export default function Page({ params }: { params: { id: string } }) {
  console.warn({ params })
  // const post = allPosts.find((post) => post._raw.flattenedPath === params.id)
  const post = allPosts.find((post) => post._raw.flattenedPath === params.id)
  if (!post) throw Error('no slug route found')

  return (
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

      <PostLayout post={post} />
    </Container>
  )
}
