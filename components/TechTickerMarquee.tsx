const TICKERS = [
  "Python", "PHP", "JavaScript", "TypeScript", "React", "Next.js",
  "Node.js", "FastAPI", "MySQL", "PostgreSQL", "Redis", "Docker",
  "OpenAI", "Whisper", "Tailwind", "Linux", "Bash", "Git",
];

export default function TechTickerMarquee() {
  // Double for seamless loop — the .track animation moves -50%
  const items = [...TICKERS, ...TICKERS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="track">
        {items.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
