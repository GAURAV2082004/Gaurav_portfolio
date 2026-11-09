"use client";

const TECH_ITEMS = [
  { name: "React 19", tag: "FRONTEND", icon: "⚛️" },
  { name: "TypeScript", tag: "LANG", icon: "🔷" },
  { name: "Next.js", tag: "FRAMEWORK", icon: "▲" },
  { name: "Python", tag: "AI/AUTOMATION", icon: "🐍" },
  { name: "Node.js", tag: "RUNTIME", icon: "🟢" },
  { name: "PostgreSQL", tag: "DATABASE", icon: "🐘" },
  { name: "PHP 8", tag: "BACKEND", icon: "🐘" },
  { name: "MySQL 8", tag: "DATABASE", icon: "🐬" },
  { name: "Redis", tag: "CACHE", icon: "⚡" },
  { name: "Kafka", tag: "EVENT_STREAM", icon: "📨" },
  { name: "Docker", tag: "DEVOPS", icon: "🐳" },
  { name: "FastAPI", tag: "API", icon: "⚡" },
  { name: "OpenAI Whisper-1", tag: "AI_AUDIO", icon: "🎙️" },
  { name: "Tailwind CSS", tag: "STYLING", icon: "🎨" },
  { name: "Linux / Bash", tag: "SYSTEMS", icon: "🐧" },
];

export default function TechTickerMarquee() {
  // Duplicate array for seamless infinite marquee loop
  const displayItems = [...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div className="relative w-full overflow-hidden border-y border-[#ff3333]/20 bg-[#050505]/90 backdrop-blur-md py-2.5 z-20">
      {/* Left & Right Gradient Shadows for seamless fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#050505] to-transparent z-10" />

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee space-x-6 sm:space-x-8">
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-2 font-mono text-xs text-gray-300 hover:text-white transition-colors cursor-default select-none"
          >
            <span className="text-sm">{item.icon}</span>
            <span className="font-bold text-gray-100 tracking-wider">{item.name}</span>
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#ff3333]/10 border border-[#ff3333]/30 text-[#ff4d4d]">
              {item.tag}
            </span>
            <span className="text-[#ff3333]/50 pl-2">●</span>
          </div>
        ))}
      </div>
    </div>
  );
}
