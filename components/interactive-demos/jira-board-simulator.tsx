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
  RotateCcw,
  Sparkles,
  Layers,
  User,
  BookOpen,
  Feather,
  Zap,
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

interface DemoUser {
  name: string;
  role: "Owner" | "Admin" | "Member";
  initials: string;
}

const DEMO_USERS: DemoUser[] = [
  { name: "Alex V.", role: "Owner", initials: "AV" },
  { name: "Sarah L.", role: "Admin", initials: "SL" },
  { name: "Marcus K.", role: "Member", initials: "MK" },
  { name: "Elena R.", role: "Member", initials: "ER" },
];

const INITIAL_ISSUES: JiraIssue[] = [
  {
    id: "ISS-101",
    key: "LEDGER-101",
    title: "Execute sp_GetBoardData multi-result retrieval in single roundtrip",
    status: "done",
    priority: "Urgent",
    assignee: "Alex V.",
    sprint: "Sprint 3",
    estimate: "5 SP",
    description: "Returns project metadata, active sprint, and column-grouped issues with zero ORM overhead.",
  },
  {
    id: "ISS-102",
    key: "LEDGER-102",
    title: "Angular 19 Signal-based CDK Drag-and-Drop with optimistic rollback",
    status: "review",
    priority: "High",
    assignee: "Sarah L.",
    sprint: "Sprint 3",
    estimate: "8 SP",
    description: "Optimistically updates UI ledger state; rollbacks state if backend API yields HTTP 4xx/5xx.",
  },
  {
    id: "ISS-103",
    key: "LEDGER-103",
    title: "Enforce strict SqlParameter bindings & connection pool (Min=5, Max=100)",
    status: "in-progress",
    priority: "High",
    assignee: "Marcus K.",
    sprint: "Sprint 3",
    estimate: "3 SP",
    description: "Guards against SQL injection and maintains sub-millisecond pooled connection acquisition.",
  },
  {
    id: "ISS-104",
    key: "LEDGER-104",
    title: "Sliding IMemoryCache invalidation on mutable sprint actions",
    status: "todo",
    priority: "Medium",
    assignee: "Elena R.",
    sprint: "Sprint 3",
    estimate: "3 SP",
    description: "Delivers ~1ms cached response time with immediate write-through invalidation on card drag.",
  },
  {
    id: "ISS-105",
    key: "LEDGER-105",
    title: "Auto-migrating DbInitializer & xUnit + Moq test coverage",
    status: "todo",
    priority: "Medium",
    assignee: "Alex V.",
    sprint: "Sprint 3",
    estimate: "2 SP",
    description: "Executes raw DDL seed scripts on startup and validates service-layer domain logic.",
  },
];

const COLUMNS: { id: IssueStatus; label: string; color: string; border: string; bg: string }[] = [
  { id: "todo", label: "To Do", color: "text-slate-300", border: "border-slate-700", bg: "bg-slate-900/40" },
  { id: "in-progress", label: "In Progress", color: "text-[#00d2ff]", border: "border-[#00d2ff]/50", bg: "bg-cyan-950/20" },
  { id: "review", label: "In Review", color: "text-[#ffea00]", border: "border-[#ffea00]/50", bg: "bg-amber-950/20" },
  { id: "done", label: "Done", color: "text-[#10b981]", border: "border-[#10b981]/50", bg: "bg-emerald-950/20" },
];

