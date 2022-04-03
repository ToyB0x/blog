import { Center, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { Links, NeonHeader } from 'ui'

const Index = () => {
  return (
    <>
      <Head>
        <title>ToyB0x</title>
      </Head>

      <Center h="100vh" backgroundColor="black">
        <VStack spacing={10}>
          <NeonHeader />
          <Links />
        </VStack>
      </Center>
    </>
  )
}

export default Index
