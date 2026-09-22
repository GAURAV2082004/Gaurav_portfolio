import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12 justify-center">
            <div className="flex-1 max-w-24 h-px bg-gray-800" />
            <span className="text-cyan-400 font-mono text-sm">07. contact</span>
            <div className="flex-1 max-w-24 h-px bg-gray-800" />
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Get In <span className="animate-shimmer">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
            I&apos;m currently open to internship and full-time opportunities. Whether
            you have a question, a project idea, or just want to connect —
            my inbox is always open!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="mailto:jadligaurav2082004@gmail.com"
              data-hover
              className="btn-magnetic px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-1 text-lg w-full sm:w-auto flex items-center justify-center gap-2 animate-glow-pulse"
            >
              <span>Say Hello</span>
              <span className="text-xl">👋</span>
            </a>
            <a
              href="https://linkedin.com/in/gauravjadli04"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="btn-magnetic px-8 py-4 border border-gray-700 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 font-bold rounded-xl transition-all duration-200 hover:-translate-y-1 text-lg w-full sm:w-auto"
            >
              LinkedIn →
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 font-mono">
            <a
              href="https://github.com/GAURAV2082004"
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              className="hover:text-cyan-400 transition-colors"
            >
              🐙 github.com/GAURAV2082004
            </a>
            <span className="text-gray-700">·</span>
            <a
              href="mailto:jadligaurav2082004@gmail.com"
              data-hover
              className="hover:text-cyan-400 transition-colors"
            >
              ✉️ jadligaurav2082004@gmail.com
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-gray-800/80 text-center">
        <p className="text-gray-500 text-sm font-mono">
          Engineered with Next.js & Tailwind CSS · Live on Vercel
        </p>
        <p className="text-gray-600 text-xs mt-2">
          © {new Date().getFullYear()} Gaurav Shailendra Jadli. All rights reserved.
        </p>
      </div>
    </section>
  );
}
