import Navbar from '../components/common/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Notifications from '../components/common/Notifications'
import Footer from '../components/common/Footer'
import { ThemeProvider } from '@/context/themeContext/ThemeContext'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import QuerryProvider from '@/components/common/QuerryProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MUNCH',
  description: 'Mobile Utility for Nourishing Campus Hunger',
}

axios.defaults.withCredentials = true;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <QuerryProvider>
            <ThemeProvider>
              <Navbar />
              <Notifications />
              {children}
              <Footer />
              <ToastContainer position='bottom-right' theme='dark' autoClose={3000}/>
              <Analytics/>
              <SpeedInsights/>
            </ThemeProvider>
          </QuerryProvider>
      </body>
    </html>
  )
}
