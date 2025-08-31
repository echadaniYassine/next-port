// src/lib/i18n/server.ts - Server-side i18n
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { 
  languages, 
  fallbackLng, 
  defaultNS, 
  type Language, 
  type Namespace 
} from '../i18n-config'

const initI18next = async (lng: Language, ns: Namespace) => {
  const i18nInstance = createInstance()
  
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init({
      supportedLngs: languages,
      fallbackLng,
      lng,
      fallbackNS: defaultNS,
      defaultNS,
      ns,
      interpolation: {
        escapeValue: false, // React already handles escaping
      },
      debug: process.env.NODE_ENV === 'development',
    })
    
  return i18nInstance
}

// Server-side translation function
export async function getTranslation(
  lng: Language,
  ns: Namespace = 'common',
  options: { keyPrefix?: string } = {}
) {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng, ns, options.keyPrefix),
    i18n: i18nextInstance,
  }
}