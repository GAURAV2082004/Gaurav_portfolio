"use client";
import { useState } from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import SiteIntelMockupUI from "./SiteIntelMockupUI";
import ScmAnalyticsMockupUI from "./ScmAnalyticsMockupUI";
import WorkPlannerMockupUI from "./WorkPlannerMockupUI";
import PromptLibMockupUI from "./PromptLibMockupUI";
import CompeteIntelMockupUI from "./CompeteIntelMockupUI";

interface Project {
  id: string;
  title: string;
  tagline: string;
  date: string;
  category: "AI & Automation" | "Web & Cloud" | "Data & Analytics";
  builtFor?: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  accentGradient: string;
  accentBorder: string;
  icon: string;
  imagePath: string;
  imageAlt: string;
  demoUrl?: string;
  isPrivate: boolean;
  technicalChallenge: string;
  keyOutcomes: string[];
  mockupHeader: {
    type: string;
    title: string;
    badge: string;
  };
  mockupContent: {
    kpis?: { label: string; val: string; sub?: string }[];
    codeSnippets?: string[];
    terminalLogs?: string[];
    features?: string[];
  };
  deepArchitecture: {
    title: string;
    items: string[];
  };
}

const projects: Project[] = [
  {
    id: "price-intel",
    title: "Competitor Price Intelligence Platform",
    tagline: "Autonomous multi-domain scraping & live comparative pricing matrix engine",
    date: "Mar 2026",
    category: "AI & Automation",
    tech: ["PHP", "Python", "Google Apps Script", "SerpAPI", "OpenAI GPT-4", "JSON-LD"],
    accentGradient: "from-purple-600 via-indigo-600 to-blue-500",
    accentBorder: "group-hover:border-purple-500/50",
    icon: "⚡",
    imagePath: "/projects/price-intel.jpg",
    imageAlt: "Competitor Price Intelligence Platform Dashboard & Comparative Pricing Matrix UI",
    isPrivate: true,
    technicalChallenge:
      "Large scraping runs frequently triggered Google Apps Script 4–6 minute execution timeouts and HTTP 524 origin errors. Engineered a progressive batched job queue (5 products/chunk with rate-limiting backoff) and built a 6-stage fallback parser (Title → Regex Patterns → Breadcrumbs → OpenGraph/Meta → URL Paths → JSON-LD) to normalize wildly inconsistent category taxonomies across disparate competitor sites into standard schemas.",
    keyOutcomes: [
      "Scaled scraping pipeline to catalog 10,000+ products across competitor domains without hitting server timeouts or IP blocks.",
      "Achieved 95%+ category classification accuracy across non-standard HTML structures using multi-layer heuristics.",
      "Cut manual competitor price benchmarking time by ~80%, enabling 1-click pricing matrix comparisons & CSV exports.",
    ],
    metrics: [
      { label: "Catalog Scale", value: "10,000+ SKUs" },
      { label: "Accuracy", value: "95%+" },
      { label: "Manual Effort Cut", value: "~80%" },
    ],
    mockupHeader: {
      type: "MATRIX CONSOLE",
      title: "competitor-discovery // batch-queue.worker",
      badge: "ACTIVE PIPELINE",
    },
    mockupContent: {
      kpis: [
        { label: "Batched Execution", val: "5 SKUs/chunk", sub: "Timeout Safe" },
        { label: "Category Accuracy", val: "95.4%", sub: "6-Layer Fallback" },
        { label: "Price Matrix", val: "Live Grid", sub: "Export CSV Ready" },
      ],
      terminalLogs: [
        "[QUEUE] Worker chunk #42 completed (5 products parsed in 3.4s)",
        "[PARSER] Fallback Tier 4 (JSON-LD Microdata) extracted SKU #8410",
        "[AI MATCH] SerpAPI competitor price discovered: $24.99 vs our $27.50 (Diff: -9.1%)",
        "[STATUS] 10,000 domain targets synchronized with zero HTTP 524 timeouts",
      ],
    },
    deepArchitecture: {
      title: "6-Stage Resilient Extraction Engine",
      items: [
        "Tier 1: Document title heuristic regex cleansing",
        "Tier 2: URL slug pattern taxonomy normalization",
        "Tier 3: Breadcrumb schema graph walker",
        "Tier 4: OpenGraph & Twitter card meta tags",
        "Tier 5: Deep JSON-LD Product & Offer schema parser",
        "Tier 6: SerpAPI + OpenAI fallback competitor discovery",
      ],
    },
  },
  {
    id: "site-intel",
    title: "SiteIntel — Uptime & Anomaly Sentinel",
    tagline: "Autonomous health watchdog monitoring 17+ mission-critical vectors across 200+ domains",
    date: "May 2026",
    category: "Web & Cloud",
    tech: ["PHP 8", "MySQL 8", "PHPMailer (SMTP)", "Low-Latency cURL Multi", "CSS Watchers", "Cron Workers"],
    accentGradient: "from-cyan-500 via-teal-500 to-emerald-500",
    accentBorder: "group-hover:border-cyan-500/50",
    icon: "🛡️",
    imagePath: "/projects/siteintel.jpg",
    imageAlt: "SiteIntel Real-Time DevOps Uptime & DOM Anomaly Detection Sentinel UI",
    isPrivate: true,
    technicalChallenge:
      "Achieving sub-second inspection across 200+ production domains without thread saturation. Built a modular checkers engine (uptime-cron.php & file-integrity-cron.php) executing low-latency cURL inspection for headers, HTTP 200 OK verification, SSL cert validity, and WHOIS socket lookup, paired with an SVG circular health score gauge.",
    keyOutcomes: [
      "Monitored 17+ mission-critical health vectors with automated scheduled validation and sub-second API responses.",
      "Zero undetected outages across all test and client domains with instant degradation alerting.",
      "Dual-tier email alerting via SMTP (PHPMailer) separating critical failures from warnings with custom alert thresholds.",
    ],
    metrics: [
      { label: "Health Vectors", value: "17+ Monitored" },
      { label: "Monitored Sites", value: "200+ Domains" },
      { label: "Undetected Outages", value: "Zero (100%)" },
    ],
    mockupHeader: {
      type: "SENTINEL AUDIT",
      title: "siteintel // health-score-gauge.svg",
      badge: "17 VECTORS HEALTHY",
    },
    mockupContent: {
      kpis: [
        { label: "Uptime Sentinel", val: "99.98%", sub: "Rolling 30-Day" },
        { label: "Check Engine", val: "< 450ms", sub: "cURL Multi Socket" },
        { label: "SMTP Dispatch", val: "PHPMailer", sub: "Instant Trigger" },
      ],
      terminalLogs: [
        "[CHECK:HTTP] 200 OK response received in 182ms (SSL valid: 284 days left)",
        "[CHECK:DOM] CSS watcher selector verified content integrity: NO DRIFT",
        "[CHECK:FTP] Secure socket handshake authenticated successfully",
        "[SENTINEL] Audit log written to MySQL 8 with JSON diagnostic telemetry",
      ],
    },
    deepArchitecture: {
      title: "Sentinel Health Vectors Monitored",
      items: [
        "HTTP/HTTPS Status & Response Code validation (200 OK)",
        "SSL Certificate expiration countdown & cipher audit",
        "HTML/DOM Content Drift & Defacement CSS Watcher",
        "WHOIS Socket lookup for domain expiration vigilance",
        "FTP/SFTP Port handshake & latency benchmarks",
        "SMTP Alert Dispatcher with Warning vs Failure thresholds",
      ],
    },
  },
  {
    id: "scm-analytics",
    title: "Real-Time Sales & SCM Analytics Engine",
    tagline: "Enterprise operations ERP & supply chain telemetry with 2-way live Google Sheets sync",
    date: "May 2026",
    category: "Data & Analytics",
    builtFor: "Wacky Brandhub International",
    demoUrl: "https://site23359-uw0p89.scloudsite101.com/backup%20files/latest%20(2)/Wackybrandhub_International/",
    isPrivate: false,
    tech: ["PHP", "MySQL", "Google Sheets API", "Google Apps Script", "ApexCharts", "OAuth 2.0"],
    accentGradient: "from-emerald-500 via-teal-600 to-cyan-600",
    accentBorder: "group-hover:border-emerald-500/50",
    icon: "📊",
    imagePath: "/projects/scm-analytics.jpg",
    imageAlt: "Wacky Brandhub International SCM Procurement & Financial Analytics Dashboard",
    technicalChallenge:
      "Built as an enterprise operations ERP & SCM platform for Wacky Brandhub International. Eliminating UI latency while keeping live Google Sheets synchronicity intact. Developed a hybrid synchronization engine (js/sheets-api.js + api/db.php) where changes trigger async Apps Script webhooks while MySQL caching guarantees instant 200ms dashboard loads.",
    keyOutcomes: [
      "Live Financial & Profitability tracking: Total Revenue, Purchase Costs, Operating Expenses, and Net/Gross margins via ApexCharts.",
      "Multi-channel sales telemetry covering WhatsApp, Google Forms, and Direct orders with unit buying vs selling price spreads.",
      "Vendor Sourcing queue with top-20 vendor spend analysis, balance amount adjustment modals, and customer receivable ledgers.",
    ],
    metrics: [
      { label: "Customers & Orders", value: "500+ / 1,000+" },
      { label: "Dashboard Latency", value: "200ms (Cached)" },
      { label: "Sync Protocol", value: "2-Way Webhook" },
    ],
    mockupHeader: {
      type: "ENTERPRISE ERP",
      title: "wacky-brandhub // scm-analytics.dashboard",
      badge: "LIVE ERP DEMO",
    },
    mockupContent: {
      kpis: [
        { label: "Gross Margins", val: "ApexCharts", sub: "Monthly Line/Bar" },
        { label: "Sheets Live Sync", val: "Hybrid API", sub: "2-Way Webhooks" },
        { label: "Balance Ledger", val: "Client/Vendor", sub: "360° KPI Cards" },
      ],
      terminalLogs: [
        "[ERP] Order #1042 recorded -> Dispatched webhook to Google Apps Script",
        "[SYNC] 2-way Google Sheets row synchronized with zero latency stall",
        "[METRIC] Unit buying price vs selling spread calculated: +34.8% gross margin",
        "[LEDGER] Dynamic balance claim adjusted for vendor return SKU #WH-209",
      ],
    },
    deepArchitecture: {
      title: "Enterprise ERP Modules Built",
      items: [
        "ApexCharts Monthly Gross Margin & Category Revenue Breakdown",
        "Dynamic Balance Amount Adjustment & Dispute Management Modal",
        "Vendor Sourcing & Procurement Queue with live margin alerts",
        "Multi-channel sales pipeline (WhatsApp, Google Forms, Direct)",
        "Customer 360° financial receivable ledger & credit claims",
      ],
    },
  },
  {
    id: "ai-work-planner",
    title: "AI-Powered Work & Calendar Planner",
    tagline: "Conversational productivity orchestrator with Whisper voice parsing & offline Kanban board",
    date: "Jun 2026",
    category: "AI & Automation",
    isPrivate: true,
    tech: ["PHP", "OpenAI Whisper API (whisper-1)", "OpenAI GPT-4o-mini", "Google Calendar & Tasks API", "OAuth 2.0", "IndexedDB/localStorage"],
    accentGradient: "from-amber-500 via-orange-600 to-rose-600",
    accentBorder: "group-hover:border-amber-500/50",
    icon: "🤖",
    imagePath: "/projects/ai-work-planner.jpg",
    imageAlt: "AI-Powered Work & Calendar Planner UI with Whisper Waveform and Kanban Task Board",
    technicalChallenge:
      "Parsing ambiguous conversational speech into deterministic calendar actions with strict timezone normalization. Integrated Whisper API audio transcription with GPT-4o-mini structured JSON outputs, combined with a PHP Deterministic Action Router that computes recurrence rules (RRULE) and handles continuous lead-up reminder countdowns.",
    keyOutcomes: [
      "Whisper API (whisper-1) voice transcription with browser microphone recording and audio (.webm) multipart processing.",
      "Deterministic Action Router normalizing timezone-safe start/end times with dry-run verification mode.",
      "Drag-and-drop Kanban task board (Inbox, Upcoming, In Progress, Done) coupled with offline local persistence & semantic note search.",
    ],
    metrics: [
      { label: "Voice Model", value: "Whisper-1" },
      { label: "JSON Parser", value: "GPT-4o-mini" },
      { label: "Calendar Sync", value: "Google OAuth 2.0" },
    ],
    mockupHeader: {
      type: "AI ORCHESTRATOR",
      title: "planner.ai // voice-whisper-engine",
      badge: "WHISPER-1 ACTIVE",
    },
    mockupContent: {
      kpis: [
        { label: "Voice Input", val: "Whisper-1", sub: ".webm Multipart" },
        { label: "Action Router", val: "iCal RRULE", sub: "Timezone-Safe" },
        { label: "Task Board", val: "4-Col Kanban", sub: "Offline IndexedDB" },
      ],
      terminalLogs: [
        "Audio (.webm) received -> Whisper API transcribed: 'Schedule sprint review Friday 3pm'",
        "GPT-4o-mini output: { action: 'CALENDAR_CREATE', title: 'Sprint Review', time: '15:00', leadupReminders: [60, 15] }",
        "Google OAuth 2.0 session validated -> Event inserted into primary calendar",
        "Kanban board item auto-created in 'Upcoming' column with offline cache",
      ],
    },
    deepArchitecture: {
      title: "AI & Productivity Capabilities",
      items: [
        "OpenAI Whisper API audio transcription (.webm stream ingestion)",
        "GPT-4o-mini structured JSON schema response formatting",
        "Continuous reminder sequences (1-hour/lead-up calendar countdowns)",
        "iCalendar RRULE generation for complex daily/weekly cadences",
        "Drag-and-drop Kanban task board (Inbox, Upcoming, In Progress, Done)",
        "Semantic keyword note search & offline preview state caching",
      ],
    },
  },
  {
    id: "prompt-lib",
    title: "PromptLib — Enterprise Prompt Engineering Hub",
    tagline: "Curated library serving 600+ prompts with JWT dual-login & slide-in drawer",
    date: "Jun 2026",
    category: "Web & Cloud",
    isPrivate: true,
    tech: ["PHP", "MySQL", "JavaScript SPA", "Tailwind CSS", "JWT Bearer Auth", "RBAC"],
    accentGradient: "from-fuchsia-500 via-pink-600 to-purple-600",
    accentBorder: "group-hover:border-fuchsia-500/50",
    icon: "📚",
    imagePath: "/projects/promptlib.jpg",
    imageAlt: "PromptLib Curated Prompt Engineering Platform UI with Slide-In Code Drawer",
    technicalChallenge:
      "Architecting a scalable, high-throughput prompt catalog serving 600+ curated prompts across Copywriting, Coding, and Business Strategy with slide-in detail views, instant 1-click clipboard copying, and fine-grained Role-Based Access Control (RBAC).",
    keyOutcomes: [
      "Curated library of 600+ prompts with instant 1-click clipboard copy feedback and variable tag chips.",
      "Slide-in detail drawer featuring prompt templates, tags, timestamps, and Before/After comparison image badges.",
      "JWT Bearer authentication supporting dual-login via either email or 10-digit phone number with Bcrypt password hashing.",
      "Full Role-Based Access Control (RBAC): Admin (full CRUD), Editor (create/update), and User (read-only) permission tiers.",
    ],
    metrics: [
      { label: "Curated Prompts", value: "600+ Prompts" },
      { label: "Auth Protocol", value: "JWT + Dual Login" },
      { label: "RBAC Tiers", value: "Admin/Editor/User" },
    ],
    mockupHeader: {
      type: "SPA HUB",
      title: "promptlib // api/v1/prompts/stream",
      badge: "600+ PROMPTS",
    },
    mockupContent: {
      kpis: [
        { label: "Dual Login", val: "Email & Phone", sub: "Bcrypt Hashed" },
        { label: "Detail View", val: "Slide-In Drawer", sub: "Before/After Badges" },
        { label: "Copy Action", val: "1-Click", sub: "Clipboard API" },
      ],
      terminalLogs: [
        "POST /api/auth/login -> Phone number login verified -> JWT Bearer issued",
        "RBAC check passed: user_role='Editor', is_active=true, last_login_at updated",
        "GET /api/prompts?category=Coding -> 142 items streamed (limit/offset pagination)",
        "Prompt template #84 copied to clipboard -> Visual status triggered",
      ],
    },
    deepArchitecture: {
      title: "PromptLib Core Architecture",
      items: [
        "1-Click prompt copy directly to clipboard with visual copy status",
        "Categorized catalog: Copywriting, Coding, Business Strategy (600+ Prompts)",
        "Interactive slide-in detail drawer with Before/After image comparisons",
        "Dual login via email or 10-digit phone number with Bcrypt security",
        "JWT Bearer Authorization with token validation & last_login_at tracking",
        "Dedicated admin portal for full prompt CRUD and category management",
      ],
    },
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string; alt: string } | null>(null);

  const categories = ["All", "AI & Automation", "Web & Cloud", "Data & Analytics"];

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-cyan-400 font-mono text-sm tracking-wider">03.</span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                  Featured Systems & Projects
                </h2>
              </div>
              <p className="text-gray-400 text-sm font-mono ml-9 max-w-xl">
                Deep-dive into production automation pipelines, enterprise ERPs, and AI orchestration engines
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0 bg-gray-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-gray-800">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  data-hover
                  className={`text-xs font-mono px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-cyan-500 text-gray-950 font-bold shadow-lg shadow-cyan-500/25"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Project Cards Stack */}
        <div className="space-y-10">
          {filtered.map((project, i) => {
            const isExpanded = expandedId === project.id;

            return (
              <ScrollReveal key={project.id} delay={i * 60} direction="up">
                <div
                  className={`group relative bg-gray-950/85 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-9 transition-all duration-300 hover:shadow-2xl overflow-hidden ${project.accentBorder}`}
                >
                  {/* Subtle Ambient Radial Glow */}
                  <div
                    className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br ${project.accentGradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700 blur-3xl pointer-events-none`}
                  />

                  {/* Background Sneak-Peek of Project Mockup with Subtle Vignette & Shimmer */}
                  <div className="absolute inset-0 opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-700 pointer-events-none overflow-hidden -z-10">
                    <Image
                      src={project.imagePath}
                      alt={project.imageAlt}
                      fill
                      className="object-cover object-center filter blur-[1px] scale-105 group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent" />
                  </div>

                  {/* Header Row: Icon + Meta + Action Badges */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-300 shadow-inner">
                        {project.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-full">
                            {project.category}
                          </span>
                          {project.builtFor && (
                            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full">
                              🏢 {project.builtFor}
                            </span>
                          )}
                          {project.isPrivate ? (
                            <span className="text-[11px] font-mono text-gray-400 bg-gray-900 border border-gray-800 px-2.5 py-0.5 rounded-md">
                              🔒 Enterprise Internal
                            </span>
                          ) : (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-hover
                              className="text-[11px] font-mono font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/80 border border-cyan-700/60 px-2.5 py-0.5 rounded-md flex items-center gap-1 hover:bg-cyan-900/60 transition-colors"
                            >
                              🚀 Live ERP Demo ↗
                            </a>
                          )}
                          <button
                            onClick={() =>
                              setPreviewImage({
                                src: project.imagePath,
                                title: project.title,
                                alt: project.imageAlt,
                              })
                            }
                            data-hover
                            className="text-[11px] font-mono font-bold text-blue-300 hover:text-cyan-300 bg-blue-950/70 border border-blue-700/50 px-2.5 py-0.5 rounded-md flex items-center gap-1 hover:bg-blue-900/60 transition-colors shadow-xs"
                          >
                            <span>🔍 View High-Res Mockup ↗</span>
                          </button>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-2 group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-gray-400 bg-gray-900/90 border border-gray-800 px-3.5 py-1.5 rounded-full self-start">
                      {project.date}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="text-gray-300 text-base md:text-lg font-medium mb-6 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* High-Impact Metrics Strip */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80 mb-6">
                    {project.metrics.map((m, mi) => (
                      <div key={mi} className="text-center">
                        <div className="text-base md:text-xl font-extrabold text-white font-mono">
                          {m.value}
                        </div>
                        <div className="text-[11px] font-mono text-gray-400 mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technical Challenge Box */}
                  <div className="mb-6 p-4 md:p-5 rounded-2xl bg-gray-900/40 border border-gray-800/70">
                    <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      <span>⚡</span> Technical Challenge & Engineering Solution
                    </div>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                      {project.technicalChallenge}
                    </p>
                  </div>

                  {/* UI Visual Showcase (Flat, Clean Box UI) */}
                  {project.id === "price-intel" ? (
                    <div className="mb-6 rounded-2xl overflow-hidden border border-gray-800 bg-[#F8FAFC] shadow-2xl">
                      <CompeteIntelMockupUI />
                    </div>
                  ) : project.id === "site-intel" ? (
                    <div className="mb-6 rounded-2xl overflow-hidden border border-gray-800 bg-slate-50 shadow-2xl">
                      <SiteIntelMockupUI />
                    </div>
                  ) : project.id === "scm-analytics" ? (
                    <div className="mb-6 rounded-2xl overflow-hidden border border-gray-800 bg-slate-50 shadow-2xl">
                      <ScmAnalyticsMockupUI />
                    </div>
                  ) : project.id === "ai-work-planner" ? (
                    <div className="mb-6 rounded-2xl overflow-hidden border border-gray-800 bg-[#0B1220] shadow-2xl">
                      <WorkPlannerMockupUI />
                    </div>
                  ) : project.id === "prompt-lib" ? (
                    <div className="mb-6 rounded-2xl overflow-hidden border border-gray-800 bg-[#f9fafb] shadow-2xl">
                      <PromptLibMockupUI />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        setPreviewImage({
                          src: project.imagePath,
                          title: project.title,
                          alt: project.imageAlt,
                        })
                      }
                      data-hover
                      className="group/img relative mb-6 rounded-2xl overflow-hidden border border-gray-800/80 bg-gray-950 cursor-pointer shadow-lg hover:border-cyan-500/50 transition-all duration-300"
                    >
                      <div className="relative w-full h-52 md:h-64 overflow-hidden">
                        <Image
                          src={project.imagePath}
                          alt={project.imageAlt}
                          fill
                          className="object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80 group-hover/img:opacity-40 transition-opacity duration-300" />
                        
                        {/* Top Action Pill */}
                        <div className="absolute top-3 right-3 bg-gray-950/80 backdrop-blur-md border border-gray-700/70 text-gray-300 text-[11px] font-mono px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md group-hover/img:text-cyan-400 group-hover/img:border-cyan-500/50 transition-colors">
                          <span>🔍 Click for Fullscreen UI</span>
                        </div>

                        {/* Bottom Caption Pill */}
                        <div className="absolute bottom-3 left-3 bg-gray-950/85 backdrop-blur-md border border-gray-800 text-gray-300 text-xs font-mono px-3 py-1.5 rounded-xl flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          <span className="font-semibold text-white truncate max-w-[280px] md:max-w-md">{project.imageAlt}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Interactive Console / Live Telemetry Screen */}
                  <div className="rounded-2xl bg-gray-900/90 border border-gray-800 overflow-hidden font-mono text-xs mb-6 shadow-xl">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-gray-950/90 border-b border-gray-800 text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-[11px] text-gray-400 font-mono ml-2 truncate">
                          {project.mockupHeader.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded">
                        ● {project.mockupHeader.badge}
                      </span>
                    </div>

                    {/* Console KPI widgets */}
                    {project.mockupContent.kpis && (
                      <div className="grid grid-cols-3 gap-2 p-3.5 bg-gray-950/50 border-b border-gray-800/60">
                        {project.mockupContent.kpis.map((kp, ki) => (
                          <div key={ki} className="bg-gray-900/70 p-2.5 rounded-xl border border-gray-800 text-center">
                            <div className="text-[10px] text-gray-500 uppercase">{kp.label}</div>
                            <div className="text-sm font-bold text-white mt-0.5">{kp.val}</div>
                            {kp.sub && <div className="text-[9px] text-cyan-400 font-mono mt-0.5">{kp.sub}</div>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stream Logs */}
                    <div className="p-4 space-y-2 bg-gray-950/40">
                      {project.mockupContent.terminalLogs?.map((log, li) => (
                        <div key={li} className="flex items-start gap-2.5 text-xs">
                          <span className="text-cyan-400 flex-shrink-0 mt-0.5 font-bold">❯</span>
                          <span className="text-gray-300 leading-relaxed">{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Deep Architecture & Key Outcomes */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-gray-800 space-y-6 animate-fade-in">
                      {/* Key Outcomes */}
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">
                          🎯 Key Quantifiable Outcomes & Impact
                        </h4>
                        <ul className="space-y-2.5">
                          {project.keyOutcomes.map((ko, koi) => (
                            <li key={koi} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-300">
                              <span className="text-cyan-400 font-bold mt-0.5">✓</span>
                              <span>{ko}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deep Architecture Grid */}
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-3">
                          ⚙️ {project.deepArchitecture.title}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {project.deepArchitecture.items.map((item, ii) => (
                            <div key={ii} className="p-2.5 rounded-xl bg-gray-900/60 border border-gray-800/80 text-xs text-gray-300 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Bar: Tech Chips + Toggle Details */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-gray-800/80">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono text-cyan-300/90 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        onClick={() =>
                          setPreviewImage({
                            src: project.imagePath,
                            title: project.title,
                            alt: project.imageAlt,
                          })
                        }
                        data-hover
                        className="text-xs font-mono font-bold text-cyan-300 hover:text-white bg-cyan-950/60 hover:bg-cyan-900/60 px-3.5 py-2 rounded-xl border border-cyan-700/50 transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-xs"
                      >
                        <span>🖼️ View Mockup</span>
                      </button>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : project.id)}
                        data-hover
                        className="text-xs font-mono font-bold text-gray-300 hover:text-cyan-400 bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-xl border border-gray-700 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                      >
                        <span>{isExpanded ? "Collapse Specs" : "Explore Specs"}</span>
                        <span className="text-cyan-400">{isExpanded ? "▲" : "▼"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Fullscreen UI Screenshot Inspection Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-gray-950 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/90">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-cyan-400" />
                <h3 className="text-base md:text-lg font-bold text-white font-mono">
                  {previewImage.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                data-hover
                className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-xl text-xs font-mono transition-colors"
              >
                ✕ Close [ESC]
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="relative w-full h-[60vh] md:h-[72vh] bg-black">
              <Image
                src={previewImage.src}
                alt={previewImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Modal Footer Caption */}
            <div className="px-6 py-3 bg-gray-950 border-t border-gray-800 text-xs font-mono text-gray-400 flex items-center justify-between">
              <span>{previewImage.alt}</span>
              <span className="text-cyan-400">Click backdrop to close</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
