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
  const diagramRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Pinned section: diagram draws as you scroll
        const nodes = diagramRef.current?.querySelectorAll("[data-node]");
        const lines = diagramRef.current?.querySelectorAll("[data-line]");

        if (nodes && lines) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 15%",
              end: "bottom 20%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          nodes.forEach((node, i) => {
            tl.fromTo(
              node,
              { opacity: 0, scale: 0.9 },
              { opacity: 1, scale: 1, duration: 0.4 },
              i * 0.35
            );
            if (lines[i]) {
              tl.fromTo(
                lines[i],
                { scaleX: 0 },
                { scaleX: 1, duration: 0.3, transformOrigin: "left center" },
                i * 0.35 + 0.3
              );
            }
          });
        }

        // Stage cards stagger
        const cards = stagesRef.current?.querySelectorAll("[data-stage]");
        if (cards) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: stagesRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }, sectionRef);
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative border-b border-border"
    >
      {/* Header */}
      <div className="shell py-[var(--shell-pad-y)] pb-8">
        <div className="flex items-center gap-4 mb-8">
          <span className="t-label">{PROCESS.fig}</span>
          <span className="h-px flex-1 bg-border-strong" />
        </div>
        <h2 className="t-heading max-w-4xl mb-4">{PROCESS.heading}</h2>
        <p className="t-lede max-w-2xl">{PROCESS.lede}</p>
      </div>

      {/* Infrastructure diagram (pinned on desktop) */}
      <div ref={diagramRef} className="shell pb-8 hidden md:block">
        <div className="flex items-center justify-between gap-2 overflow-hidden">
          {PROCESS.stages.map((stage, i) => (
            <div key={i} className="flex items-center flex-1">
              <div
                data-node
                className="relative flex flex-col items-center text-center gap-2 p-4 frame-elevated rounded-md min-w-[120px]"
              >
                <span className="font-mono text-[24px] font-medium text-accent tabular">
                  {stage.n}
                </span>
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-text-dim">
                  {stage.title}
                </span>
              </div>
              {i < PROCESS.stages.length - 1 && (
                <div
                  data-line
                  className="h-px flex-1 mx-2 bg-border-strong"
                  style={{ transform: "scaleX(0)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stage detail cards */}
      <div
        ref={stagesRef}
        className="shell grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-[var(--shell-pad-y)]"
      >
        {PROCESS.stages.map((stage, i) => (
          <div
            key={i}
            data-stage
            className="frame-elevated rounded-lg p-6 md:p-8 flex flex-col gap-4 group hover:border-accent/20 transition-colors duration-500"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[28px] font-medium text-accent tabular leading-none">
                {stage.n}
              </span>
              <span className="h-px flex-1 bg-border-strong" />
            </div>
            <h3 className="text-[17px] font-medium text-text tracking-[-0.01em]">
              {stage.title}
            </h3>
            <p className="text-[14px] leading-[1.6] text-text-dim flex-1">
              {stage.summary}
            </p>
            <div className="pt-3 border-t border-border-strong">
              <span className="t-caption text-faint">
                → {stage.out}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
