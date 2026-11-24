export type ProjectStatus = "Enterprise Internal" | "Live Demo" | "Open Source";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  date: string;
  category: "AI & Automation" | "Web & Cloud" | "Data & Analytics";
  status: ProjectStatus;
  isPrivate: boolean;
  builtFor?: string;
  tech: string[];
  metrics: [ProjectMetric, ProjectMetric, ProjectMetric];
  description: string;
  imagePath: string;
  imageAlt: string;
  demoUrl?: string;
  caseStudyAvailable: boolean;
  inspectAvailable: boolean;
  accentGradient: string;
  accentBorder: string;
  icon: string;
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
    title: "PriceIntel: Competitor Price Intelligence Platform",
    subtitle: "Autonomous multi-domain scraping and live comparative pricing matrix engine",
    tagline: "Autonomous multi-domain scraping and live comparative pricing matrix engine",
    date: "Mar 2026",
    category: "AI & Automation",
    status: "Enterprise Internal",
    isPrivate: true,
    tech: ["Python", "PHP", "Google Apps Script", "OpenAI GPT-4", "SerpAPI"],
    metrics: [
      { label: "Catalog Scale", value: "10k+" },
      { label: "Category Accuracy", value: "95%" },
      { label: "Time Saved", value: "80%" },
    ],
    description:
      "Competitor product catalogs featured inconsistent category layouts and triggered rate-limiting timeouts. I built an autonomous scraping engine with a six-stage fallback parser and batched worker queue. The system catalogued 10k+ SKUs across competitor domains at 95% accuracy and reduced manual benchmarking time by 80%.",
    imagePath: "/projects/price-intel.svg",
    imageAlt: "Preview of PriceIntel: Competitor Price Intelligence Platform interface",
    caseStudyAvailable: true,
    inspectAvailable: true,
    accentGradient: "from-purple-600 via-indigo-600 to-blue-500",
    accentBorder: "hover:border-purple-500/40",
    icon: "⚡",
    technicalChallenge:
      "Large scraping runs frequently triggered script timeouts and HTTP 524 gateway errors. Engineered a progressive batched job queue with rate-limiting backoff and built a 6-stage fallback parser to normalize non-standard category taxonomies across disparate competitor sites into standard schemas.",
    keyOutcomes: [
      "Scaled scraping pipeline to catalog 10k+ products across competitor domains without server timeouts.",
      "Achieved 95% category classification accuracy across non-standard HTML structures using multi-layer heuristics.",
      "Reduced manual competitor price benchmarking time by 80% with automated CSV matrix exports.",
    ],
    mockupHeader: {
      type: "MATRIX CONSOLE",
      title: "competitor-discovery // batch-queue.worker",
      badge: "ACTIVE PIPELINE",
    },
    mockupContent: {
      kpis: [
        { label: "Batched Execution", val: "5 SKUs/chunk", sub: "Timeout Safe" },
        { label: "Category Accuracy", val: "95%", sub: "6-Layer Fallback" },
        { label: "Price Matrix", val: "Live Grid", sub: "Export CSV Ready" },
      ],
      terminalLogs: [
        "[QUEUE] Worker chunk #42 completed (5 products parsed in 3.4s)",
        "[PARSER] Fallback Tier 4 (JSON-LD Microdata) extracted SKU #8410",
        "[AI MATCH] SerpAPI competitor price discovered: $24.99 vs our $27.50",
        "[STATUS] 10k+ domain targets synchronized with zero HTTP 524 timeouts",
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
    title: "SiteIntel: Uptime and DOM Anomaly Sentinel",
    subtitle: "Autonomous health watchdog monitoring 17 mission-critical vectors across 200+ domains",
    tagline: "Autonomous health watchdog monitoring 17 mission-critical vectors across 200+ domains",
    date: "May 2026",
    category: "Web & Cloud",
    status: "Enterprise Internal",
    isPrivate: true,
    tech: ["PHP", "MySQL", "PHPMailer", "cURL Multi", "Cron Workers"],
    metrics: [
      { label: "Domains Monitored", value: "200+" },
      { label: "Health Vectors", value: "17" },
      { label: "Uptime Monitored", value: "99.98%" },
    ],
    description:
      "Multi-domain production sites lacked continuous health monitoring and suffered delayed outage detection. I built an automated sentinel engine executing low-latency cURL checks for HTTP headers, SSL validity, and DOM integrity. It continuously monitors 17 health vectors across 200+ domains with sub-second response times and zero undetected outages.",
    imagePath: "/projects/site-intel.svg",
    imageAlt: "Preview of SiteIntel: Uptime and DOM Anomaly Sentinel interface",
    caseStudyAvailable: true,
    inspectAvailable: true,
    accentGradient: "from-cyan-500 via-teal-500 to-emerald-500",
    accentBorder: "hover:border-cyan-500/40",
    icon: "🛡️",
    technicalChallenge:
      "Achieving sub-second inspection across 200+ production domains without thread saturation. Built a modular checkers engine executing low-latency cURL inspection for headers, HTTP 200 OK verification, SSL cert validity, and WHOIS socket lookup.",
    keyOutcomes: [
      "Monitored 17 mission-critical health vectors with automated scheduled validation and sub-second API responses.",
      "Zero undetected outages across all production domains with instant degradation alerting.",
      "Dual-tier email alerting via SMTP separating critical failures from warnings with custom alert thresholds.",
    ],
    mockupHeader: {
      type: "SENTINEL AUDIT",
      title: "siteintel // health-score-gauge.svg",
      badge: "17 VECTORS HEALTHY",
    },
    mockupContent: {
      kpis: [
        { label: "Uptime Sentinel", val: "99.98%", sub: "Rolling 30-Day" },
        { label: "Check Engine", val: "< 450 ms", sub: "cURL Multi Socket" },
        { label: "SMTP Dispatch", val: "PHPMailer", sub: "Instant Trigger" },
      ],
      terminalLogs: [
        "[CHECK:HTTP] 200 OK response received in 182 ms (SSL valid: 284 days left)",
        "[CHECK:DOM] CSS watcher selector verified content integrity: NO DRIFT",
        "[CHECK:FTP] Secure socket handshake authenticated successfully",
        "[SENTINEL] Audit log written to MySQL with JSON diagnostic telemetry",
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
    title: "SCM Analytics: Enterprise Supply Chain and Operations ERP",
    subtitle: "Enterprise operations ERP and supply chain telemetry with two-way live Google Sheets sync",
    tagline: "Enterprise operations ERP and supply chain telemetry with two-way live Google Sheets sync",
    date: "May 2026",
    category: "Data & Analytics",
    status: "Live Demo",
    isPrivate: false,
    builtFor: "Global Retail Enterprise",
    demoUrl: "https://site23359-uw0p89.scloudsite101.com/backup%20files/latest%20(2)/Wackybrandhub_International/",
    tech: ["PHP", "MySQL", "Google Sheets API", "ApexCharts", "Google Apps Script"],
    metrics: [
      { label: "Orders Processed", value: "1k+" },
      { label: "Active Customers", value: "500+" },
      { label: "Dashboard Latency", value: "200 ms" },
    ],
    description:
      "The client managed multi-channel orders manually and suffered high dashboard latency during inventory updates. I built an operations ERP platform integrating live two-way Google Sheets synchronization with MySQL caching. The platform processed 1k+ orders across 500+ customers with 200 ms dashboard latency and live gross-margin tracking.",
    imagePath: "/projects/scm-analytics.svg",
    imageAlt: "Preview of SCM Analytics: Enterprise Supply Chain and Operations ERP interface",
    caseStudyAvailable: true,
    inspectAvailable: true,
    accentGradient: "from-emerald-500 via-teal-600 to-cyan-600",
    accentBorder: "hover:border-emerald-500/40",
    icon: "📊",
    technicalChallenge:
      "Eliminating UI latency while keeping live Google Sheets synchronicity intact. Developed a hybrid synchronization engine where client operations trigger async Apps Script webhooks while MySQL caching guarantees instant 200 ms dashboard loads.",
    keyOutcomes: [
      "Live Financial & Profitability tracking: Total Revenue, Purchase Costs, Operating Expenses, and margins via ApexCharts.",
      "Multi-channel sales telemetry covering WhatsApp, Google Forms, and Direct orders with unit price spreads.",
      "Vendor Sourcing queue with top-20 vendor spend analysis and customer receivable ledgers.",
    ],
    mockupHeader: {
      type: "ENTERPRISE ERP",
      title: "enterprise-erp // scm-analytics.dashboard",
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
        "[SYNC] Two-way Google Sheets row synchronized with zero latency stall",
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
    title: "AI Work Planner: Conversational Voice and Task Orchestrator",
    subtitle: "Productivity orchestrator with Whisper voice parsing and offline Kanban board",
    tagline: "Productivity orchestrator with Whisper voice parsing and offline Kanban board",
    date: "Jun 2026",
    category: "AI & Automation",
    status: "Enterprise Internal",
    isPrivate: true,
    tech: ["PHP", "OpenAI Whisper API", "OpenAI GPT-4", "Google Calendar API", "IndexedDB"],
    metrics: [
      { label: "Speech Accuracy", value: "98%" },
      { label: "Routing Latency", value: "< 2 s" },
      { label: "Workflow Stages", value: "4" },
    ],
    description:
      "Users needed a fast way to convert unstructured speech notes into scheduled calendar commitments. I built a voice-driven work planner combining Whisper audio transcription with structured GPT-4o task extraction and an offline Kanban board. The system converted conversational voice memos into calendar events in under two seconds with 98% transcription accuracy.",
    imagePath: "/projects/ai-work-planner.svg",
    imageAlt: "Preview of AI Work Planner: Conversational Voice and Task Orchestrator interface",
    caseStudyAvailable: true,
    inspectAvailable: true,
    accentGradient: "from-amber-500 via-orange-600 to-rose-600",
    accentBorder: "hover:border-amber-500/40",
    icon: "🤖",
    technicalChallenge:
      "Parsing ambiguous conversational speech into deterministic calendar actions with strict timezone normalization. Integrated Whisper audio transcription with GPT-4o structured JSON outputs, combined with a PHP Deterministic Action Router that computes recurrence rules.",
    keyOutcomes: [
      "OpenAI Whisper voice transcription with browser microphone recording and audio stream processing.",
      "Deterministic Action Router normalizing timezone-safe start and end times with verification mode.",
      "Drag-and-drop Kanban task board coupled with offline local persistence & semantic note search.",
    ],
    mockupHeader: {
      type: "AI ORCHESTRATOR",
      title: "planner.ai // voice-whisper-engine",
      badge: "WHISPER ACTIVE",
    },
    mockupContent: {
      kpis: [
        { label: "Voice Input", val: "Whisper", sub: "Audio Multipart" },
        { label: "Action Router", val: "iCal RRULE", sub: "Timezone-Safe" },
        { label: "Task Board", val: "4-Col Kanban", sub: "Offline IndexedDB" },
      ],
      terminalLogs: [
        "Audio received -> Whisper API transcribed: 'Schedule sprint review Friday 3pm'",
        "GPT-4o output: { action: 'CALENDAR_CREATE', title: 'Sprint Review', time: '15:00' }",
        "Google OAuth session validated -> Event inserted into primary calendar",
        "Kanban board item auto-created in 'Upcoming' column with offline cache",
      ],
    },
    deepArchitecture: {
      title: "AI & Productivity Capabilities",
      items: [
        "OpenAI Whisper API audio transcription stream ingestion",
        "GPT-4o structured JSON schema response formatting",
        "Continuous reminder sequences and calendar countdowns",
        "iCalendar RRULE generation for complex daily/weekly cadences",
        "Drag-and-drop Kanban task board (Inbox, Upcoming, In Progress, Done)",
        "Semantic keyword note search & offline preview state caching",
      ],
    },
  },
  {
    id: "prompt-lib",
    title: "PromptLib: Curated Prompt Engineering Platform",
    subtitle: "Curated library serving 600+ prompts with JWT authentication and slide-in drawer",
    tagline: "Curated library serving 600+ prompts with JWT authentication and slide-in drawer",
    date: "Jun 2026",
    category: "Web & Cloud",
    status: "Open Source",
    isPrivate: false,
    demoUrl: "https://github.com/GAURAV2082004",
    tech: ["PHP", "MySQL", "JavaScript", "Tailwind CSS", "JWT Auth"],
    metrics: [
      { label: "Curated Prompts", value: "600+" },
      { label: "Access Tiers", value: "3" },
      { label: "Verified Schemas", value: "100%" },
    ],
    description:
      "Engineering teams struggled to discover, test, and securely share verified prompt templates across projects. I built a centralized prompt catalog with instant clipboard actions, slide-in inspection drawers, and role-based access control. The platform hosts 600+ curated prompts with three permission tiers and verified schema validation for production workflows.",
    imagePath: "/projects/prompt-lib.svg",
    imageAlt: "Preview of PromptLib: Curated Prompt Engineering Platform interface",
    caseStudyAvailable: true,
    inspectAvailable: true,
    accentGradient: "from-fuchsia-500 via-pink-600 to-purple-600",
    accentBorder: "hover:border-fuchsia-500/40",
    icon: "📚",
    technicalChallenge:
      "Architecting a scalable prompt catalog serving 600+ curated prompts across Copywriting, Coding, and Business Strategy with slide-in detail views, instant 1-click clipboard copying, and fine-grained Role-Based Access Control.",
    keyOutcomes: [
      "Curated library of 600+ prompts with instant 1-click clipboard copy feedback and variable tag chips.",
      "Slide-in detail drawer featuring prompt templates, tags, timestamps, and Before/After comparison badges.",
      "JWT Bearer authentication supporting dual-login with Bcrypt password security.",
      "Full Role-Based Access Control: Admin, Editor, and User permission tiers.",
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
        "POST /api/auth/login -> Login verified -> JWT Bearer issued",
        "RBAC check passed: user_role='Editor', is_active=true",
        "GET /api/prompts?category=Coding -> 142 items streamed",
        "Prompt template #84 copied to clipboard -> Visual status triggered",
      ],
    },
    deepArchitecture: {
      title: "PromptLib Core Architecture",
      items: [
        "1-Click prompt copy directly to clipboard with visual copy status",
        "Categorized catalog: Copywriting, Coding, Business Strategy (600+ Prompts)",
        "Interactive slide-in detail drawer with Before/After image comparisons",
        "Dual login via email or phone with Bcrypt security",
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
