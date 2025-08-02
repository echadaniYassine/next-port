// ===========================================
// 1. lib/i18n.ts - Server-side i18n utilities
// ===========================================
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { languages, fallbackLng, type Language } from './i18n-config'

const initI18next = async (lng: Language, ns: string) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../dictionaries/${language}/${namespace}.json`)
      )
    )
    .init({
      debug: false,
      supportedLngs: languages,
      fallbackLng,
      lng,
      fallbackNS: 'common',
      defaultNS: 'common',
      ns,
    })
  return i18nInstance
}

// Server-side translation function (not a hook)
export async function getTranslation(
  lng: Language, 
  ns: string = 'common',
  options: { keyPrefix?: string } = {}
) {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance
  }
}

// Client-side hook (renamed to avoid confusion)
export async function useTranslation(
  lng: Language,
  ns: string = 'common',
  options: { keyPrefix?: string } = {}
) {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance
  }
}