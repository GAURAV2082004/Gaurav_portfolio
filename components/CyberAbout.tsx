"use client";

import ScrollReveal from "./ScrollReveal";

const highlights = [
  { label: "Production Tools Built", value: "7+", sub: "PHP & Python in Prod", icon: "⚙️" },
  { label: "Enterprise Projects", value: "5", sub: "End-to-End Shipped", icon: "🚀" },
  { label: "Certifications", value: "3", sub: "Infosys, Kaggle, GS", icon: "📜" },
  { label: "Expected Graduation", value: "2026", sub: "Mumbai University", icon: "🎓" },
];

export default function CyberAbout() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          {/* Section Terminal Header */}
          <div className="flex items-center gap-3 mb-12 font-mono">
            <span className="text-cyan-400 text-sm font-bold">[01]</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              // DEVELOPER_SPECIFICATION
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 via-gray-800 to-transparent ml-4" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Terminal Manifest (6 cols) */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left">
              <div className="cyber-panel rounded-2xl overflow-hidden corner-bracket border border-cyan-500/30 shadow-2xl">
                {/* Terminal Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-950/90 border-b border-gray-800/80 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-gray-300 ml-2">cat manifest.json</span>
                  </div>
                  <span className="text-[10px] text-gray-500">JSON_SCHEMA // READONLY</span>
                </div>

                {/* Syntax Highlighted JSON Code */}
                <pre className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-gray-300 overflow-x-auto bg-[#030712]/95">
                  <code>
{`{
  `}<span className="text-cyan-400">&quot;developer&quot;</span>{`: `}<span className="text-emerald-300">&quot;Gaurav Shailendra Jadli&quot;</span>{`,
  `}<span className="text-cyan-400">&quot;education&quot;</span>{`: {
    `}<span className="text-cyan-400">&quot;college&quot;</span>{`: `}<span className="text-amber-300">&quot;Pillai College of Engineering&quot;</span>{`,
    `}<span className="text-cyan-400">&quot;university&quot;</span>{`: `}<span className="text-amber-300">&quot;University of Mumbai&quot;</span>{`,
    `}<span className="text-cyan-400">&quot;degree&quot;</span>{`: `}<span className="text-amber-300">&quot;B.Tech in Computer Engineering&quot;</span>{`,
    `}<span className="text-cyan-400">&quot;graduation&quot;</span>{`: `}<span className="text-emerald-300">&quot;2026&quot;</span>{`,
    `}<span className="text-cyan-400">&quot;cgpa&quot;</span>{`: `}<span className="text-cyan-300">&quot;6.24 / 10&quot;</span>{`
  },
  `}<span className="text-cyan-400">&quot;experience&quot;</span>{`: {
    `}<span className="text-cyan-400">&quot;role&quot;</span>{`: `}<span className="text-purple-300">&quot;Software Engineering Intern&quot;</span>{`,
    `}<span className="text-cyan-400">&quot;company&quot;</span>{`: `}<span className="text-purple-300">&quot;Blank Analytica&quot;</span>{`,
    `}<span className="text-cyan-400">&quot;production_tools_built&quot;</span>{`: `}<span className="text-cyan-300">7</span>{`
  },
  `}<span className="text-cyan-400">&quot;engineering_domains&quot;</span>{`: [
    `}<span className="text-emerald-300">&quot;High-Scale Autonomous Scraping&quot;</span>{`,
    `}<span className="text-emerald-300">&quot;Enterprise ERP & SCM Pipelines&quot;</span>{`,
    `}<span className="text-emerald-300">&quot;AI Voice & LLM Orchestration&quot;</span>{`,
    `}<span className="text-emerald-300">&quot;Uptime & DOM Anomaly Sentinels&quot;</span>{`
  ],
  `}<span className="text-cyan-400">&quot;status&quot;</span>{`: `}<span className="text-cyan-300">&quot;Open to Software Engineering Opportunities&quot;</span>{`
}`}
                  </code>
                </pre>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Narrative & Technical Architecture (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="right">
              <div className="space-y-4 text-gray-300 leading-relaxed font-sans text-sm sm:text-base">
                <p>
                  I am a Computer Engineering student at{" "}
                  <span className="text-cyan-300 font-semibold">Pillai College of Engineering, University of Mumbai</span>,
                  graduating in 2026. My focus centers on architecting resilient web applications, autonomous automation pipelines,
                  and AI-orchestrated tools.
                </p>
                <p>
                  During my software engineering internship at{" "}
                  <span className="text-cyan-300 font-semibold">Blank Analytica</span>, I engineered and deployed{" "}
                  <span className="text-emerald-300 font-semibold">7+ production automation tools</span> in PHP and Python,
                  developed BI dashboards, and took full ownership of engineering features from initial stakeholder requirements through to deployment.
                </p>
                <p>
                  Whether engineering an autonomous scraper cataloging 10,000+ competitor SKUs without timeouts, a 200+ domain
                  uptime sentinel with sub-second cURL verification, or an AI productivity system orchestrating OpenAI Whisper and GPT-4o,
                  I build software designed for real-world reliability and scale.
                </p>
              </div>

              {/* 4 Quick Stat Panels */}
              <div className="grid grid-cols-2 gap-3 pt-4 font-mono">
                {highlights.map((item, i) => (
                  <div
                    key={i}
                    className="cyber-panel cyber-panel-hover p-4 rounded-xl border border-gray-800 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-1 text-gray-400 text-xs">
                      <span>{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </div>
                    <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      {item.value}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">{item.sub}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
