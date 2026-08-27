"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, FastForward, CheckCircle2, Clock, Bell, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";
import {
  PomodoroMode,
  MODE_DURATIONS,
  formatTime,
  getNextMode,
  computeProgress,
} from "@/lib/pomodoro-logic";

export function PomodoroSimulator() {
  const [mode, setMode] = useState<PomodoroMode>("work");
  const [timeLeft, setTimeLeft] = useState(MODE_DURATIONS.work);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(3);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            sound.playSelect();
            if (mode === "work") {
              setCompletedSessions((c) => c + 1);
            }
            const next = getNextMode(mode);
            setMode(next);
            return MODE_DURATIONS[next];
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, mode]);

  const switchMode = (newMode: PomodoroMode) => {
    sound.playMenuSwitch();
    setMode(newMode);
    setTimeLeft(MODE_DURATIONS[newMode]);
    setIsRunning(false);
  };

  const toggleRunning = () => {
    sound.playSelect();
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    sound.playCancel();
    setIsRunning(false);
    setTimeLeft(MODE_DURATIONS[mode]);
  };

  const handleSkip = () => {
    sound.playSelect();
    if (mode === "work") {
      setCompletedSessions((c) => c + 1);
      switchMode("shortBreak");
    } else {
      switchMode("work");
    }
  };

  const progressPercent = computeProgress(MODE_DURATIONS[mode], timeLeft);

  return (
    <div className="bg-[#030712] border-2 border-[#00d2ff]/40 p-4 sm:p-6 p3-cut-corner text-xs font-mono space-y-5">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#ff2a5f]" />
          <span className="font-bold text-[#f0f8ff] tracking-wide text-sm">
            Python Tkinter &bull; Pomodoro State Machine Simulator
          </span>
        </div>
        <span className="text-[10px] text-[#ff2a5f] font-bold bg-[#060e22] px-2 py-0.5 border border-[#ff2a5f]/40">
          ● Runtime: Python 3.12 Tkinter
        </span>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => switchMode("work")}
          className={`px-4 py-2 border font-bold transition-all ${
            mode === "work"
              ? "bg-[#ff2a5f] text-white border-white shadow-[0_0_15px_#ff2a5f]"
              : "bg-[#060e22] text-slate-400 border-slate-800 hover:border-slate-600"
          }`}
        >
          25:00 Work Focus
        </button>

        <button
          onClick={() => switchMode("shortBreak")}
          className={`px-4 py-2 border font-bold transition-all ${
            mode === "shortBreak"
              ? "bg-[#00d2ff] text-[#030712] border-white shadow-[0_0_15px_#00d2ff]"
              : "bg-[#060e22] text-slate-400 border-slate-800 hover:border-slate-600"
          }`}
        >
          05:00 Short Break
        </button>

        <button
          onClick={() => switchMode("longBreak")}
          className={`px-4 py-2 border font-bold transition-all ${
            mode === "longBreak"
              ? "bg-[#10b981] text-[#030712] border-white shadow-[0_0_15px_#10b981]"
              : "bg-[#060e22] text-slate-400 border-slate-800 hover:border-slate-600"
          }`}
        >
          20:00 Long Break
        </button>
      </div>

      {/* Main Timer Display */}
      <div className="flex flex-col items-center justify-center py-6 bg-[#060e22] border border-slate-800 p3-diagonal-border relative overflow-hidden">
        {/* Progress Background bar */}
        <div
          className="absolute bottom-0 left-0 top-0 bg-[#ff2a5f]/10 transition-all duration-1000 -z-0"
          style={{ width: `${progressPercent}%` }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="text-5xl sm:text-6xl font-black font-mono tracking-wider text-[#f0f8ff] mb-2 drop-shadow-[0_0_20px_rgba(255,42,95,0.4)]">
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>CURRENT STATE:</span>
            <span
              className={`font-black ${
                mode === "work"
                  ? "text-[#ff2a5f]"
                  : mode === "shortBreak"
                  ? "text-[#00d2ff]"
                  : "text-[#10b981]"
              }`}
            >
              {mode === "work" ? "FOCUS BLOCK ACTIVE" : "REST INTERVAL"}
            </span>
          </div>
        </div>
      </div>

      {/* Control Actions & Session Badges */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
        {/* Session checkmarks */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-bold">COMPLETED SESSIONS:</span>
          <div className="flex items-center gap-1 text-base">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className={i < completedSessions ? "text-[#ff2a5f]" : "text-slate-700"}
                title={`Pomodoro Session ${i + 1}`}
              >
                🍅
              </span>
            ))}
            <span className="text-xs text-[#ffea00] font-bold ml-1">
              ({completedSessions} Total)
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleRunning}
            onMouseEnter={() => sound.playHover()}
            className={`px-5 py-2 border font-black uppercase flex items-center gap-1.5 transition-all ${
              isRunning
                ? "bg-[#ff2a5f] border-white text-white shadow-[0_0_15px_#ff2a5f]"
                : "bg-[#00d2ff] border-white text-[#030712] shadow-[0_0_15px_#00d2ff]"
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isRunning ? "PAUSE" : "START"}</span>
          </button>

          <button
            onClick={handleReset}
            onMouseEnter={() => sound.playHover()}
            className="p-2 bg-[#060e22] hover:bg-[#0a142e] border border-slate-700 text-slate-300"
            title="Reset Current Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleSkip}
            onMouseEnter={() => sound.playHover()}
            className="p-2 bg-[#060e22] hover:bg-[#0a142e] border border-slate-700 text-slate-300"
            title="Skip to Next Cycle"
          >
            <FastForward className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
