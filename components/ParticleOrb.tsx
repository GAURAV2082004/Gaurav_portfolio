"use client";
import { useEffect, useRef } from "react";

interface ParticleOrbProps {
  n?: number;
  ring?: boolean;
  radius?: number;
  speed?: number;
  caption?: string;
}

const PALETTE = ["#ff3b4a", "#ffb23b", "#b6ff3b", "#3bd9ff", "#c06bff", "#ff6bd0", "#ffffff"];

export default function ParticleOrb({ n = 190, ring = false, radius = 0.4, speed = 0.004, caption }: ParticleOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pts: { x: number; y: number; z: number; c: string; s: number; a: number }[] = [];
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = Math.PI * (3 - Math.sqrt(5)) * i;
      pts.push({
        x: Math.cos(th) * r, y, z: Math.sin(th) * r,
        c: PALETTE[i % PALETTE.length],
        s: 3 + (i * 7 % 5),
        a: (i * 37) % 360,
      });
    }

    let w = 0, h = 0, dpr = 1, ang = 0, rafId = 0, alive = true, visible = true;

    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();

    const resizeObs = new ResizeObserver(() => size());
    resizeObs.observe(canvas);

    const intObs = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) loop();
    });
    intObs.observe(canvas);

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * radius;
      const cx = w / 2, cy = h / 2;
      const ca = Math.cos(ang), sa = Math.sin(ang);
      const tilt = 0.35, ct = Math.cos(tilt), st = Math.sin(tilt);

      const proj = pts.map(p => {
        let x = p.x * ca - p.z * sa;
        const z = p.x * sa + p.z * ca;
        let yv = ring ? p.y * 0.42 : p.y;
        const y2 = yv * ct - z * st;
        const z2 = yv * st + z * ct;
        const k = 1 / (1.9 - z2 * 0.6);
        return { sx: cx + x * R * k * 1.9, sy: cy + y2 * R * k * 1.9, z: z2, k, p };
      }).sort((a, b) => a.z - b.z);

      for (const q of proj) {
        const s = Math.abs(q.p.s * q.k * 1.7);
        const alpha = Math.min(1, 0.35 + (q.z + 1) * 0.32);
        ctx!.save();
        ctx!.translate(q.sx, q.sy);
        ctx!.rotate((q.p.a + ang * 90) * Math.PI / 180);
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = q.p.c;
        ctx!.shadowColor = q.p.c;
        ctx!.shadowBlur = 8;
        ctx!.beginPath();
        ctx!.moveTo(0, -s);
        ctx!.lineTo(s * 0.9, s * 0.8);
        ctx!.lineTo(-s * 0.9, s * 0.8);
        ctx!.closePath();
        ctx!.fill();
        ctx!.restore();
      }
    }

    function loop() {
      if (!alive || !visible) return;
      ang += speed;
      draw();
      rafId = requestAnimationFrame(loop);
    }
    draw();
    loop();

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      resizeObs.disconnect();
      intObs.disconnect();
    };
  }, [n, ring, radius, speed]);

  return (
    <div ref={wrapRef} className="orb-box">
      <canvas ref={canvasRef} />
      {caption && <small>{caption}</small>}
    </div>
  );
}
