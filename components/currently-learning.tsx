"use client";

import React from "react";
import { BookOpen, Sparkles, Shield, Server, CheckCircle2, ChevronRight } from "lucide-react";
import { CURRENTLY_LEARNING } from "@/data/portfolio-data";

export function CurrentlyLearning() {
  return (
    <section id="learning" className="py-20 border-t border-[#1e293b]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Active Engineering Growth</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Currently Deepening &amp; Exploring
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            I treat learning as a deliberate engineering roadmap. Rather than masking knowledge gaps, here are the exact systems and foundational topics I am actively mastering.
          </p>
        </div>

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CURRENTLY_LEARNING.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                {item.category.includes("Backend") ? (
                  <Server className="w-32 h-32" />
                ) : (
                  <Shield className="w-32 h-32" />
                )}
              </div>

              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/50 px-2.5 py-0.5 rounded border border-indigo-900/60 font-semibold">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded border border-cyan-800">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-2">{item.topic}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">{item.description}</p>

                {/* Focus Areas */}
                <div className="space-y-2 mb-6">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Current Focus Milestones:
                  </div>
                  <div className="space-y-1.5">
                    {item.focusAreas.map((area, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-300 bg-[#0e1322] border border-[#1e293b] p-2.5 rounded-lg"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resource Footer */}
              <div className="pt-4 border-t border-[#1e293b] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Key Study:</span>
                <span className="text-slate-400 truncate max-w-[70%] text-right">{item.keyResources}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
