"use client"

import { useRef, useEffect, useState } from "react"
import { SectionDecorator } from "./SectionDecorator"
import { useTranslation } from '../lib/i18n/client'
import { type Language } from '../lib/i18n-config'

const EDUCATION = [
  {
    school: "École HighTech",
    degree: "Licence en Génie Informatique",
    location: "Rabat, Maroc",
    period: "2025 — 2026",
    current: true,
    emoji: "🎓",
    dotColor: "#7F77DD",
    // Tailwind classes instead of raw hex
    iconBgClass: "bg-purple-500/10",
    cardClass: "border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10",
    degreeClass: "text-purple-600 dark:text-purple-400",
  },
  {
    school: "ISTA NTIC Hay Riad",
    degree: "Développement Digital Web Full Stack",
    location: "Rabat, Maroc",
    period: "2022 — 2024",
    current: false,
    emoji: "💻",
    dotColor: "#378ADD",
    iconBgClass: "bg-blue-500/10",
    cardClass: "border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10",
    degreeClass: "text-blue-600 dark:text-blue-400",
  },
  {
    school: "Lycée Med Abid Eljabiri",
    degree: "Baccalauréat Scientifique (SVT)",
    location: "Témara, Maroc",
    period: "2022",
    current: false,
    emoji: "📚",
    dotColor: "#1D9E75",
    iconBgClass: "bg-teal-500/10",
    cardClass: "border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10",
    degreeClass: "text-teal-600 dark:text-teal-400",
  },
] as const
interface EduCardProps {
  edu: (typeof EDUCATION)[number]
  index: number
  isVisible: boolean
  currentLabel: string
}

function EduCard({ edu, index, isVisible, currentLabel }: EduCardProps) {
  return (
    <div
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className={`rounded-2xl p-5 space-y-3 hover:scale-[1.02] transition-all duration-300 border ${edu.cardClass}`}
        // ↑ removed inline style entirely — all via Tailwind now
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">

            <div
              className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl ${edu.iconBgClass}`}
              aria-hidden="true"
            >
              {edu.emoji}
            </div>

            <div>
              <h3 className="text-base font-semibold text-foreground leading-tight">
                {edu.school}
              </h3>
              <p className={`text-xs font-medium mt-0.5 leading-snug ${edu.degreeClass}`}>
                {edu.degree}
              </p>
            </div>
          </div>

          {edu.current && (
            <span className="shrink-0 inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              {currentLabel}
            </span>
          )}
        </div>

        {/* Meta row — border-border works in both modes */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border">
          {/* ↑ was border-black/[.06] dark:border-white/[.08] — border-border handles both */}
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {edu.period}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {edu.location}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── AcademieInline ── used inside About right column ─────────────────────────

interface AcademieInlineProps {
  locale: Language
  isVisible: boolean
}

export function AcademieInline({ locale, isVisible }: AcademieInlineProps) {
  const { t } = useTranslation(locale, 'common')
  const currentLabel = t('academie.current' as any) || "En cours"

  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div
        className="absolute left-[1.375rem] top-0 bottom-0 w-px bg-border"
        aria-hidden="true"
      />

      <div className="space-y-6 pl-14">
        {EDUCATION.map((edu, index) => (
          <div key={edu.school} className="relative">
            {/* Timeline dot */}
            <div
              className="absolute -left-[3.125rem] top-5 w-4 h-4 rounded-full border-2 border-background z-10"
              style={{ background: edu.dotColor }}
              aria-hidden="true"
            />
            <EduCard
              edu={edu}
              index={index}
              isVisible={isVisible}
              currentLabel={currentLabel}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Academie standalone section ──────────────────────────────────────────────

interface AcademieProps {
  locale: Language
}

export default function Academie({ locale }: AcademieProps) {
  const { t } = useTranslation(locale, 'common')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = sectionRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(target)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="academie"
      ref={sectionRef}
      className="relative py-20 bg-transparent transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <header className="text-center mb-16">
          <SectionDecorator variant="default">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('academie.title' as any)}
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse rounded-full" />
            </div>
          </SectionDecorator>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('academie.subtitle' as any)}
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          <AcademieInline locale={locale} isVisible={isVisible} />
        </div>

      </div>
    </section>
  )
}