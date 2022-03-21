import { extendTheme } from '@chakra-ui/react'
import { StyleFunctionProps } from '@chakra-ui/theme-tools'

const lpTheme = extendTheme({
  styles: {
    global: (_props: StyleFunctionProps) => ({
      body: {
        backgroundColor: 'black',
      },
    }),
  },
})

export default lpTheme
