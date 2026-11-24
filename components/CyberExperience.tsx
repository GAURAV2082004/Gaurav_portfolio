"use client";

import LiveBuild from "./LiveBuild";
import Typed from "./Typed";

export default function CyberExperience() {
  const isOngoing = new Date() < new Date("2026-06-30");

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <LiveBuild id="experience-heading">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-12 font-mono">
            <span className="text-[#ff3333] text-sm font-bold">[02]</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              <Typed>Experience</Typed>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#ff3333]/40 via-neutral-800 to-transparent ml-4" />
          </div>
        </LiveBuild>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Circuit Line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff3333] via-[#ff3333]/40 to-transparent hidden md:block" />

          <LiveBuild id="experience-card-0">
            <div className="md:pl-12">
              <div className="cyber-panel cyber-panel-hover rounded-2xl p-6 sm:p-8 corner-bracket border border-[#ff3333]/30 transition-all duration-300">
                {/* Timeline node beacon */}
                <div className="absolute -left-[2.85rem] top-8 w-4 h-4 rounded-full bg-[#ff3333] border-4 border-[#050505] hidden md:block shadow-[0_0_14px_#ff3333]" />

                {/* Role Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 pb-5 border-b border-neutral-800/80 font-mono">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs text-[#ff4d4d] font-bold tracking-wider">
                        Software Engineering Intern
                      </span>
                      <span className="text-neutral-600">//</span>
                      <span className="text-xs text-neutral-300">Blank Analytica</span>
                      <span className="text-neutral-600">//</span>
                      <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-800/50 px-2 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {isOngoing ? "Active" : "Completed"}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      <Typed>Software Engineering Intern</Typed>
                    </h3>
                    <p className="text-sm text-neutral-400 mt-1 font-sans">
                      Blank Analytica · Remote / Mumbai
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-neutral-400 bg-neutral-950/90 border border-neutral-800 px-3 py-1.5 rounded-lg">
                    <span>📅</span>
                    <span>Jan 2026 – Present</span>
                  </div>
                </div>

                {/* Quantitative Impact Points */}
                <div className="space-y-4 font-sans text-sm text-neutral-300">
                  <div className="flex items-start gap-3">
                    <span className="text-[#ff3333] font-mono font-bold mt-0.5 flex-shrink-0">&gt;</span>
                    <p>
                      <strong>Autonomous Catalog Scraper:</strong> Engineered multi-domain scraping pipelines
                      indexing 10k+ SKUs. Developed a six-stage fallback parser resolving HTML variations with 95%
                      classification accuracy and cutting benchmarking time by 80%.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[#ff3333] font-mono font-bold mt-0.5 flex-shrink-0">&gt;</span>
                    <p>
                      <strong>Uptime &amp; Health Sentinel:</strong> Built an automated monitoring platform
                      tracking 17 health vectors across 200+ domains with sub-second response times and zero
                      undetected outages.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-[#ff3333] font-mono font-bold mt-0.5 flex-shrink-0">&gt;</span>
                    <p>
                      <strong>Operations ERP Platform:</strong> Created supply chain and financial operations
                      dashboards with live two-way Google Sheets sync, processing 1k+ orders with 200 ms latency.
                    </p>
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-neutral-800/80 font-mono text-xs">
                  {["PHP", "Python", "MySQL", "Google Sheets API", "cURL Multi", "Cron Workers"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-[#ff3333]/10 text-[#ff4d4d] border border-[#ff3333]/25"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </LiveBuild>
        </div>
      </div>
    </section>
  );
}
