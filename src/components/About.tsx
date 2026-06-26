"use client"

import Image from "next/image"
import { useState, useEffect, useRef, useMemo } from "react"
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

  // OPTIMIZED: Memoized to prevent array creation on counter state ticks
  const SKILLS = useMemo(() => [
    { name: t('about.skills.frontendDevelopment' as any), level: 95 },
    { name: t('about.skills.backendDevelopment' as any), level: 95 },
    { name: t('about.skills.mobileDevelopment' as any), level: 75 },
    { name: t('about.skills.uiUxDesign' as any), level: 80 },
    { name: t('about.skills.cms' as any), level: 90 },
  ], [t])

  // OPTIMIZED: High performance requestAnimationFrame ticking for seamless counting interpolation
  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const duration = 2000
    let animationFrameId: number

    const updateCounters = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCounters({
        experience: Math.floor(progress * FINAL_COUNTS.experience),
        projects: Math.floor(progress * FINAL_COUNTS.projects),
        clients: Math.floor(progress * FINAL_COUNTS.clients),
      })

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounters)
      }
    }

    animationFrameId = requestAnimationFrame(updateCounters)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isVisible])

  useEffect(() => {
    const target = aboutRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(target) // Stop listening once triggered to preserve runtime memory
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={aboutRef} className="relative py-20 bg-transparent transition-colors duration-300">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Image Component Block Wrapper */}
          <div className={`relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
            <SectionDecorator variant="card">
              <div className="relative group">
                {/* Visual Background Accent Details */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-900/30 dark:to-blue-800/50 rounded-3xl -rotate-6 shadow-lg transition-transform duration-500 group-hover:rotate-3" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-300 dark:from-purple-900/30 dark:to-pink-800/50 rounded-3xl rotate-12 shadow-lg transition-transform duration-500 group-hover:-rotate-6" />

                {/* Main Framed Graphics Frame */}
                <div className="relative aspect-square max-w-md w-full mx-auto bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-500 group-hover:shadow-3xl group-hover:scale-[1.02]">
                  
                  {/* OPTIMIZED: Native responsive class dark toggle to eliminate flash shifts */}
                  <div className="relative w-full h-full dark:hidden">
                    <Image
                      src="/images/image_pic_light.png"
                      alt="Profile Graphic Light"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>
                  <div className="relative w-full h-full hidden dark:block">
                    <Image
                      src="/images/image_pic_dark.png"
                      alt="Profile Graphic Dark"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>

                  {/* Petite Status Floating Badge */}
                  <div className="absolute bottom-3 left-3 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md backdrop-blur-md border border-white/20 dark:border-white/10 bg-gradient-to-r from-[#6b4c52] to-[#5a4148]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      {t('about.status' as any)}
                    </div>
                  </div>
                </div>
              </div>
            </SectionDecorator>
          </div>

          {/* Copy Writing & Metric Counters Dashboard Area */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            
            {/* Rich Biography Column */}
            <div className="space-y-6">
              <div
                className="text-lg text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('about.description' as any) || "" }}
              />
            </div>

            {/* Metric Counters Dashboard Area */}
            <div className="grid grid-cols-3 gap-4 py-2 text-center bg-accent/10 rounded-2xl border border-border/20 p-4">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">{counters.experience}+</p>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">{t('about.stats.experience' as any) || 'Years Experience'}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-pink-600 dark:text-pink-400">{counters.projects}+</p>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">{t('about.stats.projects' as any) || 'Projects Completed'}</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">{counters.clients}+</p>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">{t('about.stats.clients' as any) || 'Happy Clients'}</p>
              </div>
            </div>

            {/* Skills Track Bars */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                {t('about.coreSkills' as any)}
              </h3>
              {SKILLS.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-foreground/80">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action Interactive Anchors */}
            <div className="flex flex-row flex-wrap gap-4 pt-4 justify-center sm:justify-start">
              <SectionDecorator variant="card">
                <a
                  href="./cv/Echadani_yassine_fr.pdf"
                  download="Echadani_Yassine_Resume.pdf"
                  className="inline-flex items-center gap-2 cursor-pointer px-6 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300/50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('about.Download' as any)}
                </a>
              </SectionDecorator>
              
              <SectionDecorator variant="card">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 cursor-pointer px-6 py-3 border-2 border-foreground text-foreground font-semibold rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-foreground/30"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {t('nav.contact' as any)}
                </a>
              </SectionDecorator>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}