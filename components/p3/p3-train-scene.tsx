"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Music2, Train, Moon, Disc3, Volume2 } from "lucide-react";
import { sound, BGM_TRACKS } from "@/lib/sound";

export function P3TrainScene() {
  const [isHopping, setIsHopping] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const [currentTrackName, setCurrentTrackName] = useState<string>("Iwatodai Night");
  const [currentTrackSubtitle, setCurrentTrackSubtitle] = useState<string>("Neo-Soul Rhodes & Sub-Bass");
  const [isPlaying, setIsPlaying] = useState(false);
  const [songSwitchCount, setSongSwitchCount] = useState(0);

  useEffect(() => {
    const updateAudioState = () => {
      setCurrentTrackName(sound.bgm.getTrackName());
      setCurrentTrackSubtitle(sound.bgm.getCurrentTrack().subtitle);
      setIsPlaying(sound.bgm.isPlaying);
    };

    updateAudioState();
    const unsubscribe = sound.bgm.subscribe(updateAudioState);
    return () => unsubscribe();
  }, []);

  const handleMakotoClick = () => {
    sound.playSelect();
    setIsHopping(true);
    const nextTrack = sound.bgm.nextTrack();
    setCurrentTrackName(nextTrack.name);
    setCurrentTrackSubtitle(nextTrack.subtitle);
    setShowDialogue(true);
    setSongSwitchCount((c) => c + 1);

    setTimeout(() => {
      setIsHopping(false);
    }, 450);

    setTimeout(() => {
      setShowDialogue(false);
    }, 3200);
  };

  return (
    <div className="w-full bg-[#030712] border-2 border-[#00d2ff] p3-cut-corner p-4 sm:p-5 relative overflow-hidden shadow-[0_0_35px_rgba(0,210,255,0.3)]">
      {/* Top HUD Header */}
      <div className="flex items-center justify-between border-b-2 border-[#00d2ff]/40 pb-2 mb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Train className="w-4 h-4 text-[#00d2ff]" />
          <span className="font-bold text-[#f0f8ff] tracking-wide">
            Tatara Night Line &bull; Makoto Yuki
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#00d2ff] font-medium">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-[#ff2a5f] animate-ping" : "bg-slate-500"}`} />
          <span>{isPlaying ? "BGM Active" : "Click Makoto to Play BGM"}</span>
        </div>
      </div>

      {/* Train Window View Canvas / Pixel Art Animation */}
      <div className="relative w-full h-64 sm:h-72 bg-[#060c24] rounded-lg overflow-hidden border-2 border-slate-800 flex items-center justify-center select-none">
        {/* Layer 1: Pixel Starfield & Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030617] via-[#081238] to-[#04091e]" />

        {/* Twinkling Pixel Stars */}
        <div className="absolute top-4 left-8 w-1 h-1 bg-white animate-ping opacity-80" />
        <div className="absolute top-8 left-1/3 w-1.5 h-1.5 bg-[#00d2ff] animate-pulse" />
        <div className="absolute top-12 right-1/4 w-1 h-1 bg-white animate-ping delay-300 opacity-60" />
        <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-[#ffea00] animate-pulse delay-500" />
        <div className="absolute top-16 left-1/2 w-1 h-1 bg-white opacity-70" />

        {/* Layer 2: Glowing Pixel Moon */}
        <div className="absolute top-5 right-8 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#f0f8ff] to-[#00d2ff] shadow-[0_0_25px_#00d2ff] flex items-center justify-center relative">
            <div className="w-3 h-3 rounded-full bg-[#004488]/30 absolute top-2 left-2" />
            <div className="w-2 h-2 rounded-full bg-[#004488]/20 absolute bottom-3 right-3" />
          </div>
          <div className="text-[9px] font-mono text-[#00d2ff] font-bold tracking-widest mt-1 opacity-80">
            Full Moon
          </div>
        </div>

        {/* Layer 3: Scrolling City Skyline (Pixel Art Silhouettes) */}
        <div className="absolute bottom-12 left-0 right-0 h-28 flex items-end opacity-60 pointer-events-none">
          <svg
            viewBox="0 0 800 120"
            className="w-full h-full object-cover animate-[pulse_4s_infinite]"
            style={{ shapeRendering: "crispEdges" }}
          >
            {/* Distant Buildings */}
            <rect x="0" y="40" width="45" height="80" fill="#040b22" />
            <rect x="50" y="20" width="35" height="100" fill="#060f2e" />
            <rect x="90" y="50" width="60" height="70" fill="#040b22" />
            <rect x="155" y="10" width="40" height="110" fill="#071338" />
            <rect x="200" y="35" width="55" height="85" fill="#040b22" />
            <rect x="260" y="25" width="50" height="95" fill="#060f2e" />
            <rect x="315" y="45" width="40" height="75" fill="#040b22" />
            <rect x="360" y="15" width="45" height="105" fill="#071338" />
            <rect x="410" y="30" width="50" height="90" fill="#060f2e" />
            <rect x="465" y="55" width="60" height="65" fill="#040b22" />
            <rect x="530" y="20" width="40" height="100" fill="#071338" />
            <rect x="575" y="35" width="55" height="85" fill="#040b22" />
            <rect x="635" y="10" width="45" height="110" fill="#060f2e" />
            <rect x="685" y="40" width="50" height="80" fill="#040b22" />
            <rect x="740" y="25" width="60" height="95" fill="#071338" />

            {/* Lit Windows */}
            <rect x="60" y="30" width="4" height="4" fill="#ffea00" />
            <rect x="70" y="45" width="4" height="4" fill="#00d2ff" />
            <rect x="165" y="25" width="4" height="4" fill="#ffea00" />
            <rect x="175" y="40" width="4" height="4" fill="#ff2a5f" />
            <rect x="210" y="50" width="4" height="4" fill="#00d2ff" />
            <rect x="275" y="35" width="4" height="4" fill="#ffea00" />
            <rect x="370" y="30" width="4" height="4" fill="#00d2ff" />
            <rect x="385" y="60" width="4" height="4" fill="#ffea00" />
            <rect x="545" y="35" width="4" height="4" fill="#ffea00" />
            <rect x="650" y="25" width="4" height="4" fill="#00d2ff" />
            <rect x="755" y="40" width="4" height="4" fill="#ffea00" />
          </svg>
        </div>

        {/* Layer 4: Passing Speed Streaks / Electric Cyan Railway Lights */}
        <div className="absolute bottom-10 left-0 right-0 h-4 overflow-hidden pointer-events-none">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent animate-pulse" />
          <div className="w-16 h-1 bg-[#00d2ff] rounded-full shadow-[0_0_10px_#00d2ff] absolute top-1 animate-[ping_1.5s_infinite]" />
        </div>

        {/* Layer 5: Train Interior Window Frame & Sill */}
        <div className="absolute inset-0 border-8 border-[#040817] pointer-events-none rounded-lg shadow-inner">
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#030612] to-transparent" />
        </div>

        {/* Cute Speech Bubble Displaying Real-Time Switched Song */}
        {showDialogue && (
          <div className="absolute top-10 left-10 sm:left-16 z-30 bg-[#030712]/95 border-2 border-[#00d2ff] text-slate-100 text-[11px] font-mono px-3.5 py-2 rounded-lg shadow-[0_0_20px_#00d2ff] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-1.5 text-[#00d2ff] font-bold">
              <Disc3 className="w-3.5 h-3.5 animate-spin" />
              <span>Switched Track:</span>
            </div>
            <div className="font-bold text-[#f0f8ff]">{currentTrackName}</div>
            <div className="text-[10px] text-slate-400">{currentTrackSubtitle}</div>
            {/* Bubble arrow pointing down to headphones */}
            <div className="w-2.5 h-2.5 bg-[#030712] border-r-2 border-b-2 border-[#00d2ff] rotate-45 absolute -bottom-1.5 left-7" />
          </div>
        )}

        {/* Layer 6: Chibi Pixel Art Makoto Yuki (Click to switch song & clean hop) */}
        <div
          onClick={handleMakotoClick}
          onMouseEnter={() => sound.playHover()}
          title="Click Makoto to switch song!"
          className={`absolute bottom-3 left-10 sm:left-16 flex flex-col items-center cursor-pointer transition-all duration-300 ${
            isHopping
              ? "animate-[p3-hop_0.45s_ease-out]"
              : "hover:scale-105 animate-[p3-head-bob_3s_ease-in-out_infinite]"
          }`}
          style={{
            transformOrigin: "bottom center",
          }}
        >
          {/* Floating Pixel Musical Notes from Headphones */}
          <div className="relative w-full h-8 pointer-events-none">
            <span className="absolute -top-3 left-4 text-xs text-[#00d2ff] font-bold animate-bounce drop-shadow-[0_0_8px_#00d2ff]">
              ♪
            </span>
            <span className="absolute -top-6 right-2 text-sm text-[#ff2a5f] font-bold animate-pulse delay-200 drop-shadow-[0_0_8px_#ff2a5f]">
              ♫
            </span>
            <span className="absolute -top-1 right-6 text-[10px] text-[#ffea00] font-bold animate-ping delay-500">
              ♪
            </span>
          </div>

          {/* Pixel Art SVG Chibi Makoto Character */}
          <svg
            width="110"
            height="130"
            viewBox="0 0 110 130"
            className={`transition-all duration-200 ${isHopping ? "drop-shadow-[0_0_20px_#00d2ff]" : "drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]"}`}
            style={{ imageRendering: "pixelated", shapeRendering: "crispEdges" }}
          >
            {/* Body / Gekkoukan Dark School Uniform */}
            <rect x="25" y="65" width="60" height="55" fill="#0f172a" />
            <rect x="30" y="65" width="50" height="55" fill="#1e293b" />
            {/* White Collar & S.E.E.S. Ribbon Trim */}
            <polygon points="50,65 55,75 60,65" fill="#f0f8ff" />
            <rect x="53" y="73" width="4" height="15" fill="#00d2ff" />
            {/* MP3 Player Wire hanging from neck */}
            <path d="M 38 62 Q 45 80 52 82" stroke="#00d2ff" strokeWidth="2" fill="none" />

            {/* Chibi Head / Skin Tone */}
            <rect x="32" y="32" width="46" height="36" rx="4" fill="#fde68a" />
            <rect x="35" y="35" width="40" height="32" fill="#fef08a" />

            {/* Cute Pixel Eyes */}
            <rect x="42" y="46" width="5" height="7" fill="#030712" />
            <rect x="43" y="47" width="2" height="3" fill="#00d2ff" />
            {/* Right eye subtly hidden under emo hair fringe */}
            <rect x="62" y="46" width="5" height="7" fill="#030712" opacity="0.4" />

            {/* Cute Blushing Cheeks */}
            <rect x="36" y="53" width="5" height="3" fill="#f43f5e" opacity="0.7" />
            <rect x="68" y="53" width="5" height="3" fill="#f43f5e" opacity="0.7" />

            {/* Signature Dark Navy Emo Hair Fringe covering side */}
            <polygon points="28,26 82,26 84,42 75,54 60,60 48,55 35,46 26,38" fill="#1e3a8a" />
            <polygon points="30,28 80,28 78,38 65,48 52,55 38,44 28,34" fill="#1d4ed8" />
            {/* Highlight Hair Strands */}
            <rect x="36" y="30" width="20" height="4" fill="#3b82f6" />
            <rect x="60" y="32" width="12" height="4" fill="#60a5fa" />

            {/* Signature Metallic / Cyan Clip-On Headphones */}
            <rect x="22" y="38" width="8" height="20" rx="3" fill="#00d2ff" />
            <rect x="24" y="41" width="4" height="14" fill="#ffffff" />
            <rect x="80" y="38" width="8" height="20" rx="3" fill="#00d2ff" />
            <rect x="82" y="41" width="4" height="14" fill="#ffffff" />
            {/* Headphone Band */}
            <path d="M 26 38 Q 55 16 84 38" stroke="#00d2ff" strokeWidth="4" fill="none" />

            {/* Hand holding MP3 player on window sill */}
            <rect x="68" y="95" width="14" height="12" rx="3" fill="#fde68a" />
            <rect x="75" y="92" width="12" height="18" rx="2" fill="#00d2ff" />
            <rect x="77" y="95" width="8" height="6" fill="#030712" />
          </svg>
        </div>

        {/* Bottom Train Seat & Sill */}
        <div className="absolute bottom-0 left-0 right-0 h-5 bg-[#0a1538] border-t-2 border-[#00d2ff]/40 flex items-center justify-between px-3 text-[10px] font-mono text-slate-300">
          <span>Gekkoukan High &bull; Car 03</span>
          <span className="text-[#00d2ff] font-bold flex items-center gap-1.5">
            <Volume2 className="w-3 h-3" />
            <span>Now Playing: {currentTrackName}</span>
          </span>
        </div>
      </div>

      {/* Footer Tag */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <button
          onClick={handleMakotoClick}
          className="flex items-center gap-1.5 text-[#00d2ff] hover:text-[#00f0ff] font-medium transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Click Makoto to switch track {songSwitchCount > 0 && `(${songSwitchCount})`}</span>
        </button>
        <span className="text-slate-400">Persona 3 Reload</span>
      </div>
    </div>
  );
}
