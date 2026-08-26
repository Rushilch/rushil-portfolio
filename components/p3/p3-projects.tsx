"use client";

import React, { useState } from "react";
import { FolderGit2, ArrowRight, ShieldCheck, Cpu, Layers } from "lucide-react";
import { PROJECTS } from "@/data/portfolio-data";
import { Project, ProjectCategory } from "@/types/portfolio";
import { GithubIcon } from "@/components/icons";
import { sound } from "@/lib/sound";

interface P3ProjectsProps {
  onSelectProject: (projectId: string) => void;
}

export function P3Projects({ onSelectProject }: P3ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");

  const categories = [
    { id: "all" as ProjectCategory, label: "ALL QUESTS", count: PROJECTS.length },
    {
      id: "ml-cv" as ProjectCategory,
      label: "APPLIED ML & CV",
      count: PROJECTS.filter((p) => p.category === "ml-cv").length,
    },
    {
      id: "backend-systems" as ProjectCategory,
      label: "BACKEND & SYSTEMS",
      count: PROJECTS.filter((p) => p.category === "backend-systems").length,
    },
    {
      id: "desktop-tools" as ProjectCategory,
      label: "DESKTOP & ARCH",
      count: PROJECTS.filter((p) => p.category === "desktop-tools").length,
    },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const getRankBadge = (id: string) => {
    switch (id) {
      case "vaaniverse":
      case "smartinbox":
        return { label: "RANK S", color: "bg-[#ff2a5f] text-white" };
      case "ecovision":
      case "school-portal":
        return { label: "RANK A", color: "bg-[#00d2ff] text-[#030712]" };
      default:
        return { label: "RANK B", color: "bg-[#ffea00] text-[#030712]" };
    }
  };

  return (
    <section id="projects" className="py-20 border-t-2 border-[#00d2ff]/40 bg-[#030712] relative p3-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#00d2ff] text-[#030712] px-3 py-0.5 text-xs font-mono font-black uppercase transform skew-x-[-12deg] mb-2">
              <span className="transform skew-x-[12deg] flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5" />
                [QUEST LOG // MISSION ARCHIVE]
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f0f8ff] tracking-tight uppercase font-sans">
              FEATURED WORKING SYSTEMS
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-xl">
              Concrete software systems engineered from model architecture and database design to deployment.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-[#060e22] border-2 border-[#00d2ff]/40 p-1.5 p3-diagonal-border">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playSelect();
                  setSelectedCategory(cat.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`text-xs px-3 py-1.5 font-mono font-bold uppercase transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#00d2ff] text-[#030712] shadow-[0_0_15px_#00d2ff]"
                    : "text-slate-400 hover:text-[#00d2ff]"
                }`}
              >
                {cat.label} [{cat.count}]
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const rank = getRankBadge(project.id);

            return (
              <article
                key={project.id}
                onMouseEnter={() => sound.playHover()}
                className="bg-[#060e22] border-2 border-[#00d2ff]/40 hover:border-[#00d2ff] p3-cut-corner p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_0_30px_rgba(0,210,255,0.25)] relative overflow-hidden"
              >
                {/* Top Accent Strip */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Meta Header with Rank & Category */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold text-[#00d2ff] bg-[#030712] px-2 py-0.5 border border-[#00d2ff]/40 uppercase">
                      {project.categoryLabel}
                    </span>

                    <span className={`text-[10px] font-mono font-black px-2 py-0.5 uppercase ${rank.color}`}>
                      {rank.label}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-black text-[#f0f8ff] group-hover:text-[#00d2ff] transition-colors font-mono uppercase">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1 mb-3 line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Problem Statement */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4 font-sans">
                    {project.problemStatement}
                  </p>

                  {/* Metrics Badges */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 mb-4 bg-[#030712] border border-slate-800 p-2.5">
                      {project.metrics.slice(0, 2).map((m, i) => (
                        <div key={i}>
                          <div className="text-[9px] font-mono text-slate-500 uppercase">{m.label}</div>
                          <div className="text-xs font-mono font-bold text-[#00d2ff]">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1 mb-5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono text-slate-300 bg-[#030712] border border-slate-800 px-2 py-0.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
                  <button
                    onClick={() => {
                      sound.playSelect();
                      onSelectProject(project.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#00d2ff] hover:text-white transition-colors group/btn"
                  >
                    <span>INSPECT</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => sound.playHover()}
                      className="p-1.5 text-slate-400 hover:text-[#00d2ff] bg-[#030712] border border-slate-800 hover:border-[#00d2ff] transition-all"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
