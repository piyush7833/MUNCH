import Navbar from '../components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Notifications from '../components/Notifications'
import Footer from '../components/Footer'
import { ThemeProvider } from '@/context/themeContext/ThemeContext'
import AuthProvider from '@/components/AuthProvider'
import QuerryProvider from '@/components/QuerryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MUNCH',
  description: 'Mobile Utility for Nourishing Campus Hunger',
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
          <QuerryProvider>
            <ThemeProvider>
              <Navbar />
              <Notifications />
              {children}
              <Footer />
            </ThemeProvider>
          </QuerryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
