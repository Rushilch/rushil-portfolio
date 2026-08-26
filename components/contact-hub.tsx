"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Copy, Check, Send, FileText, ExternalLink, MessageSquare } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

interface ContactHubProps {
  onOpenResume: () => void;
}

export function ContactHub({ onOpenResume }: ContactHubProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          subject: formSubject,
          message: formMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setFormStatus("success");
      setFormName("");
      setFormEmail("");
      setFormSubject("");
      setFormMessage("");
    } catch (err: any) {
      setFormStatus("error");
      setErrorMessage(err.message || "Failed to submit message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-[#1e293b]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Open to SWE Roles &amp; Grad Programs
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Feel free to reach out directly via email, phone, or LinkedIn. I am actively interviewing for entry-level Software Engineering positions and discussing US MS/MEng programs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Cards: 1-Click Copy & Profiles */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0e1322] border border-[#1e293b] flex items-center justify-center text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Email</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs font-mono font-medium text-slate-200 hover:text-cyan-300 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-[#0e1322] hover:bg-[#161e31] border border-[#1e293b] text-slate-400 hover:text-slate-200 transition-all text-xs flex items-center gap-1"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0e1322] border border-[#1e293b] flex items-center justify-center text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Phone</div>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-xs font-mono font-medium text-slate-200 hover:text-emerald-300 transition-colors"
                  >
                    {PERSONAL_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <button
                onClick={copyPhone}
                className="p-2 rounded-lg bg-[#0e1322] hover:bg-[#161e31] border border-[#1e293b] text-slate-400 hover:text-slate-200 transition-all text-xs flex items-center gap-1"
                title="Copy Phone"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location & Links */}
            <div className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2.5 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>Based in <strong>{PERSONAL_INFO.location}</strong></span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1e293b]">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#0e1322] hover:bg-[#161e31] border border-[#1e293b] text-slate-300 hover:text-white flex items-center justify-between text-xs transition-all"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-slate-400" />
                    <span>GitHub</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#0e1322] hover:bg-[#161e31] border border-[#1e293b] text-slate-300 hover:text-white flex items-center justify-between text-xs transition-all"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 text-cyan-400" />
                    <span>LinkedIn</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>

              <button
                onClick={onOpenResume}
                className="w-full bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-teal-500/10 hover:from-cyan-500/20 hover:to-emerald-500/20 border border-cyan-500/40 text-cyan-300 font-semibold p-3 rounded-xl flex items-center justify-center gap-2 text-xs transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Open Full Resume Preview (PDF)</span>
              </button>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-100 mb-1">Send a Direct Message</h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill out this form to get in touch. Submissions route to the Next.js API backend.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full bg-[#0e1322] border border-[#1e293b] text-xs text-slate-200 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-[#0e1322] border border-[#1e293b] text-xs text-slate-200 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Subject / Opportunity</label>
                <input
                  type="text"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  placeholder="e.g. SWE Role / Grad Research Opportunity"
                  className="w-full bg-[#0e1322] border border-[#1e293b] text-xs text-slate-200 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Hello Rushil, I saw your portfolio and would like to discuss..."
                  className="w-full bg-[#0e1322] border border-[#1e293b] text-xs text-slate-200 px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              {formStatus === "success" && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-lg text-xs text-emerald-300 font-mono">
                  &check; Message received successfully! I will reply as soon as possible.
                </div>
              )}

              {formStatus === "error" && (
                <div className="p-3 bg-rose-950/40 border border-rose-500/50 rounded-lg text-xs text-rose-300 font-mono">
                  &times; {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-all shadow-md disabled:opacity-50 text-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Sending..." : "Submit Message"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
