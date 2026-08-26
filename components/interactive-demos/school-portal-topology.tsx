"use client";

import React, { useState } from "react";
import { Server, Database, Container, KeyRound, Play, CheckCircle2, ShieldAlert, Cpu } from "lucide-react";
import { sound } from "@/lib/sound";

interface EndpointDemo {
  method: "GET" | "POST" | "PUT";
  path: string;
  authRequired: boolean;
  role: "Admin" | "Teacher" | "Student" | "Public";
  requestBody?: string;
  responseStatus: number;
  responsePayload: string;
}

const ENDPOINTS: EndpointDemo[] = [
  {
    method: "GET",
    path: "/api/v1/students/enrollments",
    authRequired: true,
    role: "Teacher",
    responseStatus: 200,
    responsePayload: JSON.stringify(
      {
        courseId: "CS-402",
        courseName: "Distributed Systems & Cloud Computing",
        totalEnrolled: 48,
        activeBatches: ["Batch-A", "Batch-B"],
        status: "Active",
      },
      null,
      2
    ),
  },
  {
    method: "POST",
    path: "/api/v1/grades/publish",
    authRequired: true,
    role: "Teacher",
    requestBody: JSON.stringify(
      {
        studentId: "STU-9402",
        assignmentId: "LAB-04",
        score: 94.5,
        maxScore: 100,
      },
      null,
      2
    ),
    responseStatus: 201,
    responsePayload: JSON.stringify(
      {
        gradeRecordId: "GRD-8821",
        studentId: "STU-9402",
        status: "CommittedToDatabase",
        transactionId: "TX-99014",
      },
      null,
      2
    ),
  },
  {
    method: "GET",
    path: "/api/v1/admin/audit-logs",
    authRequired: true,
    role: "Admin",
    responseStatus: 200,
    responsePayload: JSON.stringify(
      {
        totalEvents: 1420,
        lastSecurityScan: "2026-08-26T16:45:00Z",
        activeContainers: ["school-portal-api", "sqlserver-db", "redis-cache"],
        dbReplicationLagMs: 1.4,
      },
      null,
      2
    ),
  },
];

