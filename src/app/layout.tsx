// src/app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio — Echadani Yassine',
  description: 'Full Stack Developer portfolio — React, Next.js, Laravel',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <>{children}</>
}