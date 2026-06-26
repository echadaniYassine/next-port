// components/Logo.tsx
export default function Logo() {
  return (
    <svg 
      viewBox="0 0 42 36" 
      width="42" 
      height="36" 
      role="img" 
      aria-label="Y Logo"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      <title>Y Monogram</title>

      {/* Stylized Signature Path "Y" */}
      <path 
        d="M12 8 C14 14, 15 16, 19 22 C22 15, 25 10, 28 6 M19 22 C18 26, 16 30, 13 32" 
        stroke="url(#sig-grad)" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />

      {/* Subtle Gradient for the Signature Touch */}
      <defs>
        <linearGradient id="sig-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  )
}