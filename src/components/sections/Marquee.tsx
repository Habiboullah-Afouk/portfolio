"use client";

import { MARQUEE } from "@/lib/content";

export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE];
  return (
    <div className="relative border-y border-border-strong overflow-hidden py-3">
      <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted flex items-center gap-8"
          >
            {item}
            <span className="w-[4px] h-[4px] rounded-full bg-faint inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
