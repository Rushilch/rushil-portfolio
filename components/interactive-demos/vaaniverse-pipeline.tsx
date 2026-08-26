"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RefreshCw, Volume2, Activity, Zap, CheckCircle2, ChevronRight } from "lucide-react";
import { sound } from "@/lib/sound";

interface GestureSample {
  id: string;
  name: string;
  category: string;
  landmarksCount: number;
  confidence: number;
  translation: string;
  latencyMs: number;
  description: string;
  landmarks: { x: number; y: number }[];
}

const SAMPLE_GESTURES: GestureSample[] = [
  {
    id: "hello",
    name: "Open Palm (Hello / Namaste)",
    category: "Greeting",
    landmarksCount: 21,
    confidence: 97.8,
    translation: "Hello! Welcome to my portfolio.",
    latencyMs: 142,
    description: "Open five-finger palm raised to chest level with thumb extended at 45° angle.",
    landmarks: [
      { x: 50, y: 80 }, { x: 42, y: 70 }, { x: 38, y: 55 }, { x: 32, y: 45 }, { x: 25, y: 38 },
      { x: 46, y: 50 }, { x: 44, y: 35 }, { x: 42, y: 25 }, { x: 40, y: 15 },
      { x: 52, y: 48 }, { x: 52, y: 32 }, { x: 52, y: 20 }, { x: 52, y: 10 },
      { x: 58, y: 50 }, { x: 60, y: 35 }, { x: 62, y: 25 }, { x: 64, y: 16 },
      { x: 64, y: 55 }, { x: 68, y: 42 }, { x: 72, y: 32 }, { x: 76, y: 24 },
    ],
  },
  {
    id: "thankyou",
    name: "Flat Palm to Chin (Thank You)",
    category: "Polite",
    landmarksCount: 21,
    confidence: 96.4,
    translation: "Thank you for your time.",
    latencyMs: 158,
    description: "Fingers together touching chin level, extending outward toward the observer.",
    landmarks: [
      { x: 50, y: 85 }, { x: 45, y: 75 }, { x: 42, y: 65 }, { x: 40, y: 58 }, { x: 38, y: 52 },
      { x: 48, y: 60 }, { x: 48, y: 45 }, { x: 48, y: 35 }, { x: 48, y: 25 },
      { x: 53, y: 60 }, { x: 53, y: 44 }, { x: 53, y: 34 }, { x: 53, y: 23 },
      { x: 58, y: 62 }, { x: 58, y: 46 }, { x: 58, y: 36 }, { x: 58, y: 27 },
      { x: 63, y: 65 }, { x: 64, y: 52 }, { x: 65, y: 42 }, { x: 66, y: 32 },
    ],
  },
  {
    id: "help",
    name: "Thumbs Up on Palm (Help)",
    category: "Action",
    landmarksCount: 21,
    confidence: 98.2,
    translation: "Do you need any assistance?",
    latencyMs: 136,
    description: "Closed fist with vertical thumb resting on flat secondary palm baseline.",
    landmarks: [
      { x: 50, y: 75 }, { x: 42, y: 68 }, { x: 40, y: 50 }, { x: 45, y: 35 }, { x: 50, y: 20 },
      { x: 48, y: 55 }, { x: 48, y: 45 }, { x: 52, y: 45 }, { x: 54, y: 55 },
      { x: 54, y: 55 }, { x: 54, y: 45 }, { x: 58, y: 45 }, { x: 60, y: 55 },
      { x: 60, y: 55 }, { x: 60, y: 47 }, { x: 64, y: 47 }, { x: 66, y: 57 },
      { x: 66, y: 57 }, { x: 66, y: 50 }, { x: 70, y: 50 }, { x: 72, y: 60 },
    ],
  },
];

