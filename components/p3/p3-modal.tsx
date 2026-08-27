"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Cpu, ShieldCheck, Layers, ArrowRight, Sparkles, Terminal } from "lucide-react";
import { Project } from "@/types/portfolio";
import { GithubIcon } from "@/components/icons";
import { sound } from "@/lib/sound";
import { VaaniversePipeline } from "../interactive-demos/vaaniverse-pipeline";
import { EcovisionInspector } from "../interactive-demos/ecovision-inspector";
import { SchoolPortalTopology } from "../interactive-demos/school-portal-topology";
import { ProctoringDemo } from "../interactive-demos/proctoring-demo";
import { MailsenseSimulator } from "../interactive-demos/mailsense-simulator";
import { MvvmDiagram } from "../interactive-demos/mvvm-diagram";
import { CarRentalSimulator } from "../interactive-demos/car-rental-simulator";
import { PomodoroSimulator } from "../interactive-demos/pomodoro-simulator";

interface P3ModalProps {
  project: Project | null;
  onClose: () => void;
}

export function P3Modal({ project, onClose }: P3ModalProps) {
  useEffect(() => {
    if (project) {
      sound.playSelect();
    }
  }, [project]);

  if (!project) return null;

  const handleClose = () => {
    sound.playCancel();
    onClose();
  };

  const renderInteractiveDemo = () => {
    switch (project.interactiveType) {
      case "pipeline":
        return <VaaniversePipeline />;
      case "shap":
        return <EcovisionInspector />;
      case "topology":
        return <SchoolPortalTopology />;
      case "cv-proctor":
        return <ProctoringDemo />;
      case "llm-triage":
        return <MailsenseSimulator />;
      case "mvvm":
        return <MvvmDiagram />;
      case "car-rental":
        return <CarRentalSimulator />;
      case "pomodoro":
        return <PomodoroSimulator />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#060e22] border-2 border-[#00d2ff] p3-cut-corner-lg w-full max-w-5xl max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(0,210,255,0.35)] overflow-hidden">
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#00d2ff]/40 bg-[#030712] shrink-0">
          <div className="flex items-center gap-3 font-mono">
            <span className="text-xs font-black text-[#030712] bg-[#00d2ff] px-2.5 py-0.5 uppercase">
              {project.categoryLabel}
            </span>
            <h2 className="text-lg md:text-xl font-black text-[#f0f8ff] tracking-wider uppercase">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-1.5 text-xs text-[#00d2ff] bg-[#060e22] hover:bg-[#0a142e] border border-[#00d2ff]/50 px-3 py-1 font-mono font-bold uppercase transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <button
              onClick={handleClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-all font-mono font-bold"
              aria-label="Close modal [Press Escape]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-slate-300 text-sm">
          {/* Engineering Briefing Box */}
          <div className="bg-[#030712] border-2 border-[#00d2ff]/30 p-4 p3-diagonal-border">
            <div className="text-[10px] font-mono text-[#00d2ff] font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              SYSTEM SPECIFICATION // ROLE: {project.role.toUpperCase()}
            </div>
            <p className="text-sm md:text-base text-[#f0f8ff] font-mono font-bold leading-relaxed">
              &quot;{project.tagline}&quot;
            </p>
          </div>

          {/* Embedded Interactive Demo */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#00d2ff] font-black mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> [LIVE SIMULATOR // INTERACTIVE PIPELINE]
            </div>
            {renderInteractiveDemo()}
          </div>

          {/* Problem & Hardest Constraint */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono">
            <div className="bg-[#030712] border-2 border-slate-800 p-5">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                [PROBLEM STATEMENT]
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{project.problemStatement}</p>
            </div>

            <div className="bg-[#030712] border-2 border-[#ffea00]/40 p-5">
              <div className="text-xs uppercase tracking-wider text-[#ffea00] font-bold mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> [KEY ENGINEERING CONSTRAINT]
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{project.keyChallenge}</p>
            </div>
          </div>

          {/* Solution Architecture Stages */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#00d2ff] font-black mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" /> [STAGE-BY-STAGE PIPELINE BREAKDOWN]
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
              {project.pipelineSteps.map((step, idx) => (
                <div key={idx} className="bg-[#030712] border-2 border-slate-800 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-[#00d2ff] font-black">PHASE {step.step}</span>
                    </div>
                    <div className="font-bold text-[#f0f8ff] text-xs uppercase">{step.title}</div>
                    <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed font-sans">{step.description}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-[#10b981] font-bold truncate">
                    {step.tech}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Decisions */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
              [KEY ENGINEERING DECISIONS &amp; HIGHLIGHTS]
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="bg-[#030712] border border-slate-800 p-3 text-xs text-slate-300 flex items-start gap-2.5 font-mono"
                >
                  <span className="w-1.5 h-1.5 bg-[#00d2ff] shrink-0 mt-1.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
              [TECHNOLOGY STACK]
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono font-bold text-[#f0f8ff] bg-[#030712] border border-[#00d2ff]/40 px-3 py-1 uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t-2 border-[#00d2ff]/40 bg-[#030712] flex items-center justify-between text-xs font-mono shrink-0">
          <span className="text-slate-500">PRODUCTION SYSTEM SPECIFICATION</span>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="text-[#00d2ff] hover:underline font-bold flex items-center gap-1"
            >
              VIEW ON GITHUB &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
