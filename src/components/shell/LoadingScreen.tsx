"use client";

import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
        {/* Percentage */}
        <div className="font-mono text-[48px] md:text-[72px] font-medium text-accent tabular leading-none tracking-[-0.04em]">
          {progress}%
        </div>

        {/* Status text */}
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
          {progress < 30 && "Initializing kernel"}
          {progress >= 30 && progress < 60 && "Loading modules"}
          {progress >= 60 && progress < 90 && "Composing interface"}
          {progress >= 90 && "Ready to explore"}
        </div>

        {/* Thin progress bar */}
        <div className="w-[200px] h-[2px] bg-surface-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
