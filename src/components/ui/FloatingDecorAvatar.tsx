"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AVATARS = [
  "/images/avatars/firstSmallAvatar.png",
  "/images/avatars/secondSmallAvatar.png",
  "/images/avatars/thirdSmallAvatar.png",
  "/images/avatars/fourthSmallAvatar.png",
];

interface FloatingDecorAvatarProps {
  /** Which avatar to show (0–3) */
  index?: number;
  /** CSS position values */
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  /** Size in px */
  size?: number;
  /** Base opacity (0–1) — kept subtle */
  opacity?: number;
  /** Rotation in degrees */
  rotate?: number;
  /** Mirror horizontally */
  flip?: boolean;
  /** Extra CSS class */
  className?: string;
}

/**
 * FloatingDecorAvatar — a ghosted, blurred 3D avatar placed in
 * section backgrounds as a premium decorative element.
 * Fades in on scroll and drifts slightly with a parallax effect.
 */
export function FloatingDecorAvatar({
  index = 0,
  top,
  bottom,
  left,
  right,
  size = 280,
  opacity = 0.06,
  rotate = 0,
  flip = false,
  className = "",
}: FloatingDecorAvatarProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      /* Fade in on scroll */
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );

      /* Subtle parallax drift while scrolling */
      gsap.to(ref.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    },
    { scope: ref }
  );

  const src = AVATARS[index % AVATARS.length];

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none select-none z-[1] ${className}`}
      aria-hidden="true"
      style={{
        top,
        bottom,
        left,
        right,
        width: size,
        height: size,
        opacity: 0, // starts hidden, GSAP fades in
        transform: `rotate(${rotate}deg) scaleX(${flip ? -1 : 1})`,
      }}
    >
      {/* Soft glow behind the avatar */}
      <div
        className="absolute inset-0 rounded-full blur-[40px]"
        style={{
          background:
            "radial-gradient(circle, rgba(125,211,252,0.08) 0%, transparent 70%)",
        }}
      />
      <Image
        src={src}
        alt=""
        fill
        sizes={`${size}px`}
        className="object-contain"
        draggable={false}
        style={{
          opacity: 1,
          filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.4))",
        }}
      />
    </div>
  );
}
