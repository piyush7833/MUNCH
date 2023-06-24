import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IIITU Canteen',
  description: 'Order foods on the go',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-gray-950 bg-slate-100 dark:text-gray-200 dark:bg-gray-950 bg-gradient-to-r`}>{children}</body>
    </html>
  )
}
