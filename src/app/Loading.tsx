"use client"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div 
        className="w-12 h-12 rounded-full animate-spin"
        style={{
          border: "4px solid hsl(var(--muted))",
          borderTopColor: "hsl(var(--primary))",
        }}
      />
    </div>
  );
}