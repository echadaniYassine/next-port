"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { SectionDecorator } from "./SectionDecorator"
import Loading from "../app/Loading"

const ROLES = [
  { text: "Full Stack Developer", gradient: "from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl" },
  { text: "React Specialist", gradient: "from-blue-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl" },
  { text: "UI/UX Enthusiast", gradient: "from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl" },
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
      <Loading />
    )
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center z-10 mt-16 sm:mt-0">
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
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight text-center animate-fade-in [animation-delay:0.2s] space-y-2 break-words leading-tight">
                <span className="block animate-gradient-x bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
                  Echadani Yassine
                </span>

                <div className="relative inline-block glitch-wrapper">
                  {/* Base Layer */}
                  <span className="block relative z-10 bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-2xl">
                    Full Stack Developer
                  </span>

                  {/* Glitch Layer 1 */}
                  <span className="absolute top-0 left-0 w-full h-full z-0 text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 bg-clip-text animate-glitch1 pointer-events-none">
                    Full Stack Developer
                  </span>

                  {/* Glitch Layer 2 */}
                  <span className="absolute top-0 left-0 w-full h-full z-0 text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 bg-clip-text animate-glitch2 pointer-events-none">
                    Full Stack Developer
                  </span>
                </div>

              </h1>

              <div className="flex justify-center">
                <div className="w-32 md:w-48 h-1 bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent animate-pulse rounded-full shadow-lg shadow-gray-800/30 dark:shadow-white/20" />
              </div>
            </div>


          </div>

          {/* Role */}
          <div className="min-h-[60px] sm:min-h-[80px] flex flex-col items-center justify-center animate-fade-in space-y-3">
            <SectionDecorator variant="default">
              <p className={`text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r ${currentRoleData.gradient} transition-all duration-1000 ease-in-out`}>
                {currentRoleData.text}
              </p>
            </SectionDecorator>
          </div>

          {/* Description */}
          <div className="relative animate-fade-in [animation-delay:0.6s]">
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Passionate about creating{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                  amazing web experiences
                </span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 animate-scale-x animation-delay-2000" />
              </span>{" "}
              with modern technologies. I transform ideas into beautiful, functional, and user-friendly applications.
            </p>
          </div>

          { /* CTA Buttons */}

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-6 sm:pt-8 animate-fade-in px-4">
            <SectionDecorator variant="card">
              <button
                onClick={scrollToProjects}
                className="cursor-pointer group relative w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 border-2 border-purple-500 font-bold text-sm sm:text-base lg:text-lg rounded-xl sm:rounded-2xl shadow-lg transition-all duration-500 hover:shadow-purple-500/25 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/30 min-w-[200px] sm:min-w-[220px] overflow-hidden"
                aria-label="View my projects"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-600 opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                />
                <span className="relative z-10 flex items-center justify-center">

                  <span className="text-white group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-red-600 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
                    View My Work
                  </span>

                  <svg
                    className="w-5 h-5 ml-2 text-white group-hover:text-purple-500 transition-transform group-hover:translate-x-1 transition-colors duration-300"
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
                aria-label="Get in touch with me"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <span className="relative z-10 flex items-center justify-center">
                  <span className="bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent transition-all duration-300 group-hover:text-white group-hover:bg-none">
                    Get In Touch
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

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in">
        <SectionDecorator variant="minimal">
          <div className="flex flex-col items-center space-y-3 animate-bounce">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Scroll to explore</span>
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
