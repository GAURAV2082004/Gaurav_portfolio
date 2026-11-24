"use client";

import { useState } from "react";
import Image from "next/image";
import CyberProjectModal from "./CyberProjectModal";
import CodeInspectorDrawer from "./CodeInspectorDrawer";
import CyberBoxAgent from "./CyberBoxAgent";
import { projects, type Project } from "@/data/projects";
import { sound } from "@/lib/audio";
import LiveBuild from "./LiveBuild";
import Typed from "./Typed";

export default function CyberProjects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inspectingProject, setInspectingProject] = useState<Project | null>(null);

  // Filter tab counts computed dynamically from data
  const categories = [
    { label: `All (${projects.length})`, value: "All" },
    {
      label: `AI & Automation (${projects.filter((p) => p.category === "AI & Automation").length})`,
      value: "AI & Automation",
    },
    {
      label: `Web & Cloud (${projects.filter((p) => p.category === "Web & Cloud").length})`,
      value: "Web & Cloud",
    },
    {
      label: `Data & Analytics (${projects.filter((p) => p.category === "Data & Analytics").length})`,
      value: "Data & Analytics",
    },
  ];

  const filtered =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <LiveBuild id="projects-header">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 font-mono">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#ff3333] text-sm font-bold">[03]</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  <Typed>Projects</Typed>
                </h2>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm font-sans ml-8 max-w-xl">
                Production-ready scraping pipelines, real-time telemetry sentinels, supply chain ERP systems,
                and AI automation platforms.
              </p>
            </div>

            {/* Filter Pills with dynamic counts */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl border border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => {
                    sound.playClick(750);
                    setActiveCategory(cat.value);
                  }}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeCategory === cat.value
                      ? "bg-[#ff3333] text-white font-bold shadow-[0_0_14px_rgba(255,51,51,0.5)]"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </LiveBuild>

        {/* Project Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filtered.map((project, i) => (
            <LiveBuild key={project.id} id={`project-card-${project.id}`} isGraphic className="h-full">
              <article className="group h-full flex flex-col cyber-panel cyber-panel-hover rounded-2xl border border-neutral-800 hover:border-[#ff3333]/50 transition-all duration-300 corner-bracket overflow-hidden relative bg-[#0a0a0a]">
                {/* Embedded Box Agent Cursor for First Featured Project */}
                {i === 0 && (
                  <CyberBoxAgent
                    agent={{
                      id: "agent-03",
                      name: "Agent 03",
                      role: "Optimizer",
                      color: "#ff3333",
                    }}
                    waypoints={[
                      {
                        xPercent: 24,
                        yPercent: 32,
                        action: "highlight",
                        targetLabel: "METRIC_STRIP",
                        statusText: "Analyzing 10k+ SKU catalog scale",
                        pause: 2500,
                      },
                      {
                        xPercent: 45,
                        yPercent: 78,
                        action: "click",
                        targetLabel: "TECH_STACK",
                        statusText: "Testing Python fallback parser",
                        pause: 2200,
                      },
                    ]}
                  />
                )}

                {/* 1. Image */}
                <div
                  onClick={() => {
                    sound.playClick(900);
                    setSelectedProject(project);
                  }}
                  className="relative h-48 sm:h-52 w-full bg-neutral-950 border-b border-neutral-800 cursor-pointer overflow-hidden flex-shrink-0"
                >
                  <Image
                    src={project.imagePath}
                    alt={project.imageAlt}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-70" />
                  <div className="absolute inset-0 cyber-scanlines opacity-25 pointer-events-none" />

                  {/* 2. Date */}
                  <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 border border-white/10 text-neutral-300 backdrop-blur-md">
                    {project.date}
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex-1 flex flex-col p-5 sm:p-6 space-y-4">
                  {/* 3. Category & 4. Status Badge */}
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                    <span className="text-[#ff4d4d] bg-[#ff3333]/15 border border-[#ff3333]/30 px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                    {project.status === "Live Demo" && (
                      <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded font-bold">
                        Live Demo
                      </span>
                    )}
                    {project.status === "Enterprise Internal" && (
                      <span className="text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                        Enterprise Internal
                      </span>
                    )}
                    {project.status === "Open Source" && (
                      <span className="text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded">
                        Open Source
                      </span>
                    )}
                  </div>

                  {/* 5. Title & 6. One-line Subtitle */}
                  <div>
                    <h3
                      onClick={() => {
                        sound.playClick(900);
                        setSelectedProject(project);
                      }}
                      className="text-base sm:text-lg font-bold text-white group-hover:text-[#ff4d4d] transition-colors cursor-pointer leading-snug"
                    >
                      <Typed>{project.title}</Typed>
                    </h3>
                    <p className="text-neutral-400 text-xs mt-1.5 leading-relaxed font-sans line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* 7. Exactly 3 Metrics */}
                  <div className="grid grid-cols-3 gap-1.5 py-2 px-3 rounded-lg bg-neutral-950/90 border border-neutral-800/80 font-mono text-center">
                    {project.metrics.map((m, mi) => (
                      <div key={mi}>
                        <div className="text-xs font-bold text-[#ff4d4d] truncate">{m.value}</div>
                        <div className="text-[9px] text-neutral-400 truncate mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* 8. Description: Exactly 3 sentences (Problem, Built, Result) */}
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* 9. Tags (max 5, no overflow "+N") */}
                  <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
                    {project.tech.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="text-neutral-300 bg-neutral-900/90 border border-neutral-800 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* 10. Exactly 2 Action Buttons */}
                  <div className="pt-3 mt-auto border-t border-neutral-800/80 flex items-center justify-between gap-2 font-mono text-xs">
                    {project.inspectAvailable ? (
                      <button
                        type="button"
                        onClick={() => {
                          sound.playBeep();
                          setInspectingProject(project);
                        }}
                        className="text-[11px] text-[#ff4d4d] hover:text-white bg-[#ff3333]/10 hover:bg-[#ff3333]/25 px-2.5 py-1.5 rounded border border-[#ff3333]/30 transition-all cursor-pointer flex items-center gap-1"
                      >
                        <span>{`{ }`}</span>
                        <span>Inspect JSON</span>
                      </button>
                    ) : (
                      <span />
                    )}

                    {project.status === "Live Demo" && project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick(1000)}
                        className="btn-cyber px-3 py-1.5 bg-[#ff3333] hover:bg-[#ff1a1a] text-white font-bold transition-all text-xs cursor-pointer shadow-[0_0_12px_rgba(255,51,51,0.3)] flex items-center gap-1"
                      >
                        [▶ Live Demo ↗]
                      </a>
                    ) : project.caseStudyAvailable ? (
                      <button
                        type="button"
                        onClick={() => {
                          sound.playClick(1000);
                          setSelectedProject(project);
                        }}
                        className="btn-cyber px-3 py-1.5 bg-[#ff3333] hover:bg-[#ff1a1a] text-white font-bold transition-all text-xs cursor-pointer shadow-[0_0_12px_rgba(255,51,51,0.3)]"
                      >
                        [▶ Case Study]
                      </button>
                    ) : (
                      <span />
                    )}
                  </div>
                </div>
              </article>
            </LiveBuild>
          ))}
        </div>
      </div>

      {/* Slide-in Code Inspector Drawer */}
      <CodeInspectorDrawer project={inspectingProject} onClose={() => setInspectingProject(null)} />

      {/* Deep-Dive Case Study Modal */}
      {selectedProject && (
        <CyberProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
