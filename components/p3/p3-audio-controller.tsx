"use client";

import React, { useState, useEffect } from "react";
import { Disc3, Play, Pause, Volume2, VolumeX, Minimize2, Maximize2, Sparkles, Sliders, Radio, Music, SkipForward } from "lucide-react";
import { sound, BGM_TRACKS } from "@/lib/sound";

export function P3AudioController() {
  const [isMinimized, setIsMinimized] = useState(true);
  const [bgmPlaying, setBgmPlaying] = useState(sound.bgm.isPlaying);
  const [sfxEnabled, setSfxEnabled] = useState(sound.enabled);
  const [volume, setVolume] = useState(Math.round(sound.bgm.volume * 100));
  const [currentTrack, setCurrentTrack] = useState(sound.bgm.getCurrentTrack());

  useEffect(() => {
    const unsubBgm = sound.bgm.subscribe(() => {
      setBgmPlaying(sound.bgm.isPlaying);
      setVolume(Math.round(sound.bgm.volume * 100));
      setCurrentTrack(sound.bgm.getCurrentTrack());
    });
    const unsubSfx = sound.subscribe(() => {
      setSfxEnabled(sound.enabled);
    });

    return () => {
      unsubBgm();
      unsubSfx();
    };
  }, []);

  const togglePlay = () => {
    sound.bgm.toggleBgm();
  };

  const handleNextTrack = () => {
    sound.playSelect();
    sound.bgm.nextTrack();
  };

  const toggleSfx = () => {
    sound.toggleSfx();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    sound.bgm.setVolume(val / 100);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {isMinimized ? (
        /* Minimized Floating Pill */
        <button
          onClick={() => {
            sound.playSelect();
            setIsMinimized(false);
          }}
          onMouseEnter={() => sound.playHover()}
          className="bg-[#060e22]/95 hover:bg-[#0a142e] border-2 border-[#00d2ff] p-2.5 sm:px-4 sm:py-2.5 p3-cut-corner shadow-[0_0_25px_rgba(0,210,255,0.35)] backdrop-blur-md flex items-center gap-2.5 font-mono text-xs transition-all group hover:scale-105"
          title="Open Audio Controller [Press M to play/pause]"
        >
          <div className="relative">
            <Disc3
              className={`w-5 h-5 text-[#00d2ff] ${
                bgmPlaying ? "animate-spin text-[#ff2a5f]" : "group-hover:rotate-45 transition-transform"
              }`}
            />
            {bgmPlaying && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff2a5f] rounded-full animate-ping" />
            )}
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <div className="flex items-center gap-1.5 text-[9px] text-[#ffea00] font-bold">
              <span>Audio Deck</span>
            </div>
            <div className="text-[11px] font-bold text-[#f0f8ff] flex items-center gap-1">
              <span>{bgmPlaying ? currentTrack.name : "BGM Paused"}</span>
              <span className="text-slate-500">•</span>
              <span className="text-[10px] text-slate-400 font-mono">[M]</span>
            </div>
          </div>
        </button>
      ) : (
        /* Expanded Full Persona 3 Audio Controller Deck */
        <div className="bg-[#060e22]/95 border-2 border-[#00d2ff] p3-cut-corner-lg p-4 sm:p-5 shadow-[0_0_40px_rgba(0,210,255,0.4)] backdrop-blur-lg w-80 sm:w-96 font-mono text-xs relative animate-in fade-in zoom-in-95 duration-150">
          {/* Scanline pattern */}
          <div className="absolute inset-0 p3-scanlines opacity-20 pointer-events-none rounded-lg" />

          {/* Top Bar with Title & Minimize */}
          <div className="flex items-center justify-between border-b-2 border-[#00d2ff]/40 pb-2.5 mb-3.5">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#00d2ff]" />
              <span className="font-bold text-[#f0f8ff] tracking-wide">
                Persona Audio Deck
              </span>
            </div>

            <button
              onClick={() => {
                sound.playCancel();
                setIsMinimized(true);
              }}
              onMouseEnter={() => sound.playHover()}
              className="p-1 text-slate-400 hover:text-[#00d2ff] hover:bg-[#030712] transition-colors"
              title="Minimize Controller"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Track Display with Switch Button */}
          <div className="bg-[#030712] border border-slate-800 p-3 mb-3.5 p3-cut-corner flex items-center justify-between">
            <div className="min-w-0 pr-2">
              <div className="text-[10px] text-[#ffea00] font-bold tracking-wide mb-0.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#ffea00]" />
                <span>Synthesized BGM Track ({currentTrack.bpm} BPM)</span>
              </div>
              <div className="text-xs font-bold text-[#f0f8ff] truncate font-mono">
                {currentTrack.name}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {currentTrack.subtitle}
              </div>
            </div>

            <button
              onClick={handleNextTrack}
              onMouseEnter={() => sound.playHover()}
              className="p-2 bg-[#060e22] hover:bg-[#00d2ff] hover:text-[#030712] text-[#00d2ff] border border-[#00d2ff]/50 rounded transition-all shrink-0 flex items-center gap-1"
              title="Switch to next BGM track"
            >
              <SkipForward className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">Next</span>
            </button>
          </div>

          {/* Controls: Play/Pause, Volume Slider, SFX Toggle */}
          <div className="space-y-3 mb-3.5">
            {/* Play & SFX Row */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={togglePlay}
                onMouseEnter={() => sound.playHover()}
                className={`py-2.5 px-3 border-2 font-bold flex items-center justify-center gap-2 transition-all p3-diagonal-border ${
                  bgmPlaying
                    ? "bg-[#ff2a5f] border-white text-white shadow-[0_0_20px_#ff2a5f]"
                    : "bg-[#030712] border-[#00d2ff] text-[#00d2ff] hover:bg-[#00d2ff] hover:text-[#030712]"
                }`}
              >
                {bgmPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{bgmPlaying ? "Pause BGM [M]" : "Play BGM [M]"}</span>
              </button>

              <button
                onClick={toggleSfx}
                onMouseEnter={() => sound.playHover()}
                className={`py-2.5 px-3 border-2 font-bold flex items-center justify-center gap-2 transition-all p3-diagonal-border ${
                  sfxEnabled
                    ? "bg-[#00d2ff] border-white text-[#030712] shadow-[0_0_15px_#00d2ff]"
                    : "bg-[#030712] border-slate-700 text-slate-500"
                }`}
              >
                {sfxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{sfxEnabled ? "SFX On [T]" : "SFX Muted"}</span>
              </button>
            </div>

            {/* Volume Slider */}
            <div className="bg-[#030712] border border-slate-800 p-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-bold shrink-0">
                <Sliders className="w-3.5 h-3.5 text-[#00d2ff]" />
                <span>BGM Volume: {volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-[#00d2ff] cursor-pointer"
              />
            </div>
          </div>

          {/* Keyboard Navigation Quick Reference */}
          <div className="border-t border-slate-800 pt-2.5 text-[10px] text-slate-400 flex flex-wrap items-center justify-between gap-1">
            <span className="text-slate-500">Hotkeys:</span>
            <span className="text-[#00d2ff] font-bold">[W/S] Nav</span>
            <span className="text-[#ffea00] font-bold">[1-6] Tabs</span>
            <span className="text-[#ff2a5f] font-bold">[M] BGM</span>
            <span className="text-[#10b981] font-bold">[R] Resume</span>
          </div>
        </div>
      )}
    </div>
  );
}
