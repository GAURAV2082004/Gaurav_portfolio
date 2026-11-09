"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Project } from "@/data/projects";
import { isMockupProjectId } from "@/data/projects";

// Dynamic imports for interactive mockup UIs
const CompeteIntelMockupUI = dynamic(() => import("./CompeteIntelMockupUI"), {
  loading: () => <MockupSkeleton />,
});
const SiteIntelMockupUI = dynamic(() => import("./SiteIntelMockupUI"), {
  loading: () => <MockupSkeleton />,
});
const ScmAnalyticsMockupUI = dynamic(() => import("./ScmAnalyticsMockupUI"), {
  loading: () => <MockupSkeleton />,
});
const WorkPlannerMockupUI = dynamic(() => import("./WorkPlannerMockupUI"), {
  loading: () => <MockupSkeleton />,
});
const PromptLibMockupUI = dynamic(() => import("./PromptLibMockupUI"), {
  loading: () => <MockupSkeleton />,
});

function MockupSkeleton() {
  return (
    <div className="h-64 sm:h-80 bg-neutral-950/80 animate-pulse rounded-xl border border-neutral-800 flex items-center justify-center text-xs text-[#ff4d4d] font-mono">
      [SYSTEM] Loading interactive product sandbox…
    </div>
  );
}

function ProjectInteractiveMockup({ projectId }: { projectId: string }) {
  if (!isMockupProjectId(projectId)) return null;

  const mockupBg =
    projectId === "ai-work-planner"
      ? "#0B1220"
      : projectId === "price-intel"
        ? "#F8FAFC"
        : "#f8fafc";

  return (
    <div className="rounded-xl overflow-hidden border border-[#ff3333]/30 shadow-2xl" style={{ background: mockupBg }}>
      {projectId === "price-intel" && <CompeteIntelMockupUI />}
      {projectId === "site-intel" && <SiteIntelMockupUI />}
      {projectId === "scm-analytics" && <ScmAnalyticsMockupUI />}
      {projectId === "ai-work-planner" && <WorkPlannerMockupUI />}
      {projectId === "prompt-lib" && <PromptLibMockupUI />}
    </div>
  );
}

