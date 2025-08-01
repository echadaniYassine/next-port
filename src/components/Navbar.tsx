"use client"

import Link from "next/link"
import { useState, useEffect, useCallback } from "react"

// Simple ThemeToggle for demo
const ThemeToggle = () => (
  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  </button>
)

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)
      
      // Dynamic active section detection
      const sections = ["home", "about", "skills", "projects", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + scrollY
          const elementBottom = elementTop + rect.height
          const viewportCenter = scrollY + window.innerHeight / 2
          
          return viewportCenter >= elementTop && viewportCenter <= elementBottom
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeMenu()
    }
    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isMenuOpen, closeMenu])

  return (
    <nav
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out
        ${
          isScrolled
            ? "w-[95%] md:w-[60%] lg:w-[50%] rounded-2xl shadow-2xl backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border border-gray-200/20 dark:border-gray-700/20"
            : "w-full rounded-none bg-transparent backdrop-blur-none shadow-none border-none"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo - Fixed width for consistent spacing */}
          <div className="flex-shrink-0 w-40">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-2xl hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-lg px-2 py-1"
            >
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation - Centered with flex-1 */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  {item.label}
                  
                  {/* Active/Hover gradient underline */}
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-red-600 transition-transform duration-300 origin-left rounded-full ${
                    activeSection === item.href.slice(1) 
                      ? "scale-x-100" 
                      : "scale-x-0 group-hover:scale-x-100"
                  }`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Controls - Fixed width for balance */}
          <div className="cursor-pointer hidden md:flex justify-end w-40">
            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-3 ml-auto">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 mx-4 overflow-hidden">
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                onClick={closeMenu}
              >
                {item.label}
                
                {/* Mobile active/hover gradient underline */}
                <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-600 to-red-600 transition-transform duration-300 origin-left rounded-full ${
                  activeSection === item.href.slice(1) 
                    ? "scale-x-100" 
                    : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}