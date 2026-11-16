"use client";
import { useEffect, useRef } from "react";

const COLORS = ["#b6ff3b", "#3bd9ff", "#ffb23b", "#c06bff", "#ff6bd0"];
const NAMES = ["Recruiter", "Teammate", "Designer", "Friend"];

// selector for blocks that get the live-build treatment
const BUILD_SEL =
  "h2.display, .role-chip, .pitch, .stat, .about-text, .facts, .card, .row, .tl, .quote, .lead";

export default function MultiplayerCursors() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth <= 520) return;

    const layer = layerRef.current;
    if (!layer) return;
    const container = layer;

    // util
    const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
    const esc = (s: string) =>
      String(s).replace(/[&<>"']/g, m =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m] ?? m)
      );

    // jobs queue — build-in blocks
    const jobs: { el: HTMLElement; t: ReturnType<typeof setTimeout> }[] = [];

    // reveal an element without cursor (fallback)
    function reveal(t: HTMLElement) {
      t.classList.remove("pre", "rv");
      t.classList.add("fillin");
      setTimeout(() => t.classList.remove("fillin"), 1000);
    }

    // set up scroll-reveal for .rv elements (non-build ones)
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) return;
          (en.target as HTMLElement).classList.add("in");
          io.unobserve(en.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    // observe build blocks
    const bio = new IntersectionObserver(
      entries => {
        entries.forEach(en => {
          if (!en.isIntersecting) return;
          bio.unobserve(en.target);
          const el = en.target as HTMLElement;
          const job = {
            el,
            t: setTimeout(() => {
              const k = jobs.findIndex(j => j.el === el);
              if (k > -1) { jobs.splice(k, 1); reveal(el); }
            }, 9000),
          };
          jobs.push(job);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
    );

    // mark build blocks
    const buildEls = Array.from(document.querySelectorAll<HTMLElement>(BUILD_SEL));
    buildEls.forEach(el => {
      el.classList.remove("rv");
      el.classList.add("pre");
      bio.observe(el);
    });
    // regular reveal for non-build .rv elements
    document.querySelectorAll<HTMLElement>(".rv").forEach(el => {
      if (!buildEls.includes(el)) io.observe(el);
    });
    // safety net
    setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("in");
        }
      });
    }, 1800);

    // cursor placement helper
    function place(el: HTMLElement, x: number, y: number, secs: number, instant = false) {
      el.style.transitionDuration = instant ? "0s" : secs + "s";
      el.style.transform = `translate(${x}px,${y}px)`;
    }

    function roam(el: HTMLElement, instant = false) {
      const x = rnd(24, Math.max(100, window.innerWidth - 140));
      const y = window.scrollY + rnd(90, Math.max(160, window.innerHeight - 90));
      place(el, x, y, 2.8, instant);
    }

    function setAct(cur: HTMLElement, txt: string) {
      const u = cur.querySelector("u");
      if (u) u.textContent = txt;
    }

    // drag a selection box
    async function drag(cur: HTMLElement, x: number, y: number, w: number, h: number) {
      const box = document.createElement("div");
      box.className = "sel";
      box.style.left = x + "px";
      box.style.top = y + "px";
      box.innerHTML = "<i></i><i></i><i></i><i></i><em>0 × 0</em>";
      container.insertBefore(box, cur);
      const label = box.querySelector("em")!;
      void box.offsetWidth; // force reflow
      box.style.width = w + "px";
      box.style.height = h + "px";
      place(cur, x + w, y + h, 0.75);
      const tick = setInterval(() => {
        label.textContent = `${Math.round(box.offsetWidth)} × ${Math.round(box.offsetHeight)}`;
      }, 40);
      await wait(800);
      clearInterval(tick);
      label.textContent = `${Math.round(w)} × ${Math.round(h)}`;
      box.classList.add("done");
      return box;
    }

    const dismiss = async (box: HTMLElement) => {
      box.classList.add("out");
      await wait(500);
      box.remove();
    };

    // split text into individual char spans for typing effect
    const SKIP = "svg,canvas,script,style,textarea,select,option";
    function splitChars(root: HTMLElement): HTMLElement[] {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: n => {
          const node = n as Text;
          return node.nodeValue?.trim() && !(node.parentElement as HTMLElement).closest(SKIP)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        },
      });
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      const chars: HTMLElement[] = [];
      nodes.forEach(n => {
        const frag = document.createDocumentFragment();
        for (const ch of (n.nodeValue ?? "")) {
          if (/\s/.test(ch)) { frag.appendChild(document.createTextNode(ch)); continue; }
          const i = document.createElement("i");
          i.className = "ch";
          i.textContent = ch;
          frag.appendChild(i);
          chars.push(i);
        }
        n.parentNode?.replaceChild(frag, n);
      });
      return chars;
    }

    async function fill(cur: HTMLElement, t: HTMLElement) {
      const chars = splitChars(t);
      if (chars.length) {
        const q = chars[0].getBoundingClientRect();
        place(cur, q.left + window.scrollX, q.top + window.scrollY + q.height * 0.62, 0.55);
      } else {
        const r = t.getBoundingClientRect();
        place(cur, r.left + window.scrollX + r.width * 0.1, r.top + window.scrollY + r.height * 0.5, 0.55);
      }
      await wait(580);
      t.classList.remove("pre", "rv");
      t.classList.add(chars.length > 3 ? "shellin" : "fillin");
      setTimeout(() => t.classList.remove("shellin", "fillin"), 1100);
      if (!chars.length) {
        const r = t.getBoundingClientRect();
        place(cur, r.left + window.scrollX + r.width * 0.9, r.top + window.scrollY + r.height * 0.55, 0.8);
        await wait(850);
      } else {
        const d = Math.min(32, Math.max(7, 1500 / chars.length));
        let prev: HTMLElement | null = null;
        for (const c of chars) {
          prev?.classList.remove("caret");
          c.classList.add("on", "caret");
          prev = c;
          const q = c.getBoundingClientRect();
          place(cur, q.right + window.scrollX, q.top + window.scrollY + q.height * 0.62, d / 1000 + 0.05);
          await wait(d);
        }
        await wait(200);
        prev?.classList.remove("caret");
      }
    }

    function freeSpot(rect: DOMRect): [number, number] {
      for (let k = 0; k < 12; k++) {
        const x = rnd(24, Math.max(100, window.innerWidth - 140));
        const y = rnd(90, Math.max(160, window.innerHeight - 90));
        if (x < rect.left - 40 || x > rect.right + 40 || y < rect.top - 40 || y > rect.bottom + 40) {
          return [x, y + window.scrollY];
        }
      }
      return [24, window.scrollY + 120];
    }

    async function build(cur: HTMLElement, t: HTMLElement) {
      let r = t.getBoundingClientRect();
      if (r.bottom < 40 || r.top > window.innerHeight - 20) { reveal(t); return; }
      const pad = 6;
      setAct(cur, "drawing");
      place(cur, r.left + window.scrollX - pad, r.top + window.scrollY - pad, 0.8);
      await wait(850);
      r = t.getBoundingClientRect();
      const box = await drag(
        cur,
        r.left + window.scrollX - pad,
        r.top + window.scrollY - pad,
        r.width + pad * 2,
        r.height + pad * 2
      );
      await wait(150);
      setAct(cur, "typing");
      await fill(cur, t);
      setAct(cur, pick(["idle", "reviewing", "styling"]));
      const [x, y] = freeSpot(box.getBoundingClientRect());
      place(cur, x, y, 1.3);
      await wait(250);
      await dismiss(box);
    }

    async function life(cur: HTMLElement, i: number) {
      await wait(2200 + i * 500);
      roam(cur, true);
      let nextRoam = performance.now() + rnd(1500, 3000);
      let alive = true;
      // expose cleanup
      (cur as HTMLElement & { _kill?: () => void })._kill = () => { alive = false; };
      for (;;) {
        if (!alive) break;
        if (document.hidden) { await wait(500); continue; }
        const job = jobs.shift();
        if (job) {
          clearTimeout(job.t);
          await build(cur, job.el);
          nextRoam = performance.now() + rnd(600, 1500);
          continue;
        }
        if (performance.now() > nextRoam) {
          setAct(cur, pick(["reviewing", "editing", "styling", "idle"]));
          roam(cur);
          nextRoam = performance.now() + rnd(2600, 4200);
        } else {
          await wait(200);
        }
      }
    }

    const cursors: HTMLElement[] = [];
    NAMES.forEach((name, i) => {
      const el = document.createElement("div");
      el.className = "cursor";
      el.style.setProperty("--c", COLORS[i % COLORS.length]);
      el.innerHTML = `<svg viewBox="0 0 16 16"><path d="M1 1l5.5 14 2-5.7L14.2 7.3z"/></svg><b>${esc(name)}</b><u>idle</u>`;
      container.appendChild(el);
      cursors.push(el);
      life(el, i);
    });

    return () => {
      io.disconnect();
      bio.disconnect();
      cursors.forEach(c => {
        (c as HTMLElement & { _kill?: () => void })._kill?.();
        c.remove();
      });
      // restore any .pre elements that weren't built
      document.querySelectorAll<HTMLElement>(".pre").forEach(el => {
        el.classList.remove("pre");
        el.classList.add("in");
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    };
  }, []);

  return (
    <div
      id="cursors"
      ref={layerRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 70 }}
    />
  );
}
