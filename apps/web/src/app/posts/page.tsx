import 'server-only'

import { compareDesc } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { BlogLayout } from '../../components/layout'
import { Stack } from '@chakra-ui/react'
import { Footer, PostWithContinueMask } from '../../components/pages/index'

export default function Page() {
  const sortedPosts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (
    <>
      <BlogLayout>
        <Stack spacing={12}>
          {sortedPosts.slice(0, 10).map((post, idx) => (
            <PostWithContinueMask key={idx} {...post} />
          ))}
        </Stack>

        <Footer />
      </BlogLayout>
    </>
  )
}
