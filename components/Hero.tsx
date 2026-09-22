"use client";
import { useEffect, useState } from "react";

const titles = [
  "Software Engineer",
  "Full-Stack Developer",
  "AI & Automation Builder",
  "Backend Developer",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  // Typewriter
  useEffect(() => {
    const current = titles[titleIndex];
    let timeout: NodeJS.Timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIndex]);

  // Floating particles
  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-950"
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-cyan-400 pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0.15 + Math.random() * 0.25,
            animation: `float ${4 + p.delay}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-4 animate-fade-in">
          Hello, World! I&apos;m
        </p>

        {/* Shimmer name */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
          <span className="text-white">Gaurav </span>
          <span className="animate-shimmer">Jadli</span>
        </h1>

        <div className="h-10 flex items-center justify-center mb-8">
          <span className="text-2xl md:text-3xl text-gray-300 font-light">
            {displayed}
            <span className="inline-block w-0.5 h-7 bg-cyan-400 ml-1 animate-pulse align-middle" />
          </span>
        </div>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          B.Tech Computer Engineering student at Pillai College of Engineering, University of Mumbai.
          Building production-grade tools, AI integrations, and data platforms.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="mailto:jadligaurav2082004@gmail.com"
            data-hover
            className="btn-magnetic relative overflow-hidden px-7 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold rounded-xl transition-all duration-200 animate-glow-pulse group"
          >
            <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12 pointer-events-none" />
            Get In Touch ✉️
          </a>
          <a
            href="#projects"
            data-hover
            className="btn-magnetic px-7 py-3.5 border border-gray-700 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 font-bold rounded-xl transition-all duration-200 hover:bg-cyan-500/5"
          >
            View Projects →
          </a>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          {[
            { label: "jadligaurav2082004@gmail.com", href: "mailto:jadligaurav2082004@gmail.com" },
            { label: "linkedin.com/in/gauravjadli04", href: "https://linkedin.com/in/gauravjadli04" },
            { label: "+91 9920301770", href: "tel:+919920301770" },
          ].map((link, i) => (
            <a
              key={i}
              href={link.href}
              data-hover
              className="text-gray-500 hover:text-cyan-400 transition-colors font-mono hover:underline underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-bounce">
        <span className="text-xs font-mono">scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="8" cy="7" r="2.5" fill="currentColor">
            <animate attributeName="cy" values="7;14;7" dur="1.5s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    </section>
  );
}
