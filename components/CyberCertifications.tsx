"use client";

import LiveBuild from "./LiveBuild";
import Typed from "./Typed";

const certifications = [
  {
    title: "Power BI Course",
    issuer: "Infosys Springboard",
    year: "2025",
    icon: "📊",
    accent: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
    textAccent: "text-amber-400",
  },
  {
    title: "Generative AI Mastermind & Build AI Workflow",
    issuer: "GrowthSchool",
    year: "2024",
    icon: "🤖",
    accent: "from-red-500/20 to-rose-500/10 border-red-500/30",
    textAccent: "text-rose-400",
  },
  {
    title: "Pandas Library Certificate",
    issuer: "Kaggle",
    year: "2025",
    icon: "🐼",
    accent: "from-[#ff3333]/20 to-red-600/10 border-[#ff3333]/30",
    textAccent: "text-[#ff4d4d]",
  },
];

export default function CyberCertifications() {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <LiveBuild id="certifications-heading">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-12 font-mono">
            <span className="text-[#ff3333] text-sm font-bold">[06]</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              <Typed>Certifications</Typed>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#ff3333]/40 via-neutral-800 to-transparent ml-4" />
          </div>
        </LiveBuild>

        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <LiveBuild key={cert.title} id={`cert-${i}`}>
              <div
                className={`cyber-panel cyber-panel-hover rounded-2xl p-6 border ${cert.accent} transition-all duration-300 corner-bracket flex flex-col justify-between h-full font-mono bg-[#0a0a0a]`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-3xl">{cert.icon}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Verified
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-base mb-2 leading-snug group-hover:text-[#ff4d4d] transition-colors">
                    {cert.title}
                  </h3>

                  <div className="text-xs text-neutral-400 mb-4">{cert.issuer}</div>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
                  <span>Issued</span>
                  <span className="text-neutral-300 font-bold">{cert.year}</span>
                </div>
              </div>
            </LiveBuild>
          ))}
        </div>
      </div>
    </section>
  );
}
