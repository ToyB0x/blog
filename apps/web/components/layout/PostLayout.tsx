import Head from 'next/head'
import { Box, Heading, Image, Stack } from '@chakra-ui/react'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { format, parseISO } from 'date-fns'
import { MDXComponents } from '@mdx-lib/chakra'
import { Post } from 'contentlayer/generated'
import { FC } from 'react'

type Props = {
  post: Post
}

export const PostLayout: FC<Props> = ({ post }) => {
  const MDXComponent = useMDXComponent(post.body.code)

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <Stack spacing={4}>
        <Box as="time" fontSize="sm" color="gray.600" dateTime={post.date}>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </Box>

        <Heading isTruncated>{post.title}</Heading>

        {post.photo && (
          <Image src={post.photo} borderRadius="xl" alt="post header image" />
        )}
      </Stack>

      <MDXComponent components={MDXComponents} />
    </>
  )
}
