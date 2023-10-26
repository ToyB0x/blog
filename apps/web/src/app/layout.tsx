import 'server-only'

import { Providers } from './providers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ToyB0xのBlog',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicons/favicon.ico" />
        <title>ToyB0xのBlog</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
