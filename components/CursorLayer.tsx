"use client";

import React, { useEffect, useRef } from "react";
import { cursorQueue, BuildJob } from "@/lib/cursorQueue";

const CURSOR_CONFIGS = [
  { name: "Recruiter", color: "#b6ff3b" },
  { name: "Teammate", color: "#3bd9ff" },
  { name: "Designer", color: "#ffb23b" },
  { name: "You", color: "#ff6bd0" },
];

export default function CursorLayer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (cursorQueue.isFastMode) return;

    const layer = containerRef.current;
    if (!layer) return;

    let isAlive = true;

    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

    function place(el: HTMLElement, x: number, y: number, secs: number, instant = false) {
      el.style.transitionDuration = instant ? "0s" : `${secs}s`;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    function roam(el: HTMLElement, instant = false) {
      const x = rnd(24, Math.max(100, window.innerWidth - 160));
      const y = window.scrollY + rnd(90, Math.max(160, window.innerHeight - 100));
      place(el, x, y, 2.6, instant);
    }

    function setAct(cur: HTMLElement, txt: string) {
      const u = cur.querySelector("u");
      if (u) u.textContent = txt;
    }

    // Drag out an empty Figma-style selection box
    async function dragBox(cur: HTMLElement, x: number, y: number, w: number, h: number) {
      const box = document.createElement("div");
      box.className = "sel";
      box.setAttribute("aria-hidden", "true");
      box.style.left = `${x}px`;
      box.style.top = `${y}px`;
      box.innerHTML = "<i></i><i></i><i></i><i></i><em>0 × 0</em>";
      layer!.insertBefore(box, cur);

      const label = box.querySelector("em")!;
      void box.offsetWidth; // Force reflow
      box.style.width = `${w}px`;
      box.style.height = `${h}px`;

      place(cur, x + w, y + h, 0.75);

      const startTime = performance.now();
      const interval = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const p = Math.min(1, elapsed / 750);
        label.textContent = `${Math.round(w * p)} × ${Math.round(h * p)}`;
      }, 40);

      await wait(750);
      clearInterval(interval);
      label.textContent = `${Math.round(w)} × ${Math.round(h)}`;
      box.classList.add("done");
      return box;
    }

    async function dismissBox(box: HTMLElement) {
      box.classList.add("out");
      await wait(450);
      box.remove();
    }

    function findFreeSpot(rect: DOMRect): [number, number] {
      for (let k = 0; k < 10; k++) {
        const x = rnd(24, Math.max(100, window.innerWidth - 160));
        const y = rnd(80, Math.max(140, window.innerHeight - 80));
        if (
          x < rect.left - 40 ||
          x > rect.right + 40 ||
          y < rect.top - 40 ||
          y > rect.bottom + 40
        ) {
          return [x, y + window.scrollY];
        }
      }
      return [24, window.scrollY + 120];
    }

    // Reveal typed text or sweep graphics
    async function revealContent(cur: HTMLElement, job: BuildJob) {
      job.onStart?.();
      const el = job.element;
      const chars = Array.from(el.querySelectorAll<HTMLElement>('[data-typed-char="true"]'));

      if (chars.length > 0) {
        // Step cursor into first character position
        const firstPos = chars[0].getBoundingClientRect();
        place(cur, firstPos.left + window.scrollX, firstPos.top + window.scrollY + 4, 0.45);
        await wait(450);

        // Typing speed: 24-32ms for short, ~7ms for long text
        const delay = Math.min(32, Math.max(7, 1400 / chars.length));

        let prev: HTMLElement | null = null;
        for (const c of chars) {
          if (!isAlive) break;
          if (prev) prev.classList.remove("caret");
          c.classList.add("on", "caret");
          prev = c;

          const q = c.getBoundingClientRect();
          place(cur, q.right + window.scrollX, q.top + window.scrollY + 4, delay / 1000 + 0.04);
          await wait(delay);
        }

        await wait(180);
        if (prev) prev.classList.remove("caret");
      } else {
        // Graphic or card block: sweep across as it wipes in
        const r = el.getBoundingClientRect();
        place(cur, r.left + window.scrollX + r.width * 0.1, r.top + window.scrollY + r.height * 0.5, 0.45);
        await wait(450);
        place(cur, r.left + window.scrollX + r.width * 0.9, r.top + window.scrollY + r.height * 0.55, 0.7);
        await wait(700);
      }

      job.onComplete?.();
    }

    async function buildBlock(cur: HTMLElement, job: BuildJob) {
      const el = job.element;
      let r = el.getBoundingClientRect();

      // If user already scrolled past, reveal immediately and continue
      if (r.bottom < 40 || r.top > window.innerHeight - 20) {
        job.onComplete?.();
        return;
      }

      const pad = 6;
      setAct(cur, "drawing");

      // 1. Move to block start
      place(cur, r.left + window.scrollX - pad, r.top + window.scrollY - pad, 0.7);
      await wait(720);

      // 2. Drag out empty selection box
      r = el.getBoundingClientRect();
      const box = await dragBox(
        cur,
        r.left + window.scrollX - pad,
        r.top + window.scrollY - pad,
        r.width + pad * 2,
        r.height + pad * 2
      );
      await wait(120);

      // 3. Step inside and type/sweep
      setAct(cur, "typing");
      await revealContent(cur, job);

      // 4. Glide to free spot and dismiss box
      setAct(cur, pick(["reviewing", "styling", "idle"]));
      const [freeX, freeY] = findFreeSpot(box.getBoundingClientRect());
      place(cur, freeX, freeY, 1.2);
      await wait(200);
      await dismissBox(box);
    }

    async function cursorWorker(cur: HTMLElement, index: number) {
      await wait(1200 + index * 400);
      roam(cur, true);

      let nextRoamTime = performance.now() + rnd(1500, 3000);

      while (isAlive) {
        if (document.hidden) {
          await wait(400);
          continue;
        }

        const job = cursorQueue.dequeue();
        if (job) {
          await buildBlock(cur, job);
          nextRoamTime = performance.now() + rnd(800, 1800);
          continue;
        }

        if (performance.now() > nextRoamTime) {
          setAct(cur, pick(["reviewing", "idle", "styling"]));
          roam(cur);
          nextRoamTime = performance.now() + rnd(2800, 4200);
        } else {
          await wait(180);
        }
      }
    }

    // Spawn 4 cursors
    const cursorNodes: HTMLElement[] = [];
    CURSOR_CONFIGS.forEach((cfg, i) => {
      const cur = document.createElement("div");
      cur.className = "cursor";
      cur.setAttribute("aria-hidden", "true");
      cur.style.setProperty("--c", cfg.color);
      cur.innerHTML = `
        <svg viewBox="0 0 16 16"><path d="M1 1l5.5 14 2-5.7L14.2 7.3z"/></svg>
        <b>${cfg.name}</b>
        <u>idle</u>
      `;
      layer.appendChild(cur);
      cursorNodes.push(cur);
      cursorWorker(cur, i);
    });

    return () => {
      isAlive = false;
      cursorNodes.forEach((node) => node.remove());
    };
  }, []);

  return (
    <div
      id="cursors"
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 70,
      }}
    />
  );
}