export function SchoolPortalTopology() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<EndpointDemo>(ENDPOINTS[0]);
  const [activeRole, setActiveRole] = useState<"Admin" | "Teacher" | "Student">("Teacher");
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<string | null>(null);

  const executeApi = () => {
    sound.playSelect();
    setIsExecuting(true);
    setExecutionResult(null);

    setTimeout(() => {
      setIsExecuting(false);
      if (selectedEndpoint.role === "Admin" && activeRole !== "Admin") {
        sound.playCancel();
        setExecutionResult("403 Forbidden: Identity role 'Admin' required for this endpoint.");
      } else {
        sound.playSelect();
        setExecutionResult(selectedEndpoint.responsePayload);
      }
    }, 450);
  };

  return (
    <div className="bg-[#0b0f19] border-2 border-[#00d2ff]/40 rounded-xl p-5 md:p-6 overflow-hidden shadow-[0_0_25px_rgba(0,210,255,0.15)]">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e293b] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <Server className="w-4 h-4 text-[#00d2ff]" />
          <span className="text-xs font-mono text-[#00d2ff] font-bold uppercase tracking-wider">
            Multi-Service Architecture &bull; ASP.NET Core + Docker
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Container className="w-3.5 h-3.5 text-[#00d2ff]" />
          <span>Docker Bridge: 172.24.0.0/16</span>
        </div>
      </div>

      {/* Architecture Node Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {/* Node 1: Client Gateway */}
        <div className="bg-[#0e1322] border-2 border-slate-800 p3-cut-corner p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-[10px] text-[#00d2ff] bg-[#030712] px-2 py-0.5 border border-[#00d2ff]/40 font-bold">
                Container 01
              </span>
              <span className="text-slate-500 text-[10px] font-mono">Port 8080:80</span>
            </div>
            <div className="font-bold text-[#f0f8ff] text-xs font-mono">ASP.NET Core Web API</div>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">
              Controller routing, dependency injection, validation middleware &amp; EF Core.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center gap-1 text-[10px] font-mono text-[#10b981]">
            <CheckCircle2 className="w-3 h-3" /> Healthy &bull; .NET 8 LTS
          </div>
        </div>

        {/* Node 2: Security & Identity */}
        <div className="bg-[#0e1322] border-2 border-[#ffea00]/40 p3-cut-corner p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-[10px] text-[#ffea00] bg-[#030712] px-2 py-0.5 border border-[#ffea00]/40 font-bold">
                Security Module
              </span>
              <span className="text-[#ffea00] text-[10px] font-mono font-bold">In Progress</span>
            </div>
            <div className="font-bold text-[#f0f8ff] text-xs font-mono">Identity + RBAC Module</div>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">
              JWT token issuance, claims validation, and granular role permissions.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center gap-1 text-[10px] font-mono text-[#ffea00]">
            <KeyRound className="w-3 h-3" /> Active Development
          </div>
        </div>

        {/* Node 3: SQL Server */}
        <div className="bg-[#0e1322] border-2 border-slate-800 p3-cut-corner p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono text-[10px] text-[#00d2ff] bg-[#030712] px-2 py-0.5 border border-[#00d2ff]/40 font-bold">
                Container 02
              </span>
              <span className="text-slate-500 text-[10px] font-mono">Port 1433:1433</span>
            </div>
            <div className="font-bold text-[#f0f8ff] text-xs font-mono">Microsoft SQL Server</div>
            <p className="text-[11px] text-slate-400 mt-1 font-sans">
              Persistent data volume, EF Core Code-First schema &amp; ACID transactions.
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center gap-1 text-[10px] font-mono text-[#10b981]">
            <Database className="w-3 h-3" /> Volume Mounted: /var/opt/mssql
          </div>
        </div>
      </div>

      {/* Interactive Endpoint Tester */}
      <div className="bg-[#070a12] border-2 border-slate-800 p-4 p3-cut-corner">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-2 border-b border-slate-800">
          <div className="text-xs font-mono text-slate-400 font-bold">REST Request Dispatcher:</div>
          
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Simulate Token Role:</span>
            {(["Teacher", "Admin", "Student"] as const).map((r) => (
              <button
                key={r}
                onClick={() => {
                  sound.playSelect();
                  setActiveRole(r);
                  setExecutionResult(null);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`px-2 py-0.5 text-[11px] font-mono font-bold transition-all ${
                  activeRole === r
                    ? "bg-[#00d2ff] text-[#030712] shadow-[0_0_10px_#00d2ff]"
                    : "bg-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Endpoint Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
          {ENDPOINTS.map((ep, idx) => (
            <button
              key={idx}
              onClick={() => {
                sound.playSelect();
                setSelectedEndpoint(ep);
                setExecutionResult(null);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`p-2 border text-left text-xs font-mono transition-all ${
                selectedEndpoint.path === ep.path
                  ? "bg-[#00d2ff]/20 border-[#00d2ff] text-[#00d2ff] shadow-sm"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-black text-[#00d2ff]">{ep.method}</span>
                <span className="text-[10px] text-slate-500">Requires: {ep.role}</span>
              </div>
              <div className="text-[11px] truncate">{ep.path}</div>
            </button>
          ))}
        </div>

        {/* Action button */}
        <div className="flex items-center justify-between my-3">
          <div className="text-xs font-mono text-slate-400">
            Authorization: <code className="text-[#00d2ff]">Bearer [JWT_Role_{activeRole}]</code>
          </div>
          <button
            onClick={executeApi}
            disabled={isExecuting}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1.5 bg-[#00d2ff] hover:bg-[#00f0ff] text-[#030712] text-xs font-mono font-black px-3.5 py-1.5 transition-all shadow-[0_0_15px_#00d2ff] disabled:opacity-50"
          >
            <Play className="w-3 h-3 fill-current" />
            {isExecuting ? "DISPATCHING..." : "SEND REQUEST"}
          </button>
        </div>

        {/* Response JSON terminal view */}
        <div className="bg-[#05070d] border border-slate-800 p-3 font-mono text-xs overflow-x-auto min-h-[100px]">
          {isExecuting ? (
            <div className="text-[#00d2ff] flex items-center gap-2">
              <Cpu className="w-4 h-4 animate-spin" /> Routing through Docker bridge network...
            </div>
          ) : executionResult ? (
            <div className="space-y-1">
              <div className="text-[10px] text-slate-500 border-b border-slate-800 pb-1 mb-1">
                HTTP/1.1 {selectedEndpoint.role === "Admin" && activeRole !== "Admin" ? "403 Forbidden" : "200 OK"} &bull; application/json
              </div>
              <pre
                className={
                  selectedEndpoint.role === "Admin" && activeRole !== "Admin"
                    ? "text-[#ff2a5f]"
                    : "text-[#10b981]"
                }
              >
                {executionResult}
              </pre>
            </div>
          ) : (
            <div className="text-slate-600 italic">
              Click &quot;SEND REQUEST&quot; to test containerized dispatch.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
