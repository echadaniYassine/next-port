// src/components/LanguageSwitcher.tsx
'use client'

import { useRouter, usePathname } from 'next/navigation'
import { languages, type Language } from '../lib/i18n-config'
import { useTransition } from 'react'
import { useTranslation } from '../lib/i18n/client'

interface Props {
  locale: Language
  ariaLabel?: string
  switchToLabel?: string
}

export default function LanguageSwitcher({ locale, ariaLabel, switchToLabel }: Props) {
  // Access your custom client translator hook
  const { t } = useTranslation(locale, 'common')
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const otherLang = locale === 'en' ? 'fr' : 'en'

  const switchLanguage = () => {
    const segments = pathname.split('/')
    segments[1] = otherLang
    startTransition(() => {
      router.push(segments.join('/'))
    })
  }

  // FIXED: Using your exact JSON translation keys and bypass rigorous type checks
  const resolvedAriaLabel = ariaLabel || t('nav.languageSelector' as any) || 'Select language'
  const resolvedSwitchToLabel = switchToLabel || t('nav.switchTo' as any) || 'Switch to'

  return (
    <div role="group" aria-label={resolvedAriaLabel}>
      <button
        onClick={switchLanguage}
        disabled={isPending}
        className="bg-transparent text-foreground px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 cursor-pointer"
        aria-label={`${resolvedSwitchToLabel} ${otherLang === 'en' ? 'English' : 'Français'}`}
      >
        {isPending ? '...' : locale.toUpperCase()}
      </button>
    </div>
  )
}