import { describe, it, expect } from "vitest";
import { filterProjects } from "@/lib/search-filter";
import { PROJECTS } from "@/data/portfolio-data";

describe("Project Search Filtering Engine", () => {
  it("returns all projects when search query is empty or whitespace", () => {
    expect(filterProjects(PROJECTS, "")).toHaveLength(PROJECTS.length);
    expect(filterProjects(PROJECTS, "   ")).toHaveLength(PROJECTS.length);
  });

  it("filters case-insensitively by project title", () => {
    const results = filterProjects(PROJECTS, "vaani");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((p) => p.id === "vaaniverse")).toBe(true);
  });

  it("filters case-insensitively by tech stack keyword", () => {
    const csharpResults = filterProjects(PROJECTS, "c#");
    expect(csharpResults.length).toBeGreaterThan(0);
    expect(csharpResults.every((p) => p.techStack.some((t) => t.toLowerCase().includes("c#")))).toBe(true);

    const dockerResults = filterProjects(PROJECTS, "DOCKER");
    expect(dockerResults.length).toBeGreaterThan(0);
  });

  it("filters by tagline or domain descriptors", () => {
    const signLanguageResults = filterProjects(PROJECTS, "sign language");
    expect(signLanguageResults.some((p) => p.id === "vaaniverse")).toBe(true);

    const jiraResults = filterProjects(PROJECTS, "ado.net");
    expect(jiraResults.some((p) => p.id === "jira-tracker")).toBe(true);

    const angularResults = filterProjects(PROJECTS, "angular");
    expect(angularResults.some((p) => p.id === "jira-tracker")).toBe(true);
  });

  it("returns empty array for unmatched random query", () => {
    const results = filterProjects(PROJECTS, "xyznonexistentquery9999");
    expect(results).toHaveLength(0);
  });
});
