"use client"

export default function SharedBackground() {
  return (
    <div
      className="fixed inset-0 -z-50 h-full w-full"
      aria-hidden="true"
    >
      {/* Container for the animated blobs */}
      <div className="relative h-full w-full">

        {/* Top-Left Blob */}
        <div
          className="
            absolute -top-16 -left-16 h-72 w-72 rounded-full
            bg-sky-200/50
            mix-blend-multiply filter blur-3xl
            animate-blob
            dark:bg-sky-500/30 dark:mix-blend-lighten
          "
        />

        {/* Bottom-Right Blob */}
        <div
          className="
            absolute -bottom-16 -right-16 h-80 w-80 rounded-full
            bg-violet-200/50
            mix-blend-multiply filter blur-3xl
            animate-blob [animation-delay:2s]
            dark:bg-violet-500/30 dark:mix-blend-lighten
          "
        />

        {/* Bottom-Left Blob */}
        <div
          className="
            absolute -bottom-24 left-8 h-64 w-64 rounded-full
            bg-rose-200/50
            mix-blend-multiply filter blur-3xl
            animate-blob [animation-delay:4s]
            dark:bg-rose-500/30 dark:mix-blend-lighten
          "
        />
      </div>
      
      {/* Subtle grid pattern - opacity is adjusted for light/dark themes */}
      <div
        className="
          absolute inset-0 bg-[size:4rem_4rem] opacity-[0.03]
          [background-image:linear-gradient(to_right,hsl(var(--foreground)),transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)),transparent_1px)]
          dark:opacity-[0.05]
        "
      />
      
      {/* Gradient overlay to soften the edges and create a vignette effect */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/90"
      />
    </div>
  )
}