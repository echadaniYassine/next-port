"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with same dimensions to prevent layout shift
    return (
      <div className="p-2 w-10 h-10 rounded-lg opacity-0" />
    )
  }

  const toggleTheme = () => {
    // Use a small delay to ensure smooth transition
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer group relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 ease-out hover:scale-105 active:scale-95"
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 transition-all duration-300 ease-in-out ${
            resolvedTheme === "dark" 
              ? "opacity-0 rotate-90 scale-0" 
              : "opacity-100 rotate-0 scale-100"
          }`}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        
        {/* Moon Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`absolute inset-0 transition-all duration-300 ease-in-out ${
            resolvedTheme === "dark" 
              ? "opacity-100 rotate-0 scale-100" 
              : "opacity-0 -rotate-90 scale-0"
          }`}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 rounded-lg bg-accent/0 group-hover:bg-accent/20 transition-colors duration-200" />
    </button>
  )
}