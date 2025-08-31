// src/lib/i18n-config.ts - Core Configuration
export const fallbackLng = 'en' as const
export const languages = ['en', 'fr'] as const
export const defaultNS = 'common' as const
export const cookieName = 'i18next' as const

export type Language = (typeof languages)[number]
export type Namespace = typeof defaultNS

// Fixed getOptions function with proper typing
export function getOptions(lng: Language = fallbackLng, ns: Namespace = defaultNS) {
  return {
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
  }
}