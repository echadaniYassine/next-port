"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")
  const [isLoading, setIsLoading] = useState(true)

  // Get system theme preference
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light"
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  // Resolve theme based on current setting
  const resolveTheme = (currentTheme: Theme): "light" | "dark" => {
    if (currentTheme === "system") {
      return getSystemTheme()
    }
    return currentTheme
  }

  // Apply theme to document
  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement
    if (newTheme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", newTheme === "dark" ? "#0f172a" : "#ffffff")
    }
  }

  // Initialize theme on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme") as Theme | null
      const initialTheme = savedTheme || "system"
      const resolved = resolveTheme(initialTheme)

      // Check if the current DOM state matches what we expect
      const isDarkMode = document.documentElement.classList.contains("dark")
      const expectedDarkMode = resolved === "dark"

      // Only update if there's a mismatch
      if (isDarkMode !== expectedDarkMode) {
        applyTheme(resolved)
      }

      setTheme(initialTheme)
      setResolvedTheme(resolved)
      setIsLoading(false)
    } catch (error) {
      console.error("Error initializing theme:", error)
      setIsLoading(false)
    }
  }, [])

  // Listen for system theme changes
  useEffect(() => {
    if (isLoading) return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemThemeChange = () => {
      if (theme === "system") {
        const newResolvedTheme = getSystemTheme()
        setResolvedTheme(newResolvedTheme)
        applyTheme(newResolvedTheme)
      }
    }

    mediaQuery.addEventListener("change", handleSystemThemeChange)
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange)
  }, [theme, isLoading])

  // Handle theme changes
  const handleThemeChange = (newTheme: Theme) => {
    try {
      const resolved = resolveTheme(newTheme)
      setTheme(newTheme)
      setResolvedTheme(resolved)
      applyTheme(resolved)
      localStorage.setItem("theme", newTheme)

      // Dispatch custom event for other components
      window.dispatchEvent(
        new CustomEvent("themeChange", {
          detail: { theme: newTheme, resolvedTheme: resolved },
        }),
      )
    } catch (error) {
      console.error("Error changing theme:", error)
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleThemeChange,
        resolvedTheme,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
