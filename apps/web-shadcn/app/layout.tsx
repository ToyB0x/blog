import Link from 'next/link'
import Image from 'next/image'
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@/components/analytics'
import { ModeToggle } from '@/components/mode-toggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ToyB0xのBlog',
  icons: '/favicons/favicon.ico',
}

interface RootLayoutProps {
  children: React.ReactNode
}

// ref: https://github.com/shadcn/next-contentlayer/blob/5b32397c2034a97a077cd695f3421a2e76af05c5/app/layout.tsx
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body
        className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="max-w-2xl mx-auto py-10 px-4">
            <header>
              <div className="flex items-center justify-between">
                {/* left items */}
                <div className="text-3xl font-medium">
                  <Link href="/">
                    ToyB
                    <span className="text-blue-300">0</span>x
                    <Image
                      src="/avatar/avatar.png"
                      width={36}
                      height={36}
                      alt="Picture of the author"
                      className="inline mb-1"
                    />
                  </Link>
                </div>

                {/* right items */}
                <div className="ml-auto space-x-6 flex">
                  <nav className="font-medium space-x-6">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                  </nav>
                  <div>
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </header>
            <main>{children}</main>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
