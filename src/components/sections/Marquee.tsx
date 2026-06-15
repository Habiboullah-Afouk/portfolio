"use client";

import { MARQUEE } from "@/lib/content";

export function Marquee() {
  const items = [...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE];
  return (
    <div className="relative overflow-hidden py-4" style={{ borderTop: '1px solid var(--border-strong)', borderBottom: '1px solid var(--border-strong)' }}>
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
      />

      <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted flex items-center gap-8"
          >
            {item}
            <span
              className="w-[5px] h-[5px] rounded-full inline-block shrink-0"
              style={{
                background: i % 3 === 0
                  ? '#7dd3fc'
                  : i % 3 === 1
                    ? '#a78bfa'
                    : '#f472b6',
                boxShadow: i % 3 === 0
                  ? '0 0 6px rgba(125,211,252,0.5)'
                  : i % 3 === 1
                    ? '0 0 6px rgba(167,139,250,0.5)'
                    : '0 0 6px rgba(244,114,182,0.5)',
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
