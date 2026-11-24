"use client";

import { useState } from "react";
import CyberBoxAgent from "./CyberBoxAgent";
import LiveBuild from "./LiveBuild";
import Typed from "./Typed";

export type SkillLevel = "Strong" | "Working" | "Learning";

interface SkillNode {
  name: string;
  level: SkillLevel;
  category: string;
  useCase: string;
}

const LEVEL_WEIGHT: Record<SkillLevel, number> = {
  Strong: 3,
  Working: 2,
  Learning: 1,
};

const RAW_SKILL_CLUSTERS = [
  {
    category: "Languages",
    icon: "💻",
    description: "Core programming and scripting languages",
    skills: [
      { name: "Python", level: "Strong" as SkillLevel, category: "Languages", useCase: "Autonomous scraping queues, data analytics, Pandas" },
      { name: "PHP", level: "Strong" as SkillLevel, category: "Languages", useCase: "7+ production tools, cURL multi sentinels, operations ERP" },
      { name: "JavaScript", level: "Strong" as SkillLevel, category: "Languages", useCase: "Interactive web applications, Google Apps Script, Next.js" },
      { name: "SQL", level: "Strong" as SkillLevel, category: "Languages", useCase: "Relational queries, index optimization, MySQL 8" },
      { name: "Java", level: "Working" as SkillLevel, category: "Languages", useCase: "Object-oriented software architecture and DSA" },
      { name: "C", level: "Learning" as SkillLevel, category: "Languages", useCase: "Low-level memory concepts and systems fundamentals" },
    ],
  },
  {
    category: "Backend & Databases",
    icon: "🗄️",
    description: "Data persistence and API architectures",
    skills: [
      { name: "REST APIs", level: "Strong" as SkillLevel, category: "Backend", useCase: "Webhook sync, JSON endpoints, low-latency microservices" },
      { name: "MySQL", level: "Strong" as SkillLevel, category: "Databases", useCase: "Schema design, 200 ms query caching, audit logs" },
      { name: "PostgreSQL", level: "Working" as SkillLevel, category: "Databases", useCase: "Relational modeling, indexing, ACID transactions" },
      { name: "Node.js", level: "Working" as SkillLevel, category: "Backend", useCase: "Async event loops, CLI tools, serverless workers" },
      { name: "MongoDB", level: "Learning" as SkillLevel, category: "Databases", useCase: "Document storage, schema-less telemetry caching" },
    ],
  },
  {
    category: "AI & Automation",
    icon: "🤖",
    description: "LLMs, heuristics, and autonomous scrapers",
    skills: [
      { name: "Web Scraping & Heuristics", level: "Strong" as SkillLevel, category: "Automation", useCase: "10k+ SKU extraction without IP blocks or timeouts" },
      { name: "OpenAI Whisper & GPT-4", level: "Strong" as SkillLevel, category: "AI", useCase: "Voice multipart audio parsing and structured JSON generation" },
      { name: "Google Apps Script", level: "Strong" as SkillLevel, category: "Automation", useCase: "Batched background workers and two-way Google Sheets sync" },
      { name: "Prompt Engineering", level: "Working" as SkillLevel, category: "AI", useCase: "600+ curated templates with variable tag injection" },
      { name: "SerpAPI", level: "Working" as SkillLevel, category: "Automation", useCase: "Fallback competitor discovery and price benchmarking" },
    ],
  },
  {
    category: "DevOps & Concepts",
    icon: "🛡️",
    description: "Systems resilience and architecture patterns",
    skills: [
      { name: "System Design", level: "Strong" as SkillLevel, category: "Concepts", useCase: "Tiered fallback architectures, rate-limited queues" },
      { name: "Low-Latency cURL Multi", level: "Strong" as SkillLevel, category: "DevOps", useCase: "Sub-second 17-vector inspections across 200+ domains" },
      { name: "Git & Version Control", level: "Strong" as SkillLevel, category: "DevOps", useCase: "Branch strategies, deployment pipelines, CI/CD" },
      { name: "Data Structures & Algorithms", level: "Working" as SkillLevel, category: "Concepts", useCase: "Algorithms, time/space complexity optimization" },
      { name: "JWT Auth & RBAC", level: "Working" as SkillLevel, category: "Security", useCase: "Multi-tier role permissions and session verification" },
    ],
  },
];

// Sort every skill group the same way (highest level first)
const SKILL_CLUSTERS = RAW_SKILL_CLUSTERS.map((cluster) => ({
  ...cluster,
  skills: [...cluster.skills].sort(
    (a, b) => LEVEL_WEIGHT[b.level] - LEVEL_WEIGHT[a.level]
  ),
}));

