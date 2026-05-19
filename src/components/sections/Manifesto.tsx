"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SYSTEM } from "@/lib/content";

function renderText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <em key={i} className="italic text-accent">
          {part.slice(2, -2)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Label
        gsap.fromTo(
          "[data-manifest-label]",
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

        // Heading — progressive reveal word by word
        const words = ref.current?.querySelectorAll("[data-manifest-word]");
        if (words) {
          gsap.fromTo(
            words,
            { opacity: 0, y: 30, filter: "blur(6px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              stagger: 0.08,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 70%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        // Body paragraphs
        gsap.fromTo(
          "[data-manifest-body]",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 55%",
              toggleActions: "play none none none",
            },
          }
        );

        // Closer
        gsap.fromTo(
          "[data-manifest-closer]",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 45%",
              toggleActions: "play none none none",
            },
          }
        );
      }, ref);
    },
    { scope: ref }
  );

  const headingWords = SYSTEM.heading.split(" ");

  return (
    <section
      id="system"
      ref={ref}
      className="relative py-[var(--shell-pad-y)] border-b border-border"
    >
      <div className="shell">
        {/* Chapter label */}
        <div className="flex items-center gap-4 mb-12 md:mb-20" data-manifest-label>
          <span className="t-label">{SYSTEM.fig}</span>
          <span className="h-px flex-1 bg-border-strong" />
        </div>

        {/* Editorial heading */}
        <h2 className="t-heading max-w-5xl mb-10 md:mb-16 leading-[1.08]">
          {headingWords.map((word, i) => (
            <span
              key={i}
              data-manifest-word
              className="inline-block mr-[0.3em]"
              style={{ opacity: 0 }}
            >
              {renderText(word)}
            </span>
          ))}
        </h2>

        {/* Body */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mb-12 md:mb-16">
          {SYSTEM.body.map((p, i) => (
            <p
              key={i}
              data-manifest-body
              className="text-text-dim leading-[1.65] text-[15px]"
              style={{ opacity: 0 }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Closer line */}
        <div
          className="flex items-center gap-6 pt-6 border-t border-border-strong"
          data-manifest-closer
          style={{ opacity: 0 }}
        >
          <span className="t-label text-accent">{SYSTEM.signature}</span>
          <span className="h-px w-12 bg-border-strong" />
          <em className="font-serif text-[15px] text-text-dim italic">
            {SYSTEM.closer}
          </em>
        </div>
      </div>
    </section>
  );
}
