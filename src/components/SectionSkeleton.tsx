// src/components/SectionSkeleton.tsx
export default function SectionSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading section"
      className="w-full py-20 px-4"
    >
      <div className="max-w-4xl mx-auto space-y-4 animate-pulse">
        {/* Simulated section heading */}
        <div aria-hidden="true" className="h-8 w-48 rounded-md bg-muted" />

        {/* Simulated paragraph lines */}
        <div aria-hidden="true" className="h-4 w-full rounded bg-muted" />
        <div aria-hidden="true" className="h-4 w-5/6 rounded bg-muted" />
        <div aria-hidden="true" className="h-4 w-4/6 rounded bg-muted" />

        {/* Simulated card row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              aria-hidden="true"
              className="h-32 rounded-lg bg-muted"
            />
          ))}
        </div>
      </div>
    </section>
  )
}