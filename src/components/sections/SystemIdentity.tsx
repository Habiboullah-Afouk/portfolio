"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SYSTEM_ID } from "@/lib/content";
import { Avatar } from "@/components/ui/Avatar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── color helper ────────────────────────────────────────── */

function colorClass(c: string) {
  switch (c) {
    case "accent":
      return "text-accent";
    case "term-green":
      return "text-term-green";
    case "term-amber":
      return "text-term-amber";
    case "text":
      return "text-text";
    default:
      return "text-text-dim";
  }
}

/* ── component ───────────────────────────────────────────── */

export function SystemIdentity() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const nameLine1Ref = useRef<HTMLSpanElement>(null);
  const nameLine2Ref = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const ledeRef = useRef<HTMLParagraphElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bootRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const { firstName, lastName, role: roleText, lede, bootLog, specs, tags } = SYSTEM_ID;

  useGSAP(
    () => {
      gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        /* 1. Blueprint grid scales in softly */
        tl.fromTo(
          gridRef.current,
          { scale: 1.06, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8 },
          0
        );

        /* 2. Decorative wireframe drifts in */
        tl.fromTo(
          decorRef.current,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 1.2 },
          0.2
        );

        /* 3. Name — per-character 3D reveal (line 1) */
        const chars1 = nameLine1Ref.current?.querySelectorAll("[data-char]");
        if (chars1) {
          tl.fromTo(
            chars1,
            { opacity: 0, y: 50, rotateX: -55 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.022,
              duration: 0.75,
            },
            0.35
          );
        }

        /* 4. Name — per-character 3D reveal (line 2) */
        const chars2 = nameLine2Ref.current?.querySelectorAll("[data-char]");
        if (chars2) {
          tl.fromTo(
            chars2,
            { opacity: 0, y: 50, rotateX: -55 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              stagger: 0.03,
              duration: 0.7,
            },
            0.65
          );
        }

        /* 5. Role typewriter with caret */
        tl.fromTo(
          roleRef.current,
          { opacity: 1 },
          { opacity: 1, duration: 0.05 },
          1.15
        );
        const typeProxy = { progress: 0 };
        tl.to(typeProxy, {
          progress: roleText.length,
          duration: roleText.length * 0.038,
          ease: "none",
          onUpdate: () => {
            const cur = Math.round(typeProxy.progress);
            if (roleRef.current) {
              roleRef.current.textContent = roleText.slice(0, cur);
            }
          },
        }, 1.2);

        /* 6. Caret blink starts after typing, then loops via CSS */
        tl.fromTo(
          caretRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.1 },
          1.25
        );

        /* 7. Lede fades up */
        tl.fromTo(
          ledeRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          1.9
        );

        /* 8. Terminal window — perspective slide-in */
        tl.fromTo(
          terminalRef.current,
          { opacity: 0, x: 50, rotateY: -10 },
          { opacity: 1, x: 0, rotateY: 0, duration: 1 },
          0.85
        );

        /* 9. Boot log lines type in */
        const bootLines = bootRef.current?.querySelectorAll("[data-boot-line]");
        if (bootLines) {
          tl.fromTo(
            bootLines,
            { opacity: 0, x: -8 },
            { opacity: 1, x: 0, stagger: 0.09, duration: 0.35, ease: "power2.out" },
            1.1
          );
        }

        /* 10. Spec rows reveal */
        const specRows = specsRef.current?.querySelectorAll("[data-spec-row]");
        if (specRows) {
          tl.fromTo(
            specRows,
            { opacity: 0, x: -6 },
            { opacity: 1, x: 0, stagger: 0.06, duration: 0.4, ease: "power2.out" },
            1.5
          );
        }

        /* 11. Bottom status bar */
        tl.fromTo(
          statusRef.current?.children || [],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.5 },
          2.1
        );

        /* 12. Subtle ambient glow breathing — runs continuously */
        if (glowRef.current) {
          gsap.to(glowRef.current, {
            opacity: 0.85,
            scale: 1.05,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      }, sectionRef);
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="system"
      ref={sectionRef}
      className="relative min-h-[92dvh] flex flex-col justify-center overflow-hidden py-20 md:py-28 border-b border-border"
    >
      {/* Blueprint grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid-blueprint opacity-0"
        aria-hidden="true"
      />

      {/* Cyan volumetric glow — left-center (animated breathing) */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[65vw] h-[65vw] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(125,211,252,0.10) 0%, transparent 55%)",
        }}
        aria-hidden="true"
      />

      {/* Secondary cool glow — bottom right */}
      <div
        className="absolute bottom-0 right-0 w-[45vw] h-[45vw] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative wireframe cube — left side */}
      <div
        ref={decorRef}
        className="absolute top-[20%] left-[4%] w-24 h-24 md:w-36 md:h-36 opacity-0 hidden lg:block"
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          <rect x="10" y="10" width="80" height="80" stroke="#7dd3fc" strokeWidth="0.4" opacity="0.25" />
          <rect x="22" y="22" width="56" height="56" stroke="#7dd3fc" strokeWidth="0.4" opacity="0.35" />
          <rect x="34" y="34" width="32" height="32" stroke="#7dd3fc" strokeWidth="0.4" opacity="0.5" />
          <line x1="10" y1="10" x2="22" y2="22" stroke="#7dd3fc" strokeWidth="0.25" opacity="0.3" />
          <line x1="90" y1="10" x2="78" y2="22" stroke="#7dd3fc" strokeWidth="0.25" opacity="0.3" />
          <line x1="90" y1="90" x2="78" y2="78" stroke="#7dd3fc" strokeWidth="0.25" opacity="0.3" />
          <line x1="10" y1="90" x2="22" y2="78" stroke="#7dd3fc" strokeWidth="0.25" opacity="0.3" />
        </svg>
      </div>

      {/* Thin accent line — vertical */}
      <div
        className="absolute top-0 left-[var(--shell-pad-x)] w-px h-24 bg-gradient-to-b from-transparent via-accent to-transparent opacity-20"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="shell relative z-10">
        {/* Chapter label */}
        <div className="flex items-center gap-4 mb-10 md:mb-14">
          <span className="t-label">{SYSTEM_ID.fig}</span>
          <span className="h-px flex-1 max-w-[100px] bg-border-strong" />
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column — editorial identity */}
          <div className="lg:col-span-7 space-y-8 md:space-y-10">
            <div className="flex items-center gap-5">
              <Avatar src="/IMG-20260615-WA0034.jpg" alt="Habiboullah Afouk" className="h-16 w-16 md:h-20 md:w-20" />
              <div style={{ perspective: "900px" }}>
                <h2 className="text-text" style={{ lineHeight: 0.92 }}>
                  <span
                    ref={nameLine1Ref}
                    className="block"
                    style={{
                      fontSize: "clamp(2.8rem, 6.2vw, 6rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.045em",
                      textShadow: "0 0 70px rgba(125,211,252,0.07)",
                    }}
                  >
                    {firstName.split("").map((ch, i) => (
                      <span
                        key={i}
                        data-char
                        className="inline-block"
                        style={{ opacity: 0, transformStyle: "preserve-3d" }}
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                  <span
                    ref={nameLine2Ref}
                    className="block mt-1"
                    style={{
                      fontSize: "clamp(2.8rem, 6.2vw, 6rem)",
                      fontWeight: 500,
                      letterSpacing: "-0.045em",
                      textShadow: "0 0 70px rgba(125,211,252,0.07)",
                    }}
                  >
                    {lastName.split("").map((ch, i) => (
                      <span
                        key={i}
                        data-char
                        className="inline-block"
                        style={{ opacity: 0, transformStyle: "preserve-3d" }}
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                </h2>
              </div>
            </div>

            {/* Role — typewriter + blinking caret */}
            <div className="flex items-center gap-2 min-h-[1.5em]">
              <span className="text-faint font-mono text-[11px]">$ </span>
              <span
                ref={roleRef}
                className="font-mono text-[13px] md:text-[15px] text-accent tracking-wide"
              />
              <span ref={caretRef} className="caret opacity-0" />
            </div>

            {/* Lede */}
            <p
              ref={ledeRef}
              className="t-lede max-w-lg"
              style={{ opacity: 0 }}
            >
              {lede}
            </p>
          </div>

          {/* Right column — system spec terminal (5 cols) */}
          <div
            ref={terminalRef}
            className="lg:col-span-5 opacity-0"
            style={{ perspective: "1000px" }}
          >
            <div className="win rounded-lg overflow-hidden">
              {/* Terminal chrome */}
              <div className="win-header">
                <span className="dot-row">
                  <span className="dot" style={{ background: "#ff6b6b" }} />
                  <span className="dot" style={{ background: "#f7a13c" }} />
                  <span className="dot" style={{ background: "#7ee787" }} />
                </span>
                <span className="ml-2 truncate">identity.fetch</span>
              </div>

              <div className="p-4 md:p-5">
                {/* Boot log */}
                <div
                  ref={bootRef}
                  className="mb-4 pb-4 border-b border-dashed border-border-strong space-y-1"
                >
                  {bootLog.map((entry, i) => (
                    <div
                      key={i}
                      data-boot-line
                      className="font-mono text-[10px] md:text-[11px] leading-[1.5] opacity-0"
                    >
                      <span className="text-term-green">
                        [{entry.status.toUpperCase()}]
                      </span>{" "}
                      <span className="text-faint">{entry.text}</span>
                    </div>
                  ))}
                </div>

                {/* Spec rows */}
                <div ref={specsRef} className="space-y-2.5">
                  {specs.map((spec, i) => (
                    <div
                      key={i}
                      data-spec-row
                      className="group flex items-baseline gap-3 font-mono text-[11px] md:text-[12px] opacity-0 cursor-default"
                    >
                      <span className="text-faint w-[4.5rem] shrink-0 uppercase tracking-wider">
                        {spec.label}
                      </span>
                      <span
                        className={`transition-colors duration-200 group-hover:text-accent ${colorClass(
                          spec.color
                        )}`}
                      >
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Terminal footer status */}
                <div className="mt-5 pt-3 border-t border-border-strong flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-term-green opacity-40" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-term-green" />
                    </span>
                    <span className="text-term-green text-[10px] font-mono tracking-wide">
                      online
                    </span>
                  </span>
                  <span className="text-faint text-[10px] font-mono">
                    uptime 2y+ · laayoune
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        <div
          ref={statusRef}
          className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-16 md:mt-24 pt-6 border-t border-border-strong"
        >
          {tags.map((tag, i) => (
            <span
              key={i}
              className="t-label text-text-dim hover:text-accent transition-colors duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
          <span className="h-px flex-1 bg-border-strong hidden md:block min-w-[40px]" />
          <span className="t-caption text-faint tabular">v2.0.0 · latest</span>
        </div>
      </div>
    </section>
  );
}
