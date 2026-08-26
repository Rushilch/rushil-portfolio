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
import { ResumeModal } from "@/components/resume-modal";
import { CommandPalette } from "@/components/command-palette";
import { Footer } from "@/components/footer";
import { PROJECTS } from "@/data/portfolio-data";

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

  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-[#f0f8ff] selection:bg-[#00d2ff] selection:text-[#030712] relative">
      {/* Persona 3 Moonlit Light Beams & Diamond Particles Background */}
      <P3MoonParticles />

      {/* Persona 3 Styled Header with Quickshell Calendar HUD */}
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

      {/* Footer */}
      <Footer />

      {/* Persona 3 Mission Dossier Modal */}
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
