import {
  Avatar,
  chakra,
  Container,
  HStack,
  HTMLChakraProps,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useViewportScroll } from 'framer-motion'
import Link from 'next/link'
import { NeonLinkIcon } from 'ui'
import { FiGithub, FiInstagram, FiTwitter } from 'react-icons/fi'

export const Header = (props: HTMLChakraProps<'header'>) => {
  const ref = useRef<HTMLHeadingElement>()
  const { scrollY } = useViewportScroll()
  const [y, setY] = useState<number>(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  useEffect(() => scrollY.onChange(() => setY(scrollY.get())), [scrollY])

  return (
    <chakra.header
      pos="sticky"
      top="0"
      zIndex="3"
      bg="white"
      shadow={y > height ? 'sm' : undefined}
      {...props}
    >
      <Container>
        <HStack h={16} mt={1}>
          <HStack h={16}>
            <Text fontSize="4xl" fontWeight="semibold" letterSpacing={2}>
              <Link href="/">
                <a>
                  ToyB
                  <Text as="span" color="blue.400">
                    0
                  </Text>
                  x
                  <Avatar
                    mt={1}
                    size="md"
                    borderRadius={0}
                    bg="transparent"
                    src="/avatar/avatar.png"
                  />
                </a>
              </Link>
            </Text>
          </HStack>
          <Spacer />
          <HStack fontSize="3xl" spacing={4}>
            <NeonLinkIcon href="https://twitter.com/ToyB0x_" icon={FiTwitter} />
            <NeonLinkIcon
              href="https://www.instagram.com/toyb0x_/"
              icon={FiInstagram}
            />
            <NeonLinkIcon href="https://github.com/ToyB0x" icon={FiGithub} />
          </HStack>
        </HStack>
      </Container>
    </chakra.header>
  )
}
