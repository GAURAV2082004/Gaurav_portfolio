"use client";

import ScrollReveal from "./ScrollReveal";

const courses = [
  "Data Structures & Algorithms",
  "Operating Systems",
  "Computer Networks",
  "Database Management Systems",
  "Machine Learning & AI",
  "Big Data Analysis",
  "Natural Language Processing",
  "Software Engineering",
];

export default function CyberEducation() {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          {/* Section Terminal Header */}
          <div className="flex items-center gap-3 mb-12 font-mono">
            <span className="text-cyan-400 text-sm font-bold">[05]</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              // ACADEMIC_FOUNDATION
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 via-gray-800 to-transparent ml-4" />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="cyber-panel cyber-panel-hover rounded-2xl p-6 sm:p-8 corner-bracket border border-cyan-500/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 pb-6 border-b border-gray-800 font-mono">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-2xl flex-shrink-0">
                  🎓
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-cyan-400 font-bold tracking-wider">
                      [INSTITUTION_ID: MUMBAI_UNIV]
                    </span>
                    <span className="text-gray-600">//</span>
                    <span className="text-xs text-emerald-400">ENROLLED</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Pillai College of Engineering
                  </h3>
                  <p className="text-gray-400 text-sm mt-0.5">University of Mumbai</p>
                  <p className="text-cyan-300 font-medium text-base mt-2">
                    B.Tech in Computer Engineering
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-2">
                <span className="text-xs text-gray-400 bg-gray-950 px-3.5 py-1.5 rounded-lg border border-gray-800">
                  📅 2022 – 2026
                </span>
                <div className="flex items-center gap-2 bg-gray-950 px-3.5 py-1.5 rounded-lg border border-cyan-500/30">
                  <span className="text-xs text-gray-400">CGPA:</span>
                  <span className="text-base font-extrabold text-cyan-300">6.24</span>
                  <span className="text-xs text-gray-500">/ 10</span>
                </div>
              </div>
            </div>

            {/* Coursework Terminal Grid */}
            <div className="font-mono">
              <div className="text-xs text-gray-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
                <span className="text-cyan-400">&gt;</span> RELEVANT_COMPUTER_ENGINEERING_COURSEWORK:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {courses.map((course) => (
                  <div
                    key={course}
                    className="p-3 rounded-lg bg-gray-950/70 border border-gray-800/80 text-xs text-gray-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 flex-shrink-0" />
                    <span className="truncate">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
