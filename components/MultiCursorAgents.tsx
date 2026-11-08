"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface AgentConfig {
  id: string;
  name: string;
  role: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  horizontalPercent: number;
}

const AGENTS: AgentConfig[] = [
  {
    id: "agent-01",
    name: "Agent 01",
    role: "Scraper",
    color: "#00f5ff",
    badgeBg: "rgba(0, 245, 255, 0.12)",
    badgeBorder: "rgba(0, 245, 255, 0.4)",
    horizontalPercent: 8,
  },
  {
    id: "agent-02",
    name: "Agent 02",
    role: "Sentinel",
    color: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.12)",
    badgeBorder: "rgba(16, 185, 129, 0.4)",
    horizontalPercent: 24,
  },
  {
    id: "agent-03",
    name: "Agent 03",
    role: "Optimizer",
    color: "#c084fc",
    badgeBg: "rgba(192, 132, 252, 0.12)",
    badgeBorder: "rgba(192, 132, 252, 0.4)",
    horizontalPercent: 41,
  },
  {
    id: "agent-04",
    name: "Agent 04",
    role: "Synthesizer",
    color: "#fbbf24",
    badgeBg: "rgba(251, 191, 36, 0.12)",
    badgeBorder: "rgba(251, 191, 36, 0.4)",
    horizontalPercent: 58,
  },
  {
    id: "agent-05",
    name: "Agent 05",
    role: "Architect",
    color: "#60a5fa",
    badgeBg: "rgba(96, 165, 250, 0.12)",
    badgeBorder: "rgba(96, 165, 250, 0.4)",
    horizontalPercent: 74,
  },
  {
    id: "agent-06",
    name: "Agent 06",
    role: "Auditor",
    color: "#f472b6",
    badgeBg: "rgba(244, 114, 182, 0.12)",
    badgeBorder: "rgba(244, 114, 182, 0.4)",
    horizontalPercent: 90,
  },
];

interface RealTargetDef {
  selector: string;
  name: string;
  detailText: string;
  typePayload?: string;
}

const SECTION_TARGETS: Record<string, RealTargetDef[]> = {
  hero: [
    { selector: 'a[href="#projects"]', name: "BTN: VIEW_PROJECTS", detailText: "CTA Link Verified // 200 OK" },
    { selector: 'a[href="#contact"]', name: "BTN: INITIALIZE_CONTACT", detailText: "Uplink handshake active" },
    { selector: "#hero .cyber-panel", name: "TELEMETRY_TERMINAL", detailText: "Kernel v4.2 Diagnostic Packet", typePayload: "sys_diag --cluster=online" },
    { selector: "#hero h1", name: "DEVELOPER_HEADLINE", detailText: "Gaurav Jadli // Full-Stack & AI" },
  ],
  about: [
    { selector: "#about pre", name: "CODE: MANIFEST_JSON", detailText: "Pillai College of Eng · CGPA: 6.24" },
    { selector: "#about .cyber-panel", name: "CARD: SPECIFICATION", detailText: "7+ Production Tools Shipped" },
  ],
  experience: [
    { selector: "#experience .cyber-panel", name: "TIMELINE: BLANK_ANALYTICA", detailText: "Software Engineering Intern" },
  ],
  projects: [
    { selector: "#projects button:nth-child(2)", name: "PILL: AI_&_AUTOMATION", detailText: "Filtering SKU Scraper & Whisper" },
    { selector: "#projects .cyber-panel", name: "PROJECT_SHOWCASE_CARD", detailText: "10,482 SKUs cataloged · 0 tripwires" },
  ],
  skills: [
    { selector: "#skills .cyber-panel", name: "SKILL_NODE_MATRIX", detailText: "PHP 8 · Python · MySQL 8 < 200ms" },
  ],
  education: [
    { selector: "#education .cyber-panel", name: "ACADEMIC_RECORD", detailText: "University of Mumbai · B.Tech 2026" },
  ],
  certifications: [
    { selector: "#certifications .cyber-panel", name: "CERT_HASH_VERIFIER", detailText: "Infosys, Kaggle & GrowthSchool" },
  ],
  contact: [
    { selector: '#contact input[type="text"], #contact input[name="name"]', name: "INPUT: SENDER_NAME", detailText: "Simulating transmission handshake", typePayload: "Enterprise Partner" },
    { selector: "#contact textarea", name: "INPUT: MESSAGE_BUFFER", detailText: "Encrypting message packet...", typePayload: "Uplink packet 200 OK" },
    { selector: "#contact canvas", name: "HOLOGRAPHIC_GLOBE", detailText: "Coordinates: Mumbai [19°N, 72°E]" },
  ],
};

