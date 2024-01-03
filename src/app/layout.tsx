import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import DrawMenu from '@/components/DrawMenu/DrawMenu';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Timer App',
  description: 'Generated by create next app',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='page-header'>
          Timer
        </div>
        <DrawMenu />
        {children}
      </body>
    </html>
  )
}
