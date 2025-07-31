"use client"

import type React from "react"
import { memo } from "react" // Import memo

interface SectionDecoratorProps {
  children: React.ReactNode
  variant?: "default" | "hero" | "card" | "minimal"
  className?: string
}

// Wrap the component export in React.memo
export const SectionDecorator = memo(function SectionDecorator({ 
  children, 
  variant = "default", 
  className = "" 
}: SectionDecoratorProps) {
  const getDecorativeElements = () => {
    switch (variant) {
      case "hero":
        return (
          <>
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full animate-pulse" />
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full animate-pulse animation-delay-1000" />
            <div className="absolute -bottom-6 -right-6 w-10 h-10 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full animate-pulse animation-delay-2000" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-r from-teal-400/20 to-cyan-600/20 rounded-full animate-pulse animation-delay-3000" />
          </>
        )
      case "card":
        return (
          <>
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-blue-400/15 to-purple-600/15 rounded-full animate-pulse" />
            <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-gradient-to-r from-pink-400/15 to-red-600/15 rounded-full animate-pulse animation-delay-2000" />
          </>
        )
      case "minimal":
        return (
          <>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-full animate-pulse" />
            <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full animate-pulse animation-delay-1000" />
          </>
        )
      default:
        return (
          <>
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full animate-pulse" />
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full animate-pulse animation-delay-1000" />
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full animate-pulse animation-delay-2000" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-gradient-to-r from-teal-400/20 to-cyan-600/20 rounded-full animate-pulse animation-delay-3000" />
          </>
        )
    }
  }

  return (
    <div className={`relative ${className}`}>
      {getDecorativeElements()}
      {children}
    </div>
  )
})