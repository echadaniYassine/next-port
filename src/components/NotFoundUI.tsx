// src/components/NotFoundUI.tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFoundUI() {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {    
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        <div className="relative mb-8">
          <h1 
            className={`text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 select-none transition-all duration-200 ${
              glitchActive ? 'animate-glitch' : 'animate-pulse-slow'
            }`}
          >
            404
          </h1>
          
          {glitchActive && (
            <>
              <h1 className="absolute inset-0 text-9xl md:text-[12rem] font-black text-red-500 opacity-80 animate-glitch-1" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}>
                404
              </h1>
              <h1 className="absolute inset-0 text-9xl md:text-[12rem] font-black text-cyan-500 opacity-80 animate-glitch-2" style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}>
                404
              </h1>
            </>
          )}
        </div>

        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            The page you&apos;re looking for seems to have vanished into the digital void.
          </p>
        </div>

        <div className="mb-8">
          <div className="w-64 h-64 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center animate-float">
              <div className="text-8xl animate-bounce">🚀</div>
            </div>
            <div className="absolute top-4 right-8 text-2xl animate-pulse">⭐</div>
            <div className="absolute top-16 left-4 text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4"
          >
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m0 7h18" />
              </svg>
              Back to Home
            </span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}