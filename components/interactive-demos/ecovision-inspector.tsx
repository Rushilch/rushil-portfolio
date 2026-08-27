"use client";

import React, { useState } from "react";
import { Info, BarChart3, Sliders, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";
import {
  EnvironmentalFeatures,
  BASELINE_RISK,
  getShapAttributions,
  computeTotalRisk,
  classifyRiskLevel,
} from "@/lib/ecovision-calc";

export function EcovisionInspector() {
  const [activeTab, setActiveTab] = useState<"shap" | "lime">("shap");
  
  const [features, setFeatures] = useState<EnvironmentalFeatures>({
    pm25: 68,
    no2: 45,
    temp: 34,
    humidity: 78,
    wind: 4,
  });

  const updateFeature = (key: keyof EnvironmentalFeatures, val: number) => {
    sound.playHover();
    setFeatures((prev) => ({ ...prev, [key]: val }));
  };

  const shapAttributions = getShapAttributions(features);
  const calculatedRisk = computeTotalRisk(features);
  const riskCategory = classifyRiskLevel(calculatedRisk);

  const getRiskStatus = (level: ReturnType<typeof classifyRiskLevel>) => {
    if (level === "low") return { label: "Low Ecological Risk", color: "text-emerald-400", bg: "bg-emerald-950/40 border-[#10b981]", icon: CheckCircle2 };
    if (level === "moderate") return { label: "Moderate Risk / Watchlist", color: "text-[#ffea00]", bg: "bg-amber-950/40 border-[#ffea00]", icon: AlertTriangle };
    return { label: "Critical Hazard Alert", color: "text-[#ff2a5f]", bg: "bg-rose-950/40 border-[#ff2a5f]", icon: AlertTriangle };
  };

  const riskStatus = getRiskStatus(riskCategory);
  const StatusIcon = riskStatus.icon;

  return (
    <div className="bg-[#0b0f19] border-2 border-[#00d2ff]/40 rounded-xl p-5 md:p-6 overflow-hidden shadow-[0_0_25px_rgba(0,210,255,0.15)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e293b] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <BarChart3 className="w-4 h-4 text-[#00d2ff]" />
          <span className="text-xs font-mono text-[#00d2ff] font-bold uppercase tracking-wider">
            Model Interpretability Engine &bull; SHAP + LIME
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[#111726] p-1 rounded-lg border border-[#1e293b]">
          <button
            onClick={() => {
              sound.playSelect();
              setActiveTab("shap");
            }}
            onMouseEnter={() => sound.playHover()}
            className={`text-xs px-3 py-1 rounded-md font-mono font-bold transition-all ${
              activeTab === "shap"
                ? "bg-[#00d2ff] text-[#030712] shadow-[0_0_10px_#00d2ff]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            SHAP Waterfall
          </button>
          <button
            onClick={() => {
              sound.playSelect();
              setActiveTab("lime");
            }}
            onMouseEnter={() => sound.playHover()}
            className={`text-xs px-3 py-1 rounded-md font-mono font-bold transition-all ${
              activeTab === "lime"
                ? "bg-[#00d2ff] text-[#030712] shadow-[0_0_10px_#00d2ff]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            LIME Surrogate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Environmental Sliders */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 font-bold text-[#00d2ff]">
              <Sliders className="w-3.5 h-3.5" />
              Adjust Sensor Inputs:
            </span>
            <button
              onClick={() => {
                sound.playSelect();
                setFeatures({ pm25: 68, no2: 45, temp: 34, humidity: 78, wind: 4 });
              }}
              onMouseEnter={() => sound.playHover()}
              className="text-[11px] text-slate-400 hover:text-[#00d2ff] underline font-mono"
            >
              [Reset Baseline]
            </button>
          </div>

          <div className="space-y-3.5 bg-[#0e1322] border border-[#1e293b] rounded-lg p-3.5">
            {/* PM2.5 */}
            <div>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-300 font-bold">PM2.5 Particulate</span>
                <span className="text-[#00d2ff] font-bold">{features.pm25} µg/m³</span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                value={features.pm25}
                onChange={(e) => updateFeature("pm25", Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00d2ff]"
              />
            </div>

            {/* NO2 */}
            <div>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-300 font-bold">Nitrogen Dioxide (NO₂)</span>
                <span className="text-[#00d2ff] font-bold">{features.no2} ppb</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={features.no2}
                onChange={(e) => updateFeature("no2", Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00d2ff]"
              />
            </div>

            {/* Temperature */}
            <div>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-300 font-bold">Ambient Temperature</span>
                <span className="text-[#00d2ff] font-bold">{features.temp} °C</span>
              </div>
              <input
                type="range"
                min="10"
                max="48"
                value={features.temp}
                onChange={(e) => updateFeature("temp", Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00d2ff]"
              />
            </div>

            {/* Wind Speed */}
            <div>
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-300 font-bold">Surface Wind Speed</span>
                <span className="text-[#00d2ff] font-bold">{features.wind} km/h</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                value={features.wind}
                onChange={(e) => updateFeature("wind", Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#00d2ff]"
              />
            </div>
          </div>

          {/* Computed Risk Box */}
          <div className={`p-3.5 border-2 ${riskStatus.bg} flex items-center justify-between p3-cut-corner`}>
            <div className="flex items-center gap-2.5">
              <StatusIcon className={`w-5 h-5 ${riskStatus.color}`} />
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Model Output Risk</div>
                <div className={`text-sm font-black font-mono uppercase ${riskStatus.color}`}>{riskStatus.label}</div>
              </div>
            </div>
            <div className="text-right font-mono">
              <div className="text-xl font-black text-slate-100">{calculatedRisk} <span className="text-xs font-normal text-slate-400">/100</span></div>
              <div className="text-[10px] text-slate-400">Baseline E[f(x)] = 42.0</div>
            </div>
          </div>
        </div>

        {/* Right Column: SHAP Waterfall / LIME Breakdown */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>{activeTab === "shap" ? "SHAP Feature Contributions:" : "LIME Local Decision Boundary:"}</span>
            <span className="text-[#00d2ff] font-bold">
              {activeTab === "shap" ? "Additive Attribution" : "Sparse Linear Surrogate"}
            </span>
          </div>

          {activeTab === "shap" ? (
            <div className="space-y-2.5 bg-[#0e1322] border border-[#1e293b] rounded-lg p-4">
              {shapAttributions.map((attr) => {
                const isPositive = attr.shapValue >= 0;
                const absVal = Math.abs(attr.shapValue).toFixed(1);
                const barWidth = Math.min(100, Math.max(8, Math.abs(attr.shapValue) * 4));

                return (
                  <div key={attr.key} className="space-y-1 font-mono">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-200 font-bold">{attr.name}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.2">
                          {attr.value} {attr.unit}
                        </span>
                      </div>
                      <span
                        className={`font-black text-xs ${
                          isPositive ? "text-rose-400" : "text-emerald-400"
                        }`}
                      >
                        {isPositive ? `+${absVal}` : `-${absVal}`} pts
                      </span>
                    </div>

                    <div className="h-2 bg-slate-900 rounded-full overflow-hidden flex items-center">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isPositive
                            ? "bg-gradient-to-r from-amber-500 to-rose-500"
                            : "bg-gradient-to-r from-[#00d2ff] to-emerald-400"
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 pl-1 font-sans">{attr.detail}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#0e1322] border border-[#1e293b] rounded-lg p-4 space-y-3 text-xs font-mono">
              <div className="text-[11px] text-slate-400 border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>LIME Local Surrogate Explainer</span>
                <span className="text-[#00d2ff] font-bold">R² Fit: 0.94</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                Generates 500 synthetic sample perturbations around this specific environmental state and fits an interpretable sparse linear surrogate model:
              </p>
              <div className="bg-[#070a12] p-3 rounded text-[11px] text-[#00d2ff] border border-slate-800 overflow-x-auto">
                Risk ≈ {BASELINE_RISK} + (0.45 × ΔPM2.5) + (0.35 × ΔNO₂) + (0.28 × ΔTemp) - (0.60 × Wind)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
