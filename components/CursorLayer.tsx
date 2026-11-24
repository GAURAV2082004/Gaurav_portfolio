"use client";

import React, { useEffect, useRef } from "react";
import { cursorQueue, BuildJob } from "@/lib/cursorQueue";

const CURSOR_CONFIGS = [
  { name: "Recruiter", color: "#b6ff3b" },
  { name: "Teammate", color: "#3bd9ff" },
  { name: "Designer", color: "#ffb23b" },
  { name: "You", color: "#ff6bd0" },
];

const SKIP_TAGS = "svg,canvas,script,style,textarea,select,option,input,button";

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
      const maxX = Math.max(100, window.innerWidth - 160);
      const x = rnd(24, maxX);
      const y = window.scrollY + rnd(90, Math.max(160, window.innerHeight - 100));
      place(el, x, y, 2.6, instant);
    }

    function setAct(cur: HTMLElement, txt: string) {
      const u = cur.querySelector("u");
      if (u) u.textContent = txt;
    }

    // Drag out an empty Figma-style selection box
    async function dragBox(cur: HTMLElement, x: number, y: number, w: number, h: number): Promise<HTMLElement> {
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
      const dur = 750;
      const interval = setInterval(() => {
        const elapsed = performance.now() - startTime;
        const p = Math.min(1, elapsed / dur);
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
      for (let k = 0; k < 12; k++) {
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

    // Split text nodes into character spans if block has no pre-rendered spans
    function splitChars(root: HTMLElement): HTMLElement[] {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) =>
          n.nodeValue?.trim() && !n.parentElement?.closest(SKIP_TAGS)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT,
      });

      const textNodes: Node[] = [];
      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }

      const chars: HTMLElement[] = [];
      textNodes.forEach((node) => {
        const val = node.nodeValue || "";
        const frag = document.createDocumentFragment();
        for (const ch of val) {
          if (/\s/.test(ch)) {
            frag.appendChild(document.createTextNode(ch));
          } else {
            const span = document.createElement("span");
            span.className = "ch";
            span.textContent = ch;
            frag.appendChild(span);
            chars.push(span);
          }
        }
        node.parentNode?.replaceChild(frag, node);
      });

      return chars;
    }

    // Reveal typed text or sweep graphics
    async function fillContent(cur: HTMLElement, el: HTMLElement, isGraphic?: boolean) {
      let chars = Array.from(el.querySelectorAll<HTMLElement>('[data-typed-char="true"], .ch'));

      if (chars.length === 0 && !isGraphic) {
        chars = splitChars(el);
      }

      const R = () => el.getBoundingClientRect();

      // Step cursor into first character position or graphic start
      if (chars.length > 0) {
        const q = chars[0].getBoundingClientRect();
        place(cur, q.left + window.scrollX, q.top + window.scrollY + q.height * 0.62, 0.5);
      } else {
        const r = R();
        place(cur, r.left + window.scrollX + r.width * 0.1, r.top + window.scrollY + r.height * 0.5, 0.5);
      }
      await wait(520);

      // Reveal element container
      el.classList.remove("pre");
      el.classList.add(chars.length > 3 ? "shellin" : "fillin");
      setTimeout(() => el.classList.remove("shellin", "fillin"), 1000);

      if (chars.length === 0) {
        // Graphic or card: sweep cursor across
        const r = R();
        place(cur, r.left + window.scrollX + r.width * 0.9, r.top + window.scrollY + r.height * 0.55, 0.75);
        await wait(800);
      } else {
        // Type characters sequentially with cursor riding the caret
        const delay = Math.min(32, Math.max(8, 1400 / chars.length));
        let prev: HTMLElement | null = null;
        for (const c of chars) {
          if (!isAlive) break;
          if (prev) prev.classList.remove("caret");
          c.classList.add("on", "caret");
          prev = c;

          const q = c.getBoundingClientRect();
          place(cur, q.right + window.scrollX, q.top + window.scrollY + q.height * 0.62, delay / 1000 + 0.04);
          await wait(delay);
        }

        await wait(180);
        if (prev) prev.classList.remove("caret");
      }
    }

    async function buildBlock(cur: HTMLElement, job: BuildJob) {
      const el = job.element;
      let r = el.getBoundingClientRect();

      // If user scrolled completely past this block, reveal immediately
      if (r.bottom < -100 || r.top > window.innerHeight + 500) {
        cursorQueue.reveal(el);
        return;
      }

      const pad = 8;
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
        Math.max(48, r.width + pad * 2),
        Math.max(28, r.height + pad * 2)
      );
      await wait(140);

      // 3. Step inside and type / sweep
      setAct(cur, "typing");
      await fillContent(cur, el, job.isGraphic);

      // 4. Glide to free spot and dismiss box
      setAct(cur, pick(["reviewing", "styling", "idle"]));
      const [freeX, freeY] = findFreeSpot(box.getBoundingClientRect());
      place(cur, freeX, freeY, 1.2);
      await wait(220);
      await dismissBox(box);
    }

    let introDismissed = false;
    const onIntroDismiss = () => {
      introDismissed = true;
    };
    window.addEventListener("introDismissed", onIntroDismiss);

    async function cursorWorker(cur: HTMLElement, index: number) {
      // Wait until intro loader completes (or 2.6s fallback)
      const maxIntroWait = 2600 + index * 350;
      const startT = performance.now();
      while (!introDismissed && performance.now() - startT < maxIntroWait && isAlive) {
        await wait(100);
      }

      roam(cur, true);
      let nextRoamTime = performance.now() + rnd(1000, 2500);

      while (isAlive) {
        if (document.hidden) {
          await wait(400);
          continue;
        }

        const job = cursorQueue.dequeue();
        if (job) {
          if (job.timeoutId) clearTimeout(job.timeoutId);
          await buildBlock(cur, job);
          nextRoamTime = performance.now() + rnd(800, 1800);
          continue;
        }

        if (performance.now() > nextRoamTime) {
          setAct(cur, pick(["reviewing", "idle", "styling", "editing"]));
          roam(cur);
          nextRoamTime = performance.now() + rnd(2600, 4200);
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

    // Auto-discover any .live-build-target elements in DOM
    const scanDom = () => {
      document.querySelectorAll<HTMLElement>(".live-build-target").forEach((el) => {
        cursorQueue.registerBlock(el);
      });
    };
    scanDom();
    const domTimer = setTimeout(scanDom, 800);

    return () => {
      isAlive = false;
      window.removeEventListener("introDismissed", onIntroDismiss);
      clearTimeout(domTimer);
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
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
        zIndex: 70,
      }}
    />
  );
}
