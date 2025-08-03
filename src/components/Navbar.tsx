// ===========================================
// 8. src/components/Navbar.tsx - Updated
// ===========================================
'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { ThemeToggle } from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from '../lib/i18n/client'
import { type Language } from '../lib/i18n-config'

const NAV_ITEMS = [
  { href: '#about', labelKey: 'nav.about' },
  { href: '#skills', labelKey: 'nav.skills' },
  { href: '#projects', labelKey: 'nav.projects' },
  { href: '#contact', labelKey: 'nav.contact' },
] as const

interface NavbarProps {
  locale: Language
}

export default function Navbar({ locale }: NavbarProps) {
  const { t } = useTranslation(locale, 'common')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      // Dynamic active section detection
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const offset = 100
          return rect.top <= offset && rect.bottom >= offset
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.body.style.overflow = 'unset'
      }
    }
  }, [isMenuOpen, closeMenu])

  return (
    <nav
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out
        ${
          isScrolled
            ? 'w-[95%] md:w-[60%] lg:w-[50%] rounded-2xl shadow-2xl backdrop-blur-md border'
            : 'w-full rounded-none backdrop-blur-none shadow-none border-none'
        }
      `}
      style={{
        backgroundColor: isScrolled
          ? 'hsl(var(--background) / 0.70)'
          : 'transparent',
        borderColor: isScrolled ? 'hsl(var(--border) / 0.3)' : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 w-40">
            <Link
              href={`/${locale}`}
              className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-lg px-2 py-1"
              aria-label={t('nav.name')}
            >
              {t('site.logo')}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex space-x-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:bg-accent/50"
                  style={{ color: 'hsl(var(--foreground))' }}
                >
                  {t(item.labelKey)}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-red-600 transition-transform duration-300 origin-left rounded-full ${
                      activeSection === item.href.slice(1)
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center justify-end w-40 space-x-3">
            <ThemeToggle />
            <LanguageSwitcher locale={locale} />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-3 ml-auto">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-accent/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              style={{ color: 'hsl(var(--foreground))' }}
              aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={isMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div
            className="md:hidden mt-2 backdrop-blur-md rounded-2xl shadow-2xl border mx-4 overflow-hidden relative"
            style={{
              backgroundColor: 'hsl(var(--background) / 0.95)',
              borderColor: 'hsl(var(--border) / 0.3)',
            }}
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:bg-accent/50"
                  style={{ color: 'hsl(var(--foreground))' }}
                  onClick={closeMenu}
                >
                  {t(item.labelKey)}
                  <div
                    className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-purple-600 to-red-600 transition-transform duration-300 origin-left rounded-full ${
                      activeSection === item.href.slice(1)
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              ))}

              <div className="px-4 py-3 border-t border-border/20 mt-2">
                <LanguageSwitcher locale={locale} />
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}