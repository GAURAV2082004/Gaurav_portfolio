"use client";
import React, { useState } from "react";

export default function SiteIntelMockupUI() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [bannerVisible, setBannerVisible] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState<string | null>("example-store.com");
  const [showAddModal, setShowAddModal] = useState(false);

  const domainCards = [
    {
      title: "example-store.com",
      status: "ACTIVE",
      subStatus: "MONITORED",
      latency: "142ms",
      ssl: "Valid (68d left)",
      indexing: "Indexed (Clean)",
      uptimeSlots: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1], // 1=green, 2=yellow, 0=red
    },
    {
      title: "api.gateway-prod.io",
      status: "ACTIVE",
      subStatus: "MONITORED",
      latency: "38ms",
      ssl: "Valid (142d left)",
      indexing: "Noindex (API)",
      uptimeSlots: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      title: "checkout.billing-service.net",
      status: "WARNING",
      subStatus: "MONITORED",
      latency: "420ms",
      ssl: "Expiring (4d left)",
      indexing: "Noindex (Secured)",
      uptimeSlots: [1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    },
  ];

  const checkCategories = [
    {
      name: "Core Availability",
      checks: [
        { name: "HTTP 200 Response", status: "Pass", badge: "bg-emerald-100 text-emerald-800", message: "Response received in 142ms (200 OK)", duration: "142ms", time: "Just now" },
        { name: "DNS Lookup & Propagation", status: "Pass", badge: "bg-emerald-100 text-emerald-800", message: "Resolved 4 A records via Cloudflare DNS", duration: "24ms", time: "1m ago" },
        { name: "SSL Certificate Validity", status: "Pass", badge: "bg-emerald-100 text-emerald-800", message: "Issued by Let's Encrypt, expires in 68 days", duration: "48ms", time: "2m ago" },
      ],
    },
    {
      name: "SEO & Crawlability",
      checks: [
        { name: "Robots.txt Disallow Check", status: "Pass", badge: "bg-emerald-100 text-emerald-800", message: "Disallow rules validated, no accidental root disallow", duration: "32ms", time: "5m ago" },
        { name: "Meta Noindex Detection", status: "Pass", badge: "bg-emerald-100 text-emerald-800", message: "Index, Follow detected on primary canonical URL", duration: "55ms", time: "5m ago" },
        { name: "XML Sitemap 200 Response", status: "Pass", badge: "bg-emerald-100 text-emerald-800", message: "/sitemap.xml validated (4,210 URLs found)", duration: "110ms", time: "6m ago" },
        { name: "Staging URL Leak Scanner", status: "Pass", badge: "bg-emerald-100 text-emerald-800", message: "Zero staging/dev environment backlinks found", duration: "84ms", time: "6m ago" },
      ],
    },
    {
      name: "Analytics & Tracking Pixels",
      checks: [
        { name: "Google Analytics 4 (GA4)", status: "Pass", badge: "bg-emerald-100 text-emerald-800", message: "GA4 Tag found: G-XXXXXXXXXX (gtag.js loaded)", duration: "41ms", time: "10m ago" },
        { name: "Google Tag Manager (GTM)", status: "Pass", badge: "bg-emerald-100 text-emerald-800", message: "GTM Container active: GTM-XXXXXXX", duration: "38ms", time: "10m ago" },
        { name: "Meta / Facebook Pixel", status: "Pass", badge: "bg-emerald-100 text-emerald-800", message: "fbq('init') fired with valid Pixel ID", duration: "50ms", time: "10m ago" },
      ],
    },
    {
      name: "Security & Code Integrity",
      checks: [
        { name: "WordPress File Drift & Checksums", status: "Pass", badge: "bg-emerald-100 text-emerald-800", message: "Core checksum verified against WP.org v6.4.2", duration: "310ms", time: "15m ago" },
        { name: "Domain Blacklist Status", status: "Pass", badge: "bg-emerald-100 text-emerald-800", message: "Not flagged on Spamhaus, SURBL, Google SafeBrowsing", duration: "180ms", time: "20m ago" },
        { name: "Unauthorized Admin Detector", status: "Pass", badge: "bg-emerald-100 text-emerald-800", message: "Admin count verified (2 authorized accounts)", duration: "64ms", time: "25m ago" },
      ],
    },
  ];

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 rounded-xl overflow-hidden font-sans border border-slate-200 shadow-xl text-left select-none">
      {/* 1. TOP NAVIGATION BAR (Sticky, 56px height) */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-6 h-14 flex items-center justify-between">
        {/* Left Brand */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-extrabold text-slate-900 text-base tracking-tight">HealthDash</span>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-mono font-bold px-2 py-0.5 rounded-full border border-blue-200">
              SiteIntel Sentinel
            </span>
          </div>

          {/* Center Nav Links */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-semibold">
            {["Dashboard", "Global History", "Status", "Settings", "Users"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveNav(tab)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeNav === tab
                    ? "bg-slate-100 text-blue-600 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 transition-colors">
            <span>🔍</span>
            <span>Quick search...</span>
            <kbd className="bg-white border border-slate-300 text-[10px] px-1 rounded text-slate-400">⌘K</kbd>
          </button>
          <div className="relative">
            <button className="text-slate-500 hover:text-slate-700 p-1 text-sm">🔔</button>
            <span className="absolute 1 top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          </div>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
              AD
            </div>
            <div className="hidden md:block leading-tight text-left">
              <div className="text-xs font-bold text-slate-800">Admin User</div>
              <div className="text-[10px] text-slate-400 font-mono">DevOps Lead</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DOMAIN EXPIRY & CRITICAL SYSTEM BANNER */}
      {bannerVisible && (
        <div className="bg-red-600 text-white px-4 md:px-6 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2 shadow-inner">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-bold text-[11px]">
              !
            </span>
            <span className="font-medium">
              <strong>Required Action:</strong> Domain Expiry / WHOIS verification failed for 1 domain (<em>client-backup-vault.com</em> expires in 4 days).
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-white text-red-600 font-bold px-3 py-1 rounded-md text-xs shadow-sm hover:bg-slate-100">
              Resolve Now
            </button>
            <button
              onClick={() => setBannerVisible(false)}
              className="text-white/80 hover:text-white text-xs border border-white/30 px-2.5 py-1 rounded-md"
            >
              Dismiss for Session
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="p-4 md:p-6 space-y-6">
        {/* 3. MAIN EXECUTIVE SUMMARY (1/3 Left Health Ring, 2/3 Right KPI Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Card: Overall Health Gauge */}
          <div className="md:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.2"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500"
                  strokeDasharray="98, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-slate-900 leading-none">98%</span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase mt-0.5">Healthy</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">Overall System Health</h4>
              <p className="text-xs text-slate-500 mt-1 leading-snug">
                Checks passing across all monitored endpoints with zero latency breach.
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">
                  ALL SENSORS NORMAL
                </span>
              </div>
            </div>
          </div>

          {/* Right Card: 4-Metric KPI Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Total Sites Monitored", count: "24", icon: "🌐", color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Healthy Checks Passing", count: "382", icon: "✓", color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Warning Anomalies", count: "5", icon: "⚠️", color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Outages / Critical", count: "1", icon: "🛑", color: "text-rose-600", bg: "bg-rose-50" },
            ].map((k, ki) => (
              <div key={ki} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {k.label}
                  </span>
                  <span className={`w-6 h-6 rounded-md ${k.bg} ${k.color} flex items-center justify-center text-xs font-bold`}>
                    {k.icon}
                  </span>
                </div>
                <div className={`text-2xl font-black ${k.color} mt-2`}>{k.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. ACTION BAR & SEARCH */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Monitored Domains</h3>
            <span className="text-xs font-mono font-bold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
              24 Active Sites
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search websites by domain, tag, or IP..."
                className="w-64 bg-white border border-slate-300 px-3 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-400"
              />
            </div>
            <button className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm">
              <span>🔄</span> Run All Checks
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1"
            >
              <span>+</span> Add Website
            </button>
          </div>
        </div>

        {/* 5. DOMAIN CARD LIST & 7. RIGHT OBSERVABILITY SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main List (8 cols) */}
          <div className="lg:col-span-8 space-y-3">
            {domainCards.map((card, ci) => (
              <div
                key={ci}
                onClick={() => setSelectedDomain(card.title)}
                className={`bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                  selectedDomain === card.title ? "border-blue-500 ring-2 ring-blue-50" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-slate-900">{card.title}</span>
                      <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {card.status}
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                        {card.subStatus}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 mt-2">
                      <span>⚡ Latency: <strong className="text-slate-800">{card.latency}</strong></span>
                      <span>🔒 SSL: <strong className="text-slate-800">{card.ssl}</strong></span>
                      <span>🤖 SEO: <strong className="text-slate-800">{card.indexing}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    {/* Mini 24-Hour Uptime Bar */}
                    <div className="flex items-center gap-1">
                      {card.uptimeSlots.map((slot, si) => (
                        <div
                          key={si}
                          className={`w-1.5 h-6 rounded-full ${
                            slot === 1 ? "bg-emerald-500" : slot === 2 ? "bg-amber-400" : "bg-red-500"
                          }`}
                        />
                      ))}
                    </div>

                    <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-slate-300">
                      Run Checks
                    </button>
                    <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-blue-200">
                      View Diagnostics ↗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Aside Panel: Observability & Live Alert Feed (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Regional Uptime Breakdown */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span>Regional Uptime Telemetry</span>
                <span className="text-emerald-600 font-mono text-[11px]">99.8% Global</span>
              </div>
              {[
                { region: "North America (US-East)", uptime: "99.9%", fill: "w-[99%]" },
                { region: "Europe (Frankfurt)", uptime: "98.4%", fill: "w-[98%]" },
                { region: "Asia Pacific (Mumbai)", uptime: "99.7%", fill: "w-[99%]" },
              ].map((r, ri) => (
                <div key={ri} className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-slate-600 text-[11px]">
                    <span>{r.region}</span>
                    <span className="font-bold text-slate-800">{r.uptime}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-emerald-500 rounded-full ${r.fill}`} />
                  </div>
                </div>
              ))}
            </div>

            {/* Live Sentinel Alert Feed */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span>Live Alert Feed</span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              </div>
              <div className="space-y-2.5 text-xs">
                {[
                  { alert: "503 Error on API Gateway", time: "2m ago", type: "text-rose-600 bg-rose-50 border-rose-200" },
                  { alert: "SSL Certificate Expiring in 48h", time: "1h ago", type: "text-amber-600 bg-amber-50 border-amber-200" },
                  { alert: "cURL Multi completed 17 vectors", time: "2h ago", type: "text-blue-600 bg-blue-50 border-blue-200" },
                ].map((a, ai) => (
                  <div key={ai} className="p-2.5 rounded-lg border flex items-center justify-between bg-slate-50">
                    <div>
                      <div className={`text-xs font-bold ${a.type.split(" ")[0]}`}>{a.alert}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{a.time}</div>
                    </div>
                    <button className="text-[10px] font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-xs">
                      Acknowledge
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 6. DETAIL & DRILLDOWN DRAWER / MODAL (17 Check Status Rows) */}
        {selectedDomain && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
            <div className="px-5 py-3.5 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm">
                  17 Check Vector Diagnostic Report: <span className="text-blue-600">{selectedDomain}</span>
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  ALL CATEGORIES VERIFIED
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">Execution Engine: PHP cURL Multi + Cron Workers</span>
            </div>

            <div className="p-5 space-y-6">
              {checkCategories.map((cat, ci) => (
                <div key={ci} className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>{cat.name}</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 font-bold border-b border-slate-200 text-[10px] uppercase">
                          <th className="p-2.5">Check Name</th>
                          <th className="p-2.5">Status</th>
                          <th className="p-2.5">Result Message</th>
                          <th className="p-2.5">Duration</th>
                          <th className="p-2.5 text-right">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                        {cat.checks.map((chk, chi) => (
                          <tr key={chi} className="hover:bg-slate-50 transition-colors">
                            <td className="p-2.5 font-bold text-slate-800">{chk.name}</td>
                            <td className="p-2.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${chk.badge}`}>
                                {chk.status}
                              </span>
                            </td>
                            <td className="p-2.5 text-slate-600">{chk.message}</td>
                            <td className="p-2.5 text-slate-500">{chk.duration}</td>
                            <td className="p-2.5 text-right text-slate-400">{chk.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Website Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-slate-800 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 text-base">+ Add Monitored Website</h4>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="py-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Domain or Target URL</label>
                <input
                  type="text"
                  placeholder="https://example-client.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Check Frequency</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono bg-white">
                  <option>Every 1 minute (High Priority)</option>
                  <option>Every 5 minutes (Standard)</option>
                  <option>Every 15 minutes (Relaxed)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button onClick={() => setShowAddModal(false)} className="px-3 py-1.5 text-xs text-slate-600 font-bold hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm">Save & Run Inspection</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
