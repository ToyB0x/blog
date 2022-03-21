import { Box, chakra } from '@chakra-ui/react'
import { blinkKyeFrames } from 'ui'

export const NeonHeader: React.FC = () => (
  <Box
    color="#fee"
    userSelect="none"
    fontFamily="Neonderthaw"
    fontSize="min(24vw, calc(960px / 6))"
    textShadow="0 -40px 100px, 0 0 2px, 0 0 1em #ff4444, 0 0 0.5em #ff4444, 0 0 0.1em #ff4444, 0 10px 3px #000"
  >
    Toy
    <chakra.span animation={`${blinkKyeFrames} linear infinite 2s`}>
      B
    </chakra.span>
    <chakra.span animation={`${blinkKyeFrames} linear infinite 3s`}>
      o
    </chakra.span>
    x
  </Box>
)
