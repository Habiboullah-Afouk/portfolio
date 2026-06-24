"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NAV } from "@/lib/content";
import { TreasureRoadmap } from "@/components/ui/TreasureRoadmap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Workstation() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          "[data-ws-label]",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.15
        );

        const words = document.querySelectorAll("[data-ws-word]");
        if (words.length) {
          tl.fromTo(
            words,
            { opacity: 0, y: 30, rotateX: -25 },
            { opacity: 1, y: 0, rotateX: 0, stagger: 0.04, duration: 0.65 },
            0.25
          );
        }

        tl.fromTo(
          "[data-ws-subtitle]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.55
        );

        tl.fromTo(
          "[data-ws-prompt]",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.75
        );

        const dots = document.querySelectorAll("[data-ws-dot]");
        if (dots.length) {
          tl.fromTo(
            dots,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, stagger: 0.05, duration: 0.4 },
            0.35
          );
        }
      }, sectionRef);
    },
    { scope: sectionRef }
  );

  const headingWords = ["A", "personal", "operating", "system."];

  return (
    <section
      id="workstation"
      ref={sectionRef}
      className="relative border-b border-border overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Subtle dot grid background — matches other sections */}
      <div
        className="absolute inset-0 grid-dot opacity-40 pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient glow — center-left */}
      <div
        className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[55vw] h-[70vh] rounded-full blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(125,211,252,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Secondary cool glow — right side */}
      <div
        className="absolute top-[30%] right-[5%] w-[35vw] h-[35vw] rounded-full blur-[120px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="shell relative z-10 py-[var(--shell-pad-y)] min-h-screen">
        {/* Two-column layout: Left = text, Right = treasure roadmap */}
        <div className="flex items-center min-h-screen">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            {/* Left column — editorial text */}
            <div className="lg:col-span-5 w-full" style={{ perspective: "900px" }}>

              <div className="absolute left-0 top-0 bottom-0 hidden md:flex flex-col items-center justify-center gap-3 pl-4">
                {NAV.map((item) => (
                  <a
                    key={item.num}
                    href={item.href}
                    data-ws-dot
                    suppressHydrationWarning
                    className="group flex items-center gap-2 opacity-0"
                    title={item.label}
                  >
                    <span
                      className={`block w-[3px] h-[3px] rounded-full transition-all duration-300 ${
                        item.href === "#workstation"
                          ? "bg-accent scale-150"
                          : "bg-subtle group-hover:bg-muted"
                      }`}
                    />
                    <span className="font-mono text-[9px] tracking-widest text-faint opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                      {item.num}
                    </span>
                  </a>
                ))}
              </div>

              <div
                data-ws-label
                className="flex items-center gap-4 mb-8 md:mb-10 opacity-0"
              >
                <span className="t-label">FIG 0.2 — DAILY RIG</span>
                <span className="h-px flex-1 max-w-[80px] bg-border-strong" />
              </div>

              <h2
                className="mb-6 md:mb-8"
                style={{
                  fontSize: "clamp(2.4rem, 4.8vw, 4.8rem)",
                  fontWeight: 500,
                  lineHeight: 1.02,
                  letterSpacing: "-0.04em",
                }}
              >
                {headingWords.map((word, i) => (
                  <span
                    key={i}
                    data-ws-word
                    className={`inline-block mr-[0.25em] opacity-0 ${
                      word === "operating" ? "gradient-text" : "text-text"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {word}
                  </span>
                ))}
              </h2>

              <p
                data-ws-subtitle
                className="max-w-md opacity-0"
                style={{
                  fontSize: "clamp(1.05rem, 1.4vw, 1.35rem)",
                  lineHeight: 1.5,
                  letterSpacing: "-0.01em",
                  color: "var(--text-dim)",
                }}
              >
                Two years of tuning Linux at the core, the terminal as the studio,
                the editor as the instrument.
              </p>

              <div
                data-ws-prompt
                className="mt-8 md:mt-10 flex items-center gap-2 opacity-0"
              >
                <span className="text-faint font-mono text-[12px]">$ </span>
                <span className="font-mono text-[13px] text-accent tracking-wide">
                  whoami
                </span>
                <span className="caret" />
              </div>
            </div>

            {/* Right column — treasure roadmap */}
            <div className="lg:col-span-7">
              <TreasureRoadmap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
