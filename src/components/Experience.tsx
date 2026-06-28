"use client"

import { useRef, useEffect, useState } from "react"
import { SectionDecorator } from "./SectionDecorator"
import { useTranslation } from '../lib/i18n/client'
import { type Language } from '../lib/i18n-config'

interface ExperienceProps {
  locale: Language
}

export default function Experience({ locale }: ExperienceProps) {
  const { t } = useTranslation(locale, 'common')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const target = sectionRef.current
    if (!target) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(target) } },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    )
    obs.observe(target)
    return () => obs.disconnect()
  }, [])

  const experiences = [
    {
      key:      "asic",
      company:  t('experience.asic.company'  as any),
      role:     t('experience.asic.role'     as any),
      period:   t('experience.asic.period'   as any),
      location: t('experience.asic.location' as any),
      type:     t('experience.typeFullTime'   as any),   // "Full-time"
      typeVariant: "job" as const,
      tasks: [
        t('experience.asic.task1' as any),
        t('experience.asic.task2' as any),
        t('experience.asic.task3' as any),
      ],
      tags: ["PHP", "HMVC", "Laravel", "Full Stack"],
    },
    {
      key:      "stationA",
      company:  t('experience.stationA.company'  as any),
      role:     t('experience.stationA.role'     as any),
      period:   t('experience.stationA.period'   as any),
      location: t('experience.stationA.location' as any),
      type:     t('experience.typeInternship'    as any),  // "Internship"
      typeVariant: "intern" as const,
      tasks: [
        t('experience.stationA.task1' as any),
      ],
      tags: ["WordPress", "WooCommerce", "Laravel"],
    },
    {
      key:      "thinkGroup",
      company:  t('experience.thinkGroup.company'  as any),
      role:     t('experience.thinkGroup.role'     as any),
      period:   t('experience.thinkGroup.period'   as any),
      location: t('experience.thinkGroup.location' as any),
      type:     t('experience.typeInternship'      as any),
      typeVariant: "intern" as const,
      tasks: [
        t('experience.thinkGroup.task1' as any),
      ],
      tags: ["ReactJS", "PhaserJS", "Shopify"],
    },
  ]

  const typeBadgeClass: Record<"job" | "intern", string> = {
    job:    "bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20",
    intern: "bg-green-500/10  text-green-700  dark:text-green-300  border border-green-500/20",
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 bg-transparent transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <header className="text-center mb-16">
          <SectionDecorator variant="default">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('experience.title' as any)}
              </h2>
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse rounded-full" />
            </div>
          </SectionDecorator>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('experience.subtitle' as any)}
          </p>
        </header>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">

          {/* Vertical gradient line */}
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-purple-500 via-pink-400 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.key}
                className={`relative flex gap-6 transition-all duration-700 ease-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Timeline dot */}
                <div className="relative z-10 mt-5 shrink-0">
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 ring-4 ring-background" />
                </div>

                {/* Card */}
                <div className="flex-1 min-w-0 rounded-2xl border border-border bg-accent/5 hover:bg-accent/10 hover:border-border-strong transition-all duration-300 p-5 sm:p-6">

                  {/* Top row */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div className="min-w-0">

                      {/* Company + type badge */}
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-foreground leading-tight">
                          {exp.company}
                        </h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeBadgeClass[exp.typeVariant]}`}>
                          {exp.type}
                        </span>
                      </div>

                      {/* Role */}
                      <p className="text-sm font-semibold text-purple-500 mb-1">
                        {exp.role}
                      </p>

                      {/* Location */}
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {exp.location}
                      </p>
                    </div>

                    {/* Period pill */}
                    <span className="shrink-0 text-xs font-medium px-3 py-1 rounded-full border border-border text-muted-foreground bg-background">
                      {exp.period}
                    </span>
                  </div>

                  {/* Tasks */}
                  <ul className="space-y-2 mb-4">
                    {exp.tasks.filter(Boolean).map((task, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}