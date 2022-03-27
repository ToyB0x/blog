import { NeonLinkIcon } from 'ui'
import { FiFileText, FiGithub, FiInstagram, FiTwitter } from 'react-icons/fi'
import { SimpleGrid } from '@chakra-ui/react'

export const Links = () => (
  <SimpleGrid
    columns={4}
    textColor="white"
    spacing={[8, 16, 24]}
    fontSize={['2.6rem', '2.8rem', '3rem']}
    filter="drop-shadow(0 0 0.4rem white)"
  >
    <NeonLinkIcon href="https://github.com/ToyB0x" icon={FiGithub} />
    <NeonLinkIcon href="https://twitter.com/ToyB0x_" icon={FiTwitter} />
    <NeonLinkIcon
      href="https://www.instagram.com/toyb0x_/"
      icon={FiInstagram}
    />
    <NeonLinkIcon href="https://google.com" icon={FiFileText} />
  </SimpleGrid>
)
