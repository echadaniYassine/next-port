"use client"

import type React from "react"
import { useEffect, useState, memo } from "react"

interface Particle {
  id: number;
  style: React.CSSProperties;
  scrollFactor: number;
}

// Memoized child components to prevent re-renders
const MemoizedOrbs = memo(function Orbs() {
  return (
    <>
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-blob"
        style={{ top: "10%", left: "5%", transform: "translate(calc(var(--mouse-x, 0) * 0.02px), calc(var(--mouse-y, 0) * 0.02 - var(--scroll-y, 0) * 0.1px))" }}
      />
      <div
        className="absolute w-80 h-80 bg-gradient-to-r from-pink-400/10 to-red-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"
        style={{ top: "40%", right: "5%", transform: "translate(calc(var(--mouse-x, 0) * -0.015px), calc(var(--mouse-y, 0) * -0.015 - var(--scroll-y, 0) * 0.05px))" }}
      />
      <div
        className="absolute w-72 h-72 bg-gradient-to-r from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"
        style={{ bottom: "20%", left: "20%", transform: "translate(calc(var(--mouse-x, 0) * 0.01px), calc(var(--mouse-y, 0) * 0.01 - var(--scroll-y, 0) * 0.08px))" }}
      />
      <div
        className="absolute w-64 h-64 bg-gradient-to-r from-orange-400/10 to-yellow-600/10 rounded-full blur-3xl animate-blob animation-delay-6000"
        style={{ top: "70%", right: "30%", transform: "translate(calc(var(--mouse-x, 0) * -0.02px), calc(var(--mouse-y, 0) * -0.02 - var(--scroll-y, 0) * 0.12px))" }}
      />
    </>
  );
});

export function GlobalDecorations({ children }: { children: React.ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [scrollY, setScrollY] = useState(0)
  
  useEffect(() => {
    // Generate particles only on the client to prevent hydration mismatch
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${4 + Math.random() * 3}s`,
      },
      scrollFactor: 0.1 + Math.random() * 0.1,
    }));
    setParticles(newParticles);
    
    // --- Performance Optimization: Use CSS variables instead of React state ---
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mouse-x", `${e.clientX}`);
        document.documentElement.style.setProperty("--mouse-y", `${e.clientY}`);
      });
    };
    
    const handleScroll = () => {
        setScrollY(window.scrollY);
        document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}`);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll)
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <MemoizedOrbs />
        
        {/* Render particles from state */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-full animate-float opacity-40"
            style={{ ...p.style, transform: `translateY(${-scrollY * p.scrollFactor}px)` }}
          />
        ))}

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: `translateY(calc(var(--scroll-y, 0) * -0.5px))`,
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}