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
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [lastScrollY, setLastScrollY] = useState(0)

  const closeMenu = useCallback(() => setIsMenuOpen(false), [])
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // Determine scroll direction
      if (scrollY > lastScrollY && scrollY > 100) {
        setScrollDirection('down')
      } else {
        setScrollDirection('up')
      }
      setLastScrollY(scrollY)
      
      // Enhanced scroll state detection
      setIsScrolled(scrollY > 20)

      // Improved active section detection with better thresholds
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const viewportHeight = window.innerHeight
      const scrollPosition = scrollY + viewportHeight * 0.3 // 30% from top of viewport
      
      let foundSection = 'home'
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + scrollY
          const elementBottom = elementTop + rect.height
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            foundSection = section
            break
          }
        }
      }
      
      setActiveSection(foundSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

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

  // Enhanced smooth scroll function
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.slice(1)
    const element = document.getElementById(targetId)
    
    if (element) {
      const navHeight = 80 // Account for navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    
    closeMenu()
  }, [closeMenu])

  return (
    <>
      <nav
        className={`
          fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out
          ${isScrolled
            ? `${scrollDirection === 'down' ? 'top-2' : 'top-4'} w-[96%] sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] rounded-2xl shadow-2xl backdrop-blur-lg border`
            : 'top-4 w-full rounded-none backdrop-blur-none shadow-none border-none'
          }
          ${scrollDirection === 'down' && isScrolled ? 'scale-95' : 'scale-100'}
        `}
        style={{
          backgroundColor: isScrolled
            ? 'hsl(var(--background) / 0.85)'
            : 'transparent',
          borderColor: isScrolled ? 'hsl(var(--border) / 0.4)' : 'transparent',
          boxShadow: isScrolled 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
            : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center h-14 sm:h-16">
            {/* Logo - Responsive sizing */}
            <div className="flex-shrink-0 w-32 sm:w-36 md:w-40">
              <Link
                href={`/${locale}`}
                className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-lg px-1 sm:px-2 py-1"
                aria-label={t('nav.name')}
              >
                {t('site.logo')}
              </Link>
            </div>

            {/* Desktop Navigation - Enhanced responsive breakpoints */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="flex space-x-1 xl:space-x-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:bg-accent/50"
                    style={{ color: 'hsl(var(--foreground))' }}
                  >
                    {t(item.labelKey)}
                    <div
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-red-600 transition-all duration-300 origin-left rounded-full ${
                        activeSection === item.href.slice(1)
                          ? 'scale-x-100 opacity-100'
                          : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                      }`}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Controls - Better responsive spacing */}
            <div className="hidden lg:flex items-center justify-end w-32 sm:w-36 md:w-40 space-x-2 xl:space-x-3">
              <ThemeToggle />
              <LanguageSwitcher locale={locale} />
            </div>

            {/* Mobile Controls - Improved spacing */}
            <div className="lg:hidden flex items-center space-x-2 sm:space-x-3 ml-auto">
              <ThemeToggle />
              <LanguageSwitcher locale={locale} />
              <button
                onClick={toggleMenu}
                className="p-1.5 sm:p-2 hover:bg-accent/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:scale-105"
                style={{ color: 'hsl(var(--foreground))' }}
                aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
                aria-expanded={isMenuOpen}
              >
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{
                    transform: isMenuOpen ? 'rotate(180deg) scale(0.9)' : 'rotate(0deg) scale(1)'
                  }}
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
      </nav>

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Improved backdrop */}
          <div
            className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/25 to-purple-900/15 backdrop-blur-lg lg:hidden z-40 transition-opacity duration-300"
            onClick={closeMenu}
            aria-hidden="true"
          />
          
          {/* Responsive sliding menu panel */}
          <div 
            className={`fixed top-0 right-0 h-full lg:hidden z-50 transform transition-all duration-400 ease-out
              w-72 xs:w-80 sm:w-96 max-w-[90vw]
              ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <div
              className="h-full backdrop-blur-xl shadow-2xl border-l relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--background) / 0.97) 0%, hsl(var(--background) / 0.99) 100%)',
                borderColor: 'hsl(var(--border) / 0.3)',
              }}
            >
              {/* Enhanced decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-transparent to-blue-500/8 pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-2xl" />
              
              {/* Header section with better spacing */}
              <div className="relative p-4 sm:p-6 border-b border-border/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {t('nav.menu') || 'Menu'}
                  </h2>
                  <button
                    onClick={closeMenu}
                    className="p-2 rounded-full hover:bg-accent/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:scale-105"
                    aria-label={t('nav.closeMenu') || 'Close menu'}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Navigation items with enhanced animations */}
              <div className="relative p-3 sm:p-4 space-y-1 sm:space-y-2">
                {NAV_ITEMS.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="group relative flex items-center px-3 sm:px-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-[1.02]"
                    style={{ 
                      color: 'hsl(var(--foreground))',
                      animationDelay: `${index * 75}ms`
                    }}
                  >
                    {/* Enhanced icon with better responsive sizing */}
                    <div className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current opacity-60" />
                    </div>
                    
                    {/* Label */}
                    <span className="flex-1">{t(item.labelKey)}</span>
                    
                    {/* Enhanced active indicator */}
                    {activeSection === item.href.slice(1) && (
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/50 animate-pulse" />
                    )}
                    
                    {/* Hover arrow with better animation */}
                    <svg 
                      className="w-3 h-3 sm:w-4 sm:h-4 ml-2 transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 opacity-0 group-hover:opacity-100"
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    
                    {/* Enhanced animated background */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/5 group-hover:to-blue-600/5 transition-all duration-300 -z-10" />
                  </Link>
                ))}
              </div>
              
              {/* Mobile Controls in Menu with better responsive layout */}
              <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 p-3 sm:p-6">
                <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent mb-4 sm:mb-6" />
                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2 rounded-xl bg-accent/20 backdrop-blur-sm">
                    <ThemeToggle />
                    <div className="w-px h-5 sm:h-6 bg-border/30" />
                    <LanguageSwitcher locale={locale} />
                  </div>
                </div>
              </div>
              
              {/* Footer section */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="flex justify-center">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-40 animate-pulse"
                        style={{ animationDelay: `${i * 300}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}