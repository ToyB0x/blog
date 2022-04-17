import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'

export const Footer = () => (
  <Box p={4}>
    <Link href="/posts">
      <a>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          過去の記事一覧
        </Text>
      </a>
    </Link>
  </Box>
)
