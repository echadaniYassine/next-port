// Put this near the top of your Skills component file
import { useEffect, useState } from "react";

function AnimatedProgress({
  value,
  colorRGB,     // e.g. colorMappings[currentCategory.color].primary  -> "0 128 128"
  delay = 0,
  trigger,      // pass activeCategory here to reset on tab change
}: {
  value: number;
  colorRGB: string;
  delay?: number;
  trigger: unknown;
}) {
  const [fill, setFill] = useState(0);

  useEffect(() => {
    // Reset to 0, then bump to `value` on the next frame so CSS transition fires
    setFill(0);
    const id = requestAnimationFrame(() => setFill(value));
    return () => cancelAnimationFrame(id);
  }, [value, trigger]);

  return (
    <div
      className="w-full rounded-full h-3 overflow-hidden"
      style={{ backgroundColor: "hsl(var(--muted))" }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-3 rounded-full transition-[width] duration-1000 ease-out relative overflow-hidden"
        style={{
          width: `${fill}%`,
          transitionDelay: `${delay}ms`,
          backgroundColor: `rgb(${colorRGB})`,
        }}
      >
        {/* Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
      </div>
    </div>
  );
}
export default AnimatedProgress;