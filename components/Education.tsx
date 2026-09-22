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


export default function Education() {
  return (
    <section id="education" className="py-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-cyan-400 font-mono text-sm">05.</span>
            <h2 className="text-3xl font-bold text-white">Education</h2>
            <div className="flex-1 h-px bg-gray-800 ml-4" />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="bg-gray-950 border border-gray-800 hover:border-cyan-500/40 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 group relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl group-hover:scale-125 transition-transform duration-200">🎓</span>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    Pillai College of Engineering
                  </h3>
                </div>
                <p className="text-gray-400 ml-12">University of Mumbai</p>
                <p className="text-cyan-400 font-medium ml-12 mt-1">
                  B.Tech in Computer Engineering
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                <span className="text-sm font-mono text-gray-400 bg-gray-900 border border-gray-800 px-3.5 py-1.5 rounded-full">
                  2022 – 2026
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">CGPA:</span>
                  <span className="text-lg font-bold text-cyan-400">6.24</span>
                  <span className="text-xs text-gray-500">/ 10</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800/80">
              <p className="text-xs text-gray-500 mb-3 font-mono uppercase tracking-wider">
                Relevant Coursework
              </p>
              <div className="flex flex-wrap gap-2">
                {courses.map((course) => (
                  <span
                    key={course}
                    data-hover
                    className="text-xs font-mono text-gray-300 bg-gray-900 border border-gray-800 hover:border-cyan-500/40 hover:text-cyan-400 px-3 py-1.5 rounded-lg transition-colors cursor-default"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
