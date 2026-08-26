"use client";

import React from "react";
import { Terminal, Shield, Zap, Sparkles, CheckCircle2 } from "lucide-react";
import { PHILOSOPHY_PILLARS } from "@/data/portfolio-data";

export function EngineeringPhilosophy() {
  const icons = [Terminal, Zap, Shield];

  return (
    <section id="philosophy" className="py-20 border-t border-[#1e293b]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Engineering Principles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            How I Approach Software
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Good software engineering is about trade-offs, measurable constraints, and delivering working systems that can be maintained and audited.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHILOSOPHY_PILLARS.map((pillar, idx) => {
            const Icon = icons[idx % icons.length];

            return (
              <div
                key={idx}
                className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0e1322] border border-[#1e293b] flex items-center justify-center text-cyan-400 mb-4 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold mb-1">
                    {pillar.tagline}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-3">{pillar.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{pillar.description}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#1e293b] flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Principle Applied in All Projects
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
