// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server'
import { fallbackLng, languages, cookieName, type Language } from './lib/i18n-config'

// ---------------------------------------------------------------------------
// Matcher — single source of truth for which paths middleware runs on.
//
// Excludes (handled by the pattern's negative lookahead):
//   _next/static   — compiled JS/CSS chunks
//   _next/image    — Next.js image optimisation endpoint
//   images         — /public/images/ static folder
//   assets         — /public/assets/ static folder
//   favicon.ico    — root favicon (additional static files handled below)
//   api            — API routes; these handle their own logic
//
// NOTE: _next/data (RSC payload fetches) is intentionally NOT excluded —
// those requests already carry the locale in their URL path and will pass
// the hasLocale check below without redirecting.
//
// Hash fragments (#section) are never sent to the server by browsers, so
// they cannot be preserved here — this is a browser-level constraint, not
// a bug. (#6)
// ---------------------------------------------------------------------------
export const config = {
  matcher: ['/((?!_next/static|_next/image|images|assets|favicon.ico|api).*)'],
}

// ---------------------------------------------------------------------------
// Language negotiation helpers
// ---------------------------------------------------------------------------

/**
 * Extracts a supported locale from the Accept-Language header.
 * Respects quality weights (e.g. "en-US,en;q=0.9,fr;q=0.8") by parsing all
 * tags in order rather than only looking at the first one.
 *
 * Strips region subtags before matching (e.g. "en-US" → "en") so that
 * region-specific browser settings still resolve to a supported base locale.
 *
 * If you later add region-distinct locales (e.g. "zh-TW" vs "zh-CN"),
 * extend this function to match on the full tag before falling back to the
 * base tag. (#3)
 */
function detectFromHeader(header: string | null): Language | null {
  if (!header) return null

  const tags = header
    .split(',')
    .map((entry) => {
      const [tag, q] = entry.trim().split(';q=')
      return {
        base: tag.trim().split('-')[0].toLowerCase(),
        q: q ? parseFloat(q) : 1,
      }
    })
    .sort((a, b) => b.q - a.q)

  for (const { base } of tags) {
    if ((languages as readonly string[]).includes(base)) {
      return base as Language
    }
  }
  return null
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl

  // -------------------------------------------------------------------------
  // Static asset guard — catches file extensions and a few known root-level
  // static files that the matcher above doesn't cover (robots.txt,
  // site.webmanifest, sw.js, etc.).
  //
  // The matcher is the primary filter; this is a defence-in-depth fallback
  // so that adding a new public file never accidentally gets locale-redirected.
  // These two layers are intentionally kept in sync:
  //   - Matcher: excludes known directories by prefix
  //   - Runtime: excludes any path with a file extension + specific root files
  // (#1, #2, #7)
  // -------------------------------------------------------------------------
  const isStaticFile =
    /\.[^/]+$/.test(pathname) || // any path ending with an extension
    pathname === '/robots.txt' ||
    pathname === '/site.webmanifest' ||
    pathname === '/sw.js'

  if (isStaticFile) {
    return NextResponse.next()
  }

  // -------------------------------------------------------------------------
  // If the URL already starts with a supported locale, check whether it
  // matches the stored cookie preference and update the cookie if not.
  //
  // This keeps the cookie in sync when a user navigates directly to a locale
  // URL that differs from their stored preference (e.g. shared link in /fr
  // when cookie says "en"). The URL locale always wins; we just persist it. (#5)
  // -------------------------------------------------------------------------
  const urlLocale = languages.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  ) as Language | undefined

  if (urlLocale) {
    const cookieLng = request.cookies.get(cookieName)?.value

    // Cookie is already correct — pass through with no work.
    if (cookieLng === urlLocale) {
      return NextResponse.next()
    }

    // URL locale differs from cookie — update the cookie, then pass through.
    const response = NextResponse.next()
    response.cookies.set(cookieName, urlLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1-year retention
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    return response
  }

  // -------------------------------------------------------------------------
  // No locale in the URL — detect the preferred locale and redirect.
  //
  // Priority:
  //   1. Cookie (persisted from a previous visit or explicit language switch)
  //   2. Accept-Language header (browser preference, quality-weight aware)
  //   3. Fallback locale
  //
  // Redirect status is explicitly 307 (Temporary Redirect) — NOT 308 —
  // because the "correct" locale is per-user and must never be cached by
  // browsers or CDNs. (#4)
  // -------------------------------------------------------------------------
  const cookieLng = request.cookies.get(cookieName)?.value
  const headerLng = detectFromHeader(request.headers.get('accept-language'))

  const detectedLng: Language = (
    (languages as readonly string[]).includes(cookieLng as string)
      ? cookieLng
      : headerLng ?? fallbackLng
  ) as Language

  const redirectUrl = new URL(
    `/${detectedLng}${pathname}${request.nextUrl.search}`,
    request.url
  )

  // Explicit 307 to document intent — temporary, non-cacheable. (#4)
  const response = NextResponse.redirect(redirectUrl, { status: 307 })

  // Persist the detected locale so the next visit to "/" skips header parsing.
  response.cookies.set(cookieName, detectedLng, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1-year retention
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}