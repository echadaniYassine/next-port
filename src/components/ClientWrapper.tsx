// src/components/ClientWrapper.tsx 
'use client'

import { useEffect, useState } from 'react'
import { type Language } from '../lib/i18n-config'

interface ClientWrapperProps {
  children: React.ReactNode
  locale: Language
}

export default function ClientWrapper({ children, locale }: ClientWrapperProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="opacity-0">{children}</div>
  }

  return <>{children}</>
}