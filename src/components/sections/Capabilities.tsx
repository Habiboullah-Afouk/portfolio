"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAPABILITIES } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Capabilities() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Label
        gsap.fromTo(
          "[data-cap-label]",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        // Heading
        gsap.fromTo(
          "[data-cap-heading]",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );

        // Columns with parallax depth — each column moves at a different rate
        const columns = ref.current?.querySelectorAll("[data-cap-col]");
        if (columns) {
          columns.forEach((col, i) => {
            const speed = [0.3, 0.5, 0.7, 0.9][i] || 0.5;
            gsap.fromTo(
              col,
              { opacity: 0, y: 50 * speed },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: col,
                  start: "top 90%",
                  toggleActions: "play none none none",
                },
              }
            );
          });
        }

        // Items stagger within columns
        const items = ref.current?.querySelectorAll("[data-cap-item]");
        if (items) {
          gsap.fromTo(
            items,
            { opacity: 0, x: -12 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.06,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }, ref);
    },
    { scope: ref }
  );

  return (
    <section
      id="stack"
      ref={ref}
      className="relative py-[var(--shell-pad-y)] border-b border-border"
    >
      {/* Layered depth — background grid */}
      <div className="absolute inset-0 grid-dot opacity-50 pointer-events-none" aria-hidden="true" />

      <div className="shell relative z-10">
        {/* Label */}
        <div className="flex items-center gap-4 mb-8" data-cap-label>
          <span className="t-label">{CAPABILITIES.fig}</span>
          <span className="h-px flex-1 bg-border-strong" />
        </div>

        {/* Heading */}
        <h2 className="t-heading max-w-4xl mb-4" data-cap-heading>
          {CAPABILITIES.heading}
        </h2>
        <p className="t-lede max-w-2xl mb-12 md:mb-20">
          {CAPABILITIES.lede}
        </p>

        {/* 4-column grid with parallax depth */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {CAPABILITIES.columns.map((col, ci) => (
            <div key={ci} data-cap-col className="flex flex-col gap-4">
              {/* Group label */}
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent">
                  {col.group}
                </span>
                <span className="h-px flex-1 bg-border-strong" />
              </div>

              {/* Items */}
              {col.items.map((item, ii) => (
                <div
                  key={ii}
                  data-cap-item
                  className="flex items-start gap-3 py-2.5 border-b border-border"
                >
                  <span className="font-mono text-[10px] text-faint mt-0.5 tabular">
                    {String(ci * col.items.length + ii + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] leading-[1.5] text-text-dim">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
