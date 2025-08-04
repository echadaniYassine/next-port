"use client"

import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import { SectionDecorator } from "./SectionDecorator"
import { useTranslation } from '../lib/i18n/client'
import { type Language } from '../lib/i18n-config'

const FINAL_COUNTS = { experience: 5, projects: 50, clients: 30 } as const

interface AboutProps {
  locale: Language
}

export default function About({ locale }: AboutProps) {
  const { t } = useTranslation(locale, 'common')
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ experience: 0, projects: 0, clients: 0 })
  const aboutRef = useRef<HTMLElement>(null)

  // Get skills data from translations
  const SKILLS = [
    { name: t('about.skills.frontendDevelopment'), level: 95 },
    { name: t('about.skills.backendDevelopment'), level: 95 },
    { name: t('about.skills.mobileDevelopment'), level: 75 },
    { name: t('about.skills.uiUxDesign'), level: 80 },
    { name: t('about.skills.cms'), level: 90 },
  ] as const

  const STATS = [
    { key: "experience" as const, label: "Years Experience", color: "blue" },
    { key: "projects" as const, label: "Projects Completed", color: "purple" },
    { key: "clients" as const, label: "Happy Clients", color: "green" },
  ] as const

  const animateCounters = useCallback(() => {
    Object.entries(FINAL_COUNTS).forEach(([key, end]) => {
      let start = 0
      const duration = 2000
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          start = end
          clearInterval(timer)
        }
        setCounters((prev) => ({ ...prev, [key]: Math.floor(start) }))
      }, 16)
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          animateCounters()
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" },
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => observer.disconnect()
  }, [animateCounters])

  return (
    <section id="about" ref={aboutRef} className="relative py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="text-center mb-16">
          <SectionDecorator variant="default">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('about.title')}
              </h2>
              <div className="w-24 h-1 mx-auto animate-gradient-x10" />
            </div>
          </SectionDecorator>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <div
            className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
          >
            <SectionDecorator variant="card">
              <div className="relative">
                {/* Background Decorations */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-2xl -rotate-6" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-100 dark:bg-purple-900/30 rounded-2xl rotate-12" />

                {/* Main Image Container */}
                <div className="relative h-80 md:h-96 bg-gradient-to-br from-muted/50 to-muted rounded-2xl shadow-2xl overflow-hidden border border-border">
                  <Image
                    src="/img1.png"
                    alt={`${t('site.name')} - ${t('hero.title')}`}
                    fill
                    className="object-contain p-8 transition-transform duration-300 hover:scale-105"
                    priority
                  />
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    {t('about.status')}
                  </div>
                </div>
              </div>
            </SectionDecorator>
          </div>

          {/* Content Section */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
          >
            {/* Description */}
            <div className="space-y-6">
              <div
                className="text-lg text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('about.description') }}
              />
            </div>

            {/* Skills Progress Bars */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                {t('about.coreSkills')}
              </h3>
              {SKILLS.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-foreground/80">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-transparent via-purple-600 to-red-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 200}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="flex flex-row flex-wrap gap-4 pt-6 justify-center sm:justify-start">
              <SectionDecorator variant="card">
                <a
                  href="./cv/Echadani-Yassine.pdf"
                  download="Echadani_Yassine_Resume.pdf"
                  className="inline-block cursor-pointer px-6 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {t('about.Download')}
                  </span>
                </a>
              </SectionDecorator>
              <SectionDecorator variant="card">
                <a
                  href="#contact"
                  className="inline-block cursor-pointer px-6 py-3 border-2 border-foreground text-foreground font-semibold rounded-lg shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-foreground/30"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {t('nav.contact')}
                  </span>
                </a>
              </SectionDecorator>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}