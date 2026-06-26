import './globals.css'

interface BlankLayoutProps {
  children: React.ReactNode
}

export default function BlankLayout({ children }: BlankLayoutProps) {
  return (
    // Only place the structural tags here. Remove them completely from inner folders.
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}