"use client"

export default function SharedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300/30 dark:bg-purple-700/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300/30 dark:bg-yellow-700/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob [animation-delay:2s]" />
      <div className="absolute bottom-0 -left-4 w-72 h-72 bg-pink-300/30 dark:bg-pink-700/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob [animation-delay:4s]" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-transparent to-background/50" />
    </div>
  )
}
