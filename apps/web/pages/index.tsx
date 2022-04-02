import { Center, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { Links, NeonHeader } from 'ui'

const Index = () => {
  return (
    <>
      <Head>
        <title>ToyB0x</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Neonderthaw&display=block"
          rel="stylesheet"
        />
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
