"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

/**
 * DraggableAvatar — A floating 3D avatar head that can be dragged around.
 * Uses native pointer events for smooth, spring-back dragging with momentum.
 * Inspired by the reference at abbasidi0095-dot.github.io/abba-portfolio
 */
export function DraggableAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0, time: 0 });
  const animRef = useRef<number>(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  /* Spring-back animation */
  useEffect(() => {
    if (isDragging) return;

    let running = true;
    const springBack = () => {
      if (!running) return;

      posRef.current = {
        x: posRef.current.x * 0.88 + velocity.x * 0.15,
        y: posRef.current.y * 0.88 + velocity.y * 0.15,
      };
      setVelocity((v) => ({ x: v.x * 0.92, y: v.y * 0.92 }));
      setPosition({ ...posRef.current });

      // Settle rotation
      setRotation((r) => ({
        x: r.x * 0.92,
        y: r.y * 0.92,
      }));

      if (
        Math.abs(posRef.current.x) > 0.5 ||
        Math.abs(posRef.current.y) > 0.5 ||
        Math.abs(velocity.x) > 0.1 ||
        Math.abs(velocity.y) > 0.1
      ) {
        animRef.current = requestAnimationFrame(springBack);
      } else {
        posRef.current = { x: 0, y: 0 };
        setPosition({ x: 0, y: 0 });
        setRotation({ x: 0, y: 0 });
      }
    };

    animRef.current = requestAnimationFrame(springBack);
    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
    };
  }, [isDragging, velocity]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    cancelAnimationFrame(animRef.current);
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - posRef.current.x,
      y: e.clientY - posRef.current.y,
    };
    lastMouse.current = { x: e.clientX, y: e.clientY, time: Date.now() };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    posRef.current = { x: newX, y: newY };
    setPosition({ x: newX, y: newY });

    // Tilt based on drag direction
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    setRotation({
      x: Math.max(-25, Math.min(25, -dy * 0.8)),
      y: Math.max(-25, Math.min(25, dx * 0.8)),
    });

    // Track velocity
    const now = Date.now();
    const dt = now - lastMouse.current.time || 1;
    setVelocity({
      x: ((e.clientX - lastMouse.current.x) / dt) * 16,
      y: ((e.clientY - lastMouse.current.y) / dt) * 16,
    });
    lastMouse.current = { x: e.clientX, y: e.clientY, time: now };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ perspective: "800px" }}
    >
      <div
        ref={containerRef}
        className="avatar-container relative z-10"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isDragging ? 1.08 : isHovered ? 1.04 : 1})`,
          transition: isDragging
            ? "none"
            : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), scale 0.3s ease",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Glow behind avatar */}
        <div
          className="avatar-glow"
          style={{
            opacity: isDragging ? 1 : isHovered ? 0.9 : 0.6,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Subtle ring */}
        <div
          className="absolute inset-[-4px] rounded-full"
          style={{
            background: isDragging
              ? "linear-gradient(135deg, rgba(125,211,252,0.3), rgba(167,139,250,0.2), rgba(244,114,182,0.15))"
              : "linear-gradient(135deg, rgba(125,211,252,0.12), rgba(167,139,250,0.08), transparent)",
            transition: "background 0.4s ease",
            filter: "blur(2px)",
          }}
        />

        {/* Avatar image */}
        <div
          className="relative overflow-hidden rounded-full"
          style={{
            width: "clamp(150px, 22vw, 220px)",
            height: "clamp(150px, 22vw, 220px)",
          }}
        >
          <Image
            src="/images/avatars/avatar_no_bg.png"
            alt="Habiboullah Afouk — 3D Avatar"
            fill
            sizes="220px"
            priority
            className="object-cover object-top pointer-events-none select-none"
            draggable={false}
            style={{
              filter: isDragging
                ? "brightness(1.1) saturate(1.1)"
                : "brightness(1.02) saturate(1.05)",
              transition: "filter 0.3s ease",
            }}
          />
        </div>

        {/* "Drag me" tooltip — shown on hover only */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-wider uppercase text-muted pointer-events-none"
          style={{
            opacity: isHovered && !isDragging ? 1 : 0,
            transform: `translateX(-50%) translateY(${isHovered && !isDragging ? 0 : 6}px)`,
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          drag me ↕
        </div>
      </div>
    </div>
  );
}
