"use client";

import React, { useState } from "react";
import { ArrowDown, Copy, Check, FileText, Terminal, Sparkles, FolderGit2, Cpu, ChevronRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { VaaniversePipeline } from "./interactive-demos/vaaniverse-pipeline";

interface HeroProps {
  onOpenResume: () => void;
  onExploreProjects: () => void;
}

export function Hero({ onOpenResume, onExploreProjects }: HeroProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[400px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Status Badge */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2.5 bg-[#0e1322] border border-[#1e293b] rounded-full px-3.5 py-1.5 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-xs font-mono text-slate-300">
              {PERSONAL_INFO.seeking}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.15]">
            I build complete systems{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300">
              end-to-end
            </span>{" "}
            — from model to deployment.
          </h1>

          {/* Subtitle / Positioning Statement */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Recent CS (Data Science) graduate with hands-on depth in{" "}
            <strong className="text-slate-200 font-semibold">Python</strong>,{" "}
            <strong className="text-slate-200 font-semibold">applied Computer Vision & NLP</strong>, and{" "}
            <strong className="text-slate-200 font-semibold">C# / ASP.NET Core backend services</strong>. I focus on building working software that respects real-time constraints and clean architecture.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onExploreProjects}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/20"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Explore Case Studies</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenResume}
              className="flex items-center gap-2 bg-[#0e1322] hover:bg-[#161e31] text-slate-200 border border-[#1e293b] px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Resume (PDF)</span>
            </button>

            <button
              onClick={copyEmail}
              className="flex items-center gap-2 bg-[#0e1322] hover:bg-[#161e31] text-slate-300 border border-[#1e293b] px-4 py-2.5 rounded-xl text-sm font-mono transition-all"
            >
              {copiedEmail ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
              <span>{copiedEmail ? "Copied Email!" : "Copy Email"}</span>
            </button>
          </div>

          {/* Quick Technical Highlight Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-2 text-[11px] font-mono text-slate-400">
            <span className="bg-[#0e1322] border border-[#1e293b] px-2.5 py-1 rounded-md">
              Sub-200ms ML Pipelines
            </span>
            <span className="bg-[#0e1322] border border-[#1e293b] px-2.5 py-1 rounded-md">
              Explainable AI (SHAP/LIME)
            </span>
            <span className="bg-[#0e1322] border border-[#1e293b] px-2.5 py-1 rounded-md">
              Docker Multi-Service & SQL Server
            </span>
            <span className="bg-[#0e1322] border border-[#1e293b] px-2.5 py-1 rounded-md">
              Clean MVVM Desktop
            </span>
          </div>
        </div>

        {/* Hero Interactive Feature: Live VaaniVerse Pipeline */}
        <div className="mt-14 md:mt-18 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Interactive Pipeline Highlight &bull; VaaniVerse
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              Simulating continuous 30 FPS landmark extraction
            </span>
          </div>

          <VaaniversePipeline />
        </div>
      </div>
    </section>
  );
}
