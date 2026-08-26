"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Copy, Check, Send, FileText, ExternalLink, MessageSquare, ShieldAlert } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { sound } from "@/lib/sound";

interface P3ContactProps {
  onOpenResume: () => void;
}

export function P3Contact({ onOpenResume }: P3ContactProps) {
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
    sound.playSelect();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    sound.playSelect();
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
        throw new Error(data.error || "Failed to dispatch message.");
      }

      sound.playSelect();
      setFormStatus("success");
      setFormName("");
      setFormEmail("");
      setFormSubject("");
      setFormMessage("");
    } catch (err: any) {
      sound.playCancel();
      setFormStatus("error");
      setErrorMessage(err.message || "Failed to submit message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t-2 border-[#00d2ff]/40 bg-[#030712] relative p3-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 bg-[#ff2a5f] text-white px-3 py-0.5 text-xs font-mono font-black uppercase transform skew-x-[-12deg] mb-2">
            <span className="transform skew-x-[12deg] flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              [S-LINK // SOCIAL LINK &amp; DIRECT DISPATCH]
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#f0f8ff] tracking-tight uppercase font-sans">
            CONNECT WITH RUSHIL
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-400 mt-2 leading-relaxed">
            Actively interviewing for entry-level Software Engineering positions &amp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Cards & 1-Click Copy */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div
              onMouseEnter={() => sound.playHover()}
              className="bg-[#060e22] border-2 border-[#00d2ff]/40 hover:border-[#00d2ff] p3-cut-corner p-5 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3 font-mono">
                <div className="w-10 h-10 bg-[#030712] border border-[#00d2ff] flex items-center justify-center text-[#00d2ff]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-500 font-bold">DIRECT EMAIL</div>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-xs font-bold text-[#f0f8ff] hover:text-[#00d2ff] transition-colors"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="p-2 bg-[#030712] hover:bg-[#0a142e] border border-slate-700 text-[#00d2ff] transition-all text-xs flex items-center gap-1 font-mono font-bold"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div
              onMouseEnter={() => sound.playHover()}
              className="bg-[#060e22] border-2 border-[#10b981]/40 hover:border-[#10b981] p3-cut-corner p-5 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3 font-mono">
                <div className="w-10 h-10 bg-[#030712] border border-[#10b981] flex items-center justify-center text-[#10b981]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase text-slate-500 font-bold">DIRECT PHONE</div>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="text-xs font-bold text-[#f0f8ff] hover:text-[#10b981] transition-colors"
                  >
                    {PERSONAL_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <button
                onClick={copyPhone}
                className="p-2 bg-[#030712] hover:bg-[#0a142e] border border-slate-700 text-[#10b981] transition-all text-xs flex items-center gap-1 font-mono font-bold"
                title="Copy Phone"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Profiles & Resume */}
            <div className="bg-[#060e22] border-2 border-slate-800 p3-cut-corner p-5 space-y-4">
              <div className="flex items-center gap-2.5 text-xs text-slate-400 font-mono">
                <MapPin className="w-4 h-4 text-[#00d2ff]" />
                <span>BASE OF OPERATIONS: <strong className="text-white">{PERSONAL_INFO.location.toUpperCase()}</strong></span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="p-2.5 bg-[#030712] hover:bg-[#0a142e] border border-slate-700 hover:border-[#00d2ff] text-slate-300 hover:text-white flex items-center justify-between text-xs font-mono font-bold transition-all"
                >
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-[#00d2ff]" />
                    <span>GITHUB</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  className="p-2.5 bg-[#030712] hover:bg-[#0a142e] border border-slate-700 hover:border-[#00d2ff] text-slate-300 hover:text-white flex items-center justify-between text-xs font-mono font-bold transition-all"
                >
                  <div className="flex items-center gap-2">
                    <LinkedinIcon className="w-4 h-4 text-[#00d2ff]" />
                    <span>LINKEDIN</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>

              <button
                onClick={() => {
                  sound.playSelect();
                  onOpenResume();
                }}
                onMouseEnter={() => sound.playHover()}
                className="w-full bg-[#00d2ff] hover:bg-[#00f0ff] text-[#030712] font-black p-3 font-mono text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_#00d2ff] transform skew-x-[-8deg] transition-all"
              >
                <span className="transform skew-x-[8deg] flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  [OPEN RESUME PREVIEW &bull; PDF]
                </span>
              </button>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7 bg-[#060e22] border-2 border-[#00d2ff]/40 p3-cut-corner p-6 md:p-8">
            <h3 className="text-xl font-black text-[#f0f8ff] mb-1 font-mono uppercase">
              SEND DIRECT DISPATCH
            </h3>
            <p className="text-xs font-mono text-slate-400 mb-6">
              Messages route directly through the Next.js API server endpoint.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">NAME / SENDER *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Recruiter / Engineer Name"
                    className="w-full bg-[#030712] border border-slate-700 text-slate-100 px-3.5 py-2.5 focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="recruiter@company.com"
                    className="w-full bg-[#030712] border border-slate-700 text-slate-100 px-3.5 py-2.5 focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">OPPORTUNITY / SUBJECT</label>
                <input
                  type="text"
                  value={formSubject}
                  onChange={(e) => setFormSubject(e.target.value)}
                  placeholder="SWE Role / Grad Research Inquiry"
                  className="w-full bg-[#030712] border border-slate-700 text-slate-100 px-3.5 py-2.5 focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-bold">MESSAGE PAYLOAD *</label>
                <textarea
                  required
                  rows={4}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Hi Rushil, let's discuss your project work..."
                  className="w-full bg-[#030712] border border-slate-700 text-slate-100 px-3.5 py-2.5 focus:outline-none focus:border-[#00d2ff] resize-none"
                />
              </div>

              {formStatus === "success" && (
                <div className="p-3 bg-emerald-950/60 border-2 border-[#10b981] text-[#10b981] font-bold">
                  &check; DISPATCH TRANSMITTED SUCCESSFULLY.
                </div>
              )}

              {formStatus === "error" && (
                <div className="p-3 bg-rose-950/60 border-2 border-[#ff2a5f] text-[#ff2a5f] font-bold">
                  &times; {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => sound.playHover()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#ff2a5f] hover:bg-[#ff4070] text-white font-black px-6 py-3 font-mono tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,42,95,0.4)] disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "TRANSMITTING..." : "EXECUTE DISPATCH"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
