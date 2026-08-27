"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#1e293b] bg-[#07090e] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-slate-100 uppercase tracking-wider text-sm">
                Rushil Chilakamarri
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                Software Engineer
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-100 transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 rounded-lg bg-[#0e1322] hover:bg-[#161e31] border border-[#1e293b] text-slate-300 hover:text-white transition-all text-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1e293b]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-mono">
          <div>
            Rushil Chilakamarri
          </div>
          <div>
            B.Tech CS (Data Science)
          </div>
        </div>
      </div>
    </footer>
  );
}
