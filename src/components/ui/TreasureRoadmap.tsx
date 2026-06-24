"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Step data ─────────────────────────────────────────────── */
const STEPS = [
  { label: "Idea and project planning", num: "01" },
  { label: "Architecture and design", num: "02" },
  { label: "Development and coding", num: "03" },
  { label: "Deployment and launch", num: "04" },
];

/* ── Desktop positions — island-like floating layout ───────── */
const POSITIONS = [
  { x: 12, y: 6 },
  { x: 58, y: 22 },
  { x: 18, y: 48 },
  { x: 62, y: 72 },
];

/* ── Mobile positions — centered vertical layout ───────────── */
const MOBILE_POSITIONS = [
  { x: 30, y: 2 },
  { x: 50, y: 26 },
  { x: 25, y: 50 },
  { x: 55, y: 74 },
];

const NODE_SIZE = 120;

/* ── Pirate map SVG decorations ────────────────────────────── */

function XMark({ x, y, size = 12, opacity = 0.2 }: { x: number; y: number; size?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      <line x1={-size / 2} y1={-size / 2} x2={size / 2} y2={size / 2} stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={size / 2} y1={-size / 2} x2={-size / 2} y2={size / 2} stroke="#7B61FF" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

function SkullIcon({ x, y, size = 16, opacity = 0.15 }: { x: number; y: number; size?: number; opacity?: number }) {
  const s = size;
  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      {/* Skull */}
      <ellipse cx={0} cy={-s * 0.1} rx={s * 0.4} ry={s * 0.45} fill="none" stroke="#7B61FF" strokeWidth="1" />
      {/* Eyes */}
      <circle cx={-s * 0.15} cy={-s * 0.15} r={s * 0.08} fill="#7B61FF" />
      <circle cx={s * 0.15} cy={-s * 0.15} r={s * 0.08} fill="#7B61FF" />
      {/* Jaw */}
      <line x1={-s * 0.15} y1={s * 0.25} x2={s * 0.15} y2={s * 0.25} stroke="#7B61FF" strokeWidth="0.8" />
      <line x1={-s * 0.08} y1={s * 0.25} x2={-s * 0.08} y2={s * 0.35} stroke="#7B61FF" strokeWidth="0.6" />
      <line x1={s * 0.08} y1={s * 0.25} x2={s * 0.08} y2={s * 0.35} stroke="#7B61FF" strokeWidth="0.6" />
    </g>
  );
}

function CompassRose({ x, y, size = 30, opacity = 0.12 }: { x: number; y: number; size?: number; opacity?: number }) {
  const r = size / 2;
  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      <circle cx={0} cy={0} r={r} fill="none" stroke="#7B61FF" strokeWidth="0.8" strokeDasharray="2 2" />
      <circle cx={0} cy={0} r={r * 0.15} fill="#7B61FF" opacity={0.3} />
      {/* Cardinal lines */}
      <line x1={0} y1={-r} x2={0} y2={r} stroke="#7B61FF" strokeWidth="0.6" />
      <line x1={-r} y1={0} x2={r} y2={0} stroke="#7B61FF" strokeWidth="0.6" />
      {/* Diagonal lines */}
      <line x1={-r * 0.6} y1={-r * 0.6} x2={r * 0.6} y2={r * 0.6} stroke="#7B61FF" strokeWidth="0.4" />
      <line x1={r * 0.6} y1={-r * 0.6} x2={-r * 0.6} y2={r * 0.6} stroke="#7B61FF" strokeWidth="0.4" />
      {/* N marker */}
      <text x={0} y={-r - 4} textAnchor="middle" fill="#7B61FF" fontSize="7" fontFamily="monospace" opacity={0.6}>N</text>
    </g>
  );
}

function StarDecor({ x, y, size = 6, opacity = 0.25 }: { x: number; y: number; size?: number; opacity?: number }) {
  const points = Array.from({ length: 4 }, (_, i) => {
    const angle = (i * Math.PI) / 2;
    return `${x + Math.cos(angle) * size},${y + Math.sin(angle) * size}`;
  }).join(" ");
  return (
    <g opacity={opacity}>
      <polygon points={points} fill="#7B61FF" />
      <circle cx={x} cy={y} r={size * 0.3} fill="#7B61FF" opacity={0.5} />
    </g>
  );
}

