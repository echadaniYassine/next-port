// src/types/i18n.ts - TypeScript Types
import { type Language } from '../lib/i18n-config'

export interface TranslationProps {
  locale: Language
}

// Updated for Next.js 15: params must be Promise
export interface PageProps {
  params: Promise<{ locale: Language }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Updated for Next.js 15: params must be Promise
export interface AppLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Language }>
}