"use client";

import React, { useState, useEffect } from "react";
import { Search, X, FolderGit2, Cpu, GraduationCap, Mail, Phone, FileText, ExternalLink, ArrowRight } from "lucide-react";
import { PERSONAL_INFO, PROJECTS } from "@/data/portfolio-data";
import { filterProjects } from "@/lib/search-filter";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onSelectProject: (projectId: string) => void;
}

export function CommandPalette({ isOpen, onClose, onOpenResume, onSelectProject }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : undefined;
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = filterProjects(PROJECTS, query);

  const handleAction = (callback: () => void) => {
    callback();
    onClose();
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#0e1322] border border-[#1e293b] rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e293b] bg-[#111726]">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, skills, or quick actions (e.g. VaaniVerse, C#, Docker)..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-200"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Results / Action List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Quick Navigation Sections */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2 mb-1.5">
              Quick Navigation
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => handleAction(() => scrollToSection("projects"))}
                className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-[#161e31] hover:text-cyan-300 text-left transition-all"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Featured Projects</span>
              </button>
              <button
                onClick={() => handleAction(() => scrollToSection("skills"))}
                className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-[#161e31] hover:text-cyan-300 text-left transition-all"
              >
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Skills Matrix</span>
              </button>
              <button
                onClick={() => handleAction(() => scrollToSection("learning"))}
                className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-[#161e31] hover:text-cyan-300 text-left transition-all"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Currently Learning</span>
              </button>
              <button
                onClick={() => handleAction(() => scrollToSection("education"))}
                className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:bg-[#161e31] hover:text-cyan-300 text-left transition-all"
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>Education & Academic</span>
              </button>
            </div>
          </div>

          {/* Projects Match */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2 mb-1.5">
              Projects ({filteredProjects.length})
            </div>
            <div className="space-y-1">
              {filteredProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleAction(() => onSelectProject(p.id))}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-slate-200 hover:bg-[#161e31] text-left transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-100">{p.title}</span>
                    <span className="text-[10px] font-mono text-slate-500">&bull; {p.categoryLabel}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-cyan-400 font-mono">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-2 mb-1.5">
              Direct Contact & Documents
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleAction(onOpenResume)}
                className="w-full flex items-center justify-between p-2 rounded-lg text-slate-200 hover:bg-[#161e31] text-left"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Preview / Download Resume</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">PDF</span>
              </button>

              <button
                onClick={() =>
                  handleAction(() => {
                    navigator.clipboard.writeText(PERSONAL_INFO.email);
                  })
                }
                className="w-full flex items-center justify-between p-2 rounded-lg text-slate-200 hover:bg-[#161e31] text-left"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copy Email ({PERSONAL_INFO.email})</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Clipboard</span>
              </button>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg text-slate-200 hover:bg-[#161e31] text-left"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>Open GitHub Profile ({PERSONAL_INFO.githubUsername})</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#0b0f19] border-t border-[#1e293b] flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Navigate with mouse or enter</span>
          <span>ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
