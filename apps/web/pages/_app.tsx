import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraMDXProvider } from '@mdx-lib/chakra'
import lpTheme from '../lp-theme'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Welcome to blog!</title>
    </Head>

    <ChakraProvider theme={lpTheme}>
      <ChakraMDXProvider>
        <main>
          <Component {...pageProps} />
        </main>
      </ChakraMDXProvider>
    </ChakraProvider>
  </>
)

export default App
