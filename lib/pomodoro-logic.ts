export type PomodoroMode = "work" | "shortBreak" | "longBreak";

export const MODE_DURATIONS: Record<PomodoroMode, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 20 * 60,
};

export function formatTime(seconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const m = Math.floor(safeSeconds / 60);
  const s = safeSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function getNextMode(currentMode: PomodoroMode): PomodoroMode {
  if (currentMode === "work") {
    return "shortBreak";
  }
  return "work";
}

export function computeProgress(totalDuration: number, timeLeft: number): number {
  if (totalDuration <= 0) return 0;
  const elapsed = totalDuration - Math.max(0, timeLeft);
  const percent = (elapsed / totalDuration) * 100;
  return Math.max(0, Math.min(100, Math.round(percent * 10) / 10));
}