export function JiraBoardSimulator() {
  const [issues, setIssues] = useState<JiraIssue[]>(INITIAL_ISSUES);
  const [selectedIssue, setSelectedIssue] = useState<JiraIssue>(INITIAL_ISSUES[2]);
  const [activeUser, setActiveUser] = useState<DemoUser>(DEMO_USERS[0]);
  const [filterPriority, setFilterPriority] = useState<string>("All");
  const [isStationeryInking, setIsStationeryInking] = useState<boolean>(false);
  const [activeProcTab, setActiveProcTab] = useState<"board" | "sprint" | "dashboard">("board");

  const [lastExecutedSql, setLastExecutedSql] = useState<{
    proc: string;
    codeSnippet: string;
    executionTimeMs: number;
    cacheStatus: string;
  }>({
    proc: "sp_GetBoardData",
    codeSnippet: `// ASP.NET Core 10 (net10.0) • IssueRepository.cs (Pure ADO.NET)
using var connection = new SqlConnection(_connectionString);
await connection.OpenAsync();

using var cmd = new SqlCommand("sp_UpdateIssueStatus", connection) {
    CommandType = CommandType.StoredProcedure
};

// Strict SqlParameter Bindings (Zero SQLi)
cmd.Parameters.Add(new SqlParameter("@IssueId", SqlDbType.NVarChar, 50) { Value = "ISS-103" });
cmd.Parameters.Add(new SqlParameter("@Status", SqlDbType.NVarChar, 30) { Value = "InProgress" });
cmd.Parameters.Add(new SqlParameter("@UserId", SqlDbType.NVarChar, 50) { Value = "USR-001" });

await cmd.ExecuteNonQueryAsync();
_memoryCache.Remove($"board_data_{projectId}"); // Invalidate sliding cache`,
    executionTimeMs: 4.8,
    cacheStatus: "DIRECT SQL EXECUTION (4.8ms) • Cache Invalidation Dispatched",
  });

  const moveIssue = (issueId: string, nextStatus: IssueStatus) => {
    sound.playSelect();
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return;

    setIsStationeryInking(true);
    setTimeout(() => setIsStationeryInking(false), 900);

    const updated = issues.map((i) => (i.id === issueId ? { ...i, status: nextStatus } : i));
    setIssues(updated);
    setSelectedIssue({ ...issue, status: nextStatus });

    setLastExecutedSql({
      proc: "sp_UpdateIssueStatus",
      codeSnippet: `// ASP.NET Core 10 (net10.0) • IssueRepository.cs (Pure ADO.NET)
using var connection = new SqlConnection(_connectionString);
await connection.OpenAsync();
using var transaction = connection.BeginTransaction();

using var cmd = new SqlCommand("sp_UpdateIssueStatus", connection, transaction) {
    CommandType = CommandType.StoredProcedure
};

// Explicit Parameterized Bindings
cmd.Parameters.Add(new SqlParameter("@IssueId", SqlDbType.NVarChar, 50) { Value = "${issue.id}" });
cmd.Parameters.Add(new SqlParameter("@OldStatus", SqlDbType.NVarChar, 30) { Value = "${issue.status}" });
cmd.Parameters.Add(new SqlParameter("@NewStatus", SqlDbType.NVarChar, 30) { Value = "${nextStatus}" });
cmd.Parameters.Add(new SqlParameter("@ActorId", SqlDbType.NVarChar, 50) { Value = "${activeUser.name}" });

await cmd.ExecuteNonQueryAsync();
await transaction.CommitAsync();

// Invalidate sliding IMemoryCache for Project Board
_cache.Remove($"board_data_PROJ");`,
      executionTimeMs: Math.round((3.8 + Math.random() * 2.4) * 10) / 10,
      cacheStatus: "SQL SERVER TRANSACTION COMMITTED • Write-Through Cache Invalidated",
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

  const getProcCode = () => {
    switch (activeProcTab) {
      case "board":
        return `-- Stored Procedure: sp_GetBoardData (Single Roundtrip Multi-Result Set)
CREATE OR ALTER PROCEDURE sp_GetBoardData
    @ProjectId NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    -- Result 1: Project & Member Summary
    SELECT Id, Name, ProjectKey, OwnerId FROM Projects WHERE Id = @ProjectId;
    -- Result 2: Active Sprint Cadence
    SELECT TOP 1 * FROM Sprints WHERE ProjectId = @ProjectId AND Status = 'Active';
    -- Result 3: All Column-Grouped Issues with Assignee Avatars
    SELECT i.*, u.FullName AS AssigneeName, u.Role
    FROM Issues i
    LEFT JOIN Users u ON i.AssigneeId = u.Id
    WHERE i.ProjectId = @ProjectId
    ORDER BY i.OrdinalRank ASC;
END;`;
      case "sprint":
        return `-- Stored Procedure: sp_GetSprintSummary
CREATE OR ALTER PROCEDURE sp_GetSprintSummary
    @SprintId NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        COUNT(*) AS TotalIssues,
        SUM(CASE WHEN Status = 'Done' THEN 1 ELSE 0 END) AS CompletedIssues,
        SUM(StoryPoints) AS TotalStoryPoints,
        CAST(SUM(CASE WHEN Status = 'Done' THEN StoryPoints ELSE 0 END) * 100.0 / NULLIF(SUM(StoryPoints), 0) AS DECIMAL(5,2)) AS VelocityPercentage
    FROM Issues
    WHERE SprintId = @SprintId;
END;`;
      case "dashboard":
        return `// IMemoryCache Sliding Invalidation Layer (1ms response)
public async Task<BoardDataDto> GetBoardDataAsync(string projectId)
{
    string cacheKey = $"board_data_{projectId}";
    if (!_memoryCache.TryGetValue(cacheKey, out BoardDataDto board))
    {
        // ~5ms Direct ADO.NET SQL Server Stored Procedure Call
        board = await _issueRepository.FetchBoardDataFromSqlAsync(projectId);
        _memoryCache.Set(cacheKey, board, new MemoryCacheEntryOptions {
            SlidingExpiration = TimeSpan.FromMinutes(5)
        });
    }
    return board; // ~1ms cached delivery
}`;
    }
  };

  return (
    <div className="bg-[#030712] border-2 border-[#00d2ff]/40 p-4 sm:p-6 p3-cut-corner text-xs font-mono space-y-5">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-[#ffea00]" />
          <span className="font-bold text-[#f0f8ff] tracking-wide text-sm">
            JiraClone &bull; Editorial Journal &amp; Pure ADO.NET Engine
          </span>
          <span className="text-[10px] text-[#ffea00] border border-[#ffea00]/40 px-1.5 py-0.2 rounded bg-amber-950/30">
            Editorial Paper UI
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isStationeryInking && (
            <div className="flex items-center gap-1 text-[11px] bg-amber-500/20 text-[#ffea00] px-2.5 py-0.5 rounded border border-[#ffea00]/50 animate-pulse">
              <Feather className="w-3 h-3" />
              <span>✒️ Inking ledger...</span>
            </div>
          )}

          <span className="text-[10px] text-[#10b981] font-bold bg-[#060e22] px-2 py-0.5 border border-[#10b981]/40">
            ● .NET 10 Web API + Angular 19
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

      {/* Role Switcher & Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-[#060e22] p-2.5 border border-slate-800 items-center">
        {/* Left: Role Switcher */}
        <div className="md:col-span-6 flex items-center gap-2 flex-wrap">
          <span className="text-slate-400 font-bold text-[11px]">Active Persona:</span>
          {DEMO_USERS.map((u) => (
            <button
              key={u.name}
              onClick={() => {
                sound.playHover();
                setActiveUser(u);
              }}
              className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all flex items-center gap-1 ${
                activeUser.name === u.name
                  ? "bg-[#ffea00] text-[#030712] shadow-[0_0_10px_rgba(255,234,0,0.4)]"
                  : "bg-[#030712] text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full bg-slate-700 text-[8px] flex items-center justify-center font-bold">
                {u.initials}
              </span>
              <span>{u.name}</span>
              <span className="text-[9px] opacity-75">({u.role})</span>
            </button>
          ))}
        </div>

        {/* Right: Priority Filter */}
        <div className="md:col-span-6 flex items-center justify-start md:justify-end gap-1.5 flex-wrap">
          <span className="text-slate-400 text-[11px]">Filter:</span>
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
                          ? "border-[#ffea00] shadow-[0_0_15px_rgba(255,234,0,0.25)] scale-[1.02]"
                          : "border-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[10px] text-[#ffea00] font-bold">{issue.key}</span>
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

      {/* Lower Inspection Deck: Selected Issue Details + Live Stored Procedure / Cache Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Issue Meta & Editorial Notes */}
        <div className="lg:col-span-5 bg-[#060e22] border border-slate-800 p-4 rounded-lg space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[10px] text-[#ffea00] font-bold uppercase tracking-wider">
              Editorial Ledger Item
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
              <span className="text-slate-500">Assigned: </span>
              <span className="text-slate-300">{selectedIssue.assignee}</span>
            </div>
            <div>
              <span className="text-slate-500">Story Points: </span>
              <span className="text-[#00d2ff]">{selectedIssue.estimate}</span>
            </div>
          </div>
        </div>

        {/* Right: Pure ADO.NET & Stored Procedure Execution Terminal */}
        <div className="lg:col-span-7 bg-[#02050e] border-2 border-[#10b981]/50 p-4 rounded-lg space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
            {/* Stored Proc Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  sound.playHover();
                  setActiveProcTab("board");
                }}
                className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${
                  activeProcTab === "board"
                    ? "bg-[#10b981] text-[#030712]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                sp_GetBoardData
              </button>
              <button
                onClick={() => {
                  sound.playHover();
                  setActiveProcTab("sprint");
                }}
                className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${
                  activeProcTab === "sprint"
                    ? "bg-[#10b981] text-[#030712]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                sp_GetSprintSummary
              </button>
              <button
                onClick={() => {
                  sound.playHover();
                  setActiveProcTab("dashboard");
                }}
                className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${
                  activeProcTab === "dashboard"
                    ? "bg-[#10b981] text-[#030712]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                IMemoryCache (1ms)
              </button>
            </div>

            <span className="text-[10px] text-[#10b981] font-bold">
              ● Stored Proc Latency: ~5ms
            </span>
          </div>

          {/* Code block */}
          <pre className="text-[10.5px] font-mono text-slate-300 bg-[#060c1c] p-2.5 rounded border border-slate-800 overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-44">
            <code>{getProcCode()}</code>
          </pre>

          <div className="flex flex-wrap items-center justify-between text-[10px] pt-1 text-slate-400 gap-1">
            <span className="text-[#10b981] font-bold">
              ✔ {lastExecutedSql.cacheStatus}
            </span>
            <span className="text-slate-500">
              Connection Pool: Min=5, Max=100 &bull; net10.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
