"use client"

import Image from "next/image"
import { useState, useEffect, useRef, useCallback } from "react"
import { SectionDecorator } from "./SectionDecorator"

const FINAL_COUNTS = { experience: 5, projects: 50, clients: 30 } as const
const SKILLS = [
  { name: "Frontend Development", level: 95 },
  { name: "Backend Development", level: 95 },
  { name: "UI/UX Design", level: 80 },
  { name: "CMS", level: 90 },
  { name: "Mobile Development", level: 75 },

] as const

const STATS = [
  { key: "experience" as const, label: "Years Experience", color: "blue" },
  { key: "projects" as const, label: "Projects Completed", color: "purple" },
  { key: "clients" as const, label: "Happy Clients", color: "green" },
] as const

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState({ experience: 0, projects: 0, clients: 0 })
  const aboutRef = useRef<HTMLElement>(null)

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
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
              {/* <div className="flex justify-center">
                <div className="w-32 md:w-48 h-1 bg-gradient-to-r from-transparent via-gray-800 dark:via-white to-transparent animate-pulse rounded-full shadow-lg shadow-gray-800/30 dark:shadow-white/20" />
              </div> */}
            </div>
          </SectionDecorator>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate developer with a love for creating exceptional digital experiences
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
                    src="/placeholder.svg?height=400&width=400&text=Profile"
                    alt="Echadani Yassine - Full Stack Developer"
                    fill
                    className="object-contain p-8 transition-transform duration-300 hover:scale-105"
                    priority
                  />
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    Available for work
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
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m a{" "}
                <span className="font-semibold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent dark:from-red-500 dark:to-purple-500">
                  Full Stack Developer
                </span>{" "}
                Skilled in both frontend and backend, driven by a passion for building efficient, user-focused applications.
              </p>
              {/* <p className="text-lg text-muted-foreground leading-relaxed">
                Skilled in both frontend and backend, I enjoy solving problems with clean, scalable code and continually
                exploring new technologies.
              </p> */}
            </div>


            {/* Skills Progress Bars */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Core Skills</h3>
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

            {/* Stats
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {STATS.map((stat, index) => (
                <SectionDecorator key={stat.key} variant="minimal">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{counters[stat.key]}+</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </SectionDecorator>
              ))}
            </div> */}

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <SectionDecorator variant="card">
                <button className="cursor-pointer px-6 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50">
                  Download CV
                </button>
              </SectionDecorator>
              <SectionDecorator variant="card">
                <button className="cursor-pointer px-6 py-3 border-2 border-foreground text-foreground font-semibold rounded-lg hover:bg-foreground hover:text-background transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-foreground/30">
                  Contact Me
                </button>
              </SectionDecorator>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
