"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Tv,
  Radio,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Volume2,
  Maximize2,
  Terminal,
  Activity,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { VaaniversePipeline } from "../interactive-demos/vaaniverse-pipeline";
import { JiraBoardSimulator } from "../interactive-demos/jira-board-simulator";
import { EcovisionInspector } from "../interactive-demos/ecovision-inspector";
import { MailsenseSimulator } from "../interactive-demos/mailsense-simulator";
import { SchoolPortalTopology } from "../interactive-demos/school-portal-topology";
import { ProctoringDemo } from "../interactive-demos/proctoring-demo";
import { CarRentalSimulator } from "../interactive-demos/car-rental-simulator";
import { PomodoroSimulator } from "../interactive-demos/pomodoro-simulator";
import { MvvmDiagram } from "../interactive-demos/mvvm-diagram";

export interface BroadcastChannel {
  id: string;
  channelNumber: string;
  title: string;
  tagline: string;
  category: string;
  badgeColor: string;
  component: React.ReactNode;
}

const CHANNELS: BroadcastChannel[] = [
  {
    id: "vaaniverse",
    channelNumber: "CH 01",
    title: "VaaniVerse &bull; Real-Time ISL ↔ Speech Pipeline",
    tagline: "21 Hand Landmarks + Facial Offset Vectors &bull; <200ms Latency Target",
    category: "Applied ML / Vision",
    badgeColor: "bg-[#00d2ff] text-[#030712] border-[#00d2ff]",
    component: <VaaniversePipeline />,
  },
  {
    id: "jira-tracker",
    channelNumber: "CH 02",
    title: "JiraClone &bull; Editorial Journal & Pure ADO.NET SQL Engine",
    tagline: ".NET 10 Web API + Angular 19 CDK Kanban &bull; ~5ms Stored Procs & ~1ms Cache",
    category: "Enterprise Backend",
    badgeColor: "bg-[#ffea00] text-[#030712] border-[#ffea00]",
    component: <JiraBoardSimulator />,
  },
  {
    id: "ecovision",
    channelNumber: "CH 03",
    title: "EcoVision &bull; Explainable Environmental AI & SHAP Attributions",
    tagline: "Additive Shapley Feature Attributions & Risk Threshold Classifiers",
    category: "XAI / Data Science",
    badgeColor: "bg-[#10b981] text-[#030712] border-[#10b981]",
    component: <EcovisionInspector />,
  },
  {
    id: "smartinbox",
    channelNumber: "CH 04",
    title: "SmartInbox &bull; LLaMA 3.1 8B Groq API Email Triage",
    tagline: "Structured Output Parsing, Zero-Shot Classification & Auto-Drafting",
    category: "Generative AI & LLMs",
    badgeColor: "bg-[#a855f7] text-white border-[#a855f7]",
    component: <MailsenseSimulator />,
  },
  {
    id: "school-portal",
    channelNumber: "CH 05",
    title: "School Portal &bull; Multi-Container ASP.NET Core Architecture",
    tagline: "Docker Bridge Network, REST Dispatcher & Hierarchical RBAC Authorization",
    category: "Backend & Docker",
    badgeColor: "bg-[#6366f1] text-white border-[#6366f1]",
    component: <SchoolPortalTopology />,
  },
  {
    id: "exam-proctoring",
    channelNumber: "CH 06",
    title: "AI Exam Proctoring &bull; Computer Vision Gaze & Head Pose",
    tagline: "3D Perspective-n-Point Facial Mesh & Real-Time Malpractice Detection",
    category: "Computer Vision",
    badgeColor: "bg-[#ff2a5f] text-white border-[#ff2a5f]",
    component: <ProctoringDemo />,
  },
  {
    id: "car-rental",
    channelNumber: "CH 07",
    title: "Car Rental Engine &bull; Java 17 OOP Polymorphic Fleet",
    tagline: "Polymorphic Tariff Inheritance, Daily Insurance & Automated Tax Calculation",
    category: "Core OOP / Java",
    badgeColor: "bg-[#f59e0b] text-[#030712] border-[#f59e0b]",
    component: <CarRentalSimulator />,
  },
  {
    id: "pomodoro",
    channelNumber: "CH 08",
    title: "Pomodoro Simulator &bull; Python Tkinter State Machine",
    tagline: "25/5/20 Interval Progression & Non-Blocking Event-Driven Scheduler",
    category: "Python Desktop",
    badgeColor: "bg-[#ef4444] text-white border-[#ef4444]",
    component: <PomodoroSimulator />,
  },
  {
    id: "wpf-todo",
    channelNumber: "CH 09",
    title: "WPF Desktop &bull; MVVM RelayCommand Architecture",
    tagline: "Declarative XAML UI, Data Binding & Decoupled ViewModel State",
    category: "Desktop & .NET",
    badgeColor: "bg-[#38bdf8] text-[#030712] border-[#38bdf8]",
    component: <MvvmDiagram />,
  },
];

