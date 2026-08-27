"use client";

import React, { useState } from "react";
import { P3Header } from "@/components/p3/p3-header";
import { P3Hero } from "@/components/p3/p3-hero";
import { P3Projects } from "@/components/p3/p3-projects";
import { P3Skills } from "@/components/p3/p3-skills";
import { P3Learning } from "@/components/p3/p3-learning";
import { P3Education } from "@/components/p3/p3-education";
import { P3Contact } from "@/components/p3/p3-contact";
import { P3Modal } from "@/components/p3/p3-modal";
import { P3MoonParticles } from "@/components/p3/p3-moon-particles";
import { P3AudioController } from "@/components/p3/p3-audio-controller";
import { ResumeModal } from "@/components/resume-modal";
import { CommandPalette } from "@/components/command-palette";
import { Footer } from "@/components/footer";
import { PROJECTS } from "@/data/portfolio-data";
import { useKeyboardNav } from "@/hooks/use-keyboard-nav";

const SECTIONS = ["status", "projects", "skills", "learning", "education", "contact"];

export default function HomePage() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("status");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const selectedProject = activeProjectId
    ? PROJECTS.find((p) => p.id === activeProjectId) || null
    : null;

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Keyboard navigation hook for W A S D + 1-6 + M + T + R + Escape
  useKeyboardNav({
    sections: SECTIONS,
    activeSection,
    onNavigate: scrollToSection,
    onOpenResume: () => setIsResumeOpen(true),
    onOpenCommand: () => setIsCommandOpen(true),
    onCloseModals: () => {
      setActiveProjectId(null);
      setIsResumeOpen(false);
      setIsCommandOpen(false);
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-[#f0f8ff] selection:bg-[#00d2ff] selection:text-[#030712] relative">
      {/* Persona 3 Moonlit Light Beams & Diamond Particles Background */}
      <P3MoonParticles />

      {/* Persona 3 Styled Header with Keyboard HUD */}
      <P3Header
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommand={() => setIsCommandOpen(true)}
        activeSection={activeSection}
        onSelectSection={scrollToSection}
      />

      {/* Main Persona 3 Sections */}
      <main className="flex-grow">
        <P3Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onNavigate={scrollToSection}
        />

        <P3Projects
          onSelectProject={(projectId) => setActiveProjectId(projectId)}
        />

        <P3Skills
          onSelectProject={(projectId) => setActiveProjectId(projectId)}
        />

        <P3Learning />

        <P3Education />

        <P3Contact
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </main>

      {/* Floating Minimizable Persona 3 Audio Controller */}
      <P3AudioController />

      {/* Footer */}
      <Footer />

      {/* Case Study Modal */}
      <P3Modal
        project={selectedProject}
        onClose={() => setActiveProjectId(null)}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onSelectProject={(projectId) => setActiveProjectId(projectId)}
      />
    </div>
  );
}
