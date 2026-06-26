'use client'

import { useMemo } from 'react'
import { type Language } from '../i18n-config'
import { getT, type TranslationKey } from './translations'

export function useTranslation(locale: Language, _ns?: string) {
  const t = useMemo(() => getT(locale), [locale])
  return { 
    t: (key: TranslationKey, fallback?: string) => t(key, fallback) 
  }
}