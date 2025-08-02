import { dir } from 'i18next'
import { languages, type Language } from '../../lib/i18n-config'
import { getTranslation } from '../../lib/i18n/server'
import { ThemeProvider } from 'next-themes'
import SharedBackground from '../../components/SharedBackground'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: Language }
}): Promise<Metadata> {
  const { t } = await getTranslation(locale)
  
  return {
    title: {
      template: `%s | ${t('site.name')}`,
      default: t('site.title'),
    },
    description: t('site.description'),
    keywords: ["Full Stack Developer", "React", "Next.js", "Laravel", "Web Development", "Portfolio"],
    authors: [{ name: t('site.name') }],
    creator: t('site.name'),
    other: {
      'og:locale': locale,
    },
  }
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: Language }
}

export default function RootLayout({ 
  children, 
  params: { locale } 
}: RootLayoutProps) {
  return (
    <html 
      lang={locale} 
      dir={dir(locale)} 
      suppressHydrationWarning 
      className="scroll-smooth"
    >
      <head>
        <meta 
          name="theme-color" 
          content="#ffffff" 
          media="(prefers-color-scheme: light)" 
        />
        <meta 
          name="theme-color" 
          content="#0a0a0a" 
          media="(prefers-color-scheme: dark)" 
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="theme"
        >
          <SharedBackground />
          <main className="relative z-10">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}