"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Copy, Check, Send, Sparkles, MessageSquare, Terminal, ExternalLink, FileText } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

interface ContactHubProps {
  onOpenResume: () => void;
}

export function ContactHub({ onOpenResume }: ContactHubProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subjectText = formSubject.trim() || `Inquiry from ${formName.trim() || "Recruiter / Engineer"}`;
    const bodyText = `Hi Rushil,\n\nName: ${formName.trim()}\nEmail: ${formEmail.trim()}\n\nMessage:\n${formMessage.trim()}\n\n---\nSent via Portfolio Contact Form`;

    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;

    window.location.href = mailtoUrl;
    setFormStatus("success");
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
            Let&apos;s Build Something Together
          </h2>
          <p className="text-sm text-slate-400 mt-2 leading-relaxed">
            Actively interviewing for Entry-Level Software Engineering and Applied Machine Learning roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Info & 1-Click Copy */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0e1322] border border-[#1e293b] flex items-center justify-center text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">Email</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-sm font-medium text-slate-200 hover:text-cyan-400 transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="p-2 rounded-lg bg-[#0e1322] hover:bg-[#161d33] border border-[#1e293b] text-slate-300 hover:text-cyan-400 transition-all text-xs flex items-center gap-1 font-mono"
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
                  <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">Phone</div>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-sm font-medium text-slate-200 hover:text-emerald-400 transition-colors"
                  >
                    {PERSONAL_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <button
                onClick={copyPhone}
                className="p-2 rounded-lg bg-[#0e1322] hover:bg-[#161d33] border border-[#1e293b] text-slate-300 hover:text-emerald-400 transition-all text-xs flex items-center gap-1 font-mono"
                title="Copy Phone Number"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Profiles & Location */}
            <div className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2.5 text-xs text-slate-400 font-mono">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Based in {PERSONAL_INFO.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1e293b]">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#0e1322] hover:bg-[#161d33] border border-[#1e293b] hover:border-cyan-500/40 text-slate-300 hover:text-white flex items-center justify-between text-xs font-mono transition-all"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-cyan-400" />
                    <span>GitHub</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#0e1322] hover:bg-[#161d33] border border-[#1e293b] hover:border-cyan-500/40 text-slate-300 hover:text-white flex items-center justify-between text-xs font-mono transition-all"
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
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold p-3 rounded-xl font-mono text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume (PDF)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Contact Dispatch Form */}
          <div className="lg:col-span-7 bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-100 mb-1">Direct Message Dispatch</h3>
            <p className="text-xs text-slate-400 mb-6">
              Enter your inquiry below to open a pre-formatted message in your default email client.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Recruiter / Engineer Name"
                    className="w-full bg-[#0e1322] border border-[#1e293b] rounded-xl text-slate-100 px-3.5 py-2.5 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1.5 font-semibold">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="recruiter@company.com"
                    className="w-full bg-[#0e1322] border border-[#1e293b] rounded-xl text-slate-100 px-3.5 py-2.5 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 font-semibold">Subject / Role Opportunity</label>
                <input
                  type="text"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  placeholder="Software Engineering Role / Interview Inquiry"
                  className="w-full bg-[#0e1322] border border-[#1e293b] rounded-xl text-slate-100 px-3.5 py-2.5 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 font-semibold">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Hi Rushil, let's discuss your software engineering work..."
                  className="w-full bg-[#0e1322] border border-[#1e293b] rounded-xl text-slate-100 px-3.5 py-2.5 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              {formStatus === "success" && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-400 font-mono text-xs">
                  &check; Mail client opened with pre-filled message!
                </div>
              )}

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-6 py-3 rounded-xl font-mono tracking-wide uppercase transition-all shadow-lg shadow-cyan-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open in Email Client</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