interface CyberProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function CyberProjectModal({ project, onClose }: CyberProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "mockup" | "architecture">("overview");
  const [fullscreenImage, setFullscreenImage] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in font-mono"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] cyber-panel rounded-2xl border border-[#ff3333]/40 shadow-2xl flex flex-col overflow-hidden corner-bracket bg-[#0a0a0a]"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-950/95 border-b border-neutral-800 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3333] animate-pulse" />
            <span className="text-neutral-400">PROJECT_SPECIFICATION:</span>
            <span className="text-[#ff9999] font-bold truncate max-w-xs sm:max-w-md">
              {project.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[10px] text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
              ESC TO CLOSE
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-sm"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-neutral-950/70 border-b border-neutral-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "overview"
                ? "bg-[#ff3333]/20 text-[#ff4d4d] border border-[#ff3333]/40 font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            01 // SPECIFICATIONS &amp; LOGS
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("mockup")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "mockup"
                ? "bg-[#ff3333]/20 text-[#ff4d4d] border border-[#ff3333]/40 font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            02 // INTERACTIVE PRODUCT SANDBOX
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("architecture")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === "architecture"
                ? "bg-[#ff3333]/20 text-[#ff4d4d] border border-[#ff3333]/40 font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            03 // DEEP ARCHITECTURE MATRIX
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 font-sans">
          {activeTab === "overview" && (
            <>
              {/* Header Info */}
              <div className="space-y-3 font-mono">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[#ff4d4d] bg-[#ff3333]/15 border border-[#ff3333]/30 px-2.5 py-1 rounded">
                    {project.category}
                  </span>
                  <span className="text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">
                    {project.date}
                  </span>
                  {project.builtFor && (
                    <span className="text-emerald-300 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded">
                      🏢 {project.builtFor}
                    </span>
                  )}
                  {project.isPrivate ? (
                    <span className="text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">
                      🔒 Enterprise Internal
                    </span>
                  ) : (
                    project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ff4d4d] hover:text-[#ff6666] bg-[#ff3333]/10 border border-[#ff3333]/40 px-2.5 py-1 rounded flex items-center gap-1 font-bold"
                      >
                        🚀 Open Live Demo ↗
                      </a>
                    )
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {project.title}
                </h2>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans">
                  {project.tagline}
                </p>
              </div>

              {/* High-Impact Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-950/90 border border-[#ff3333]/25 font-mono">
                {project.metrics.map((m, i) => (
                  <div key={i} className="text-center">
                    <div className="text-base sm:text-xl font-extrabold text-[#ff4d4d]">{m.value}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Technical Challenge Box */}
              <div className="p-5 rounded-xl bg-neutral-950/70 border border-neutral-800 font-mono text-xs">
                <div className="text-[#ff4d4d] font-bold mb-2 flex items-center gap-2">
                  <span>⚡</span> TECHNICAL CHALLENGE &amp; ENGINEERING SOLUTION
                </div>
                <p className="text-neutral-300 leading-relaxed font-sans text-sm">
                  {project.technicalChallenge}
                </p>
              </div>

              {/* Screenshot Preview */}
              <div
                className="relative aspect-video max-h-[380px] w-full rounded-xl overflow-hidden border border-neutral-800 group cursor-pointer bg-neutral-950"
                onClick={() => setFullscreenImage(true)}
              >
                <Image
                  src={project.imagePath}
                  alt={project.imageAlt}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 896px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 right-3 text-xs font-mono text-white bg-black/80 border border-white/20 px-3 py-1.5 rounded-lg backdrop-blur-md">
                  🔍 Click to Enlarge Fullscreen
                </div>
              </div>

              {/* Live Terminal Telemetry */}
              <div className="rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden font-mono text-xs">
                <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="text-[#ff3333]">&gt;</span>
                    <span>{project.mockupHeader.title}</span>
                  </div>
                  <span className="text-[10px] text-[#ff4d4d] font-bold bg-[#ff3333]/15 px-2 py-0.5 rounded border border-[#ff3333]/30">
                    ● {project.mockupHeader.badge}
                  </span>
                </div>

                {project.mockupContent.terminalLogs && (
                  <div className="p-4 space-y-2 bg-[#050505]">
                    {project.mockupContent.terminalLogs.map((log, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[#ff3333] font-bold">&gt;</span>
                        <span className="text-neutral-300 leading-relaxed">{log}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Outcomes Checklist */}
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff4d4d] mb-3">
                  // QUANTIFIABLE OUTCOMES
                </h3>
                <ul className="space-y-2.5">
                  {project.keyOutcomes.map((ko, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-neutral-300">
                      <span className="text-[#ff3333] font-mono font-bold">✓</span>
                      <span>{ko}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-2 font-mono text-xs">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[#ff9999] bg-[#ff3333]/10 border border-[#ff3333]/30 px-3 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}

          {activeTab === "mockup" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-2 border-b border-neutral-800">
                <span>INTERACTIVE DEMO APPLICATION SANDBOX</span>
                <span className="text-[#ff4d4d]">LIVE INSTANCE</span>
              </div>
              <ProjectInteractiveMockup projectId={project.id} />
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="space-y-6 font-mono text-xs">
              <h3 className="text-sm font-bold text-[#ff4d4d] uppercase tracking-wider">
                // {project.deepArchitecture.title}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.deepArchitecture.items.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-neutral-300 flex items-start gap-2.5"
                  >
                    <span className="text-[#ff3333] font-bold mt-0.5">&gt;</span>
                    <span className="font-sans text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {fullscreenImage && (
        <div
          role="presentation"
          onClick={() => setFullscreenImage(false)}
          className="fixed inset-0 z-[100005] bg-black/95 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-6xl w-full h-[80vh] rounded-2xl overflow-hidden border border-[#ff3333]/30">
            <Image
              src={project.imagePath}
              alt={project.imageAlt}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <button
              type="button"
              onClick={() => setFullscreenImage(false)}
              className="absolute top-4 right-4 bg-neutral-900/90 text-white px-3 py-1.5 rounded-lg border border-neutral-700 text-xs font-mono"
            >
              ✕ Close Zoom
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
