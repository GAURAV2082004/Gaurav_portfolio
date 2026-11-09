"use client";

import ScrollReveal from "./ScrollReveal";

export default function CyberExperience() {
  const isOngoing = new Date() < new Date("2026-06-30");

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          {/* Section Terminal Header */}
          <div className="flex items-center gap-3 mb-12 font-mono">
            <span className="text-[#ff3333] text-sm font-bold">[02]</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              // PRODUCTION_EXPERIENCE_LOGS
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#ff3333]/40 via-neutral-800 to-transparent ml-4" />
            <span className="hidden sm:inline-block text-[11px] text-[#ff4d4d] font-bold bg-[#ff3333]/10 border border-[#ff3333]/30 px-2.5 py-0.5 rounded">
              [RELEASE v2.4.0 // ACTIVE]
            </span>
          </div>
        </ScrollReveal>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Circuit Line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff3333] via-[#ff3333]/40 to-transparent hidden md:block" />

          <ScrollReveal direction="left" delay={100}>
            <div className="md:pl-12">
              <div className="cyber-panel cyber-panel-hover rounded-2xl p-6 sm:p-8 corner-bracket border border-[#ff3333]/30 transition-all duration-300">
                {/* Timeline node beacon */}
                <div className="absolute -left-[2.85rem] top-8 w-4 h-4 rounded-full bg-[#ff3333] border-4 border-[#050505] hidden md:block shadow-[0_0_14px_#ff3333]" />

                {/* Role Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-5 border-b border-neutral-800/80 font-mono">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs text-[#ff4d4d] font-bold tracking-wider">
                        [EXEC_ID: SWE_INTERN // BLANK_ANALYTICA]
                      </span>
                      <span className="text-neutral-600">//</span>
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-800/50 px-2 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {isOngoing ? "STATUS: ACTIVE_ENGAGEMENT" : "STATUS: COMPLETED"}
                      </span>
                      <span className="text-xs text-[#ff4d4d] font-bold bg-[#ff3333]/15 border border-[#ff3333]/30 px-2 py-0.5 rounded">
                        [VERIFIED // PRODUCTION]
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      Software Engineering Intern
                    </h3>
                    <p className="text-[#ff9999] font-medium text-sm sm:text-base mt-0.5 flex items-center gap-2">
                      <span>Blank Analytica</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-neutral-400 text-xs">Analytics &amp; Enterprise Automation Engineering</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-300 bg-neutral-950/90 px-3.5 py-1.5 rounded-lg border border-neutral-800 whitespace-nowrap self-start">
                    <span className="text-[#ff3333]">📅</span>
                    <span>Dec 2025 – {isOngoing ? "Present" : "Jun 2026"}</span>
                  </div>
                </div>

                {/* Accomplishments Terminal List */}
                <div className="mb-8 font-mono text-xs text-neutral-400">
                  <div className="mb-3 text-[11px] text-[#ff4d4d] uppercase tracking-wider flex items-center gap-2">
                    <span>⚡</span> DEPLOYED_CAPABILITIES &amp; ARCHITECTURAL IMPACT:
                  </div>
                  <ul className="space-y-3.5 text-neutral-300 text-sm sm:text-base leading-relaxed font-sans">
                    {[
                      "Built and deployed 7+ production automation tools in PHP and Python, eliminating repetitive manual workflows across cross-functional operations, reporting, and scheduled data extraction.",
                      "Engineered resilient multi-threaded scraping engines and API micro-integrations with batched retry strategies and sub-second execution times.",
                      "Architected automated ETL pipelines and executive BI dashboards to surface operational KPIs, processing daily transaction flows with zero downstream dropped events.",
                      "Owned tool lifecycles end-to-end: system requirements gathering, schema normalization, production rollout, and comprehensive operational error logging.",
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#ff3333] font-mono font-bold mt-1 flex-shrink-0">&gt;</span>
                        <span className="text-neutral-200">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology Badges */}
                <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-2 font-mono">
                  <span className="text-xs text-neutral-500 mr-2 uppercase tracking-wider">CORE_STACK:</span>
                  {[
                    "PHP 8",
                    "Python",
                    "MySQL 8",
                    "Power BI",
                    "Data Pipelines",
                    "ETL Automation",
                    "cURL Multi",
                    "REST APIs",
                    "Google Sheets API",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-[#ff9999] bg-[#ff3333]/10 border border-[#ff3333]/30 px-3 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
