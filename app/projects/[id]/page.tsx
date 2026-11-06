import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectById, projects } from "@/data/projects";
import ProjectCaseStudyView from "@/components/ProjectCaseStudyView";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} | Gaurav Jadli`,
    description: project.tagline,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-10 md:py-14">
        <nav className="mb-8 flex items-center justify-between text-xs text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">
            Gaurav Jadli
          </Link>
          <Link href="/#projects" className="hover:text-cyan-400 transition-colors">
            All projects
          </Link>
        </nav>
        <ProjectCaseStudyView project={project} variant="page" />
      </div>
    </main>
  );
}
