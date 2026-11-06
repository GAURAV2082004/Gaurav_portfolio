"use client";

import { useEffect, useRef } from "react";

export default function CyberBackground() {
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

    // Floating data packets / ambient stars
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      char?: string;
    }

    const chars = ["0", "1", "0x", "SYS", "AI", "API", "200", "DOM"];
    const colors = ["#00f5ff", "#3b82f6", "#10b981", "#a855f7"];
    const particles: Particle[] = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.2 - Math.random() * 0.4,
      size: Math.random() > 0.7 ? 9 : 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.15 + Math.random() * 0.35,
      char: Math.random() > 0.65 ? chars[Math.floor(Math.random() * chars.length)] : undefined,
    }));

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle ambient glow spots
      const gradient = ctx.createRadialGradient(
        width * 0.2,
        height * 0.15,
        10,
        width * 0.2,
        height * 0.15,
        width * 0.45
      );
      gradient.addColorStop(0, "rgba(0, 245, 255, 0.04)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render floating cyber packets
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;

        if (p.char) {
          ctx.font = "10px monospace";
          ctx.fillText(p.char, p.x, p.y);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Dense micro-grid */}
      <div className="absolute inset-0 cyber-grid-dense opacity-20" />

      {/* Radial Ambient Glow Orbs */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] animate-cyber-pulse pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-[650px] h-[650px] bg-blue-600/10 rounded-full blur-[160px] animate-cyber-pulse pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[150px] animate-cyber-pulse pointer-events-none" style={{ animationDelay: "4s" }} />

      {/* Floating Canvas Elements */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 cyber-scanlines pointer-events-none opacity-40" />
    </div>
  );
}