function TreasureChest({ x, y, size = 18, opacity = 0.15 }: { x: number; y: number; size?: number; opacity?: number }) {
  const w = size;
  const h = size * 0.7;
  return (
    <g transform={`translate(${x - w / 2}, ${y - h / 2})`} opacity={opacity}>
      <rect x={0} y={h * 0.35} width={w} height={h * 0.65} rx={1} fill="none" stroke="#7B61FF" strokeWidth="1" />
      <path d={`M 0 ${h * 0.35} Q ${w / 2} ${-h * 0.15} ${w} ${h * 0.35}`} fill="none" stroke="#7B61FF" strokeWidth="1" />
      <line x1={0} y1={h * 0.55} x2={w} y2={h * 0.55} stroke="#7B61FF" strokeWidth="0.6" />
      <circle cx={w / 2} cy={h * 0.55} r={1.5} fill="#7B61FF" />
    </g>
  );
}

function CrossedSwords({ x, y, size = 24, opacity = 0.18 }: { x: number; y: number; size?: number; opacity?: number }) {
  const s = size / 2;
  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      {/* Sword 1 */}
      <line x1={-s} y1={-s * 0.8} x2={s} y2={s * 0.8} stroke="#7B61FF" strokeWidth="1.2" strokeLinecap="round" />
      <line x1={-s * 0.3} y1={-s * 0.45} x2={-s * 0.1} y2={-s * 0.7} stroke="#7B61FF" strokeWidth="1" strokeLinecap="round" />
      {/* Sword 2 */}
      <line x1={s} y1={-s * 0.8} x2={-s} y2={s * 0.8} stroke="#7B61FF" strokeWidth="1.2" strokeLinecap="round" />
      <line x1={s * 0.3} y1={-s * 0.45} x2={s * 0.1} y2={-s * 0.7} stroke="#7B61FF" strokeWidth="1" strokeLinecap="round" />
      {/* Guard bars */}
      <line x1={-s * 0.45} y1={-s * 0.25} x2={-s * 0.15} y2={-s * 0.55} stroke="#7B61FF" strokeWidth="0.8" />
      <line x1={s * 0.45} y1={-s * 0.25} x2={s * 0.15} y2={-s * 0.55} stroke="#7B61FF" strokeWidth="0.8" />
    </g>
  );
}

