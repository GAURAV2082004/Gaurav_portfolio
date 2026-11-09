"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
  gravity?: number;
}

export default function InteractiveCursorFX() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const trailParticles: Particle[] = [];
    const burstParticles: Particle[] = [];

    const sparkColors = ["#ff3333", "#ff1a1a", "#ff5555", "#fbbf24", "#ffffff", "#ff4d4d"];

    let lastMouseX = -100;
    let lastMouseY = -100;

    // Track mouse move for continuous trailing glow
    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      lastMouseX = x;
      lastMouseY = y;

      // Spawn 2-3 trailing particles on motion
      for (let i = 0; i < 2; i++) {
        trailParticles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.2,
          size: 2 + Math.random() * 2.5,
          color: sparkColors[Math.floor(Math.random() * 3)],
          alpha: 0.8,
          life: 0,
          maxLife: 28 + Math.random() * 15,
        });
      }
    };

    // Trigger glowing particle firework burst on click
    const onMouseDown = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      // 30-40 spark particles radiating outwards with velocity & gravity
      const sparkCount = 32;
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6.5;

        burstParticles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 2.8,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
          alpha: 1,
          life: 0,
          maxLife: 35 + Math.random() * 25,
          gravity: 0.08,
        });
      }

      // Add a shockwave ring particle
      burstParticles.push({
        x: clickX,
        y: clickY,
        vx: 0,
        vy: 0,
        size: 8,
        color: "#ff3333",
        alpha: 0.9,
        life: 0,
        maxLife: 20,
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });

    // Animation render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update trail particles
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const p = trailParticles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) {
          trailParticles.splice(i, 1);
        }
      }

      // Render & update click burst particles
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const p = burstParticles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        if (p.gravity) p.vy += p.gravity;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();

        // If it's the shockwave ring
        if (p.vx === 0 && p.vy === 0) {
          p.size += 2.5;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.5;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        if (p.life >= p.maxLife) {
          burstParticles.splice(i, 1);
        }
      }

      // Cap array lengths for performance
      if (trailParticles.length > 80) trailParticles.splice(0, trailParticles.length - 80);
      if (burstParticles.length > 120) burstParticles.splice(0, burstParticles.length - 120);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99998] w-full h-full"
      style={{ willChange: "transform" }}
    />
  );
}