interface AgentMotionState {
  startX: number;
  startY: number;
  curX: number;
  curY: number;
  targetX: number;
  targetY: number;
  startTime: number;
  duration: number;
  isMoving: boolean;
  phase: "docked" | "moving" | "locked" | "cooldown";
  nextActionTime: number;
}

export default function MultiCursorAgents() {
  const [mounted, setMounted] = useState(false);
  const [agentsActive, setAgentsActive] = useState(true);
  const [isDeployed, setIsDeployed] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobile, setIsMobile] = useState(false);

  // Direct DOM Element Refs (ZERO React state in the animation loop!)
  const cursorElsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const badgeSubElsRef = useRef<Record<string, HTMLSpanElement | null>>({});
  const rippleElsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const laserBoxElRef = useRef<HTMLDivElement | null>(null);
  const laserLabelElRef = useRef<HTMLSpanElement | null>(null);

  // High-performance motion states in Ref
  const motionStatesRef = useRef<Record<string, AgentMotionState>>({});
  const isDeployedRef = useRef(false);
  const activeSectionRef = useRef("hero");
  const animFrameIdRef = useRef<number | null>(null);

  const getRailDockX = useCallback((agent: AgentConfig) => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    return Math.max(16, Math.min(w - 60, (agent.horizontalPercent / 100) * w));
  }, []);

  // Initialize motion states
  useEffect(() => {
    setMounted(true);
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    AGENTS.forEach((agent) => {
      const x = getRailDockX(agent);
      motionStatesRef.current[agent.id] = {
        startX: x,
        startY: 68,
        curX: x,
        curY: 68,
        targetX: x,
        targetY: 68,
        startTime: 0,
        duration: 0,
        isMoving: false,
        phase: "docked",
        nextActionTime: 0,
      };
    });

    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (!isDeployedRef.current) {
        AGENTS.forEach((agent) => {
          const x = getRailDockX(agent);
          const state = motionStatesRef.current[agent.id];
          if (state) {
            state.curX = state.targetX = state.startX = x;
            state.curY = state.targetY = state.startY = 68;
            const el = cursorElsRef.current[agent.id];
            if (el) el.style.transform = `translate3d(${x}px, 68px, 0)`;
          }
        });
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getRailDockX]);

  // Master 60-120fps Animation Loop running directly on DOM nodes
  useEffect(() => {
    if (!mounted || !agentsActive) return;

    let isRunning = true;
    const activeList = isMobile ? AGENTS.slice(0, 3) : AGENTS;

    const tick = (now: number) => {
      if (!isRunning) return;

      activeList.forEach((agent) => {
        const motion = motionStatesRef.current[agent.id];
        const cursorEl = cursorElsRef.current[agent.id];
        if (!motion || !cursorEl) return;

        if (motion.isMoving) {
          const elapsed = now - motion.startTime;
          const progress = Math.min(1, elapsed / motion.duration);
          // Snappy cubic ease-out
          const ease = 1 - Math.pow(1 - progress, 3);

          motion.curX = motion.startX + (motion.targetX - motion.startX) * ease;
          motion.curY = motion.startY + (motion.targetY - motion.startY) * ease;

          // DIRECT GPU TRANSFORM UPDATE - ZERO REACT RE-RENDERS
          cursorEl.style.transform = `translate3d(${motion.curX}px, ${motion.curY}px, 0)`;

          if (progress >= 1) {
            motion.isMoving = false;
            motion.phase = "locked";
            motion.nextActionTime = now + 1600 + Math.random() * 800;

            // Trigger click ripple
            const rip = rippleElsRef.current[agent.id];
            if (rip) {
              rip.style.animation = "none";
              // Force reflow
              void rip.offsetWidth;
              rip.style.animation = "click-ripple 0.45s ease-out forwards";
            }
          }
        } else if (isDeployedRef.current && now >= motion.nextActionTime && motion.phase !== "moving") {
          // Time to select next target
          acquireNextTarget(agent, now);
        }
      });

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    const acquireNextTarget = (agent: AgentConfig, now: number) => {
      try {
        const motion = motionStatesRef.current[agent.id];
        if (!motion) return;

        const sec = activeSectionRef.current || "hero";
        const targets = SECTION_TARGETS[sec] || SECTION_TARGETS.hero;
        if (!targets || targets.length === 0) return;
        const targetDef = targets[Math.floor(Math.random() * targets.length)];
        if (!targetDef) return;

        const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
        const winH = typeof window !== "undefined" ? window.innerHeight : 800;

        // Find real DOM element
        let tx = Math.max(30, Math.min(winW - 60, (agent.horizontalPercent / 100) * winW));
        let ty = Math.max(100, Math.min(winH - 80, 160 + Math.random() * (winH - 240)));
        let boxRect: { x: number; y: number; w: number; h: number } | null = null;

        if (targetDef.selector) {
          const el = document.querySelector(targetDef.selector);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0 && rect.bottom > 80 && rect.top < winH - 60) {
              tx = Math.max(30, Math.min(winW - 60, rect.left + rect.width / 2));
              ty = Math.max(80, Math.min(winH - 60, rect.top + rect.height / 2));
              boxRect = {
                x: rect.left,
                y: rect.top,
                w: rect.width,
                h: rect.height,
              };
            }
          }
        }

        motion.startX = motion.curX;
        motion.startY = motion.curY;
        motion.targetX = tx;
        motion.targetY = ty;
        motion.startTime = now;
        motion.duration = 600 + Math.random() * 250;
        motion.isMoving = true;
        motion.phase = "moving";

        // Update badge text directly
        const badgeSub = badgeSubElsRef.current[agent.id];
        if (badgeSub && targetDef.name) {
          badgeSub.textContent = `Targeting: ${targetDef.name}`;
        }

        // If we found a real box, show the laser bounding frame on primary agent
        if (boxRect && laserBoxElRef.current && (agent.id === "agent-01" || agent.id === "agent-03" || agent.id === "agent-05")) {
          const lBox = laserBoxElRef.current;
          lBox.style.transform = `translate3d(${boxRect.x}px, ${boxRect.y}px, 0)`;
          lBox.style.width = `${boxRect.w}px`;
          lBox.style.height = `${boxRect.h}px`;
          lBox.style.borderColor = agent.color;
          lBox.style.boxShadow = `0 0 20px ${agent.color}40, inset 0 0 10px ${agent.color}20`;
          lBox.style.opacity = "1";

          if (laserLabelElRef.current && targetDef.name) {
            laserLabelElRef.current.textContent = `TARGET LOCKED // ${targetDef.name}`;
            laserLabelElRef.current.style.color = agent.color;
            laserLabelElRef.current.style.borderColor = agent.color;
          }

          setTimeout(() => {
            if (laserBoxElRef.current) laserBoxElRef.current.style.opacity = "0";
          }, 2200);
        }
      } catch {
        // Fallback gracefully without breaking loop
      }
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      isRunning = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [mounted, agentsActive, isMobile]);

  // Ultra-lightweight Scroll Listener (Throttled & Non-blocking)
  useEffect(() => {
    if (!mounted || !agentsActive) return;

    const sections = ["hero", "about", "experience", "projects", "skills", "education", "certifications", "contact"];
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // At top: Dock to horizontal rail
          if (scrollY < 60) {
            if (isDeployedRef.current) {
              isDeployedRef.current = false;
              setIsDeployed(false);

              // Return smoothly to horizontal dock
              const now = performance.now();
              AGENTS.forEach((agent) => {
                const motion = motionStatesRef.current[agent.id];
                if (motion) {
                  const dockX = getRailDockX(agent);
                  motion.startX = motion.curX;
                  motion.startY = motion.curY;
                  motion.targetX = dockX;
                  motion.targetY = 68;
                  motion.startTime = now;
                  motion.duration = 500;
                  motion.isMoving = true;
                  motion.phase = "docked";

                  const badge = badgeSubElsRef.current[agent.id];
                  if (badge) badge.textContent = "STANDBY ON RAIL";
                }
              });

              if (laserBoxElRef.current) laserBoxElRef.current.style.opacity = "0";
            }
            ticking = false;
            return;
          }

          // When scrolled down: Deploy!
          if (!isDeployedRef.current) {
            isDeployedRef.current = true;
            setIsDeployed(true);
          }

          // Detect active section
          let detected = activeSectionRef.current;
          for (const secId of sections) {
            const el = document.getElementById(secId);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
                detected = secId;
                break;
              }
            }
          }

          if (detected !== activeSectionRef.current) {
            activeSectionRef.current = detected;
            setActiveSection(detected);

            // Re-aim deployed agents immediately
            const now = performance.now();
            AGENTS.forEach((agent, i) => {
              const motion = motionStatesRef.current[agent.id];
              if (motion) {
                motion.nextActionTime = now + i * 150;
              }
            });
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted, agentsActive, getRailDockX]);

  if (!mounted) return null;

  const activeAgents = isMobile ? AGENTS.slice(0, 3) : AGENTS;

  return (
    <>
      {/* ─── SLEEK HORIZONTAL COMMAND RAIL (Hardware-Accelerated) ─── */}
      <div className="fixed top-[58px] left-0 right-0 z-40 pointer-events-none">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="py-1.5 px-3 rounded-lg bg-gray-950/85 backdrop-blur-md border border-cyan-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.7)] flex items-center justify-between font-mono text-[10px]">
            {/* Left Status */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300 font-bold tracking-wider hidden sm:inline">
                AI AGENT COMMAND RAIL
              </span>
              <span className="text-gray-600 hidden sm:inline">//</span>
              <span className="text-gray-400">
                STATUS: {isDeployed ? `DEPLOYED [// ${activeSection.toUpperCase()}]` : "DOCKED ON RAIL (SCROLL TO DEPLOY)"}
              </span>
            </div>

            {/* Horizontal Dock Slots */}
            <div className="flex items-center gap-2.5 sm:gap-4 overflow-x-auto">
              {activeAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center gap-1.5 py-0.5 px-2 rounded border transition-colors duration-150"
                  style={{
                    backgroundColor: isDeployed ? `${agent.color}15` : "rgba(17, 24, 39, 0.4)",
                    borderColor: isDeployed ? `${agent.color}50` : "rgba(255, 255, 255, 0.08)",
                    color: isDeployed ? agent.color : "#9ca3af",
                  }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isDeployed ? "animate-ping" : ""}`}
                    style={{ backgroundColor: agent.color }}
                  />
                  <span className="font-bold text-[9px]">{agent.name}</span>
                  <span className="text-[8px] text-gray-500 hidden md:inline">[{agent.role}]</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── SINGLE REUSABLE LASER BOUNDING BOX (Direct Ref Update) ─── */}
      <div className="fixed inset-0 pointer-events-none z-[99990] overflow-hidden">
        <div
          ref={laserBoxElRef}
          className="absolute border pointer-events-none transition-opacity duration-300 opacity-0 animate-selection-pulse"
          style={{ willChange: "transform, width, height, opacity" }}
        >
          {/* 4 Corner Brackets */}
          <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
          <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
          <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
          <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

          {/* Label */}
          <div className="absolute -top-6 left-0 px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase border backdrop-blur-md whitespace-nowrap shadow-lg flex items-center gap-1 bg-gray-950/95">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span ref={laserLabelElRef} className="text-cyan-400 border-cyan-400">
              TARGET LOCKED
            </span>
          </div>
        </div>
      </div>

      {/* ─── GPU-Accelerated Cursors (Direct Ref Transform) ─── */}
      <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
        {agentsActive &&
          activeAgents.map((agent) => (
            <div
              key={agent.id}
              ref={(el) => {
                cursorElsRef.current[agent.id] = el;
              }}
              className="absolute pointer-events-none top-0 left-0"
              style={{
                transform: `translate3d(${(agent.horizontalPercent / 100) * 1200}px, 68px, 0)`,
                willChange: "transform",
              }}
            >
              {/* Click Ripple Wave */}
              <div
                ref={(el) => {
                  rippleElsRef.current[agent.id] = el;
                }}
                className="absolute -top-4 -left-4 w-10 h-10 rounded-full border-2 pointer-events-none opacity-0"
                style={{ borderColor: agent.color }}
              />

              {/* Custom SVG Cursor Arrow */}
              <div className="relative">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                >
                  <path
                    d="M3 2L10.5 21L13.5 13.5L21 10.5L3 2Z"
                    fill="#030712"
                    stroke={agent.color}
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <polygon points="5,5 10,18 12.5,12.5 18,10" fill={agent.color} opacity="0.4" />
                </svg>

                {/* Beacon on cursor tip */}
                <div
                  className="absolute top-0 left-0 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: agent.color,
                    boxShadow: `0 0 8px 1px ${agent.color}`,
                  }}
                />
              </div>

              {/* Agent Callout & Dynamic Status Badge */}
              <div
                className="absolute left-6 top-1 flex flex-col items-start gap-1 pointer-events-none select-none"
                style={{ minWidth: "140px" }}
              >
                {/* Agent Header Tag */}
                <div
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider backdrop-blur-md border shadow-lg"
                  style={{
                    backgroundColor: "rgba(3, 7, 18, 0.94)",
                    borderColor: agent.badgeBorder,
                    color: agent.color,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-ping"
                    style={{ backgroundColor: agent.color }}
                  />
                  <span>{agent.name}</span>
                  <span className="text-gray-400 font-normal text-[9px]">[{agent.role}]</span>
                </div>

                {/* Direct-DOM Text Badge */}
                <div
                  className="px-2 py-0.5 rounded text-[9px] font-mono backdrop-blur-md border text-gray-300 max-w-[240px] truncate"
                  style={{
                    backgroundColor: "rgba(5, 8, 17, 0.9)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <span
                    ref={(el) => {
                      badgeSubElsRef.current[agent.id] = el;
                    }}
                  >
                    STANDBY ON RAIL
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
