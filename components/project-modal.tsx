"use client";

import React from "react";
import { X, ExternalLink, Cpu, ShieldCheck, Layers, ArrowRight } from "lucide-react";
import { Project } from "@/types/portfolio";
import { GithubIcon } from "@/components/icons";
import { VaaniversePipeline } from "./interactive-demos/vaaniverse-pipeline";
import { EcovisionInspector } from "./interactive-demos/ecovision-inspector";
import { SchoolPortalTopology } from "./interactive-demos/school-portal-topology";
import { ProctoringDemo } from "./interactive-demos/proctoring-demo";
import { MailsenseSimulator } from "./interactive-demos/mailsense-simulator";
import { MvvmDiagram } from "./interactive-demos/mvvm-diagram";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

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
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Sticky Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#0e1322] shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800">
              {project.categoryLabel}
            </span>
            <h2 className="text-lg md:text-xl font-bold text-slate-100">{project.title}</h2>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>View GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-slate-300 text-sm">
          {/* Tagline & Role */}
          <div>
            <p className="text-base text-slate-200 font-medium leading-relaxed">{project.tagline}</p>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs font-mono text-slate-400">
              <span>Role: <strong className="text-slate-200 font-normal">{project.role}</strong></span>
              <span>&bull;</span>
              <span>Status: <strong className="text-emerald-400 font-normal">{project.status}</strong></span>
            </div>
          </div>

          {/* Embedded Interactive Demo Component */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> Live Interactive Engineering Demo
            </div>
            {renderInteractiveDemo()}
          </div>

          {/* Problem & Hardest Challenge Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#0e1322] border border-[#1e293b] rounded-xl p-5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                The Problem Statement
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{project.problemStatement}</p>
            </div>

            <div className="bg-[#0e1322] border border-amber-500/30 rounded-xl p-5 relative overflow-hidden">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Key Engineering Constraint
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{project.keyChallenge}</p>
            </div>
          </div>

          {/* Solution Architecture & Pipeline Stages */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" /> End-to-End Pipeline Breakdown
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {project.pipelineSteps.map((step, idx) => (
                <div key={idx} className="bg-[#0e1322] border border-[#1e293b] rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-cyan-400 font-bold">STAGE {step.step}</span>
                    </div>
                    <div className="font-semibold text-slate-200 text-xs">{step.title}</div>
                    <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-emerald-400 truncate">
                    {step.tech}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Engineering Highlights & Decisions */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
              Key Engineering Decisions & Highlights
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {project.highlights.map((h, i) => (
                <li
                  key={i}
                  className="bg-[#0e1322] border border-[#1e293b] rounded-lg p-3 text-xs text-slate-300 flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
              Technologies & Libraries Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono text-slate-300 bg-[#0e1322] border border-[#1e293b] px-3 py-1.5 rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1e293b] bg-[#0e1322] flex items-center justify-between text-xs font-mono shrink-0">
          <span className="text-slate-500">Documented from actual implementation</span>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
            >
              Explore Repository on GitHub &rarr;
            </a>
          ) : (
            <span className="text-slate-400">Self-Directed Capstone / Portfolio Architecture</span>
          )}
        </div>
      </div>
    </div>
  );
}
