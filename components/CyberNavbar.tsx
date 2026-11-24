"use client";

import { useState, useEffect } from "react";
import { sound } from "@/lib/audio";

export const NAV_SECTIONS = [
  { id: "about", label: "[01] About" },
  { id: "experience", label: "[02] Experience" },
  { id: "projects", label: "[03] Projects" },
  { id: "skills", label: "[04] Skills" },
  { id: "education", label: "[05] Education" },
  { id: "certifications", label: "[06] Certifications" },
  { id: "contact", label: "[07] Contact" },
];

export default function CyberNavbar() {
  const [active, setActive] = useState("about");
  const [soundOn, setSoundOn] = useState(false);

  // Scroll-spy
  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { rootMargin: "-30% 0px -40% 0px" }
    );
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById("progress-bar");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? Math.min(1, window.scrollY / h) : 0})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleSound = () => {
    setSoundOn((prev) => {
      sound.enabled = !prev;
      if (!prev) sound.playClick(1200);
      return !prev;
    });
  };

  return (
    <>
      {/* Pill Nav */}
      <nav className="nav" id="nav" aria-label="Sections">
        <a href="#home" className="flex items-center" aria-label="Home">
          <span className="dot" aria-hidden="true" />
        </a>
        {NAV_SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            data-id={id}
            className={active === id ? "on" : ""}
            onClick={() => sound.playClick()}
          >
            {label}
          </a>
        ))}
        {/* Sound toggle button */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundOn ? "Mute sounds" : "Enable sounds"}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            padding: "6px 12px",
            borderRadius: 999,
            border: "1px solid var(--line)",
            background: soundOn ? "var(--accent)" : "transparent",
            color: soundOn ? "#fff" : "var(--mute)",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "all .2s",
            marginLeft: 4,
          }}
        >
          {soundOn ? "🔊 FX" : "🔇 FX"}
        </button>
      </nav>

      {/* Scroll progress bar */}
      <div
        id="progress-bar"
        className="progress"
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          height: 3,
          width: "100%",
          transformOrigin: "0 50%",
          transform: "scaleX(0)",
          zIndex: 60,
          background: "linear-gradient(90deg,var(--accent-deep),var(--accent),#ff4fa3)",
        }}
      />
    </>
  );
}
