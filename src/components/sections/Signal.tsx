"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SIGNAL, SITE } from "@/lib/content";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Signal() {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-signal-heading]",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          "[data-signal-terminal]",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 60%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          "[data-signal-social]",
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 50%",
              toggleActions: "play none none none",
            },
          }
        );
      }, ref);
    },
    { scope: ref }
  );

  const copyEmail = () => {
    navigator.clipboard.writeText(SIGNAL.cta.href.replace("mailto:", ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="signal"
      ref={ref}
      className="relative py-[var(--shell-pad-y)]"
    >
      <div className="shell">
        {/* Label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="t-label">{SIGNAL.fig}</span>
          <span className="h-px flex-1 bg-border-strong" />
        </div>

        {/* Heading */}
        <h2
          data-signal-heading
          className="t-heading max-w-4xl mb-6"
          style={{ opacity: 0 }}
        >
          {SIGNAL.heading}
        </h2>
        <p
          className="t-lede max-w-2xl mb-12"
          style={{ opacity: 0 }}
          data-signal-heading
        >
          {SIGNAL.lede}
        </p>

        {/* Terminal prompt */}
        <div
          data-signal-terminal
          className="win rounded-lg overflow-hidden max-w-2xl mb-12"
          style={{ opacity: 0 }}
        >
          <div className="win-header">
            <span className="dot-row">
              <span className="dot" style={{ background: "#ff6b6b" }} />
              <span className="dot" style={{ background: "#f7a13c" }} />
              <span className="dot" style={{ background: "#7ee787" }} />
            </span>
            <span className="ml-2">bash</span>
          </div>
          <div className="p-5 md:p-6">
            <div className="font-mono text-[13px] md:text-[14px] leading-[1.7] text-muted">
              <span className="text-accent">{SIGNAL.prompt}</span>
              <span className="caret" />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={SIGNAL.cta.href}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-accent/10 border border-accent/20 text-accent font-mono text-[12px] tracking-wider uppercase hover:bg-accent/20 transition-all duration-300"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {SIGNAL.cta.label}
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-3 py-2.5 rounded-md border border-border-strong text-muted font-mono text-[11px] tracking-wider uppercase hover:border-accent/30 hover:text-accent transition-all duration-300"
              >
                {copied ? "COPIED ✓" : "COPY"}
              </button>
            </div>
          </div>
        </div>

        {/* Fine print */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-16">
          {SIGNAL.fineprint.map((line, i) => (
            <span key={i} className="t-caption">
              {line}
            </span>
          ))}
        </div>

        {/* Social links */}
        <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-border-strong">
          {SITE.social.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-signal-social
              className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted hover:text-accent transition-colors duration-300"
              style={{ opacity: 0 }}
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div className="shell mt-16 md:mt-24 pt-6 border-t border-border-strong flex items-center justify-between">
        <span className="t-caption text-faint">
          {SITE.handle} — {new Date().getFullYear()}
        </span>
        <span className="t-caption text-faint hidden md:inline">
          Built with Next.js · Tailwind · GSAP · Arch Linux · Hyprland
        </span>
      </div>
    </section>
  );
}
