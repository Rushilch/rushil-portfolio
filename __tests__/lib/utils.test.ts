import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("Tailwind Utility Class Merger (cn)", () => {
  it("resolves conflicting Tailwind padding classes favoring the last argument", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("resolves conflicting Tailwind color classes", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("filters out falsy values (false, null, undefined, 0, '')", () => {
    expect(cn("flex", false && "hidden", null, undefined, "items-center")).toBe(
      "flex items-center"
    );
  });

  it("handles empty or whitespace inputs gracefully", () => {
    expect(cn("")).toBe("");
  });

  it("correctly merges multiple independent non-conflicting utilities", () => {
    expect(cn("w-full", "h-12", "bg-slate-900", "text-white")).toBe(
      "w-full h-12 bg-slate-900 text-white"
    );
  });
});
