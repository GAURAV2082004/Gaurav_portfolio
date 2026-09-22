"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Project } from "@/data/projects";
import { isMockupProjectId } from "@/data/projects";

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
    <div className="h-64 md:h-80 bg-gray-900/80 animate-pulse rounded-xl border border-gray-800 flex items-center justify-center text-xs font-mono text-gray-500">
      Loading interactive demo…
    </div>
  );
}

function ProjectMockup({ projectId }: { projectId: string }) {
  if (!isMockupProjectId(projectId)) return null;

  const mockupBg =
    projectId === "ai-work-planner"
      ? "#0B1220"
      : projectId === "price-intel"
        ? "#F8FAFC"
        : "#f8fafc";

  return (
    <div
      className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl"
      style={{ background: mockupBg }}
    >
      {projectId === "price-intel" && <CompeteIntelMockupUI />}
      {projectId === "site-intel" && <SiteIntelMockupUI />}
      {projectId === "scm-analytics" && <ScmAnalyticsMockupUI />}
      {projectId === "ai-work-planner" && <WorkPlannerMockupUI />}
      {projectId === "prompt-lib" && <PromptLibMockupUI />}
    </div>
  );
}

interface ProjectCaseStudyModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectCaseStudyModal({ project, onClose }: ProjectCaseStudyModalProps) {
  const [previewImage, setPreviewImage] = useState(false);
  const [showInteractiveDemo, setShowInteractiveDemo] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (previewImage) setPreviewImage(false);
        else onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, previewImage]);

  useEffect(() => {
    setShowInteractiveDemo(false);
    setPreviewImage(false);
  }, [project.id]);

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        onClick={onClose}
        className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full sm:max-w-4xl lg:max-w-5xl max-h-[92vh] sm:max-h-[90vh] bg-gray-950 border border-gray-800 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="flex-shrink-0 flex items-start justify-between gap-4 px-5 py-4 border-b border-gray-800 bg-gray-900/90">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 bg-gray-900 border border-gray-800 px-2 py-0.5 rounded-md">
                  {project.category}
                </span>
                <span className="text-[10px] font-mono text-gray-500">{project.date}</span>
                {project.isPrivate && (
                  <span className="text-[10px] font-mono text-gray-500">· Enterprise Internal</span>
                )}
                {project.builtFor && (
                  <span className="text-[10px] font-mono text-emerald-400/90">· {project.builtFor}</span>
                )}
              </div>
              <h2 id="case-study-title" className="text-lg md:text-xl font-bold text-white leading-snug">
                {project.title}
              </h2>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">{project.tagline}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              data-hover
              aria-label="Close case study"
              className="flex-shrink-0 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 w-9 h-9 rounded-xl text-sm font-mono transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-6">
            <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-gray-800 bg-gray-900">
              <Image
                src={project.imagePath}
                alt={project.imageAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <button
                type="button"
                onClick={() => setPreviewImage(true)}
                data-hover
                className="absolute bottom-3 right-3 text-[11px] font-mono font-bold text-white/90 bg-black/60 hover:bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
              >
                Full screenshot ↗
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-gray-900/60 border border-gray-800/80">
              {project.metrics.map((m) => (
                <div key={m.label} className="text-center px-1">
                  <div className="text-sm md:text-base font-extrabold text-white font-mono">{m.value}</div>
                  <div className="text-[10px] font-mono text-gray-500 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="p-4 md:p-5 rounded-xl bg-gray-900/40 border border-gray-800/70">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                <span>⚡</span> Technical Challenge & Engineering Solution
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{project.technicalChallenge}</p>
            </div>

            {isMockupProjectId(project.id) && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowInteractiveDemo((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-700 hover:border-cyan-500/40 text-xs font-mono font-bold text-gray-300 hover:text-cyan-400 transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-cyan-400">⬡</span>
                    {showInteractiveDemo ? "Hide Interactive Demo" : "Show Interactive Demo →"}
                  </span>
                  <span
                    className={`transition-transform duration-300 text-cyan-400 ${showInteractiveDemo ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </button>
                {showInteractiveDemo && (
                  <div className="mt-3">
                    <ProjectMockup projectId={project.id} />
                  </div>
                )}
              </div>
            )}

            <div className="rounded-xl bg-gray-900/90 border border-gray-800 overflow-hidden font-mono text-xs shadow-lg">
              <div className="flex items-center justify-between px-4 py-2.5 bg-gray-950/90 border-b border-gray-800 text-gray-400">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono ml-2 truncate">
                    {project.mockupHeader.title}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded flex-shrink-0">
                  ● {project.mockupHeader.badge}
                </span>
              </div>

              {project.mockupContent.kpis && (
                <div className="grid grid-cols-3 gap-2 p-3.5 bg-gray-950/50 border-b border-gray-800/60">
                  {project.mockupContent.kpis.map((kp) => (
                    <div
                      key={kp.label}
                      className="bg-gray-900/70 p-2.5 rounded-xl border border-gray-800 text-center"
                    >
                      <div className="text-[10px] text-gray-500 uppercase">{kp.label}</div>
                      <div className="text-sm font-bold text-white mt-0.5">{kp.val}</div>
                      {kp.sub && (
                        <div className="text-[9px] text-cyan-400 font-mono mt-0.5">{kp.sub}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="p-4 space-y-2 bg-gray-950/40">
                {project.mockupContent.terminalLogs?.map((log) => (
                  <div key={log} className="flex items-start gap-2.5 text-xs">
                    <span className="text-cyan-400 flex-shrink-0 mt-0.5 font-bold">❯</span>
                    <span className="text-gray-300 leading-relaxed">{log}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">
                🎯 Key Quantifiable Outcomes & Impact
              </h3>
              <ul className="space-y-2.5">
                {project.keyOutcomes.map((ko) => (
                  <li key={ko} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <span className="text-cyan-400 font-bold mt-0.5">✓</span>
                    <span>{ko}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-3">
                ⚙️ {project.deepArchitecture.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.deepArchitecture.items.map((item) => (
                  <div
                    key={item}
                    className="p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80 text-xs text-gray-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono text-cyan-300/90 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-lg"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-t border-gray-800 bg-gray-900/50">
            {!project.isPrivate && project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                🚀 Live demo ↗
              </a>
            )}
            <span className="text-[11px] font-mono text-gray-500 ml-auto">Click backdrop or press Esc to close</span>
          </div>
        </div>
      </div>

      {previewImage && (
        <div
          role="presentation"
          onClick={() => setPreviewImage(false)}
          className="fixed inset-0 z-[100002] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full h-[70vh] bg-black rounded-xl overflow-hidden border border-gray-800"
          >
            <Image src={project.imagePath} alt={project.imageAlt} fill className="object-contain" sizes="100vw" />
            <button
              type="button"
              onClick={() => setPreviewImage(false)}
              className="absolute top-3 right-3 text-xs font-mono bg-gray-900/90 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
