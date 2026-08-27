"use client";

import React from "react";
import { GraduationCap, MapPin, Award } from "lucide-react";
import { EDUCATION } from "@/data/portfolio-data";
import { sound } from "@/lib/sound";

export function P3Education() {
  return (
    <section id="education" className="py-20 border-t-2 border-[#00d2ff]/40 bg-[#030712] relative p3-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 bg-[#ffea00] text-[#030712] px-3 py-0.5 text-xs font-mono font-bold transform skew-x-[-12deg] mb-2">
            <span className="transform skew-x-[12deg] flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              Academic Background &bull; Degree &amp; Foundations
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f8ff] tracking-tight font-sans">
            Education &amp; Academics
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 leading-relaxed">
            My academic journey from secondary school distinction (98%) to higher secondary quantitative foundations (79.5%) and my B.Tech degree in Computer Science &amp; Data Science (7.67 CGPA).
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-6">
          {EDUCATION.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="bg-[#060e22] border-2 border-[#ffea00]/40 hover:border-[#ffea00] p3-cut-corner p-6 md:p-8 flex flex-col lg:flex-row lg:items-start justify-between gap-6 transition-all duration-300 shadow-[0_0_20px_rgba(255,234,0,0.1)]"
            >
              <div className="space-y-3 max-w-2xl font-mono">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#030712] bg-[#ffea00] px-2.5 py-0.5">
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-[#ffea00]" />
                    {item.location}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[#f0f8ff]">{item.institution}</h3>
                <div className="text-xs sm:text-sm text-[#00d2ff] font-bold">
                  {item.degree} {item.specialization && <span className="text-slate-300">&bull; {item.specialization}</span>}
                </div>

                {/* Coursework tags */}
                <div className="pt-2">
                  <div className="text-[10px] font-mono text-slate-400 font-bold mb-2">
                    Core Subjects &amp; Foundations:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.coursework.map((course, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-slate-200 bg-[#030712] border border-slate-800 px-2.5 py-1"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-1.5 pt-2">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2 font-sans">
                      <span className="w-1.5 h-1.5 bg-[#ffea00] shrink-0 mt-1.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Score Box */}
              <div className="lg:w-48 bg-[#030712] border-2 border-[#ffea00] p-4 flex flex-col items-center justify-center text-center shrink-0 p3-diagonal-border">
                <Award className="w-6 h-6 text-[#ffea00] mb-1" />
                <div className="text-3xl font-bold font-mono text-[#f0f8ff]">{item.score}</div>
                <div className="text-[10px] font-mono text-[#ffea00] font-bold tracking-wide mt-0.5">
                  {item.scoreLabel} Rating
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
