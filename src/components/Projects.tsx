"use client"

import Image from "next/image"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { SectionDecorator } from "./SectionDecorator"

type ProjectStatus = "completed" | "in-progress" | "planning"
type ProjectCategory = "fullstack" | "frontend" | "wordpress" | "mobile"

interface Project {
  id: number
  title: string
  description: string
  image: string
  category: ProjectCategory
  tech: readonly string[]
  liveLink: string
  githubLink: string
  featured: boolean
  status: ProjectStatus
  year: string
}

const PROJECTS: readonly Project[] = [
  {
    id: 1,
    title: "OKY WebCraft",
    description:
      "A modern React-based website for Oky WebCraft Agency, designed to showcase the agency's services, with a user-friendly interface, smooth animations, and responsive design for an engaging client experience.",
    image: "/placeholder.svg?height=400&width=600&text=OKY+WebCraft",
    category: "frontend",
    tech: ["HTML5", "CSS3", "React", "Framer Motion"],
    liveLink: "https://project1.com",
    githubLink: "https://github.com/echadaniYassine/project1",
    featured: true,
    status: "completed",
    year: "2024",
  },
  {
    id: 2,
    title: "Real-time Chat App",
    description:
      "A comprehensive chat application with video calling capabilities, file sharing, group chats, and real-time notifications. Built with Socket.io for seamless communication.",
    image: "/placeholder.svg?height=400&width=600&text=Chat+App",
    category: "fullstack",
    tech: ["React", "Socket.io", "WebRTC", "Firebase", "Material-UI"],
    liveLink: "https://project2.com",
    githubLink: "https://github.com/echadaniYassine/project2",
    featured: true,
    status: "completed",
    year: "2024",
  },
  {
    id: 3,
    title: "School Management Learn",
    description:
      "An intuitive project management tool with drag-and-drop functionality, team collaboration features, time tracking, and detailed analytics for productivity insights.",
    image: "/placeholder.svg?height=400&width=600&text=School+Management",
    category: "fullstack",
    tech: ["React.js", "Laravel", "TailwindCSS", "MySQL", "shadCN"],
    liveLink: "https://project3.com",
    githubLink: "https://github.com/echadaniYassine/project3",
    featured: false,
    status: "completed",
    year: "2023",
  },
  {
    id: 4,
    title: "Trendify Store",
    description:
      "A modern e-commerce web application built with React and Node.js, featuring a sleek user interface, real-time product management, and secure, scalable checkout functionality.",
    image: "/placeholder.svg?height=400&width=600&text=Trendify+Store",
    category: "fullstack",
    tech: ["React.js", "CSS3", "Node.js", "Express", "MongoDB"],
    liveLink: "https://project4.com",
    githubLink: "https://github.com/echadaniYassine/project4",
    featured: false,
    status: "in-progress",
    year: "2024",
  },
  {
    id: 5,
    title: "Interstellar Tours",
    description:
      "A WordPress-based website offering tailored transportation services in Tangier, including VIP transport, business tourism, and a diverse fleet of vehicles for every need.",
    image: "/placeholder.svg?height=400&width=600&text=Interstellar+Tours",
    category: "wordpress",
    tech: ["WordPress", "Elementor", "PHP", "MySQL"],
    liveLink: "https://project5.com",
    githubLink: "https://github.com/echadaniYassine/project5",
    featured: false,
    status: "completed",
    year: "2023",
  },
  {
    id: 6,
    title: "Asian Tasty",
    description:
      "A visually engaging and responsive landing page built with React, inspired by Asian design aesthetics, optimized for fast performance and lead conversion.",
    image: "/placeholder.svg?height=400&width=600&text=Asian+Tasty",
    category: "frontend",
    tech: ["HTML5", "CSS3", "React", "GSAP"],
    liveLink: "https://project6.com",
    githubLink: "https://github.com/echadaniYassine/project6",
    featured: false,
    status: "completed",
    year: "2023",
  },
] as const

