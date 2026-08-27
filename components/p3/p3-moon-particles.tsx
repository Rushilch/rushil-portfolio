"use client";

import React, { useState } from "react";

const INITIAL_PARTICLES = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  size: (i % 6) + 4,
  delay: (i % 5) * 0.8,
  duration: (i % 4) * 2 + 6,
}));

export function P3MoonParticles() {
  const [particles] = useState(INITIAL_PARTICLES);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Tartarus Ambient Water Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#050e26] to-[#02050e] opacity-95" />
      
      {/* Persona 3 Halftone Dot Pattern */}
      <div className="absolute inset-0 p3-grid-pattern opacity-40" />

      {/* Moonlit Light Beams */}
      <div className="absolute -top-40 right-1/4 w-[500px] h-[700px] bg-gradient-to-b from-[#00d2ff]/10 via-[#004488]/5 to-transparent transform rotate-[-25deg] blur-[80px]" />
      <div className="absolute top-1/3 -left-20 w-[400px] h-[600px] bg-gradient-to-b from-[#00f0ff]/10 via-transparent to-transparent transform rotate-[35deg] blur-[100px]" />

      {/* Floating Diamond Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-[#00d2ff]/40 transform rotate-45 animate-pulse"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: "0 0 10px #00d2ff",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
