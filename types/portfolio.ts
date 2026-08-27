export type ProjectCategory = "all" | "ml-cv" | "backend-systems" | "desktop-tools";

export interface ProjectMetric {
  label: string;
  value: string;
  detail: string;
}

export interface ProjectArchNode {
  step: string;
  title: string;
  tech: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  categoryLabel: string;
  status: "Completed" | "In Active Development" | "Research & Prototype";
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  role: string;
  problemStatement: string;
  keyChallenge: string;
  solutionArchitecture: string;
  pipelineSteps: ProjectArchNode[];
  techStack: string[];
  highlights: string[];
  metrics?: ProjectMetric[];
  interactiveType: "pipeline" | "shap" | "topology" | "cv-proctor" | "mvvm" | "llm-triage" | "car-rental" | "pomodoro";
}

export interface SkillItem {
  name: string;
  category: "Languages" | "Backend & Systems" | "ML & Data Science" | "Desktop & Tools";
  level: "Proficient" | "Working Knowledge" | "Actively Deepening";
  projects: string[]; // Project IDs where used
  description: string;
  iconName?: string;
}

export interface LearningItem {
  topic: string;
  category: string;
  progress: number;
  status: "In Progress" | "Deepening" | "Exploring";
  description: string;
  focusAreas: string[];
  keyResources: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  specialization?: string;
  period: string;
  score: string;
  scoreLabel: string;
  location: string;
  coursework: string[];
  highlights: string[];
}
