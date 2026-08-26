"use client";

import React, { useState } from "react";
import { X, Download, FileText, Check, ExternalLink, Mail, Phone, MapPin, GraduationCap, Code2, Briefcase } from "lucide-react";
import { PERSONAL_INFO, PROJECTS, SKILLS, EDUCATION } from "@/data/portfolio-data";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e293b] bg-[#0e1322]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span className="font-semibold text-slate-100 text-sm">Resume Preview &bull; {PERSONAL_INFO.fullName}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Rushil_Chilakamarri_Resume.pdf"
              className="flex items-center gap-1.5 text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-3 py-1.5 rounded-lg transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-slate-200 text-sm">
          {/* Header Area */}
          <div className="border-b border-[#1e293b] pb-5">
            <h2 className="text-2xl font-bold text-slate-100">{PERSONAL_INFO.fullName}</h2>
            <div className="text-cyan-400 font-medium text-sm mt-0.5">{PERSONAL_INFO.subtitle}</div>
            
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {PERSONAL_INFO.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                {PERSONAL_INFO.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                {PERSONAL_INFO.phoneDisplay}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 mt-2 text-xs font-mono text-cyan-400">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                github.com/Rushilch <ExternalLink className="w-3 h-3" />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                linkedin.com/in/rushil-chilakamarri <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Education
            </h3>
            <div className="space-y-3">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="bg-[#0e1322] border border-[#1e293b] rounded-lg p-3.5">
                  <div className="flex flex-wrap justify-between items-start gap-1">
                    <div>
                      <div className="font-semibold text-slate-100">{edu.institution}</div>
                      <div className="text-xs text-slate-300">{edu.degree} {edu.specialization && `— ${edu.specialization}`}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                        {edu.scoreLabel}: {edu.score}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Projects */}
          <div>
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4" /> Featured Technical Projects
            </h3>
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="bg-[#0e1322] border border-[#1e293b] rounded-lg p-4 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-semibold text-slate-100 text-sm">{proj.title}</div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{proj.categoryLabel}</span>
                      <span className="text-cyan-400">{proj.status}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.problemStatement}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack.map((tech) => (
                      <span key={tech} className="text-[11px] font-mono text-slate-400 bg-[#070a12] px-2 py-0.5 rounded border border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Technical Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0e1322] border border-[#1e293b] rounded-lg p-3">
                <div className="font-semibold text-slate-200 mb-1">Languages:</div>
                <div className="text-slate-400">Python, C#, Java, JavaScript/TypeScript, SQL</div>
              </div>
              <div className="bg-[#0e1322] border border-[#1e293b] rounded-lg p-3">
                <div className="font-semibold text-slate-200 mb-1">Backend & Systems:</div>
                <div className="text-slate-400">ASP.NET Core, EF Core, Flask, Django, Docker, SQL Server, REST APIs</div>
              </div>
              <div className="bg-[#0e1322] border border-[#1e293b] rounded-lg p-3">
                <div className="font-semibold text-slate-200 mb-1">Applied ML & CV:</div>
                <div className="text-slate-400">MediaPipe, OpenCV, SHAP, LIME, Scikit-Learn, LLaMA API, gTTS</div>
              </div>
              <div className="bg-[#0e1322] border border-[#1e293b] rounded-lg p-3">
                <div className="font-semibold text-slate-200 mb-1">Architecture & Tools:</div>
                <div className="text-slate-400">WPF (MVVM), Git/GitHub, Docker Compose, Linux Fundamentals</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#1e293b] bg-[#0e1322] flex items-center justify-between text-xs">
          <button
            onClick={copyEmail}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5" />}
            {copied ? "Copied email to clipboard!" : `Copy: ${PERSONAL_INFO.email}`}
          </button>

          <a
            href={PERSONAL_INFO.resumeUrl}
            download="Rushil_Chilakamarri_Resume.pdf"
            className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
          >
            Download PDF Version &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
