'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useTranslation } from '../lib/i18n/client'
import { languages, type Language } from '../lib/i18n-config'

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
  const { t } = useTranslation(locale)

  const switchLanguage = (lng: Language) => {
    // Get current pathname
    const segments = pathname.split('/').filter(Boolean)
    
    // Check if the first segment is a language code
    const currentLangInPath = segments[0]
    const isCurrentLangInPath = languages.includes(currentLangInPath as Language)
    
    let newPath: string
    
    if (isCurrentLangInPath) {
      // Replace the existing language with the new one
      segments[0] = lng
      newPath = '/' + segments.join('/')
    } else {
      // Add the new language at the beginning
      newPath = '/' + lng + (pathname === '/' ? '' : pathname)
    }

    // Debug logging (remove in production)
    console.log('Current pathname:', pathname)
    console.log('Current locale:', locale)
    console.log('Switching to:', lng)
    console.log('New path:', newPath)

    // Navigate to the new path
    router.push(newPath)
    
    // Optional: Force refresh if needed (uncomment if navigation doesn't work)
    // window.location.href = newPath
  }

  return (
    <div className="flex gap-2" role="group" aria-label={t('nav.languageSelector')}>
      {languages.map((lng) => (
        <button
          key={lng}
          onClick={() => switchLanguage(lng)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
            locale === lng
              ? 'bg-purple-500 text-white shadow-md'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
          aria-label={`${t('nav.switchTo')} ${languageNames[lng]}`}
          aria-pressed={locale === lng}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  )
}