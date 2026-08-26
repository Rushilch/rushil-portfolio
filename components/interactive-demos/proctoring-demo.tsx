"use client";

import React, { useState } from "react";
import { Eye, ShieldAlert, CheckCircle2, Video, AlertCircle, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";

interface ProctorScenario {
  id: string;
  name: string;
  yaw: number;
  pitch: number;
  roll: number;
  faceCount: number;
  status: "Normal" | "Suspicious Gaze" | "Multi-Person Intrusion" | "Head Turned Away";
  alertLevel: "clean" | "warning" | "violation";
  description: string;
}

const SCENARIOS: ProctorScenario[] = [
  {
    id: "centered",
    name: "Standard Assessment Focus",
    yaw: 2.1,
    pitch: -3.4,
    roll: 0.8,
    faceCount: 1,
    status: "Normal",
    alertLevel: "clean",
    description: "Subject looking directly at screen center within ±15° allowable gaze cone.",
  },
  {
    id: "gaze_left",
    name: "Continuous Left Gaze Aversion",
    yaw: -38.5,
    pitch: 4.2,
    roll: -2.1,
    faceCount: 1,
    status: "Suspicious Gaze",
    alertLevel: "warning",
    description: "Subject head turned toward off-screen secondary monitor or notes for >3 seconds.",
  },
  {
    id: "multiple_faces",
    name: "Secondary Intruder Detected",
    yaw: 4.0,
    pitch: -2.0,
    roll: 1.0,
    faceCount: 2,
    status: "Multi-Person Intrusion",
    alertLevel: "violation",
    description: "Unregistered secondary individual detected within webcam field of view.",
  },
];

export function ProctoringDemo() {
  const [scenario, setScenario] = useState<ProctorScenario>(SCENARIOS[0]);

  return (
    <div className="bg-[#0b0f19] border-2 border-[#00d2ff]/40 rounded-xl p-5 md:p-6 overflow-hidden shadow-[0_0_25px_rgba(0,210,255,0.15)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e293b] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <Eye className="w-4 h-4 text-[#00d2ff]" />
          <span className="text-xs font-mono text-[#00d2ff] font-bold uppercase tracking-wider">
            Computer Vision Proctoring Engine &bull; OpenCV + PnP Pose
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
          <Video className="w-3.5 h-3.5 text-[#00d2ff]" />
          <span>Real-Time Stream &bull; 30 FPS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Simulated Feed */}
        <div className="lg:col-span-6 flex flex-col gap-3">
          <div className="text-xs font-mono text-slate-400">Select Test Condition:</div>
          <div className="grid grid-cols-3 gap-2">
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  sound.playSelect();
                  setScenario(sc);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                  scenario.id === sc.id
                    ? "bg-[#00d2ff]/20 border-[#00d2ff] text-[#00d2ff] shadow-sm"
                    : "bg-[#111726] border-[#1e293b] text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="font-bold truncate font-mono">{sc.name.split(" ")[0]}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{sc.status}</div>
              </button>
            ))}
          </div>

          <div className="bg-[#05070d] border-2 border-slate-800 rounded-lg p-4 h-48 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 p3-grid-pattern opacity-30 pointer-events-none" />
            <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500">
              Euler Angles (PnP Solver)
            </div>

            {/* Bounding Box Simulation */}
            <div
              className={`border-2 rounded p-4 flex flex-col items-center justify-center transition-all duration-300 ${
                scenario.alertLevel === "clean"
                  ? "border-[#10b981] bg-emerald-950/20"
                  : scenario.alertLevel === "warning"
                  ? "border-[#ffea00] bg-amber-950/20"
                  : "border-[#ff2a5f] bg-rose-950/20"
              }`}
              style={{
                transform: `rotate(${scenario.roll * 2}deg) skewX(${scenario.yaw * 0.4}deg)`,
              }}
            >
              <div className="w-16 h-20 rounded-full border border-slate-400/40 relative flex items-center justify-center">
                <div className="flex gap-4">
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-[#00d2ff]"
                    style={{ transform: `translateX(${scenario.yaw * 0.15}px)` }}
                  />
                  <div
                    className="w-2.5 h-2.5 rounded-full bg-[#00d2ff]"
                    style={{ transform: `translateX(${scenario.yaw * 0.15}px)` }}
                  />
                </div>
              </div>
              <div className="text-[10px] font-mono text-slate-300 mt-2">
                Face 01 &bull; Conf: 99.1%
              </div>
            </div>

            {scenario.faceCount > 1 && (
              <div className="absolute right-4 top-10 border-2 border-dashed border-[#ff2a5f] bg-rose-950/60 rounded p-2 text-center animate-pulse">
                <div className="w-8 h-10 rounded-full border border-rose-400/60 mx-auto" />
                <div className="text-[9px] font-mono text-[#ff2a5f] mt-1 font-bold">Intruder Flagged</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Telemetry Column */}
        <div className="lg:col-span-6 flex flex-col gap-3 font-mono">
          <div className="text-xs text-slate-400">Head Pose Telemetry:</div>

          <div className="grid grid-cols-3 gap-2 bg-[#0e1322] border border-[#1e293b] rounded-lg p-3 text-center">
            <div>
              <div className="text-[10px] text-slate-500">Yaw</div>
              <div className="text-sm font-bold text-slate-200 mt-0.5">{scenario.yaw}°</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500">Pitch</div>
              <div className="text-sm font-bold text-slate-200 mt-0.5">{scenario.pitch}°</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500">Roll</div>
              <div className="text-sm font-bold text-slate-200 mt-0.5">{scenario.roll}°</div>
            </div>
          </div>

          <div
            className={`p-3.5 rounded-lg border-2 flex items-start gap-3 ${
              scenario.alertLevel === "clean"
                ? "bg-emerald-950/40 border-[#10b981] text-[#10b981]"
                : scenario.alertLevel === "warning"
                ? "bg-amber-950/40 border-[#ffea00] text-[#ffea00]"
                : "bg-rose-950/40 border-[#ff2a5f] text-[#ff2a5f]"
            }`}
          >
            {scenario.alertLevel === "clean" ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-[#10b981] mt-0.5" />
            ) : scenario.alertLevel === "warning" ? (
              <AlertCircle className="w-5 h-5 shrink-0 text-[#ffea00] mt-0.5" />
            ) : (
              <ShieldAlert className="w-5 h-5 shrink-0 text-[#ff2a5f] mt-0.5" />
            )}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider">
                Status: {scenario.status}
              </div>
              <p className="text-xs text-slate-300 mt-1 font-sans">{scenario.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
