
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Under Maintenance | Portfolio',
  description: 'Our portfolio is currently being updated. Coming back soon!',
}

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080808] px-6 text-white">
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <div className="mb-12 text-sm font-semibold tracking-[0.4em] text-white/60">
          PORTFOLIO
        </div>

        <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
          <svg
            className="h-12 w-12 animate-spin text-blue-400"
            style={{ animationDuration: '8s' }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" strokeDasharray="4 4" />
            <path d="M12 3v4m0 10v4M3 12h4m10 0h4" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-yellow-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
          Under Maintenance
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
          Something
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            New Is Coming.
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-lg text-base leading-8 text-white/50 sm:text-lg">
          I&apos;m currently working on improving my portfolio and crafting
          a better experience. I&apos;ll be back soon with something new.
        </p>

        <div className="border-t border-white/10 pt-8">
          <p className="text-xs tracking-wider text-white/30">
            THANK YOU FOR YOUR PATIENCE
          </p>
        </div>
      </div>
    </main>
  )
}
