"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import CyberBoxAgent from "./CyberBoxAgent";

interface SkillNode {
  name: string;
  level: number;
  category: string;
  useCase: string;
}

const SKILL_CLUSTERS = [
  {
    category: "Languages",
    icon: "💻",
    description: "Core execution & algorithmic languages",
    skills: [
      { name: "Python", level: 85, category: "Languages", useCase: "Autonomous scraping queues, data analytics, Pandas" },
      { name: "PHP 8", level: 88, category: "Languages", useCase: "7+ production tools, cURL multi sentinels, Wacky ERP" },
      { name: "JavaScript", level: 80, category: "Languages", useCase: "Interactive SPAs, Google Apps Script, Next.js" },
      { name: "SQL", level: 82, category: "Languages", useCase: "Relational queries, index optimization, MySQL 8" },
      { name: "Java", level: 70, category: "Languages", useCase: "Object-oriented software architecture & DSA" },
      { name: "C", level: 65, category: "Languages", useCase: "Low-level memory concepts & systems fundamentals" },
    ],
  },
  {
    category: "Backend & Databases",
    icon: "🗄️",
    description: "Data persistence & API architectures",
    skills: [
      { name: "REST APIs", level: 90, category: "Backend", useCase: "Webhook sync, JSON endpoints, low-latency microservices" },
      { name: "MySQL 8", level: 85, category: "Databases", useCase: "Schema design, 200ms query caching, audit logs" },
      { name: "PostgreSQL", level: 75, category: "Databases", useCase: "Relational modeling, indexing, ACID transactions" },
      { name: "MongoDB", level: 70, category: "Databases", useCase: "Document storage, schema-less telemetry caching" },
      { name: "Node.js", level: 68, category: "Backend", useCase: "Async event loops, CLI tools, serverless workers" },
    ],
  },
  {
    category: "AI & Automation",
    icon: "🤖",
    description: "LLMs, heuristics & autonomous scrapers",
    skills: [
      { name: "OpenAI Whisper & GPT-4o", level: 85, category: "AI", useCase: "Voice multipart audio parsing & structured JSON generation" },
      { name: "Web Scraping & Heuristics", level: 88, category: "Automation", useCase: "10,000+ SKU extraction without IP blocks or timeouts" },
      { name: "Prompt Engineering", level: 82, category: "AI", useCase: "600+ curated templates with variable tag injection" },
      { name: "Google Apps Script", level: 82, category: "Automation", useCase: "Batched background workers & 2-way Sheets sync" },
      { name: "SerpAPI", level: 75, category: "Automation", useCase: "Fallback competitor discovery & price benchmarking" },
    ],
  },
  {
    category: "DevOps & Concepts",
    icon: "🛡️",
    description: "Systems resilience & architecture patterns",
    skills: [
      { name: "System Design", level: 78, category: "Concepts", useCase: "Tiered fallback architectures, rate-limited queues" },
      { name: "Low-Latency cURL Multi", level: 86, category: "DevOps", useCase: "Sub-second 17-vector inspections across 200+ domains" },
      { name: "RBAC & JWT Auth", level: 82, category: "Security", useCase: "Multi-tier role permissions & dual-login validation" },
      { name: "Git & Version Control", level: 82, category: "DevOps", useCase: "Branch strategies, deployment pipelines, CI/CD" },
      { name: "DSA", level: 80, category: "Concepts", useCase: "Algorithms, time/space complexity optimization" },
    ],
  },
];

