import ScrollReveal from "./ScrollReveal";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-cyan-400 font-mono text-sm">02.</span>
            <h2 className="text-3xl font-bold text-white">Experience</h2>
            <div className="flex-1 h-px bg-gray-800 ml-4" />
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 to-transparent ml-4 hidden md:block" />

          <ScrollReveal direction="left" delay={100}>
            <div className="md:pl-12">
              <div className="relative bg-gray-900 border border-gray-800 hover:border-cyan-500/40 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 group overflow-hidden">
                {/* Shine sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

                <div className="absolute -left-[2.85rem] top-8 w-4 h-4 rounded-full bg-cyan-500 border-4 border-gray-950 hidden md:block animate-glow-pulse" />

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Software Engineering Intern</h3>
                    <p className="text-cyan-400 font-medium mt-1">Blank Analytica</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 font-mono bg-gray-950 px-3 py-1.5 rounded-full border border-gray-800 whitespace-nowrap">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Dec 2025 – Jun 2026
                  </div>
                </div>

                <ul className="space-y-3">
                  {[
                    "Built and deployed 7+ production automation tools in PHP and Python, eliminating manual workflows across reporting, scheduling, and data management.",
                    "Developed BI dashboards and automated data pipelines to surface real-time operational KPIs for management and cross-functional teams.",
                    "Owned features end-to-end from requirements through deployment, translating stakeholder needs into production tools.",
                  ].map((point, i) => (
                    <li key={i} className="flex gap-3 text-gray-400">
                      <span className="text-cyan-500 mt-1.5 flex-shrink-0">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["PHP", "Python", "Power BI", "Data Pipelines", "Automation"].map((tech) => (
                    <span key={tech} className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
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
