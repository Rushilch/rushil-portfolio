export type IssueStatus = "todo" | "in-progress" | "review" | "done";
export type IssuePriority = "Urgent" | "High" | "Medium" | "Low";

export interface JiraIssueItem {
  id: string;
  key: string;
  title: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string;
  sprint: string;
  storyPoints: number;
}

export function getNextStatus(current: IssueStatus): IssueStatus {
  switch (current) {
    case "todo":
      return "in-progress";
    case "in-progress":
      return "review";
    case "review":
      return "done";
    case "done":
      return "done";
  }
}

export function getPrevStatus(current: IssueStatus): IssueStatus {
  switch (current) {
    case "done":
      return "review";
    case "review":
      return "in-progress";
    case "in-progress":
      return "todo";
    case "todo":
      return "todo";
  }
}

export function filterIssuesByPriority(
  issues: JiraIssueItem[],
  priorityFilter: string
): JiraIssueItem[] {
  if (!priorityFilter || priorityFilter === "All") {
    return issues;
  }
  return issues.filter((i) => i.priority === priorityFilter);
}

export function calculateSprintMetrics(issues: JiraIssueItem[]): {
  totalIssues: number;
  completedIssues: number;
  totalStoryPoints: number;
  completedStoryPoints: number;
  velocityPercentage: number;
} {
  const totalIssues = issues.length;
  if (totalIssues === 0) {
    return {
      totalIssues: 0,
      completedIssues: 0,
      totalStoryPoints: 0,
      completedStoryPoints: 0,
      velocityPercentage: 0,
    };
  }

  const completedIssues = issues.filter((i) => i.status === "done").length;
  const totalStoryPoints = issues.reduce((acc, i) => acc + (i.storyPoints || 0), 0);
  const completedStoryPoints = issues
    .filter((i) => i.status === "done")
    .reduce((acc, i) => acc + (i.storyPoints || 0), 0);

  const velocityPercentage =
    totalStoryPoints > 0
      ? Math.round((completedStoryPoints / totalStoryPoints) * 1000) / 10
      : 0;

  return {
    totalIssues,
    completedIssues,
    totalStoryPoints,
    completedStoryPoints,
    velocityPercentage,
  };
}
