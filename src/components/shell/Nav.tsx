"use client";

import { useState, useRef, useEffect } from "react";
import { NAV, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  /* ── scroll progress + PWD tracking ── */
  useEffect(() => {
    let raf = 0;
    let lastProgress = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || document.body.scrollTop;
        const scrollHeight = doc.scrollHeight - doc.clientHeight;
        const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

        if (Math.abs(progress - lastProgress) > 0.001) {
          lastProgress = progress;
          setScrollProgress(progress);
        }

        /* Show nav after scrolling past hero */
        setVisible(scrollTop > 80);

        /* Track active section for PWD */
        const sections = NAV.map((n) =>
          document.querySelector(n.href)
        ).filter(Boolean) as Element[];

        let current = "";
        for (let i = sections.length - 1; i >= 0; i--) {
          const rect = sections[i].getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            current = NAV[i].label.toLowerCase();
            break;
          }
        }
        setActiveSection(current);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const pwd = activeSection ? `~/${activeSection}` : "~/home";

  return (
    <>
      {/* Fixed top bar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          visible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        )}
      >
        {/* Scroll progress bar */}
        <div className="h-[2px] w-full bg-transparent relative">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-accent"
            style={{
              width: `${scrollProgress * 100}%`,
              boxShadow: "0 0 10px rgba(125,211,252,0.6)",
            }}
          />
        </div>

        {/* Nav bar with frosted glass */}
        <div className="backdrop-blur-xl bg-bg/80 border-b border-border/50">
          <div className="shell flex items-center justify-between py-3">
            {/* Logo / handle */}
            <a
              href="#"
              className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted hover:text-accent transition-colors duration-500 shrink-0"
            >
              {SITE.callsign}
            </a>

            {/* PWD breadcrumb — terminal style */}
            <div className="hidden lg:flex items-center gap-1.5 font-mono text-[10px] text-faint tracking-wider">
              <span className="text-accent">$</span>
              <span className="text-text-dim">{pwd}</span>
              <span className="text-accent animate-pulse">_</span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-1.5 relative"
                >
                  <span
                    className={cn(
                      "font-mono text-[10px] tracking-wide transition-colors duration-300",
                      activeSection === item.label.toLowerCase()
                        ? "text-accent"
                        : "text-faint"
                    )}
                  >
                    {item.num}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-300",
                      activeSection === item.label.toLowerCase()
                        ? "text-text"
                        : "text-muted group-hover:text-text"
                    )}
                  >
                    {item.label}
                  </span>
                  {activeSection === item.label.toLowerCase() && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                      style={{ boxShadow: "0 0 6px rgba(125,211,252,0.4)" }}
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              aria-label="Toggle menu"
              className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span
                className={cn(
                  "block h-px bg-text transition-all duration-500",
                  menuOpen ? "w-6 rotate-45 translate-y-[3.5px]" : "w-5"
                )}
              />
              <span
                className={cn(
                  "block h-px bg-text transition-all duration-500",
                  menuOpen ? "w-6 -rotate-45 -translate-y-[3.5px]" : "w-5"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-bg flex flex-col justify-center transition-all duration-700",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="shell flex flex-col gap-6">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-baseline gap-4 group"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="font-mono text-[10px] text-faint">
                {item.num}
              </span>
              <span className="t-heading group-hover:text-accent transition-colors duration-300">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
