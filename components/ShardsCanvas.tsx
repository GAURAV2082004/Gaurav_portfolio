"use client";
import { useEffect, useRef } from "react";

interface VoronoiCell {
  cx: number;
  cy: number;
  vertices: [number, number][];
  // Physics when shattered
  shattered: boolean;
  shatterTime: number;
  vx: number;
  vy: number;
  rot: number;
  vRot: number;
  baseColor: string;
  glowColor: string;
  depth: number;
}

export default function ShardsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let cells: VoronoiCell[] = [];
    const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, speed: 0 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      generateWall();
    };
    window.addEventListener("resize", handleResize);

    // Generate polygonal wall tessellation (geometric masonry/crystal plate fragments)
    const generateWall = () => {
      cells = [];
      const cols = Math.ceil(width / 75) + 1;
      const rows = Math.ceil(height / 75) + 1;
      const cellW = width / (cols - 1);
      const cellH = height / (rows - 1);

      // Create jittered seed grid
      const grid: [number, number][][] = [];
      for (let r = 0; r <= rows; r++) {
        grid[r] = [];
        for (let c = 0; c <= cols; c++) {
          const jitterX = (Math.random() - 0.5) * cellW * 0.7;
          const jitterY = (Math.random() - 0.5) * cellH * 0.7;
          grid[r][c] = [c * cellW + jitterX, r * cellH + jitterY];
        }
      }

      // Triangulate / build polygonal fragments
      const shades = [
        { base: "rgba(11, 19, 36, 0.95)", glow: "rgba(34, 211, 238, 0.4)" },
        { base: "rgba(15, 23, 42, 0.95)", glow: "rgba(59, 130, 246, 0.4)" },
        { base: "rgba(8, 14, 26, 0.98)", glow: "rgba(99, 102, 241, 0.35)" },
        { base: "rgba(13, 27, 42, 0.93)", glow: "rgba(34, 211, 238, 0.5)" },
      ];

      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const p1 = grid[r][c];
          const p2 = grid[r][c + 1];
          const p3 = grid[r + 1][c + 1];
          const p4 = grid[r + 1][c];

          // Split quad into two triangular shards with jitter
          const makeCell = (pts: [number, number][]): VoronoiCell => {
            const cx = (pts[0][0] + pts[1][0] + pts[2][0]) / 3;
            const cy = (pts[0][1] + pts[1][1] + pts[2][1]) / 3;
            const style = shades[Math.floor(Math.random() * shades.length)];
            return {
              cx,
              cy,
              vertices: pts,
              shattered: false,
              shatterTime: 0,
              vx: 0,
              vy: 0,
              rot: 0,
              vRot: 0,
              baseColor: style.base,
              glowColor: style.glow,
              depth: Math.random() * 0.6 + 0.7,
            };
          };

          cells.push(makeCell([p1, p2, p3]));
          cells.push(makeCell([p1, p3, p4]));
        }
      }
    };

    generateWall();

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouse.prevX;
      const dy = e.clientY - mouse.prevY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.prevX = e.clientX;
      mouse.prevY = e.clientY;

      // Shatter wall fragments within cursor blast radius
      const blastRadius = Math.max(90, Math.min(180, mouse.speed * 2.8));
      for (const cell of cells) {
        if (cell.shattered) continue;
        const dist = Math.hypot(cell.cx - mouse.x, cell.cy - mouse.y);
        if (dist < blastRadius) {
          cell.shattered = true;
          cell.shatterTime = Date.now();
          const angle = Math.atan2(cell.cy - mouse.y, cell.cx - mouse.x);
          const force = (1 - dist / blastRadius) * 9 + Math.random() * 3;
          cell.vx = Math.cos(angle) * force;
          cell.vy = Math.sin(angle) * force - 2.5; // fly out & up
          cell.vRot = (Math.random() - 0.5) * 0.14;
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      // Powerful shockwave breaking the wall
      const shockRadius = 260;
      for (const cell of cells) {
        const dist = Math.hypot(cell.cx - e.clientX, cell.cy - e.clientY);
        if (dist < shockRadius) {
          cell.shattered = true;
          cell.shatterTime = Date.now();
          const angle = Math.atan2(cell.cy - e.clientY, cell.cx - e.clientX);
          const force = (1 - dist / shockRadius) * 16 + 4;
          cell.vx = Math.cos(angle) * force;
          cell.vy = Math.sin(angle) * force - 4;
          cell.vRot = (Math.random() - 0.5) * 0.25;
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();

      for (const cell of cells) {
        ctx.save();

        if (cell.shattered) {
          // Physics step for broken fragment
          const elapsed = (now - cell.shatterTime) / 1000;
          cell.cx += cell.vx;
          cell.cy += cell.vy;
          cell.vy += 0.18; // gravity pulling piece down
          cell.vx *= 0.985;
          cell.rot += cell.vRot;

          // Rebuild / reset piece smoothly after 3.8s
          if (elapsed > 3.8) {
            cell.shattered = false;
            cell.vx = 0;
            cell.vy = 0;
            cell.rot = 0;
            cell.vRot = 0;
          }

          ctx.translate(cell.cx, cell.cy);
          ctx.rotate(cell.rot);
          ctx.scale(Math.max(0.1, 1 - elapsed * 0.22), Math.max(0.1, 1 - elapsed * 0.22));

          // Draw floating shattered fragment with glowing molten fracture edge
          ctx.beginPath();
          const [v0, ...rest] = cell.vertices;
          ctx.moveTo(v0[0] - cell.cx, v0[1] - cell.cy);
          for (const v of rest) {
            ctx.lineTo(v[0] - cell.cx, v[1] - cell.cy);
          }
          ctx.closePath();

          ctx.fillStyle = cell.baseColor;
          ctx.shadowColor = cell.glowColor;
          ctx.shadowBlur = 18;
          ctx.fill();

          ctx.strokeStyle = cell.glowColor;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        } else {
          // Intact wall fragment in background
          ctx.beginPath();
          const [v0, ...rest] = cell.vertices;
          ctx.moveTo(v0[0], v0[1]);
          for (const v of rest) {
            ctx.lineTo(v[0], v[1]);
          }
          ctx.closePath();

          // Mouse proximity slight glow reveal
          const distToMouse = Math.hypot(cell.cx - mouse.x, cell.cy - mouse.y);
          const isNear = distToMouse < 220;

          ctx.fillStyle = isNear ? "rgba(15, 28, 50, 0.92)" : cell.baseColor;
          ctx.fill();

          // Seams / fracture lines between fragments
          ctx.strokeStyle = isNear
            ? `rgba(34, 211, 238, ${Math.max(0.2, (1 - distToMouse / 220) * 0.7)})`
            : "rgba(30, 41, 59, 0.45)";
          ctx.lineWidth = isNear ? 1.2 : 0.6;
          ctx.stroke();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.88 }}
    />
  );
}
