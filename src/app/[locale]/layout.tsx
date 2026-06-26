// src/app/[locale]/layout.tsx

import { languages, type Language } from '../../lib/i18n-config'
import { getTranslation } from '../../lib/i18n/server'
import { ThemeProvider } from 'next-themes'
import SharedBackground from '../../components/SharedBackground'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function dir(locale: string): 'ltr' | 'rtl' {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur']
  return rtlLanguages.includes(locale) ? 'rtl' : 'ltr'
}

/**
 * Maps bare ISO-639-1 codes to IETF BCP-47 tags required by Google hreflang.
 * Extend this map as you add more locales.
 */
const IETF_MAP: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  ar: 'ar-MA',
  es: 'es-ES',
  de: 'de-DE',
  // add more locales here as needed
}

function toIETF(locale: string): string {
  return IETF_MAP[locale] ?? locale
}

// ---------------------------------------------------------------------------
// Fonts
// ---------------------------------------------------------------------------

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true, // above-the-fold body font — keep preloaded
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  // FIX: removed preload:true — mono font is only used in code blocks,
  // not in the initial viewport, so preloading wastes a high-priority slot.
})

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

// ---------------------------------------------------------------------------
// Viewport
// ---------------------------------------------------------------------------

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'light dark',
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Language }>
}): Promise<Metadata> {
  const { locale } = await params
  const { t } = await getTranslation(locale, 'common')

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com'

  // FIX: use ?? instead of || so empty-string translations don't fall back to
  // the hard-coded default (empty string is a valid — if broken — translation).
  const siteName = t('site.name') ?? 'Echadani Yassine'
  const siteTitle = t('site.title') ?? 'Portfolio'
  const siteDescription = t('site.description') ?? 'Portfolio Website'

  return {
    title: { template: `%s | ${siteName}`, default: siteTitle },
    description: siteDescription,
    keywords: [
      'Full Stack Developer', 'React Developer', 'Next.js Expert',
      'Laravel Developer', 'Web Development', 'Frontend Development',
      'Backend Development', 'Portfolio', 'TypeScript', 'JavaScript',
    ],
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      // FIX: keys must be IETF BCP-47 tags for valid hreflang (e.g. "en-US" not "en")
      languages: Object.fromEntries(
        languages.map((lang) => [toIETF(lang), `${siteUrl}/${lang}`])
      ),
    },
    openGraph: {
      type: 'website',
      locale,                                              // Next.js emits og:locale from here
      alternateLocale: languages.filter((lang) => lang !== locale),
      url: `${siteUrl}/${locale}`,
      title: siteTitle,
      description: siteDescription,
      siteName,
      images: [{
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteName,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [`${siteUrl}/images/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    manifest: `${siteUrl}/site.webmanifest`,
    other: {
      // FIX: removed duplicate 'og:locale' — Next.js already outputs it via openGraph.locale above.
      'application-name': siteName,
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': siteName,
    },
  }
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Language }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params
  const { t } = await getTranslation(locale, 'common')

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com'
  const siteName = t('site.name') ?? 'Echadani Yassine'

  // FIX: JSON-LD now uses t() for localisable strings so non-English
  // locales get correct job title and description in structured data.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: siteName,
    url: siteUrl,
    // FIX: pull from translation files — add schema.jobTitle / schema.description keys
    jobTitle: t('schema.jobTitle') ?? 'Full Stack Developer',
    description: t('schema.description') ?? 'Experienced Full Stack Developer skilled in React, Next.js, and Laravel',
    knowsAbout: ['Web Development', 'React', 'Next.js', 'Laravel', 'TypeScript'],
    sameAs: [
      'https://github.com/echadaniYassine',
      'https://www.linkedin.com/in/yassine-echadani-5904b8268/',
    ],
  }

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      suppressHydrationWarning
      // FIX: scroll-smooth stays here for JS anchor links, but is overridden
      // by prefers-reduced-motion in globals.css (see snippet below).
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          id="ld-json-schema"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body
        suppressHydrationWarning
        className="antialiased min-h-screen transition-colors duration-150 bg-background text-foreground"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          enableColorScheme
        >
          <SharedBackground />
          <div className="relative z-10">{children}</div>
        </ThemeProvider>

        <Script id="scroll-detector" strategy="lazyOnload">
          {`
            (function() {
              var isScrolling = false;
              var scrollTimeout;
              var body = document.body;

              function handleScroll() {
                if (!isScrolling) {
                  isScrolling = true;
                  body.classList.add('scrolling');
                }
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                  isScrolling = false;
                  body.classList.remove('scrolling');
                }, 150);
              }

              window.addEventListener('scroll', handleScroll, { passive: true });
            })();
          `}
        </Script>

        {/* FIX: SW errors now logged in development instead of being silently swallowed */}
        <Script id="sw-loader" strategy="lazyOnload">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').catch(function(err) {
                  if (${process.env.NODE_ENV === 'development' ? 'true' : 'false'}) {
                    console.warn('[SW] Registration failed:', err);
                  }
                });
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}