import './globals.css'
import type { Metadata } from 'next'
import { Inter } from "next/font/google"
import AuthProvider from '@/components/auth/auth-provider'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'StartTex',
  description: 'StartTex Startup Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
