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
import Experience from '../../components/Experience'      // ← add

const Projects = dynamic(() => import('../../components/Projects'))
const Contact = dynamic(() => import('../../components/Contact'))

interface PageProps {
  params: Promise<{ locale: Language }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Language }>
}): Promise<Metadata> {
  const { locale } = await params
  const { t } = await getTranslation(locale, 'common')

  return {
    title: t('site.title') || t('site.title') || 'Home',
    description: t('site.description') || 'Portfolio Website',
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const { t } = await getTranslation(locale, 'common')

  return (
    <main
      className="relative w-full min-h-screen"
      aria-label={t('site.title') || 'Main content'}
    >
      <div className="overflow-x-clip">
        <Navbar locale={locale} />
        <Hero locale={locale} />

        {/* Synchronous static imports — no Suspense needed, fallback never fires */}
        <About locale={locale} />
        <Experience locale={locale} />
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