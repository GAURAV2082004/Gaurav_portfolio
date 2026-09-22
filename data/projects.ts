export interface Project {
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

export const projects: Project[] = [
  {
    id: "price-intel",
    title: "Competitor Price Intelligence Platform",
    tagline: "Autonomous multi-domain scraping & live comparative pricing matrix engine",
    date: "Mar 2026",
    category: "AI & Automation",
    tech: ["PHP", "Python", "Google Apps Script", "SerpAPI", "OpenAI GPT-4", "JSON-LD"],
    accentGradient: "from-purple-600 via-indigo-600 to-blue-500",
    accentBorder: "hover:border-purple-500/40",
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
    accentBorder: "hover:border-cyan-500/40",
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
    accentBorder: "hover:border-emerald-500/40",
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
    accentBorder: "hover:border-amber-500/40",
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
    accentBorder: "hover:border-fuchsia-500/40",
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

export const MOCKUP_PROJECT_IDS = [
  "price-intel",
  "site-intel",
  "scm-analytics",
  "ai-work-planner",
  "prompt-lib",
] as const;

export type MockupProjectId = (typeof MOCKUP_PROJECT_IDS)[number];

export function isMockupProjectId(id: string): id is MockupProjectId {
  return (MOCKUP_PROJECT_IDS as readonly string[]).includes(id);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
