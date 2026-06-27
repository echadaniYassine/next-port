// src/app/[locale]/layout.tsx

import { languages, type Language } from '../../lib/i18n-config'
import { getTranslation } from '../../lib/i18n/server'
import { ThemeProvider } from 'next-themes'
import SharedBackground from '../../components/SharedBackground'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'

// ---------------------------------------------------------------------------
// Build-time guard — fail loudly in production if the env var is missing.
// ---------------------------------------------------------------------------
if (!process.env.NEXT_PUBLIC_SITE_URL && process.env.NODE_ENV === 'production') {
  throw new Error(
    '[layout] NEXT_PUBLIC_SITE_URL is required in production. ' +
    'Set it in your deployment environment.'
  )
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function dir(locale: string): 'ltr' | 'rtl' {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur']
  return rtlLanguages.includes(locale) ? 'rtl' : 'ltr'
}

/**
 * Maps ISO-639-1 codes to IETF BCP-47 tags for hreflang, og:locale, and
 * <html lang>. Extend as you add locales.
 */
const IETF_MAP: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  ar: 'ar-MA',
  es: 'es-ES',
  de: 'de-DE',
}

function toIETF(locale: string): string {
  return IETF_MAP[locale] ?? locale
}

// ---------------------------------------------------------------------------
// NOTE ON CACHING (#5)
// React.cache() deduplicates calls within a single synchronous render tree.
// However, generateMetadata() and the Layout component run in separate async
// contexts in Next.js 14+ — React.cache does NOT share state between them.
// The safe approach is to call getTranslation() directly in both places.
// i18n translation loading is typically reading a local JSON file (sub-ms),
// so two calls per request is negligible. If you need cross-context caching,
// use Next.js's own `unstable_cache` from 'next/cache' with a request-scoped
// tag.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Fonts
// ---------------------------------------------------------------------------

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  // Not preloaded — mono is only used in code blocks, not in the initial viewport.
})

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

// ---------------------------------------------------------------------------
// Viewport
// Next.js emits <meta name="color-scheme"> from colorScheme below.
// Do NOT pass enableColorScheme to ThemeProvider — that would emit a duplicate.
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

  // t() returns the key string on miss, never null — || is the correct guard.
  const siteName = t('site.name') || 'Echadani Yassine'
  const siteTitle = t('site.title') || 'Portfolio'
  const siteDescription = t('site.description') || 'Portfolio Website'
  const ietfLocale = toIETF(locale)

  return {
    title: { template: `%s | ${siteName}`, default: siteTitle },
    description: siteDescription,
    keywords: [
      'Full Stack Developer', 'React Developer', 'Next.js Expert',
      'Laravel Developer', 'Web Development', 'Frontend Development',
      'Backend Development', 'Portfolio', 'TypeScript', 'JavaScript',
    ],
    authors: [{ name: siteName, url: SITE_URL }],
    creator: siteName,
    publisher: siteName,
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        // x-default tells crawlers which URL to use when no locale matches
        'x-default': SITE_URL,
        ...Object.fromEntries(
          languages.map((lang) => [toIETF(lang), `${SITE_URL}/${lang}`])
        ),
      },
    },
    openGraph: {
      type: 'website',
      locale: ietfLocale,           // must be BCP-47
      alternateLocale: languages
        .filter((lang) => lang !== locale)
        .map(toIETF),               // must also be BCP-47
      url: `${SITE_URL}/${locale}`,
      title: siteTitle,
      description: siteDescription,
      siteName,
      images: [{
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteName,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [`${SITE_URL}/images/og-image.jpg`],
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
    manifest: `${SITE_URL}/site.webmanifest`,
    other: {
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

// Evaluated once at module load — safe to use in the inline script below.
const isDev = process.env.NODE_ENV === 'development'

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params
  const { t } = await getTranslation(locale, 'common')

  const siteName = t('site.name') || 'Echadani Yassine'

  // Escape </script> sequences to prevent XSS via translated strings.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: siteName,
    url: SITE_URL,
    jobTitle: t('schema.jobTitle') || 'Full Stack Developer',
    description:
      t('schema.description') ||
      'Experienced Full Stack Developer skilled in React, Next.js, and Laravel',
    knowsAbout: ['Web Development', 'React', 'Next.js', 'Laravel', 'TypeScript'],
    sameAs: [
      'https://github.com/echadaniYassine',
      'https://www.linkedin.com/in/yassine-echadani-5904b8268/',
    ],
  }

  const jsonLdString = JSON.stringify(jsonLd).replace(/<\//g, '<\\/')
  const ietfLocale = toIETF(locale)

  return (
    // suppressHydrationWarning: next-themes injects the theme class client-side
    // before React hydrates, causing a deliberate attribute mismatch on <html>.
    // This flag suppresses that specific warning without hiding real SSR bugs
    // in child components.
    <html
      lang={ietfLocale}
      dir={dir(locale)}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          id="ld-json-schema"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
      </head>

      <body
        suppressHydrationWarning
        className="antialiased min-h-screen transition-colors duration-150 bg-background text-foreground"
      >
        {/* enableColorScheme omitted — Next.js viewport.colorScheme already emits the meta tag */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
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

        <Script id="sw-loader" strategy="lazyOnload">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').catch(function(err) {
                  if (${isDev}) {
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