"use client";

import React from "react";
import { ChevronRight, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { sound } from "@/lib/sound";
import { VaaniversePipeline } from "../interactive-demos/vaaniverse-pipeline";

interface P3HeroProps {
  onOpenResume: () => void;
  onNavigate: (sectionId: string) => void;
}

export function P3Hero({ onNavigate }: P3HeroProps) {
  const menuRibbons = [
    {
      index: "01",
      name: "Featured Systems & Projects",
      sub: "VaaniVerse (<200ms) · SmartInbox · EcoVision · School Portal · Java & Python Systems",
      target: "projects",
      color: "border-[#00d2ff] bg-[#00d2ff]/10 hover:bg-[#00d2ff] hover:text-[#030712]",
      tag: "9 Systems",
    },
    {
      index: "02",
      name: "Technical Skills & Core Stack",
      sub: "Python · C# · Java · MediaPipe · ASP.NET Core · Groq/LLaMA · SHAP/LIME",
      target: "skills",
      color: "border-[#10b981] bg-[#10b981]/10 hover:bg-[#10b981] hover:text-[#030712]",
      tag: "Competencies",
    },
    {
      index: "03",
      name: "Systems Roadmap & Focus",
      sub: "ASP.NET Core Systems Depth · Distributed Task Queues · Cybersecurity",
      target: "learning",
      color: "border-[#6366f1] bg-[#6366f1]/10 hover:bg-[#6366f1] hover:text-[#030712]",
      tag: "Growth",
    },
    {
      index: "04",
      name: "Education & Academics",
      sub: "Aurora's Tech (2022–2026) · Sri Gayatri (2020–2022) · Dilsukhnagar PS (2020)",
      target: "education",
      color: "border-[#ffea00] bg-[#ffea00]/10 hover:bg-[#ffea00] hover:text-[#030712]",
      tag: "Credentials",
    },
    {
      index: "05",
      name: "Connect with Me & Direct Dispatch",
      sub: "Mail Me Directly · Phone · LinkedIn · GitHub · PDF Resume",
      target: "contact",
      color: "border-[#ff2a5f] bg-[#ff2a5f]/10 hover:bg-[#ff2a5f] hover:text-[#030712]",
      tag: "Connect",
    },
  ];

  return (
    <section id="status" className="relative pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Dramatic Headline Ribbon */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-[#00d2ff] text-[#030712] px-3.5 py-1 text-xs font-mono font-bold transform skew-x-[-12deg] shadow-[0_0_20px_#00d2ff] mb-3">
            <span className="transform skew-x-[12deg] tracking-wide flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              Software Engineer &bull; Applied ML &amp; Backend Systems
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f0f8ff] leading-[1.1] font-sans">
            I build complete systems{" "}
            <span className="text-[#00d2ff] p3-text-shadow underline decoration-[#00d2ff]/40">
              end-to-end
            </span>{" "}
            — from model to deployment.
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-3 font-mono leading-relaxed">
            I specialize in <strong className="text-[#00d2ff]">Python &amp; Applied ML (Computer Vision, NLP)</strong> paired with robust <strong className="text-[#00d2ff]">C# / ASP.NET Core &amp; Flask backend architectures</strong>. Real-time sub-200ms latency budgets, explainable AI, and production containerization.
          </p>
        </div>

        {/* Persona 3 Status Screen & Command Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-14">
          {/* Left Column: Software Engineering Specifications Card */}
          <div className="lg:col-span-5 bg-[#060e22]/95 border-2 border-[#00d2ff] p3-cut-corner-lg p-5 sm:p-6 shadow-[0_0_35px_rgba(0,210,255,0.25)] relative overflow-hidden">
            {/* Ambient scanline overlay */}
            <div className="absolute inset-0 p3-scanlines opacity-20 pointer-events-none" />

            {/* Engineer Profile Header */}
            <div className="flex items-center justify-between border-b-2 border-[#00d2ff]/40 pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00d2ff] p3-diagonal-border flex items-center justify-center font-black text-[#030712] text-xs shadow-[0_0_15px_#00d2ff] font-mono">
                  SWE
                </div>
                <div>
                  <div className="text-[10px] font-mono tracking-widest text-[#00d2ff] font-bold">
                    My Profile
                  </div>
                  <div className="text-2xl font-bold text-[#f0f8ff] tracking-wide font-mono">
                    {PERSONAL_INFO.name}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 font-bold">Specialization</div>
                <div className="text-xs font-mono font-bold text-[#ffea00] bg-[#030712] px-2 py-0.5 border border-[#ffea00]/50">
                  Data Science &amp; SWE
                </div>
              </div>
            </div>

            {/* Engineering Specifications */}
            <div className="space-y-2.5 font-mono text-xs mb-5">
              <div className="flex justify-between items-center bg-[#030712] p-2.5 border border-slate-800">
                <span className="text-slate-400 font-medium">Education</span>
                <span className="text-sm font-bold text-[#00d2ff]">B.Tech CSE (2022–2026)</span>
              </div>

              <div className="flex justify-between items-center bg-[#030712] p-2.5 border border-slate-800">
                <span className="text-slate-400 font-medium">Location</span>
                <span className="text-sm font-bold text-slate-200">{PERSONAL_INFO.location}</span>
              </div>

              <div className="flex justify-between items-center bg-[#030712] p-2.5 border border-slate-800">
                <span className="text-slate-400 font-medium">Availability</span>
                <span className="text-xs font-bold text-[#10b981]">Open for Entry-Level Roles</span>
              </div>
            </div>

            {/* Core Tech Stack Summary */}
            <div className="border-t-2 border-slate-800 pt-3 space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400 font-medium">Core Languages:</span>
                <span className="text-[#00d2ff] font-bold">Python 3.12 &bull; C# / .NET &bull; Java</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400 font-medium">Backend &amp; Database:</span>
                <span className="text-[#10b981] font-bold">Flask &bull; ASP.NET Core &bull; SQL Server</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400 font-medium">Applied ML / NLP:</span>
                <span className="text-[#ffea00] font-bold">MediaPipe &bull; OpenCV &bull; LLaMA 3.1</span>
              </div>
              <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-900">
                <span className="text-slate-400 font-medium">Systems Focus:</span>
                <span className="text-[#f0f8ff] font-bold">Sub-200ms Latency &bull; Docker</span>
              </div>
            </div>
          </div>

          {/* Right Column: Persona 3 Skewed Command Menu Ribbons */}
          <div className="lg:col-span-7 flex flex-col gap-2.5">
            <div className="text-xs font-mono text-[#00d2ff] font-bold tracking-wide mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#00d2ff]" />
                Navigation Command Menu
              </span>
              <span className="text-[10px] text-slate-400">[Press W / S or 1-5]</span>
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
                  <div className="w-7 h-7 bg-[#030712] border-2 border-[#00d2ff] text-[#00d2ff] flex items-center justify-center font-mono font-bold text-xs">
                    {ribbon.index}
                  </div>
                  <div>
                    <div className="font-bold text-sm font-mono tracking-wide">
                      {ribbon.name}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 group-hover:text-[#030712] transition-colors">
                      {ribbon.sub}
                    </div>
                  </div>
                </div>

                <div className="transform skew-x-[10deg] flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-[#030712] text-[#00d2ff] px-2 py-0.5 border border-[#00d2ff]/40">
                    {ribbon.tag}
                  </span>
                  <ChevronRight className="w-4 h-4 text-inherit group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Hero Interactive Feature: Live VaaniVerse Pipeline Simulator */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#00d2ff] animate-ping rounded-full" />
              <h2 className="text-xs font-mono tracking-wide text-[#00d2ff] font-bold">
                [Live Demo] &bull; VaaniVerse Sub-200ms ISL Pipeline
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
