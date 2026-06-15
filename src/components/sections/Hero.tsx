"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SITE } from "@/lib/content";
import { DraggableAvatar } from "@/components/ui/DraggableAvatar";

/* ── floating terminal HUD — fastfetch echo ── */
const HUD_LINES = [
  { l: "$ whoami" },
  { l: "habiboullah — full-stack dev" },
  { l: "$ uname -srn" },
  { l: "Linux · Fedora / Ubuntu" },
  { l: "$ fastfetch --logo small" },
  { l: "OS       · Linux x86_64" },
  { l: "Editor   · VS Code · neovim" },
  { l: "Runtime  · Node.js · PHP" },
  { l: "Stack    · React · Laravel" },
  { l: "Location · Laayoune, MA" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const glow3Ref = useRef<HTMLDivElement>(null);
  const wireRef = useRef<HTMLDivElement>(null);
  const avatarWrapRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        /* Cinematic zoom: grid scales in */
        tl.fromTo(
          gridRef.current,
          { scale: 1.12, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8 },
          0
        );

        /* Terminal HUD lines type-in */
        const hudLines = hudRef.current?.querySelectorAll("[data-hud-line]");
        if (hudLines) {
          tl.fromTo(
            hudLines,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" },
            0.4
          );
        }

        /* Display heading — title reveal */
        const titleLines = h1Ref.current?.querySelectorAll("[data-title-line]");
        if (titleLines) {
          tl.fromTo(
            titleLines,
            { opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" },
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0 0 0)",
              stagger: 0.12,
              duration: 0.9,
              ease: "power3.out",
            },
            0.5
          );
        }

        /* Role subtitle */
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          1.0
        );

        /* Avatar entrance */
        tl.fromTo(
          avatarWrapRef.current,
          { opacity: 0, scale: 0.7, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.4)",
          },
          1.1
        );

        /* Subtitle fade */
        tl.fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.4
        );

        /* Meta labels */
        tl.fromTo(
          metaRef.current?.children || [],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.6 },
          1.5
        );

        /* Wireframe drift */
        if (wireRef.current) {
          gsap.to(wireRef.current, {
            rotate: 360,
            duration: 120,
            ease: "none",
            repeat: -1,
          });
        }

        /* Ambient glow breathing — layered, opposite phase for depth */
        if (glow1Ref.current) {
          gsap.to(glow1Ref.current, {
            opacity: 0.7,
            scale: 1.08,
            duration: 6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
        if (glow2Ref.current) {
          gsap.to(glow2Ref.current, {
            opacity: 0.8,
            scale: 1.1,
            duration: 5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.5,
          });
        }
        if (glow3Ref.current) {
          gsap.to(glow3Ref.current, {
            opacity: 0.6,
            scale: 1.12,
            duration: 7,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 3,
          });
        }
      }, sectionRef);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex flex-col pt-24 overflow-hidden"
    >
      {/* Blueprint grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid-blueprint opacity-0"
        aria-hidden="true"
      />

      {/* Multi-color ambient glow — layered for depth */}
      <div
        ref={glow1Ref}
        className="absolute top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(125,211,252,0.12) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />
      <div
        ref={glow2Ref}
        className="absolute bottom-0 right-0 w-[60vw] h-[60vw] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 45%)",
        }}
        aria-hidden="true"
      />
      <div
        ref={glow3Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(244,114,182,0.04) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Floating geometric accent — slow rotation */}
      <div
        ref={wireRef}
        className="absolute top-1/4 right-[12%] w-32 h-32 md:w-48 md:h-48 opacity-[0.06]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <rect x="10" y="10" width="80" height="80" stroke="#7dd3fc" strokeWidth="0.5" />
          <rect x="20" y="20" width="60" height="60" stroke="#a78bfa" strokeWidth="0.5" />
          <rect x="30" y="30" width="40" height="40" stroke="#f472b6" strokeWidth="0.5" />
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
        <div className="win rounded-lg overflow-hidden w-[280px] lg:w-[320px]">
          <div className="win-header">
            <span className="dot-row">
              <span className="dot" style={{ background: "#ff6b6b" }} />
              <span className="dot" style={{ background: "#f7a13c" }} />
              <span className="dot" style={{ background: "#7ee787" }} />
            </span>
            <span className="ml-2">bash · system.init</span>
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

      {/* ── Main content ── */}
      <div className="shell relative z-10">
        {/* Title — Large display heading */}
        <h1
          ref={h1Ref}
          className="t-display text-text mb-3 md:mb-4 text-left"
          style={{ overflow: "hidden" }}
        >
          <span data-title-line className="block" style={{ opacity: 0 }}>
            <span className="text-text">HI, I&apos;M</span>
          </span>
          <span data-title-line className="block" style={{ opacity: 0 }}>
            <span className="gradient-text">HABIB</span>
          </span>
        </h1>

        {/* Role subtitle */}
        <p
          ref={subtitleRef}
          className="font-mono text-[11px] md:text-[13px] tracking-[0.25em] uppercase text-muted mb-10 md:mb-14 text-left"
          style={{ opacity: 0 }}
        >
          Full-Stack Software Developer
        </p>

        {/* ── Draggable Avatar ── */}
        <div ref={avatarWrapRef} className="flex justify-center mb-10 md:mb-14 w-full" style={{ opacity: 0 }}>
          <DraggableAvatar />
        </div>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="t-lede max-w-xl text-center mx-auto"
          style={{ opacity: 0 }}
        >
          Modern web, desktop, and mobile applications — built with care for
          performance, design, and the problems they solve.
        </p>
      </div>

      {/* Bottom status bar */}
      <div className="shell relative z-10 mt-auto pb-8 md:pb-12">
        <div
          ref={metaRef}
          className="flex items-center justify-between pt-6 border-t border-border-strong"
        >
          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            <span className="t-label">{SITE.callsign}</span>
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-card">
              <span
                className="w-[6px] h-[6px] rounded-full inline-block"
                style={{ background: "#7ee787", boxShadow: "0 0 8px #7ee787" }}
              />
              <span className="font-mono text-[10px] text-term-green tracking-wide">
                AVAILABLE
              </span>
            </span>
            <span className="t-label hidden md:inline text-text-dim">{SITE.location}</span>
          </div>
          <div className="font-mono text-[10px] text-faint tracking-wider hidden md:flex items-center gap-2">
            <span>SCROLL</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="animate-bounce">
              <path d="M6 2v8M3 7l3 3 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-[3]"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg))",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
