"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineMobileRef = useRef<HTMLDivElement>(null);
  const lineDesktopRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.context(() => {
        /* Vertical line draws as user scrolls through timeline */
        const lines = [lineMobileRef.current, lineDesktopRef.current].filter(
          Boolean
        );
        if (lines.length && timelineRef.current) {
          gsap.fromTo(
            lines,
            { scaleY: 0 },
            {
              scaleY: 1,
              transformOrigin: "top center",
              ease: "none",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 60%",
                end: "bottom 70%",
                scrub: 0.6,
              },
            }
          );
        }

        /* Milestone reveals — alternating slide direction */
        const milestones = timelineRef.current?.querySelectorAll("[data-milestone]");
        if (milestones) {
          milestones.forEach((node, i) => {
            const fromLeft = i % 2 === 0;
            gsap.fromTo(
              node,
              {
                opacity: 0,
                x: fromLeft ? -30 : 30,
                y: 12,
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: node,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
        }

        /* Year nodes pulse subtly */
        const dots = timelineRef.current?.querySelectorAll("[data-timeline-dot]");
        if (dots) {
          dots.forEach((dot) => {
            gsap.fromTo(
              dot,
              { scale: 0 },
              {
                scale: 1,
                duration: 0.5,
                ease: "back.out(2)",
                scrollTrigger: {
                  trigger: dot,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
        }
      }, sectionRef);
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative border-b border-border overflow-hidden"
    >
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 grid-dot opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient glow — center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[80vh] rounded-full blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(125,211,252,0.05) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="shell relative z-10 py-[var(--shell-pad-y)] pb-8 md:pb-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="t-label">{PROCESS.fig}</span>
          <span className="h-px flex-1 bg-border-strong" />
        </div>
        <h2 className="t-heading max-w-4xl mb-4">{PROCESS.heading}</h2>
        <p className="t-lede max-w-2xl">{PROCESS.lede}</p>
      </div>

      {/* Vertical timeline */}
      <div
        ref={timelineRef}
        className="relative shell pb-[var(--shell-pad-y)] z-10"
      >
        {/* Vertical spine */}
        <div className="relative md:max-w-5xl mx-auto pl-10 md:pl-0">
          {/* The line track — static base (mobile) */}
          <div
            className="absolute top-0 bottom-0 w-px bg-border-strong opacity-50 md:hidden"
            style={{ left: "12px" }}
            aria-hidden="true"
          />
          {/* The line track — static base (desktop, centered) */}
          <div
            className="absolute top-0 bottom-0 w-px bg-border-strong opacity-50 hidden md:block"
            style={{ left: "calc(50% - 0.5px)" }}
            aria-hidden="true"
          />

          {/* Animated line — mobile */}
          <div
            ref={lineMobileRef}
            className="absolute top-0 bottom-0 w-px md:hidden"
            style={{
              left: "12px",
              background:
                "linear-gradient(180deg, transparent 0%, #7dd3fc 8%, #7dd3fc 92%, transparent 100%)",
              boxShadow: "0 0 8px rgba(125,211,252,0.3)",
              transform: "scaleY(0)",
              transformOrigin: "top",
            }}
            aria-hidden="true"
          />
          {/* Animated line — desktop, centered */}
          <div
            ref={lineDesktopRef}
            className="absolute top-0 bottom-0 w-px hidden md:block"
            style={{
              left: "calc(50% - 0.5px)",
              background:
                "linear-gradient(180deg, transparent 0%, #7dd3fc 8%, #7dd3fc 92%, transparent 100%)",
              boxShadow: "0 0 8px rgba(125,211,252,0.3)",
              transform: "scaleY(0)",
              transformOrigin: "top",
            }}
            aria-hidden="true"
          />

          {/* Milestones */}
          <ol className="space-y-12 md:space-y-20 list-none">
            {PROCESS.stages.map((stage, i) => {
              const isRight = i % 2 === 0; // even = card on right column (desktop)
              return (
                <li
                  key={i}
                  className="relative grid md:grid-cols-2 md:gap-12 items-start"
                  data-milestone
                  style={{ opacity: 0 }}
                >
                  {/* Timeline dot — mobile */}
                  <span
                    data-timeline-dot
                    className="absolute w-3 h-3 rounded-full border border-accent bg-bg z-10 md:hidden"
                    style={{
                      left: "calc(12px - 5px)",
                      top: "10px",
                      boxShadow:
                        "0 0 0 4px rgba(10,11,11,1), 0 0 16px rgba(125,211,252,0.4)",
                    }}
                  >
                    <span className="block absolute inset-0 rounded-full bg-accent opacity-50 animate-ping" />
                  </span>
                  {/* Timeline dot — desktop, centered */}
                  <span
                    data-timeline-dot
                    className="absolute w-3 h-3 rounded-full border border-accent bg-bg z-10 hidden md:block"
                    style={{
                      left: "calc(50% - 6px)",
                      top: "10px",
                      boxShadow:
                        "0 0 0 4px rgba(10,11,11,1), 0 0 16px rgba(125,211,252,0.4)",
                    }}
                  >
                    <span className="block absolute inset-0 rounded-full bg-accent opacity-50 animate-ping" />
                  </span>

                  {/* Layout — alternating sides on desktop */}
                  {isRight ? (
                    <>
                      <div className="hidden md:flex justify-end items-start pr-2 pt-1">
                        <YearMarker stage={stage} align="right" />
                      </div>
                      <div className="md:pl-2">
                        <Card stage={stage} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:pr-2">
                        <Card stage={stage} />
                      </div>
                      <div className="hidden md:flex justify-start items-start pl-2 pt-1">
                        <YearMarker stage={stage} align="left" />
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Timeline footer */}
        <div className="mt-16 md:mt-24 max-w-5xl mx-auto pl-10 md:pl-0 pt-6 border-t border-border-strong flex items-center justify-between">
          <span className="t-caption text-faint">timeline · 2023 — 2025+</span>
          <span className="t-caption text-accent">→ open for what&apos;s next</span>
        </div>
      </div>
    </section>
  );
}

/* ── Year marker (side column) ──────────────────────────── */
function YearMarker({
  stage,
  align,
}: {
  stage: { readonly n: string; readonly out: string };
  align: "left" | "right";
}) {
  const yr = stage.out.split(" · ")[0];
  const tags = stage.out.split(" · ").slice(1).join(" · ");
  return (
    <div
      className={`max-w-[280px] ${align === "right" ? "text-right" : "text-left"}`}
    >
      <div
        className={`flex items-center gap-3 mb-2 ${
          align === "right" ? "justify-end" : ""
        }`}
      >
        {align === "right" ? (
          <>
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent">
              {yr}
            </span>
            <span className="font-mono text-[22px] text-faint tabular leading-none">
              {stage.n}
            </span>
          </>
        ) : (
          <>
            <span className="font-mono text-[22px] text-faint tabular leading-none">
              {stage.n}
            </span>
            <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent">
              {yr}
            </span>
          </>
        )}
      </div>
      <div className="t-caption text-faint">{tags}</div>
    </div>
  );
}

/* ── Milestone card ─────────────────────────────────────── */
function Card({
  stage,
}: {
  stage: {
    readonly n: string;
    readonly title: string;
    readonly summary: string;
    readonly out: string;
  };
}) {
  return (
    <div className="frame-elevated rounded-lg p-5 md:p-6 group hover:border-accent/30 transition-all duration-500 relative overflow-hidden">
      {/* Mobile-only year marker */}
      <div className="md:hidden flex items-center gap-2 mb-3">
        <span className="font-mono text-[18px] text-faint tabular leading-none">
          {stage.n}
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-accent">
          {stage.out.split(" · ")[0]}
        </span>
      </div>

      <h3 className="text-[16px] md:text-[17px] font-medium text-text tracking-[-0.01em] mb-2 group-hover:text-accent transition-colors duration-300">
        {stage.title}
      </h3>
      <p className="text-[13px] md:text-[14px] leading-[1.6] text-text-dim">
        {stage.summary}
      </p>

      {/* Hover edge */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, transparent, #7dd3fc, transparent)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
