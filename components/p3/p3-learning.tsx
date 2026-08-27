"use client";

import React from "react";
import { Sparkles, Server, Shield, Layers, CheckCircle2, ChevronRight, Compass } from "lucide-react";
import { CURRENTLY_LEARNING } from "@/data/portfolio-data";
import { sound } from "@/lib/sound";

export function P3Learning() {
  return (
    <section id="learning" className="py-20 border-t-2 border-[#00d2ff]/40 bg-[#030712] relative p3-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 bg-[#6366f1] text-white px-3 py-0.5 text-xs font-mono font-bold transform skew-x-[-12deg] mb-2">
            <span className="transform skew-x-[12deg] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Technical Systems Roadmap &bull; Active Focus
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f8ff] tracking-tight font-sans">
            Systems Roadmap &amp; Growth
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 leading-relaxed">
            My deliberate systems engineering roadmap. Transparently tracking advanced backend architectures, async queuing, and cybersecurity competencies.
          </p>
        </div>

        {/* Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CURRENTLY_LEARNING.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="bg-[#060e22] border-2 border-[#6366f1]/40 hover:border-[#6366f1] p3-cut-corner p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] relative overflow-hidden"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-medium text-[#6366f1] bg-[#030712] px-2 py-0.5 border border-[#6366f1]/40">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-[#6366f1] text-white px-2 py-0.2">
                    {item.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#f0f8ff] mb-2 font-mono">
                  {item.topic}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-5 font-sans">
                  {item.description}
                </p>

                {/* Focus Areas */}
                <div className="space-y-2 mb-6">
                  <div className="text-[10px] font-mono text-slate-400 font-bold">
                    Active Milestones:
                  </div>
                  <div className="space-y-1.5">
                    {item.focusAreas.map((area, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-300 bg-[#030712] border border-slate-800 p-2 font-mono"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#6366f1] shrink-0 mt-0.5" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resource Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Core References:</span>
                <span className="text-slate-300 truncate max-w-[65%] text-right">{item.keyResources}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
