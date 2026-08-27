"use client";

import React, { useState } from "react";
import {
  Kanban,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  Database,
  Terminal,
  ShieldCheck,
  Plus,
  RotateCcw,
  Sparkles,
  Layers,
  User,
  Tag,
} from "lucide-react";
import { sound } from "@/lib/sound";

export type IssueStatus = "todo" | "in-progress" | "review" | "done";
export type IssuePriority = "Urgent" | "High" | "Medium" | "Low";

export interface JiraIssue {
  id: string;
  key: string;
  title: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string;
  sprint: string;
  estimate: string;
  description: string;
}

const INITIAL_ISSUES: JiraIssue[] = [
  {
    id: "ISS-101",
    key: "PROJ-101",
    title: "Implement ADO.NET SqlTransaction boundary for Sprint closure",
    status: "done",
    priority: "Urgent",
    assignee: "Rushil C.",
    sprint: "Sprint 3",
    estimate: "5 SP",
    description: "Ensure atomic transaction commit/rollback across active tasks when closing sprint.",
  },
  {
    id: "ISS-102",
    key: "PROJ-102",
    title: "Angular CDK Drag-and-Drop Kanban with optimistic rollback",
    status: "review",
    priority: "High",
    assignee: "Rushil C.",
    sprint: "Sprint 3",
    estimate: "8 SP",
    description: "Optimistically move issue card; rollback UI state if backend returns HTTP 4xx/5xx.",
  },
  {
    id: "ISS-103",
    key: "PROJ-103",
    title: "Enforce strict SqlParameter bindings on Issue Search API",
    status: "in-progress",
    priority: "High",
    assignee: "Rushil C.",
    sprint: "Sprint 3",
    estimate: "3 SP",
    description: "Guard against SQL injection vulnerabilities in dynamic multi-filter text search.",
  },
  {
    id: "ISS-104",
    key: "PROJ-104",
    title: "JWT HTTP Interceptor with RFC 7807 ProblemDetails handling",
    status: "todo",
    priority: "Medium",
    assignee: "Rushil C.",
    sprint: "Sprint 3",
    estimate: "3 SP",
    description: "Catch expired 401 tokens and format standardized backend validation error toasts.",
  },
  {
    id: "ISS-105",
    key: "PROJ-105",
    title: "Design SQL Server composite index on (ProjectId, Status, AssigneeId)",
    status: "todo",
    priority: "Medium",
    assignee: "Rushil C.",
    sprint: "Sprint 3",
    estimate: "2 SP",
    description: "Accelerate board filtering query execution plan under high concurrency.",
  },
];

const COLUMNS: { id: IssueStatus; label: string; color: string; border: string; bg: string }[] = [
  { id: "todo", label: "To Do", color: "text-slate-300", border: "border-slate-700", bg: "bg-slate-900/40" },
  { id: "in-progress", label: "In Progress", color: "text-[#00d2ff]", border: "border-[#00d2ff]/50", bg: "bg-cyan-950/20" },
  { id: "review", label: "Code Review", color: "text-[#ffea00]", border: "border-[#ffea00]/50", bg: "bg-amber-950/20" },
  { id: "done", label: "Done", color: "text-[#10b981]", border: "border-[#10b981]/50", bg: "bg-emerald-950/20" },
];

