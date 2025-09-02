// src/app/[locale]/layout.tsx
import { dir } from 'i18next'
import { languages, type Language } from '../../lib/i18n-config'
import { getTranslation } from '../../lib/i18n/server'
import { ThemeProvider } from 'next-themes'
import SharedBackground from '../../components/SharedBackground'
import ClientWrapper from '../../components/ClientWrapper'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'

// Optimized font loading with better display strategy
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'Consolas', 'Monaco', 'monospace'],
})

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }))
}

// Separate viewport export for better Next.js 15 support
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
  colorScheme: 'light dark',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Language }>
}): Promise<Metadata> {
  const { locale } = await params
  const { t } = await getTranslation(locale)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const siteName = t('site.name')
  const siteTitle = t('site.title')
  const siteDescription = t('site.description')

  return {
    title: {
      template: `%s | ${siteName}`,
      default: siteTitle,
    },
    description: siteDescription,
    keywords: [
      'Full Stack Developer',
      'React Developer',
      'Next.js Expert',
      'Laravel Developer',
      'Web Development',
      'Frontend Development',
      'Backend Development',
      'Portfolio',
      'TypeScript',
      'JavaScript',
    ],
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: Object.fromEntries(
        languages.map(lang => [lang, `${siteUrl}/${lang}`])
      ),
    },
    openGraph: {
      type: 'website',
      locale: locale,
      alternateLocale: languages.filter(lang => lang !== locale),
      url: `${siteUrl}/${locale}`,
      title: siteTitle,
      description: siteDescription,
      siteName: siteName,
      images: [
        {
          url: `${siteUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${siteName} - ${siteTitle}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [`${siteUrl}/images/og-image.jpg`],
      creator: '@your_twitter_handle', // Replace with actual handle
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // Add your verification codes
      // yandex: 'your-yandex-code',
      // bing: 'your-bing-code',
    },
    category: 'technology',
    classification: 'Portfolio Website',
    other: {
      'og:locale': locale,
      'application-name': siteName,
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': siteName,
      'mobile-web-app-capable': 'yes',
      'msapplication-TileColor': '#ffffff',
      'msapplication-config': '/browserconfig.xml',
    },
  }
}

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Language }>
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Preconnect to critical third-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Favicon and app icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Critical CSS for instant theme switching and performance */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical styles for immediate paint */
              :root {
                color-scheme: light dark;
                --font-geist-sans: ${geistSans.style.fontFamily};
                --font-geist-mono: ${geistMono.style.fontFamily};
              }
              
              /* Prevent flash of unstyled content */
              html {
                // font-family: var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
                line-height: 1.5;
                -webkit-text-size-adjust: 100%;
                -moz-tab-size: 4;
                tab-size: 4;
                scroll-behavior: smooth;
              }
              
              body {
                margin: 0;
                transition: background-color 0.15s ease, color 0.15s ease;
                background-color: hsl(var(--background, 0 0% 100%));
                color: hsl(var(--foreground, 222.2 84% 4.9%));
                font-feature-settings: "rlig" 1, "calt" 1;
                text-rendering: optimizeLegibility;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              
              /* Instant theme switching without transitions */
              .theme-transitioning *,
              .theme-transitioning *::before,
              .theme-transitioning *::after {
                transition: none !important;
                animation-duration: 0.01ms !important;
                animation-delay: -0.01ms !important;
              }
              
              /* Prevent layout shift */
              .theme-bg {
                background: hsl(var(--background));
              }
              
              .theme-text {
                color: hsl(var(--foreground));
              }
              
              /* Loading optimization */
              @media (prefers-reduced-motion: reduce) {
                html { scroll-behavior: auto; }
                *, *::before, *::after {
                  animation-duration: 0.01ms !important;
                  animation-iteration-count: 1 !important;
                  transition-duration: 0.01ms !important;
                }
              }
            `,
          }}
        />



        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#person`,
              "name": "Your Name", // Replace with actual name
              "url": process.env.NEXT_PUBLIC_SITE_URL,
              "jobTitle": "Full Stack Developer",
              "description": "Experienced Full Stack Developer skilled in React, Next.js, and Laravel",
              "knowsAbout": ["Web Development", "React", "Next.js", "Laravel", "TypeScript"],
              "sameAs": [
                "https://github.com/yourusername", // Replace with actual profiles
                "https://linkedin.com/in/yourprofile",
                "https://twitter.com/yourhandle"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Your Company" // Replace with actual info
              }
            })
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        let isScrolling = false;
        let scrollTimeout;
        const body = document.body;
        
        function throttle(func, limit) {
          let inThrottle;
          return function() {
            if (!inThrottle) {
              func.apply(this, arguments);
              inThrottle = true;
              setTimeout(() => inThrottle = false, limit);
            }
          }
        }
        
        const handleScroll = throttle(() => {
          if (!isScrolling) {
            isScrolling = true;
            body.classList.add('scrolling');
          }
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
            body.classList.remove('scrolling');
          }, 100);
        }, 10);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
      })();
    `
          }}
        />
      </head>
      <body className="antialiased theme-bg theme-text">
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

        {/* Service Worker registration for PWA */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {
                    // Service worker registration failed
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}