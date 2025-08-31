// src/lib/i18n/client.ts - Alternative simplified approach
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
  languages,
  fallbackLng,
  defaultNS,
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
      supportedLngs: languages,
      fallbackLng,
      fallbackNS: defaultNS,
      defaultNS,
      ns: defaultNS,
      lng: undefined, // Let detector handle this
      detection: {
        order: ['path', 'htmlTag', 'cookie', 'navigator'],
        caches: ['cookie'],
        cookieName,
        lookupFromPathIndex: 0,
        lookupFromSubdomainIndex: 0,
      },
      preload: runsOnServerSide ? languages : [],
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      debug: process.env.NODE_ENV === 'development',
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

  useEffect(() => {
    if (!lng || i18n.resolvedLanguage === lng) return
    
    const changeLanguage = async () => {
      try {
        await i18n.changeLanguage(lng)
        setActiveLng(lng)
        
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