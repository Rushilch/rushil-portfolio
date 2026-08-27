"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Copy, Check, Send, FileText, ExternalLink, MessageSquare, ArrowRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { sound } from "@/lib/sound";
import { P3TrainScene } from "./p3-train-scene";

interface P3ContactProps {
  onOpenResume: () => void;
}

export function P3Contact({ onOpenResume }: P3ContactProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    sound.playSelect();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    sound.playSelect();
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleMailMe = () => {
    sound.playSelect();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent("Software Engineering Inquiry / Opportunity")}&body=${encodeURIComponent("Hi Rushil,\n\nI reviewed your portfolio and would like to connect regarding:\n\n")}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-20 border-t-2 border-[#00d2ff]/40 bg-[#030712] relative p3-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 bg-[#ff2a5f] text-white px-3 py-0.5 text-xs font-mono font-bold transform skew-x-[-12deg] mb-2">
            <span className="transform skew-x-[12deg] flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Get in Touch &bull; Direct Dispatch
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f8ff] tracking-tight font-sans">
            Connect with Me
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 leading-relaxed">
<<<<<<< HEAD
            I am actively looking for Entry-Level Software Engineering and Applied Machine Learning positions. Click below to email me directly or copy my contact details.
=======
            Actively interviewing for entry-level Software Engineering positions.
>>>>>>> 39d6f7d330c0639e289c08d577b00fed9f81d856
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Streamlined Direct Contact & Action Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Primary Prominent "Mail Me" Button Card */}
            <div className="bg-[#060e22] border-2 border-[#00d2ff] p3-cut-corner p-6 shadow-[0_0_30px_rgba(0,210,255,0.25)] space-y-4">
              <div>
                <div className="text-[10px] font-mono font-bold text-[#00d2ff] tracking-wide mb-1">
                  Direct Email Dispatch
                </div>
                <div className="text-xl font-bold text-[#f0f8ff] font-mono">
                  {PERSONAL_INFO.email}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  onClick={handleMailMe}
                  onMouseEnter={() => sound.playHover()}
                  className="flex-1 bg-[#ff2a5f] hover:bg-[#ff4070] text-white font-bold px-5 py-3 font-mono text-xs tracking-wide transition-all shadow-[0_0_20px_rgba(255,42,95,0.4)] flex items-center justify-center gap-2 transform skew-x-[-8deg]"
                >
                  <span className="transform skew-x-[8deg] flex items-center gap-2">
                    <Send className="w-3.5 h-3.5" />
                    Mail Me Directly &rarr;
                  </span>
                </button>

                <button
                  onClick={copyEmail}
                  onMouseEnter={() => sound.playHover()}
                  className="px-4 py-3 bg-[#030712] hover:bg-[#0a142e] border-2 border-[#00d2ff] text-[#00d2ff] font-mono text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  title="Copy Email to Clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedEmail ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Direct Phone Card */}
            <div
              onMouseEnter={() => sound.playHover()}
              className="bg-[#060e22] border-2 border-[#10b981]/40 hover:border-[#10b981] p3-cut-corner p-4 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3 font-mono">
                <div className="w-9 h-9 bg-[#030712] border border-[#10b981] flex items-center justify-center text-[#10b981]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold">Direct Phone</div>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-xs font-bold text-[#f0f8ff] hover:text-[#10b981] transition-colors"
                  >
                    {PERSONAL_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <button
                onClick={copyPhone}
                className="p-2 bg-[#030712] hover:bg-[#0a142e] border border-slate-700 text-[#10b981] transition-all text-xs flex items-center gap-1 font-mono font-bold"
                title="Copy Phone to Clipboard"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Profiles & Location */}
            <div className="bg-[#060e22] border-2 border-slate-800 p3-cut-corner p-5 space-y-4">
              <div className="flex items-center gap-2.5 text-xs text-slate-300 font-mono">
                <MapPin className="w-4 h-4 text-[#00d2ff]" />
                <span>Location: <strong className="text-white">{PERSONAL_INFO.location}</strong></span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="p-2.5 bg-[#030712] hover:bg-[#0a142e] border border-slate-700 hover:border-[#00d2ff] text-slate-300 hover:text-white flex items-center justify-between text-xs font-mono font-bold transition-all"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-[#00d2ff]" />
                    <span>GitHub</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="p-2.5 bg-[#030712] hover:bg-[#0a142e] border border-slate-700 hover:border-[#00d2ff] text-slate-300 hover:text-white flex items-center justify-between text-xs font-mono font-bold transition-all"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 text-[#00d2ff]" />
                    <span>LinkedIn</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>

              <button
                onClick={() => {
                  sound.playSelect();
                  onOpenResume();
                }}
                onMouseEnter={() => sound.playHover()}
                className="w-full bg-[#00d2ff] hover:bg-[#00f0ff] text-[#030712] font-bold p-3 font-mono text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_#00d2ff] transform skew-x-[-8deg] transition-all"
              >
                <span className="transform skew-x-[8deg] flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Preview Resume &bull; PDF [Press R]
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Cute Pixel Art Makoto Train Scene Animation */}
          <div className="lg:col-span-7">
            <P3TrainScene />
          </div>
        </div>
      </div>
    </section>
  );
}
