import { describe, it, expect } from "vitest";
import {
  getNextStatus,
  getPrevStatus,
  filterIssuesByPriority,
  calculateSprintMetrics,
  JiraIssueItem,
} from "@/lib/jira-logic";

describe("JiraClone Kanban State Machine & Velocity Aggregator", () => {
  describe("Status Transitions (getNextStatus / getPrevStatus)", () => {
    it("advances status progressively: ToDo -> InProgress -> Review -> Done", () => {
      expect(getNextStatus("todo")).toBe("in-progress");
      expect(getNextStatus("in-progress")).toBe("review");
      expect(getNextStatus("review")).toBe("done");
      expect(getNextStatus("done")).toBe("done"); // terminal state stays done
    });

    it("reverts status backward: Done -> Review -> InProgress -> ToDo", () => {
      expect(getPrevStatus("done")).toBe("review");
      expect(getPrevStatus("review")).toBe("in-progress");
      expect(getPrevStatus("in-progress")).toBe("todo");
      expect(getPrevStatus("todo")).toBe("todo"); // initial state stays todo
    });
  });

  describe("Priority Filtering (filterIssuesByPriority)", () => {
    const sampleIssues: JiraIssueItem[] = [
      { id: "1", key: "P-1", title: "Task 1", status: "todo", priority: "Urgent", assignee: "Alex", sprint: "S1", storyPoints: 5 },
      { id: "2", key: "P-2", title: "Task 2", status: "in-progress", priority: "High", assignee: "Sarah", sprint: "S1", storyPoints: 3 },
      { id: "3", key: "P-3", title: "Task 3", status: "done", priority: "Urgent", assignee: "Marcus", sprint: "S1", storyPoints: 8 },
      { id: "4", key: "P-4", title: "Task 4", status: "review", priority: "Medium", assignee: "Elena", sprint: "S1", storyPoints: 2 },
    ];

    it("returns all issues when filter is 'All' or empty", () => {
      expect(filterIssuesByPriority(sampleIssues, "All")).toHaveLength(4);
      expect(filterIssuesByPriority(sampleIssues, "")).toHaveLength(4);
    });

    it("filters accurately for 'Urgent' priority", () => {
      const urgent = filterIssuesByPriority(sampleIssues, "Urgent");
      expect(urgent).toHaveLength(2);
      expect(urgent.every((i) => i.priority === "Urgent")).toBe(true);
    });

    it("filters accurately for 'High' priority", () => {
      const high = filterIssuesByPriority(sampleIssues, "High");
      expect(high).toHaveLength(1);
      expect(high[0].key).toBe("P-2");
    });
  });

  describe("Sprint Velocity & Metrics Calculation (calculateSprintMetrics)", () => {
    it("computes exact story points, completion count, and velocity percentage", () => {
      const sprintIssues: JiraIssueItem[] = [
        { id: "1", key: "P-1", title: "Task 1", status: "done", priority: "Urgent", assignee: "Alex", sprint: "S1", storyPoints: 5 },
        { id: "2", key: "P-2", title: "Task 2", status: "done", priority: "High", assignee: "Sarah", sprint: "S1", storyPoints: 3 },
        { id: "3", key: "P-3", title: "Task 3", status: "in-progress", priority: "Medium", assignee: "Marcus", sprint: "S1", storyPoints: 2 },
      ];
      // Total points: 5 + 3 + 2 = 10
      // Completed points: 5 + 3 = 8
      // Velocity: (8 / 10) * 100 = 80.0%
      const metrics = calculateSprintMetrics(sprintIssues);

      expect(metrics.totalIssues).toBe(3);
      expect(metrics.completedIssues).toBe(2);
      expect(metrics.totalStoryPoints).toBe(10);
      expect(metrics.completedStoryPoints).toBe(8);
      expect(metrics.velocityPercentage).toBe(80);
    });

    it("handles empty sprint backlog safely with 0% velocity", () => {
      const metrics = calculateSprintMetrics([]);
      expect(metrics.totalIssues).toBe(0);
      expect(metrics.completedIssues).toBe(0);
      expect(metrics.totalStoryPoints).toBe(0);
      expect(metrics.completedStoryPoints).toBe(0);
      expect(metrics.velocityPercentage).toBe(0);
    });

    it("handles 100% completion when all tasks are marked Done", () => {
      const allDone: JiraIssueItem[] = [
        { id: "1", key: "P-1", title: "Task 1", status: "done", priority: "Low", assignee: "Alex", sprint: "S1", storyPoints: 5 },
        { id: "2", key: "P-2", title: "Task 2", status: "done", priority: "Low", assignee: "Sarah", sprint: "S1", storyPoints: 5 },
      ];
      const metrics = calculateSprintMetrics(allDone);
      expect(metrics.velocityPercentage).toBe(100);
    });
  });
});
