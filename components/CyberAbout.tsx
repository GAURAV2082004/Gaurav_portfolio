"use client";

import CyberBoxAgent from "./CyberBoxAgent";
import { sound } from "@/lib/audio";
import { ABOUT_HIGHLIGHTS } from "@/data/stats";
import LiveBuild from "./LiveBuild";
import Typed from "./Typed";

export default function CyberAbout() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <LiveBuild id="about-heading">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-12 font-mono">
            <span className="text-[#ff3333] text-sm font-bold">[01]</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              <Typed>About</Typed>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#ff3333]/40 via-neutral-800 to-transparent ml-4" />
          </div>
        </LiveBuild>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Code Manifest (6 cols) */}
          <div className="lg:col-span-6">
            <LiveBuild id="about-manifest" isGraphic>
              <div
                onClick={() => sound.playClick(850)}
                className="cyber-panel rounded-2xl overflow-hidden corner-bracket border border-[#ff3333]/30 shadow-2xl relative cursor-pointer"
              >
                {/* Box Agent */}
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
                      yPercent: 55,
                      action: "click",
                      targetLabel: "DEGREE_RECORD",
                      statusText: "Auditing: B.Tech in Computer Engineering",
                      pause: 2200,
                    },
                  ]}
                />

                <div className="px-4 py-3 bg-neutral-900/90 border-b border-neutral-800/80 flex items-center justify-between font-mono text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-neutral-300 font-semibold">manifest.json</span>
                  </div>
                  <span className="text-[10px] text-[#ff4d4d] bg-[#ff3333]/10 border border-[#ff3333]/30 px-2 py-0.5 rounded">
                    READ_ONLY
                  </span>
                </div>

                <div className="p-5 font-mono text-xs leading-relaxed text-neutral-300 space-y-1.5 overflow-x-auto bg-[#050505]/95">
                  <p className="text-neutral-500">{"{"}</p>
                  <p className="pl-4">
                    <span className="text-[#ff4d4d]">&quot;engineer&quot;</span>:{" "}
                    <span className="text-emerald-300">&quot;Gaurav Shailendra Jadli&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-[#ff4d4d]">&quot;role&quot;</span>:{" "}
                    <span className="text-emerald-300">&quot;Software Developer // AI &amp; Automation&quot;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-[#ff4d4d]">&quot;education&quot;</span>: {"{"}
                  </p>
                  <p className="pl-8">
                    <span className="text-[#ff4d4d]">&quot;degree&quot;</span>:{" "}
                    <span className="text-emerald-300">&quot;B.Tech in Computer Engineering&quot;</span>,
                  </p>
                  <p className="pl-8">
                    <span className="text-[#ff4d4d]">&quot;institution&quot;</span>:{" "}
                    <span className="text-emerald-300">&quot;Pillai College of Engineering&quot;</span>,
                  </p>
                  <p className="pl-8">
                    <span className="text-[#ff4d4d]">&quot;university&quot;</span>:{" "}
                    <span className="text-emerald-300">&quot;University of Mumbai&quot;</span>,
                  </p>
                  <p className="pl-8">
                    <span className="text-[#ff4d4d]">&quot;timeline&quot;</span>:{" "}
                    <span className="text-emerald-300">&quot;2022 – 2026&quot;</span>
                  </p>
                  <p className="pl-4">{"},"}</p>
                  <p className="pl-4">
                    <span className="text-[#ff4d4d]">&quot;production_metrics&quot;</span>: {"{"}
                  </p>
                  <p className="pl-8">
                    <span className="text-[#ff4d4d]">&quot;tools_shipped&quot;</span>:{" "}
                    <span className="text-amber-300">&quot;7+ in Production&quot;</span>,
                  </p>
                  <p className="pl-8">
                    <span className="text-[#ff4d4d]">&quot;catalog_scale&quot;</span>:{" "}
                    <span className="text-amber-300">&quot;10k+ SKUs&quot;</span>,
                  </p>
                  <p className="pl-8">
                    <span className="text-[#ff4d4d]">&quot;domains_monitored&quot;</span>:{" "}
                    <span className="text-amber-300">&quot;200+ Sites&quot;</span>,
                  </p>
                  <p className="pl-8">
                    <span className="text-[#ff4d4d]">&quot;uptime_benchmark&quot;</span>:{" "}
                    <span className="text-cyan-300">&quot;99.98%&quot;</span>
                  </p>
                  <p className="pl-4">{"},"}</p>
                  <p className="pl-4">
                    <span className="text-[#ff4d4d]">&quot;core_stack&quot;</span>: [
                  </p>
                  <p className="pl-8 text-neutral-400">
                    &quot;PHP&quot;, &quot;Python&quot;, &quot;MySQL&quot;, &quot;Next.js&quot;, &quot;Tailwind CSS&quot;, &quot;OpenAI GPT-4&quot;
                  </p>
                  <p className="pl-4">]</p>
                  <p className="text-neutral-500">{"}"}</p>
                </div>
              </div>
            </LiveBuild>
          </div>

          {/* Right Column: Bio Narrative & High-Impact Pillars (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <LiveBuild id="about-narrative">
              <div className="space-y-4 text-neutral-300 leading-relaxed font-sans text-sm sm:text-base">
                <p>
                  <Typed>
                    I engineer backend automation architectures, real-time telemetry pipelines, and enterprise
                    tools. My focus is building robust systems that eliminate manual overhead and run continuously
                    without failures.
                  </Typed>
                </p>
                <p>
                  <Typed>
                    At Blank Analytica, I developed high-throughput scrapers handling 10k+ SKUs across complex
                    anti-bot layouts, created multi-vector uptime sentinels monitoring 200+ domains, and built
                    ERP platforms with live two-way Google Sheets synchronization.
                  </Typed>
                </p>
              </div>
            </LiveBuild>

            {/* 4 Quantitative Highlights Grid */}
            <div className="grid grid-cols-2 gap-3.5 pt-2 font-mono">
              {ABOUT_HIGHLIGHTS.map((item, i) => (
                <LiveBuild key={item.label} id={`about-highlight-${i}`}>
                  <div className="cyber-panel p-4 rounded-xl border border-neutral-800 hover:border-[#ff3333]/40 transition-colors bg-[#0a0a0a]">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-neutral-400 uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-base">{item.icon}</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {item.value}
                    </div>
                    <div className="text-[11px] text-[#ff4d4d] mt-0.5">{item.sub}</div>
                  </div>
                </LiveBuild>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
