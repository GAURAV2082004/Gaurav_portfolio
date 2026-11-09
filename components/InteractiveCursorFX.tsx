"use client";

import { useEffect, useRef } from "react";

interface SparkParticle {
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
    // Only mount on desktop/pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

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

    // Particle pools
    const trailParticles: SparkParticle[] = [];
    const burstParticles: SparkParticle[] = [];

    const sparkPalette = [
      "#ff3333",
      "#ffffff",
      "#ff4d4d",
      "#ff8080",
      "#ff1a1a",
      "#fca5a5",
    ];

    // Mouse coordinates & lerped follower coordinates
    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let ringSize = 24;
    let targetRingSize = 24;
    let isHoveringInteractive = false;
    let isMouseDown = false;
    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        ringX = mouseX;
        ringY = mouseY;
        hasMoved = true;
      }

      // Check if mouse is hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("[role='button']") ||
          target.classList.contains("cursor-pointer"))
      ) {
        isHoveringInteractive = true;
        targetRingSize = 40;
      } else {
        isHoveringInteractive = false;
        targetRingSize = 24;
      }

      // Spawn mouse-following red/white particle trail
      for (let i = 0; i < 2; i++) {
        trailParticles.push({
          x: mouseX + (Math.random() - 0.5) * 4,
          y: mouseY + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9 - 0.25,
          size: 1.5 + Math.random() * 2.2,
          color: sparkPalette[Math.floor(Math.random() * sparkPalette.length)],
          alpha: 0.9,
          life: 0,
          maxLife: 24 + Math.random() * 16,
        });
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      const clickX = e.clientX;
      const clickY = e.clientY;

      // Burst of 36 glowing sparks
      const sparkCount = 36;
      for (let i = 0; i < sparkCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 6.5;

        burstParticles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 2.6,
          color: sparkPalette[Math.floor(Math.random() * sparkPalette.length)],
          alpha: 1,
          life: 0,
          maxLife: 32 + Math.random() * 24,
          gravity: 0.08,
        });
      }

      // Shockwave ring
      burstParticles.push({
        x: clickX,
        y: clickY,
        vx: 0,
        vy: 0,
        size: 6,
        color: "#ff3333",
        alpha: 0.95,
        life: 0,
        maxLife: 22,
      });
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp follower ring towards mouse
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      ringSize += (targetRingSize - ringSize) * 0.18;

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
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) {
          trailParticles.splice(i, 1);
        }
      }

      // Render & update burst particles
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

        if (p.vx === 0 && p.vy === 0) {
          // Expanding Shockwave ring
          p.size += 2.8;
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

      // Render futuristic custom cursor reticle if mouse is on screen
      if (hasMoved && mouseX > 0 && mouseY > 0) {
        // Outer targeting reticle ring
        ctx.save();
        ctx.strokeStyle = isHoveringInteractive ? "#ff3333" : "rgba(255, 51, 51, 0.65)";
        ctx.lineWidth = isHoveringInteractive ? 1.8 : 1.2;
        ctx.shadowColor = "#ff3333";
        ctx.shadowBlur = isHoveringInteractive ? 14 : 6;
        ctx.beginPath();
        ctx.arc(ringX, ringY, isMouseDown ? ringSize * 0.7 : ringSize / 2, 0, Math.PI * 2);
        ctx.stroke();

        // 4 Reticle Ticks on the ring
        const r = isMouseDown ? ringSize * 0.7 : ringSize / 2;
        const tickLen = 4;
        ctx.beginPath();
        // Top tick
        ctx.moveTo(ringX, ringY - r - tickLen);
        ctx.lineTo(ringX, ringY - r + tickLen);
        // Bottom tick
        ctx.moveTo(ringX, ringY + r - tickLen);
        ctx.lineTo(ringX, ringY + r + tickLen);
        // Left tick
        ctx.moveTo(ringX - r - tickLen, ringY);
        ctx.lineTo(ringX - r + tickLen, ringY);
        // Right tick
        ctx.moveTo(ringX + r - tickLen, ringY);
        ctx.lineTo(ringX + r + tickLen, ringY);
        ctx.stroke();
        ctx.restore();

        // Center reticle dot attached directly to mouseX, mouseY
        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#ff3333";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Prevent memory buildup
      if (trailParticles.length > 70) trailParticles.splice(0, trailParticles.length - 70);
      if (burstParticles.length > 100) burstParticles.splice(0, burstParticles.length - 100);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
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
