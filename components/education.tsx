"use client";

import React from "react";
import { GraduationCap, MapPin, Award, BookCheck, Sparkles } from "lucide-react";
import { EDUCATION } from "@/data/portfolio-data";

export function Education() {
  return (
    <section id="education" className="py-20 border-t border-[#1e293b]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Foundations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Education &amp; Background
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Formal computer science training with specialized focus on data science, mathematical foundations, and system software principles.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-6">
          {EDUCATION.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-start justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded">
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {item.location}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-slate-100">{item.institution}</h3>
                <div className="text-sm text-cyan-400 font-medium">
                  {item.degree} {item.specialization && <span className="text-slate-300">&bull; {item.specialization}</span>}
                </div>

                {/* Coursework tags */}
                <div className="pt-2">
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                    Core Coursework &amp; Topics:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.coursework.map((course, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono text-slate-300 bg-[#0e1322] border border-[#1e293b] px-2.5 py-1 rounded-md"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights list */}
                <ul className="space-y-1.5 pt-2">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Score Box */}
              <div className="lg:w-48 bg-[#0e1322] border border-[#1e293b] rounded-xl p-4 flex flex-col items-center justify-center text-center shrink-0">
                <Award className="w-5 h-5 text-amber-400 mb-1" />
                <div className="text-2xl font-extrabold font-mono text-slate-100">{item.score}</div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                  {item.scoreLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
