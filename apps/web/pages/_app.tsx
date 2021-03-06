import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import '../styles/global.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Welcome to blog!</title>
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
      </Head>

      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}

export default App
