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
            <span className="text-cyan-400 text-sm font-bold">[02]</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              // PRODUCTION_EXPERIENCE
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 via-gray-800 to-transparent ml-4" />
          </div>
        </ScrollReveal>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Circuit Line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-cyan-500/40 to-transparent hidden md:block" />

          <ScrollReveal direction="left" delay={100}>
            <div className="md:pl-12">
              <div className="cyber-panel cyber-panel-hover rounded-2xl p-6 sm:p-8 corner-bracket border border-cyan-500/30 transition-all duration-300">
                {/* Timeline node beacon */}
                <div className="absolute -left-[2.85rem] top-8 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#030712] hidden md:block shadow-[0_0_12px_#00f5ff]" />

                {/* Role Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-5 border-b border-gray-800/80 font-mono">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-cyan-400 font-bold tracking-wider">
                        [ROLE_ID: SWE_INTERN]
                      </span>
                      <span className="text-gray-600">//</span>
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {isOngoing ? "ACTIVE_ENGAGEMENT" : "COMPLETED"}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      Software Engineering Intern
                    </h3>
                    <p className="text-cyan-300 font-medium text-sm sm:text-base mt-0.5">
                      Blank Analytica
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-950/80 px-3.5 py-1.5 rounded-lg border border-gray-800 whitespace-nowrap self-start">
                    <span className="text-cyan-400">📅</span>
                    <span>Dec 2025 – {isOngoing ? "Present" : "Jun 2026"}</span>
                  </div>
                </div>

                {/* Accomplishments Terminal List */}
                <ul className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed font-sans mb-8">
                  {[
                    "Built and deployed 7+ production automation tools in PHP and Python, eliminating manual workflows across reporting, scheduling, and data management.",
                    "Developed BI dashboards and automated data pipelines to surface real-time operational KPIs for management and cross-functional teams.",
                    "Owned features end-to-end from requirements through deployment, translating stakeholder needs into production tools.",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-cyan-400 font-mono font-bold mt-1 flex-shrink-0">&gt;</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Technology Badges */}
                <div className="pt-4 border-t border-gray-800/80 flex flex-wrap items-center gap-2 font-mono">
                  <span className="text-xs text-gray-500 mr-2 uppercase tracking-wider">STACK:</span>
                  {["PHP 8", "Python", "Power BI", "Data Pipelines", "ETL Automation", "MySQL", "REST APIs"].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-cyan-300 bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-md"
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
