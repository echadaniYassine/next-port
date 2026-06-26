import { languages, type Language } from '../../lib/i18n-config'
import { getTranslation } from '../../lib/i18n/server'
import { ThemeProvider } from 'next-themes'
import SharedBackground from '../../components/SharedBackground'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'

function dir(locale: string): 'ltr' | 'rtl' {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur']
  return rtlLanguages.includes(locale) ? 'rtl' : 'ltr'
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-font-mono',
  subsets: ['latin'],
  display: 'swap',
})

// ... Keep your metadata and viewport generation exactly as they are ...

interface RootLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Language }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    "name": "Echadani Yassine",
    "url": siteUrl,
    "jobTitle": "Full Stack Developer",
  }

  return (
    <div 
      dir={dir(locale)} 
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth min-h-screen bg-background text-foreground`}
    >
      {/* Next.js automatically injects head metadata elements securely */}
      <script
        type="application/ld+json"
        id="ld-json-schema"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            let isScrolling = false;
            let scrollTimeout;
            const body = document.body;
            function handleScroll() {
              if (!isScrolling) { 
                isScrolling = true; 
                body.classList.add('scrolling'); 
              }
              clearTimeout(scrollTimeout);
              scrollTimeout = setTimeout(() => {
                isScrolling = false;
                body.classList.remove('scrolling');
              }, 150);
            }
            window.addEventListener('scroll', handleScroll, { passive: true });
          })();
        `}
      </Script>
    </div>
  )
}