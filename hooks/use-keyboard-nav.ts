"use client";

import { useEffect } from "react";
import { sound } from "@/lib/sound";
import { getNextSectionIndex, shouldIgnoreShortcut } from "@/lib/nav-logic";

interface KeyboardNavOptions {
  sections: string[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenCommand: () => void;
  onCloseModals: () => void;
  onPreviousTab?: () => void;
  onNextTab?: () => void;
}

export function useKeyboardNav({
  sections,
  activeSection,
  onNavigate,
  onOpenResume,
  onOpenCommand,
  onCloseModals,
  onPreviousTab,
  onNextTab,
}: KeyboardNavOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;

      // Allow Escape even in inputs
      if (e.key === "Escape") {
        onCloseModals();
        return;
      }

      if (shouldIgnoreShortcut(activeTag, e.key)) return;

      const currentIndex = sections.indexOf(activeSection);

      // Section Navigation via W/S or Arrow Keys
      if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = getNextSectionIndex(currentIndex, "up", sections.length);
        sound.playMenuSwitch();
        onNavigate(sections[prevIndex]);
      } else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = getNextSectionIndex(currentIndex, "down", sections.length);
        sound.playMenuSwitch();
        onNavigate(sections[nextIndex]);
      } else if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
        if (onPreviousTab) {
          e.preventDefault();
          sound.playSelect();
          onPreviousTab();
        }
      } else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
        if (onNextTab) {
          e.preventDefault();
          sound.playSelect();
          onNextTab();
        }
      }

      // Direct section numbers: 1 to 6
      if (e.key >= "1" && e.key <= String(sections.length)) {
        e.preventDefault();
        const idx = parseInt(e.key, 10) - 1;
        if (sections[idx]) {
          sound.playMenuSwitch();
          onNavigate(sections[idx]);
        }
      }

      // Audio Hotkey: M -> Toggle BGM
      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        sound.bgm.toggleBgm();
      }

      // Audio Hotkey: T or X -> Toggle SFX
      if (e.key === "t" || e.key === "T" || e.key === "x" || e.key === "X") {
        e.preventDefault();
        sound.toggleSfx();
      }

      // Resume Hotkey: R
      if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        sound.playSelect();
        onOpenResume();
      }

      // Search Hotkey: K (without meta key)
      if ((e.key === "k" || e.key === "K") && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        sound.playSelect();
        onOpenCommand();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sections, activeSection, onNavigate, onOpenResume, onOpenCommand, onCloseModals, onPreviousTab, onNextTab]);
}
