"use client";
import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

export default function InteractiveCursorFX() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const computedCursor = window.getComputedStyle(target).cursor;
      setIsPointer(
        computedCursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null
      );
    };

    const handleClick = (e: MouseEvent) => {
      const colors = ["#ff3333", "#ffcc00", "#33ccff", "#ff66cc", "#33ff66", "#ffffff"];
      const newParticles: Particle[] = Array.from({ length: 28 }).map((_, i) => {
        const angle = (i / 28) * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        return {
          id: Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 3 + Math.random() * 5,
        };
      });
      setParticles((prev) => [...prev, ...newParticles]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    let animationFrameId: number;
    const updateParticles = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.15,
            size: p.size * 0.93,
          }))
          .filter((p) => p.size > 0.5)
      );
      animationFrameId = requestAnimationFrame(updateParticles);
    };
    animationFrameId = requestAnimationFrame(updateParticles);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div
        className={`absolute rounded-full border border-red-500/80 transition-transform duration-100 ease-out flex items-center justify-center ${
          isPointer ? "w-12 h-12 bg-red-500/10 scale-125" : "w-8 h-8 scale-100"
        }`}
        style={{
          transform: `translate3d(${position.x - (isPointer ? 24 : 16)}px, ${position.y - (isPointer ? 24 : 16)}px, 0)`,
        }}
      >
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
      </div>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
