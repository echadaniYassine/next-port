// src/lib/i18n/client.ts - Client-side i18n
'use client'

import { useEffect, useState } from 'react'
import i18next from 'i18next'
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
  UseTranslationOptions,
} from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import {
  getOptions,
  languages,
  cookieName,
  type Language,
  type Namespace,
} from '../i18n-config'

const runsOnServerSide = typeof window === 'undefined'

// Initialize i18next for client side
if (!i18next.isInitialized) {
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
        cookieName,
      },
      preload: runsOnServerSide ? languages : [],
      react: {
        useSuspense: false, // Disable suspense to avoid hydration issues
      },
    })
}

export function useTranslation(
  lng: Language,
  ns: Namespace = 'common',
  options?: UseTranslationOptions<string>
) {
  const ret = useTranslationOrg(ns, options)
  const { i18n } = ret
  const [activeLng, setActiveLng] = useState<string>(lng)

  // Handle language changes with proper resource loading
  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return
    
    // Change language and reload resources
    const changeLanguage = async () => {
      try {
        await i18n.changeLanguage(lng)
        setActiveLng(lng)
        
        // Force reload of namespace if needed
        if (!i18n.hasResourceBundle(lng, ns)) {
          await i18n.reloadResources(lng, ns)
        }
      } catch (error) {
        console.error('Failed to change language:', error)
      }
    }
    
    changeLanguage()
  }, [lng, i18n, ns, activeLng])

  return ret
}