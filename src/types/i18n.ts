import { type Language } from '../lib/i18n-config'

export interface TranslationProps {
  locale: Language
}

export interface PageProps {
  params: Promise<{ locale: Language }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export interface AppLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Language }>
}