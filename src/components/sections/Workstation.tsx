"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORKSTATION } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function TerminalWindow({
  title,
  lines,
  className,
}: {
  title: string;
  lines: ReadonlyArray<{ readonly c: string; readonly t: string }>;
  className?: string;
}) {
  return (
    <div className={`win rounded-md overflow-hidden ${className}`}>
      <div className="win-header">
        <span className="dot-row">
          <span className="dot" style={{ background: "#ff6b6b" }} />
          <span className="dot" style={{ background: "#f7a13c" }} />
          <span className="dot" style={{ background: "#7ee787" }} />
        </span>
        <span className="ml-2 truncate">{title}</span>
      </div>
      <div className="p-3 font-mono text-[10px] leading-[1.65]">
        {lines.map((line, i) => (
          <div key={i}>
            {line.c === "accent" ? (
              <span className="text-accent">{line.t}</span>
            ) : line.c === "term-green" ? (
              <span className="text-term-green">{line.t}</span>
            ) : line.c === "term-amber" ? (
              <span className="text-term-amber">{line.t}</span>
            ) : (
              <span className="text-muted">{line.t}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MonitorWindow({
  title,
  stats,
  className,
}: {
  title: string;
  stats: ReadonlyArray<{ readonly label: string; readonly value: number | string; readonly unit: string; readonly c: string }>;
  className?: string;
}) {
  return (
    <div className={`win rounded-md overflow-hidden ${className}`}>
      <div className="win-header">
        <span className="dot-row">
          <span className="dot" style={{ background: "#c084fc" }} />
        </span>
        <span className="ml-2 truncate">{title}</span>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-faint">
              {s.label}
            </span>
            <span
              className={`font-mono text-[14px] tabular ${
                s.c === "accent"
                  ? "text-accent"
                  : s.c === "term-green"
                  ? "text-term-green"
                  : s.c === "term-amber"
                  ? "text-term-amber"
                  : "text-muted"
              }`}
            >
              {s.value}
              <span className="text-[9px] text-faint ml-0.5">{s.unit}</span>
            </span>
            <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${typeof s.value === "number" ? Math.min(s.value, 100) : 50}%`,
                  background:
                    s.c === "accent"
                      ? "#7dd3fc"
                      : s.c === "term-green"
                      ? "#7ee787"
                      : s.c === "term-amber"
                      ? "#f7a13c"
                      : "#5a6068",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Workstation() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const cards = cardsRef.current?.querySelectorAll("[data-win-card]");
        if (!cards) return;

        // Sticky stack: cards reveal and scale down as they stack
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 60,
              scale: 0.96,
              rotateX: 4,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 40%",
                scrub: 1,
              },
            }
          );
        });
      }, sectionRef);
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="workstation"
      ref={sectionRef}
      className="relative border-b border-border"
    >
      {/* Section header */}
      <div className="shell py-[var(--shell-pad-y)] pb-8">
        <div className="flex items-center gap-4 mb-8">
          <span className="t-label">{WORKSTATION.fig}</span>
          <span className="h-px flex-1 bg-border-strong" />
        </div>
        <h2 className="t-heading max-w-4xl mb-6">{WORKSTATION.heading}</h2>
        <p className="t-lede max-w-xl">{WORKSTATION.lede}</p>
      </div>

      {/* Sticky card stack */}
      <div ref={stickyRef} className="relative">
        <div
          ref={cardsRef}
          className="shell pb-[var(--shell-pad-y)] grid md:grid-cols-2 gap-4 md:gap-6"
        >
          {/* Neofetch card */}
          <div data-win-card className="md:col-span-1">
            <TerminalWindow
              title={WORKSTATION.windows[0].title}
              lines={WORKSTATION.windows[0].lines}
            />
          </div>

          {/* Hyprland config card */}
          <div data-win-card className="md:col-span-1">
            <TerminalWindow
              title={WORKSTATION.windows[1].title}
              lines={WORKSTATION.windows[1].lines}
            />
          </div>

          {/* System monitor card */}
          <div data-win-card className="md:col-span-1">
            <MonitorWindow
              title={WORKSTATION.windows[2].title}
              stats={WORKSTATION.windows[2].stats}
            />
          </div>

          {/* Tmux deploy card */}
          <div data-win-card className="md:col-span-1">
            <TerminalWindow
              title={WORKSTATION.windows[3].title}
              lines={WORKSTATION.windows[3].lines}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
