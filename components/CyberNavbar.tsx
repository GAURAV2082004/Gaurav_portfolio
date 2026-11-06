"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "01 // ABOUT", href: "#about" },
  { label: "02 // EXP", href: "#experience" },
  { label: "03 // PROJECTS", href: "#projects" },
  { label: "04 // SKILLS", href: "#skills" },
  { label: "05 // EDU", href: "#education" },
  { label: "06 // CERTS", href: "#certifications" },
  { label: "07 // CONTACT", href: "#contact" },
];

export default function CyberNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [sysTime, setSysTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ["about", "experience", "projects", "skills", "education", "certifications", "contact"];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 160 && rect.bottom >= 160;
        }
        return false;
      });
      if (current) setActiveSection(`#${current}`);
    };

    window.addEventListener("scroll", handleScroll);

    // Update system clock
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        scrolled
          ? "bg-[#030712]/92 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
          : "bg-transparent border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Callsign & System Status */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="flex items-center gap-2 group text-white tracking-wider"
          >
            <span className="text-cyan-400 font-bold text-lg tracking-tight group-hover:text-cyan-300 transition-colors">
              GJ<span className="text-cyan-400 animate-pulse">_</span>
            </span>
            <span className="hidden sm:inline-block text-xs text-gray-400 border-l border-gray-800 pl-2">
              DEV-OS <span className="text-cyan-400/80">v4.2</span>
            </span>
          </a>

          {/* Online telemetry indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/40 border border-emerald-800/40 text-[10px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>SYS_ONLINE</span>
            <span className="text-gray-500">//</span>
            <span className="text-gray-400">18ms</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 rounded-md ${
                  isActive
                    ? "text-cyan-300 bg-cyan-950/60 border border-cyan-700/50 shadow-[0_0_12px_rgba(0,245,255,0.2)]"
                    : "text-gray-400 hover:text-cyan-300 hover:bg-gray-900/60"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right HUD: System Clock & CTA */}
        <div className="flex items-center gap-3">
          {sysTime && (
            <span className="hidden xl:inline-block text-[11px] text-gray-500 font-mono tracking-wider bg-gray-950/80 px-2.5 py-1 rounded border border-gray-800">
              {sysTime}
            </span>
          )}

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gray-950 bg-cyan-400 hover:bg-cyan-300 px-3.5 py-1.5 rounded-md transition-all shadow-[0_0_15px_rgba(0,245,255,0.3)] hover:shadow-[0_0_20px_rgba(0,245,255,0.5)]"
          >
            <span>UPLINK</span>
            <span>→</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-900/80 border border-gray-800 text-gray-400 hover:text-cyan-300"
            aria-label="Toggle navigation terminal"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Terminal Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-[#050811]/98 border-b border-cyan-500/20 px-6 py-5 backdrop-blur-xl animate-fade-in font-mono">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 pb-2 border-b border-gray-800">
            // COMMAND_NAVIGATION_MENU
          </div>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-gray-300 hover:text-cyan-400 hover:bg-cyan-950/40 px-3 py-2 rounded-lg border border-transparent hover:border-cyan-800/40 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
