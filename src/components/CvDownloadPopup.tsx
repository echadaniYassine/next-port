"use client"

import { useEffect } from "react"
import { useTranslation } from '../lib/i18n/client'
import { type Language } from '../lib/i18n-config'

interface CvDownloadPopupProps {
  open: boolean
  onClose: () => void
  label: string
  locale: Language
}

const CV_OPTIONS = [
  {
    flag:     "🇬🇧",
    lang:     "English",
    filename: "Echadani_Yassine_EN.pdf",
    href:     "./cv/Echadani_yassine_en.pdf",
  },
  {
    flag:     "🇫🇷",
    lang:     "Français",
    filename: "Echadani_Yassine_FR.pdf",
    href:     "./cv/Echadani_yassine_fr.pdf",
  },
] as const

export default function CvDownloadPopup({ open, onClose, label, locale }: CvDownloadPopupProps) {
  const { t } = useTranslation(locale, 'common')

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      aria-modal="true"
      role="dialog"
      aria-label={label}
    >
      <div className="relative w-[300px] mx-4 bg-background rounded-2xl border border-border p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-base font-semibold text-foreground mb-1">{label}</p>
        <p className="text-xs text-muted-foreground mb-5">
          {t('cv.popupSubtitle' as any)}
        </p>

        <div className="flex flex-col gap-3">
          {CV_OPTIONS.map(({ flag, lang, filename, href }) => (
            <a                                              // ← was broken (missing "<a")
              key={lang}
              href={href}
              download={filename}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-accent/5 hover:bg-accent/10 hover:border-border-strong transition-all duration-200 group"
            >
              <span className="text-2xl" aria-hidden="true">{flag}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{lang}</p>
                <p className="text-xs text-muted-foreground truncate">{filename}</p>
              </div>
              <svg
                className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          ))}
        </div>

      </div>
    </div>
  )
}