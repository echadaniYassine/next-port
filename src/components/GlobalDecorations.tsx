"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface GlobalDecorationsProps {
  children: React.ReactNode
}

export function GlobalDecorations({ children }: GlobalDecorationsProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Global Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Large animated gradient orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-blob"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02 - scrollY * 0.1}px)`,
            top: "10%",
            left: "5%",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-r from-pink-400/10 to-red-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015 - scrollY * 0.05}px)`,
            top: "40%",
            right: "5%",
          }}
        />
        <div
          className="absolute w-72 h-72 bg-gradient-to-r from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01 - scrollY * 0.08}px)`,
            bottom: "20%",
            left: "20%",
          }}
        />
        <div
          className="absolute w-64 h-64 bg-gradient-to-r from-orange-400/10 to-yellow-600/10 rounded-full blur-3xl animate-blob animation-delay-6000"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02 - scrollY * 0.12}px)`,
            top: "70%",
            right: "30%",
          }}
        />

        {/* Global floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-full animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              transform: `translateY(${-scrollY * (0.1 + Math.random() * 0.1)}px)`,
            }}
          />
        ))}

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: `translateY(${-scrollY * 0.5}px)`,
          }}
        />

        {/* Corner decorative elements */}
        <div className="absolute top-8 left-8">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-20 animate-pulse" />
          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-20 animate-pulse animation-delay-1000 mt-2 ml-2" />
        </div>

        <div className="absolute top-8 right-8">
          <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full opacity-20 animate-pulse animation-delay-2000" />
          <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-600 rounded-full opacity-20 animate-pulse animation-delay-3000 mt-2 mr-2" />
        </div>

        <div className="absolute bottom-8 left-8">
          <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-600 rounded-full opacity-20 animate-pulse animation-delay-4000" />
          <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-orange-600 rounded-full opacity-20 animate-pulse animation-delay-5000 mt-2 ml-2" />
        </div>

        <div className="absolute bottom-8 right-8">
          <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-yellow-600 rounded-full opacity-20 animate-pulse animation-delay-6000" />
          <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full opacity-20 animate-pulse animation-delay-7000 mt-2 mr-2" />
        </div>
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">{children}</div>

      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes scale-x {
          to {
            transform: scaleX(1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-scale-x {
          animation: scale-x 0.8s ease-out forwards;
        }

        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }

        .bg-300% {
          background-size: 300% 300%;
        }

        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animation-delay-5000 { animation-delay: 5s; }
        .animation-delay-6000 { animation-delay: 6s; }
        .animation-delay-7000 { animation-delay: 7s; }
      `}</style>
    </div>
  )
}
