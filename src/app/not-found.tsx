// src/app/not-found.tsx
//
// THE ONLY not-found.tsx IN THE PROJECT.
// → DELETE src/app/[locale]/not-found.tsx if it exists.
//
// WHY ONE FILE AT THE ROOT:
//   Next.js resolves not-found.tsx by walking UP the layout tree.
//   It always reaches src/app/not-found.tsx first — the file at
//   [locale]/not-found.tsx is never used because the root intercepts.
//
// WHY SELF-CONTAINED:
//   This renders under src/app/layout.tsx, which is a React fragment
//   with no <html>/<body>. We must supply our own document shell.
//   We also have no ThemeProvider, no Tailwind CSS, and no fonts from
//   the locale layout — so everything is inlined via a <style> block.
//   Dark mode is handled with prefers-color-scheme media queries.

import GoBackButton from '../components/GoBackButton'

export default function RootNotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404 — Page Not Found</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;600;900&display=swap"
          rel="stylesheet"
        />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          :root {
            --bg-from: #f9fafb; --bg-via: #ffffff; --bg-to: #eff6ff;
            --text: #111827; --subtext: #4b5563;
            --border: #111827;
            --blob-1: #c4b5fd; --blob-2: #93c5fd; --blob-3: #f9a8d4;
            --rocket-bg: linear-gradient(135deg,#dbeafe,#ede9fe);
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg-from: #111827; --bg-via: #1f2937; --bg-to: #1e3a5f;
              --text: #ffffff; --subtext: #9ca3af;
              --border: #ffffff;
              --blob-1: #7c3aed; --blob-2: #1d4ed8; --blob-3: #be185d;
              --rocket-bg: linear-gradient(135deg,rgba(30,58,138,.3),rgba(88,28,135,.3));
            }
          }

          html, body {
            min-height: 100vh;
            font-family: 'Geist', system-ui, sans-serif;
            background: linear-gradient(135deg, var(--bg-from) 0%, var(--bg-via) 50%, var(--bg-to) 100%);
            color: var(--text);
            -webkit-font-smoothing: antialiased;
          }

          .page {
            min-height: 100vh;
            display: flex; align-items: center; justify-content: center;
            position: relative; overflow: hidden; padding: 2rem;
          }

          .blob {
            position: absolute; width: 320px; height: 320px;
            border-radius: 50%; filter: blur(60px); opacity: 0.2;
            animation: blob 8s ease-in-out infinite;
          }
          .blob-1 { background: var(--blob-1); top: -80px;   right: -80px; }
          .blob-2 { background: var(--blob-2); bottom: -80px; left: -80px; animation-delay: 2s; }
          .blob-3 { background: var(--blob-3); top: 160px;   left: 160px;  animation-delay: 4s; }
          @keyframes blob {
            0%,100% { transform: translate(0,0) scale(1); }
            33%      { transform: translate(20px,-20px) scale(1.05); }
            66%      { transform: translate(-10px,10px) scale(0.97); }
          }

          .content {
            position: relative; z-index: 10;
            text-align: center; max-width: 640px; width: 100%;
          }

          .heading-404 {
            font-size: clamp(6rem, 20vw, 12rem);
            font-weight: 900; line-height: 1;
            background: linear-gradient(90deg, #2563eb, #9333ea);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            background-clip: text;
            user-select: none; margin-bottom: 2rem;
            animation: pulse-slow 3s ease-in-out infinite;
          }
          @keyframes pulse-slow {
            0%,100% { opacity: 1; } 50% { opacity: 0.85; }
          }

          .title    { font-size: clamp(1.5rem,4vw,2.25rem); font-weight: 700; margin-bottom: 1rem; }
          .subtitle { font-size: 1.125rem; color: var(--subtext); margin-bottom: 2rem; line-height: 1.6; }

          .rocket-wrap {
            width: 160px; height: 160px; margin: 0 auto 2.5rem;
            border-radius: 50%; background: var(--rocket-bg);
            display: flex; align-items: center; justify-content: center;
            animation: float 3s ease-in-out infinite;
          }
          .rocket { font-size: 4rem; display: inline-block; animation: bounce 1s ease-in-out infinite; }
          @keyframes float  { 0%,100% { transform: translateY(0); }    50% { transform: translateY(-10px); } }
          @keyframes bounce { 0%,100% { transform: translateY(0); }    50% { transform: translateY(-8px);  } }

          .btn-row  { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }

          .btn {
            display: inline-flex; align-items: center; gap: 0.5rem;
            padding: 1rem 2rem; border-radius: 0.75rem;
            font-size: 1rem; font-weight: 600; font-family: inherit;
            cursor: pointer; text-decoration: none;
            transition: transform 0.2s, box-shadow 0.2s;
            border: 2px solid transparent;
          }
          .btn:hover  { transform: scale(1.05); box-shadow: 0 8px 24px rgba(0,0,0,.15); }
          .btn:focus  { outline: 3px solid #2563eb; outline-offset: 3px; }

          .btn-primary { background: linear-gradient(90deg,#2563eb,#9333ea); color: #fff; }

          .arrow { width: 1.25rem; height: 1.25rem; transition: transform 0.2s; flex-shrink: 0; }
          .btn-primary:hover .arrow { transform: translateX(-3px); }
        `}</style>
      </head>

      <body>
        <div className="page">
          <div className="blob blob-1" aria-hidden="true" />
          <div className="blob blob-2" aria-hidden="true" />
          <div className="blob blob-3" aria-hidden="true" />

          <main className="content">
            <h1 className="heading-404" aria-label="404 error">404</h1>

            <div className="rocket-wrap" aria-hidden="true">
              <span className="rocket">🚀</span>
            </div>

            <h2 className="title">Oops! Page Not Found</h2>
            <p className="subtitle">
              The page you&apos;re looking for seems to have vanished into the digital void.
            </p>

            <div className="btn-row">
              <a href="/" className="btn btn-primary">
                <svg className="arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m0 7h18" />
                </svg>
                Back to Home
              </a>

              {/* Client component — isolated so this file stays a Server Component */}
              <GoBackButton />
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}