"use client";

import { useState } from "react";

interface FleetAgent {
  id: string;
  name: string;
  role: string;
  color: string;
  assignedBox: string;
  section: string;
}

const FLEET_AGENTS: FleetAgent[] = [
  { id: "agent-01", name: "Agent 01", role: "Scraper", color: "#00f5ff", assignedBox: "Terminal Sandbox", section: "HERO" },
  { id: "agent-05", name: "Agent 05", role: "Architect", color: "#60a5fa", assignedBox: "Specification Manifest", section: "ABOUT" },
  { id: "agent-03", name: "Agent 03", role: "Optimizer", color: "#c084fc", assignedBox: "SKU Scraper Showcase", section: "PROJECTS" },
  { id: "agent-06", name: "Agent 06", role: "Auditor", color: "#f472b6", assignedBox: "Node Diagnostics HUD", section: "SKILLS" },
  { id: "agent-02", name: "Agent 02", role: "Sentinel", color: "#10b981", assignedBox: "Uplink Payload Terminal", section: "CONTACT" },
];

export default function MultiCursorAgents() {
  const [fleetExpanded, setFleetExpanded] = useState(false);
  const [active, setActive] = useState(true);

  return (
    <aside aria-label="AI Fleet Telemetry" className="fixed bottom-4 right-4 z-40 hidden sm:block pointer-events-auto">
      <div className="cyber-panel rounded-xl overflow-hidden border border-cyan-500/20 shadow-2xl transition-all duration-300 max-w-xs">
        {/* HUD Header */}
        <button
          type="button"
          onClick={() => setFleetExpanded(!fleetExpanded)}
          className="w-full text-left flex items-center justify-between px-3.5 py-2 bg-gray-950/90 border-b border-gray-800/80 cursor-pointer hover:bg-gray-900/80 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${active ? "bg-cyan-400" : "bg-gray-500"}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${active ? "bg-cyan-500" : "bg-gray-600"}`} />
            </span>
            <span className="text-[11px] font-mono font-bold tracking-wider text-cyan-300">
              AI AGENT FLEET: {active ? "5 ACTIVE UNITS" : "PAUSED"}
            </span>
          </div>
          <span className="text-xs text-gray-400">{fleetExpanded ? "▼" : "▲"}</span>
        </button>

        {/* Expanded Fleet Telemetry List */}
        {fleetExpanded && (
          <div className="p-2.5 space-y-1.5 max-h-56 overflow-y-auto font-mono text-[10px]">
            <div className="text-[9px] text-cyan-400 font-bold pb-1 border-b border-gray-800/60 flex items-center justify-between">
              <span>DEDICATED BOX CO-PILOTS</span>
              <span className="text-gray-500">1 PER BOX</span>
            </div>
            {FLEET_AGENTS.map((agent) => (
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
                  {agent.assignedBox}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
