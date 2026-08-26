"use client";

import React, { useState } from "react";
import { Disc3, Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";

export function P3Jukebox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(25);

  const togglePlay = () => {
    const state = sound.bgm.toggleBgm();
    setIsPlaying(state);
    if (state) sound.playSelect();
    else sound.playCancel();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    sound.bgm.setVolume(val / 100);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-[#060e22]/95 border-2 border-[#00d2ff] p-3 p3-cut-corner shadow-[0_0_25px_rgba(0,210,255,0.3)] backdrop-blur-md flex items-center gap-3 font-mono">
        <button
          onClick={togglePlay}
          onMouseEnter={() => sound.playHover()}
          className={`w-9 h-9 flex items-center justify-center border-2 transition-all ${
            isPlaying
              ? "bg-[#ff2a5f] border-white text-white shadow-[0_0_15px_#ff2a5f]"
              : "bg-[#030712] border-[#00d2ff] text-[#00d2ff] hover:bg-[#00d2ff] hover:text-[#030712]"
          }`}
          title={isPlaying ? "Pause Persona 3 BGM" : "Play Persona 3 BGM"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-1.5 text-[9px] text-[#ffea00] font-black uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>PERSONA 3 RELOAD JUKEBOX</span>
          </div>
          <div className="text-xs font-black text-[#f0f8ff] tracking-wide flex items-center gap-1.5">
            <Disc3 className={`w-3.5 h-3.5 ${isPlaying ? "animate-spin text-[#00d2ff]" : "text-slate-500"}`} />
            <span>{isPlaying ? "IWATODAI DORM [NEO-SOUL]" : "AUDIO READY // CLICK PLAY"}</span>
          </div>
        </div>

        {isPlaying && (
          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-800">
            <Volume2 className="w-3.5 h-3.5 text-[#00d2ff]" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-slate-800 rounded appearance-none accent-[#00d2ff] cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