export function JiraBoardSimulator() {
  const [issues, setIssues] = useState<JiraIssue[]>(INITIAL_ISSUES);
  const [selectedIssue, setSelectedIssue] = useState<JiraIssue>(INITIAL_ISSUES[2]);
  const [filterPriority, setFilterPriority] = useState<string>("All");
  const [lastExecutedSql, setLastExecutedSql] = useState<{
    query: string;
    params: Record<string, unknown>;
    executionTimeMs: number;
    transactionStatus: string;
  }>({
    query: "UPDATE Issues SET Status = @Status, UpdatedAt = SYSUTCDATETIME() WHERE Id = @IssueId",
    params: { "@Status": "in-progress", "@IssueId": "ISS-103", "@UserId": "USR-401" },
    executionTimeMs: 4.2,
    transactionStatus: "COMMITTED (SqlTransaction)",
  });

  const moveIssue = (issueId: string, nextStatus: IssueStatus) => {
    sound.playSelect();
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return;

    const updated = issues.map((i) => (i.id === issueId ? { ...i, status: nextStatus } : i));
    setIssues(updated);
    setSelectedIssue({ ...issue, status: nextStatus });

    // Generate real-time ADO.NET SQL dispatch snapshot
    setLastExecutedSql({
      query: `BEGIN TRANSACTION;\n  UPDATE Issues SET Status = @Status, UpdatedAt = SYSUTCDATETIME() WHERE Id = @IssueId;\n  INSERT INTO IssueActivities (IssueId, UserId, Action, OldValue, NewValue)\n  VALUES (@IssueId, @UserId, 'StatusChanged', @OldStatus, @NewStatus);\nCOMMIT TRANSACTION;`,
      params: {
        "@IssueId": issue.id,
        "@Status": nextStatus,
        "@OldStatus": issue.status,
        "@NewStatus": nextStatus,
        "@UserId": "USR-401 (Rushil)",
      },
      executionTimeMs: Math.round((2.5 + Math.random() * 3) * 10) / 10,
      transactionStatus: "COMMITTED (SqlTransaction • 0ms ORM Overhead)",
    });
  };

  const handleReset = () => {
    sound.playCancel();
    setIssues(INITIAL_ISSUES);
    setSelectedIssue(INITIAL_ISSUES[2]);
  };

  const filteredIssues =
    filterPriority === "All"
      ? issues
      : issues.filter((i) => i.priority === filterPriority);

  const getPriorityBadge = (p: IssuePriority) => {
    switch (p) {
      case "Urgent":
        return "bg-rose-950/80 text-[#ff2a5f] border-[#ff2a5f]/60";
      case "High":
        return "bg-amber-950/80 text-[#ffea00] border-[#ffea00]/60";
      case "Medium":
        return "bg-cyan-950/80 text-[#00d2ff] border-[#00d2ff]/60";
      default:
        return "bg-slate-900 text-slate-400 border-slate-700";
    }
  };

  return (
    <div className="bg-[#030712] border-2 border-[#00d2ff]/40 p-4 sm:p-6 p3-cut-corner text-xs font-mono space-y-5">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <Kanban className="w-4 h-4 text-[#00d2ff]" />
          <span className="font-bold text-[#f0f8ff] tracking-wide text-sm">
            Angular 18+ &bull; Pure ADO.NET Kanban &amp; SQL Engine
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#10b981] font-bold bg-[#060e22] px-2 py-0.5 border border-[#10b981]/40">
            ● Backend: C# ASP.NET Core 8 Web API
          </span>
          <button
            onClick={handleReset}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 bg-[#060e22] border border-slate-800 rounded transition-colors"
            title="Reset Board State"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Filter & Sprint Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#060e22] p-2.5 border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-bold">Active Sprint:</span>
          <span className="bg-[#00d2ff]/20 text-[#00d2ff] px-2 py-0.5 rounded font-bold border border-[#00d2ff]/40">
            Sprint 3 (Current)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">Filter Priority:</span>
          {["All", "Urgent", "High", "Medium"].map((p) => (
            <button
              key={p}
              onClick={() => {
                sound.playHover();
                setFilterPriority(p);
              }}
              className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${
                filterPriority === p
                  ? "bg-[#00d2ff] text-[#030712]"
                  : "bg-[#030712] text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {COLUMNS.map((col) => {
          const colIssues = filteredIssues.filter((i) => i.status === col.id);

          return (
            <div
              key={col.id}
              className={`flex flex-col rounded-lg border ${col.border} ${col.bg} p-3 min-h-[260px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800">
                <span className={`font-bold ${col.color}`}>{col.label}</span>
                <span className="text-[10px] bg-[#030712] px-1.5 py-0.2 rounded font-bold text-slate-400 border border-slate-800">
                  {colIssues.length}
                </span>
              </div>

              {/* Issues List */}
              <div className="space-y-2 flex-1">
                {colIssues.map((issue) => {
                  const isSelected = selectedIssue.id === issue.id;

                  return (
                    <div
                      key={issue.id}
                      onClick={() => {
                        sound.playHover();
                        setSelectedIssue(issue);
                      }}
                      className={`p-2.5 bg-[#030712] rounded border text-left cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? "border-[#00d2ff] shadow-[0_0_15px_rgba(0,210,255,0.3)] scale-[1.02]"
                          : "border-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[10px] text-[#00d2ff] font-bold">{issue.key}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded border font-bold ${getPriorityBadge(
                            issue.priority
                          )}`}
                        >
                          {issue.priority}
                        </span>
                      </div>

                      <div className="text-xs text-slate-200 font-sans font-medium line-clamp-2 mb-2">
                        {issue.title}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-900">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-500" />
                          {issue.assignee}
                        </span>
                        <span className="text-slate-500">{issue.estimate}</span>
                      </div>

                      {/* Quick Move Buttons */}
                      <div className="flex items-center gap-1 mt-2 pt-1 border-t border-slate-900">
                        {col.id !== "todo" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const prevStatus: Record<IssueStatus, IssueStatus> = {
                                "in-progress": "todo",
                                review: "in-progress",
                                done: "review",
                                todo: "todo",
                              };
                              moveIssue(issue.id, prevStatus[col.id]);
                            }}
                            className="text-[9px] px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                            title="Move back"
                          >
                            &larr; Prev
                          </button>
                        )}
                        {col.id !== "done" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextStatus: Record<IssueStatus, IssueStatus> = {
                                todo: "in-progress",
                                "in-progress": "review",
                                review: "done",
                                done: "done",
                              };
                              moveIssue(issue.id, nextStatus[col.id]);
                            }}
                            className="text-[9px] px-1.5 py-0.5 bg-[#00d2ff]/20 hover:bg-[#00d2ff] hover:text-[#030712] text-[#00d2ff] border border-[#00d2ff]/40 rounded font-bold ml-auto transition-colors"
                            title="Advance status"
                          >
                            Next &rarr;
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lower Inspection Deck: Selected Issue Details + Live ADO.NET SQL Dispatch */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Issue Meta */}
        <div className="lg:col-span-5 bg-[#060e22] border border-slate-800 p-4 rounded-lg space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[10px] text-[#ffea00] font-bold uppercase tracking-wider">
              Selected Issue Inspector
            </span>
            <span className="text-xs text-[#00d2ff] font-bold">{selectedIssue.key}</span>
          </div>

          <div className="text-xs font-bold text-slate-200">{selectedIssue.title}</div>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
            {selectedIssue.description}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
            <div>
              <span className="text-slate-500">Status: </span>
              <span className="text-white font-bold">{selectedIssue.status.toUpperCase()}</span>
            </div>
            <div>
              <span className="text-slate-500">Priority: </span>
              <span className="text-[#ffea00] font-bold">{selectedIssue.priority}</span>
            </div>
            <div>
              <span className="text-slate-500">Assignee: </span>
              <span className="text-slate-300">{selectedIssue.assignee}</span>
            </div>
            <div>
              <span className="text-slate-500">Story Points: </span>
              <span className="text-[#00d2ff]">{selectedIssue.estimate}</span>
            </div>
          </div>
        </div>

        {/* Right: Pure ADO.NET Parameterized SQL Dispatch Terminal */}
        <div className="lg:col-span-7 bg-[#02050e] border-2 border-[#10b981]/50 p-4 rounded-lg space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#10b981]" />
              <span className="text-[11px] text-[#10b981] font-bold">
                Pure ADO.NET SQL Command Dispatcher (Zero-ORM)
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold">
              Latency: {lastExecutedSql.executionTimeMs}ms
            </span>
          </div>

          {/* Code block */}
          <pre className="text-[10.5px] font-mono text-slate-300 bg-[#060c1c] p-2.5 rounded border border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed">
            <code>{`// C# Backend: IssueRepository.cs (Pure ADO.NET)
using var connection = new SqlConnection(_connectionString);
await connection.OpenAsync();
using var transaction = connection.BeginTransaction();

using var cmd = new SqlCommand(
    @"${lastExecutedSql.query.replace(/\n/g, "\n      ")}",
    connection, transaction);

// Strict Parameter Binding (Anti-SQLi)
cmd.Parameters.Add("@IssueId", SqlDbType.NVarChar, 50).Value = "${selectedIssue.id}";
cmd.Parameters.Add("@Status", SqlDbType.NVarChar, 30).Value = "${selectedIssue.status}";
cmd.Parameters.Add("@UserId", SqlDbType.NVarChar, 50).Value = "USR-401";

await cmd.ExecuteNonQueryAsync();
await transaction.CommitAsync();`}</code>
          </pre>

          <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400">
            <span className="text-[#10b981] font-bold">
              ✔ {lastExecutedSql.transactionStatus}
            </span>
            <span className="text-slate-500">
              Direct SqlClient &bull; Strict Parameterization
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
