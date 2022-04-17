import { Container } from '@chakra-ui/react'
import { FC } from 'react'
import { Header } from '../components/header'

export const BlogLayout: FC = (props) => (
  <>
    <Header />
    <Container {...props} />
  </>
)
