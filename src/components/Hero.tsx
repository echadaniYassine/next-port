"use client"

import { useState, useEffect, useCallback } from "react"
import { SectionDecorator } from "./SectionDecorator"
import { useTranslation } from "../lib/i18n/client"
import { type Language } from "../lib/i18n-config"
import RoleDisplay from "./RoleDisplay"

const ROLES = [
  { textKey: "hero.roles.fullStackDeveloper", gradient: "from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl" },
  { textKey: "hero.roles.reactSpecialist", gradient: "from-blue-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl" },
  { textKey: "hero.roles.uiUxEnthusiast", gradient: "from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl" },
  { textKey: "hero.roles.problemSolver", gradient: "from-blue-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl" },
] as const

interface HeroProps {
  locale: Language
}

export default function Hero({ locale }: HeroProps) {
  // Use exact key safe-casting block matching your strict translation configuration rules
  const { t } = useTranslation(locale, "common")
  const [mounted, setMounted] = useState(false)
  const [currentRole, setCurrentRole] = useState(0)

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // Calculate standard navbar safety buffer headroom
      const navHeight = 80 
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth"
      })
    }
  }, [])

  const scrollToProjects = useCallback(() => scrollToSection("projects"), [scrollToSection])
  const scrollToContact = useCallback(() => scrollToSection("contact"), [scrollToSection])

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % 4) // Fast math module wrapper boundary limit matching 4 static entities
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  // Instantly available data reference resolution without extra memo tracking allocations
  const currentRoleData = ROLES[currentRole]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Main Content container wrapper */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center z-10 mt-16 sm:mt-0">
        <div className="space-y-8">
          
          {/* Greeting Block segment */}
          <div className="space-y-6">
            <SectionDecorator variant="hero">
              <p className="text-lg md:text-xl text-muted-foreground font-medium animate-fade-in">
                <span className="inline-block animate-bounce" role="img" aria-label="waving hand">
                  👋
                </span>{" "}
                {t("hero.greeting" as any)}
              </p>
            </SectionDecorator>

            {/* Main Primary Branding Title Header Display */}
            <div className="relative space-y-4">
              <h1 className="font-black text-center animate-fade-in [animation-delay:0.2s] space-y-2">
                <span className="hero-title block animate-gradient-x bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                  {t("hero.name" as any)}
                </span>
                <span className="hero-title block animate-gradient-x bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl">
                  {t("hero.title" as any)}
                </span>
              </h1>

              <div className="flex justify-center">
                <div className="w-32 md:w-48 h-1 bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent animate-pulse rounded-full shadow-lg shadow-gray-800/30 dark:shadow-white/20" />
              </div>
            </div>
          </div>

          {/* Dynamic Role Carousel Display Element Node */}
          <RoleDisplay currentRoleData={currentRoleData} t={t} />

          {/* Core Biography Description Stream Box */}
          <div className="relative animate-fade-in [animation-delay:0.6s]">
            <div
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t("hero.description" as any) || "" }}
            />
          </div>

          {/* Exact original Action CTA Button Set */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8 animate-fade-in px-4">
            <SectionDecorator variant="card">
              <button
                onClick={scrollToProjects}
                className="cursor-pointer group relative w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 border-2 border-purple-500 font-bold text-sm sm:text-base lg:text-lg rounded-xl sm:rounded-2xl shadow-lg transition-all duration-500 hover:shadow-purple-500/25 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/30 min-w-[200px] sm:min-w-[220px] overflow-hidden"
                aria-label={t("projects.title" as any) || "Projects"}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-600 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center">
                  <span className="text-white group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-red-600 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
                    {t("hero.button1" as any)}
                  </span>
                  <svg
                    className="w-5 h-5 ml-2 text-white group-hover:text-purple-500 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </SectionDecorator>

            <SectionDecorator variant="card">
              <button
                onClick={scrollToContact}
                className="cursor-pointer group relative w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 border-2 border-purple-500 font-bold text-sm sm:text-base lg:text-lg rounded-xl sm:rounded-2xl shadow-lg transition-all duration-500 hover:shadow-purple-500/25 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/30 min-w-[200px] sm:min-w-[220px] overflow-hidden"
                aria-label={t("hero.button2" as any) || "Contact"}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center">
                  <span className="bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent transition-all duration-300 group-hover:text-white group-hover:bg-none">
                    {t("contact.title" as any) || "Contact Me"}
                  </span>
                  <svg
                    className="w-5 h-5 ml-2 text-purple-500 transition-all duration-300 group-hover:text-white group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </span>
              </button>
            </SectionDecorator>
          </div>
        </div>
      </div>

      {/* Contextual Bottom Page Pointer - Only displays values if mounted safely */}
      <div className={`hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
        <SectionDecorator variant="minimal">
          <div className="flex flex-col items-center space-y-3 animate-bounce">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {t("hero.scrollDown" as any)}
            </span>
            <div className="relative">
              <svg
                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full animate-ping" />
            </div>
          </div>
        </SectionDecorator>
      </div>
    </section>
  )
}