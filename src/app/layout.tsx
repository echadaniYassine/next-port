import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../contexts/ThemeContext"
import { GlobalDecorations } from "../components/GlobalDecorations"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Echadani Yassine - Full Stack Developer",
    template: "%s | Echadani Yassine",
  },
  description:
    "Full Stack Developer passionate about creating amazing web experiences with modern technologies. Specializing in React, Next.js, and Laravel.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Laravel", "Web Development", "Portfolio"],
  authors: [{ name: "Echadani Yassine" }],
  creator: "Echadani Yassine",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Echadani Yassine - Full Stack Developer",
    description: "Full Stack Developer passionate about creating amazing web experiences",
    siteName: "Echadani Yassine Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echadani Yassine - Full Stack Developer",
    description: "Full Stack Developer passionate about creating amazing web experiences",
    creator: "@SNICKER49194247",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'system';
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const resolvedTheme = theme === 'system' ? systemTheme : theme;
                
                if (resolvedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} 
          antialiased min-h-screen font-sans
          bg-background text-foreground
          selection:bg-primary/10 selection:text-primary
          transition-colors duration-300
          overflow-x-hidden
        `}
      >
        <ThemeProvider>
          <GlobalDecorations>{children}</GlobalDecorations>
        </ThemeProvider>
      </body>
    </html>
  )
}
