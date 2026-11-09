"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import CyberProjectModal from "./CyberProjectModal";
import CyberBoxAgent from "./CyberBoxAgent";
import { projects, type Project } from "@/data/projects";

export default function CyberProjects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [screenshotProject, setScreenshotProject] = useState<Project | null>(null);

  const categories = [
    { label: "ALL_SYSTEMS (5)", value: "All" },
    { label: "AI & AUTOMATION (2)", value: "AI & Automation" },
    { label: "WEB & CLOUD (2)", value: "Web & Cloud" },
    { label: "DATA & ANALYTICS (1)", value: "Data & Analytics" },
  ];

  const filtered =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          {/* Section Terminal Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 font-mono">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#ff3333] text-sm font-bold">[03]</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  // PRODUCTION_PROJECTS_BENTO_GRID
                </h2>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm font-sans ml-8 max-w-xl">
                Autonomous scraping engines, high-speed telemetry sentinels, supply chain BI systems, and voice-to-JSON AI pipelines.
              </p>
            </div>

            {/* Filter HUD Pills */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl border border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setActiveCategory(cat.value)}
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
        </ScrollReveal>

        {/* Project Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 60} direction="up">
              <article className="group h-full flex flex-col cyber-panel cyber-panel-hover rounded-2xl border border-neutral-800 hover:border-[#ff3333]/50 transition-all duration-300 corner-bracket overflow-hidden relative bg-[#0a0a0a]">
                {/* Dedicated Box Agent Cursor for Featured Project */}
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
                        statusText: "Analyzing 10,482 SKU catalog scale",
                        pause: 2500,
                      },
                      {
                        xPercent: 45,
                        yPercent: 78,
                        action: "click",
                        targetLabel: "TECH_STACK",
                        statusText: "Pinging PHP 8 cURL multi socket",
                        pause: 2200,
                      },
                      {
                        xPercent: 62,
                        yPercent: 55,
                        action: "type",
                        targetLabel: "QUERY_PLAN",
                        statusText: "Optimizing SQL query latency",
                        typeText: "latency: 180ms [OPTIMIZED]",
                        pause: 2800,
                      },
                    ]}
                  />
                )}

                {/* Project Image Preview with Cyber Scanlines */}
                <div
                  onClick={() => setSelectedProject(project)}
                  className="relative h-48 sm:h-52 w-full bg-neutral-950 border-b border-neutral-800 cursor-pointer overflow-hidden"
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
                  
                  {/* Subtle Scanline Overlay */}
                  <div className="absolute inset-0 cyber-scanlines opacity-25 pointer-events-none" />

                  {/* Top-Right Badge */}
                  <div className="absolute top-3 right-3 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 border border-white/10 text-neutral-300 backdrop-blur-md">
                    {project.date}
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex-1 flex flex-col p-5 sm:p-6 space-y-4">
                  {/* Category & Status */}
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                    <span className="text-[#ff4d4d] bg-[#ff3333]/15 border border-[#ff3333]/30 px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                    {project.isPrivate ? (
                      <span className="text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                        🔒 Enterprise Internal
                      </span>
                    ) : (
                      <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded font-bold">
                        🚀 Live Demo Available
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3
                      onClick={() => setSelectedProject(project)}
                      className="text-lg font-bold text-white group-hover:text-[#ff4d4d] transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm mt-1.5 leading-relaxed font-sans line-clamp-2">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-3 gap-1.5 py-2 px-3 rounded-lg bg-neutral-950/90 border border-neutral-800/80 font-mono text-center">
                    {project.metrics.slice(0, 3).map((m, mi) => (
                      <div key={mi}>
                        <div className="text-xs font-bold text-[#ff4d4d] truncate">{m.value}</div>
                        <div className="text-[9px] text-neutral-500 truncate mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technical Challenge Snippet */}
                  <div className="p-3 rounded-lg bg-neutral-950/70 border border-neutral-800/70 text-xs text-neutral-300 font-sans line-clamp-2">
                    <span className="text-[#ff3333] font-mono mr-1">⚡</span>
                    {project.technicalChallenge}
                  </div>

                  {/* Compact Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[10px]">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-neutral-300 bg-neutral-900/90 border border-neutral-800 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-neutral-500 bg-neutral-900/50 border border-neutral-800 px-1.5 py-0.5 rounded">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 mt-auto border-t border-neutral-800/80 flex items-center justify-between gap-2 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setScreenshotProject(project)}
                      className="text-[11px] text-neutral-400 hover:text-[#ff4d4d] transition-colors cursor-pointer"
                    >
                      🔍 High-Res View
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="btn-cyber px-3.5 py-1.5 bg-[#ff3333] hover:bg-[#ff1a1a] text-white font-bold transition-all text-xs cursor-pointer shadow-[0_0_12px_rgba(255,51,51,0.3)]"
                    >
                      [▶ CASE_STUDY]
                    </button>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Deep-Dive Case Study Modal */}
      {selectedProject && (
        <CyberProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* High-Res Screenshot Inspection Modal */}
      {screenshotProject && (
        <div
          role="presentation"
          onClick={() => setScreenshotProject(null)}
          className="fixed inset-0 z-[100002] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 font-mono cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl cyber-panel rounded-2xl overflow-hidden border border-[#ff3333]/40 bg-[#0a0a0a]"
          >
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800 text-xs">
              <span className="text-white font-bold">{screenshotProject.title}</span>
              <button
                type="button"
                onClick={() => setScreenshotProject(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕ Close
              </button>
            </div>
            <div className="relative w-full h-[70vh] bg-black">
              <Image
                src={screenshotProject.imagePath}
                alt={screenshotProject.imageAlt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
