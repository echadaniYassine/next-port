// ===========================================
// 3. app/i18n/client.ts - Client-side i18n
// ===========================================
'use client'

import { useEffect } from 'react'
import i18next from 'i18next'
import { 
  initReactI18next, 
  useTranslation as useTranslationOrg,
  UseTranslationOptions
} from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, languages, cookieName, type Language, type Namespace } from '../../lib/i18n-config'

const runsOnServerSide = typeof window === 'undefined'

// Initialize i18next for client side
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: string, namespace: string) =>
      import(`../../../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // Let detect the language on client side
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
      caches: ['cookie'],
    },
    preload: runsOnServerSide ? languages : []
  })

export function useTranslation(
  lng: Language,
  ns: Namespace = 'common',
  options?: UseTranslationOptions<string>
) {
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  
  // Handle language changes
  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return
    i18n.changeLanguage(lng)
  }, [lng, i18n])
  
  return ret
}