import ScrollReveal from "./ScrollReveal";

const highlights = [
  { label: "Production Tools Built", value: "7+", icon: "⚙️" },
  { label: "Projects Shipped", value: "5", icon: "🚀" },
  { label: "Certifications", value: "3", icon: "📜" },
  { label: "Expected Graduation", value: "2026", icon: "🎓" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="text-cyan-400 font-mono text-sm">01.</span>
            <h2 className="text-3xl font-bold text-white">About Me</h2>
            <div className="flex-1 h-px bg-gray-800 ml-4" />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="space-y-5 text-gray-400 leading-relaxed">
              <p>
                I&apos;m a Computer Engineering student at{" "}
                <span className="text-cyan-400 font-medium">Pillai College of Engineering, University of Mumbai</span>,
                graduating in 2026. I build full-stack web applications, automation systems, and AI-powered tools.
              </p>
              <p>
                During my internship at{" "}
                <span className="text-cyan-400 font-medium">Blank Analytica</span>
                , I built and deployed 7+ production automation tools using PHP and Python, developed BI dashboards,
                and owned features end-to-end — from requirements through to deployment.
              </p>
              <p>
                I&apos;m passionate about building systems at scale — whether it&apos;s a price intelligence scraper
                handling 10,000+ products, a real-time uptime monitor tracking 200+ websites, or an AI-powered
                productivity assistant using OpenAI GPT-4o-mini.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 80} direction="fade">
                <div className="bg-gray-950 border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/15 group cursor-default">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 mb-2 group-hover:scale-110 transition-transform duration-200">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
