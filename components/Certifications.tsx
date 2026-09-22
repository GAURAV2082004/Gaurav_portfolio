import ScrollReveal from "./ScrollReveal";

const certifications = [
  {
    title: "Power BI Course",
    issuer: "Infosys Springboard",
    year: "2025",
    icon: "📊",
    color: "from-yellow-500/20 to-orange-500/10 border-yellow-500/30",
    textColor: "text-yellow-400",
  },
  {
    title: "Generative AI Mastermind & Build AI Workflow",
    issuer: "GrowthSchool",
    year: "2024",
    icon: "🤖",
    color: "from-purple-500/20 to-pink-500/10 border-purple-500/30",
    textColor: "text-purple-400",
  },
  {
    title: "Pandas Library Certificate",
    issuer: "Kaggle",
    year: "2025",
    icon: "🐼",
    color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30",
    textColor: "text-cyan-400",
  },
];

export default function Certifications() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-cyan-400 font-mono text-sm">06.</span>
            <h2 className="text-3xl font-bold text-white">Certifications</h2>
            <div className="flex-1 h-px bg-gray-800 ml-4" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={i * 100} direction="up">
              <div
                data-hover
                className={`relative bg-gradient-to-br ${cert.color} border rounded-2xl p-7 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl group overflow-hidden cursor-default h-full flex flex-col justify-between`}
              >
                <div>
                  <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">{cert.icon}</div>
                  <h3 className="text-white font-bold text-base mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className={`text-sm font-medium ${cert.textColor}`}>
                    {cert.issuer}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-mono bg-black/40 px-2.5 py-1 rounded-full">{cert.year}</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <svg className={`w-4 h-4 ${cert.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
