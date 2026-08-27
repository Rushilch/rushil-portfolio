import { describe, it, expect } from "vitest";
import { getNextSectionIndex, shouldIgnoreShortcut } from "@/lib/nav-logic";

describe("Keyboard Navigation Math & Shortcuts Guard", () => {
  describe("getNextSectionIndex", () => {
    it("wraps around to the last item when navigating up from index 0", () => {
      // 6 sections (0..5): from 0 up -> 5
      expect(getNextSectionIndex(0, "up", 6)).toBe(5);
    });

    it("wraps around to 0 when navigating down from the last index", () => {
      // 6 sections (0..5): from 5 down -> 0
      expect(getNextSectionIndex(5, "down", 6)).toBe(0);
    });

    it("increments normally when navigating down", () => {
      expect(getNextSectionIndex(2, "down", 6)).toBe(3);
    });

    it("decrements normally when navigating up", () => {
      expect(getNextSectionIndex(3, "up", 6)).toBe(2);
    });

    it("handles edge cases safely with 1 or 0 sections", () => {
      expect(getNextSectionIndex(0, "up", 1)).toBe(0);
      expect(getNextSectionIndex(0, "down", 0)).toBe(0);
    });
  });

  describe("shouldIgnoreShortcut", () => {
    it("ignores regular shortcuts when user is typing in an input field", () => {
      expect(shouldIgnoreShortcut("input", "w")).toBe(true);
      expect(shouldIgnoreShortcut("INPUT", "s")).toBe(true);
      expect(shouldIgnoreShortcut("textarea", "m")).toBe(true);
      expect(shouldIgnoreShortcut("select", "1")).toBe(true);
    });

    it("never ignores Escape even inside input elements", () => {
      expect(shouldIgnoreShortcut("input", "Escape")).toBe(false);
      expect(shouldIgnoreShortcut("textarea", "Escape")).toBe(false);
      expect(shouldIgnoreShortcut("select", "Escape")).toBe(false);
    });

    it("allows shortcuts on non-input DOM elements (div, body, button)", () => {
      expect(shouldIgnoreShortcut("div", "w")).toBe(false);
      expect(shouldIgnoreShortcut("body", "m")).toBe(false);
      expect(shouldIgnoreShortcut("button", "r")).toBe(false);
      expect(shouldIgnoreShortcut(undefined, "k")).toBe(false);
    });
  });
});
