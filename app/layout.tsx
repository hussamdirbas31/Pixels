import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PixelCraft',
  description: 'Discover and save creative designs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-slate-900">
      <body className={`${inter.className} h-full min-h-screen flex flex-col text-slate-100`}>
        <Navbar />
        <main className="flex-1 w-full container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 mt-16">
          {children}
        </main>
      </body>
    </html>
  )
}