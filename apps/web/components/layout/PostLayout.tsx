import { Box, Heading, Stack } from '@chakra-ui/react'
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
    <Box mb={8}>
      <Stack>
        <Heading noOfLines={1}>{post.title}</Heading>
        <Box as="time" fontSize="sm" color="gray.600" dateTime={post.date}>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </Box>
      </Stack>

      <MDXComponent components={MDXComponents} />
    </Box>
  )
}
