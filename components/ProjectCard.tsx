"use client";

import Image from "next/image";
import type { Project } from "@/data/projects";

export interface ProjectCardProps {
  project: Project;
  onOpenDetail: () => void;
  onOpenScreenshot: () => void;
}

export default function ProjectCard({ project, onOpenDetail, onOpenScreenshot }: ProjectCardProps) {
  const metricPills = project.metrics.slice(0, 3);

  return (
    <article
      className={`group flex w-full max-w-[380px] mx-auto flex-col max-h-[420px] overflow-hidden rounded-2xl border border-gray-800 bg-gray-950/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-700 hover:shadow-lg hover:shadow-black/30 ${project.accentBorder}`}
    >
      <button
        type="button"
        onClick={onOpenDetail}
        className="flex flex-col flex-1 min-h-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
      >
        <div className="relative h-[200px] w-full flex-shrink-0 aspect-video bg-gray-900 border-b border-gray-800">
          <Image
            src={project.imagePath}
            alt={project.imageAlt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 380px"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col flex-1 min-h-0 px-4 pt-3 pb-2">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] font-medium uppercase tracking-wide text-gray-400 border border-gray-800 rounded-md px-2 py-0.5">
              {project.category}
            </span>
            {project.isPrivate && (
              <span className="text-[10px] text-gray-500">🔒 Enterprise Internal</span>
            )}
            <span className="text-[10px] text-gray-600 ml-auto">{project.date}</span>
          </div>

          <h3 className="text-base font-semibold text-white leading-snug line-clamp-1 group-hover:text-cyan-400/90 transition-colors">
            {project.title}
          </h3>

          <div className="flex flex-wrap items-center gap-1 mt-1.5">
            {metricPills.map((m) => (
              <span
                key={m.label}
                className="text-[10px] text-gray-400 border border-gray-800/90 bg-gray-900/60 rounded-full px-2 py-0.5"
              >
                {m.value}
              </span>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-2 line-clamp-1">{project.tagline}</p>

          <div className="mt-2 p-2 rounded-lg bg-gray-900/40 border border-gray-800/80">
            <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">{project.technicalChallenge}</p>
            <span className="mt-1 inline-block text-[11px] font-medium text-cyan-400 group-hover:text-cyan-300">
              Read more →
            </span>
          </div>
        </div>
      </button>

      <div className="flex-shrink-0 flex items-center justify-between gap-3 px-4 py-2.5 border-t border-gray-800/80 bg-gray-950/95">
        <button
          type="button"
          onClick={onOpenScreenshot}
          className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors"
        >
          🔍 View High-Res Mockup
        </button>
        <button
          type="button"
          onClick={onOpenDetail}
          className="text-xs font-medium text-gray-950 bg-cyan-500 hover:bg-cyan-400 px-3.5 py-1.5 rounded-lg transition-colors"
        >
          View Case Study
        </button>
      </div>
    </article>
  );
}
