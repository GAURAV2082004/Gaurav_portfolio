"use client";

import { useEffect, useState, useRef } from "react";

interface AgentConfig {
  id: string;
  name: string;
  role: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
}

const AGENTS: AgentConfig[] = [
  {
    id: "agent-01",
    name: "Agent 01",
    role: "Scraper",
    color: "#00f5ff",
    badgeBg: "rgba(0, 245, 255, 0.12)",
    badgeBorder: "rgba(0, 245, 255, 0.4)",
  },
  {
    id: "agent-02",
    name: "Agent 02",
    role: "Sentinel",
    color: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.12)",
    badgeBorder: "rgba(16, 185, 129, 0.4)",
  },
  {
    id: "agent-03",
    name: "Agent 03",
    role: "Optimizer",
    color: "#c084fc",
    badgeBg: "rgba(192, 132, 252, 0.12)",
    badgeBorder: "rgba(192, 132, 252, 0.4)",
  },
  {
    id: "agent-04",
    name: "Agent 04",
    role: "Synthesizer",
    color: "#fbbf24",
    badgeBg: "rgba(251, 191, 36, 0.12)",
    badgeBorder: "rgba(251, 191, 36, 0.4)",
  },
  {
    id: "agent-05",
    name: "Agent 05",
    role: "Architect",
    color: "#60a5fa",
    badgeBg: "rgba(96, 165, 250, 0.12)",
    badgeBorder: "rgba(96, 165, 250, 0.4)",
  },
  {
    id: "agent-06",
    name: "Agent 06",
    role: "Auditor",
    color: "#f472b6",
    badgeBg: "rgba(244, 114, 182, 0.12)",
    badgeBorder: "rgba(244, 114, 182, 0.4)",
  },
];

interface Waypoint {
  xPercent: number;
  yPercent: number;
  duration: number; // ms to reach
  pause: number; // ms to stay
  action: "hover" | "click" | "type" | "inspect";
  statusText: string;
  typeText?: string;
}

// Structured realistic task scripts for each agent
const AGENT_SCRIPTS: Record<string, Waypoint[]> = {
  "agent-01": [
    { xPercent: 24, yPercent: 18, duration: 2400, pause: 1400, action: "hover", statusText: "Scanning DOM hierarchy" },
    { xPercent: 32, yPercent: 44, duration: 2800, pause: 2000, action: "click", statusText: "Selecting Product Table row" },
    { xPercent: 48, yPercent: 52, duration: 2200, pause: 2500, action: "type", statusText: "Extracting JSON-LD schema", typeText: '{"sku":"SKU-1042","price":"$24.99"}' },
    { xPercent: 68, yPercent: 35, duration: 3200, pause: 1600, action: "inspect", statusText: "Verifying 6-stage fallback parser" },
    { xPercent: 18, yPercent: 62, duration: 2600, pause: 1800, action: "click", statusText: "Batch queue worker chunk #42" },
  ],
  "agent-02": [
    { xPercent: 78, yPercent: 16, duration: 2600, pause: 1800, action: "inspect", statusText: "Checking 17 health vectors" },
    { xPercent: 62, yPercent: 28, duration: 2200, pause: 1600, action: "click", statusText: "Pinging cURL multi socket: 182ms" },
    { xPercent: 82, yPercent: 58, duration: 3000, pause: 2200, action: "type", statusText: "Writing telemetry to MySQL 8", typeText: "UPTIME: 99.98% // SSL_VALID: 284d" },
    { xPercent: 54, yPercent: 72, duration: 2500, pause: 1500, action: "hover", statusText: "Monitoring 200+ domain sentinels" },
    { xPercent: 72, yPercent: 84, duration: 2400, pause: 1700, action: "click", statusText: "Dispatching SMTP alert test" },
  ],
  "agent-03": [
    { xPercent: 15, yPercent: 38, duration: 2500, pause: 1600, action: "click", statusText: "Evaluating database query plan" },
    { xPercent: 38, yPercent: 22, duration: 2800, pause: 2400, action: "type", statusText: "Refactoring SQL index buffer", typeText: "INDEX idx_orders_customer_id" },
    { xPercent: 28, yPercent: 78, duration: 3400, pause: 1800, action: "inspect", statusText: "200ms cached dashboard latency" },
    { xPercent: 44, yPercent: 66, duration: 2200, pause: 1500, action: "hover", statusText: "Balancing memory footprint" },
  ],
  "agent-04": [
    { xPercent: 58, yPercent: 24, duration: 2700, pause: 1700, action: "click", statusText: "Ingesting Whisper-1 audio stream" },
    { xPercent: 74, yPercent: 46, duration: 2400, pause: 2800, action: "type", statusText: "Parsing natural language into iCal", typeText: "action: CALENDAR_CREATE [Friday 3pm]" },
    { xPercent: 46, yPercent: 32, duration: 3100, pause: 1900, action: "inspect", statusText: "Synthesizing GPT-4o-mini structured JSON" },
    { xPercent: 64, yPercent: 68, duration: 2600, pause: 1600, action: "click", statusText: "Syncing Kanban task board" },
  ],
  "agent-05": [
    { xPercent: 85, yPercent: 38, duration: 3000, pause: 1900, action: "hover", statusText: "Inspecting Wacky Brandhub ERP" },
    { xPercent: 68, yPercent: 62, duration: 2600, pause: 2100, action: "click", statusText: "Verifying 2-way Google Sheets webhook" },
    { xPercent: 35, yPercent: 82, duration: 3300, pause: 2500, action: "type", statusText: "Computing ApexCharts gross margin", typeText: "SPREAD: +34.8% gross revenue" },
    { xPercent: 22, yPercent: 48, duration: 2800, pause: 1700, action: "inspect", statusText: "Mapping hybrid sync architecture" },
  ],
  "agent-06": [
    { xPercent: 30, yPercent: 86, duration: 2900, pause: 1800, action: "click", statusText: "Verifying JWT Bearer token" },
    { xPercent: 52, yPercent: 82, duration: 2400, pause: 2200, action: "type", statusText: "Auditing RBAC permission matrix", typeText: "ROLE: Admin // ALLOW_FULL_CRUD" },
    { xPercent: 76, yPercent: 74, duration: 3100, pause: 1700, action: "inspect", statusText: "Checking bcrypt password hash salt" },
    { xPercent: 18, yPercent: 28, duration: 2700, pause: 1600, action: "hover", statusText: "Confirming CORS policy whitelist" },
  ],
};

