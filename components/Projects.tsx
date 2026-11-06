"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/data/projects";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [screenshotProject, setScreenshotProject] = useState<Project | null>(null);

  const categories = ["All", "AI & Automation", "Web & Cloud", "Data & Analytics"];

  const filtered =
    activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-cyan-400 font-mono text-sm">03.</span>
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  Featured Systems & Projects
                </h2>
              </div>
              <p className="text-gray-500 text-sm ml-8 max-w-lg">
                Compact overview below — open a case study for mockups, terminal logs, and full specs.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl border border-gray-800 bg-gray-900/50">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] px-3 py-1.5 rounded-lg transition-colors ${
                    activeCategory === cat
                      ? "bg-gray-800 text-white font-medium"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 40} direction="up">
              <ProjectCard
                project={project}
                onOpenDetail={() => setSelectedProject(project)}
                onOpenScreenshot={() => setScreenshotProject(project)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      {screenshotProject && (
        <div
          role="presentation"
          onClick={() => setScreenshotProject(null)}
          className="fixed inset-0 z-[100001] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-gray-950 border border-gray-800 rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <h3 className="text-sm font-medium text-white truncate pr-4">{screenshotProject.title}</h3>
              <button
                type="button"
                onClick={() => setScreenshotProject(null)}
                className="text-gray-400 hover:text-white text-sm px-2 py-1"
              >
                ✕
              </button>
            </div>
            <div className="relative w-full h-[65vh] bg-black">
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
