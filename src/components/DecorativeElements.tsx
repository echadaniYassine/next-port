"use client"

interface DecorativeDotsProps {
  variant?: "default" | "large" | "small" | "minimal"
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "all-corners"
  colors?: "blue-purple" | "pink-red" | "emerald-teal" | "orange-yellow" | "mixed"
  className?: string
}

export function DecorativeDots({
  variant = "default",
  position = "top-left",
  colors = "blue-purple",
  className = "",
}: DecorativeDotsProps) {
  const getSize = () => {
    switch (variant) {
      case "large":
        return { primary: "w-12 h-12", secondary: "w-8 h-8" }
      case "small":
        return { primary: "w-4 h-4", secondary: "w-3 h-3" }
      case "minimal":
        return { primary: "w-2 h-2", secondary: "w-1.5 h-1.5" }
      default:
        return { primary: "w-8 h-8", secondary: "w-6 h-6" }
    }
  }

  const getColors = () => {
    switch (colors) {
      case "pink-red":
        return {
          primary: "from-pink-400 to-red-600",
          secondary: "from-rose-400 to-pink-600",
        }
      case "emerald-teal":
        return {
          primary: "from-emerald-400 to-teal-600",
          secondary: "from-teal-400 to-cyan-600",
        }
      case "orange-yellow":
        return {
          primary: "from-orange-400 to-yellow-600",
          secondary: "from-amber-400 to-orange-600",
        }
      case "mixed":
        return {
          primary: "from-blue-400 to-purple-600",
          secondary: "from-pink-400 to-red-600",
        }
      default:
        return {
          primary: "from-blue-400 to-purple-600",
          secondary: "from-purple-400 to-indigo-600",
        }
    }
  }

  const sizes = getSize()
  const colorScheme = getColors()

  const renderDots = (pos: string) => {
    const positions = {
      "top-left": { primary: "-top-4 -left-4", secondary: "-top-2 -left-2" },
      "top-right": { primary: "-top-4 -right-4", secondary: "-top-2 -right-2" },
      "bottom-left": { primary: "-bottom-4 -left-4", secondary: "-bottom-2 -left-2" },
      "bottom-right": { primary: "-bottom-4 -right-4", secondary: "-bottom-2 -right-2" },
    }

    const pos_config = positions[pos as keyof typeof positions]

    return (
      <>
        <div
          className={`absolute ${pos_config.primary} ${sizes.primary} bg-gradient-to-r ${colorScheme.primary} rounded-full opacity-20 animate-pulse`}
        />
        <div
          className={`absolute ${pos_config.secondary} ${sizes.secondary} bg-gradient-to-r ${colorScheme.secondary} rounded-full opacity-20 animate-pulse animation-delay-1000`}
        />
      </>
    )
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {position === "all-corners" ? (
        <>
          {renderDots("top-left")}
          {renderDots("top-right")}
          {renderDots("bottom-left")}
          {renderDots("bottom-right")}
        </>
      ) : (
        renderDots(position)
      )}
    </div>
  )
}

interface FloatingParticlesProps {
  count?: number
  colors?: string[]
  size?: "small" | "medium" | "large"
  speed?: "slow" | "normal" | "fast"
  className?: string
}

export function FloatingParticles({
  count = 15,
  colors = ["from-blue-400 to-purple-600", "from-pink-400 to-red-600", "from-emerald-400 to-teal-600"],
  size = "medium",
  speed = "normal",
  className = "",
}: FloatingParticlesProps) {
  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "w-1 h-1"
      case "large":
        return "w-3 h-3"
      default:
        return "w-2 h-2"
    }
  }

  const getSpeedClass = () => {
    switch (speed) {
      case "slow":
        return "4s"
      case "fast":
        return "2s"
      default:
        return "3s"
    }
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`absolute ${getSizeClass()} bg-gradient-to-r ${colors[i % colors.length]} rounded-full opacity-20 animate-float`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Number.parseInt(getSpeedClass()) + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

interface GradientOrbsProps {
  variant?: "hero" | "section" | "card"
  className?: string
}

export function GradientOrbs({ variant = "section", className = "" }: GradientOrbsProps) {
  const getOrbConfig = () => {
    switch (variant) {
      case "hero":
        return {
          size: "w-96 h-96",
          blur: "blur-3xl",
          orbs: [
            { gradient: "from-blue-400/30 to-purple-600/30", position: "top-10 left-10" },
            { gradient: "from-pink-400/30 to-red-600/30", position: "top-60 right-10" },
            { gradient: "from-emerald-400/30 to-teal-600/30", position: "bottom-10 left-1/2" },
          ],
        }
      case "card":
        return {
          size: "w-32 h-32",
          blur: "blur-2xl",
          orbs: [
            { gradient: "from-blue-400/20 to-purple-600/20", position: "-top-8 -left-8" },
            { gradient: "from-pink-400/20 to-red-600/20", position: "-bottom-8 -right-8" },
          ],
        }
      default:
        return {
          size: "w-64 h-64",
          blur: "blur-2xl",
          orbs: [
            { gradient: "from-blue-400/20 to-purple-600/20", position: "top-0 left-0" },
            { gradient: "from-pink-400/20 to-red-600/20", position: "bottom-0 right-0" },
          ],
        }
    }
  }

  const config = getOrbConfig()

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {config.orbs.map((orb, index) => (
        <div
          key={index}
          className={`absolute ${config.size} bg-gradient-to-r ${orb.gradient} rounded-full ${config.blur} animate-blob ${orb.position}`}
          style={{ animationDelay: `${index * 2}s` }}
        />
      ))}
    </div>
  )
}
