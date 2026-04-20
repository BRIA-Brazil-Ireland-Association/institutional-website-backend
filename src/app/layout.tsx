import type { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'BRIA Backend',
  description: 'Headless CMS, API and Stripe boilerplate for BRIA',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