const AUTO_ROTATE_INTERVAL_MS = 14000; // 14s TV commercial rotation

export function P3BroadcastShowcase() {
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentChannel = CHANNELS[currentChannelIndex];

  const switchChannel = (index: number) => {
    sound.playMenuSwitch();
    const nextIndex = (index + CHANNELS.length) % CHANNELS.length;
    setCurrentChannelIndex(nextIndex);
    setProgress(0);
  };

  const handleNext = () => switchChannel(currentChannelIndex + 1);
  const handlePrev = () => switchChannel(currentChannelIndex - 1);

  const toggleAutoPlay = () => {
    sound.playSelect();
    setIsAutoPlaying((prev) => !prev);
    setProgress(0);
  };

  useEffect(() => {
    if (!isAutoPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(0);
      return;
    }

    const stepMs = 100;
    const increment = (stepMs / AUTO_ROTATE_INTERVAL_MS) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          switchChannel(currentChannelIndex + 1);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, currentChannelIndex]);

  return (
    <div className="max-w-6xl mx-auto space-y-3">
      {/* TV Header Deck & Channel Tuner */}
      <div className="bg-[#030712] border-2 border-[#00d2ff] p3-cut-corner-lg p-3 sm:p-4 shadow-[0_0_35px_rgba(0,210,255,0.3)]">
        {/* Top Broadcast Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3 font-mono text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[#ff2a5f] bg-[#060e22] px-2.5 py-1 border border-[#ff2a5f]/40 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#ff2a5f] animate-ping" />
              <span>LIVE BROADCAST &bull; TV DEMO</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-slate-400">
              <Tv className="w-3.5 h-3.5 text-[#00d2ff]" />
              <span>Signal: 1080p60 &bull; Interactive Commercial Deck</span>
            </div>
          </div>

          {/* Broadcast Controls (Auto-Play Commercial Mode + Channel Flippers) */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAutoPlay}
              onMouseEnter={() => sound.playHover()}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold border transition-all ${
                isAutoPlaying
                  ? "bg-[#ffea00] text-[#030712] border-white shadow-[0_0_15px_#ffea00]"
                  : "bg-[#060e22] text-slate-300 border-slate-700 hover:border-[#00d2ff]"
              }`}
              title="Toggle Auto-Rotating TV Ad Mode (14s cycles)"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Auto-Ad: ON</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Auto-Ad: OFF</span>
                </>
              )}
            </button>

            <div className="flex items-center bg-[#060e22] border border-slate-700 p-0.5">
              <button
                onClick={handlePrev}
                onMouseEnter={() => sound.playHover()}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Previous Channel"
                title="Previous Demo Channel"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 text-[11px] font-bold text-[#00d2ff]">
                {currentChannel.channelNumber} / 09
              </span>
              <button
                onClick={handleNext}
                onMouseEnter={() => sound.playHover()}
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Next Channel"
                title="Next Demo Channel"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Channel Banner & Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 font-mono">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] px-2 py-0.5 font-bold border rounded ${currentChannel.badgeColor}`}
              >
                {currentChannel.category}
              </span>
              <h2
                className="text-base sm:text-lg font-bold text-[#f0f8ff] tracking-wide font-sans"
                dangerouslySetInnerHTML={{ __html: currentChannel.title }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">{currentChannel.tagline}</p>
          </div>
        </div>

        {/* Auto-play progress bar (active when auto-ad mode is enabled) */}
        {isAutoPlaying && (
          <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden mb-3 border border-slate-800">
            <div
              className="bg-[#ffea00] h-full transition-all duration-100 ease-linear shadow-[0_0_8px_#ffea00]"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* TV Channel Button Selector Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5 pt-1 border-t border-slate-900">
          {CHANNELS.map((ch, idx) => {
            const isActive = idx === currentChannelIndex;

            return (
              <button
                key={ch.id}
                onClick={() => switchChannel(idx)}
                onMouseEnter={() => sound.playHover()}
                className={`p-1.5 text-center font-mono text-[10.5px] border transition-all duration-150 rounded ${
                  isActive
                    ? "bg-[#00d2ff] text-[#030712] border-white font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)] scale-[1.03]"
                    : "bg-[#060e22] text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200"
                }`}
              >
                <div className="font-bold text-[9px] opacity-80">{ch.channelNumber}</div>
                <div className="truncate font-bold mt-0.5">
                  {ch.title.split("&bull;")[0].trim()}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Channel Live Simulator Viewer */}
      <div className="relative">
        <div className="transition-all duration-200">{currentChannel.component}</div>
      </div>
    </div>
  );
}
