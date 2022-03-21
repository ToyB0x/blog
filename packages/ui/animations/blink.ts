import { keyframes } from '@chakra-ui/react'

export const blinkKyeFrames = keyframes`
  18% {
    color: inherit;
    text-shadow: inherit;
  }
  19%{
    color: #333;
  }
  20% {
    text-shadow: none;
  }
  21% {
    color: inherit;
    text-shadow: inherit;
  }
  21.5% {
    color: #333;
    text-shadow: none;
  }
  22% {
    color: inherit;
    text-shadow: inherit;
  }
  23% {
    color: #333;
    text-shadow: none;
  }
  23.5% {
    color: inherit;
    text-shadow: inherit;
  }
`