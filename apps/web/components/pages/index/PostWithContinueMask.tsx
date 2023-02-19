import { Box, Divider } from '@chakra-ui/react'
import { Post } from 'contentlayer/generated'
import Link from 'next/link'
import { ContinueMask } from './ContinueMask'
import { PostLayout } from '../../layout'

export const PostWithContinueMask = (post: Post) => (
  <>
    <Box pos="relative" maxH="80vh" overflow="hidden">
      <Link href={post.url}>
        <PostLayout post={post} />
        <ContinueMask />
      </Link>
    </Box>
    <Divider />
  </>
)