export function VaaniversePipeline() {
  const [selectedGesture, setSelectedGesture] = useState<GestureSample>(SAMPLE_GESTURES[0]);
  const [mode, setMode] = useState<"sign-to-speech" | "speech-to-sign">("sign-to-speech");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [speechText, setSpeechText] = useState<string>("Hello, how can I help you?");

  useEffect(() => {
    if (!isProcessing) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 1400);
    return () => clearInterval(interval);
  }, [isProcessing]);

  const pipelineSteps = mode === "sign-to-speech" ? [
    {
      name: "Landmark Extraction",
      tech: "MediaPipe (21 3D Points)",
      detail: "Captures 21 (x, y, z) hand landmarks at 30 FPS",
      time: "24ms",
    },
    {
      name: "Vector Normalization",
      tech: "NumPy Vectorization",
      detail: "Normalizes bounding box & coordinate scale",
      time: "6ms",
    },
    {
      name: "KNN Classification",
      tech: "Scikit-Learn KNN",
      detail: `Confidence: ${selectedGesture.confidence}% for '${selectedGesture.name.split(" ")[0]}'`,
      time: "14ms",
    },
    {
      name: "Multilingual TTS",
      tech: "gTTS + Audio Stream",
      detail: `Synthesizes "${selectedGesture.translation}"`,
      time: "98ms",
    },
  ] : [
    {
      name: "Audio Ingestion",
      tech: "Microphone Stream",
      detail: `Captured phrase: "${speechText}"`,
      time: "45ms",
    },
    {
      name: "Speech-to-Text",
      tech: "Google Speech Recognizer",
      detail: "Transcribes audio waveform into tokenized text",
      time: "80ms",
    },
    {
      name: "Token Grammar Parser",
      tech: "ISL Grammar Engine",
      detail: "Rearranges English syntax into Subject-Object-Verb (ISL)",
      time: "12ms",
    },
    {
      name: "Avatar Sign Keyframes",
      tech: "Keyframe Sequencer",
      detail: "Dispatches 3D gesture sequence for visual rendering",
      time: "42ms",
    },
  ];

  return (
    <div className="bg-[#0b0f19] border-2 border-[#00d2ff]/40 rounded-xl p-5 md:p-6 overflow-hidden relative shadow-[0_0_25px_rgba(0,210,255,0.15)]">
      {/* Top Header & Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e293b] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00d2ff] animate-ping" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#00d2ff] -ml-5" />
          <span className="text-xs font-mono text-[#00d2ff] font-bold tracking-wider uppercase">
            Live Pipeline Simulator
          </span>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
            Target Latency: &lt;200ms
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[#111726] p-1 rounded-lg border border-[#1e293b]">
          <button
            onClick={() => {
              sound.playSelect();
              setMode("sign-to-speech");
            }}
            onMouseEnter={() => sound.playHover()}
            className={`text-xs px-3 py-1 rounded-md font-mono font-bold transition-all ${
              mode === "sign-to-speech"
                ? "bg-[#00d2ff] text-[#030712] shadow-[0_0_10px_#00d2ff]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Sign → Speech
          </button>
          <button
            onClick={() => {
              sound.playSelect();
              setMode("speech-to-sign");
            }}
            onMouseEnter={() => sound.playHover()}
            className={`text-xs px-3 py-1 rounded-md font-mono font-bold transition-all ${
              mode === "speech-to-sign"
                ? "bg-[#00d2ff] text-[#030712] shadow-[0_0_10px_#00d2ff]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Speech → Sign
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Interactive Control / Visualizer */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {mode === "sign-to-speech" ? (
            <>
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Select Hand Gesture Sample:</span>
                <span className="text-[#00d2ff] font-bold">{selectedGesture.landmarksCount} Coordinates</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_GESTURES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      sound.playSelect();
                      setSelectedGesture(g);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                      selectedGesture.id === g.id
                        ? "bg-[#00d2ff]/20 border-[#00d2ff] text-[#00d2ff] shadow-[0_0_10px_rgba(0,210,255,0.3)]"
                        : "bg-[#111726] border-[#1e293b] text-slate-400 hover:border-slate-600 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-bold truncate font-mono">{g.name.split(" ")[0]}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{g.category}</div>
                  </button>
                ))}
              </div>

              {/* Hand Landmark SVG Canvas Preview */}
              <div className="bg-[#070a12] border border-[#1e293b] rounded-lg p-3 relative h-48 flex items-center justify-center overflow-hidden">
                <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
                  MediaPipe 3D Landmark Mesh
                </div>
                <div className="absolute top-2 right-2 text-[10px] font-mono text-[#00d2ff] font-bold">
                  Total Latency: {selectedGesture.latencyMs}ms
                </div>

                <svg viewBox="0 0 100 100" className="w-40 h-40">
                  {/* Palm Base & Connections */}
                  <line x1="50" y1="80" x2="42" y2="70" stroke="#00d2ff" strokeWidth="1.5" strokeOpacity="0.6" />
                  <line x1="50" y1="80" x2="46" y2="50" stroke="#00d2ff" strokeWidth="1.5" strokeOpacity="0.6" />
                  <line x1="50" y1="80" x2="52" y2="48" stroke="#00d2ff" strokeWidth="1.5" strokeOpacity="0.6" />
                  <line x1="50" y1="80" x2="58" y2="50" stroke="#00d2ff" strokeWidth="1.5" strokeOpacity="0.6" />
                  <line x1="50" y1="80" x2="64" y2="55" stroke="#00d2ff" strokeWidth="1.5" strokeOpacity="0.6" />

                  {/* Finger joint connections */}
                  {selectedGesture.landmarks.slice(1).map((pt, i, arr) => {
                    if (i % 4 === 0 || i === 0) return null;
                    const prev = arr[i - 1];
                    return (
                      <line
                        key={`line-${i}`}
                        x1={prev.x}
                        y1={prev.y}
                        x2={pt.x}
                        y2={pt.y}
                        stroke="#10b981"
                        strokeWidth="1.2"
                        strokeOpacity="0.8"
                      />
                    );
                  })}

                  {/* Landmark nodes */}
                  {selectedGesture.landmarks.map((pt, idx) => (
                    <circle
                      key={idx}
                      cx={pt.x}
                      cy={pt.y}
                      r={idx === 0 ? "3" : "2"}
                      fill={idx === 0 ? "#00d2ff" : "#10b981"}
                      className="transition-all duration-300"
                    />
                  ))}
                </svg>

                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/90 px-2.5 py-1 rounded border border-slate-800 font-mono">
                  <span className="truncate">{selectedGesture.description}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-xs font-mono text-slate-400">Spoken Phrase Input:</div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={speechText}
                  onChange={(e) => setSpeechText(e.target.value)}
                  className="bg-[#111726] border border-[#1e293b] text-slate-200 text-xs px-3 py-2 rounded-lg flex-1 focus:outline-none focus:border-[#00d2ff]"
                  placeholder="Enter sentence in English..."
                />
              </div>

              {/* Speech Waveform Simulation */}
              <div className="bg-[#070a12] border border-[#1e293b] rounded-lg p-4 h-48 flex flex-col items-center justify-center relative">
                <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500">
                  Audio Ingestion Waveform
                </div>
                <div className="flex items-center justify-center gap-1.5 h-20 w-full px-6">
                  {[20, 45, 80, 60, 95, 40, 75, 90, 30, 65, 85, 50, 70, 40, 90, 60, 30, 80, 50, 20].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-[#00d2ff] to-[#10b981] rounded-full wave-anim"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${(i * 0.06).toFixed(2)}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="text-xs font-mono text-[#00d2ff] mt-2 font-bold">
                  Sample Rate: 16 kHz • Mono Audio Stream
                </div>
              </div>
            </>
          )}

          {/* Controls Bar */}
          <div className="flex items-center justify-between bg-[#111726] p-2.5 rounded-lg border border-[#1e293b] text-xs font-mono">
            <button
              onClick={() => {
                sound.playSelect();
                setIsProcessing(!isProcessing);
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 text-[#00d2ff] hover:text-white font-bold px-2 py-1 rounded"
            >
              {isProcessing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isProcessing ? "PAUSE PIPELINE" : "RESUME FLOW"}
            </button>
            <div className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#10b981]" />
              Sub-200ms Target Met
            </div>
          </div>
        </div>

        {/* Right Pipeline Architecture Flow */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>Execution Timeline:</span>
            <span className="text-slate-500 font-normal">Deterministic Pipeline Flow</span>
          </div>

          <div className="space-y-2.5">
            {pipelineSteps.map((step, index) => {
              const isActive = activeStep === index;
              const isPast = activeStep > index;

              return (
                <div
                  key={index}
                  className={`p-3.5 rounded-lg border transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#00d2ff]/20 to-[#111726] border-[#00d2ff] shadow-[0_0_15px_-3px_rgba(0,210,255,0.3)]"
                      : isPast
                      ? "bg-[#111726]/80 border-slate-700/60 text-slate-300"
                      : "bg-[#0c101c]/60 border-[#1a2333] text-slate-500"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-black ${
                          isActive
                            ? "bg-[#00d2ff] text-[#030712]"
                            : isPast
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        PHASE 0{index + 1}
                      </span>
                      <span className="text-xs font-bold text-[#f0f8ff] font-mono uppercase">{step.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {step.tech}
                      </span>
                      <span
                        className={`text-xs font-mono font-bold ${
                          isActive ? "text-[#00d2ff]" : "text-slate-400"
                        }`}
                      >
                        {step.time}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-1 pl-1 font-sans">{step.detail}</p>
                </div>
              );
            })}
          </div>

          {/* Real-time Output Banner */}
          <div className="mt-2 bg-[#060e22] border-2 border-[#00d2ff]/60 p3-cut-corner p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded bg-[#00d2ff]/20 text-[#00d2ff]">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-[#00d2ff] uppercase tracking-wider font-bold">
                  {mode === "sign-to-speech" ? "Synthesized Output Stream" : "Generated Sign Sequence"}
                </div>
                <div className="text-xs font-bold text-slate-100 font-mono">
                  {mode === "sign-to-speech" ? `"${selectedGesture.translation}"` : `[Avatar Sequence: ${speechText}]`}
                </div>
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-[10px] text-slate-400">Round-trip</div>
              <div className="text-xs font-black text-[#00d2ff]">
                {mode === "sign-to-speech" ? `${selectedGesture.latencyMs} ms` : "179 ms"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
