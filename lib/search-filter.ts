import { Project } from "@/types/portfolio";

export function filterProjects(projects: Project[], query: string): Project[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    return projects;
  }

  return projects.filter((p) => {
    const titleMatch = (p.title || "").toLowerCase().includes(trimmed);
    const techMatch = Array.isArray(p.techStack)
      ? p.techStack.some((t) => (t || "").toLowerCase().includes(trimmed))
      : false;
    const taglineMatch = (p.tagline || "").toLowerCase().includes(trimmed);
    const problemMatch = (p.problemStatement || "").toLowerCase().includes(trimmed);
    const solutionMatch = (p.solutionArchitecture || "").toLowerCase().includes(trimmed);

    return titleMatch || techMatch || taglineMatch || problemMatch || solutionMatch;
  });
}
