import { Box, Center } from '@chakra-ui/react'

export const ContinueMask = () => (
  <Box
    pos="absolute"
    h="14vh"
    w="full"
    bottom={0}
    bgGradient="linear-gradient(rgba(255,255,255,0) 0%, #fff 60%)"
  >
    <Center pos="absolute" bottom={0} w="full" p={4}>
      続きを読む
    </Center>
  </Box>
)
