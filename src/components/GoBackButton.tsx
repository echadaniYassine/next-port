'use client'

// src/components/GoBackButton.tsx
//
// Extracted as a Client Component purely so window.history.back() can be
// called from an onClick handler. Keeping this tiny means the root not-found
// page stays a Server Component (no 'use client' at the top level required).

export default function GoBackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 2rem',
        borderRadius: '0.75rem',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        background: 'transparent',
        border: '2px solid currentColor',
        color: 'inherit',
        fontFamily: 'inherit',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.transform = 'scale(1.05)'
        el.style.boxShadow = '0 8px 24px rgba(0,0,0,.15)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = ''
        el.style.boxShadow = ''
      }}
    >
      Go Back
    </button>
  )
}