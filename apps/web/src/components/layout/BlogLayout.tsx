import { Container } from '@chakra-ui/react'
import { FC } from 'react'
import { Header } from '../common'

type Props = {
  children: React.ReactNode
}

export const BlogLayout: FC<Props> = (props) => (
  <>
    <Header />
    <Container {...props} />
  </>
)
