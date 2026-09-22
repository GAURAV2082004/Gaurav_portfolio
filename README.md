<div align="center">

# ⚡ Gaurav Shailendra Jadli — Portfolio & Systems Architecture

> **Full-Stack Software Engineer & Distributed Systems Developer**  
> *Autonomous Web Scraping • Enterprise ERP Pipelines • AI Productivity Orchestration*

[![Live Demo](https://img.shields.io/badge/Live_Portfolio-gaurav--portfolio.vercel.app-22d3ee?style=for-the-badge&logo=vercel&logoColor=white)](https://gaurav-portfolio-phi-three.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js_14_%7C_React_19_%7C_TypeScript_%7C_Tailwind_CSS-3b82f6?style=for-the-badge&logo=react&logoColor=white)](https://gaurav-portfolio-phi-three.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

---

### 🌐 [Explore Live Portfolio ➔](https://gaurav-portfolio-phi-three.vercel.app)

</div>

---

## 🏛️ System Architecture & File Structure

This repository is systematically organized using the Next.js 14+ App Router, modular React components, custom interactive canvas physics, and clean B2B SaaS box containers:

```bash
Gaurav_portfolio/
├── 📁 app/                           # Next.js App Router root
│   ├── favicon.ico                   # Application brand icon
│   ├── globals.css                   # Tailwind base, keyframes & custom scrollbars
│   ├── layout.tsx                    # Root HTML layout, Inter font, SEO meta
│   └── page.tsx                      # Primary index landing page
│
├── 📁 components/                    # Modular UI & System Components
│   ├── 💎 ShardsCanvas.tsx           # Interactive 2D Voronoi broken-wall fracture canvas
│   ├── 🎯 CustomCursor.tsx           # Zero-lag native cursor with click particle bursts
│   ├── 🌊 ScrollReveal.tsx           # IntersectionObserver viewport reveal wrappers
│   ├── 🧭 Navbar.tsx                 # Sticky navigation with mobile menu & quick jump
│   ├── 🚀 Hero.tsx                   # Typewriter introduction, shimmer title, magnetic CTAs
│   ├── 👨‍💻 About.tsx                  # Background summary, skill stats & key metrics
│   ├── 💼 Experience.tsx             # Professional internship & development trajectory
│   ├── 📦 Projects.tsx               # Primary telemetry console with interactive cards
│   │   ├── CompeteIntelMockupUI.tsx  # Competitor price matrix discovery engine
│   │   ├── SiteIntelMockupUI.tsx     # 17-vector uptime & anomaly sentinel dashboard
│   │   ├── ScmAnalyticsMockupUI.tsx  # Dual-column Wacky Brandhub ERP & procurement ledger
│   │   ├── WorkPlannerMockupUI.tsx   # Orbit AI Assistant with Whisper voice & Kanban board
│   │   └── PromptLibMockupUI.tsx     # 600+ prompt catalog with slide-out monospace drawer
│   ├── 🛠️ Skills.tsx                 # Click-to-reveal proficiency level meters
│   ├── 🎓 Education.tsx              # Pillai College of Engineering (B.Tech Computer Engg)
│   ├── 📜 Certifications.tsx         # Power BI, Generative AI & Pandas credentials
│   └── ✉️ Contact.tsx                # Direct communication form & social channel links
│
├── 📁 public/                        # Static assets & screenshots
│   └── 📁 projects/                  # High-resolution 16:9 UI software screenshots
│       ├── price-intel.jpg           # CompeteIntel pricing matrix visual
│       ├── siteintel.jpg             # SiteIntel / HealthDash sentinel visual
│       ├── scm-analytics.jpg         # Wacky Brandhub International ERP visual
│       ├── ai-work-planner.jpg       # Orbit AI Assistant voice & Kanban visual
│       └── promptlib.jpg             # PromptLib prompt catalog visual
│
├── .gitignore                        # Git ignore rules for Next.js & dependencies
├── next.config.js                    # Next.js static export & image config
├── package.json                      # NPM dependencies & deployment scripts
├── postcss.config.js                 # Tailwind CSS PostCSS processor
├── tailwind.config.ts                # Custom neon color tokens & animations
└── tsconfig.json                     # Strict TypeScript compiler options
```

---

## ⚡ Featured Engineering Projects

### 1. [Competitor Price Intelligence Platform (CompeteIntel)](#)
- **Problem**: 4–6 minute Google Apps Script execution timeouts and HTTP 524 origin errors on 10,000+ SKU stores.
- **Engineering Solution**: Progressive batched job queue (5 products/chunk with rate-limiting backoff) and a 6-stage fallback parser (`Title` ➔ `Regex` ➔ `Breadcrumbs` ➔ `OpenGraph/Meta` ➔ `URL Paths` ➔ `JSON-LD`).
- **Key Outcomes**: Cataloged 10,000+ SKUs across competitor stores with 95%+ categorization accuracy; cut manual benchmarking time by ~80%.

### 2. [SiteIntel / HealthDash — Uptime & Anomaly Sentinel](#)
- **Problem**: Sub-second validation across 200+ production client domains without thread exhaustion.
- **Engineering Solution**: Modular `checkers/` engine executed by cron workers running low-latency cURL inspection for headers, SSL validity countdown, and DOM content drift detection.
- **Key Outcomes**: Monitored 17+ mission-critical health vectors with zero undetected outages and dual-tier SMTP alert routing via PHPMailer.

### 3. [Real-Time Sales & SCM Analytics Engine (Wacky Brandhub International)](#)
- **Problem**: Eliminating UI dashboard latency while maintaining live bidirectional Google Sheets synchronization.
- **Engineering Solution**: Hybrid synchronization protocol (`js/sheets-api.js` + `api/db.php`) caching transactions in MySQL for instant 200ms loads while dispatching async webhooks.
- **Key Outcomes**: Tracked 500+ clients and 1,000+ orders across WhatsApp, Google Forms, and direct sales with dynamic return balance adjustment modals.

### 4. [AI-Powered Work Planner (Orbit Assistant)](#)
- **Problem**: Parsing conversational speech into deterministic calendar appointments and tasks without timezone drift.
- **Engineering Solution**: OpenAI Whisper API (`whisper-1`) audio transcription pipeline integrated with GPT-4o-mini structured JSON outputs (`response_format: json_object`) and an offline-first IndexedDB Kanban task board.
- **Key Outcomes**: Timezone-safe start/end normalization, continuous lead-up reminder countdown sequences, and full iCalendar RRULE generation.

### 5. [PromptLib — Enterprise Prompt Engineering Hub](#)
- **Problem**: Delivering high-throughput access to 600+ curated prompts with role-based editing controls.
- **Engineering Solution**: Decoupled single-page application with JWT Bearer dual-login (Email & 10-digit Phone) and granular RBAC (Admin, Editor, User).
- **Key Outcomes**: 1-click clipboard copy status feedback, full-text search indexing, and a slide-over monospace code inspector drawer.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Core** | Next.js 16 (Turbopack), React 19, TypeScript, Tailwind CSS |
| **Backend & APIs** | PHP 8, RESTful APIs, Node.js, Google Apps Script, cURL Multi |
| **Data & Persistence** | MySQL 8, Google Sheets API, IndexedDB, LocalStorage |
| **AI & Automation** | OpenAI GPT-4o-mini, OpenAI Whisper-1, SerpAPI, Python |
| **DevOps & Hosting** | Vercel Serverless, Git, SMTP (PHPMailer), OAuth 2.0, JWT |

---

## 🚀 Local Development Setup

To run this repository locally on your machine:

```bash
# 1. Clone the repository
git clone https://github.com/GAURAV2082004/Gaurav_portfolio.git

# 2. Enter directory
cd Gaurav_portfolio

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Developed by <b>Gaurav Shailendra Jadli</b> · Deployed on <b>Vercel</b></sub>
</div>
