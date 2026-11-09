"use client";

import ScrollReveal from "./ScrollReveal";

const certifications = [
  {
    title: "Power BI Course",
    issuer: "Infosys Springboard",
    year: "2025",
    certId: "HASH // INFOSYS-PBI-2025",
    icon: "📊",
    accent: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
    textAccent: "text-amber-400",
  },
  {
    title: "Generative AI Mastermind & Build AI Workflow",
    issuer: "GrowthSchool",
    year: "2024",
    certId: "HASH // GS-GENAI-WORKFLOW",
    icon: "🤖",
    accent: "from-red-500/20 to-rose-500/10 border-red-500/30",
    textAccent: "text-rose-400",
  },
  {
    title: "Pandas Library Certificate",
    issuer: "Kaggle",
    year: "2025",
    certId: "HASH // KAGGLE-PANDAS-2025",
    icon: "🐼",
    accent: "from-[#ff3333]/20 to-red-600/10 border-[#ff3333]/30",
    textAccent: "text-[#ff4d4d]",
  },
];

export default function CyberCertifications() {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          {/* Section Terminal Header */}
          <div className="flex items-center gap-3 mb-12 font-mono">
            <span className="text-[#ff3333] text-sm font-bold">[06]</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              // VERIFIED_CERTIFICATIONS
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#ff3333]/40 via-neutral-800 to-transparent ml-4" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={i * 80} direction="up">
              <div
                className={`cyber-panel cyber-panel-hover rounded-2xl p-6 border ${cert.accent} transition-all duration-300 corner-bracket flex flex-col justify-between h-full font-mono bg-[#0a0a0a]`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-3xl">{cert.icon}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      VERIFIED
                    </span>
                  </div>

                  <div className="text-[10px] text-neutral-500 mb-1">{cert.certId}</div>

                  <h3 className="text-white font-bold text-base mb-2 leading-snug group-hover:text-[#ff4d4d] transition-colors">
                    {cert.title}
                  </h3>

                  <p className={`text-sm font-medium ${cert.textAccent}`}>
                    {cert.issuer}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <span className="bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
                    YEAR: {cert.year}
                  </span>
                  <span className="text-[#ff4d4d] text-[11px] font-bold">
                    CREDENTIAL_VALID ✓
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
