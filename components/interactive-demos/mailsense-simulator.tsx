"use client";

import React, { useState } from "react";
import { Mail, Bot, Sparkles, CheckSquare, Send, RefreshCw, BarChart2, ShieldCheck, ShieldAlert, Cpu } from "lucide-react";
import { sound } from "@/lib/sound";

interface SmartInboxSample {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  toneLabel: string;
  isSpam: boolean;
  spamConfidence: number;
  summary: string;
  rewrittenTarget: string;
  rewrittenBody: string;
  dbRecordId: string;
}

const TONE_LABELS = [
  "Friendly", "Urgent", "Formal", "Apologetic", "Professional",
  "Casual", "Assertive", "Concerned", "Inquisitive", "Persuasive",
  "Encouraging", "Neutral", "Appreciative", "Direct"
];

const SAMPLE_EMAILS: SmartInboxSample[] = [
  {
    id: "sample_prod_urgent",
    sender: "devops-lead@infrastructure.io",
    recipient: "rushil@sbox.com",
    subject: "CRITICAL: Database connection pool exhaustion on replica cluster",
    body: "Hi Rushil, we are observing severe connection timeouts on the primary read replica after the 03:00 UTC indexing cron job. Please investigate the active thread locks immediately, review the slow query log, and restart the pool daemon if necessary.",
    toneLabel: "Urgent",
    isSpam: false,
    spamConfidence: 0.02,
    summary: "Critical connection timeouts observed on read replica after indexing cron. Requires immediate inspection of active thread locks and potential pool daemon restart.",
    rewrittenTarget: "Calm & Professional",
    rewrittenBody: "Hi Rushil, we noticed elevated connection timeouts on the read replica following the scheduled 03:00 UTC indexing job. When you have a moment, could you please check the thread locks and restart the pool daemon if needed?",
    dbRecordId: "MSG-8921",
  },
  {
    id: "sample_phishing_spam",
    sender: "claim-payouts@instant-cryptobonus.net",
    recipient: "rushil@sbox.com",
    subject: "FINAL NOTICE: Claim your 5.2 ETH liquidity distribution immediately",
    body: "Dear valued recipient, you have been selected for an automatic decentralized liquidity distribution. Click the unverified link below within 24 hours to claim your reward or your tokens will be permanently forfeited.",
    toneLabel: "Direct",
    isSpam: true,
    spamConfidence: 0.99,
    summary: "Unsolicited cryptocurrency reward claim urging immediate link click under threat of forfeiture. Identified as high-risk spam/phishing.",
    rewrittenTarget: "N/A (Flagged as Spam)",
    rewrittenBody: "Message quarantined in Sbox.db. Automatic rewrite disabled for spam messages.",
    dbRecordId: "MSG-8922",
  },
  {
    id: "sample_client_formal",
    sender: "sarah.jenkins@partner-corp.com",
    recipient: "rushil@sbox.com",
    subject: "Follow-up regarding the Q3 API integration milestones",
    body: "Dear Rushil, thank you for sharing the updated endpoint documentation for the authentication service. We would appreciate it if you could clarify the JWT token expiration policy and provide sample payloads for role-based claims before our Friday review.",
    toneLabel: "Formal",
    isSpam: false,
    spamConfidence: 0.01,
    summary: "Client requesting clarification on JWT expiration policy and sample role-based claim payloads prior to the scheduled Friday review meeting.",
    rewrittenTarget: "Friendly & Casual",
    rewrittenBody: "Hey Rushil! Thanks a ton for sending over the auth docs. Could you give us a quick heads-up on the JWT expiration timeline and a couple of example payloads for role claims before we sync on Friday?",
    dbRecordId: "MSG-8923",
  },
];

