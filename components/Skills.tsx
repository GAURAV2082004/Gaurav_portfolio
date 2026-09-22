"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface Skill {
  name: string;
  level: number; // 1-100
}

interface SkillGroup {
  category: string;
  icon: string;
  skills: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    icon: "💻",
    skills: [
      { name: "Python", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "PHP", level: 88 },
      { name: "Java", level: 70 },
      { name: "SQL", level: 82 },
      { name: "C", level: 65 },
    ],
  },
  {
    category: "Backend & Databases",
    icon: "🗄️",
    skills: [
      { name: "REST APIs", level: 90 },
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "Node.js", level: 65 },
    ],
  },
  {
    category: "Data & Tools",
    icon: "🛠️",
    skills: [
      { name: "Power BI", level: 80 },
      { name: "OpenAI API", level: 85 },
      { name: "Google Apps Script", level: 82 },
      { name: "Git", level: 78 },
      { name: "SerpAPI", level: 75 },
    ],
  },
  {
    category: "Concepts",
    icon: "🧠",
    skills: [
      { name: "Machine Learning", level: 72 },
      { name: "Artificial Intelligence", level: 78 },
      { name: "Big Data Analysis", level: 70 },
      { name: "NLP", level: 68 },
      { name: "DSA", level: 80 },
    ],
  },
];

function SkillBadge({ skill }: { skill: Skill }) {
  const [clicked, setClicked] = useState(false);
  const [showBar, setShowBar] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setShowBar(true);
    setTimeout(() => setClicked(false), 300);
  };

  const handleLeave = () => {
    setTimeout(() => setShowBar(false), 400);
  };

  const levelLabel =
    skill.level >= 85 ? "Expert" :
    skill.level >= 75 ? "Advanced" :
    skill.level >= 65 ? "Intermediate" : "Familiar";

  const levelColor =
    skill.level >= 85 ? "#22d3ee" :
    skill.level >= 75 ? "#3b82f6" :
    skill.level >= 65 ? "#a855f7" : "#f59e0b";

  return (
    <div className="relative group" onMouseLeave={handleLeave}>
      <button
        onClick={handleClick}
        data-hover
        className={`relative overflow-hidden text-sm font-medium px-4 py-2 rounded-xl border transition-all duration-200 cursor-pointer select-none
          ${clicked
            ? "scale-90 bg-cyan-400/20 border-cyan-400 text-cyan-300"
            : "bg-gray-800/60 border-gray-700 text-gray-300 hover:border-cyan-500/60 hover:text-cyan-400 hover:bg-cyan-500/10 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
          }`}
      >
        {/* Shine sweep on hover */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        {skill.name}
      </button>

      {/* Proficiency tooltip on hover/click */}
      {showBar && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
          style={{ animation: "tooltip-pop 0.2s ease-out" }}
        >
          <div className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 shadow-2xl shadow-black/50 min-w-[140px]">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-gray-400 font-mono">{levelLabel}</span>
              <span className="font-bold" style={{ color: levelColor }}>{skill.level}%</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${skill.level}%`,
                  background: `linear-gradient(90deg, ${levelColor}99, ${levelColor})`,
                  boxShadow: `0 0 8px ${levelColor}`,
                  animation: "bar-fill 0.6s ease-out",
                }}
              />
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-700" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-cyan-400 font-mono text-sm">04.</span>
            <h2 className="text-3xl font-bold text-white">Skills</h2>
            <div className="flex-1 h-px bg-gray-800 ml-4" />
          </div>
          <p className="text-gray-500 text-sm mb-12 ml-10 font-mono">
            ✦ Click a skill to see proficiency level
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => (
            <ScrollReveal key={group.category} delay={gi * 100} direction="up">
              <div className="bg-gray-900 border border-gray-800 hover:border-cyan-500/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{group.icon}</span>
                  <h3 className="text-white font-semibold">{group.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
