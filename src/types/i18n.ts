// ===========================================
// 9. src/types/i18n.ts - TypeScript Types
// ===========================================
import { type Language } from '../lib/i18n-config'

export interface TranslationProps {
  locale: Language
}

export interface PageProps {
  params: { locale: Language }
}

// 🔥 Rename to avoid collision with Next.js internal LayoutProps
export interface AppLayoutProps {
  children: React.ReactNode
  params: { locale: Language }
}