"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, Zap, Crosshair, Sparkles, Hand, Layers, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";

interface LandmarkPoint {
  x: number;
  y: number;
}

interface GestureSample {
  id: string;
  name: string;
  hindiName: string;
  category: string;
  facialAnchor: "Mouth & Lips Anchor" | "Chin Base Anchor" | "Temple / Forehead Anchor" | "Chest Midline Anchor";
  confidence: number;
  translation: string;
  latencyMs: number;
  description: string;
  islRule: string;
  facialOffsetVec: string;
  facialAnchorPos: LandmarkPoint;
  landmarks: LandmarkPoint[];
}

const SAMPLE_GESTURES: GestureSample[] = [
  {
    id: "water",
    name: "Water / Drink",
    hindiName: "पानी (Paani)",
    category: "Daily Living",
    facialAnchor: "Mouth & Lips Anchor",
    confidence: 98.4,
    translation: "Water / I would like drinking water.",
    latencyMs: 138,
    description: "Cupped hand with thumb tilted toward lips/mouth, mimicking sipping water.",
    islRule: "In standard ISL, 'Water' is articulated by bringing the thumb/fingertips to the lips/mouth twice.",
    facialOffsetVec: "Δ(Hand - Mouth): [+0.12, -0.04, +0.03]",
    facialAnchorPos: { x: 50, y: 46 }, // Mouth
    landmarks: [
      { x: 64, y: 56 }, // 0: Wrist
      { x: 58, y: 52 }, { x: 55, y: 48 }, { x: 53, y: 46 }, { x: 51, y: 46 }, // 1-4: Thumb pointing to lips
      { x: 60, y: 46 }, { x: 57, y: 42 }, { x: 55, y: 38 }, { x: 53, y: 35 }, // 5-8: Index curved
      { x: 64, y: 44 }, { x: 62, y: 39 }, { x: 60, y: 35 }, { x: 58, y: 32 }, // 9-12: Middle curved
      { x: 68, y: 46 }, { x: 67, y: 41 }, { x: 65, y: 37 }, { x: 64, y: 34 }, // 13-16: Ring curved
      { x: 71, y: 49 }, { x: 71, y: 45 }, { x: 70, y: 41 }, { x: 69, y: 38 }, // 17-20: Pinky curved
    ],
  },
  {
    id: "thankyou",
    name: "Thank You",
    hindiName: "धन्यवाद / शुक्रिया",
    category: "Polite Discourse",
    facialAnchor: "Chin Base Anchor",
    confidence: 97.6,
    translation: "Thank you very much.",
    latencyMs: 145,
    description: "Flat open hand with fingertips touching the chin, then moving straight outward toward listener.",
    islRule: "In ISL, 'Thank You' originates from the chin base with flat extended fingers projecting forward.",
    facialOffsetVec: "Δ(Hand - Chin): [+0.01, +0.12, +0.18]",
    facialAnchorPos: { x: 50, y: 54 }, // Chin
    landmarks: [
      { x: 50, y: 74 }, // 0: Wrist
      { x: 43, y: 70 }, { x: 39, y: 65 }, { x: 37, y: 59 }, { x: 36, y: 54 }, // 1-4: Thumb
      { x: 47, y: 64 }, { x: 47, y: 57 }, { x: 48, y: 51 }, { x: 49, y: 46 }, // 5-8: Index at chin
      { x: 51, y: 64 }, { x: 51, y: 56 }, { x: 51, y: 50 }, { x: 51, y: 44 }, // 9-12: Middle at chin
      { x: 55, y: 65 }, { x: 55, y: 57 }, { x: 55, y: 51 }, { x: 54, y: 46 }, // 13-16: Ring at chin
      { x: 59, y: 67 }, { x: 59, y: 60 }, { x: 59, y: 54 }, { x: 58, y: 49 }, // 17-20: Pinky at chin
    ],
  },
  {
    id: "think",
    name: "Think / Understand",
    hindiName: "सोचना / समझना",
    category: "Cognitive State",
    facialAnchor: "Temple / Forehead Anchor",
    confidence: 96.9,
    translation: "I understand / I am thinking.",
    latencyMs: 152,
    description: "Index finger extended touching temple/forehead, with other 3 fingers curled into a fist.",
    islRule: "In ISL, cognitive concepts ('Think', 'Know', 'Remember') anchor specifically at the forehead or temple.",
    facialOffsetVec: "Δ(Hand - Temple): [+0.14, -0.18, +0.02]",
    facialAnchorPos: { x: 50, y: 22 }, // Forehead / Temple
    landmarks: [
      { x: 74, y: 42 }, // 0: Wrist
      { x: 69, y: 39 }, { x: 66, y: 36 }, { x: 65, y: 33 }, { x: 64, y: 30 }, // 1-4: Thumb folded
      { x: 68, y: 32 }, { x: 64, y: 26 }, { x: 60, y: 20 }, { x: 56, y: 16 }, // 5-8: Index extended to temple
      { x: 72, y: 34 }, { x: 73, y: 31 }, { x: 74, y: 34 }, { x: 74, y: 37 }, // 9-12: Middle curled
      { x: 75, y: 36 }, { x: 76, y: 33 }, { x: 77, y: 36 }, { x: 77, y: 39 }, // 13-16: Ring curled
      { x: 78, y: 39 }, { x: 79, y: 36 }, { x: 80, y: 39 }, { x: 80, y: 42 }, // 17-20: Pinky curled
    ],
  },
  {
    id: "namaste",
    name: "Namaste / Greeting",
    hindiName: "नमस्ते",
    category: "Formal Salutation",
    facialAnchor: "Chest Midline Anchor",
    confidence: 99.1,
    translation: "Namaste! Welcome.",
    latencyMs: 132,
    description: "Palms pressed together at chest level pointing vertically along the facial midline.",
    islRule: "In Indian culture and ISL, 'Namaste' is performed with joined palms aligned vertically on the chest plumb line.",
    facialOffsetVec: "Δ(Hand - Midline): [0.00, +0.30, -0.05]",
    facialAnchorPos: { x: 50, y: 54 }, // Plumb line from chin
    landmarks: [
      { x: 50, y: 92 }, // 0: Wrist
      { x: 44, y: 88 }, { x: 41, y: 83 }, { x: 39, y: 78 }, { x: 38, y: 73 }, // 1-4: Thumb vertical
      { x: 46, y: 80 }, { x: 46, y: 74 }, { x: 46, y: 68 }, { x: 47, y: 62 }, // 5-8: Index vertical
      { x: 50, y: 80 }, { x: 50, y: 73 }, { x: 50, y: 66 }, { x: 50, y: 60 }, // 9-12: Middle vertical
      { x: 54, y: 80 }, { x: 54, y: 74 }, { x: 54, y: 68 }, { x: 53, y: 62 }, // 13-16: Ring vertical
      { x: 58, y: 82 }, { x: 58, y: 76 }, { x: 58, y: 71 }, { x: 57, y: 66 }, // 17-20: Pinky vertical
    ],
  },
];

