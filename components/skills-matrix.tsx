"use client";

import React, { useState } from "react";
import { Cpu, Check, Filter, Layers, FolderGit2, ArrowRight } from "lucide-react";
import { SKILLS, PROJECTS } from "@/data/portfolio-data";
import { SkillItem } from "@/types/portfolio";

interface SkillsMatrixProps {
  onSelectProject: (projectId: string) => void;
}

export function SkillsMatrix({ onSelectProject }: SkillsMatrixProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Technologies" },
    { id: "Languages", label: "Languages" },
    { id: "Backend & Systems", label: "Backend & Systems" },
    { id: "ML & Data Science", label: "ML & Data Science" },
    { id: "Desktop & Tools", label: "Desktop & Tools" },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  // Find projects matching selected skill
  const relatedProjects = selectedSkill
    ? PROJECTS.filter((p) => {
        const skill = SKILLS.find((s) => s.name === selectedSkill);
        return skill?.projects.includes(p.id);
      })
    : [];

  return (
    <section id="skills" className="py-20 border-t border-[#1e293b]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4" />
              <span>Skill Matrix & Project Cross-Linker</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
              Technical Stack & Applied Tools
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              No generic percentage bars. Every skill is tied directly to the concrete projects and systems where it was implemented.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-[#0e1322] border border-[#1e293b] p-1.5 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedSkill(null);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill === skill.name;
            const hasProjects = skill.projects.length > 0;

            return (
              <button
                key={skill.name}
                onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                  isSelected
                    ? "bg-[#111726] border-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/50"
                    : "bg-[#0b0f19] border-[#1e293b] hover:border-slate-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">
                      {skill.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        skill.level === "Proficient"
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800"
                          : skill.level === "Actively Deepening"
                          ? "bg-cyan-950/60 text-cyan-400 border border-cyan-800"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{skill.description}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#1e293b] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">{skill.category}</span>
                  {hasProjects ? (
                    <span className="text-emerald-400 group-hover:underline flex items-center gap-1">
                      {skill.projects.length} {skill.projects.length === 1 ? "Project" : "Projects"} &rarr;
                    </span>
                  ) : (
                    <span className="text-slate-600">Foundations</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Project Cross-Link Banner */}
        {selectedSkill && (
          <div className="bg-gradient-to-r from-emerald-950/30 to-[#0e1322] border border-emerald-500/40 rounded-xl p-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Linked Projects for &quot;{selectedSkill}&quot;:
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  {relatedProjects.length > 0
                    ? `Click any project below to inspect its architecture using ${selectedSkill}:`
                    : `Core language/tool used across foundational algorithms and coursework.`}
                </p>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-xs font-mono text-slate-400 hover:text-slate-200 underline self-start sm:self-auto"
              >
                Clear Selection
              </button>
            </div>

            {relatedProjects.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {relatedProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectProject(p.id)}
                    className="p-3 rounded-lg bg-[#070a12] border border-slate-800 hover:border-emerald-500 text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-semibold text-xs text-slate-200 group-hover:text-emerald-300">
                        {p.title}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">{p.categoryLabel}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
