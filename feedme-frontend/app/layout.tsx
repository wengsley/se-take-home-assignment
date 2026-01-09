import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "McDonald's Order Management System",
  description: 'Order management system for automated cooking bots',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

