"use client";
import React, { useState } from "react";

interface PromptItem {
  id: number;
  title: string;
  category: "Copywriting" | "Coding" | "Business Strategy" | "Marketing";
  tags: string[];
  beforeBadge: string;
  afterPreviewText: string;
  template: string;
  gradient: string;
}

export default function PromptLibMockupUI() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [selectedDrawerPrompt, setSelectedDrawerPrompt] = useState<PromptItem | null>(null);
  const [activeNav, setActiveNav] = useState("Library");
  const [searchQuery, setSearchQuery] = useState("");

  const promptCards: PromptItem[] = [
    {
      id: 1,
      title: "High-Converting B2B SaaS Landing Page Copy Engine",
      category: "Copywriting",
      tags: ["#copywriting", "#conversion", "#saas", "#cro"],
      beforeBadge: "Before: 1.2% Conv",
      afterPreviewText: "After: 3.8% Verified Lift",
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      template: `Act as a world-class direct response conversion copywriter. Analyze the following target audience: {{target_audience}} and primary value proposition: {{product_value_prop}}.

Generate a high-converting above-the-fold landing page structure:
1. Headline: 8-12 words highlighting the primary transformation.
2. Subheadline: 2 sentences removing technical friction and objection.
3. Primary CTA: Low-risk action copy with high-urgency trigger.
4. Social Proof Ribbon: 3 customer metric callouts.`,
    },
    {
      id: 2,
      title: "Zero-Shot Hexagonal Microservice Architect",
      category: "Coding",
      tags: ["#architecture", "#docker", "#clean-code", "#ddd"],
      beforeBadge: "Before: Monolith Sprawl",
      afterPreviewText: "After: Clean Ports & Adapters",
      gradient: "from-cyan-600 via-blue-600 to-indigo-600",
      template: `You are a Principal Software Architect. Given the functional microservice specifications: {{service_specs}}, output a complete domain-driven hexagonal architecture:
1. Inbound Adapters: REST controller endpoints & gRPC protobuf definitions.
2. Domain Core: Entity models, value objects, domain events.
3. Outbound Ports: MySQL 8 repositories, Redis distributed cache.
4. Orchestration: Production docker-compose.yml with health checks.`,
    },
    {
      id: 3,
      title: "360° Competitor Moat & Pricing Elasticity Matrix",
      category: "Business Strategy",
      tags: ["#strategy", "#pricing", "#market-intel", "#b2b"],
      beforeBadge: "Before: Generic SWot",
      afterPreviewText: "After: Unit Economics Moat",
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      template: `Conduct a rigorous competitor pricing & economic moat evaluation for: {{target_market}}.
Structure output as:
1. Pricing Tier Vulnerabilities: Competitor cost-per-seat vs margin spread.
2. Underserved ICP Segments: Churn hotspots in current market offerings.
3. 90-Day GTM Attack Vectors: Feature packaging to drive market capture.`,
    },
    {
      id: 4,
      title: "Viral LinkedIn & Twitter Technical Authority Thread",
      category: "Marketing",
      tags: ["#marketing", "#social", "#branding", "#growth"],
      beforeBadge: "Before: Low Impressions",
      afterPreviewText: "After: 48k Views & Shares",
      gradient: "from-purple-600 via-pink-600 to-rose-600",
      template: `Transform the following engineering milestone: {{technical_accomplishment}} into an engaging 6-part viral technical story.
Hook: Contrarian lesson learned shipping to 10,000+ users.
Body: Step-by-step breakdown of failure points, code bottlenecks, and the unexpected fix.
Conclusion: Open-ended question driving developer comments.`,
    },
  ];

  const handleCopy = (id: number, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filtered = promptCards.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-[#f9fafb] text-slate-800 rounded-xl overflow-hidden font-sans border border-[#e5e7eb] shadow-xl text-left select-none relative">
      {/* 1. HEADER BAR (Clean white header with royal electric blue accents #2463eb) */}
      <div className="bg-white border-b border-[#e5e7eb] px-4 md:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2463eb] flex items-center justify-center font-bold text-white text-sm shadow-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-extrabold text-slate-900 text-base tracking-tight">PromptLib</span>
          <span className="text-[10px] bg-blue-50 text-[#2463eb] font-mono font-bold px-2 py-0.5 rounded-full border border-blue-200">
            600+ CURATED PROMPTS
          </span>
        </div>

        {/* Centered Search Bar */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-[#e5e7eb] px-3.5 py-1.5 rounded-full w-72 text-xs text-slate-500">
          <span>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts, categories, tags..."
            className="bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none w-full font-mono text-[11px]"
          />
        </div>

        {/* Right Nav Controls */}
        <div className="flex items-center gap-3">
          <button className="text-slate-500 hover:text-slate-800 p-1 text-sm relative">
            <span>🔔</span>
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-blue-600" />
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-[#e5e7eb]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2463eb] to-[#1d4ed8] text-white font-bold text-xs flex items-center justify-center shadow-xs">
              GJ
            </div>
            <div className="hidden md:block leading-tight">
              <div className="text-xs font-bold text-slate-800">Gaurav Jadli</div>
              <div className="text-[10px] text-slate-400 font-mono">Editor & Admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DUAL-COLUMN LAYOUT (Left Compact Sidebar + Main Content) */}
      <div className="flex flex-col md:flex-row min-h-[480px]">
        {/* Left Navigation Sidebar */}
        <div className="w-full md:w-52 bg-white border-r border-[#e5e7eb] p-3 flex flex-col justify-between flex-shrink-0">
          <div className="space-y-1 text-xs font-semibold">
            {[
              { id: "Library", icon: "📚", count: "600+" },
              { id: "Admin Panel", icon: "⚙️", count: "CRUD" },
              { id: "Users Management", icon: "👥", count: "RBAC" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  activeNav === item.id
                    ? "bg-blue-50 text-[#2463eb] font-bold border-l-2 border-[#2463eb]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.id}</span>
                </div>
                <span className="text-[9px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                  {item.count}
                </span>
              </button>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mt-4 text-[11px] text-slate-600 font-mono">
            <div className="font-bold text-slate-800 mb-1">🔐 JWT Bearer Auth</div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Dual-login enabled via either Email or 10-digit Phone with Bcrypt hashing.
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 md:p-6 space-y-5 overflow-x-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">AI Prompt Templates</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Browse, test and 1-click copy battle-tested production prompts with Before/After performance metrics
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#2463eb] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full font-bold w-fit">
              ● REST API Limit/Offset Active
            </span>
          </div>

          {/* Sticky Horizontal Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border border-[#e5e7eb] shadow-xs">
            {["All", "Copywriting", "Coding", "Business Strategy", "Marketing"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#2463eb] text-white shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 3. 4-COLUMN RESPONSIVE GRID OF PROMPT CARD MODULES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {filtered.map((card) => (
              <div
                key={card.id}
                onClick={() => setSelectedDrawerPrompt(card)}
                className="bg-white rounded-xl border border-[#e5e7eb] hover:border-[#2463eb] p-3.5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* 4:3 Aspect Ratio Mockup Banner */}
                  <div className={`w-full h-28 rounded-lg bg-gradient-to-br ${card.gradient} p-2.5 flex flex-col justify-between text-white relative overflow-hidden shadow-inner mb-3`}>
                    {/* Floating Miniature "Before/After" Badge on Corner */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-black bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded border border-white/20 text-yellow-300">
                        {card.beforeBadge}
                      </span>
                      <span className="text-[9px] font-mono font-bold bg-emerald-500 text-white px-2 py-0.5 rounded shadow-xs">
                        ✓ {card.afterPreviewText}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono text-white/90 truncate bg-black/40 px-2 py-1 rounded backdrop-blur-xs">
                      prompt-template-v2.json
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#2463eb] transition-colors leading-snug line-clamp-2">
                    {card.title}
                  </h4>

                  {/* Small #tag Chips */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {card.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Actions: Blue "View Prompt" + 1-Click Copy */}
                <div className="flex items-center justify-between gap-1.5 pt-3 mt-3 border-t border-slate-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDrawerPrompt(card);
                    }}
                    className="text-[11px] font-bold text-[#2463eb] hover:text-[#1d4ed8] flex items-center gap-1"
                  >
                    <span>View Prompt</span> ↗
                  </button>

                  <button
                    onClick={(e) => handleCopy(card.id, card.template, e)}
                    className={`px-2 py-1 rounded-md text-[11px] font-mono font-bold flex items-center gap-1 transition-all ${
                      copiedId === card.id
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                    }`}
                  >
                    <span>{copiedId === card.id ? "✓ Copied!" : "📋 Copy"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Load More Button */}
          <div className="pt-2 text-center">
            <button className="px-5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-[#e5e7eb] rounded-lg text-xs font-bold font-mono shadow-xs transition-colors">
              Load More Prompts (Page 1 of 25)
            </button>
          </div>
        </div>
      </div>

      {/* 4. SLIDE-OVER DRAWER (RIGHT SIDE WITH MONOSPACE TEXTAREA & PROMINENT COPY CTA) */}
      {selectedDrawerPrompt && (
        <div
          onClick={() => setSelectedDrawerPrompt(null)}
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs flex justify-end z-30"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg h-full p-6 shadow-2xl flex flex-col justify-between border-l border-[#e5e7eb] text-left animate-fade-in overflow-y-auto"
          >
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2463eb]" />
                  <span className="text-xs font-mono font-bold text-[#2463eb] uppercase tracking-wider">
                    {selectedDrawerPrompt.category} // Detail Drawer
                  </span>
                </div>
                <button
                  onClick={() => setSelectedDrawerPrompt(null)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-mono px-2 py-1 rounded"
                >
                  ✕ Close
                </button>
              </div>

              {/* Title & Performance Badges */}
              <h3 className="text-base font-black text-slate-900 mt-4 leading-snug">
                {selectedDrawerPrompt.title}
              </h3>

              <div className="mt-2.5 flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                  {selectedDrawerPrompt.beforeBadge}
                </span>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                  {selectedDrawerPrompt.afterPreviewText}
                </span>
              </div>

              {/* Monospace Readonly Textarea */}
              <div className="mt-4">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Monospace Prompt Instructions:
                </label>
                <textarea
                  readOnly
                  value={selectedDrawerPrompt.template}
                  rows={8}
                  className="w-full p-3 bg-slate-900 text-cyan-300 font-mono text-xs rounded-xl border border-slate-800 leading-relaxed focus:outline-none resize-none shadow-inner"
                />
              </div>

              {/* Tag Metadata List */}
              <div className="mt-4">
                <span className="text-[11px] font-bold text-slate-600 block mb-1">Tags & Keywords:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDrawerPrompt.tags.map((tg) => (
                    <span key={tg} className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2 mt-4">
              <button
                onClick={() => setSelectedDrawerPrompt(null)}
                className="text-xs text-slate-500 font-semibold px-3 py-2 hover:text-slate-800"
              >
                Back to Grid
              </button>

              <button
                onClick={(e) => handleCopy(selectedDrawerPrompt.id, selectedDrawerPrompt.template, e)}
                className="bg-[#2463eb] hover:bg-[#1d4ed8] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <span>{copiedId === selectedDrawerPrompt.id ? "✓ Copied to Clipboard!" : "📋 Copy Prompt Template"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
