import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'

const components = {
  Image,
}

interface MdxProps {
  code: string
}

// ref: https://github.com/shadcn/next-contentlayer/blob/5b32397c2034a97a077cd695f3421a2e76af05c5/components/mdx-components.tsx
export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
