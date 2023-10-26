import 'server-only'

import { Metadata } from 'next'
import { compareDesc } from 'date-fns'
import { Stack } from '@chakra-ui/react'
import { BlogLayout } from '../components/layout'
import { PostItem } from '../components/pages/posts'
import { allPosts } from 'contentlayer/generated'

export const metadata: Metadata = {
  title: '記事一覧',
}

export default function Page() {
  const sortedPosts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (
    <BlogLayout>
      <Stack spacing={7} mt={12} mb={6}>
        {sortedPosts.map((post, idx) => (
          <PostItem key={idx} {...post} />
        ))}
      </Stack>
    </BlogLayout>
  )
}
