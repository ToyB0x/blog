import { Container } from '@chakra-ui/react'
import { FC } from 'react'
import { Header } from '../common'

export const BlogLayout: FC = (props) => (
  <>
    <Header />
    <Container {...props} />
  </>
)
