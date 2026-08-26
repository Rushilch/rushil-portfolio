"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Moon, Search, FileText, Music, Play, Pause, Disc3, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

interface P3HeaderProps {
  onOpenResume: () => void;
  onOpenCommand: () => void;
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export function P3Header({ onOpenResume, onOpenCommand, activeSection, onSelectSection }: P3HeaderProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("12:00 AM");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playSelect();
  };

  const toggleBgm = () => {
    const state = sound.bgm.toggleBgm();
    setBgmPlaying(state);
    if (state) sound.playSelect();
    else sound.playCancel();
  };

  const navTabs = [
    { id: "status", label: "STATUS", key: "01" },
    { id: "projects", label: "QUESTS", key: "02" },
    { id: "skills", label: "PERSONA", key: "03" },
    { id: "learning", label: "VELVET", key: "04" },
    { id: "education", label: "ACADEMICS", key: "05" },
    { id: "contact", label: "S-LINK", key: "06" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#030712]/95 backdrop-blur-md border-b-2 border-[#00d2ff]/60 px-3 sm:px-6 py-2 shadow-[0_4px_30px_rgba(0,210,255,0.2)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        {/* Top Row / Left: Persona 3 Brand & Calendar HUD */}
        <div className="flex items-center justify-between md:justify-start gap-3">
          {/* S.E.E.S. Protagonist Monomark */}
          <a
            href="#"
            onMouseEnter={() => sound.playHover()}
            onClick={() => {
              sound.playSelect();
              onSelectSection("status");
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 bg-[#00d2ff] p3-diagonal-border flex items-center justify-center font-black text-[#030712] text-xs shadow-[0_0_15px_#00d2ff] group-hover:scale-105 transition-all font-mono">
              P3R
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm tracking-widest text-[#f0f8ff] uppercase font-mono group-hover:text-[#00d2ff] transition-colors">
                  RUSHIL
                </span>
                <span className="text-[9px] font-mono font-bold bg-[#ff2a5f] text-white px-1.5 py-0.2 rounded-sm transform skew-x-[-10deg] shadow-[0_0_8px_#ff2a5f]">
                  S.E.E.S.
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#00d2ff] tracking-wider uppercase -mt-0.5">
                DATA SCIENCE SPECIALIST
              </span>
            </div>
          </a>

          {/* Persona 3 Reload Quickshell Calendar HUD */}
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs bg-[#060e22] border-2 border-[#00d2ff]/40 px-3 py-1 p3-cut-corner shadow-inner">
            <Moon className="w-3.5 h-3.5 text-[#00d2ff] animate-pulse" />
            <span className="text-[#00d2ff] font-black">DARK HOUR:</span>
            <span className="text-[#f0f8ff] font-bold">2026.08 // FULL MOON</span>
            <span className="text-slate-500">|</span>
            <span className="text-[#ffea00] font-bold">{currentTime}</span>
          </div>

          {/* BGM Toggle in Header (Mobile/Tablet quick button) */}
          <button
            onClick={toggleBgm}
            className={`flex md:hidden items-center gap-1 px-2 py-1 text-xs font-mono font-bold border transition-all ${
              bgmPlaying
                ? "bg-[#ff2a5f]/20 text-[#ff2a5f] border-[#ff2a5f] shadow-[0_0_10px_#ff2a5f]"
                : "bg-[#060e22] text-slate-400 border-slate-700"
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${bgmPlaying ? "animate-spin" : ""}`} />
            <span>{bgmPlaying ? "BGM ON" : "BGM"}</span>
          </button>
        </div>

        {/* Center / Ribbon Navigation Tabs */}
        <nav className="hidden sm:flex items-center gap-1 overflow-x-auto py-1">
          {navTabs.map((tab) => {
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playMenuSwitch();
                  onSelectSection(tab.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-3 py-1 font-mono text-xs font-black uppercase transform skew-x-[-10deg] transition-all flex items-center gap-1 ${
                  isActive
                    ? "bg-[#00d2ff] text-[#030712] shadow-[0_0_15px_#00d2ff] scale-105"
                    : "bg-[#060e22] text-slate-300 border border-[#00d2ff]/30 hover:border-[#00d2ff] hover:text-[#00d2ff]"
                }`}
              >
                <span className="transform skew-x-[10deg] text-[10px] opacity-70">{tab.key}</span>
                <span className="transform skew-x-[10deg]">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Desktop Controls: Persona Music, Sound FX, Search & Resume */}
        <div className="hidden md:flex items-center gap-2 font-mono">
          {/* Persona 3 Neo-Soul BGM Button */}
          <button
            onClick={toggleBgm}
            onMouseEnter={() => sound.playHover()}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold border transition-all ${
              bgmPlaying
                ? "bg-[#ff2a5f]/20 text-[#ff2a5f] border-[#ff2a5f] shadow-[0_0_12px_rgba(255,42,95,0.4)]"
                : "bg-[#060e22] text-slate-400 border-slate-700 hover:text-white"
            }`}
            title="Toggle Persona 3 Background Music"
          >
            <Disc3 className={`w-3.5 h-3.5 ${bgmPlaying ? "animate-spin text-[#ff2a5f]" : "text-slate-400"}`} />
            <span>{bgmPlaying ? "P3 BGM: PLAYING" : "PLAY P3 BGM"}</span>
          </button>

          {/* SFX Button */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-1 px-2 py-1 text-[11px] font-bold border transition-all ${
              soundEnabled
                ? "bg-[#00d2ff]/20 text-[#00d2ff] border-[#00d2ff]"
                : "bg-[#0a142e] text-slate-500 border-slate-700"
            }`}
            title="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[10px]">{soundEnabled ? "SFX ON" : "MUTED"}</span>
          </button>

          {/* Command Palette Button */}
          <button
            onClick={() => {
              sound.playSelect();
              onOpenCommand();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1 bg-[#060e22] hover:bg-[#0a142e] text-[#00d2ff] border border-[#00d2ff]/50 px-2 py-1 text-xs"
            title="Search command palette"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="bg-[#030712] text-[9px] text-slate-400 px-1 border border-slate-800">⌘K</kbd>
          </button>

          {/* Resume PDF */}
          <button
            onClick={() => {
              sound.playSelect();
              onOpenResume();
            }}
            onMouseEnter={() => sound.playHover()}
            className="bg-[#00d2ff] hover:bg-[#00f0ff] text-[#030712] font-black text-xs px-3 py-1 shadow-[0_0_15px_#00d2ff] transform skew-x-[-10deg] hover:scale-105 transition-all"
          >
            <span className="transform skew-x-[10deg] flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" />
              RESUME.PDF
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