export default function CyberSkills() {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(SKILL_CLUSTERS[0].skills[0]);

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          {/* Section Terminal Header */}
          <div className="flex items-center gap-3 mb-12 font-mono">
            <span className="text-[#ff3333] text-sm font-bold">[04]</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              // NEURAL_TECHNOLOGY_MATRIX
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#ff3333]/40 via-neutral-800 to-transparent ml-4" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Grid: Skill Clusters (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {SKILL_CLUSTERS.map((cluster, ci) => (
              <ScrollReveal key={cluster.category} delay={ci * 60} direction="up">
                <div className="cyber-panel rounded-xl p-5 border border-neutral-800 bg-[#0a0a0a] transition-all duration-300">
                  <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-neutral-800/80 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{cluster.icon}</span>
                      <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                        {cluster.category}
                      </h3>
                    </div>
                    <span className="text-[10px] text-neutral-500 hidden sm:inline">
                      {cluster.description}
                    </span>
                  </div>

                  {/* Skill Node Pills */}
                  <div className="flex flex-wrap gap-2">
                    {cluster.skills.map((skill) => {
                      const isSelected = selectedSkill.name === skill.name;
                      return (
                        <button
                          key={skill.name}
                          type="button"
                          onClick={() => setSelectedSkill(skill)}
                          className={`font-mono text-xs px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? "bg-[#ff3333]/20 text-[#ff4d4d] border-[#ff3333] shadow-[0_0_15px_rgba(255,51,51,0.4)] scale-105"
                              : "bg-neutral-950/80 text-neutral-300 border-neutral-800 hover:border-[#ff3333]/50 hover:text-[#ff4d4d] hover:bg-neutral-900"
                          }`}
                        >
                          <span>{skill.name}</span>
                          <span className="text-[10px] text-[#ff4d4d]/80">
                            {skill.level}%
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right Column: Interactive Diagnostic Gauge HUD (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <ScrollReveal direction="left">
              <div className="cyber-panel rounded-2xl p-6 border border-[#ff3333]/30 corner-bracket shadow-2xl font-mono relative overflow-hidden bg-[#0a0a0a]">
                {/* Dedicated Box Agent Cursor for Skill Diagnostics */}
                <CyberBoxAgent
                  agent={{
                    id: "agent-06",
                    name: "Agent 06",
                    role: "Auditor",
                    color: "#ff3333",
                  }}
                  waypoints={[
                    {
                      xPercent: 35,
                      yPercent: 30,
                      action: "highlight",
                      targetLabel: "TECH_NODE",
                      statusText: "Auditing: Python & PHP 8 benchmarks",
                      pause: 2400,
                    },
                    {
                      xPercent: 55,
                      yPercent: 58,
                      action: "click",
                      targetLabel: "LATENCY_GAUGE",
                      statusText: "Testing query plan: < 200ms",
                      pause: 2200,
                    },
                    {
                      xPercent: 28,
                      yPercent: 82,
                      action: "type",
                      targetLabel: "USE_CASE_SPEC",
                      statusText: "RBAC & Sentinel vectors healthy",
                      typeText: "0 vulnerabilities found",
                      pause: 2600,
                    },
                  ]}
                />
                <div className="flex items-center justify-between text-xs text-neutral-400 pb-3 mb-4 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff3333] animate-ping" />
                    <span>NODE_DIAGNOSTICS</span>
                  </div>
                  <span className="text-[#ff4d4d] font-bold">{selectedSkill.category}</span>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="text-[11px] text-neutral-500 uppercase tracking-wider">
                      TARGET_TECHNOLOGY
                    </div>
                    <div className="text-2xl font-extrabold text-white mt-0.5">
                      {selectedSkill.name}
                    </div>
                  </div>

                  {/* Level Gauge */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="text-neutral-400">PROFICIENCY INDEX:</span>
                      <span className="text-[#ff4d4d] font-bold text-sm">
                        {selectedSkill.level}% //{" "}
                        {selectedSkill.level >= 85 ? "EXPERT" : selectedSkill.level >= 75 ? "ADVANCED" : "PROFICIENT"}
                      </span>
                    </div>

                    <div className="h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                      <div
                        className="h-full bg-gradient-to-r from-[#ff3333] to-[#e11d48] rounded-full transition-all duration-500 shadow-[0_0_10px_#ff3333]"
                        style={{ width: `${selectedSkill.level}%` }}
                      />
                    </div>
                  </div>

                  {/* Real Production Application */}
                  <div className="p-3.5 rounded-xl bg-neutral-950/90 border border-neutral-800 text-xs font-sans">
                    <div className="text-[10px] font-mono text-[#ff4d4d] font-bold uppercase mb-1.5 flex items-center gap-1.5">
                      <span>⚡</span> REAL-WORLD PRODUCTION APPLICATION
                    </div>
                    <p className="text-neutral-300 leading-relaxed">
                      {selectedSkill.useCase}
                    </p>
                  </div>

                  <div className="pt-2 text-[10px] text-neutral-500 flex items-center justify-between border-t border-neutral-800/80">
                    <span>STATUS: VALIDATED IN PROD</span>
                    <span className="text-emerald-400">● VERIFIED</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
