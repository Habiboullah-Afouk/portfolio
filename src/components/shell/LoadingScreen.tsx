"use client";

import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf: number;
    let current = 0;
    const target = 100;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      current = Math.round(eased * target);
      setProgress(current);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? "none" : "auto" }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Top label */}
        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-faint">
          habiboullah@portfolio · booting
        </div>

        {/* Percentage */}
        <div
          className="font-mono text-[48px] md:text-[72px] font-medium tabular leading-none tracking-[-0.04em]"
          style={{
            background: "linear-gradient(135deg, #7dd3fc 0%, #a78bfa 50%, #f472b6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {progress}%
        </div>

        {/* Status text */}
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted h-4">
          {progress < 25 && "Mounting environment"}
          {progress >= 25 && progress < 55 && "Loading stack · React · Laravel"}
          {progress >= 55 && progress < 85 && "Composing interface"}
          {progress >= 85 && "Ready · welcome"}
        </div>

        {/* Gradient progress bar */}
        <div className="w-[220px] h-[2px] bg-surface-2 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #7dd3fc, #a78bfa, #f472b6)",
              boxShadow: "0 0 16px rgba(125,211,252,0.4), 0 0 32px rgba(167,139,250,0.2)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
