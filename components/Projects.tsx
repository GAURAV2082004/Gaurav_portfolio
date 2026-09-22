"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import ProjectCaseStudyModal from "./ProjectCaseStudyModal";
import { projects, type Project } from "@/data/projects";

const VISIBLE_TECH = 4;

function TechPills({ tech }: { tech: string[] }) {
  const visible = tech.slice(0, VISIBLE_TECH);
  const extra = tech.length - VISIBLE_TECH;

  return (
    <div className="flex flex-wrap gap-1.5 min-h-[1.75rem]">
      {visible.map((t) => (
        <span
          key={t}
          className="text-[10px] font-mono text-gray-400 bg-gray-900 border border-gray-800 px-2 py-0.5 rounded-md truncate max-w-[8.5rem]"
        >
          {t}
        </span>
      ))}
      {extra > 0 && (
        <span className="text-[10px] font-mono text-gray-500 px-1.5 py-0.5">+{extra} more</span>
      )}
    </div>
  );
}

function ProjectCompactCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const metricChips = project.metrics.slice(0, 3);

  return (
    <article
      className={`group flex flex-col h-full min-h-[420px] bg-gray-950/90 border border-gray-800 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40 ${project.accentBorder}`}
    >
      <button
        type="button"
        onClick={onOpen}
        data-hover
        className="flex flex-col flex-1 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
      >
        <div className="relative aspect-video w-full bg-gray-900 border-b border-gray-800 overflow-hidden">
          <Image
            src={project.imagePath}
            alt={project.imageAlt}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col flex-1 p-4 md:p-5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wide text-gray-400 bg-gray-900 border border-gray-800 px-2 py-0.5 rounded-md">
              {project.category}
            </span>
            <span className="text-[10px] font-mono text-gray-600 flex-shrink-0">{project.date}</span>
          </div>

          <h3 className="text-base md:text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-cyan-400/95 transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed flex-1">{project.tagline}</p>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {metricChips.map((m) => (
              <span
                key={m.label}
                className="text-[10px] font-mono text-gray-300 bg-gray-900/80 border border-gray-800 px-2 py-1 rounded-md"
              >
                {m.value}
              </span>
            ))}
          </div>

          <div className="mt-3">
            <TechPills tech={project.tech} />
          </div>

          <span className="mt-4 text-xs font-mono font-bold text-cyan-400 group-hover:text-cyan-300 inline-flex items-center gap-1">
            View Case Study <span aria-hidden>→</span>
          </span>
        </div>
      </button>

      {!project.isPrivate && project.demoUrl && (
        <div className="px-4 pb-4 pt-0 -mt-2">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            onClick={(e) => e.stopPropagation()}
            className="text-[10px] font-mono text-emerald-400/90 hover:text-emerald-300 transition-colors"
          >
            Live demo ↗
          </a>
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const categories = ["All", "AI & Automation", "Web & Cloud", "Data & Analytics"];

  const filtered =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId) ?? null
    : null;

  return (
    <section id="projects" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-cyan-400 font-mono text-sm tracking-wider">03.</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                  Featured Systems & Projects
                </h2>
              </div>
              <p className="text-gray-400 text-sm font-mono ml-9 max-w-xl">
                Production automation, enterprise ERP, and AI systems — open a case study for depth
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0 bg-gray-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-gray-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  data-hover
                  className={`text-xs font-mono px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-cyan-500 text-gray-950 font-bold shadow-lg shadow-cyan-500/25"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {filtered.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 40} direction="up">
              <ProjectCompactCard project={project} onOpen={() => setSelectedProjectId(project.id)} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectCaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </section>
  );
}
