"use client";

import { useState, useEffect } from "react";
import { sound } from "@/lib/audio";

const navLinks = [
  { label: "01 // ABOUT", href: "#about" },
  { label: "02 // EXP", href: "#experience" },
  { label: "03 // PROJECTS", href: "#projects" },
  { label: "04 // SKILLS", href: "#skills" },
  { label: "05 // CONTACT", href: "#contact" },
];

export default function CyberNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [sysTime, setSysTime] = useState("");
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);

          const sections = ["about", "experience", "projects", "skills", "contact"];
          const current = sections.find((sec) => {
            const el = document.getElementById(sec);
            if (el) {
              const rect = el.getBoundingClientRect();
              return rect.top <= 160 && rect.bottom >= 160;
            }
            return false;
          });
          if (current) setActiveSection(`#${current}`);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Live system clock ticker
    const updateTime = () => {
      const now = new Date();
      setSysTime(now.toLocaleTimeString("en-GB", { hour12: false }) + " UTC+5:30");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const toggleSound = () => {
    const nextState = !soundActive;
    sound.enabled = nextState;
    setSoundActive(nextState);
    if (nextState) {
      sound.playBeep();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        scrolled
          ? "bg-[#050505]/95 backdrop-blur-md border-b border-[#ff3333]/20 shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          : "bg-[#050505]/60 backdrop-blur-sm border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left: OS Telemetry Indicator */}
          <div className="flex items-center space-x-3">
            <a
              href="#hero"
              onClick={() => sound.playClick(900)}
              className="flex items-center space-x-2 text-sm font-bold tracking-wider text-white group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff3333] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff3333]" />
              </span>
              <span className="group-hover:text-[#ff3333] transition-colors">
                GAURAV-JADLI<span className="text-[#ff3333]">.DEV</span>
              </span>
            </a>

            <div className="hidden lg:flex items-center space-x-2 text-[11px] text-neutral-500 pl-2 border-l border-neutral-800">
              <span className="text-[#ff4d4d] font-bold">SYS_ONLINE // 18ms</span>
              <span>·</span>
              <span className="text-neutral-400">CPU: 14%</span>
              <span>·</span>
              <span className="text-emerald-400 font-bold">UPTIME: 99.98%</span>
            </div>
          </div>

          {/* Center/Right Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => sound.playClick()}
                  className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-[#ff4d4d] bg-[#ff3333]/15 border border-[#ff3333]/40 shadow-[0_0_12px_rgba(255,51,51,0.25)] font-bold"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/60"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Sound Toggle Button & Uplink */}
          <div className="hidden sm:flex items-center space-x-3 text-xs">
            {/* Sound Toggle Effect Button */}
            <button
              type="button"
              onClick={toggleSound}
              title="Toggle Audio Feedback"
              className={`px-2.5 py-1 rounded border text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                soundActive
                  ? "bg-[#ff3333]/20 border-[#ff3333] text-[#ff4d4d] shadow-[0_0_10px_rgba(255,51,51,0.4)]"
                  : "bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <span>{soundActive ? "🔊" : "🔇"}</span>
              <span>{soundActive ? "FX_ON" : "FX_OFF"}</span>
            </button>

            <span className="text-neutral-500 text-[11px] hidden xl:inline">{sysTime}</span>

            <a
              href="mailto:jadligaurav2082004@gmail.com"
              onClick={() => sound.playClick(1000)}
              className="px-3 py-1 rounded bg-[#ff3333]/10 hover:bg-[#ff3333]/25 text-[#ff4d4d] border border-[#ff3333]/40 font-bold text-xs transition-all shadow-[0_0_10px_rgba(255,51,51,0.2)]"
            >
              [UPLINK]
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className="p-1.5 rounded border border-neutral-800 text-xs text-neutral-300"
            >
              {soundActive ? "🔊" : "🔇"}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-neutral-400 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <span className="text-sm">{menuOpen ? "[✕]" : "[☰]"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-[#050505]/98 border-b border-[#ff3333]/30 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                sound.playClick();
                setMenuOpen(false);
              }}
              className="block px-3 py-2 rounded text-xs text-neutral-300 hover:text-[#ff4d4d] hover:bg-neutral-900 font-bold"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-500 flex justify-between items-center">
            <span>{sysTime}</span>
            <span className="text-emerald-400">STATUS: OPERATIONAL</span>
          </div>
        </div>
      )}
    </header>
  );
}
