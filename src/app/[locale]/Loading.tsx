// src/app/[locale]/loading.tsx

'use client'

export default function Loading() {
  return (
    <div role="status" aria-live="polite" aria-label="Loading page" className="min-h-screen flex items-center justify-center">
      <div aria-hidden="true" className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}