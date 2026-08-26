"use client";

import React from "react";
import { Moon, Shield, Zap, Sparkles, ChevronRight, FileText, FolderGit2, Cpu, GraduationCap, Mail, Terminal, Activity } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { sound } from "@/lib/sound";
import { VaaniversePipeline } from "../interactive-demos/vaaniverse-pipeline";

interface P3HeroProps {
  onOpenResume: () => void;
  onNavigate: (sectionId: string) => void;
}

export function P3Hero({ onOpenResume, onNavigate }: P3HeroProps) {
  const menuRibbons = [
    {
      index: "01",
      name: "QUEST ARCHIVE // PROJECTS",
      sub: "VaaniVerse (<200ms) · SmartInbox · EcoVision (SHAP) · School Portal",
      target: "projects",
      color: "border-[#00d2ff] bg-[#00d2ff]/10 hover:bg-[#00d2ff] hover:text-[#030712]",
      tag: "6 SYSTEMS",
    },
    {
      index: "02",
      name: "PERSONA // SKILL DECK",
      sub: "Python · C# · MediaPipe · ASP.NET Core · Groq/LLaMA · SHAP/LIME",
      target: "skills",
      color: "border-[#10b981] bg-[#10b981]/10 hover:bg-[#10b981] hover:text-[#030712]",
      tag: "APPLIED STACK",
    },
    {
      index: "03",
      name: "VELVET ROOM // ROADMAP",
      sub: "ASP.NET Core Systems Depth · Distributed Queues · Cybersecurity",
      target: "learning",
      color: "border-[#6366f1] bg-[#6366f1]/10 hover:bg-[#6366f1] hover:text-[#030712]",
      tag: "FUSION ROADMAP",
    },
    {
      index: "04",
      name: "ACADEMICS // KNOWLEDGE",
      sub: "Aurora's Tech (CGPA: 7.67) · Sri Gayatri Junior College (79.5%)",
      target: "education",
      color: "border-[#ffea00] bg-[#ffea00]/10 hover:bg-[#ffea00] hover:text-[#030712]",
      tag: "DEGREE STATS",
    },
    {
      index: "05",
      name: "S-LINK // SOCIAL CONTACT",
      sub: "Direct Dispatch · Email · Phone · LinkedIn · GitHub",
      target: "contact",
      color: "border-[#ff2a5f] bg-[#ff2a5f]/10 hover:bg-[#ff2a5f] hover:text-[#030712]",
      tag: "CONNECT",
    },
  ];

  return (
    <section id="status" className="relative pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Dramatic Headline Ribbon */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#ff2a5f] text-white px-3.5 py-1 text-xs font-mono font-black uppercase transform skew-x-[-12deg] shadow-[0_0_20px_#ff2a5f] mb-3">
            <span className="transform skew-x-[12deg] tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              [PERSONA 3 RELOAD // S.E.E.S. OPERATIONAL STATUS]
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#f0f8ff] uppercase leading-[1.08] font-sans">
            I BUILD COMPLETE SYSTEMS{" "}
            <span className="text-[#00d2ff] p3-text-shadow underline decoration-[#00d2ff]/40">
              END-TO-END
            </span>{" "}
            — FROM MODEL TO DEPLOYMENT.
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-3 font-mono leading-relaxed">
            Software Engineer specializing in <strong className="text-[#00d2ff]">Python &amp; Applied ML (Computer Vision, NLP)</strong> paired with robust <strong className="text-[#00d2ff]">C# / ASP.NET Core &amp; Flask backend services</strong>. Real-time sub-200ms latency budgets, explainable AI, and production containerization.
          </p>
        </div>

        {/* Persona 3 Status Screen & Command Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-14">
          {/* Left Column: Persona 3 Character HUD / Status Card */}
          <div className="lg:col-span-5 bg-[#060e22]/95 border-2 border-[#00d2ff] p3-cut-corner-lg p-5 sm:p-6 shadow-[0_0_35px_rgba(0,210,255,0.25)] relative overflow-hidden">
            {/* Ambient scanline overlay */}
            <div className="absolute inset-0 p3-scanlines opacity-30 pointer-events-none" />

            {/* S.E.E.S. Armband & Protagonist Header */}
            <div className="flex items-center justify-between border-b-2 border-[#00d2ff]/40 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#ff2a5f] p3-diagonal-border flex items-center justify-center font-black text-white text-xs shadow-[0_0_15px_#ff2a5f] font-mono">
                  S.E.E.S.
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#00d2ff] font-bold">
                    PROTAGONIST
                  </div>
                  <div className="text-2xl font-black text-[#f0f8ff] tracking-wider font-mono">
                    {PERSONAL_INFO.name.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 font-bold">ARCANA</div>
                <div className="text-xs font-mono font-black text-[#ffea00] bg-[#030712] px-2 py-0.5 border border-[#ffea00]/50">
                  DATA SCIENCE
                </div>
              </div>
            </div>

            {/* Level & Gauges */}
            <div className="space-y-3 font-mono text-xs mb-5">
              <div className="flex justify-between items-center bg-[#030712] p-2 border border-slate-800">
                <span className="text-slate-400 font-bold">LEVEL &bull; CLASS</span>
                <span className="text-base font-black text-[#00d2ff]">LV. 24 &bull; SWE / ML</span>
              </div>

              {/* HP Bar (System Reliability) */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#00d2ff] font-bold">HP (System Stability)</span>
                  <span className="text-slate-200 font-black">999 / 999</span>
                </div>
                <div className="w-full h-3 bg-[#030712] border border-[#00d2ff]/50 p-0.5">
                  <div className="h-full bg-gradient-to-r from-[#00d2ff] to-[#00f0ff] w-full" />
                </div>
              </div>

              {/* SP Bar (Academic CGPA) */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#ffea00] font-bold">SP (Academic Rating)</span>
                  <span className="text-slate-200 font-black">767 / 767 (7.67 CGPA)</span>
                </div>
                <div className="w-full h-3 bg-[#030712] border border-[#ffea00]/50 p-0.5">
                  <div className="h-full bg-gradient-to-r from-[#ffea00] to-[#f59e0b] w-[76.7%]" />
                </div>
              </div>
            </div>

            {/* Persona Equipment Summary */}
            <div className="border-t-2 border-slate-800 pt-3 space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500 font-bold">PRIMARY WEAPON:</span>
                <span className="text-[#00d2ff] font-black">Python 3 + C# / .NET 8</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500 font-bold">SYSTEM ARMOR:</span>
                <span className="text-[#10b981] font-black">Docker Compose + SQL Server</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500 font-bold">PERSONA RELIC:</span>
                <span className="text-[#ff2a5f] font-black">MediaPipe + Groq LLaMA 3.1</span>
              </div>
              <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-900">
                <span className="text-slate-500 font-bold">ACTIVE QUEST:</span>
                <span className="text-[#ffea00] font-bold">SWE Roles &amp; US MS/MEng</span>
              </div>
            </div>
          </div>

          {/* Right Column: Persona 3 Skewed Command Menu Ribbons */}
          <div className="lg:col-span-7 flex flex-col gap-2.5">
            <div className="text-xs font-mono text-[#00d2ff] font-black uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#00d2ff]" />
              <span>COMMAND MENU &bull; SELECT DESTINATION</span>
            </div>

            {menuRibbons.map((ribbon) => (
              <button
                key={ribbon.index}
                onClick={() => {
                  sound.playMenuSwitch();
                  onNavigate(ribbon.target);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`p-3.5 border-2 text-left transition-all duration-200 transform skew-x-[-10deg] hover:translate-x-3 hover:shadow-[0_0_25px_rgba(0,210,255,0.4)] group flex items-center justify-between ${ribbon.color}`}
              >
                <div className="transform skew-x-[10deg] flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#030712] border-2 border-[#00d2ff] text-[#00d2ff] flex items-center justify-center font-mono font-black text-xs">
                    {ribbon.index}
                  </div>
                  <div>
                    <div className="font-black text-sm font-mono tracking-wider">
                      {ribbon.name}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 group-hover:text-[#030712] transition-colors">
                      {ribbon.sub}
                    </div>
                  </div>
                </div>

                <div className="transform skew-x-[10deg] flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black bg-[#030712] text-[#00d2ff] px-2 py-0.5 border border-[#00d2ff]/40">
                    {ribbon.tag}
                  </span>
                  <ChevronRight className="w-4 h-4 text-inherit group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Hero Interactive Feature: Live VaaniVerse Pipeline in Persona 3 Moonlit Frame */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#00d2ff] animate-ping rounded-full" />
              <h2 className="text-xs font-mono uppercase tracking-wider text-[#00d2ff] font-black">
                [LIVE SIMULATION] &bull; VAANIVERSE SUB-200MS ISL PIPELINE
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              MediaPipe 21 Landmark Vectorization &bull; Real-time Gestures
            </span>
          </div>

          <VaaniversePipeline />
        </div>
      </div>
    </section>
  );
}
