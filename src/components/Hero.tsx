"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { SectionDecorator } from "./SectionDecorator"

const ROLES = [
  { text: "Full Stack Developer", gradient: "from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-2xl" },
  { text: "React Specialist", gradient: "from-blue-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl" },
  { text: "UI/UX Enthusiast", gradient: "from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-2xl" },
  { text: "Problem Solver", gradient: "from-blue-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl" },
] as const

const STATS = [
  { number: "5+", label: "Years Experience", icon: "⏰" },
  { number: "50+", label: "Projects Completed", icon: "🚀" },
  { number: "30+", label: "Happy Clients", icon: "😊" },
] as const

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentRole, setCurrentRole] = useState(0)

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const scrollToProjects = useCallback(() => scrollToSection("projects"), [scrollToSection])
  const scrollToContact = useCallback(() => scrollToSection("contact"), [scrollToSection])

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % ROLES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const currentRoleData = useMemo(() => ROLES[currentRole], [currentRole])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center z-10">
        <div className="space-y-8">
          {/* Greeting */}
          <div className="space-y-6">
            <SectionDecorator variant="hero">
              <p className="text-lg md:text-xl text-muted-foreground font-medium animate-fade-in">
                <span className="inline-block animate-bounce" role="img" aria-label="waving hand">
                  👋
                </span>{" "}
                Hello, I&apos;m
              </p>
            </SectionDecorator>

            {/* Name */}
            {/* Enhanced Name with better typography */}
            <div className="relative space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight text-center animate-fade-in [animation-delay:0.2s] space-y-2">
                <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Echadani Yassine
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Full Stack Developer
                </span>
              </h1>

              <div className="flex justify-center">
          <div className="w-32 md:w-48 h-1 bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent animate-pulse rounded-full shadow-lg shadow-gray-800/30 dark:shadow-white/20" />
        </div>
            </div>


          </div>

          {/* Role */}
          <div className="h-24 flex items-center justify-center animate-fade-in [animation-delay:0.4s]">
            <SectionDecorator variant="default">
              <p
                className={`text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${currentRoleData.gradient} bg-clip-text text-transparent transition-all duration-1000 ease-in-out`}
              >
                {currentRoleData.text}
              </p>
            </SectionDecorator>

            {/* Role indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {ROLES.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentRole
                    ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                    : "bg-muted-foreground/30"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="relative animate-fade-in [animation-delay:0.6s]">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Passionate about creating{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                  amazing web experiences
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 animate-scale-x animation-delay-2000" />
              </span>{" "}
              with modern technologies. I transform ideas into beautiful, functional, and user-friendly applications.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 animate-fade-in [animation-delay:0.8s]">
            <SectionDecorator variant="card">
              <button
                onClick={scrollToProjects}
                className="group relative px-10 py-5 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 text-primary-foreground font-bold text-lg rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-primary/25 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30 min-w-[220px] overflow-hidden"
                aria-label="View my projects"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-purple-600/80 to-indigo-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                <span className="relative z-10 flex items-center justify-center">
                  View My Work
                  <svg
                    className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
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
                className="group relative px-10 py-5 border-2 border-foreground text-foreground font-bold text-lg rounded-2xl hover:bg-foreground hover:text-background transition-all duration-500 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-foreground/30 min-w-[220px] overflow-hidden backdrop-blur-sm bg-background/10"
                aria-label="Get in touch with me"
              >
                <div className="absolute inset-0 bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="relative z-10 flex items-center justify-center">
                  Get In Touch
                  <svg
                    className="w-5 h-5 ml-2 transition-transform group-hover:rotate-12"
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in [animation-delay:1.2s]">
        <SectionDecorator variant="minimal">
          <div className="flex flex-col items-center space-y-3 animate-bounce">
            <span className="text-sm text-muted-foreground font-medium">Scroll to explore</span>
            <div className="relative">
              <svg
                className="w-6 h-6 text-muted-foreground"
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
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-ping" />
            </div>
          </div>
        </SectionDecorator>
      </div>
    </section>
  )
}
