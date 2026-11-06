"use client";

import { useEffect } from "react";
import type { Project } from "@/data/projects";
import ProjectCaseStudyView from "./ProjectCaseStudyView";

export interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
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
      aria-labelledby="project-detail-title"
      onClick={onClose}
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[900px] max-h-[90vh] bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project detail"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-lg bg-gray-900/95 border border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-sm"
        >
          ✕
        </button>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 md:px-8 md:py-8">
          <ProjectCaseStudyView project={project} variant="modal" detailTitleId="project-detail-title" />
        </div>
      </div>
    </div>
  );
}
