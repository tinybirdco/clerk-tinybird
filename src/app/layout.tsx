import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { TinybirdProvider } from './providers/TinybirdProvider'
import { RootLayoutContent } from './components/RootLayoutContent'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const token = headersList.get('x-tinybird-token') || ''

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TinybirdProvider>
            <RootLayoutContent initialToken={token}>
              {children}
            </RootLayoutContent>
          </TinybirdProvider>
        </body>
      </html>
    </ClerkProvider>
  )
} 