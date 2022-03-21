import { Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'

type Props = {
  href: string
  icon: IconType
}

export const NeonLinkIcon: React.FC<Props> = ({ href, icon }) => (
  <a href={href} target="_blank" rel="noreferrer">
    <Icon as={icon} />
  </a>
)