export function MailsenseSimulator() {
  const [selectedEmail, setSelectedEmail] = useState<SmartInboxSample>(SAMPLE_EMAILS[0]);
  const [activeTab, setActiveTab] = useState<"analysis" | "rewriter" | "admin-chart">("analysis");
  const [isInferring, setIsInferring] = useState<boolean>(false);
  const [selectedRewriteTone, setSelectedRewriteTone] = useState<string>("Friendly");
  const [customDraft, setCustomDraft] = useState<string>(SAMPLE_EMAILS[0].rewrittenBody);

  const handleSelectEmail = (sample: SmartInboxSample) => {
    sound.playSelect();
    setSelectedEmail(sample);
    setCustomDraft(sample.rewrittenBody);
    setIsInferring(true);
    setTimeout(() => {
      setIsInferring(false);
    }, 450);
  };

  return (
    <div className="bg-[#0b0f19] border-2 border-[#00d2ff]/40 rounded-xl p-5 md:p-6 overflow-hidden shadow-[0_0_25px_rgba(0,210,255,0.15)]">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1e293b] pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <Mail className="w-4 h-4 text-[#00d2ff]" />
          <span className="text-xs font-mono text-[#00d2ff] font-bold uppercase tracking-wider">
            SmartInbox &bull; Flask + Groq/LLaMA 3.1 8B Pipeline
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[#111726] p-1 rounded-lg border border-[#1e293b]">
          <button
            onClick={() => {
              sound.playSelect();
              setActiveTab("analysis");
            }}
            onMouseEnter={() => sound.playHover()}
            className={`text-xs px-3 py-1 rounded-md font-mono font-bold transition-all ${
              activeTab === "analysis"
                ? "bg-[#00d2ff] text-[#030712] shadow-[0_0_10px_#00d2ff]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Inbound NLP
          </button>
          <button
            onClick={() => {
              sound.playSelect();
              setActiveTab("rewriter");
            }}
            onMouseEnter={() => sound.playHover()}
            className={`text-xs px-3 py-1 rounded-md font-mono font-bold transition-all ${
              activeTab === "rewriter"
                ? "bg-[#00d2ff] text-[#030712] shadow-[0_0_10px_#00d2ff]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Tone Rewriter
          </button>
          <button
            onClick={() => {
              sound.playSelect();
              setActiveTab("admin-chart");
            }}
            onMouseEnter={() => sound.playHover()}
            className={`text-xs px-3 py-1 rounded-md font-mono font-bold transition-all ${
              activeTab === "admin-chart"
                ? "bg-[#00d2ff] text-[#030712] shadow-[0_0_10px_#00d2ff]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Admin Chart.js
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Email Selection */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="text-xs font-mono text-slate-400 flex justify-between items-center">
            <span>Select Sbox.db Message:</span>
            <span className="text-[10px] text-slate-500">Raw SQLite Queries</span>
          </div>

          <div className="space-y-2">
            {SAMPLE_EMAILS.map((em) => (
              <button
                key={em.id}
                onClick={() => handleSelectEmail(em)}
                onMouseEnter={() => sound.playHover()}
                className={`w-full p-3 rounded-lg border text-left text-xs transition-all ${
                  selectedEmail.id === em.id
                    ? "bg-[#111726] border-[#00d2ff] text-slate-100 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                    : "bg-[#0c101c] border-[#1e293b] text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mb-1">
                  <span className="truncate max-w-[60%]">{em.sender}</span>
                  <div className="flex items-center gap-1">
                    {em.isSpam ? (
                      <span className="px-1.5 py-0.2 rounded font-black bg-rose-950 text-[#ff2a5f] border border-rose-800">
                        SPAM FLAG
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 rounded font-black bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/50">
                        {em.toneLabel}
                      </span>
                    )}
                  </div>
                </div>
                <div className="font-bold text-slate-200 truncate font-mono">{em.subject}</div>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 font-sans">{em.body}</p>
              </button>
            ))}
          </div>

          <div className="bg-[#070a12] border border-slate-800 rounded-lg p-3 text-[11px] font-mono text-slate-400 space-y-1">
            <div className="text-slate-500 flex items-center justify-between">
              <span>backend/llama_utils.py</span>
              <span className="text-[#10b981]">llama-3.1-8b-instant</span>
            </div>
            <code className="text-[#00d2ff] block">POST https://api.groq.com/openai/v1/chat/completions</code>
          </div>
        </div>

        {/* Right Column: Interactive Tab Output */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {activeTab === "analysis" && (
            <div className="bg-[#0e1322] border border-[#1e293b] rounded-lg p-4 space-y-3.5 font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Classification:</span>
                  <span className="text-[10px] text-slate-500">Record: {selectedEmail.dbRecordId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-700">
                    Tone: {selectedEmail.toneLabel}
                  </span>
                  {selectedEmail.isSpam ? (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-950 text-[#ff2a5f] border border-rose-700 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> Spam ({Math.round(selectedEmail.spamConfidence * 100)}%)
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-950 text-[#10b981] border border-emerald-700 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Clean Mail
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#00d2ff]" />
                  Inline Extractive Summary (2–3 Sentences):
                </div>
                <p className="text-xs text-slate-200 bg-[#070a12] p-3 rounded-lg border border-slate-800 leading-relaxed font-sans">
                  {selectedEmail.summary}
                </p>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5 font-bold">
                  14 Tone Label Taxonomy Supported:
                </div>
                <div className="flex flex-wrap gap-1">
                  {TONE_LABELS.map((t) => (
                    <span
                      key={t}
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        selectedEmail.toneLabel === t
                          ? "bg-[#00d2ff] text-[#030712]"
                          : "bg-slate-800/80 text-slate-400"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "rewriter" && (
            <div className="bg-[#0e1322] border border-[#1e293b] rounded-lg p-4 space-y-3.5 font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-300 font-bold">Tone Rewriter Assistant</span>
                <span className="text-[10px] text-[#10b981]">User-Reviewed Draft</span>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 mb-1">Original Draft Body:</div>
                <p className="text-xs text-slate-300 bg-[#070a12] p-2.5 rounded border border-slate-800 font-sans">
                  {selectedEmail.body}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1 text-[11px] text-slate-400">
                  <span>Target Rewrite Tone:</span>
                  <span className="text-[#00d2ff] font-bold">{selectedRewriteTone}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {["Friendly", "Formal", "Urgent", "Assertive", "Apologetic", "Direct"].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        sound.playSelect();
                        setSelectedRewriteTone(t);
                        setCustomDraft(`[Rewritten in ${t} Tone via Groq LLaMA 3.1]: ` + selectedEmail.rewrittenBody);
                      }}
                      onMouseEnter={() => sound.playHover()}
                      className={`text-[10px] px-2 py-0.5 rounded transition-all font-bold ${
                        selectedRewriteTone === t
                          ? "bg-[#00d2ff] text-[#030712] shadow-[0_0_10px_#00d2ff]"
                          : "bg-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 mb-1">Rewritten Draft:</div>
                <textarea
                  value={customDraft}
                  onChange={(e) => setCustomDraft(e.target.value)}
                  rows={3}
                  className="w-full bg-[#070a12] border border-slate-800 rounded p-2 text-xs text-slate-200 font-sans focus:outline-none focus:border-[#00d2ff]"
                />
              </div>
            </div>
          )}

          {activeTab === "admin-chart" && (
            <div className="bg-[#0e1322] border border-[#1e293b] rounded-lg p-4 space-y-3.5 font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-300 flex items-center gap-1.5 font-bold">
                  <BarChart2 className="w-3.5 h-3.5 text-[#00d2ff]" />
                  Admin Dashboard (Chart.js Aggregation)
                </span>
                <span className="text-[10px] text-slate-500">Sbox.db Queries</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#070a12] p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-500">Users</div>
                  <div className="text-sm font-bold text-slate-200">14</div>
                </div>
                <div className="bg-[#070a12] p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-500">Messages</div>
                  <div className="text-sm font-bold text-[#00d2ff]">1,248</div>
                </div>
                <div className="bg-[#070a12] p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-500">Spam</div>
                  <div className="text-sm font-bold text-[#ff2a5f]">86</div>
                </div>
                <div className="bg-[#070a12] p-2 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-500">Read Rate</div>
                  <div className="text-sm font-bold text-[#10b981]">92%</div>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-slate-400 mb-2 font-bold">Tone Label Distribution Across All Inbox Threads:</div>
                <div className="space-y-1.5 text-xs">
                  {[
                    { label: "Formal", count: 412, pct: 33, color: "bg-indigo-500" },
                    { label: "Friendly", count: 320, pct: 25, color: "bg-[#00d2ff]" },
                    { label: "Urgent", count: 185, pct: 15, color: "bg-[#ff2a5f]" },
                    { label: "Direct", count: 140, pct: 11, color: "bg-[#ffea00]" },
                    { label: "Apologetic", count: 95, pct: 8, color: "bg-[#10b981]" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-2">
                      <span className="w-20 text-[11px] text-slate-400">{row.label}</span>
                      <div className="flex-1 bg-slate-900 rounded-full h-2 overflow-hidden">
                        <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct * 2.5}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-400 w-12 text-right">{row.count} msgs</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
