import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Github Blog',
    default: 'Github Blog',
  },
  icons: {
    icon: '/assets/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <body className="antialiased">
        <Header />
        <div className="font-nunito mx-auto min-h-screen w-216 px-5">
          <main className="">{children}</main>
        </div>
      </body>
    </html>
  )
}
