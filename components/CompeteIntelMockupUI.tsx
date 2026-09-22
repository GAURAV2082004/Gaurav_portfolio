"use client";
import React, { useState } from "react";

export default function CompeteIntelMockupUI() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [domainInput, setDomainInput] = useState("https://example-competitor.com");
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const competitors = [
    { brand: "Nordic Haven", domain: "nordichaven.store", match: "98% Match", verified: true, checked: true },
    { brand: "LuxeLiving Co.", domain: "luxeliving.co", match: "96% Match", verified: true, checked: true },
    { brand: "UrbanCraft Home", domain: "urbancrafthome.com", match: "94% Match", verified: true, checked: false },
    { brand: "Apex Interiors", domain: "apexinteriors.io", match: "91% Match", verified: true, checked: true },
  ];

  const priceMatrix = [
    {
      product: "Ergonomic Mesh Task Chair Pro",
      category: "Chairs",
      ourPrice: 249.00,
      compA: 269.00,
      compB: 239.00, // lowest
      compC: 255.00,
    },
    {
      product: "Solid Oak Scandinavian Dining Table",
      category: "Tables",
      ourPrice: 649.00, // lowest
      compA: 720.00,
      compB: 689.00,
      compC: 699.00,
    },
    {
      product: "Hydraulic Storage Wall Bed (Queen)",
      category: "Beds",
      ourPrice: 1199.00,
      compA: 1149.00, // lowest
      compB: 1250.00,
      compC: 1210.00,
    },
    {
      product: "Minimalist Floating Walnut Desk",
      category: "Tables",
      ourPrice: 389.00,
      compA: 410.00,
      compB: 395.00,
      compC: 379.00, // lowest
    },
    {
      product: "Modular Velvet Sectional Sofa",
      category: "Chairs",
      ourPrice: 1450.00, // lowest
      compA: 1599.00,
      compB: 1499.00,
      compC: 1520.00,
    },
  ];

  const filteredMatrix =
    activeCategory === "All"
      ? priceMatrix
      : priceMatrix.filter((item) => item.category === activeCategory);

  return (
    <div className="w-full bg-[#F8FAFC] text-[#1E293B] rounded-xl overflow-hidden font-sans border border-[#E2E8F0] shadow-xl text-left select-none">
      {/* 1. TOP NAVIGATION BAR */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 md:px-6 h-14 flex items-center justify-between">
        {/* Left: Navy blue logo & nav links */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center text-white font-black text-sm shadow-sm">
              CI
            </div>
            <span className="font-extrabold text-[#0F172A] text-base tracking-tight">CompeteIntel</span>
            <span className="text-[10px] bg-blue-50 text-[#2563EB] font-mono font-bold px-2 py-0.5 rounded-full border border-blue-200">
              PRICING MATRIX
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-xs font-semibold">
            {["Dashboard", "Product Mappings"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === tab
                    ? "bg-slate-100 text-[#2563EB] font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Search, Refresh, Export CSV, Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg text-xs text-slate-500">
            <span>🔍</span>
            <span>Search competitor data...</span>
          </div>
          <button className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1">
            <span>🔄</span>
            <span className="hidden lg:inline text-[11px]">Refresh</span>
          </button>
          <button className="bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors">
            <span>📊</span>
            <span>Export CSV</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            AM
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="p-4 md:p-6 space-y-5">
        {/* 2. TOP SECTION: DISCOVERY & SCRAPING CONTROL PANEL */}
        <div className="bg-white p-4 md:p-5 rounded-xl border border-[#E2E8F0] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                Competitor Discovery Engine
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Input target competitor store domain to initiate autonomous SerpAPI + AI schema mapping
              </p>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold w-fit">
              ● Batched Queue Ready (5 SKUs/chunk)
            </span>
          </div>

          {/* Discovery Input Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-800 focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                placeholder="https://competitor-domain.com"
              />
            </div>
            <button
              onClick={() => setIsDiscovering(true)}
              className="w-full sm:w-auto bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm whitespace-nowrap transition-colors flex items-center justify-center gap-1.5"
            >
              <span>⚡</span>
              <span>Discover Competitors</span>
            </button>
          </div>

          {/* 4 Detected Competitor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            {competitors.map((comp, ci) => (
              <div
                key={ci}
                className="p-3 bg-slate-50/80 rounded-lg border border-slate-200 flex items-center justify-between hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    defaultChecked={comp.checked}
                    className="rounded text-[#2563EB] focus:ring-blue-400"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{comp.brand}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{comp.domain}</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-[#10B981] border border-emerald-200 px-2 py-0.5 rounded">
                  {comp.match}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. MIDDLE SECTION: 3 MARKET SUMMARY METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              label: "Total Products Tracked",
              val: "10,420",
              change: "+2.4% this week",
              sub: "Ingested via 6-layer HTML parser",
              color: "text-[#2563EB]",
              bg: "bg-blue-50",
            },
            {
              label: "Active Competitor Brands",
              val: "8 Domains",
              change: "Zero HTTP 524 timeouts",
              sub: "Batched progressive execution",
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              label: "Average Market Price",
              val: "$148.50",
              change: "Our Delta: -4.8% (Favorable)",
              sub: "Live variance vs lowest competitor",
              color: "text-indigo-600",
              bg: "bg-indigo-50",
            },
          ].map((stat, si) => (
            <div key={si} className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                  {stat.label}
                </span>
                <div className={`text-2xl font-black ${stat.color} my-1`}>{stat.val}</div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-700">{stat.change}</span>
                <span className="text-[10px] text-slate-400 font-mono">{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 4. CORE SECTION: SIDE-BY-SIDE COMPETITIVE PRICE MATRIX TABLE */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          {/* Table Header & Category Filter Pills */}
          <div className="px-4 py-3 bg-slate-50/90 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-black text-slate-900 tracking-tight">
                Side-by-Side Competitive Price Matrix Table
              </h4>
              <p className="text-[11px] text-slate-500 font-mono">
                Real-time price comparisons with dynamic lowest competitor highlights
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-slate-200">
              {["All", "Beds", "Tables", "Chairs"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1 rounded-md transition-colors ${
                    activeCategory === cat
                      ? "bg-[#2563EB] text-white shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Detailed Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/70 text-slate-600 font-bold border-b border-[#E2E8F0] text-[11px] uppercase tracking-wider">
                  <th className="p-3.5">Product Name</th>
                  <th className="p-3.5">Category Tag</th>
                  <th className="p-3.5">Your Brand Price</th>
                  <th className="p-3.5">Competitor A (Nordic)</th>
                  <th className="p-3.5">Competitor B (Luxe)</th>
                  <th className="p-3.5">Competitor C (Apex)</th>
                  <th className="p-3.5 text-right">Market Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredMatrix.map((row, ri) => {
                  const allPrices = [row.ourPrice, row.compA, row.compB, row.compC];
                  const lowest = Math.min(...allPrices);

                  return (
                    <tr key={ri} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-sans font-bold text-slate-900">{row.product}</td>
                      <td className="p-3.5">
                        <span className="bg-slate-100 text-slate-700 font-sans font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-slate-200">
                          {row.category}
                        </span>
                      </td>

                      {/* Our Price */}
                      <td className="p-3.5">
                        <span
                          className={`font-bold px-2 py-0.5 rounded ${
                            row.ourPrice === lowest
                              ? "bg-emerald-100 text-[#10B981] border border-emerald-300 font-black"
                              : "text-slate-900"
                          }`}
                        >
                          ${row.ourPrice.toFixed(2)}
                          {row.ourPrice === lowest && <span className="ml-1 text-[10px]">▼ Best Price</span>}
                        </span>
                      </td>

                      {/* Comp A */}
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded ${
                            row.compA === lowest
                              ? "bg-emerald-100 text-[#10B981] border border-emerald-300 font-bold"
                              : "text-slate-600"
                          }`}
                        >
                          ${row.compA.toFixed(2)}
                          {row.compA === lowest && <span className="ml-1 text-[10px]">▼ Lowest</span>}
                        </span>
                      </td>

                      {/* Comp B */}
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded ${
                            row.compB === lowest
                              ? "bg-emerald-100 text-[#10B981] border border-emerald-300 font-bold"
                              : "text-slate-600"
                          }`}
                        >
                          ${row.compB.toFixed(2)}
                          {row.compB === lowest && <span className="ml-1 text-[10px]">▼ Lowest</span>}
                        </span>
                      </td>

                      {/* Comp C */}
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded ${
                            row.compC === lowest
                              ? "bg-emerald-100 text-[#10B981] border border-emerald-300 font-bold"
                              : "text-slate-600"
                          }`}
                        >
                          ${row.compC.toFixed(2)}
                          {row.compC === lowest && <span className="ml-1 text-[10px]">▼ Lowest</span>}
                        </span>
                      </td>

                      {/* Delta indicator */}
                      <td className="p-3.5 text-right font-bold">
                        {row.ourPrice <= lowest ? (
                          <span className="text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                            Winning (-4.2%)
                          </span>
                        ) : (
                          <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                            +${(row.ourPrice - lowest).toFixed(2)} over
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="px-4 py-3 bg-slate-50 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Showing Page 1 of 42 (10,420 total products)</span>
            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-400 cursor-not-allowed">
                Previous
              </button>
              <button className="px-2.5 py-1 bg-[#2563EB] text-white rounded font-bold">1</button>
              <button className="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-700">
                2
              </button>
              <button className="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-700">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
