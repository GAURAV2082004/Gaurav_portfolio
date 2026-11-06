"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    <div className="h-64 md:h-80 bg-gray-900/80 animate-pulse rounded-xl border border-gray-800 flex items-center justify-center text-xs text-gray-500">
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
    <div className="rounded-xl overflow-hidden border border-gray-800" style={{ background: mockupBg }}>
      {projectId === "price-intel" && <CompeteIntelMockupUI />}
      {projectId === "site-intel" && <SiteIntelMockupUI />}
      {projectId === "scm-analytics" && <ScmAnalyticsMockupUI />}
      {projectId === "ai-work-planner" && <WorkPlannerMockupUI />}
      {projectId === "prompt-lib" && <PromptLibMockupUI />}
    </div>
  );
}

interface ProjectCaseStudyViewProps {
  project: Project;
  variant?: "page" | "modal";
  detailTitleId?: string;
}

export default function ProjectCaseStudyView({
  project,
  variant = "page",
  detailTitleId = "case-study-title",
}: ProjectCaseStudyViewProps) {
  const [previewImage, setPreviewImage] = useState(false);

  return (
    <>
      <header className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-gray-800">
        <div className="min-w-0">
          {variant === "page" && (
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-cyan-400 transition-colors mb-3"
            >
              ← Back to projects
            </Link>
          )}
          <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-gray-500">
            <span className="text-gray-400 border border-gray-800 bg-gray-900/80 px-2 py-0.5 rounded-md">
              {project.category}
            </span>
            <span>{project.date}</span>
            {project.isPrivate && <span>· Internal</span>}
            {project.builtFor && <span className="text-emerald-400/90">· {project.builtFor}</span>}
          </div>
          <h1 id={detailTitleId} className="text-2xl md:text-3xl font-bold text-white tracking-tight pr-10">
            {project.title}
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-2 max-w-3xl">{project.tagline}</p>
        </div>
      </header>

      <div className="pt-8 space-y-8">
        <div className="relative aspect-video max-h-[420px] w-full rounded-xl overflow-hidden border border-gray-800 bg-gray-900">
          <Image
            src={project.imagePath}
            alt={project.imageAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority={variant === "page"}
          />
          <button
            type="button"
            onClick={() => setPreviewImage(true)}
            className="absolute bottom-3 right-3 text-[11px] font-medium text-white/90 bg-black/60 hover:bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
          >
            Full screenshot
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-gray-900/50 border border-gray-800">
          {project.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-sm md:text-lg font-semibold text-white">{m.value}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        <section className="p-5 rounded-xl bg-gray-900/30 border border-gray-800">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            Technical challenge
          </h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">{project.technicalChallenge}</p>
        </section>

        {isMockupProjectId(project.id) && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Interactive product mockup
            </h2>
            <ProjectMockup projectId={project.id} />
          </section>
        )}

        <section className="rounded-xl bg-gray-900/90 border border-gray-800 overflow-hidden font-mono text-xs shadow-lg">
          <div className="flex items-center justify-between px-4 py-2.5 bg-gray-950/90 border-b border-gray-800 text-gray-400">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[11px] text-gray-400 ml-2 truncate">{project.mockupHeader.title}</span>
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
                  {kp.sub && <div className="text-[9px] text-cyan-400 mt-0.5">{kp.sub}</div>}
                </div>
              ))}
            </div>
          )}

          {project.mockupContent.terminalLogs && (
            <div className="p-4 space-y-2 bg-gray-950/40">
              {project.mockupContent.terminalLogs.map((log) => (
                <div key={log} className="flex items-start gap-2.5 text-xs">
                  <span className="text-cyan-400 flex-shrink-0 mt-0.5 font-bold">❯</span>
                  <span className="text-gray-300 leading-relaxed">{log}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Outcomes</h2>
          <ul className="space-y-2">
            {project.keyOutcomes.map((ko) => (
              <li key={ko} className="flex gap-2 text-sm text-gray-300">
                <span className="text-cyan-400">✓</span>
                <span>{ko}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
            {project.deepArchitecture.title}
          </h2>
          <ul className="grid md:grid-cols-2 gap-2">
            {project.deepArchitecture.items.map((item) => (
              <li
                key={item}
                className="text-xs text-gray-400 border border-gray-800 rounded-lg px-3 py-2 bg-gray-900/40"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs text-gray-400 border border-gray-800 bg-gray-900/60 px-2.5 py-1 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>

        {!project.isPrivate && project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm font-medium text-cyan-400 hover:text-cyan-300"
          >
            Open live demo ↗
          </a>
        )}
      </div>

      {previewImage && (
        <div
          role="presentation"
          onClick={() => setPreviewImage(false)}
          className="fixed inset-0 z-[100002] bg-black/95 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full h-[70vh] rounded-xl overflow-hidden border border-gray-800"
          >
            <Image src={project.imagePath} alt={project.imageAlt} fill className="object-contain" sizes="100vw" />
            <button
              type="button"
              onClick={() => setPreviewImage(false)}
              className="absolute top-3 right-3 text-xs bg-gray-900/90 text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
