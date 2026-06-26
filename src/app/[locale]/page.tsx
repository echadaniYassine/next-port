// src/app/[locale]/page.tsx
import { getTranslation } from '../../lib/i18n/server'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Hero from '../../components/Hero'
import Navbar from '../../components/Navbar'
import { type Language } from '../../lib/i18n-config'
import ScrollToTopButton from '../../components/ScrollToTopButton'
import SectionSkeleton from '../../components/SectionSkeleton'

// Static imports for lightweight, synchronous sections
import About from '../../components/About'
import Skills from '../../components/Skills'

// Dynamic imports only for heavier sections that may have client-side deps
const Projects = dynamic(() => import('../../components/Projects'))
const Contact = dynamic(() => import('../../components/Contact'))

interface PageProps {
  params: Promise<{ locale: Language }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const { t } = await getTranslation(locale, 'common')

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <Navbar locale={locale} />
      <Hero locale={locale} />

      <Suspense fallback={<SectionSkeleton />}>
        <About locale={locale} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Skills locale={locale} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Projects locale={locale} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <Contact locale={locale} />
      </Suspense>

      <ScrollToTopButton />
    </main>
  )
}