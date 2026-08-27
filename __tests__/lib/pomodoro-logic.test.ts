import { describe, it, expect } from "vitest";
import {
  formatTime,
  getNextMode,
  computeProgress,
  MODE_DURATIONS,
} from "@/lib/pomodoro-logic";

describe("Pomodoro State Machine & Time Utilities", () => {
  describe("formatTime", () => {
    it("formats standard work session duration (1500s) as 25:00", () => {
      expect(formatTime(1500)).toBe("25:00");
    });

    it("formats short break duration (300s) as 05:00", () => {
      expect(formatTime(300)).toBe("05:00");
    });

    it("formats single digits with leading zeros (e.g. 65s as 01:05)", () => {
      expect(formatTime(65)).toBe("01:05");
      expect(formatTime(9)).toBe("00:09");
      expect(formatTime(0)).toBe("00:00");
    });

    it("handles negative seconds safely as 00:00", () => {
      expect(formatTime(-10)).toBe("00:00");
    });
  });

  describe("getNextMode", () => {
    it("transitions from work to shortBreak", () => {
      expect(getNextMode("work")).toBe("shortBreak");
    });

    it("transitions from shortBreak to work", () => {
      expect(getNextMode("shortBreak")).toBe("work");
    });

    it("transitions from longBreak to work", () => {
      expect(getNextMode("longBreak")).toBe("work");
    });
  });

  describe("computeProgress", () => {
    it("computes 0% progress at start of session", () => {
      expect(computeProgress(1500, 1500)).toBe(0);
    });

    it("computes 50% progress at midpoint", () => {
      expect(computeProgress(1500, 750)).toBe(50);
    });

    it("computes 100% progress at timer expiry", () => {
      expect(computeProgress(1500, 0)).toBe(100);
    });

    it("clamps progress between 0 and 100 on abnormal inputs", () => {
      expect(computeProgress(1500, 2000)).toBe(0);
      expect(computeProgress(1500, -50)).toBe(100);
      expect(computeProgress(0, 0)).toBe(0);
    });
  });

  describe("MODE_DURATIONS", () => {
    it("has standard 25/5/20 minute durations in seconds", () => {
      expect(MODE_DURATIONS.work).toBe(25 * 60);
      expect(MODE_DURATIONS.shortBreak).toBe(5 * 60);
      expect(MODE_DURATIONS.longBreak).toBe(20 * 60);
    });
  });
});
