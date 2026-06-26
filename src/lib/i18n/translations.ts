import en from '../../../public/locales/en/common.json'
import fr from '../../../public/locales/fr/common.json'
import { type Language } from '../i18n-config'

const translations = { en, fr } as const

// 1. Recursive type mapper to extract full dot-notation paths from JSON shapes
type PathsToStringProps<T> = T extends string
  ? []
  : {
      [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>]
    }[Extract<keyof T, string>]

type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
    ? string[] extends R
      ? string
      : R extends string[]
      ? `${F}${D}${Join<R, D>}`
      : never
    : never
  : string

// 2. Export strict type tracking definitions 
export type TranslationKey = Join<PathsToStringProps<typeof en>, '.'>

export function getT(locale: Language) {
  const dict = translations[locale] ?? translations.en

  return function t(key: TranslationKey, fallback?: string): string {
    const value = key.split('.').reduce<any>((obj, k) => {
      if (obj && typeof obj === 'object') return obj[k]
      return undefined
    }, dict)

    return typeof value === 'string' ? value : fallback ?? key
  }
}