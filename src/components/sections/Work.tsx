"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORK } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── status pill color helper ─────────────────────────────── */
function statusStyle(status: string) {
  switch (status) {
    case "in development":
      return { color: "#7dd3fc", glow: "rgba(125,211,252,0.45)" };
    case "shipping":
    case "deployed":
      return { color: "#7ee787", glow: "rgba(126,231,135,0.45)" };
    case "scoping":
      return { color: "#f7a13c", glow: "rgba(247,161,60,0.45)" };
    case "ongoing":
      return { color: "#c084fc", glow: "rgba(192,132,252,0.45)" };
    case "complete":
      return { color: "#38bdf8", glow: "rgba(56,189,248,0.45)" };
    default:
      return { color: "#b6bcbf", glow: "rgba(182,188,191,0.3)" };
  }
}

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.context(() => {
        const track = trackRef.current;
        if (!track) return;

        const cards = track.querySelectorAll("[data-project-card]");
        const totalScroll = track.scrollWidth - window.innerWidth;

        if (totalScroll > 0 && window.innerWidth >= 768) {
          /* Horizontal scroll on desktop */
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${totalScroll}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          scrollTl.to(track, { x: -totalScroll, ease: "none" });

          /* Card reveals during horizontal scroll */
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 40, scale: 0.97 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: scrollTl,
                  start: "left 90%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        } else {
          /* Fallback — vertical grid on mobile / narrow */
          cards.forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
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
      id="work"
      ref={sectionRef}
      className="relative min-h-dvh border-b border-border overflow-hidden"
    >
      {/* Header */}
      <div className="shell py-[var(--shell-pad-y)] pb-6 md:pb-8">
        <div className="flex items-center gap-4 mb-8">
          <span className="t-label">{WORK.fig}</span>
          <span className="h-px flex-1 bg-border-strong" />
          <span className="t-caption text-faint tabular hidden md:inline">
            01 — 04 / 04
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="t-heading max-w-3xl mb-4">{WORK.heading}</h2>
            <p className="t-lede max-w-xl">{WORK.lede}</p>
          </div>
          <div className="t-label hidden md:block opacity-50">
            ← DRAG / SCROLL →
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 md:gap-6 px-[var(--shell-pad-x)] pb-[var(--shell-pad-y)] will-change-transform"
      >
        {WORK.projects.map((project, i) => {
          const status = statusStyle(project.status);
          return (
            <a
              key={i}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              data-project-card
              className="relative flex-shrink-0 w-[85vw] md:w-[48vw] lg:w-[38vw] frame-elevated rounded-lg p-6 md:p-8 flex flex-col justify-between group overflow-hidden"
              style={{ minHeight: "500px" }}
            >
              {/* Top */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[28px] font-medium text-faint tabular leading-none">
                    {project.n}
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Live status pill */}
                    <span
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-sm border bg-surface"
                      style={{
                        borderColor: `${status.color}25`,
                      }}
                    >
                      <span className="relative flex h-1.5 w-1.5">
                        <span
                          className="absolute inline-flex h-full w-full rounded-full opacity-50 animate-ping"
                          style={{ background: status.color }}
                        />
                        <span
                          className="relative inline-flex rounded-full h-1.5 w-1.5"
                          style={{
                            background: status.color,
                            boxShadow: `0 0 6px ${status.glow}`,
                          }}
                        />
                      </span>
                      <span
                        className="font-mono text-[9px] tracking-[0.14em] uppercase"
                        style={{ color: status.color }}
                      >
                        {project.status}
                      </span>
                    </span>
                    <span className="t-label px-2 py-1 rounded-sm bg-surface border border-border-strong">
                      {project.tag}
                    </span>
                  </div>
                </div>

                <h3 className="text-[22px] md:text-[26px] leading-[1.15] tracking-[-0.02em] font-medium text-text mb-4 group-hover:text-accent transition-colors duration-500">
                  {project.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] tracking-wider uppercase text-muted border border-border-strong px-2 py-0.5 rounded-sm group-hover:border-accent/30 transition-colors duration-500"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom */}
              <div className="relative z-10 border-t border-border-strong pt-4 mt-auto">
                <p className="text-[13px] leading-[1.6] text-text-dim mb-4">
                  {project.summary}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-muted truncate">{project.client}</span>
                  <span className="text-faint tabular shrink-0 ml-3">{project.year}</span>
                </div>
              </div>

              {/* Accent glow on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="glow-accent absolute inset-0 rounded-lg" />
              </div>

              {/* Hairline top accent — colored by status */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${status.color}, transparent)`,
                }}
                aria-hidden="true"
              />
            </a>
          );
        })}
      </div>
    </section>
  );
}
