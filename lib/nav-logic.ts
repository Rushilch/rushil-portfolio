export function getNextSectionIndex(
  currentIndex: number,
  direction: "up" | "down",
  totalSections: number
): number {
  if (totalSections <= 0) return 0;
  const safeCurrent = currentIndex < 0 ? 0 : currentIndex;

  if (direction === "up") {
    return (safeCurrent - 1 + totalSections) % totalSections;
  } else {
    return (safeCurrent + 1) % totalSections;
  }
}

export function shouldIgnoreShortcut(
  activeTag: string | undefined,
  key: string
): boolean {
  if (!activeTag) return false;
  const tag = activeTag.toLowerCase();
  const isInputField = tag === "input" || tag === "textarea" || tag === "select";

  // Escape key should always work even when typing in input
  if (key === "Escape") {
    return false;
  }

  return isInputField;
}
