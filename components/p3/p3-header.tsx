"use client";

import React from "react";
import { Search, FileText, Keyboard } from "lucide-react";
import { sound } from "@/lib/sound";
import { PERSONAL_INFO } from "@/data/portfolio-data";

interface P3HeaderProps {
  onOpenResume: () => void;
  onOpenCommand: () => void;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export function P3Header({ onOpenResume, onOpenCommand, activeSection, onSelectSection }: P3HeaderProps) {
  const navTabs = [
    { id: "status", label: "Profile", key: "01" },
    { id: "projects", label: "Projects", key: "02" },
    { id: "skills", label: "Skills", key: "03" },
    { id: "learning", label: "Roadmap", key: "04" },
    { id: "education", label: "Education", key: "05" },
    { id: "contact", label: "Contact", key: "06" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#030712]/95 backdrop-blur-md border-b-2 border-[#00d2ff]/60 px-3 sm:px-6 py-2 shadow-[0_4px_30px_rgba(0,210,255,0.2)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        {/* Left: Brand Monomark & Developer Tag */}
        <div className="flex items-center justify-between md:justify-start gap-3">
          <a
            href="#"
            onMouseEnter={() => sound.playHover()}
            onClick={(e) => {
              e.preventDefault();
              sound.playSelect();
              onSelectSection("status");
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 bg-[#00d2ff] p3-diagonal-border flex items-center justify-center font-black text-[#030712] text-xs shadow-[0_0_15px_#00d2ff] group-hover:scale-105 transition-all font-mono">
              RC
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-wide text-[#f0f8ff] font-mono group-hover:text-[#00d2ff] transition-colors">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[10px] font-mono font-bold bg-[#00d2ff] text-[#030712] px-1.5 py-0.2 rounded-sm transform skew-x-[-10deg] shadow-[0_0_8px_#00d2ff]">
                  SWE / ML
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#00d2ff] tracking-wide -mt-0.5">
                Software Engineer &bull; Hyderabad
              </span>
            </div>
          </a>

          {/* Keyboard Navigation Helper Badge */}
          <div className="hidden xl:flex items-center gap-1.5 font-mono text-[11px] bg-[#060e22] border border-[#00d2ff]/40 px-2.5 py-1 text-slate-300 p3-cut-corner">
            <Keyboard className="w-3.5 h-3.5 text-[#00d2ff]" />
            <span>Nav: <kbd className="text-[#00d2ff] font-bold">W</kbd> / <kbd className="text-[#00d2ff] font-bold">S</kbd> &bull; <kbd className="text-[#ffea00] font-bold">1-6</kbd></span>
          </div>

          {/* Mobile Resume Action */}
          <button
            onClick={() => {
              sound.playSelect();
              onOpenResume();
            }}
            className="flex md:hidden bg-[#00d2ff] text-[#030712] px-2.5 py-1 text-xs font-bold font-mono transform skew-x-[-10deg]"
          >
            Resume [R]
          </button>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden sm:flex items-center gap-1 overflow-x-auto py-1">
          {navTabs.map((tab) => {
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playMenuSwitch();
                  onSelectSection(tab.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-3 py-1 font-mono text-xs font-bold transform skew-x-[-10deg] transition-all flex items-center gap-1 ${
                  isActive
                    ? "bg-[#00d2ff] text-[#030712] shadow-[0_0_15px_#00d2ff] scale-105"
                    : "bg-[#060e22] text-slate-300 border border-[#00d2ff]/30 hover:border-[#00d2ff] hover:text-[#00d2ff]"
                }`}
              >
                <span className="transform skew-x-[10deg] text-[10px] opacity-70">{tab.key}</span>
                <span className="transform skew-x-[10deg]">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Desktop Controls: Search & Resume */}
        <div className="hidden md:flex items-center gap-2 font-mono">
          <button
            onClick={() => {
              sound.playSelect();
              onOpenCommand();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1 bg-[#060e22] hover:bg-[#0a142e] text-[#00d2ff] border border-[#00d2ff]/50 px-2.5 py-1 text-xs transition-all"
            title="Search command palette [Press K]"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="bg-[#030712] text-[9px] text-slate-400 px-1 border border-slate-800">⌘K</kbd>
          </button>

          <button
            onClick={() => {
              sound.playSelect();
              onOpenResume();
            }}
            onMouseEnter={() => sound.playHover()}
            className="bg-[#00d2ff] hover:bg-[#00f0ff] text-[#030712] font-bold text-xs px-3.5 py-1 shadow-[0_0_15px_#00d2ff] transform skew-x-[-10deg] hover:scale-105 transition-all"
            title="Preview Resume PDF [Press R]"
          >
            <span className="transform skew-x-[10deg] flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              Resume.pdf [R]
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
