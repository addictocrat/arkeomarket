import type { ReactNode } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Analytics } from '@/components/Analytics'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Anek_Bangla } from 'next/font/google'
import './globals.css'

const anekBangla = Anek_Bangla({
  subsets: ['bengali', 'latin'],
  display: 'swap',
  variable: '--font-anek-bangla',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
})

const { SITE_NAME, TWITTER_CREATOR, TWITTER_SITE } = process.env
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(baseUrl),
  robots: {
    follow: true,
    index: true,
  },
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={[GeistSans.variable, GeistMono.variable, anekBangla.variable]
        .filter(Boolean)
        .join(' ')}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar />
          <LivePreviewListener />

          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
