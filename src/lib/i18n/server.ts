import { type Language } from '../i18n-config'
import { getT, type TranslationKey } from './translations'

export async function getTranslation(locale: Language, _ns?: string) {
  const t = getT(locale)
  // Re-map signature to export type-safeties safely across async bounds
  return { 
    t: (key: TranslationKey, fallback?: string) => t(key, fallback) 
  }
}