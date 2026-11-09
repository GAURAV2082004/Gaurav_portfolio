"use client";

import { useEffect, useState } from "react";
import CyberBoxAgent from "./CyberBoxAgent";
import DraggableWindow from "./DraggableWindow";
import { sound } from "@/lib/audio";

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
    "[KERNEL] System core v4.2 initialized in 14ms",
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
      }, 50);
    } else if (!isDeleting && displayedRole.length === current.length) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
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
      "[DB:MYSQL] Query execution cached in 180ms",
      "[AI:WHISPER] Audio stream parsed to structured JSON",
      "[SCRAPER] 6-stage fallback parser reached 95.4% accuracy",
      "[ERP:SYNC] 2-way Google Sheets webhook synchronized",
      "[SENTINEL] SSL cert countdown verified (284 days valid)",
    ];

    const interval = setInterval(() => {
      const nextLog = extraLogs[Math.floor(Math.random() * extraLogs.length)];
      setSandboxLog((prev) => [...prev.slice(-3), nextLog]);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        {/* Top OS Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 px-4 py-2.5 rounded-lg bg-[#0a0a0a]/80 border border-[#ff3333]/25 backdrop-blur-md text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff3333] animate-pulse" />
            <span className="text-[#ff4d4d] font-bold">GAURAV-JADLI.DEV</span>
            <span className="text-neutral-700">//</span>
            <span>KERNEL: v4.2_RELEASE</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="hidden sm:inline">ARCH: X86_64_AI</span>
            <span className="hidden md:inline text-neutral-700">//</span>
            <span className="text-emerald-400 font-bold">STATUS: OPERATIONAL</span>
            <span className="text-neutral-700">//</span>
            <span className="text-[#ff4d4d] font-bold">SYS_LATENCY: 18ms</span>
          </div>
        </div>

        {/* Main Grid: Headline & Interactive Draggable Terminal */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Big Headline & Bio (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff3333]/10 border border-[#ff3333]/40 text-xs font-mono text-[#ff4d4d]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff3333] animate-ping" />
              <span>AUTONOMOUS SYSTEMS &amp; AI DEVELOPER</span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-none">
                GAURAV <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff3333] via-[#ff5555] to-orange-500 animate-text-glitch">
                  JADLI
                </span>
              </h1>
            </div>

            {/* Terminal Typing Line */}
            <div className="h-12 flex items-center font-mono">
              <div className="text-sm sm:text-base text-neutral-200 flex items-center gap-2 bg-[#0a0a0a]/90 px-4 py-2.5 rounded-lg border border-[#ff3333]/30 w-full overflow-hidden shadow-inner">
                <span className="text-[#ff3333] flex-shrink-0">&gt;</span>
                <span className="truncate">{displayedRole}</span>
                <span className="w-2 h-4 bg-[#ff3333] animate-typing-cursor inline-block flex-shrink-0" />
              </div>
            </div>

            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              Computer Engineering student at{" "}
              <span className="text-[#ff4d4d] font-medium">Pillai College of Engineering, University of Mumbai</span>{" "}
              (Graduating 2026). Specializing in high-throughput automation pipelines, autonomous scraping engines
              cataloging 10,000+ SKUs, real-time uptime sentinels monitoring 200+ domains, and enterprise ERP telemetry.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono">
              <a
                href="#projects"
                onClick={() => sound.playClick(1000)}
                className="btn-cyber px-6 py-3.5 bg-[#ff3333] hover:bg-[#ff1a1a] text-black font-extrabold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(255,51,51,0.4)] hover:shadow-[0_0_35px_rgba(255,51,51,0.6)] transition-all cursor-pointer"
              >
                <span>[▶ VIEW_PROJECTS()]</span>
              </a>

              <a
                href="#contact"
                onClick={() => sound.playClick(900)}
                className="btn-cyber px-6 py-3.5 bg-neutral-950/90 hover:bg-neutral-900 text-[#ff4d4d] border border-[#ff3333]/50 hover:border-[#ff3333] font-bold text-sm tracking-wider flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>[&gt;_ INITIALIZE_CONTACT]</span>
              </a>

              <a
                href="https://github.com/GAURAV2082004"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-4 py-3.5 text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-[#ff3333]/40 rounded-lg transition-colors flex items-center gap-2 bg-[#0a0a0a]/60"
              >
                <span>🐙 GITHUB_REPO ↗</span>
              </a>

              <a
                href="https://linkedin.com/in/gaurav-jadli-00a892289"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-4 py-3.5 text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-[#ff3333]/40 rounded-lg transition-colors flex items-center gap-2 bg-[#0a0a0a]/60"
              >
                <span>💼 LINKEDIN ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Draggable AI Agent Sandbox (5 cols) */}
          <div className="lg:col-span-5 relative">
            <DraggableWindow
              title="agent_orchestrator.sh"
              badge="LIVE TELEMETRY"
              className="relative"
            >
              {/* Dedicated Embedded Agent Cursor */}
              <CyberBoxAgent
                agent={{
                  id: "agent-01",
                  name: "Agent 01",
                  role: "Scraper",
                  color: "#ff3333",
                }}
                waypoints={[
                  {
                    xPercent: 18,
                    yPercent: 70,
                    action: "type",
                    targetLabel: "COMMAND_BUFFER",
                    statusText: "Injecting DOM crawler queue...",
                    typeText: "python3 scrape.py --skus=10482",
                    pause: 2600,
                  },
                  {
                    xPercent: 42,
                    yPercent: 36,
                    action: "highlight",
                    targetLabel: "LOG_STREAM",
                    statusText: "Auditing: 10,000+ SKUs parsed",
                    pause: 2200,
                  },
                  {
                    xPercent: 68,
                    yPercent: 88,
                    action: "click",
                    targetLabel: "UPTIME_METRIC",
                    statusText: "Pinging benchmark: 99.98%",
                    pause: 2000,
                  },
                ]}
              />

              {/* Console Body */}
              <div className="p-4 sm:p-5 font-mono text-xs space-y-3 bg-[#050505]/95 min-h-[220px]">
                <div className="text-neutral-500 text-[11px] pb-2 border-b border-neutral-800/80 flex items-center justify-between">
                  <span>// Multi-Agent Execution Node (Target Sandbox)</span>
                  <span className="text-[#ff4d4d] text-[9px] animate-pulse">● DRAGGABLE WINDOW</span>
                </div>

                <div className="space-y-2">
                  {sandboxLog.map((log, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#ff3333] flex-shrink-0">&gt;</span>
                      <span className="text-neutral-300 leading-relaxed font-mono">{log}</span>
                    </div>
                  ))}
                </div>

                {/* Blinking input simulation line */}
                <div className="pt-2 flex items-center gap-2 text-neutral-200 border-t border-neutral-900">
                  <span className="text-[#ff3333]">&gt;</span>
                  <span className="text-neutral-400 text-[11px]">waiting for next agent packet...</span>
                  <span className="w-2 h-4 bg-[#ff3333] animate-pulse" />
                </div>
              </div>

              {/* Diagnostics Footer Bar */}
              <div className="grid grid-cols-3 gap-1 px-4 py-2.5 bg-[#0a0a0a] border-t border-[#ff3333]/20 text-center font-mono text-[10px]">
                <div>
                  <span className="text-neutral-500">CPU LOAD: </span>
                  <span className="text-[#ff4d4d] font-bold">14%</span>
                </div>
                <div>
                  <span className="text-neutral-500">LATENCY: </span>
                  <span className="text-emerald-400 font-bold">&lt; 180ms</span>
                </div>
                <div>
                  <span className="text-neutral-500">UPTIME: </span>
                  <span className="text-blue-400 font-bold">99.98%</span>
                </div>
              </div>
            </DraggableWindow>
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
              className="cyber-panel cyber-panel-hover p-4 sm:p-5 rounded-xl border border-[#ff3333]/20 transition-all duration-300 bg-[#0a0a0a]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-neutral-500 uppercase tracking-wider">{item.label}</span>
                <span className="text-lg">{item.icon}</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {item.val}
              </div>
              <div className="text-[11px] text-[#ff4d4d] mt-1">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