function SmallIsland({ x, y, size = 20, opacity = 0.1 }: { x: number; y: number; size?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`} opacity={opacity}>
      <ellipse cx={0} cy={2} rx={size * 0.6} ry={size * 0.2} fill="#7B61FF" opacity={0.3} />
      <path d={`M ${-size * 0.3} 0 Q ${-size * 0.15} ${-size * 0.4} 0 ${-size * 0.15} Q ${size * 0.15} ${-size * 0.4} ${size * 0.3} 0`} fill="none" stroke="#7B61FF" strokeWidth="0.8" />
      <line x1={0} y1={-size * 0.15} x2={0} y2={-size * 0.5} stroke="#7B61FF" strokeWidth="0.6" />
      {/* Palm leaves */}
      <path d={`M 0 ${-size * 0.5} Q ${size * 0.25} ${-size * 0.55} ${size * 0.35} ${-size * 0.35}`} fill="none" stroke="#7B61FF" strokeWidth="0.5" />
      <path d={`M 0 ${-size * 0.5} Q ${-size * 0.2} ${-size * 0.55} ${-size * 0.3} ${-size * 0.35}`} fill="none" stroke="#7B61FF" strokeWidth="0.5" />
    </g>
  );
}

/* ── Floating particles (deterministic to avoid hydration mismatch) ── */
const PARTICLE_DATA = [
  { x: 5, y: 12, size: 1.2, delay: 0.5, dur: 4.5 },
  { x: 15, y: 30, size: 0.8, delay: 1.2, dur: 3.8 },
  { x: 25, y: 8, size: 1.8, delay: 2.0, dur: 5.0 },
  { x: 35, y: 55, size: 1.0, delay: 0.8, dur: 4.2 },
  { x: 45, y: 20, size: 1.5, delay: 3.0, dur: 3.5 },
  { x: 55, y: 70, size: 0.7, delay: 1.5, dur: 4.8 },
  { x: 65, y: 15, size: 1.3, delay: 4.0, dur: 3.2 },
  { x: 72, y: 45, size: 1.0, delay: 2.5, dur: 5.5 },
  { x: 80, y: 80, size: 1.6, delay: 0.3, dur: 4.0 },
  { x: 88, y: 35, size: 0.9, delay: 3.5, dur: 3.6 },
  { x: 10, y: 65, size: 1.1, delay: 5.0, dur: 4.3 },
  { x: 30, y: 85, size: 1.4, delay: 1.8, dur: 5.2 },
  { x: 50, y: 42, size: 0.6, delay: 4.5, dur: 3.9 },
  { x: 70, y: 60, size: 2.0, delay: 2.8, dur: 4.6 },
  { x: 92, y: 10, size: 0.8, delay: 0.7, dur: 3.3 },
  { x: 20, y: 90, size: 1.7, delay: 5.5, dur: 4.1 },
  { x: 60, y: 5, size: 1.0, delay: 3.2, dur: 5.8 },
  { x: 40, y: 75, size: 1.3, delay: 1.0, dur: 3.7 },
  { x: 85, y: 50, size: 0.5, delay: 4.2, dur: 4.4 },
  { x: 48, y: 95, size: 1.1, delay: 2.3, dur: 3.4 },
];

function Particles() {
  return (
    <>
      {PARTICLE_DATA.map((p, i) => (
        <div
          key={i}
          className="treasure-particle absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "#7B61FF",
            opacity: 0,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}


/* ── Build the hand-drawn pirate path ──────────────────────── */
function buildPiratePath(positions: { x: number; y: number }[], viewW: number, viewH: number) {
  if (positions.length < 2) return "";

  const pts = positions.map((p) => ({
    x: (p.x / 100) * viewW + NODE_SIZE * 0.4,
    y: (p.y / 100) * viewH + NODE_SIZE * 0.4,
  }));

  let d = `M ${pts[0].x} ${pts[0].y}`;

  // Segment 1→2: swooping down-right with a small loop
  const p0 = pts[0];
  const p1 = pts[1];
  const mid01x = (p0.x + p1.x) / 2;
  const mid01y = (p0.y + p1.y) / 2;
  // Initial curve down
  d += ` C ${p0.x + 30} ${p0.y + 50}, ${mid01x - 40} ${mid01y - 30}, ${mid01x} ${mid01y}`;
  // Small loop/wiggle at midpoint
  d += ` C ${mid01x + 25} ${mid01y - 20}, ${mid01x + 35} ${mid01y + 25}, ${mid01x + 10} ${mid01y + 15}`;
  // Continue to step 2
  d += ` C ${mid01x - 10} ${mid01y + 40}, ${p1.x - 40} ${p1.y - 20}, ${p1.x} ${p1.y}`;

  // Segment 2→3: wide arc sweeping left with irregularity
  const p2 = pts[2];
  const mid12x = (p1.x + p2.x) / 2;
  const mid12y = (p1.y + p2.y) / 2;
  d += ` C ${p1.x + 20} ${p1.y + 60}, ${mid12x + 50} ${mid12y - 20}, ${mid12x + 15} ${mid12y}`;
  // Wiggle
  d += ` C ${mid12x - 15} ${mid12y + 15}, ${mid12x - 25} ${mid12y - 10}, ${mid12x - 10} ${mid12y + 20}`;
  d += ` C ${mid12x + 10} ${mid12y + 50}, ${p2.x + 40} ${p2.y - 30}, ${p2.x} ${p2.y}`;

  // Segment 3→4: final stretch with dramatic curve to "treasure"
  const p3 = pts[3];
  const mid23x = (p2.x + p3.x) / 2;
  const mid23y = (p2.y + p3.y) / 2;
  d += ` C ${p2.x + 30} ${p2.y + 40}, ${mid23x - 30} ${mid23y - 40}, ${mid23x} ${mid23y}`;
  // Loop near treasure
  d += ` C ${mid23x + 30} ${mid23y + 10}, ${mid23x + 40} ${mid23y + 35}, ${mid23x + 15} ${mid23y + 25}`;
  d += ` C ${mid23x - 15} ${mid23y + 45}, ${p3.x - 30} ${p3.y - 25}, ${p3.x} ${p3.y}`;

  return d;
}

/* ── Main component ────────────────────────────────────────── */
export function TreasureRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const positions = isMobile ? MOBILE_POSITIONS : POSITIONS;
  const viewW = 700;
  const viewH = 700;
  const pathD = buildPiratePath(positions, viewW, viewH);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      /* Animate the dashed path drawing in */
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: `8 12`,
          strokeDashoffset: length,
        });
        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 30%",
            scrub: 1.5,
          },
        });
      }

      /* Glow path reveal */
      if (glowPathRef.current) {
        const length = glowPathRef.current.getTotalLength();
        gsap.set(glowPathRef.current, {
          strokeDasharray: `8 12`,
          strokeDashoffset: length,
        });
        gsap.to(glowPathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 30%",
            scrub: 1.5,
          },
        });
      }

      /* Reveal each milestone node with stagger */
      const nodes = containerRef.current.querySelectorAll("[data-roadmap-node]");
      nodes.forEach((node, i) => {
        gsap.fromTo(
          node,
          { opacity: 0, scale: 0.5, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: node,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15,
          }
        );
      });

      /* Animate decorations */
      const decors = containerRef.current.querySelectorAll("[data-pirate-decor]");
      decors.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.3 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
            delay: 0.3 + i * 0.12,
          }
        );
      });
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  return (
    <div
      ref={containerRef}
      className="treasure-roadmap relative w-full"
      style={{ minHeight: viewH }}
    >
      {/* Floating ambient particles */}
      <Particles />

      {/* ── SVG Layer: Path + Decorations ─────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        viewBox={`0 0 ${viewW} ${viewH}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pirateTrailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7B61FF" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7B61FF" stopOpacity="0.4" />
          </linearGradient>
          <filter id="pirateGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Background glow trail */}
        <path
          ref={glowPathRef}
          d={pathD}
          fill="none"
          stroke="#7B61FF"
          strokeWidth="6"
          strokeLinecap="round"
          opacity={0.08}
          filter="url(#softGlow)"
        />

        {/* Main dashed pirate trail */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="url(#pirateTrailGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#pirateGlow)"
          className="treasure-trail-path"
        />

        {/* ── Pirate decorations scattered along the map ──── */}

        {/* Compass rose — top right area */}
        <CompassRose x={viewW * 0.85} y={viewH * 0.08} size={40} opacity={0.12} />

        {/* X marks — scattered */}
        <XMark x={viewW * 0.38} y={viewH * 0.12} size={10} opacity={0.18} />
        <XMark x={viewW * 0.72} y={viewH * 0.55} size={8} opacity={0.12} />
        <XMark x={viewW * 0.88} y={viewH * 0.78} size={14} opacity={0.22} />

        {/* Skull icons */}
        <SkullIcon x={viewW * 0.45} y={viewH * 0.38} size={14} opacity={0.12} />
        <SkullIcon x={viewW * 0.82} y={viewH * 0.42} size={10} opacity={0.08} />

        {/* Stars */}
        <StarDecor x={viewW * 0.25} y={viewH * 0.18} size={4} opacity={0.2} />
        <StarDecor x={viewW * 0.68} y={viewH * 0.08} size={3} opacity={0.15} />
        <StarDecor x={viewW * 0.9} y={viewH * 0.35} size={5} opacity={0.18} />
        <StarDecor x={viewW * 0.12} y={viewH * 0.65} size={3.5} opacity={0.14} />
        <StarDecor x={viewW * 0.52} y={viewH * 0.88} size={4} opacity={0.2} />
        <StarDecor x={viewW * 0.78} y={viewH * 0.92} size={3} opacity={0.12} />

        {/* Small islands */}
        <SmallIsland x={viewW * 0.92} y={viewH * 0.2} size={18} opacity={0.1} />
        <SmallIsland x={viewW * 0.05} y={viewH * 0.35} size={14} opacity={0.08} />

        {/* Treasure chest near step 3-4 area */}
        <TreasureChest x={viewW * 0.42} y={viewH * 0.62} size={16} opacity={0.14} />

        {/* Crossed swords near final step */}
        <CrossedSwords x={viewW * 0.82} y={viewH * 0.85} size={22} opacity={0.16} />

        {/* Small trail marks — tiny crosses along path */}
        {[0.15, 0.3, 0.45, 0.6, 0.75, 0.85].map((t, i) => {
          const xOff = (Math.sin(t * 20) * 15);
          const baseX = positions[Math.min(Math.floor(t * 4), 3)].x / 100 * viewW;
          const baseY = t * viewH;
          return (
            <g key={`mark-${i}`} opacity={0.1}>
              <circle cx={baseX + xOff + 50} cy={baseY + 20} r={1.5} fill="#7B61FF" />
            </g>
          );
        })}
      </svg>

      {/* ── Image nodes — floating islands ─────────────────── */}
      {STEPS.map((step, i) => (
        <div
          key={i}
          data-roadmap-node
          className="absolute z-[2]"
          style={{
            left: `${positions[i].x}%`,
            top: `${positions[i].y}%`,
            opacity: 0,
          }}
        >
          <div
            className="avatar-float"
            style={{ animationDelay: `${i * 1.2}s` }}
          >
            {/* The round image - simple clean circle */}
            <div className="roadmap-node-img relative">
              <div
                className="overflow-hidden rounded-full"
                style={{
                  width: NODE_SIZE,
                  height: NODE_SIZE,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <Image
                  src={`/images/roadmap/roadmap${i + 1}.png`}
                  alt={step.label}
                  width={NODE_SIZE}
                  height={NODE_SIZE}
                  className="rounded-full object-cover"
                  style={{
                    width: NODE_SIZE,
                    height: NODE_SIZE,
                    filter: "brightness(0.95) saturate(1.05)",
                  }}
                  draggable={false}
                />
              </div>

              {/* Numbered badge */}
              <span
                className="absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center rounded-full font-mono text-[10px] font-bold tracking-wider z-10"
                style={{
                  background: "linear-gradient(135deg, #7B61FF, #a78bfa)",
                  color: "#07080a",
                  boxShadow:
                    "0 2px 10px rgba(123,97,255,0.4), 0 0 20px rgba(123,97,255,0.15)",
                }}
              >
                {step.num}
              </span>
            </div>

            {/* Step label */}
            <div
              className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-wider text-center"
              style={{
                top: NODE_SIZE + 14,
                color: "rgba(123,97,255,0.6)",
                textShadow: "0 0 10px rgba(123,97,255,0.2)",
              }}
            >
              {step.label}
            </div>
          </div>
        </div>
      ))}

      {/* ── Pirate decoration overlays (HTML positioned) ──── */}
      {/* These are additional subtle decorative elements */}
      <div
        data-pirate-decor
        className="absolute pointer-events-none z-[1] opacity-0"
        style={{ right: "5%", top: "3%" }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" opacity={0.15}>
          <circle cx="25" cy="25" r="22" stroke="#7B61FF" strokeWidth="0.5" strokeDasharray="3 3" />
          <line x1="25" y1="3" x2="25" y2="47" stroke="#7B61FF" strokeWidth="0.3" />
          <line x1="3" y1="25" x2="47" y2="25" stroke="#7B61FF" strokeWidth="0.3" />
          <text x="25" y="1" textAnchor="middle" fill="#7B61FF" fontSize="6" fontFamily="monospace">N</text>
        </svg>
      </div>
    </div>
  );
}
