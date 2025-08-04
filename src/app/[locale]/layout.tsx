// src/app/[locale]/layout.tsx
import { dir } from 'i18next'
import { languages, type Language } from '../../lib/i18n-config'
import { getTranslation } from '../../lib/i18n/server'
import { ThemeProvider } from 'next-themes'
import SharedBackground from '../../components/SharedBackground'
import ClientWrapper from '../../components/ClientWrapper'
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
  params,
}: {
  params: { locale: Language }
}): Promise<Metadata> {
  const { locale } = params
  const { t } = await getTranslation(locale)

  return {
    title: {
      template: `%s | ${t('site.name')}`,
      default: t('site.title'),
    },
    description: t('site.description'),
    keywords: [
      'Full Stack Developer',
      'React',
      'Next.js',
      'Laravel',
      'Web Development',
      'Portfolio',
    ],
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
  params,
}: RootLayoutProps) {
  const { locale } = params
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
        {/* PERFORMANCE: Preload theme styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Instant theme switching */
            .theme-transitioning * {
              transition: none !important;
            }
            /* Faster initial load */
            html { color-scheme: light dark; }
            body { 
              transition: background-color 0.15s ease, color 0.15s ease;
              background-color: hsl(var(--background));
              color: hsl(var(--foreground));
            }
          `
        }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased theme-bg theme-text`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="theme"
          enableColorScheme={true}
        >
          <SharedBackground />
          <ClientWrapper locale={locale}>
            <main className="relative z-10">{children}</main>
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}