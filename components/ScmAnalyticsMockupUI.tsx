"use client";
import React, { useState } from "react";

export default function ScmAnalyticsMockupUI() {
  const [activeMenu, setActiveMenu] = useState("Margins & Insights");
  const [balanceModalOpen, setBalanceModalOpen] = useState(false);
  const [reductionAmount, setReductionAmount] = useState("4500.00");

  const kpis = [
    { label: "BILLED REVENUE (MTD)", val: "₹14,82,450", change: "+18.4% MoM", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
    { label: "PENDING RECEIVABLES", val: "₹3,42,100", change: "14 Invoices Due", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
    { label: "VENDOR DISPUTES / RETURNS", val: "₹68,400", change: "5 Open Claims", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" },
    { label: "AVG GROSS PROFIT MARGIN", val: "34.8%", change: "+3.2% vs target", color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200" },
  ];

  const orders = [
    { id: "WB-2026-1042", client: "Royal Luxe Furnishings", channel: "WhatsApp", spend: "₹1,45,000", cost: "₹94,000", margin: "+35.1%", status: "Delivered", statusBg: "bg-emerald-100 text-emerald-800" },
    { id: "WB-2026-1043", client: "Urban Haven Studios", channel: "Google Forms", spend: "₹88,500", cost: "₹59,000", margin: "+33.3%", status: "Processing", statusBg: "bg-blue-100 text-blue-800" },
    { id: "WB-2026-1044", client: "Prestige Decor Mart", channel: "Direct Order", spend: "₹2,10,000", cost: "₹1,32,000", margin: "+37.1%", status: "Pending", statusBg: "bg-amber-100 text-amber-800" },
    { id: "WB-2026-1045", client: "Elite Living Wholesale", channel: "WhatsApp", spend: "₹64,200", cost: "₹48,000", margin: "+25.2%", status: "Issue Claim", statusBg: "bg-rose-100 text-rose-800" },
  ];

  return (
    <div className="w-full bg-slate-50 text-slate-800 rounded-xl overflow-hidden font-sans border border-slate-200 shadow-xl text-left select-none">
      {/* Shell with Left Sidebar and Main Canvas */}
      <div className="flex flex-col md:flex-row min-h-[500px]">
        {/* LEFT SIDEBAR (Dark Slate Theme #0f172a) */}
        <div className="w-full md:w-60 bg-slate-900 text-slate-300 p-4 flex flex-col justify-between border-r border-slate-800 flex-shrink-0">
          <div>
            {/* Brand Header */}
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                WB
              </div>
              <div>
                <h4 className="text-xs font-black text-white tracking-tight leading-tight">
                  Wacky Brandhub
                </h4>
                <p className="text-[10px] text-emerald-400 font-mono font-semibold">BrandHubOS ERP</p>
              </div>
            </div>

            {/* Menu List */}
            <div className="mt-4 space-y-1 text-xs">
              {[
                { name: "Dashboard", icon: "📊" },
                { name: "Margins & Insights", icon: "📈" },
                { name: "Order Sourcing Queue", icon: "📦" },
                { name: "Vendor Expenses (Procurement)", icon: "🏷️" },
                { name: "Live Sheets 2-Way Sync", icon: "🔄" },
                { name: "Client Receivables & Claims", icon: "💳" },
                { name: "Invoices & Billing", icon: "🧾" },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                    activeMenu === item.name
                      ? "bg-emerald-500/15 text-emerald-400 font-bold border-l-2 border-emerald-500"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs py-2 px-3 rounded-lg shadow-md hover:brightness-110 flex items-center justify-center gap-1">
              <span>+</span> New Order Entry
            </button>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-[11px]">
                AU
              </div>
              <div className="leading-tight">
                <div className="font-bold text-white text-[11px]">Admin User</div>
                <div className="text-[9px] text-slate-400 font-mono">Role: Super Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT MAIN WORKSPACE */}
        <div className="flex-1 p-4 md:p-6 space-y-4 overflow-x-auto">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-base md:text-lg font-black text-slate-900 tracking-tight">
                Operations & Procurement SCM Analytics
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Hybrid 2-Way Google Sheets Sync (js/sheets-api.js + MySQL Cache)
              </p>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-[11px] bg-emerald-50 text-emerald-700 font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Sheets Webhook: 200ms LIVE
              </span>
              <button
                onClick={() => setBalanceModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm"
              >
                ₹ Adjust Client Balance
              </button>
            </div>
          </div>

          {/* D. Smart Financial Balance Alert Strip */}
          <div className="p-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">💰</span>
              <div>
                <strong className="text-amber-900 font-bold">Client Credit Balance Detected: ₹28,450.00</strong>
                <p className="text-[11px] text-amber-700">Past return credit available for adjustment against new order invoices.</p>
              </div>
            </div>
            <button
              onClick={() => setBalanceModalOpen(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] px-3 py-1 rounded-lg shadow-sm"
            >
              Apply Balance (₹)
            </button>
          </div>

          {/* A. 4 KPI CARDS GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {kpis.map((kpi, ki) => (
              <div key={ki} className={`bg-white p-3 rounded-xl border ${kpi.border} shadow-sm flex flex-col justify-between`}>
                <span className="text-[10px] font-bold text-slate-500 uppercase">{kpi.label}</span>
                <div className={`text-lg md:text-xl font-black ${kpi.color} my-1`}>{kpi.val}</div>
                <span className={`text-[10px] font-bold ${kpi.color} ${kpi.bg} px-2 py-0.5 rounded w-fit`}>
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>

          {/* C. ENTERPRISE DATA TABLE */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between text-xs">
              <span className="font-black text-slate-900">Live Procurement & Sales Ledger</span>
              <span className="font-mono text-slate-500 text-[11px]">Filtered: 500+ Customers • 1,000+ Orders</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-[11px] uppercase">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Client / Brand</th>
                    <th className="p-3">Channel</th>
                    <th className="p-3">Billed (₹)</th>
                    <th className="p-3">Procurement Cost</th>
                    <th className="p-3">Spread Margin</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((ord, oi) => (
                    <tr key={oi} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-900">{ord.id}</td>
                      <td className="p-3 font-semibold text-slate-800">{ord.client}</td>
                      <td className="p-3 font-mono text-[11px] text-slate-600">{ord.channel}</td>
                      <td className="p-3 font-bold text-emerald-700">{ord.spend}</td>
                      <td className="p-3 font-mono text-slate-600">{ord.cost}</td>
                      <td className="p-3 font-bold text-teal-600">{ord.margin}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${ord.statusBg}`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded">
                          PDF 📥
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Partial Balance Reduction Modal */}
      {balanceModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 text-slate-800 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 text-base">💰 Reduce Client Balance</h4>
              <button onClick={() => setBalanceModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="py-4 space-y-3">
              <p className="text-xs text-slate-600">
                Available Return / Credit Balance: <strong className="text-emerald-600">₹28,450.00</strong>
              </p>
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Amount to Deduct (₹)</label>
                <input
                  type="text"
                  value={reductionAmount}
                  onChange={(e) => setReductionAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                This transaction triggers an automated webhook log in the connected Google Sheet ledger.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button onClick={() => setBalanceModalOpen(false)} className="px-3 py-1.5 text-xs text-slate-600 font-bold hover:bg-slate-100 rounded-lg">Cancel</button>
              <button onClick={() => setBalanceModalOpen(false)} className="px-4 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm">Apply Reduction</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
