'use client'
import 'client-only'

import { Post } from 'contentlayer/generated'
import { Box, Flex, Heading, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

export const PostItem = (post: Post) => (
  <Stack>
    <Flex>
      <Heading as="h1" size="md" w="74%" noOfLines={1}>
        <Link href={post.url}>{post.title}</Link>
      </Heading>

      <Box
        as="time"
        w="26%"
        textAlign={'right'}
        fontSize="sm"
        color="gray.600"
        dateTime={post.date}
      >
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </Box>
    </Flex>
  </Stack>
)
