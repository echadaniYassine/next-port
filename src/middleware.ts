import { NextRequest, NextResponse } from 'next/server'
import { fallbackLng, languages, cookieName, type Language } from './lib/i18n-config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Instantly exclude core systemic internal files and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/site.webmanifest' ||
    /\.(.*)$/.test(pathname) // Matches any path string terminating with an explicit extension
  ) {
    return NextResponse.next()
  }

  // 2. Improved regex check for clean sub-route tracking matches
  const hasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!hasLocale) {
    const cookieLng = request.cookies.get(cookieName)?.value
    const headerLng = request.headers.get('accept-language')?.split(',')[0].split('-')[0]
    
    const detectedLng = (
      languages.includes(cookieLng as Language) ? cookieLng :
      languages.includes(headerLng as Language) ? headerLng :
      fallbackLng
    ) as Language

    const redirectUrl = new URL(`/${detectedLng}${pathname}${request.nextUrl.search}`, request.url)
    const response = NextResponse.redirect(redirectUrl)

    // 3. Write language preferences back to cookies to prevent header evaluation delays on future requests
    response.cookies.set(cookieName, detectedLng, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year retention
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    return response
  }

  return NextResponse.next()
}

export const config = {
  // Catch all structural endpoints except static directories
  matcher: ['/((?!_next/static|_next/image|images|assets|favicon.ico).*)'],
}