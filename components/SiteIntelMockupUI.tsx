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
      ssl: "Valid · 68d left",
      indexing: "Indexed (Clean)",
      uptimeSlots: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    },
    {
      title: "api.gateway-prod.io",
      status: "ACTIVE",
      subStatus: "MONITORED",
      latency: "38ms",
      ssl: "Valid · 142d left",
      indexing: "Noindex (API)",
      uptimeSlots: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      title: "checkout.billing-service.net",
      status: "WARNING",
      subStatus: "MONITORED",
      latency: "420ms",
      ssl: "Expiring · 4d left",
      indexing: "Noindex (Secured)",
      uptimeSlots: [1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    },
  ];

  const checkCategories = [
    {
      name: "Core Availability",
      checks: [
        { name: "HTTP 200 Response", status: "Pass", badge: "bg-emerald-100 text-emerald-700", message: "Response received in 142ms (200 OK)", duration: "142ms", time: "Just now" },
        { name: "DNS Lookup & Propagation", status: "Pass", badge: "bg-emerald-100 text-emerald-700", message: "Resolved 4 A records via Cloudflare DNS", duration: "24ms", time: "1m ago" },
        { name: "SSL Certificate Validity", status: "Pass", badge: "bg-emerald-100 text-emerald-700", message: "Issued by Let's Encrypt, expires in 68 days", duration: "48ms", time: "2m ago" },
      ],
    },
    {
      name: "SEO & Crawlability",
      checks: [
        { name: "Robots.txt Disallow Check", status: "Pass", badge: "bg-emerald-100 text-emerald-700", message: "No accidental root disallow rules found", duration: "32ms", time: "5m ago" },
        { name: "Meta Noindex Detection", status: "Pass", badge: "bg-emerald-100 text-emerald-700", message: "Index, Follow detected on primary canonical", duration: "55ms", time: "5m ago" },
        { name: "XML Sitemap 200 Response", status: "Pass", badge: "bg-emerald-100 text-emerald-700", message: "/sitemap.xml validated (4,210 URLs found)", duration: "110ms", time: "6m ago" },
        { name: "Staging URL Leak Scanner", status: "Pass", badge: "bg-emerald-100 text-emerald-700", message: "Zero staging/dev environment backlinks found", duration: "84ms", time: "6m ago" },
      ],
    },
    {
      name: "Analytics & Tracking",
      checks: [
        { name: "Google Analytics 4 (GA4)", status: "Pass", badge: "bg-emerald-100 text-emerald-700", message: "GA4 Tag G-XXXXXXXXXX detected (gtag.js)", duration: "41ms", time: "10m ago" },
        { name: "Google Tag Manager (GTM)", status: "Pass", badge: "bg-emerald-100 text-emerald-700", message: "GTM Container active: GTM-XXXXXXX", duration: "38ms", time: "10m ago" },
        { name: "Meta / Facebook Pixel", status: "Pass", badge: "bg-emerald-100 text-emerald-700", message: "fbq('init') fired with valid Pixel ID", duration: "50ms", time: "10m ago" },
      ],
    },
    {
      name: "Security & Integrity",
      checks: [
        { name: "WordPress File Checksums", status: "Pass", badge: "bg-emerald-100 text-emerald-700", message: "Core checksum verified against WP.org v6.4.2", duration: "310ms", time: "15m ago" },
        { name: "Domain Blacklist Status", status: "Pass", badge: "bg-emerald-100 text-emerald-700", message: "Not flagged on Spamhaus, SURBL, SafeBrowsing", duration: "180ms", time: "20m ago" },
        { name: "Unauthorized Admin Detector", status: "Pass", badge: "bg-emerald-100 text-emerald-700", message: "Admin count verified (2 authorized accounts)", duration: "64ms", time: "25m ago" },
      ],
    },
  ];

  return (
    <div className="relative w-full bg-[#f8fafc] text-slate-800 rounded-xl overflow-hidden font-sans border border-slate-200 shadow-lg text-left select-none">

      {/* ── TOP NAVIGATION BAR ── */}
      <div className="bg-white border-b border-slate-200 px-5 h-14 flex items-center justify-between shrink-0">
        {/* Brand + Nav */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-extrabold text-slate-900 text-sm tracking-tight">HealthDash</span>
            <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full border border-blue-200 font-mono">
              SiteIntel
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-0.5 text-xs font-semibold">
            {["Dashboard", "Global History", "Status Pages", "Settings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveNav(tab)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeNav === tab
                    ? "bg-slate-100 text-blue-600 font-bold"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          <button className="hidden sm:flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 px-3 py-1.5 rounded-lg text-xs border border-slate-200 transition-colors">
            <span>🔍</span>
            <span className="text-slate-400">Search...</span>
            <kbd className="bg-white border border-slate-200 text-[10px] px-1 rounded text-slate-300 font-mono">⌘K</kbd>
          </button>
          <div className="relative">
            <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50">🔔</button>
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </div>
          <div className="flex items-center gap-2 pl-2.5 border-l border-slate-200">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-[10px] flex items-center justify-center">AD</div>
            <div className="hidden md:block text-left leading-tight">
              <div className="text-xs font-bold text-slate-800">Admin User</div>
              <div className="text-[10px] text-slate-400">DevOps Lead</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CRITICAL ALERT BANNER ── */}
      {bannerVisible && (
        <div className="bg-red-600 text-white px-5 py-2 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center font-black text-[10px] shrink-0">!</span>
            <span>
              <strong>Action Required:</strong> Domain WHOIS verification failed —{" "}
              <em className="underline underline-offset-2">client-backup-vault.com</em> expires in <strong>4 days</strong>.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="bg-white text-red-600 font-bold px-2.5 py-0.5 rounded text-xs hover:bg-red-50">Resolve</button>
            <button onClick={() => setBannerVisible(false)} className="text-white/70 hover:text-white text-xs">✕</button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="p-5 space-y-5">

        {/* ── EXECUTIVE SUMMARY ROW ── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Health Ring */}
          <div className="col-span-12 md:col-span-4 bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 shadow-sm">
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path strokeWidth="3" stroke="#e2e8f0" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path strokeDasharray="98, 100" strokeWidth="3" strokeLinecap="round" stroke="#10b981" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-lg font-black text-slate-900 leading-none">98%</span>
                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wide">Healthy</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 leading-tight">Overall System Health</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">All checks passing across monitored endpoints with zero latency breach.</p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase tracking-wider">All Sensors Normal</span>
              </div>
            </div>
          </div>

          {/* 4 KPI Cards */}
          <div className="col-span-12 md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Sites Monitored", count: "24", icon: "🌐", num: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
              { label: "Checks Passing", count: "382", icon: "✓", num: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
              { label: "Anomalies", count: "5", icon: "⚠", num: "text-amber-600", bg: "bg-amber-50 border-amber-100" },
              { label: "Critical / Down", count: "1", icon: "🛑", num: "text-rose-600", bg: "bg-rose-50 border-rose-100" },
            ].map((k, ki) => (
              <div key={ki} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-tight">{k.label}</span>
                  <span className={`w-6 h-6 rounded-md ${k.bg} flex items-center justify-center text-xs border`}>{k.icon}</span>
                </div>
                <div className={`text-2xl font-black ${k.num}`}>{k.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── ACTION BAR ── */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Monitored Domains</h3>
            <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">24 Active</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search domain, tag, or IP..."
              className="w-52 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-slate-300"
            />
            <button className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors">
              🔄 Run All
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm"
            >
              + Add Website
            </button>
          </div>
        </div>

        {/* ── DOMAIN CARDS + RIGHT PANEL ── */}
        <div className="grid grid-cols-12 gap-4">
          {/* Domain List */}
          <div className="col-span-12 lg:col-span-8 space-y-2.5">
            {domainCards.map((card, ci) => (
              <div
                key={ci}
                onClick={() => setSelectedDomain(card.title)}
                className={`bg-white rounded-xl border p-4 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                  selectedDomain === card.title
                    ? "border-blue-400 ring-2 ring-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-900">{card.title}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                        card.status === "WARNING"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200"
                      }`}>{card.status}</span>
                      <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">{card.subStatus}</span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-[11px] font-mono text-slate-500 mt-1.5">
                      <span>⚡ <strong className="text-slate-700">{card.latency}</strong></span>
                      <span>🔒 <strong className={card.ssl.includes("Expiring") ? "text-amber-600" : "text-slate-700"}>{card.ssl}</strong></span>
                      <span>🤖 <strong className="text-slate-700">{card.indexing}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Uptime bars */}
                    <div className="flex items-end gap-0.5">
                      {card.uptimeSlots.map((slot, si) => (
                        <div
                          key={si}
                          className={`w-1.5 rounded-sm ${
                            slot === 1 ? "h-5 bg-emerald-500" : slot === 2 ? "h-3 bg-amber-400" : "h-2 bg-red-500"
                          }`}
                        />
                      ))}
                    </div>
                    <button className="text-[11px] font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-lg">
                      Run Checks
                    </button>
                    <button className="text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1.5 rounded-lg">
                      Diagnostics ↗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Panel */}
          <div className="col-span-12 lg:col-span-4 space-y-3">
            {/* Regional Uptime */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Regional Telemetry</span>
                <span className="text-[11px] font-mono font-bold text-emerald-600">99.8% Global</span>
              </div>
              {[
                { region: "North America (US-East)", uptime: "99.9%", w: "99" },
                { region: "Europe (Frankfurt)", uptime: "98.4%", w: "98" },
                { region: "Asia Pacific (Mumbai)", uptime: "99.7%", w: "99" },
              ].map((r, ri) => (
                <div key={ri} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>{r.region}</span>
                    <span className="font-bold text-slate-700">{r.uptime}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${r.w}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Live Alert Feed */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Live Alert Feed</span>
                <span className="flex gap-1 items-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping opacity-75" />
                  <span className="w-2 h-2 rounded-full bg-red-500 absolute" />
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { alert: "503 Error on API Gateway", time: "2m ago", color: "text-rose-600 bg-rose-50 border-rose-100" },
                  { alert: "SSL Certificate Expiring in 48h", time: "1h ago", color: "text-amber-600 bg-amber-50 border-amber-100" },
                  { alert: "cURL Multi: 17 vectors completed", time: "2h ago", color: "text-blue-600 bg-blue-50 border-blue-100" },
                ].map((a, ai) => (
                  <div key={ai} className={`rounded-lg border p-2.5 flex items-center justify-between ${a.color}`}>
                    <div>
                      <div className="text-[11px] font-bold">{a.alert}</div>
                      <div className="text-[10px] opacity-60 font-mono mt-0.5">{a.time}</div>
                    </div>
                    <button className="text-[10px] font-bold bg-white border border-current/20 px-2 py-0.5 rounded opacity-80 hover:opacity-100">
                      ACK
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── DRILLDOWN TABLE ── */}
        {selectedDomain && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900">
                  Diagnostic Report:{" "}
                  <span className="text-blue-600">{selectedDomain}</span>
                </span>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                  ALL CLEAR
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Engine: PHP cURL Multi + Cron Workers</span>
            </div>

            <div className="p-5 space-y-5">
              {checkCategories.map((cat, ci) => (
                <div key={ci} className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>{cat.name}</span>
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-slate-100">
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] uppercase text-slate-400 font-bold border-b border-slate-200">
                          <th className="px-3 py-2">Check</th>
                          <th className="px-3 py-2">Status</th>
                          <th className="px-3 py-2">Result</th>
                          <th className="px-3 py-2">Duration</th>
                          <th className="px-3 py-2 text-right">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {cat.checks.map((chk, chi) => (
                          <tr key={chi} className="hover:bg-slate-50 transition-colors">
                            <td className="px-3 py-2 font-bold text-slate-800">{chk.name}</td>
                            <td className="px-3 py-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${chk.badge}`}>
                                {chk.status}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-slate-500 text-[10px]">{chk.message}</td>
                            <td className="px-3 py-2 text-slate-500">{chk.duration}</td>
                            <td className="px-3 py-2 text-right text-slate-400">{chk.time}</td>
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

      {/* ── ADD WEBSITE MODAL (contained inside box) ── */}
      {showAddModal && (
        <div className="absolute inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-6 rounded-xl">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-sm p-5 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="font-bold text-slate-900 text-sm">+ Add Monitored Website</h4>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 text-lg leading-none">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Domain or Target URL</label>
                <input
                  type="text"
                  placeholder="https://example-client.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Check Frequency</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono bg-white text-xs">
                  <option>Every 1 minute (High Priority)</option>
                  <option>Every 5 minutes (Standard)</option>
                  <option>Every 15 minutes (Relaxed)</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-4 mt-2 border-t border-slate-100">
              <button onClick={() => setShowAddModal(false)} className="px-3 py-1.5 text-xs text-slate-600 font-bold hover:bg-slate-50 rounded-lg border border-slate-200">
                Cancel
              </button>
              <button onClick={() => setShowAddModal(false)} className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm">
                Save & Run Inspection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
