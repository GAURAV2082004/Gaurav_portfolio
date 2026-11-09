"use client";

import ScrollReveal from "./ScrollReveal";
import CyberBoxAgent from "./CyberBoxAgent";
import { sound } from "@/lib/audio";

const highlights = [
  { label: "Production Tools Built", value: "7+", sub: "PHP & Python in Prod", icon: "⚙️" },
  { label: "Enterprise Projects", value: "5", sub: "End-to-End Shipped", icon: "🚀" },
  { label: "Verified Credentials", value: "3", sub: "Infosys, Kaggle, GS", icon: "📜" },
  { label: "Expected Graduation", value: "2026", sub: "Mumbai University", icon: "🎓" },
];

export default function CyberAbout() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          {/* Section Terminal Header */}
          <div className="flex items-center gap-3 mb-12 font-mono">
            <span className="text-[#ff3333] text-sm font-bold">[01]</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              // DEVELOPER_SPECIFICATION
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#ff3333]/40 via-gray-800 to-transparent ml-4" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Terminal Manifest (6 cols) */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left">
              <div
                onClick={() => sound.playClick(850)}
                className="cyber-panel rounded-2xl overflow-hidden corner-bracket border border-[#ff3333]/30 shadow-2xl relative cursor-pointer"
              >
                {/* Dedicated Box Agent Cursor for Manifest JSON */}
                <CyberBoxAgent
                  agent={{
                    id: "agent-05",
                    name: "Agent 05",
                    role: "Architect",
                    color: "#ff3333",
                  }}
                  waypoints={[
                    {
                      xPercent: 32,
                      yPercent: 35,
                      action: "highlight",
                      targetLabel: "COLLEGE_SCHEMA",
                      statusText: "Validating: Pillai College of Engineering",
                      pause: 2500,
                    },
                    {
                      xPercent: 28,
                      yPercent: 48,
                      action: "click",
                      targetLabel: "CGPA_RECORD",
                      statusText: "Auditing: CGPA 6.24 / 10 Verified",
                      pause: 2200,
                    },
                    {
                      xPercent: 40,
                      yPercent: 62,
                      action: "type",
                      targetLabel: "EXPERIENCE_FIELD",
                      statusText: "Verifying: Blank Analytica (7 tools)",
                      typeText: "status: VERIFIED // 200 OK",
                      pause: 2600,
                    },
                  ]}
                />

                {/* Terminal Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a]/95 border-b border-[#ff3333]/20 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-gray-200 ml-2">cat manifest.json</span>
                  </div>
                  <span className="text-[10px] text-[#ff4d4d] font-bold">JSON_SCHEMA // READONLY</span>
                </div>

                {/* Syntax Highlighted JSON Code */}
                <pre className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-gray-300 overflow-x-auto bg-[#050505]/95">
                  <code>
{`{
  `}<span className="text-[#ff4d4d]">&quot;developer&quot;</span>{`: `}<span className="text-emerald-300">&quot;Gaurav Shailendra Jadli&quot;</span>{`,
  `}<span className="text-[#ff4d4d]">&quot;education&quot;</span>{`: {
    `}<span className="text-[#ff4d4d]">&quot;college&quot;</span>{`: `}<span className="text-amber-300">&quot;Pillai College of Engineering&quot;</span>{`,
    `}<span className="text-[#ff4d4d]">&quot;university&quot;</span>{`: `}<span className="text-amber-300">&quot;University of Mumbai&quot;</span>{`,
    `}<span className="text-[#ff4d4d]">&quot;degree&quot;</span>{`: `}<span className="text-amber-300">&quot;B.Tech in Computer Engineering&quot;</span>{`,
    `}<span className="text-[#ff4d4d]">&quot;graduation&quot;</span>{`: `}<span className="text-emerald-300">&quot;2026&quot;</span>{`,
    `}<span className="text-[#ff4d4d]">&quot;cgpa&quot;</span>{`: `}<span className="text-[#ff4d4d] font-bold">&quot;6.24 / 10&quot;</span>{`
  },
  `}<span className="text-[#ff4d4d]">&quot;experience&quot;</span>{`: {
    `}<span className="text-[#ff4d4d]">&quot;role&quot;</span>{`: `}<span className="text-purple-300">&quot;Software Engineering Intern&quot;</span>{`,
    `}<span className="text-[#ff4d4d]">&quot;company&quot;</span>{`: `}<span className="text-purple-300">&quot;Blank Analytica&quot;</span>{`,
    `}<span className="text-[#ff4d4d]">&quot;production_tools_built&quot;</span>{`: `}<span className="text-[#ff4d4d] font-bold">7</span>{`
  },
  `}<span className="text-[#ff4d4d]">&quot;engineering_domains&quot;</span>{`: [
    `}<span className="text-emerald-300">&quot;High-Scale Autonomous Scraping&quot;</span>{`,
    `}<span className="text-emerald-300">&quot;Enterprise ERP & SCM Pipelines&quot;</span>{`,
    `}<span className="text-emerald-300">&quot;AI Voice & LLM Orchestration&quot;</span>{`,
    `}<span className="text-emerald-300">&quot;Uptime & DOM Anomaly Sentinels&quot;</span>{`
  ],
  `}<span className="text-[#ff4d4d]">&quot;status&quot;</span>{`: `}<span className="text-emerald-400 font-bold">&quot;READY_FOR_DEPLOYMENT&quot;</span>{`
}`}
                  </code>
                </pre>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Bio Narrative & Stats (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="right">
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Engineering Resilient Backend Systems &amp; Autonomous AI Automation
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                  I am a Computer Engineering student at Pillai College of Engineering (University of Mumbai),
                  building enterprise-grade web tools, scalable automation engines, and data intelligence pipelines.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  During my Software Engineering Internship at <strong className="text-white">Blank Analytica</strong>,
                  I engineered <strong className="text-[#ff4d4d]">7 internal production tools</strong> spanning multi-domain
                  scrapers indexing 10,000+ items without rate limits, real-time sentinels inspecting 200+ live domains,
                  and ERP data synchronizers managing critical supply chain operations.
                </p>
              </div>
            </ScrollReveal>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {highlights.map((item, i) => (
                <ScrollReveal key={item.label} delay={i * 80} direction="up">
                  <div className="cyber-panel cyber-panel-hover p-4 rounded-xl border border-[#ff3333]/20 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500 font-mono uppercase">{item.label}</span>
                      <span className="text-base">{item.icon}</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                      {item.value}
                    </div>
                    <div className="text-[11px] text-[#ff4d4d] mt-0.5 font-mono">{item.sub}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
