"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const gradientId = 'scrollWaveGradient'

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(progress)
      setIsVisible(scrollTop > 300)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full overflow-hidden shadow-lg transition-all duration-300 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      } hover:scale-110 hover:shadow-pink-500/50`}
    >
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden"
        style={{ height: `${scrollProgress}%` }}
      >
        {/* First wave */}
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-full animate-wave"
          viewBox="0 0 120 28"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path
            d="M0 30 V12 Q30 17 60 12 T120 12 V30z"
            fill={`url(#${gradientId})`}
            opacity="0.6"
          />
        </svg>

        {/* Second wave */}
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow"
          viewBox="0 0 120 28"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30 V15 Q30 20 60 15 T120 15 V30z"
            fill={`url(#${gradientId})`}
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="relative flex items-center justify-center w-full h-full text-white pointer-events-none">
        <ArrowUp className="w-6 h-6 drop-shadow-md" />
      </div>
    </button>
  )
}