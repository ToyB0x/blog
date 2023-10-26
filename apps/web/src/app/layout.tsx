import 'server-only'

import { Providers } from './providers'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ToyB0xのBlog',
  icons: '/favicons/favicon.ico',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
