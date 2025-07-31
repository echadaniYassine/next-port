import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { GlobalDecorations } from "../components/GlobalDecorations";
import SharedBackground from '../components/SharedBackground';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

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
  // Metadata fields are correct
};

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
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem >
          <SharedBackground />
          <main className="relative z-10">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}