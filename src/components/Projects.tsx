"use client"

import Image from "next/image"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { SectionDecorator } from "./SectionDecorator"
import { PROJECTS } from "../data/projects/projectsData"
import { FILTERS } from "../data/projects/filtersData.ts"
import { STATUS_CONFIG } from "../data/projects/statusConfig"
import { ProjectStatus, ProjectCategory } from "../data/projects/types"
import { type Language } from "../lib/i18n-config"

interface ProjectsProps {
  locale: Language;
}
export default function Projects({ locale }: ProjectsProps) {
  const { t } = useTranslation()
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
    const config = STATUS_CONFIG[status]
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
        <span className="mr-1" role="img" aria-label={t(`projects.status.${status}`)}>
          {config.icon}
        </span>
        {t(`projects.status.${status}`)}
      </span>
    )
  }, [t])

  const handleImageError = useCallback((projectId: number) => {
    setImageLoadErrors((prev) => new Set(prev).add(projectId))
  }, [])

  const handleFilterChange = useCallback((filter: "all" | ProjectCategory) => {
    setActiveFilter(filter)
  }, [])

  const handleProjectHover = useCallback((projectId: number | null) => {
    setHoveredProject(projectId)
  }, [])

  // Function to get translated project data
  const getProjectTranslation = useCallback((projectId: number, field: 'title' | 'description') => {
    const projectKeys = {
      1: 'okyWebcraft',
      2: 'shoppingStore',
      3: 'troneGame',
      4: 'schoolManagement',
      5: 'interstellarTours',
      6: 'asianTaste',
      7: 'twaregEsports',
      8: 'twizaPack',
      9: 'trendify',
      10: 'mirriahPro'
    }

    const key = projectKeys[projectId as keyof typeof projectKeys]
    if (key) {
      return t(`projects.items.${key}.${field}`)
    }

    // Fallback to original data if translation key not found
    const project = PROJECTS.find(p => p.id === projectId)
    return project ? project[field] : ''
  }, [t])

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
        <header className="text-center mb-12">
          <SectionDecorator variant="default">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('projects.title')}</h2>
              <div className="w-24 h-1 mx-auto animate-gradient-x10" />
            </div>
          </SectionDecorator>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </header>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-12 text-center flex items-center justify-center">
              <span className="mr-2" role="img" aria-label="featured">
                ⭐
              </span>
              {t('projects.featuredProjects')}
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
                    {t('projects.featured')}
                  </div>

                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    {!imageLoadErrors.has(project.id) ? (
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={`${getProjectTranslation(project.id, 'title')} project screenshot`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={() => handleImageError(project.id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🖼️</div>
                          <p className="text-muted-foreground text-sm">{getProjectTranslation(project.id, 'title')}</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {getProjectTranslation(project.id, 'title')}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(project.status)}
                        <span className="text-xs text-muted-foreground">{project.year}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                      {getProjectTranslation(project.id, 'description')}
                    </p>

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
                          +{project.tech.length - 4} {t('projects.moreLabel')}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 text-white font-medium rounded-lg shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
                        aria-label={`View ${getProjectTranslation(project.id, 'title')} live demo`}
                      >
                        <span>{t('projects.viewLive')}</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border-2 border-foreground text-foreground font-medium rounded-lg shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-foreground/30"
                          aria-label={`View ${getProjectTranslation(project.id, 'title')} source code`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-12">
          {FILTERS.map((filter) => {
            const count =
              filter.key === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === filter.key).length

            const emoji = filter.label.split(' ')[0]
            const filterLabel = filter.key === "all"
              ? t('projects.filters.all')
              : t(`projects.categories.${filter.key}`)

            return (
              <button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key)}
                className={`
          cursor-pointer px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-xs sm:text-base whitespace-nowrap
          ${activeFilter === filter.key
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border"
                  }
        `} aria-pressed={activeFilter === filter.key}
                aria-label={`Filter by ${filterLabel}`}
              >
                <span className="sm:hidden">
                  {filter.shortLabel}
                </span>
                <span className="hidden sm:inline">
                  {emoji} {filterLabel}
                </span>

                <span
                  className={`ml-1 sm:ml-2 px-1 sm:px-2 py-1 rounded-full text-xs ${activeFilter === filter.key ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
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
                    alt={`${getProjectTranslation(project.id, 'title')} project screenshot`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => handleImageError(project.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🖼️</div>
                      <p className="text-muted-foreground text-sm">{getProjectTranslation(project.id, 'title')}</p>
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
                        className="flex-1 bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 text-white px-3 py-2 rounded-lg text-sm font-medium text-center transition-transform duration-200 hover:scale-105 shadow-md hover:shadow-cyan-500/40"
                        aria-label={`View ${getProjectTranslation(project.id, 'title')} live demo`}
                      >
                        {t('projects.viewLive')}
                      </a>
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-900/80 text-white px-3 py-2 rounded-lg hover:bg-gray-900 transition-colors duration-200 hover:shadow-cyan-500/40 hover:scale-105"
                          aria-label={`View ${getProjectTranslation(project.id, 'title')} source code`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
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
                    {getProjectTranslation(project.id, 'title')}
                  </h3>
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{project.year}</span>
                </div>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                  {getProjectTranslation(project.id, 'description')}
                </p>

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
                      aria-label={`View ${getProjectTranslation(project.id, 'title')} live demo`}
                    >
                      <span>{t('projects.viewLive')}</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-muted-foreground hover:text-foreground font-medium text-sm transition-colors duration-200"
                        aria-label={`View ${getProjectTranslation(project.id, 'title')} source code`}
                      >
                        <span>{t('projects.viewCode')}</span>
                        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.30 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground capitalize">
                      {t(`projects.categories.${project.category}`).replace(/^[^A-Za-z]*/, '')}
                    </div>
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
            <h3 className="text-xl font-semibold text-foreground mb-2">{t('projects.noProjectsTitle')}</h3>
            <p className="text-muted-foreground">
              {t('projects.noProjectsDescription')}
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <SectionDecorator variant="hero">
            <div className="bg-gradient-to-r from-primary/5 to-purple-600/5 rounded-2xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">{t('projects.cta.title')}</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t('projects.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="cursor-pointer px-8 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
                >
                  {t('projects.cta.getInTouch')}
                </button>

                <a
                  href="mailto:yassinechadani113@gmail.com"
                  className="px-8 py-3 border-2 border-foreground text-foreground font-semibold rounded-xl shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-foreground/30"
                >
                  {t('projects.cta.sendEmail')}
                </a>
              </div>
            </div>
          </SectionDecorator>
        </div>
      </div>
    </section>
  )
}