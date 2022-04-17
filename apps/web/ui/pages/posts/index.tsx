import { BlogLayout } from '../../../components/layout/BlogLayout'
import { Stack } from '@chakra-ui/react'
import { PostWithContinueMask } from './PostWithContinueMask'
import { Footer } from './Footer'
import { Post } from 'contentlayer/generated'
import { FC } from 'react'

type Props = {
  posts: Post[]
}

export const Page: FC<Props> = ({ posts }) => (
  <BlogLayout>
    <Stack spacing={12}>
      {posts.slice(0, 10).map((post, idx) => (
        <PostWithContinueMask key={idx} {...post} />
      ))}
    </Stack>

    <Footer />
  </BlogLayout>
)
