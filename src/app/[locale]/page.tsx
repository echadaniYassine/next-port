// src/app/[locale]/page.tsx - Home Page
import { getTranslation } from '../../lib/i18n/server'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Hero from '../../components/Hero'
import Navbar from '../../components/Navbar'
import Loading from './Loading'
import { type Language } from '../../lib/i18n-config'

// Dynamic imports for better performance
const About = dynamic(() => import('../../components/About'), {
  loading: () => <Loading />,
})
const Skills = dynamic(() => import('../../components/Skills'), {
  loading: () => <Loading />,
})
const Projects = dynamic(() => import('../../components/Projects'), {
  loading: () => <Loading />,
})
const Contact = dynamic(() => import('../../components/Contact'), {
  loading: () => <Loading />,
})

interface PageProps {
  params: Promise<{ locale: Language }> // Updated: params is now a Promise
}

export default async function HomePage({ params }: PageProps) { // Made async
  const { locale } = await params // Updated: await the params

  // Pre-load translations on server
  await getTranslation(locale, 'common')

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <Navbar locale={locale} />
      <Hero locale={locale} />
      <Suspense fallback={<Loading />}>
        <About locale={locale} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Skills locale={locale} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Projects locale={locale} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Contact locale={locale} />
      </Suspense>
    </main>
  )
}