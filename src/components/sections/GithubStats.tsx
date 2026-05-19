"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/lib/content";
import { fetchGitHubStats, type DynamicGitHubStats } from "@/lib/github";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── intensity → opacity helper for the contribution grid ── */
function intensityClass(v: number) {
  switch (v) {
    case 0:
      return "bg-surface-2 opacity-50";
    case 1:
      return "bg-accent/15";
    case 2:
      return "bg-accent/35";
    case 3:
      return "bg-accent/60";
    case 4:
      return "bg-accent";
    default:
      return "bg-surface-2";
  }
}

const DAYS = ["Mon", "Wed", "Fri"];
const MONTHS = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"];

export function GithubStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const langsRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [dynamicStats, setDynamicStats] = useState<DynamicGitHubStats | null>(null);

  /* Fetch live GitHub data on mount */
  useEffect(() => {
    fetchGitHubStats().then(setDynamicStats).catch(() => {});
  }, []);

  /* Data with static fallback */
  const languages = useMemo(
    () => dynamicStats?.languages ?? STATS.topLanguages,
    [dynamicStats]
  );

  const activityItems = useMemo(
    () => [
      {
        label: STATS.activity[0].label,
        value: String(dynamicStats?.publicRepos ?? STATS.activity[0].value),
        trend: STATS.activity[0].trend,
      },
      {
        label: STATS.activity[1].label,
        value: STATS.activity[1].value,
        trend: STATS.activity[1].trend,
      },
      {
        label: STATS.activity[2].label,
        value: String(dynamicStats?.stackDepth ?? STATS.activity[2].value),
        trend: STATS.activity[2].trend,
      },
      {
        label: STATS.activity[3].label,
        value: String(dynamicStats?.openIssues ?? STATS.activity[3].value),
        trend: STATS.activity[3].trend,
      },
    ],
    [dynamicStats]
  );

  /* GSAP animations — deferred until scroll so real data is present */
  useGSAP(
    () => {
      gsap.context(() => {
        /* Heading reveal */
        gsap.fromTo(
          "[data-stats-heading]",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );

        /* Language bars & labels — animate when scrolled into view */
        ScrollTrigger.create({
          trigger: langsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            const labels = langsRef.current?.querySelectorAll("[data-lang-row]");
            if (labels) {
              gsap.fromTo(
                labels,
                { opacity: 0, x: -10 },
                { opacity: 1, x: 0, stagger: 0.08, duration: 0.5, ease: "power2.out" }
              );
            }
            const bars = langsRef.current?.querySelectorAll("[data-lang-bar]");
            if (bars) {
              bars.forEach((bar) => {
                const target = parseFloat(
                  (bar as HTMLElement).dataset.target || "0"
                );
                gsap.fromTo(
                  bar,
                  { width: "0%" },
                  {
                    width: `${target}%`,
                    duration: 1.1,
                    ease: "power3.out",
                  }
                );
              });
            }
          },
        });

        /* Activity stat cards */
        ScrollTrigger.create({
          trigger: activityRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            const cards = activityRef.current?.querySelectorAll("[data-stat-card]");
            if (cards) {
              gsap.fromTo(
                cards,
                { opacity: 0, y: 16 },
                {
                  opacity: 1,
                  y: 0,
                  stagger: 0.08,
                  duration: 0.6,
                  ease: "power2.out",
                }
              );
            }

            const valueEls = activityRef.current?.querySelectorAll("[data-stat-value]");
            if (valueEls) {
              valueEls.forEach((el) => {
                const raw = (el as HTMLElement).dataset.raw || el.textContent || "";
                const num = parseInt(raw.replace(/[^0-9]/g, ""), 10);
                if (Number.isNaN(num) || num === 0) return;
                const proxy = { v: 0 };
                gsap.to(proxy, {
                  v: num,
                  duration: 1.4,
                  ease: "power2.out",
                  onUpdate: () => {
                    el.textContent = Math.round(proxy.v).toString();
                  },
                  onComplete: () => {
                    el.textContent = raw;
                  },
                });
              });
            }
          },
        });

        /* Contribution grid — wave reveal */
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            const cells = gridRef.current?.querySelectorAll("[data-cell]");
            if (cells) {
              gsap.fromTo(
                cells,
                { opacity: 0, scale: 0.6 },
                {
                  opacity: 1,
                  scale: 1,
                  stagger: { each: 0.008, from: "start" },
                  duration: 0.35,
                  ease: "power2.out",
                }
              );
            }
          },
        });
      }, sectionRef);
    },
    { scope: sectionRef }
  );

  /* Smoothly tween to new values if data arrives after scroll animation */
  useEffect(() => {
    if (!dynamicStats) return;

    const bars = langsRef.current?.querySelectorAll("[data-lang-bar]");
    bars?.forEach((bar) => {
      const target = parseFloat((bar as HTMLElement).dataset.target || "0");
      if (target === 0) return;
      const currentWidth = parseFloat((bar as HTMLElement).style.width) || 0;
      if (currentWidth === target) return;
      gsap.to(bar, { width: `${target}%`, duration: 0.8, ease: "power3.out" });
    });

    const valueEls = activityRef.current?.querySelectorAll("[data-stat-value]");
    valueEls?.forEach((el) => {
      const raw = (el as HTMLElement).dataset.raw || "";
      const num = parseInt(raw.replace(/[^0-9]/g, ""), 10);
      if (Number.isNaN(num) || num === 0) return;
      const current = parseInt(el.textContent?.replace(/[^0-9]/g, "") || "0", 10) || 0;
      if (current === num) return;
      const proxy = { v: current };
      gsap.to(proxy, {
        v: num,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.round(proxy.v).toString();
        },
        onComplete: () => {
          el.textContent = raw;
        },
      });
    });
  }, [dynamicStats]);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative py-[var(--shell-pad-y)] border-b border-border overflow-hidden"
    >
      {/* Soft ambient glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[40vw] h-[60vh] rounded-full blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(125,211,252,0.07) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="shell relative z-10">
        {/* Label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="t-label">{STATS.fig}</span>
          <span className="h-px flex-1 bg-border-strong" />
        </div>

        {/* Heading */}
        <h2 className="t-heading max-w-4xl mb-4" data-stats-heading>
          {STATS.heading}
        </h2>
        <p
          className="t-lede max-w-2xl mb-12 md:mb-16"
          data-stats-heading
        >
          {STATS.lede}
        </p>

        {/* Two-column: Top Languages + Activity Stats */}
        <div className="grid lg:grid-cols-5 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Top Languages panel — 3 cols */}
          <div
            ref={langsRef}
            className="lg:col-span-3 frame-elevated rounded-lg overflow-hidden"
          >
            <div className="win-header">
              <span className="dot-row">
                <span className="dot" style={{ background: "#ff6b6b" }} />
                <span className="dot" style={{ background: "#f7a13c" }} />
                <span className="dot" style={{ background: "#7ee787" }} />
              </span>
              <span className="ml-2 truncate">
                gh-stats · top languages (last 24mo)
              </span>
            </div>
            <div className="p-5 md:p-6">
              <div className="space-y-3.5">
                {languages.map((lang, i) => (
                  <div
                    key={`${lang.name}-${i}`}
                    data-lang-row
                    className="opacity-0 group cursor-default"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{
                            background: lang.color,
                            boxShadow: `0 0 6px ${lang.color}55`,
                          }}
                        />
                        <span className="font-mono text-[12px] text-text tracking-tight group-hover:text-accent transition-colors duration-300">
                          {lang.name}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-faint tabular">
                        {lang.percent}%
                      </span>
                    </div>
                    <div className="h-[5px] bg-surface-2 rounded-full overflow-hidden">
                      <div
                        data-lang-bar
                        data-target={lang.percent}
                        className="h-full rounded-full"
                        style={{
                          width: "0%",
                          background: lang.color,
                          boxShadow: `0 0 8px ${lang.color}55`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <div className="mt-6 pt-4 border-t border-border-strong flex items-center justify-between">
                <span className="font-mono text-[10px] text-faint tracking-wider uppercase">
                  pulled from local activity
                </span>
                <span className="font-mono text-[10px] text-term-green tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-term-green" />
                  fresh
                </span>
              </div>
            </div>
          </div>

          {/* Activity stat cards — 2 cols */}
          <div
            ref={activityRef}
            className="lg:col-span-2 grid grid-cols-2 gap-3 md:gap-4"
          >
            {activityItems.map((stat, i) => (
              <div
                key={`${stat.label}-${i}`}
                data-stat-card
                className="frame-elevated rounded-lg p-4 md:p-5 flex flex-col justify-between group hover:border-accent/30 transition-all duration-500 cursor-default relative overflow-hidden"
                style={{ opacity: 0 }}
              >
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-faint">
                  {stat.label}
                </span>
                <div className="my-2">
                  <span
                    data-stat-value
                    data-raw={stat.value}
                    className="font-mono text-[28px] md:text-[32px] font-medium text-accent tabular leading-none"
                  >
                    {stat.value}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-text-dim leading-snug">
                  {stat.trend}
                </span>

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
            ))}
          </div>
        </div>

        {/* Contribution graph — btop / GitHub-style */}
        <div className="frame-elevated rounded-lg overflow-hidden">
          <div className="win-header">
            <span className="dot-row">
              <span className="dot" style={{ background: "#c084fc" }} />
            </span>
            <span className="ml-2 truncate">
              btop · contribution heatmap · 168 days
            </span>
          </div>
          <div ref={gridRef} className="p-5 md:p-6">
            <div className="flex gap-2 md:gap-3">
              {/* Day labels (left axis) */}
              <div className="flex flex-col justify-between py-[2px] pr-1 shrink-0">
                {DAYS.map((d) => (
                  <span
                    key={d}
                    className="font-mono text-[9px] text-faint tracking-wider h-[14px] flex items-center"
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Grid */}
              <div className="flex-1 overflow-x-auto">
                <div className="flex flex-col gap-[3px] min-w-[600px]">
                  {STATS.contributions.map((row, ri) => (
                    <div key={ri} className="flex gap-[3px]">
                      {row.map((cell, ci) => (
                        <div
                          key={ci}
                          data-cell
                          className={`w-[14px] h-[14px] rounded-[2px] ${intensityClass(
                            cell
                          )} hover:ring-1 hover:ring-accent/40 transition-all duration-200`}
                          title={`day ${ci + 1} · level ${cell}`}
                          style={{ opacity: 0 }}
                        />
                      ))}
                    </div>
                  ))}

                  {/* Month axis */}
                  <div className="flex justify-between mt-3 px-1">
                    {MONTHS.map((m) => (
                      <span
                        key={m}
                        className="font-mono text-[9px] text-faint tracking-wider"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-5 pt-4 border-t border-border-strong flex items-center justify-between flex-wrap gap-3">
              <span className="font-mono text-[10px] text-faint tracking-wider uppercase">
                last 168 days · 24 weeks
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-faint">less</span>
                {[0, 1, 2, 3, 4].map((v) => (
                  <span
                    key={v}
                    className={`w-[10px] h-[10px] rounded-[2px] ${intensityClass(v)}`}
                  />
                ))}
                <span className="font-mono text-[10px] text-faint">more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
