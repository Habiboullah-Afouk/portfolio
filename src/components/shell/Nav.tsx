"use client";

import { useState } from "react";
import { NAV, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Fixed top bar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="shell flex items-center justify-between py-4">
          {/* Logo / handle */}
          <a
            href="#"
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted hover:text-accent transition-colors duration-500"
          >
            {SITE.callsign}
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex items-center gap-2"
              >
                <span className="font-mono text-[10px] text-faint tracking-wide">
                  {item.num}
                </span>
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted group-hover:text-text transition-colors duration-300">
                  {item.label}
                </span>
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
