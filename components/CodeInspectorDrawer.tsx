"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/data/projects";
import { sound } from "@/lib/audio";

interface CodeInspectorDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export default function CodeInspectorDrawer({ project, onClose }: CodeInspectorDrawerProps) {
  const [activeTab, setActiveTab] = useState<"json" | "logs" | "metrics">("json");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (project) {
      sound.playBeep();
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [project, onClose]);

  if (!project) return null;

  const rawJsonConfig = JSON.stringify(
    {
      id: project.id,
      system_name: project.title,
      category: project.category,
      access_level: project.isPrivate ? "ENTERPRISE_INTERNAL" : "PUBLIC_DEMO",
      deployment_date: project.date,
      metrics: project.metrics,
      technologies: project.tech,
      architecture_vectors: project.deepArchitecture.items,
      outcomes: project.keyOutcomes,
      telemetry_status: "NOMINAL // VALIDATED",
    },
    null,
    2
  );

  const handleCopyJson = () => {
    navigator.clipboard.writeText(rawJsonConfig);
    setCopied(true);
    sound.playClick(900);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100010] bg-black/80 backdrop-blur-sm flex justify-end font-mono animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl h-full bg-[#080808] border-l border-[#ff3333]/40 shadow-2xl flex flex-col overflow-hidden animate-slide-left relative"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-neutral-950 border-b border-neutral-800 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3333] animate-pulse" />
            <span className="text-white font-bold tracking-wider">
              INSPECTOR // {project.id.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-neutral-500 hidden sm:inline">[ESC TO EXIT]</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick(600);
                onClose();
              }}
              className="text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 w-7 h-7 rounded flex items-center justify-center transition-colors text-xs"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Drawer Tabs */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-neutral-950/70 border-b border-neutral-800 text-xs">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab("json");
            }}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              activeTab === "json"
                ? "bg-[#ff3333]/20 text-[#ff4d4d] border border-[#ff3333]/50 font-bold shadow-[0_0_10px_rgba(255,51,51,0.3)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            01 // RAW_CONFIG.JSON
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab("logs");
            }}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              activeTab === "logs"
                ? "bg-[#ff3333]/20 text-[#ff4d4d] border border-[#ff3333]/50 font-bold shadow-[0_0_10px_rgba(255,51,51,0.3)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            02 // ARCHITECTURE_LOGS
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab("metrics");
            }}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              activeTab === "metrics"
                ? "bg-[#ff3333]/20 text-[#ff4d4d] border border-[#ff3333]/50 font-bold shadow-[0_0_10px_rgba(255,51,51,0.3)]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            03 // METRICS.SPEC
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-neutral-300">
          {activeTab === "json" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <span>SYSTEM MANIFEST PAYLOAD</span>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="px-2.5 py-1 rounded bg-[#ff3333]/15 text-[#ff4d4d] border border-[#ff3333]/40 hover:bg-[#ff3333]/30 transition-colors font-bold cursor-pointer"
                >
                  {copied ? "COPIED TO CLIPBOARD!" : "COPY JSON"}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-[#030303] border border-neutral-800 text-[11px] font-mono text-neutral-300 overflow-x-auto leading-relaxed selection:bg-[#ff3333]/30">
                <code>{rawJsonConfig}</code>
              </pre>
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-4">
              <div className="text-[11px] text-[#ff4d4d] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span>⚡</span> BOTTLENECK ANALYSIS &amp; RESOLUTION VECTORS:
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 leading-relaxed font-sans">
                {project.technicalChallenge}
              </div>

              <div className="text-[11px] text-neutral-400 uppercase tracking-wider mt-4">
                // ARCHITECTURE VECTORS:
              </div>
              <div className="space-y-2">
                {project.deepArchitecture.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800/80 flex items-start gap-2.5 font-mono text-[11px]"
                  >
                    <span className="text-[#ff3333] font-bold mt-0.5">&gt;</span>
                    <span className="text-neutral-300 leading-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "metrics" && (
            <div className="space-y-5">
              <div className="text-[11px] text-[#ff4d4d] font-bold uppercase tracking-wider">
                // QUANTIFIABLE PRODUCTION METRICS
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-neutral-950 border border-[#ff3333]/25 text-center"
                  >
                    <div className="text-lg font-bold text-[#ff4d4d] truncate">{m.value}</div>
                    <div className="text-[10px] text-neutral-400 truncate mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-neutral-400 uppercase tracking-wider mt-4">
                // PRODUCTION VERIFICATION OUTCOMES:
              </div>
              <ul className="space-y-2.5">
                {project.keyOutcomes.map((outcome, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-neutral-950/60 border border-neutral-800 text-xs font-sans text-neutral-300"
                  >
                    <span className="text-[#ff3333] font-mono font-bold mt-0.5">✓</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-neutral-950 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500 font-mono">
          <span>STATUS: AUDIT_PASSED</span>
          <span className="text-emerald-400">● ENCRYPTED &amp; SIGNED</span>
        </div>
      </div>
    </div>
  );
}
