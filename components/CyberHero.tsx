"use client";

import { useEffect, useState } from "react";

const ROLES = [
  "Software Developer // Systems & AI Automation",
  "Full-Stack Engineer [PHP 8 · Next.js · Python]",
  "Autonomous Automation Architect [10k+ SKUs]",
  "Real-Time DevOps Sentinel [200+ Domains]",
  "AI & Voice Orchestrator [Whisper · GPT-4o]",
];

export default function CyberHero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [sandboxLog, setSandboxLog] = useState<string[]>([
    "[INIT] System kernel v4.2 loaded in 14ms",
    "[AGENT-01] DOM crawler active: 10,000+ SKUs indexed",
    "[AGENT-02] Uptime sentinel healthy: 200+ domains online",
  ]);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedRole.length < current.length) {
      timer = setTimeout(() => {
        setDisplayedRole(current.slice(0, displayedRole.length + 1));
      }, 55);
    } else if (!isDeleting && displayedRole.length === current.length) {
      timer = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayedRole.length > 0) {
      timer = setTimeout(() => {
        setDisplayedRole(displayedRole.slice(0, -1));
      }, 25);
    } else if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  // Simulated live telemetry stream in sandbox terminal
  useEffect(() => {
    const extraLogs = [
      "[DB:MYSQL] Query execution cached in 200ms",
      "[AI:WHISPER] Audio stream parsed to structured JSON",
      "[SCRAPER] 6-stage fallback parser reached 95.4% accuracy",
      "[ERP:SYNC] 2-way Google Sheets webhook synchronized",
      "[SENTINEL] SSL cert countdown verified (284 days valid)",
    ];

    const interval = setInterval(() => {
      const nextLog = extraLogs[Math.floor(Math.random() * extraLogs.length)];
      setSandboxLog((prev) => [...prev.slice(-4), nextLog]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        {/* Top OS Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 px-4 py-2.5 rounded-lg bg-gray-950/70 border border-cyan-500/20 backdrop-blur-md text-[11px] font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 font-bold">GAURAV-JADLI.DEV</span>
            <span className="text-gray-600">//</span>
            <span>SYSTEM_KERNEL: v4.2</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="hidden sm:inline">ARCH: X86_64_AI</span>
            <span className="hidden md:inline text-gray-600">//</span>
            <span className="text-emerald-400 font-bold">STATUS: OPERATIONAL</span>
            <span className="text-gray-600">//</span>
            <span className="text-cyan-400 font-bold">6 AGENTS ONLINE</span>
          </div>
        </div>

        {/* Main Grid: Headline & Terminal Diagnostics */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Big Headline & Bio (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-xs font-mono text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>AUTONOMOUS SYSTEMS &amp; AI DEVELOPER</span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-none">
                GAURAV <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 animate-text-glitch">
                  JADLI
                </span>
              </h1>
            </div>

            {/* Terminal Typing Line */}
            <div className="h-12 flex items-center font-mono">
              <div className="text-sm sm:text-lg text-cyan-300 flex items-center gap-2 bg-gray-950/80 px-4 py-2 rounded-lg border border-cyan-500/30 w-full overflow-hidden">
                <span className="text-cyan-500 flex-shrink-0">&gt;</span>
                <span className="truncate">{displayedRole}</span>
                <span className="w-2 h-5 bg-cyan-400 animate-typing-cursor inline-block flex-shrink-0" />
              </div>
            </div>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              Computer Engineering student at{" "}
              <span className="text-cyan-300 font-medium">Pillai College of Engineering, University of Mumbai</span>{" "}
              (Graduating 2026). Specializing in high-throughput automation pipelines, autonomous scraping engines
              cataloging 10,000+ SKUs, real-time uptime sentinels monitoring 200+ domains, and enterprise ERP telemetry.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono">
              <a
                href="#projects"
                className="btn-cyber px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-gray-950 font-bold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.35)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all cursor-pointer"
              >
                <span>[▶ VIEW_PROJECTS()]</span>
              </a>

              <a
                href="#contact"
                className="btn-cyber px-6 py-3.5 bg-gray-900/90 hover:bg-gray-800 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 font-bold text-sm tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>[&gt;_ INITIALIZE_CONTACT]</span>
              </a>

              <a
                href="https://github.com/GAURAV2082004"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 text-xs text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700 rounded-lg transition-colors flex items-center gap-2 bg-gray-950/50"
              >
                <span>🐙 GITHUB_REPO ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive AI Agent Sandbox & Diagnostics (5 cols) */}
          <div className="lg:col-span-5">
            <div className="cyber-panel rounded-2xl overflow-hidden corner-bracket border border-cyan-500/30">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-950/90 border-b border-gray-800/80 font-mono text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-gray-300 ml-2">agent_orchestrator.sh</span>
                </div>
                <span className="text-[10px] text-cyan-400 font-bold bg-cyan-950/70 border border-cyan-800/50 px-2 py-0.5 rounded">
                  LIVE TELEMETRY
                </span>
              </div>

              {/* Console Body */}
              <div className="p-4 sm:p-5 font-mono text-xs space-y-3 bg-[#030712]/95 min-h-[220px]">
                <div className="text-gray-500 text-[11px] pb-2 border-b border-gray-800/60">
                  // Multi-Agent Execution Node (Target Sandbox)
                </div>

                <div className="space-y-2">
                  {sandboxLog.map((log, i) => (
                    <div key={i} className="flex items-start gap-2 animate-fade-in">
                      <span className="text-cyan-400 flex-shrink-0">&gt;</span>
                      <span className="text-gray-300 leading-relaxed font-mono">{log}</span>
                    </div>
                  ))}
                </div>

                {/* Blinking input simulation line */}
                <div className="pt-2 flex items-center gap-2 text-cyan-300 border-t border-gray-900">
                  <span className="text-cyan-500">&gt;</span>
                  <span className="text-gray-400 text-[11px]">waiting for next agent packet...</span>
                  <span className="w-2 h-4 bg-cyan-400 animate-pulse" />
                </div>
              </div>

              {/* Diagnostics Footer Bar */}
              <div className="grid grid-cols-3 gap-1 px-4 py-2.5 bg-gray-950 border-t border-gray-800/80 text-center font-mono text-[10px]">
                <div>
                  <span className="text-gray-500">CPU LOAD: </span>
                  <span className="text-cyan-400 font-bold">14%</span>
                </div>
                <div>
                  <span className="text-gray-500">LATENCY: </span>
                  <span className="text-emerald-400 font-bold">&lt; 200ms</span>
                </div>
                <div>
                  <span className="text-gray-500">UPTIME: </span>
                  <span className="text-blue-400 font-bold">99.98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* High-Impact 4-Column HUD Telemetry Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          {[
            { label: "PRODUCTION TOOLS", val: "7+ Built", sub: "PHP & Python in Prod", icon: "⚙️" },
            { label: "CATALOG SCALE", val: "10,000+ SKUs", sub: "Autonomous Scraper", icon: "⚡" },
            { label: "DOMAINS MONITORED", val: "200+ Sites", sub: "17 Health Vectors", icon: "🛡️" },
            { label: "UPTIME BENCHMARK", val: "99.98%", sub: "Zero Silent Outages", icon: "📊" },
          ].map((item, i) => (
            <div
              key={i}
              className="cyber-panel cyber-panel-hover p-4 sm:p-5 rounded-xl border border-gray-800 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</span>
                <span className="text-lg">{item.icon}</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {item.val}
              </div>
              <div className="text-[11px] text-cyan-400/80 mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