export function VaaniversePipeline() {
  const [selectedGesture, setSelectedGesture] = useState<GestureSample>(SAMPLE_GESTURES[0]);
  const [mode, setMode] = useState<"sign-to-speech" | "speech-to-sign">("sign-to-speech");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(true);
  const [speechText, setSpeechText] = useState<string>("Water / I need water");
  const [viewLayer, setViewLayer] = useState<"all" | "hand-only" | "facial-only">("all");

  useEffect(() => {
    if (!isProcessing) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 1400);
    return () => clearInterval(interval);
  }, [isProcessing]);

  // MediaPipe hand finger joint connectivity lines
  const fingerConnections = [
    [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
    [0, 5], [5, 6], [6, 7], [7, 8],       // Index
    [0, 9], [9, 10], [10, 11], [11, 12],  // Middle
    [0, 13], [13, 14], [14, 15], [15, 16],// Ring
    [0, 17], [17, 18], [18, 19], [19, 20],// Pinky
    [5, 9], [9, 13], [13, 17],            // Palm knuckle baseline
  ];

  const pipelineSteps = mode === "sign-to-speech" ? [
    {
      name: "Holistic 21 Hand + Facial Keypoints",
      tech: "MediaPipe Holistic (Nose/Lips/Chin + 21 Hand Pts)",
      detail: `Tracks 21 3D hand joints alongside facial reference anchors (${selectedGesture.facialAnchor}) at 30 FPS.`,
      time: "22ms",
    },
    {
      name: "Facial-Relative Vector Normalization",
      tech: "NumPy Spatial Vector Normalization",
      detail: `Calculates relative offset ${selectedGesture.facialOffsetVec} ensuring invariance across camera distances.`,
      time: "8ms",
    },
    {
      name: "ISL Spatial & Gesture Classifier",
      tech: "Scikit-Learn KNN / Random Forest",
      detail: `Classifies sign '${selectedGesture.name}' (${selectedGesture.hindiName}) with ${selectedGesture.confidence}% confidence in <15ms.`,
      time: "14ms",
    },
    {
      name: "Multilingual Audio Synthesis",
      tech: "gTTS + Real-Time Audio Stream",
      detail: `Synthesizes natural speech: "${selectedGesture.translation}" in <100ms.`,
      time: "94ms",
    },
  ] : [
    {
      name: "Audio Ingestion & VAD Stream",
      tech: "PyAudio Waveform Stream",
      detail: `Captured spoken utterance: "${speechText}"`,
      time: "45ms",
    },
    {
      name: "Speech-to-Text Transcription",
      tech: "Google Speech Recognizer",
      detail: "Transcribes audio waveform into raw linguistic tokens",
      time: "78ms",
    },
    {
      name: "ISL Grammar & Spatial Parser",
      tech: "ISL SOV Grammar Engine",
      detail: "Rearranges English syntax into Subject-Object-Verb with facial anchor target coordinates",
      time: "12ms",
    },
    {
      name: "3D Sign Avatar Keyframe Sequencer",
      tech: "Spatial Keyframe Dispatcher",
      detail: "Dispatches synchronized hand movement relative to avatar face keypoints",
      time: "44ms",
    },
  ];

  return (
    <div className="bg-[#060e22] border-2 border-[#00d2ff] p3-cut-corner p-5 md:p-6 overflow-hidden relative shadow-[0_0_35px_rgba(0,210,255,0.25)]">
      {/* Indian Sign Language Facial Reference Explanation Banner */}
      <div className="bg-[#030712] border-2 border-[#ffea00]/60 p-3 mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2.5 text-[#ffea00]">
          <Crosshair className="w-4 h-4 shrink-0 animate-pulse text-[#ffea00]" />
          <div>
            <strong className="text-white font-bold tracking-wide">
              Indian Sign Language (ISL) Grammar Rule:
            </strong>{" "}
            <span className="text-slate-300">
              Signs are defined by <strong className="text-[#10b981]">21-point hand articulation</strong> executed <strong className="text-[#00d2ff]">relative to facial anchors (Nose, Lips, Chin, Temple)</strong>.
            </span>
          </div>
        </div>

        {/* Layer Filters */}
        <div className="flex items-center gap-1 bg-[#060e22] p-1 border border-slate-800 shrink-0">
          <button
            onClick={() => {
              sound.playSelect();
              setViewLayer("all");
            }}
            className={`px-2.5 py-1 text-[11px] font-bold border transition-all ${
              viewLayer === "all"
                ? "bg-[#00d2ff] text-[#030712] border-white"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            Hand + Face
          </button>
          <button
            onClick={() => {
              sound.playSelect();
              setViewLayer("hand-only");
            }}
            className={`px-2.5 py-1 text-[11px] font-bold border transition-all ${
              viewLayer === "hand-only"
                ? "bg-[#10b981] text-[#030712] border-white"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            21 Hand Pts
          </button>
          <button
            onClick={() => {
              sound.playSelect();
              setViewLayer("facial-only");
            }}
            className={`px-2.5 py-1 text-[11px] font-bold border transition-all ${
              viewLayer === "facial-only"
                ? "bg-[#ffea00] text-[#030712] border-white"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            Facial Vectors
          </button>
        </div>
      </div>

      {/* Top Header & Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00d2ff] animate-ping" />
          <span className="text-xs font-mono text-[#00d2ff] font-bold tracking-wide">
            Live System Demo &bull; VaaniVerse Pipeline
          </span>
          <span className="text-[11px] font-mono text-slate-300 bg-[#030712] px-2 py-0.5 border border-slate-800">
            Latency Target: &lt;200ms
          </span>
        </div>

        <div className="flex items-center gap-1 bg-[#030712] p-1 border border-slate-800">
          <button
            onClick={() => {
              sound.playSelect();
              setMode("sign-to-speech");
            }}
            onMouseEnter={() => sound.playHover()}
            className={`text-xs px-3 py-1 font-mono font-bold transition-all ${
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
            className={`text-xs px-3 py-1 font-mono font-bold transition-all ${
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
        {/* Left Visualizer & Gesture Selector */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {mode === "sign-to-speech" ? (
            <>
              <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Verified ISL Lexicon Samples:</span>
                <span className="text-[#ffea00] font-bold">{selectedGesture.facialAnchor}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_GESTURES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      sound.playSelect();
                      setSelectedGesture(g);
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className={`text-left p-2.5 border text-xs transition-all font-mono ${
                      selectedGesture.id === g.id
                        ? "bg-[#030712] border-[#00d2ff] text-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.3)]"
                        : "bg-[#030712] border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                    }`}
                  >
                    <div className="font-black truncate">{g.name}</div>
                    <div className="text-[10px] text-[#ffea00] mt-0.5">{g.hindiName}</div>
                    <div className="text-[9px] text-slate-500 truncate mt-0.5">{g.facialAnchor.split(" ")[0]} Anchor</div>
                  </button>
                ))}
              </div>

              {/* Combined Hand Landmark Skeleton + Facial Anchor Canvas */}
              <div className="bg-[#030712] border-2 border-slate-800 rounded-lg p-3 relative h-64 flex items-center justify-center overflow-hidden">
                <div className="absolute top-2 left-2 text-[10px] font-mono text-[#00d2ff] bg-[#060e22] px-2 py-0.5 border border-[#00d2ff]/40">
                  MediaPipe 21 Hand Skeleton + Face Anchor
                </div>
                <div className="absolute top-2 right-2 text-[10px] font-mono text-[#10b981] font-bold">
                  Latency: {selectedGesture.latencyMs}ms
                </div>

                <svg viewBox="0 0 100 100" className="w-56 h-56 select-none">
                  {/* Facial Outline & Anchors */}
                  {viewLayer !== "hand-only" && (
                    <g>
                      {/* Subtle Face Contour */}
                      <ellipse cx="50" cy="38" rx="20" ry="24" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="2,2" />
                      {/* Eyes */}
                      <circle cx="43" cy="32" r="1.5" fill="#334155" />
                      <circle cx="57" cy="32" r="1.5" fill="#334155" />
                      
                      {/* Nose Anchor Point */}
                      <circle cx="50" cy="38" r="2.5" fill="#ffea00" className="animate-ping opacity-60" />
                      <circle cx="50" cy="38" r="2.5" fill="#ffea00" />
                      <text x="53" y="39" fill="#ffea00" fontSize="3" fontFamily="monospace" fontWeight="bold">NOSE</text>

                      {/* Lips / Mouth Anchor */}
                      <circle cx="50" cy="46" r="2" fill="#ff2a5f" />
                      <text x="53" y="47" fill="#ff2a5f" fontSize="3" fontFamily="monospace" fontWeight="bold">LIPS</text>

                      {/* Chin Anchor */}
                      <circle cx="50" cy="54" r="2" fill="#00d2ff" />
                      <text x="53" y="55" fill="#00d2ff" fontSize="3" fontFamily="monospace" fontWeight="bold">CHIN</text>

                      {/* Forehead / Temple Anchor */}
                      <circle cx="50" cy="22" r="2" fill="#a855f7" />
                      <text x="53" y="23" fill="#a855f7" fontSize="3" fontFamily="monospace" fontWeight="bold">TEMPLE</text>

                      {/* Chest Baseline */}
                      <line x1="20" y1="82" x2="80" y2="82" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />

                      {/* Spatial Relative Vector Ray from Facial Anchor to Hand Wrist */}
                      <line
                        x1={selectedGesture.facialAnchorPos.x}
                        y1={selectedGesture.facialAnchorPos.y}
                        x2={selectedGesture.landmarks[0].x}
                        y2={selectedGesture.landmarks[0].y}
                        stroke="#00d2ff"
                        strokeWidth="1.8"
                        strokeDasharray="2,2"
                      />
                      <circle
                        cx={selectedGesture.landmarks[0].x}
                        cy={selectedGesture.landmarks[0].y}
                        r="3.5"
                        fill="#00d2ff"
                        className="animate-pulse"
                      />
                    </g>
                  )}

                  {/* 21-Point Hand Landmark Skeleton & Bone Connections */}
                  {viewLayer !== "facial-only" && (
                    <g>
                      {/* Finger bone lines */}
                      {fingerConnections.map(([p1, p2], idx) => {
                        const pt1 = selectedGesture.landmarks[p1];
                        const pt2 = selectedGesture.landmarks[p2];
                        return (
                          <line
                            key={`bone-${idx}`}
                            x1={pt1.x}
                            y1={pt1.y}
                            x2={pt2.x}
                            y2={pt2.y}
                            stroke="#10b981"
                            strokeWidth="1.4"
                            strokeOpacity="0.85"
                          />
                        );
                      })}

                      {/* Palm Base Lines from Wrist (0) to Finger Roots */}
                      <line x1={selectedGesture.landmarks[0].x} y1={selectedGesture.landmarks[0].y} x2={selectedGesture.landmarks[1].x} y2={selectedGesture.landmarks[1].y} stroke="#00d2ff" strokeWidth="1.5" strokeOpacity="0.6" />
                      <line x1={selectedGesture.landmarks[0].x} y1={selectedGesture.landmarks[0].y} x2={selectedGesture.landmarks[5].x} y2={selectedGesture.landmarks[5].y} stroke="#00d2ff" strokeWidth="1.5" strokeOpacity="0.6" />
                      <line x1={selectedGesture.landmarks[0].x} y1={selectedGesture.landmarks[0].y} x2={selectedGesture.landmarks[9].x} y2={selectedGesture.landmarks[9].y} stroke="#00d2ff" strokeWidth="1.5" strokeOpacity="0.6" />
                      <line x1={selectedGesture.landmarks[0].x} y1={selectedGesture.landmarks[0].y} x2={selectedGesture.landmarks[13].x} y2={selectedGesture.landmarks[13].y} stroke="#00d2ff" strokeWidth="1.5" strokeOpacity="0.6" />
                      <line x1={selectedGesture.landmarks[0].x} y1={selectedGesture.landmarks[0].y} x2={selectedGesture.landmarks[17].x} y2={selectedGesture.landmarks[17].y} stroke="#00d2ff" strokeWidth="1.5" strokeOpacity="0.6" />

                      {/* 21 Landmark Nodes */}
                      {selectedGesture.landmarks.map((pt, idx) => (
                        <circle
                          key={`node-${idx}`}
                          cx={pt.x}
                          cy={pt.y}
                          r={idx === 0 ? "3" : [4, 8, 12, 16, 20].includes(idx) ? "2.4" : "1.8"}
                          fill={idx === 0 ? "#00d2ff" : [4, 8, 12, 16, 20].includes(idx) ? "#ffea00" : "#10b981"}
                          className="transition-all duration-300"
                        />
                      ))}
                    </g>
                  )}
                </svg>

                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-slate-300 bg-[#060e22]/95 px-2.5 py-1 border border-slate-800 font-mono">
                  <span className="truncate text-[#00d2ff] font-bold">{selectedGesture.facialOffsetVec}</span>
                  <span className="text-slate-400">21 Hand Pts + Δ Face Offset</span>
                </div>
              </div>

              {/* Sign rule description */}
              <div className="text-[11px] font-mono text-slate-300 bg-[#030712] p-2.5 border border-slate-800">
                <span className="text-[#ffea00] font-bold">ISL RULE: </span>
                {selectedGesture.islRule}
              </div>
            </>
          ) : (
            <>
              <div className="text-xs font-mono text-slate-400">ENTER SPOKEN PHRASE FOR ISL PARSER:</div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={speechText}
                  onChange={(e) => setSpeechText(e.target.value)}
                  className="bg-[#030712] border border-slate-700 text-slate-100 text-xs px-3 py-2 flex-1 focus:outline-none focus:border-[#00d2ff] font-mono"
                  placeholder="Enter sentence in English..."
                />
              </div>

              {/* Audio Waveform */}
              <div className="bg-[#030712] border-2 border-slate-800 rounded-lg p-4 h-64 flex flex-col items-center justify-center relative font-mono">
                <div className="absolute top-2 left-2 text-[10px] text-slate-400">
                  Audio Ingestion &amp; VAD Stream
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
                <div className="text-xs text-[#00d2ff] mt-3 font-bold">
                  16 kHz Sample Rate &bull; SOV Grammar Parser Active
                </div>
              </div>
            </>
          )}

          {/* Controls Bar */}
          <div className="flex items-center justify-between bg-[#030712] p-2.5 border border-slate-800 text-xs font-mono">
            <button
              onClick={() => {
                sound.playSelect();
                setIsProcessing(!isProcessing);
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 text-[#00d2ff] hover:text-white font-black px-2 py-1"
            >
              {isProcessing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isProcessing ? "PAUSE PIPELINE" : "RESUME PIPELINE"}</span>
            </button>
            <div className="text-[#10b981] font-bold text-[11px] flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#10b981]" />
              Sub-200ms Latency Budget Met
            </div>
          </div>
        </div>

        {/* Right Pipeline Architecture Flow */}
        <div className="lg:col-span-7 flex flex-col gap-3 font-mono">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>PIPELINE EXECUTION PHASES:</span>
            <span className="text-[#00d2ff] font-bold">Real-time Inference</span>
          </div>

          <div className="space-y-2.5">
            {pipelineSteps.map((step, index) => {
              const isActive = activeStep === index;
              const isPast = activeStep > index;

              return (
                <div
                  key={index}
                  className={`p-3.5 border transition-all ${
                    isActive
                      ? "bg-[#030712] border-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.3)]"
                      : isPast
                      ? "bg-[#030712]/80 border-slate-800 text-slate-300"
                      : "bg-[#030712]/40 border-slate-900 text-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 font-black ${
                          isActive
                            ? "bg-[#00d2ff] text-[#030712]"
                            : isPast
                            ? "bg-emerald-500/20 text-[#10b981] border border-[#10b981]/40"
                            : "bg-slate-900 text-slate-500"
                        }`}
                      >
                        PHASE 0{index + 1}
                      </span>
                      <span className="text-xs font-black text-[#f0f8ff] uppercase">{step.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 bg-[#060e22] px-2 py-0.5 border border-slate-800">
                        {step.tech}
                      </span>
                      <span
                        className={`text-xs font-bold ${
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
          <div className="mt-2 bg-[#030712] border-2 border-[#00d2ff] p3-cut-corner p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-[#00d2ff] text-[#030712] font-black">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-[#00d2ff] uppercase tracking-wider font-bold">
                  {mode === "sign-to-speech" ? "SYNTHESIZED SPEECH OUTPUT" : "GENERATED ISL SIGN AVATAR SEQUENCE"}
                </div>
                <div className="text-xs font-black text-[#f0f8ff]">
                  {mode === "sign-to-speech" ? `"${selectedGesture.translation}"` : `[Avatar SOV Sequence: ${speechText}]`}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400">TOTAL LATENCY</div>
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
