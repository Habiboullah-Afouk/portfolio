"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SITE } from "@/lib/content";

/* ── floating terminal windows for cinematic depth ── */
const HUD_LINES = [
  { l: "$ whoami", delay: 0 },
  { l: "habib — systems engineer", delay: 0.15 },
  { l: "$ uname -srn", delay: 0.3 },
  { l: "Arch Linux · zen kernel · Hyprland", delay: 0.45 },
  { l: "$ neofetch --stdout | head -5", delay: 0.6 },
  { l: "OS      · Arch Linux x86_64", delay: 0.75 },
  { l: "Host    · Framework 13", delay: 0.9 },
  { l: "WM      · Hyprland 0.45", delay: 1.05 },
  { l: "Shell   · zsh · starship", delay: 1.2 },
  { l: "Editor  · neovim", delay: 1.35 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        // Cinematic zoom: grid scales in
        tl.fromTo(
          gridRef.current,
          { scale: 1.12, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8 },
          0
        );

        // Terminal HUD lines type-in
        const hudLines = hudRef.current?.querySelectorAll("[data-hud-line]");
        if (hudLines) {
          tl.fromTo(
            hudLines,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" },
            0.4
          );
        }

        // Display heading split-text reveal
        const chars = h1Ref.current?.querySelectorAll("[data-char]");
        if (chars) {
          tl.fromTo(
            chars,
            { opacity: 0, y: 40, rotateX: -35 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.02,
              duration: 0.7,
              ease: "power3.out",
            },
            0.6
          );
        }

        // Subtitle fade
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.1
        );

        // Meta labels
        tl.fromTo(
          metaRef.current?.children || [],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 },
          1.3
        );
      }, sectionRef);
    },
    { scope: sectionRef }
  );

  const heading = "Systems Engineer";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex flex-col justify-end overflow-hidden pb-16 md:pb-24 vignette"
    >
      {/* Blueprint grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid-blueprint opacity-0"
        aria-hidden="true"
      />

      {/* Stronger ambient glow */}
      <div
        className="absolute top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(125,211,252,0.14) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[60vw] h-[60vw] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 45%)",
        }}
        aria-hidden="true"
      />

      {/* Floating geometric accent (isometric cube wireframe feel) */}
      <div
        className="absolute top-1/3 right-[15%] w-32 h-32 md:w-48 md:h-48 opacity-[0.08]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <rect x="10" y="10" width="80" height="80" stroke="#7dd3fc" strokeWidth="0.5" />
          <rect x="20" y="20" width="60" height="60" stroke="#7dd3fc" strokeWidth="0.5" />
          <rect x="30" y="30" width="40" height="40" stroke="#7dd3fc" strokeWidth="0.5" />
          <line x1="10" y1="10" x2="20" y2="20" stroke="#7dd3fc" strokeWidth="0.3" />
          <line x1="90" y1="10" x2="80" y2="20" stroke="#7dd3fc" strokeWidth="0.3" />
          <line x1="90" y1="90" x2="80" y2="80" stroke="#7dd3fc" strokeWidth="0.3" />
          <line x1="10" y1="90" x2="20" y2="80" stroke="#7dd3fc" strokeWidth="0.3" />
        </svg>
      </div>

      {/* Floating terminal HUD (right side, desktop) */}
      <div
        ref={hudRef}
        className="absolute top-24 right-4 md:right-8 lg:right-16 hidden md:block"
      >
        <div className="win rounded-md overflow-hidden w-[280px] lg:w-[320px]">
          <div className="win-header">
            <span className="dot-row">
              <span className="dot" style={{ background: "#ff6b6b" }} />
              <span className="dot" style={{ background: "#f7a13c" }} />
              <span className="dot" style={{ background: "#7ee787" }} />
            </span>
            <span className="ml-2">bash</span>
          </div>
          <div className="p-3 font-mono text-[10px] leading-[1.6]">
            {HUD_LINES.map((line, i) => (
              <div key={i} data-hud-line className="opacity-0">
                {line.l.startsWith("$") ? (
                  <span className="text-accent">{line.l}</span>
                ) : (
                  <span className="text-muted">{line.l}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="shell relative z-10">
        <div className="max-w-5xl">
          {/* Label */}
          <div
            ref={metaRef}
            className="flex items-center gap-4 mb-6 md:mb-8"
          >
            <span className="t-label">{SITE.callsign}</span>
            <span className="h-px flex-1 max-w-[120px] bg-border-strong" />
            <span className="t-label text-text-dim">Casablanca / Remote</span>
            <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-surface border border-border-strong">
              <span
                className="w-[6px] h-[6px] rounded-full inline-block"
                style={{ background: "#7ee787", boxShadow: "0 0 6px #7ee787" }}
              />
              <span className="font-mono text-[10px] text-term-green tracking-wide">
                AVAILABLE
              </span>
            </span>
          </div>

          {/* Display heading with per-character spans */}
          <h1 ref={h1Ref} className="t-display text-text mb-6 md:mb-8">
            {heading.split("").map((char, i) => (
              <span
                key={i}
                data-char
                className="inline-block"
                style={{ opacity: 0 }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            ref={subRef}
            className="t-lede max-w-xl"
            style={{ opacity: 0 }}
          >
            Infrastructure that holds craft. Terminals tuned like instruments.
            Systems designed for engineers who care about the seams.
          </p>
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between mt-12 md:mt-20 pt-6 border-t border-border-strong">
          <div className="flex items-center gap-6">
            <span className="t-label">
              Arch Linux · since 2018
            </span>
            <span className="t-label hidden md:inline">Hyprland 0.45</span>
            <span className="t-label hidden md:inline">neovim · helix</span>
          </div>
          <div className="font-mono text-[10px] text-faint tracking-wider hidden md:block">
            SCROLL →
          </div>
        </div>
      </div>
    </section>
  );
}