interface AgentLiveState {
  x: number;
  y: number;
  statusText: string;
  action: "hover" | "click" | "type" | "inspect";
  isClicking: boolean;
  typedString: string;
  trail: { x: number; y: number }[];
}

export default function MultiCursorAgents() {
  const [mounted, setMounted] = useState(false);
  const [agentsActive, setAgentsActive] = useState(true);
  const [fleetExpanded, setFleetExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Per-agent live animation state
  const [agentStates, setAgentStates] = useState<Record<string, AgentLiveState>>(() => {
    const initial: Record<string, AgentLiveState> = {};
    AGENTS.forEach((agent, i) => {
      initial[agent.id] = {
        x: 100 + i * 140,
        y: 120 + i * 90,
        statusText: "Initializing...",
        action: "hover",
        isClicking: false,
        typedString: "",
        trail: [],
      };
    });
    return initial;
  });

  const stateRef = useRef(agentStates);
  stateRef.current = agentStates;

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Autonomous animation loop for each agent
  useEffect(() => {
    if (!mounted || !agentsActive) return;

    let isRunning = true;
    const timeouts: NodeJS.Timeout[] = [];
    const activeAgentsList = isMobile ? AGENTS.slice(0, 3) : AGENTS;

    activeAgentsList.forEach((agent) => {
      const script = AGENT_SCRIPTS[agent.id] || AGENT_SCRIPTS["agent-01"];
      let stepIndex = Math.floor(Math.random() * script.length);

      const runNextStep = () => {
        if (!isRunning) return;

        const currentWaypoint = script[stepIndex];
        stepIndex = (stepIndex + 1) % script.length;

        // Calculate actual pixel target based on current window size
        const targetX = Math.max(20, Math.min(window.innerWidth - 80, (currentWaypoint.xPercent / 100) * window.innerWidth));
        const targetY = Math.max(20, Math.min(window.innerHeight - 80, (currentWaypoint.yPercent / 100) * window.innerHeight));

        const startState = stateRef.current[agent.id];
        const startX = startState ? startState.x : targetX;
        const startY = startState ? startState.y : targetY;

        const startTime = performance.now();
        const duration = currentWaypoint.duration;

        // Smooth movement animation
        const animateMove = (now: number) => {
          if (!isRunning) return;
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);

          // Custom easeInOutCubic for organic mouse movement
          const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          const curX = startX + (targetX - startX) * ease;
          const curY = startY + (targetY - startY) * ease;

          setAgentStates((prev) => {
            const prevState = prev[agent.id];
            const prevTrail = prevState ? prevState.trail : [];
            const newTrail = [{ x: curX, y: curY }, ...prevTrail.slice(0, 3)];

            return {
              ...prev,
              [agent.id]: {
                x: curX,
                y: curY,
                statusText: currentWaypoint.statusText,
                action: currentWaypoint.action,
                isClicking: false,
                typedString: "",
                trail: newTrail,
              },
            };
          });

          if (progress < 1) {
            requestAnimationFrame(animateMove);
          } else {
            // Reached waypoint! Perform action (click / type / inspect)
            handleWaypointAction(currentWaypoint);
          }
        };

        requestAnimationFrame(animateMove);
      };

      const handleWaypointAction = (wp: Waypoint) => {
        if (!isRunning) return;

        if (wp.action === "click") {
          // Trigger click pulse
          setAgentStates((prev) => ({
            ...prev,
            [agent.id]: {
              ...prev[agent.id],
              isClicking: true,
            },
          }));

          const clickTimeout = setTimeout(() => {
            if (!isRunning) return;
            setAgentStates((prev) => ({
              ...prev,
              [agent.id]: {
                ...prev[agent.id],
                isClicking: false,
              },
            }));
          }, 450);
          timeouts.push(clickTimeout);
        } else if (wp.action === "type" && wp.typeText) {
          // Simulate typing character by character
          const textToType = wp.typeText;
          let charIndex = 0;

          const typeInterval = setInterval(() => {
            if (!isRunning) {
              clearInterval(typeInterval);
              return;
            }
            charIndex++;
            setAgentStates((prev) => ({
              ...prev,
              [agent.id]: {
                ...prev[agent.id],
                typedString: textToType.slice(0, charIndex),
              },
            }));

            if (charIndex >= textToType.length) {
              clearInterval(typeInterval);
            }
          }, 45);
        }

        // Wait for waypoint pause time, then proceed to next waypoint
        const pauseTimeout = setTimeout(() => {
          if (!isRunning) return;
          runNextStep();
        }, wp.pause);
        timeouts.push(pauseTimeout);
      };

      // Stagger initial start times so agents don't move in sync
      const initialDelay = setTimeout(() => {
        runNextStep();
      }, Math.random() * 1200);
      timeouts.push(initialDelay);
    });

    return () => {
      isRunning = false;
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [mounted, agentsActive, isMobile]);

  if (!mounted) return null;

  const activeAgents = isMobile ? AGENTS.slice(0, 3) : AGENTS;

  return (
    <>
      {/* ─── Layer of 5-6 Artificial Cursors (Pointer-Events-None) ─── */}
      <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
        {agentsActive &&
          activeAgents.map((agent) => {
            const state = agentStates[agent.id];
            if (!state) return null;

            return (
              <div
                key={agent.id}
                className="absolute transition-transform duration-75 will-change-transform"
                style={{
                  transform: `translate3d(${state.x}px, ${state.y}px, 0)`,
                }}
              >
                {/* Glowing Trail Ghosts */}
                {state.trail.map((pos, ti) => (
                  <div
                    key={ti}
                    className="absolute w-2 h-2 rounded-full pointer-events-none"
                    style={{
                      left: pos.x - state.x - 1,
                      top: pos.y - state.y - 1,
                      backgroundColor: agent.color,
                      opacity: 0.4 / (ti + 1),
                      transform: `scale(${1 - ti * 0.25})`,
                      boxShadow: `0 0 6px ${agent.color}`,
                    }}
                  />
                ))}

                {/* Click Ripple Wave Ring */}
                {state.isClicking && (
                  <div
                    className="absolute -top-3 -left-3 w-8 h-8 rounded-full border-2 pointer-events-none"
                    style={{
                      borderColor: agent.color,
                      animation: "click-ripple 0.5s ease-out forwards",
                      boxShadow: `0 0 12px ${agent.color}`,
                    }}
                  />
                )}

                {/* Futuristic Custom SVG Cursor Arrow */}
                <div
                  className={`relative ${state.isClicking ? "scale-90 translate-x-0.5 translate-y-0.5" : ""} transition-transform duration-100`}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  >
                    <path
                      d="M3 2L10.5 21L13.5 13.5L21 10.5L3 2Z"
                      fill="#030712"
                      stroke={agent.color}
                      strokeWidth="1.75"
                      strokeLinejoin="round"
                    />
                    <polygon
                      points="5,5 10,18 12.5,12.5 18,10"
                      fill={agent.color}
                      opacity="0.35"
                    />
                  </svg>

                  {/* Pulsing beacon on cursor tip */}
                  <div
                    className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: agent.color,
                      boxShadow: `0 0 8px 2px ${agent.color}`,
                    }}
                  />
                </div>

                {/* Agent Callout & Status Pill */}
                <div
                  className="absolute left-5 top-2.5 flex flex-col items-start gap-1 pointer-events-none select-none"
                  style={{ minWidth: "150px" }}
                >
                  {/* Agent Header Tag */}
                  <div
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider backdrop-blur-md border shadow-lg"
                    style={{
                      backgroundColor: "rgba(3, 7, 18, 0.92)",
                      borderColor: agent.badgeBorder,
                      color: agent.color,
                      boxShadow: `0 0 10px ${agent.color}22`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-ping"
                      style={{ backgroundColor: agent.color }}
                    />
                    <span>{agent.name}</span>
                    <span className="text-gray-400 font-normal">[{agent.role}]</span>
                  </div>

                  {/* Dynamic Action / Typing Sub-badge */}
                  <div
                    className="px-2 py-0.5 rounded text-[9px] font-mono backdrop-blur-md border text-gray-300 max-w-[220px] truncate"
                    style={{
                      backgroundColor: "rgba(5, 8, 17, 0.88)",
                      borderColor: "rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {state.typedString ? (
                      <span className="text-white font-mono">
                        <span className="text-cyan-400">&gt; </span>
                        {state.typedString}
                        <span className="animate-typing-cursor">_</span>
                      </span>
                    ) : (
                      <span>{state.statusText}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* ─── Floating Agent Fleet Telemetry HUD (Interactive) ─── */}
      <div className="fixed bottom-4 right-4 z-40 hidden sm:block">
        <div className="cyber-panel rounded-xl overflow-hidden border border-cyan-500/20 shadow-2xl transition-all duration-300 max-w-xs">
          {/* HUD Header */}
          <div
            onClick={() => setFleetExpanded(!fleetExpanded)}
            className="flex items-center justify-between px-3.5 py-2 bg-gray-950/90 border-b border-gray-800/80 cursor-pointer hover:bg-gray-900/80 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    agentsActive ? "bg-cyan-400" : "bg-gray-500"
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    agentsActive ? "bg-cyan-500" : "bg-gray-600"
                  }`}
                />
              </span>
              <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-300">
                AI AGENT FLEET: {agentsActive ? `${activeAgents.length} ACTIVE` : "PAUSED"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setAgentsActive(!agentsActive);
                }}
                className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                  agentsActive
                    ? "bg-cyan-950/80 border-cyan-700/60 text-cyan-300 hover:bg-cyan-900/60"
                    : "bg-gray-800 border-gray-700 text-gray-400 hover:text-white"
                }`}
              >
                {agentsActive ? "PAUSE" : "RESUME"}
              </button>
              <span className="text-xs text-gray-400">{fleetExpanded ? "▼" : "▲"}</span>
            </div>
          </div>

          {/* Expanded Fleet Telemetry List */}
          {fleetExpanded && (
            <div className="p-2.5 space-y-1.5 max-h-52 overflow-y-auto font-mono text-[10px]">
              {activeAgents.map((agent) => {
                const state = agentStates[agent.id];
                return (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between gap-2 px-2 py-1.5 rounded bg-gray-950/60 border border-gray-800/60"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: agent.color }} />
                      <span className="font-bold text-gray-200">{agent.name}</span>
                      <span className="text-gray-500">[{agent.role}]</span>
                    </div>
                    <span className="text-gray-400 truncate max-w-[120px] text-[9px]">
                      {state?.statusText || "Active"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
