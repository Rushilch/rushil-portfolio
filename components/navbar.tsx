"use client";

import React, { useState, useEffect } from "react";
import { Search, FileText, Mail, Menu, X, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

interface NavbarProps {
  onOpenResume: () => void;
  onOpenCommand: () => void;
}

export function Navbar({ onOpenResume, onOpenCommand }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Learning", href: "#learning" },
    { name: "Education", href: "#education" },
    { name: "Philosophy", href: "#philosophy" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#07090e]/85 backdrop-blur-md border-b border-[#1e293b]/80 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monomark */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center font-mono font-bold text-slate-950 text-sm shadow-md group-hover:scale-105 transition-all">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 text-sm tracking-wider font-mono uppercase">
              Rushil
            </span>
            <span className="text-[10px] font-mono text-cyan-400 -mt-1 hidden sm:block">
              Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0e1322]/80 border border-[#1e293b] rounded-full px-3 py-1.5 backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs text-slate-300 hover:text-cyan-300 px-3 py-1 rounded-full font-medium transition-all hover:bg-slate-800/60"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Right Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Quick Command Palette Button */}
          <button
            onClick={onOpenCommand}
            className="flex items-center gap-2 bg-[#0e1322] hover:bg-[#161e31] text-slate-400 hover:text-slate-200 border border-[#1e293b] px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all"
            title="Search command palette"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden xl:inline text-[11px]">Quick Jump</span>
            <kbd className="bg-slate-800 text-[10px] text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Resume Button */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-semibold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-md"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Social Icons */}
          <div className="flex items-center gap-1 border-l border-[#1e293b] pl-2.5">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mobile Action & Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenCommand}
            className="p-2 rounded-lg bg-[#0e1322] border border-[#1e293b] text-slate-300"
            aria-label="Search"
          >
            <Search className="w-4 h-4 text-cyan-400" />
          </button>

          <button
            onClick={onOpenResume}
            className="p-2 rounded-lg bg-cyan-500 text-slate-950 font-bold"
            aria-label="Resume"
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#0e1322] border border-[#1e293b] text-slate-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b0f19] border-b border-[#1e293b] px-4 py-4 space-y-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-slate-300 hover:text-cyan-300 p-2.5 rounded-lg bg-[#0e1322] border border-[#1e293b]"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#1e293b] text-xs">
            <div className="flex gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#0e1322] border border-[#1e293b] text-slate-300"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#0e1322] border border-[#1e293b] text-slate-300"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="bg-cyan-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" /> View Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
