// src/components/LanguageSwitcher.tsx - Optimized Version
'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from '../lib/i18n/client'
import { languages, type Language } from '../lib/i18n-config'
import { useState, useTransition, useCallback } from 'react'

interface LanguageSwitcherProps {
  locale: Language
}

const languageNames: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { t, i18n } = useTranslation(locale)
  const [isPending, startTransition] = useTransition()
  const [isChanging, setIsChanging] = useState(false)

  const switchLanguage = useCallback(async (lng: Language) => {
    if (lng === locale || isChanging) return

    setIsChanging(true)

    try {
      // Store current scroll position
      const scrollY = window.scrollY

      // Get current pathname
      const segments = pathname.split('/').filter(Boolean)

      // Check if the first segment is a language code
      const currentLangInPath = segments[0]
      const isCurrentLangInPath = languages.includes(
        currentLangInPath as Language
      )

      let newPath: string

      if (isCurrentLangInPath) {
        // Replace the existing language with the new one
        segments[0] = lng
        newPath = '/' + segments.join('/')
      } else {
        // Add the new language at the beginning
        newPath = '/' + lng + (pathname === '/' ? '' : pathname)
      }

      // Change i18n language first
      await i18n.changeLanguage(lng)

      // Use router.replace instead of router.push to avoid adding to history
      startTransition(() => {
        router.replace(newPath, { scroll: false })
      })

      // Restore scroll position after navigation
      setTimeout(() => {
        window.scrollTo(0, scrollY)
        setIsChanging(false)
      }, 100)

    } catch (error) {
      console.error('Language switch failed:', error)
      setIsChanging(false)
    }
  }, [locale, isChanging, pathname, i18n, router])

  return (
    <div className="flex gap-2" role="group" aria-label={t('nav.languageSelector')}>
      {languages.map((lng) => (
        locale === lng && (
          <button
            key={lng}
            onClick={() => switchLanguage(lng === 'en' ? 'fr' : 'en')}
            disabled={isChanging || isPending}
            className="bg-transparent text-foreground px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 cursor-pointer"
            aria-label={`${t('nav.switchTo')} ${languageNames[lng === 'en' ? 'fr' : 'en']}`}
            aria-pressed={true}
          >
            {isChanging ? (
              <span className="animate-spin">⟳</span>
            ) : (
              lng.toUpperCase()
            )}
          </button>
        )
      ))}
    </div>
  )
}