const FILTERS = [
  { key: "all" as const, label: "All Projects", icon: "🎯" },
  { key: "fullstack" as const, label: "Full Stack", icon: "⚡" },
  { key: "frontend" as const, label: "Frontend", icon: "🎨" },
  { key: "wordpress" as const, label: "WordPress", icon: "📝" },
  { key: "mobile" as const, label: "Mobile", icon: "📱" },
] as const

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState<"all" | ProjectCategory>("all")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(new Set())
  const projectsRef = useRef<HTMLElement>(null)

  const filteredProjects = useMemo(() => {
    return activeFilter === "all" ? PROJECTS : PROJECTS.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  const featuredProjects = useMemo(() => {
    return PROJECTS.filter((project) => project.featured)
  }, [])

  const getStatusBadge = useCallback((status: ProjectStatus) => {
    const statusConfig = {
      completed: {
        label: "Completed",
        className: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400",
        icon: "✅",
      },
      "in-progress": {
        label: "In Progress",
        className: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
        icon: "🚧",
      },
      planning: {
        label: "Planning",
        className: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400",
        icon: "📋",
      },
    }

    const config = statusConfig[status]
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
        <span className="mr-1" role="img" aria-label={config.label}>
          {config.icon}
        </span>
        {config.label}
      </span>
    )
  }, [])

  const handleImageError = useCallback((projectId: number) => {
    setImageLoadErrors((prev) => new Set(prev).add(projectId))
  }, [])

  const handleFilterChange = useCallback((filter: "all" | ProjectCategory) => {
    setActiveFilter(filter)
  }, [])

  const handleProjectHover = useCallback((projectId: number | null) => {
    setHoveredProject(projectId)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" },
    )

    if (projectsRef.current) {
      observer.observe(projectsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={projectsRef} className="relative py-20 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <header className="text-center mb-16">
          <SectionDecorator variant="default">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">My Projects</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
            </div>
          </SectionDecorator>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </header>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center flex items-center justify-center">
              <span className="mr-2" role="img" aria-label="featured">
                ⭐
              </span>
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <article
                  key={project.id}
                  className={`
                    group relative bg-gradient-to-br from-primary/5 to-purple-600/5 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border border-primary/20
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                  `}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    <span className="mr-1" role="img" aria-label="featured">
                      ⭐
                    </span>
                    Featured
                  </div>

                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    {!imageLoadErrors.has(project.id) ? (
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={`${project.title} project screenshot`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={() => handleImageError(project.id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🖼️</div>
                          <p className="text-muted-foreground text-sm">{project.title}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(project.status)}
                        <span className="text-xs text-muted-foreground">{project.year}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{project.description}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-card/80 text-foreground/80 rounded-full text-sm font-medium border border-border hover:bg-accent transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <span>Live Demo</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border-2 border-foreground text-foreground font-medium rounded-lg hover:bg-foreground hover:text-background transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-foreground/30"
                        aria-label={`View ${project.title} source code`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTERS.map((filter) => {
            const count =
              filter.key === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === filter.key).length
            return (
              <button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key)}
                className={`
                  px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30
                  ${
                    activeFilter === filter.key
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border"
                  }
                `}
                aria-pressed={activeFilter === filter.key}
                aria-label={`Filter by ${filter.label}`}
              >
                <span className="mr-2" role="img" aria-label={filter.label}>
                  {filter.icon}
                </span>
                {filter.label}
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    activeFilter === filter.key ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={`
                group bg-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-border overflow-hidden
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={() => handleProjectHover(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                {!imageLoadErrors.has(project.id) ? (
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} project screenshot`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => handleImageError(project.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🖼️</div>
                      <p className="text-muted-foreground text-sm">{project.title}</p>
                    </div>
                  </div>
                )}

                {/* Overlay */}
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300
                    ${hoveredProject === project.id ? "opacity-100" : "opacity-0"}
                  `}
                >
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-2">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-white/90 text-gray-900 px-3 py-2 rounded-lg text-sm font-medium text-center hover:bg-white transition-colors duration-200"
                        aria-label={`View ${project.title} live demo`}
                      >
                        Live Demo
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-900/80 text-white px-3 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-200"
                        aria-label={`View ${project.title} source code`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">{getStatusBadge(project.status)}</div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
                    {project.title}
                  </h3>
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{project.year}</span>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Links */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-3">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <span>Live Demo</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-muted-foreground hover:text-foreground font-medium text-sm transition-colors duration-200"
                      aria-label={`View ${project.title} source code`}
                    >
                      <span>Code</span>
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground capitalize">{project.category}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4" role="img" aria-label="construction">
              🚧
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              No projects match the selected filter. Try selecting a different category.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <SectionDecorator variant="hero">
            <div className="bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">Interested in working together?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I&apos;m always open to discussing new opportunities and interesting projects. Let&apos;s create
                something amazing together!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
                >
                  Get In Touch
                </button>
                <a
                  href="mailto:yassinechadani113@gmail.com"
                  className="px-8 py-3 border-2 border-foreground text-foreground font-semibold rounded-xl hover:bg-foreground hover:text-background transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-foreground/30"
                >
                  Send Email
                </a>
              </div>
            </div>
          </SectionDecorator>
        </div>
      </div>
    </section>
  )
}
