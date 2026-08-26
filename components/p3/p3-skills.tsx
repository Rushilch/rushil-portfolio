"use client";

import React, { useState } from "react";
import { Cpu, Zap, Flame, Snowflake, Wind, ArrowRight } from "lucide-react";
import { SKILLS, PROJECTS } from "@/data/portfolio-data";
import { sound } from "@/lib/sound";

interface P3SkillsProps {
  onSelectProject: (projectId: string) => void;
}

export function P3Skills({ onSelectProject }: P3SkillsProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "FULL DECK", element: "ALL" },
    { id: "Languages", label: "ZIO // LANGUAGES", element: "ELEC" },
    { id: "Backend & Systems", label: "AGI // BACKEND & DB", element: "FIRE" },
    { id: "ML & Data Science", label: "BUFU // ML & VISION", element: "ICE" },
    { id: "Desktop & Tools", label: "GARU // DESKTOP & TOOLS", element: "WIND" },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  const relatedProjects = selectedSkill
    ? PROJECTS.filter((p) => {
        const skill = SKILLS.find((s) => s.name === selectedSkill);
        return skill?.projects.includes(p.id);
      })
    : [];

  return (
    <section id="skills" className="py-20 border-t-2 border-[#00d2ff]/40 bg-[#030712] relative p3-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#10b981] text-[#030712] px-3 py-0.5 text-xs font-mono font-black uppercase transform skew-x-[-12deg] mb-2">
              <span className="transform skew-x-[12deg] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                [PERSONA SKILL DECK // EQUIPPED ABILITIES]
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f0f8ff] tracking-tight uppercase font-sans">
              APPLIED STACK &amp; CAPABILITIES
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 max-w-xl">
              Click any skill card to cross-reference concrete system implementations in the quest archive.
            </p>
          </div>

          {/* Elemental Category Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-[#060e22] border-2 border-[#00d2ff]/40 p-1.5 p3-diagonal-border">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playSelect();
                  setActiveCategory(cat.id);
                  setSelectedSkill(null);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`text-xs px-3 py-1.5 font-mono font-bold uppercase transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#10b981] text-[#030712] shadow-[0_0_15px_#10b981]"
                    : "text-slate-400 hover:text-[#10b981]"
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
                onClick={() => {
                  sound.playSelect();
                  setSelectedSkill(isSelected ? null : skill.name);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`p-4 border-2 text-left transition-all duration-200 p3-cut-corner flex flex-col justify-between group ${
                  isSelected
                    ? "bg-[#0a142e] border-[#10b981] shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                    : "bg-[#060e22] border-[#00d2ff]/30 hover:border-[#00d2ff]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-sm text-[#f0f8ff] group-hover:text-[#10b981] transition-colors font-mono uppercase">
                      {skill.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.2 font-bold uppercase ${
                        skill.level === "Proficient"
                          ? "bg-[#10b981] text-[#030712]"
                          : skill.level === "Actively Deepening"
                          ? "bg-[#00d2ff] text-[#030712]"
                          : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{skill.description}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-500 uppercase">{skill.category}</span>
                  {hasProjects ? (
                    <span className="text-[#10b981] font-bold group-hover:underline flex items-center gap-1">
                      {skill.projects.length} QUESTS LINKED &rarr;
                    </span>
                  ) : (
                    <span className="text-slate-600">CORE FOUNDATIONS</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Project Cross-Link Banner */}
        {selectedSkill && (
          <div className="bg-[#060e22] border-2 border-[#10b981] p-5 p3-cut-corner animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#10b981] uppercase tracking-wider">
                  [ACTIVE LINK] &bull; QUESTS REQUIRING {selectedSkill.toUpperCase()}:
                </span>
                <p className="text-xs font-mono text-slate-300 mt-0.5">
                  {relatedProjects.length > 0
                    ? `Click any dossier below to inspect implementation of ${selectedSkill}:`
                    : `Core language / foundational capability applied in academic algorithms.`}
                </p>
              </div>
              <button
                onClick={() => {
                  sound.playCancel();
                  setSelectedSkill(null);
                }}
                className="text-xs font-mono text-slate-400 hover:text-white underline self-start sm:self-auto"
              >
                [CLEAR SELECTION]
              </button>
            </div>

            {relatedProjects.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {relatedProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      sound.playSelect();
                      onSelectProject(p.id);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="p-3 bg-[#030712] border border-slate-800 hover:border-[#10b981] text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="font-bold text-xs text-[#f0f8ff] group-hover:text-[#10b981] font-mono uppercase">
                        {p.title}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">{p.categoryLabel}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#10b981] group-hover:translate-x-1 transition-transform" />
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
