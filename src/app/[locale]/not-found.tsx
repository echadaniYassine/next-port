// src/app/[locale]/not-found.tsx

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  if (!mounted) return null

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
        {/* 404 Number with glitch effect */}
        <div className="relative mb-8">
          <h1 
            className={`text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 select-none transition-all duration-200 ${
              glitchActive ? 'animate-glitch' : 'animate-pulse-slow'
            }`}
          >
            404
          </h1>
          
          {/* Glitch layers */}
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

        {/* Error message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white animate-slide-up">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            The page you&apos;re looking for seems to have vanished into the digital void.
          </p>
          <p className="text-gray-500 dark:text-gray-500 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Don&apos;t worry, even the best explorers get lost sometimes!
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="w-64 h-64 mx-auto relative">
            {/* Astronaut floating in space */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center animate-float">
              <div className="text-8xl animate-bounce">
                🚀
              </div>
            </div>
            
            {/* Floating stars */}
            <div className="absolute top-4 right-8 text-2xl animate-pulse">⭐</div>
            <div className="absolute top-16 left-4 text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
            <div className="absolute bottom-8 right-4 text-lg animate-pulse" style={{ animationDelay: '1s' }}>🌟</div>
            <div className="absolute bottom-16 left-8 text-xl animate-pulse" style={{ animationDelay: '1.5s' }}>💫</div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Link
            href="/"
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
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
            className="px-8 py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            Go Back
          </button>
        </div>

        {/* Fun fact */}
        <div className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            💡 Did you know?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            The 404 error code was named after room 404 at CERN, where the original web servers were located. 
            When researchers couldn&apos;t find a file, they&apos;d get a &quot;room 404: file not found&quot; error!
          </p>
        </div>
      </div>

      {/* CSS-in-JS for keyframes */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }

        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-5px, 2px); }
          40% { transform: translate(-5px, -2px); }
          60% { transform: translate(5px, 2px); }
          80% { transform: translate(5px, -2px); }
        }

        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(3px, -2px); }
          40% { transform: translate(3px, 2px); }
          60% { transform: translate(-3px, -2px); }
          80% { transform: translate(-3px, 2px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-glitch {
          animation: glitch 0.3s linear infinite;
        }

        .animate-glitch-1 {
          animation: glitch-1 0.3s linear infinite;
        }

        .animate-glitch-2 {
          animation: glitch-2 0.3s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}