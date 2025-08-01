"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { SectionDecorator } from "./SectionDecorator"

const SKILL_CATEGORIES = [
  {
    category: "Frontend",
    icon: "🎨",
    color: "blue" as const,
    items: [
      { name: "HTML5", level: 95, icon: "📄", description: "Semantic markup and accessibility" },
      { name: "CSS3", level: 90, icon: "🎨", description: "Modern styling and animations" },
      { name: "JavaScript", level: 92, icon: "⚡", description: "ES6+ and modern features" },
      { name: "React", level: 88, icon: "⚛️", description: "Hooks, Context, and performance" },
      { name: "Next.js", level: 85, icon: "🚀", description: "SSR, SSG, and App Router" },
      { name: "Tailwind CSS", level: 90, icon: "💨", description: "Utility-first styling" },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "purple" as const,
    items: [
      { name: "Laravel", level: 95, icon: "🔴", description: "MVC architecture and APIs" },
      { name: "Node.js", level: 85, icon: "🟢", description: "Server-side JavaScript" },
      { name: "Express", level: 82, icon: "🚄", description: "Web application framework" },
      { name: "Python", level: 80, icon: "🐍", description: "Scripting and automation" },
      { name: "RESTful APIs", level: 88, icon: "🔗", description: "API design and integration" },
    ],
  },
  {
    category: "Database",
    icon: "🗄️",
    color: "green" as const,
    items: [
      { name: "MongoDB", level: 85, icon: "🍃", description: "NoSQL document database" },
      { name: "PostgreSQL", level: 80, icon: "🐘", description: "Relational database" },
      { name: "MySQL", level: 78, icon: "🗃️", description: "Popular SQL database" },
      { name: "Redis", level: 75, icon: "🔴", description: "In-memory data structure" },
    ],
  },
  {
    category: "Tools & Others",
    icon: "🛠️",
    color: "orange" as const,
    items: [
      { name: "Git", level: 90, icon: "📝", description: "Version control system" },
      { name: "Docker", level: 75, icon: "🐳", description: "Containerization platform" },
      { name: "AWS", level: 70, icon: "☁️", description: "Cloud computing services" },
      { name: "Firebase", level: 80, icon: "🔥", description: "Backend-as-a-Service" },
      { name: "WordPress", level: 85, icon: "📝", description: "CMS and custom themes" },
      { name: "cPanel", level: 85, icon: "🎛️", description: "Web hosting control panel" },
    ],
  },
] as const

const SUMMARY_STATS = [
  { label: "Technologies Mastered", value: "20+", icon: "🚀", color: "blue" },
  { label: "Years of Experience", value: "2+", icon: "⏰", color: "green" },
  { label: "Projects Completed", value: "24+", icon: "✅", color: "purple" },
  { label: "Always Learning", value: "∞", icon: "📚", color: "orange" },
] as const

type ColorType = "blue" | "purple" | "green" | "orange"

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const skillsRef = useRef<HTMLElement>(null)

  const getColorClasses = useCallback((color: ColorType, type: "bg" | "light" | "text" | "border" = "bg") => {
    const colorMap = {
      blue: {
        bg: "bg-blue-500",
        light: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400",
        border: "border-blue-500",
      },
      purple: {
        bg: "bg-purple-500",
        light: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-600 dark:text-purple-400",
        border: "border-purple-500",
      },
      green: {
        bg: "bg-green-500",
        light: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400",
        border: "border-green-500",
      },
      orange: {
        bg: "bg-orange-500",
        light: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-600 dark:text-orange-400",
        border: "border-orange-500",
      },
    }
    return colorMap[color][type] || ""
  }, [])

  const getSkillLevel = useCallback((level: number) => {
    if (level >= 90) return "Expert"
    if (level >= 80) return "Advanced"
    if (level >= 70) return "Intermediate"
    return "Basic"
  }, [])

  const currentCategory = useMemo(() => SKILL_CATEGORIES[activeCategory], [activeCategory])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -100px 0px" },
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % SKILL_CATEGORIES.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCategoryChange = useCallback((index: number) => {
    setActiveCategory(index)
  }, [])

  const handleSkillHover = useCallback((skillName: string | null) => {
    setHoveredSkill(skillName)
  }, [])

  return (
    <section id="skills" ref={skillsRef} className="relative py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="text-center mb-16">
          <SectionDecorator variant="default">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">My Skills</h2>
              <div className="w-24 h-1 mx-auto animate-gradient-x10" />
            </div>
          </SectionDecorator>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </header>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {SKILL_CATEGORIES.map((category, index) => (
            <button
              key={category.category}
              onClick={() => handleCategoryChange(index)}
              className={`
                cursor-pointer px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105
                ${activeCategory === index
                  ? `${getColorClasses(category.color, "light")} ${getColorClasses(
                    category.color,
                    "text",
                  )} shadow-lg ring-2 ${getColorClasses(category.color, "border")}`
                  : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border"
                }
              `}
              aria-pressed={activeCategory === index}
              aria-label={`View ${category.category} skills`}
            >
              <span className="mr-2" role="img" aria-label={category.category}>
                {category.icon}
              </span>
              {category.category}
              <span className="ml-2 text-xs opacity-75">({category.items.length})</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentCategory.items.map((skill, index) => (
            <div
              key={skill.name}
              className={`
                group bg-card p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-border
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => handleSkillHover(skill.name)}
              onMouseLeave={() => handleSkillHover(null)}
            >
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`
                      w-12 h-12 ${getColorClasses(currentCategory.color, "light")} rounded-xl flex items-center justify-center text-xl
                      transition-transform duration-300 group-hover:scale-110
                    `}
                  >
                    <span role="img" aria-label={skill.name}>
                      {skill.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{getSkillLevel(skill.level)}</p>
                  </div>
                </div>
                <span className={`text-sm font-medium ${getColorClasses(currentCategory.color, "text")}`}>
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 mb-4">
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className={`
                      h-3 ${getColorClasses(currentCategory.color, "bg")} rounded-full transition-all duration-1000 ease-out relative overflow-hidden
                    `}
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                      transitionDelay: `${index * 100 + 300}ms`,
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                  </div>
                </div>
              </div>

              {/* Skill Description */}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`
                        w-2 h-2 ${getColorClasses(currentCategory.color, "bg")} rounded-full
                        ${hoveredSkill === skill.name ? "animate-pulse" : ""}
                      `}
                    />
                    <span className="text-xs text-muted-foreground">
                      {skill.level >= 90 ? "Production Ready" : skill.level >= 80 ? "Proficient" : "Learning"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div
                className={`
                  absolute inset-0 bg-gradient-to-r ${getColorClasses(
                  currentCategory.color,
                  "light",
                )} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none
                `}
              />
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SUMMARY_STATS.map((stat, index) => (
            <SectionDecorator key={stat.label} variant="card">
              <div
                className={`
                  text-center bg-card p-6 rounded-2xl shadow-lg border border-border transition-all duration-500 hover:shadow-xl hover:scale-105
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                `}
                style={{ transitionDelay: `${index * 100 + 800}ms` }}
              >
                <div className="text-4xl mb-3" role="img" aria-label={stat.label}>
                  {stat.icon}
                </div>
                <div className={`text-3xl font-bold mb-2 ${getColorClasses(stat.color, "text")}`}>{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>

                {/* Decorative element */}
                <div
                  className={`w-12 h-1 ${getColorClasses(stat.color, "bg")} mx-auto mt-3 rounded-full shadow-lg
                  ${isVisible ? "animate-pulse" : ""}
                `}
                />
              </div>
            </SectionDecorator>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <SectionDecorator variant="hero">
            <div className="bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">Ready to work together?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I&apos;m always excited to take on new challenges and learn new technologies. Let&apos;s build something
                amazing!
              </p>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="cursor-pointer px-8 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30"
              >
                Let&apos;s Connect
              </button>

            </div>
          </SectionDecorator>
        </div>
      </div>
    </section>
  )
}
