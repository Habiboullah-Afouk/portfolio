"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Nav } from "./Nav";
import { Cursor } from "./Cursor";
import { Grain } from "./Grain";
import { LoadingScreen } from "./LoadingScreen";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Shell({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Sync Lenis with ScrollTrigger via gsap ticker (single RAF loop)
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:bg-accent focus:text-bg focus:font-mono focus:text-[11px] focus:tracking-wider focus:uppercase"
      >
        Skip to content
      </a>
      <Nav />
      <Cursor />
      <Grain />
      <main id="content">{children}</main>
    </>
  );
}
