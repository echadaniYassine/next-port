"use client"

import { useEffect, useState } from "react"

const LOADING_STEPS = [
  "Initializing...",
  "Loading components...",
  "Preparing interface...",
  "Almost ready...",
  "Welcome!",
] as const

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Loading")

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 300)

    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const dots = prev.includes("...") ? prev.split("...")[0] : prev
        const currentDots = prev.includes("...") ? prev.split("...")[1]?.length || 0 : 0
        return currentDots >= 3 ? dots : prev + "."
      })
    }, 500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 transition-colors duration-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-700/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-700/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300/20 dark:bg-pink-700/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob animation-delay-4000" />
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo/Brand area */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center">
            <div className="w-8 h-8 bg-primary-foreground rounded-lg animate-bounce" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Portfolio</h1>
        </div>

        {/* Loading spinner */}
        <div className="relative mb-8">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-muted rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
            <div className="absolute inset-4 bg-gradient-to-br from-primary to-purple-600 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
            </div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{Math.round(Math.min(progress, 100))}%</span>
            <span>Please wait...</span>
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-8">
          <p className="text-lg font-medium text-foreground min-h-[28px]">
            {loadingText}
            <span className="animate-pulse ml-1">|</span>
          </p>
        </div>

        {/* Loading steps indicator */}
        <div className="flex justify-center space-x-2">
          {LOADING_STEPS.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= Math.floor(progress / 20) ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute -top-10 -left-10 w-4 h-4 bg-primary/40 rounded-full animate-float" />
        <div
          className="absolute -top-16 right-8 w-3 h-3 bg-purple-400/40 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute -bottom-8 -right-12 w-5 h-5 bg-pink-400/40 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-2 -left-8 w-2 h-2 bg-green-400/40 rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>
    </div>
  )
}
