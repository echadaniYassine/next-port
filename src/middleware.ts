// ===========================================
// 11. middleware.ts - Route Middleware
// ===========================================
import { NextRequest, NextResponse } from 'next/server'
import { fallbackLng, languages } from './lib/i18n-config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for specific paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if pathname starts with supported locale
  const pathnameIsMissingLocale = languages.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${fallbackLng}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|dictionaries).*)',
  ],
}