"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { SectionDecorator } from "./SectionDecorator"
import { useTranslation } from '../lib/i18n/client'
import { type Language } from '../lib/i18n-config'
import { AcademieInline } from "./academie"
import CvDownloadPopup from "./CvDownloadPopup"

const FINAL_COUNTS = { experience: 1, projects: 12, clients: 30 } as const

interface AboutProps {
  locale: Language
}

// ─── About ────────────────────────────────────────────────────────────────────
export default function About({ locale }: AboutProps) {
  const { t } = useTranslation(locale, 'common')
  const [isVisible, setIsVisible]       = useState(false)
  const [cvPopupOpen, setCvPopupOpen]   = useState(false)
  const [counters, setCounters]         = useState({ experience: 0, projects: 0, clients: 0 })
  const aboutRef = useRef<HTMLElement>(null)

  const SKILLS = useMemo(() => [
    { name: t('about.skills.frontendDevelopment' as any), level: 95 },
    { name: t('about.skills.backendDevelopment'  as any), level: 95 },
    { name: t('about.skills.mobileDevelopment'   as any), level: 75 },
    { name: t('about.skills.uiUxDesign'          as any), level: 80 },
    { name: t('about.skills.cms'                 as any), level: 90 },
  ], [t])

  // Counter animation
  useEffect(() => {
    if (!isVisible) return
    let startTime: number | null = null
    const duration = 1600
    let raf: number

    const tick = (ts: number) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      setCounters({
        experience: Math.floor(p * FINAL_COUNTS.experience),
        projects:   Math.floor(p * FINAL_COUNTS.projects),
        clients:    Math.floor(p * FINAL_COUNTS.clients),
      })
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isVisible])

  // Intersection observer
  useEffect(() => {
    const target = aboutRef.current
    if (!target) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(target) } },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    )
    obs.observe(target)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={aboutRef} className="relative py-20 bg-transparent transition-colors duration-300">

      {/* CV language popup — rendered in a portal-like fixed overlay */}
    <CvDownloadPopup                               // ← was <CvPopup>
        open={cvPopupOpen}
        onClose={() => setCvPopupOpen(false)}
        label={t('about.Download' as any) || "Download CV"}
        locale={locale}                              // ← new prop
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <header className="text-center mb-16">
          <SectionDecorator variant="default">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('about.title' as any)}
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse rounded-full" />
            </div>
          </SectionDecorator>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle' as any)}
          </p>
        </header>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── LEFT ── */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* Eyebrow + headline */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-500">
                {t('about.roleLabel' as any)}
              </span>
              <h3 className="text-3xl font-bold text-foreground mt-1 leading-tight">
                {t('about.headline' as any)}
              </h3>
            </div>

            {/* Bio */}
            <div
              className="text-base text-muted-foreground leading-relaxed [&_span]:text-foreground [&_span]:font-semibold"
              dangerouslySetInnerHTML={{ __html: t('about.description' as any) || "" }}
            />

            {/* Status pills */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {t('about.status' as any)}
              </span>
              <span className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">
                Témara, Maroc
              </span>
              <span className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground">
                {t('about.remoteLabel' as any)}
              </span>
            </div>

            {/* Counters */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: counters.experience, label: t('about.stats.experience' as any) },
                { value: counters.projects,   label: t('about.stats.projects'   as any) },
                { value: counters.clients,    label: t('about.stats.clients'    as any) },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-accent/5 p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stat.value}+</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Skill bars */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">
                {t('about.coreSkills' as any)}
              </h4>
              {SKILLS.map((skill, index) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/80 font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 80}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* ── CTAs: equal width, side by side ── */}
            <div className="grid grid-cols-2 gap-3 pt-2">

              {/* Download CV — opens popup */}
              <button
                type="button"
                onClick={() => setCvPopupOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('about.Download' as any)}
              </button>

              {/* Contact */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-foreground text-foreground font-semibold rounded-xl text-sm hover:bg-foreground hover:text-background transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-foreground/30"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t('nav.contact' as any)}
              </a>

            </div>
          </div>

          {/* ── RIGHT: Education timeline ── */}
          <div
            className={`transition-all duration-1000 delay-150 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-500">
                {t('academie.eyebrow' as any)}
              </span>
              <h3 className="text-2xl font-bold text-foreground mt-1">
                {t('academie.title' as any)}
              </h3>
            </div>

            <AcademieInline locale={locale} isVisible={isVisible} />
          </div>

        </div>
      </div>
    </section>
  )
}