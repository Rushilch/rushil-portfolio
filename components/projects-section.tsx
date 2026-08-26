"use client";

import React, { useState } from "react";
import { FolderGit2, ExternalLink, Cpu, ShieldCheck, ArrowRight, Layers, CheckCircle2 } from "lucide-react";
import { PROJECTS } from "@/data/portfolio-data";
import { Project, ProjectCategory } from "@/types/portfolio";
import { GithubIcon } from "@/components/icons";

interface ProjectsSectionProps {
  onSelectProject: (projectId: string) => void;
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");

  const categories = [
    { id: "all" as ProjectCategory, label: "All Projects", count: PROJECTS.length },
    {
      id: "ml-cv" as ProjectCategory,
      label: "Applied ML & CV",
      count: PROJECTS.filter((p) => p.category === "ml-cv").length,
    },
    {
      id: "backend-systems" as ProjectCategory,
      label: "Backend & Systems",
      count: PROJECTS.filter((p) => p.category === "backend-systems").length,
    },
    {
      id: "desktop-tools" as ProjectCategory,
      label: "Desktop & Architecture",
      count: PROJECTS.filter((p) => p.category === "desktop-tools").length,
    },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 border-t border-[#1e293b]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>Project Case Studies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
              Selected Working Systems
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Self-directed engineering projects built from model design and backend architecture to deployment. No toy notebooks or tutorial clones.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-[#0e1322] border border-[#1e293b] p-1.5 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-[#0b0f19] border border-[#1e293b] hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.15)] relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-900/60 font-semibold">
                    {project.categoryLabel}
                  </span>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      project.status === "Completed"
                        ? "text-emerald-400 bg-emerald-950/40 border border-emerald-800/60"
                        : "text-amber-400 bg-amber-950/40 border border-amber-800/60"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1 mb-3 line-clamp-2">
                  {project.tagline}
                </p>

                {/* Problem snippet */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {project.problemStatement}
                </p>

                {/* Metrics Badges */}
                {project.metrics && (
                  <div className="grid grid-cols-2 gap-2 mb-4 bg-[#0e1322] border border-[#1e293b] p-2.5 rounded-lg">
                    {project.metrics.slice(0, 2).map((m, i) => (
                      <div key={i}>
                        <div className="text-[10px] font-mono text-slate-500">{m.label}</div>
                        <div className="text-xs font-mono font-bold text-slate-200">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono text-slate-400 bg-[#0e1322] border border-slate-800/80 px-2 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[11px] font-mono text-slate-500 bg-[#0e1322] px-1.5 py-0.5 rounded">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#1e293b]">
                <button
                  onClick={() => onSelectProject(project.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
                >
                  <span>Deep Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">Architecture</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
