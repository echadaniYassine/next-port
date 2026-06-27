// src/app/[locale]/error.tsx
//
// Route-level error boundary for the [locale] segment.
// Must be a Client Component — Next.js error boundaries require 'use client'.

'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function LocaleError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Only log the full error object in development.
    // In production, log only the safe digest (server-assigned opaque ID)
    // to avoid leaking stack traces and internal paths to the browser console. (#4)
    if (process.env.NODE_ENV === 'development') {
      console.error('[LocaleError]', error)
    } else if (error.digest) {
      console.error('[LocaleError] digest:', error.digest)
    }

    // Replace the console.error calls above with your telemetry client
    // once one is set up, e.g.:
    //   Sentry.captureException(error)
    //   datadogRum.addError(error)
  }, [error])

  return (
    <div
      role="alert"
      className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center"
    >
      <h1 className="text-3xl font-bold text-foreground">
        Something went wrong
      </h1>
      <p className="text-muted-foreground max-w-md">
        An unexpected error occurred. You can try again or return to the home page.
      </p>
      {/* digest is a server-assigned opaque ID — safe to show to the user for support */}
      {error.digest && (
        <p className="text-xs text-muted-foreground font-mono">
          Error ID: {error.digest}
        </p>
      )}
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
        <a
          href="/"
          className="px-4 py-2 rounded-md border border-border hover:bg-muted transition-colors"
        >
          Go home
        </a>
      </div>
    </div>
  )
}