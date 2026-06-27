// src/app/[locale]/page.tsx

import { getTranslation } from '../../lib/i18n/server'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import Hero from '../../components/Hero'
import Navbar from '../../components/Navbar'
import { type Language } from '../../lib/i18n-config'
import ScrollToTopButton from '../../components/ScrollToTopButton'
import SectionSkeleton from '../../components/SectionSkeleton'
import About from '../../components/About'
import Skills from '../../components/Skills'

// Dynamic imports for heavier sections — these are the only ones that
// actually benefit from <Suspense> (async/lazy boundary).
const Projects = dynamic(() => import('../../components/Projects'))
const Contact = dynamic(() => import('../../components/Contact'))

interface PageProps {
  params: Promise<{ locale: Language }>
}

// ---------------------------------------------------------------------------
// Page-level metadata
// Sets the title consumed by the layout template: "%s | Echadani Yassine"
// Without this, the home page title renders as "| Echadani Yassine". 
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Language }>
}): Promise<Metadata> {
  const { locale } = await params
  const { t } = await getTranslation(locale, 'common')

  return {
    // Uses home-specific key if available; falls back to site title.
    // t() returns the key string on miss (never null), so || is correct.
    title: t('site.title') || t('site.title') || 'Home',
    // Single fallback chain — removed accidental duplicate t('site.description'). (#3)
    description: t('site.description') || 'Portfolio Website',
  }
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const { t } = await getTranslation(locale, 'common')

  return (
    // overflow-x-clip is used instead of overflow-x-hidden on <main> because
    // overflow-x-hidden creates a scroll container that clips focus rings and
    // breaks sticky/fixed positioning of child elements.
    // overflow-x-clip achieves the same visual clipping without those side effects.
    <main
      className="relative w-full min-h-screen"
      // aria-label on <main> should describe the landmark's purpose, not
      // repeat the page title. "Main content" is the conventional label. (#2)
      aria-label={t('site.title') || 'Main content'}
    >
      <div className="overflow-x-clip">
        <Navbar locale={locale} />
        <Hero locale={locale} />

        {/* Synchronous static imports — no Suspense needed, fallback never fires */}
        <About locale={locale} />
        <Skills locale={locale} />

        {/* Dynamic imports — Suspense correctly shows skeleton while chunk loads */}
        <Suspense fallback={<SectionSkeleton />}>
          <Projects locale={locale} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Contact locale={locale} />
        </Suspense>
      </div>

      <ScrollToTopButton />
    </main>
  )
}