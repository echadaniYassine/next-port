import { getTranslation } from '../../lib/i18n/server'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Hero from '../../components/Hero'
import Navbar from '../../components/Navbar'
import Loading from './Loading'
import { type Language } from '../../lib/i18n-config'
import ScrollToTopButton from '../../components/ScrollToTopButton'

const About = dynamic(() => import('../../components/About'))
const Skills = dynamic(() => import('../../components/Skills'))
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
      <Navbar locale={locale} logoText={t('site.logo')} />
      <Hero locale={locale} />
      
      {/* Group sections under one fallback stream layout to stop DOM compilation thread blockages */}
      <Suspense fallback={<Loading />}>
        <About locale={locale} />
        <Skills locale={locale} />
        <Projects locale={locale} />
        <Contact locale={locale} />
      </Suspense>

      <ScrollToTopButton />
    </main>
  )
}