export default function CyberSkills() {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(SKILL_CLUSTERS[0].skills[0]);

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <LiveBuild id="skills-heading">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-12 font-mono">
            <span className="text-[#ff3333] text-sm font-bold">[04]</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              <Typed>Skills</Typed>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#ff3333]/40 via-neutral-800 to-transparent ml-4" />
          </div>
        </LiveBuild>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* 4 Skill Category Cards (8 cols) */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {SKILL_CLUSTERS.map((cluster, i) => (
              <LiveBuild key={cluster.category} id={`skills-cluster-${i}`}>
                <div className="cyber-panel cyber-panel-hover rounded-2xl p-6 border border-neutral-800 hover:border-[#ff3333]/40 transition-all duration-300 corner-bracket h-full flex flex-col justify-between bg-[#0a0a0a]">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-xl">{cluster.icon}</span>
                      <h3 className="text-base font-bold text-white tracking-wide font-mono">
                        {cluster.category}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-400 font-sans mb-5">
                      {cluster.description}
                    </p>

                    {/* Skill Items */}
                    <div className="space-y-3 font-mono">
                      {cluster.skills.map((skill) => (
                        <div
                          key={skill.name}
                          onClick={() => setSelectedSkill(skill)}
                          className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                            selectedSkill.name === skill.name
                              ? "bg-[#ff3333]/15 border-[#ff3333]/50 shadow-[0_0_12px_rgba(255,51,51,0.25)]"
                              : "bg-neutral-950/80 border-neutral-800/80 hover:border-neutral-700"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-neutral-200 font-medium">{skill.name}</span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                skill.level === "Strong"
                                  ? "bg-emerald-950/70 border border-emerald-800/50 text-emerald-400"
                                  : skill.level === "Working"
                                  ? "bg-amber-950/70 border border-amber-800/50 text-amber-400"
                                  : "bg-neutral-900 border border-neutral-700 text-neutral-400"
                              }`}
                            >
                              {skill.level}
                            </span>
                          </div>

                          {/* Uniform level meter bar */}
                          <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width:
                                  skill.level === "Strong"
                                    ? "100%"
                                    : skill.level === "Working"
                                    ? "66%"
                                    : "33%",
                                background:
                                  skill.level === "Strong"
                                    ? "#ff3333"
                                    : skill.level === "Working"
                                    ? "#f59e0b"
                                    : "#737373",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </LiveBuild>
            ))}
          </div>

          {/* Right Column: Interactive Diagnostic Inspector (4 cols) */}
          <div className="lg:col-span-4 sticky top-28">
            <LiveBuild id="skills-inspector" isGraphic>
              <div className="cyber-panel rounded-2xl p-6 corner-bracket border border-[#ff3333]/40 bg-[#0a0a0a] relative overflow-hidden">
                <CyberBoxAgent
                  agent={{
                    id: "agent-02",
                    name: "Agent 02",
                    role: "Telemetry",
                    color: "#ff3333",
                  }}
                  waypoints={[
                    {
                      xPercent: 50,
                      yPercent: 40,
                      action: "highlight",
                      targetLabel: "SKILL_NODE",
                      statusText: `Inspecting ${selectedSkill.name}`,
                      pause: 2800,
                    },
                  ]}
                />

                <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-800/80 font-mono text-xs">
                  <span className="text-neutral-400">Skill Details</span>
                  <span className="text-[#ff4d4d] text-[10px] bg-[#ff3333]/15 border border-[#ff3333]/30 px-2 py-0.5 rounded font-bold">
                    [ACTIVE]
                  </span>
                </div>

                <div className="space-y-4 font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">
                      Technology
                    </span>
                    <h4 className="text-xl font-bold text-white mt-0.5">{selectedSkill.name}</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 block">Proficiency</span>
                      <span className="text-sm font-bold text-[#ff4d4d]">{selectedSkill.level}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
                      <span className="text-[10px] text-neutral-500 block">Domain</span>
                      <span className="text-sm font-bold text-neutral-200">{selectedSkill.category}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-1.5">
                      Production Application
                    </span>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed p-3 rounded-lg bg-neutral-950/80 border border-neutral-800">
                      {selectedSkill.useCase}
                    </p>
                  </div>
                </div>
              </div>
            </LiveBuild>
          </div>
        </div>
      </div>
    </section>
  );
}
