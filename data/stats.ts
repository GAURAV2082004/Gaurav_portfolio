// Single source of truth for all quantitative portfolio stats
export interface StatItem {
  id: string;
  label: string;
  value: string;
  sub: string;
  icon: string;
}

export const PORTFOLIO_STATS: StatItem[] = [
  {
    id: "tools",
    label: "Production Tools",
    value: "7+",
    sub: "PHP & Python in Prod",
    icon: "⚙️",
  },
  {
    id: "skus",
    label: "Catalog Scale",
    value: "10k+",
    sub: "Autonomous Scraper",
    icon: "⚡",
  },
  {
    id: "domains",
    label: "Domains Monitored",
    value: "200+",
    sub: "17 Health Vectors",
    icon: "🛡️",
  },
  {
    id: "uptime",
    label: "Uptime Benchmark",
    value: "99.98%",
    sub: "Zero Outages",
    icon: "📊",
  },
];

export const HERO_COUNTER_STATS = [
  { value: "7+", label: "Tools Built" },
  { value: "10k+", label: "SKUs Catalogued" },
  { value: "200+", label: "Domains Monitored" },
];

export const ABOUT_HIGHLIGHTS = [
  { label: "Production Tools", value: "7+", sub: "PHP & Python in Prod", icon: "⚙️" },
  { label: "Enterprise Projects", value: "5", sub: "End-to-End Shipped", icon: "🚀" },
  { label: "Verified Credentials", value: "3", sub: "Infosys, Kaggle, GrowthSchool", icon: "📜" },
  { label: "Expected Graduation", value: "2026", sub: "University of Mumbai", icon: "🎓" },
];
