"use client";
import React, { useState } from "react";

export default function WorkPlannerMockupUI() {
  const [activeTab, setActiveTab] = useState("Workspace");
  const [promptText, setPromptText] = useState("Schedule sprint planning with dev team tomorrow at 4:30pm for 1 hour with 15min leadup reminder");
  const [isListening, setIsListening] = useState(false);

  const parsedActions = [
    { type: "Calendar Event", title: "Sprint Planning with Dev Team", time: "Tomorrow, 4:30 PM – 5:30 PM", rrule: "Single Instance", confidence: "99.2%", status: "Google OAuth 2.0 Ready" },
    { type: "Reminder Sequence", title: "Lead-up Notification (15 min prior)", time: "Tomorrow, 4:15 PM", rrule: "Alert Pop", confidence: "98.5%", status: "Scheduled" },
  ];

  const kanbanColumns = [
    { title: "Inbox (2)", tasks: ["Review API security PR #14", "Email client invoice for SCM order"] },
    { title: "Upcoming (3)", tasks: ["Sprint Planning with Dev Team", "Update OpenAI Whisper model weights", "Check MySQL event scheduler"] },
    { title: "In Progress (1)", tasks: ["Fine-tune iCal RRULE parser engine"] },
    { title: "Done (4)", tasks: ["Google OAuth 2.0 refresh flow", "Setup offline IndexedDB cache"] },
  ];

  return (
    <div className="w-full bg-[#0B1220] text-gray-100 rounded-xl overflow-hidden font-sans border border-gray-800 shadow-2xl text-left select-none">
      {/* Top Bar with Google OAuth Status */}
      <div className="bg-[#111827] border-b border-gray-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            🌐
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-tight">Orbit Assistant</span>
            <span className="text-[10px] text-blue-400 font-mono ml-2 bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 rounded-full">
              AI EXECUTIVE PLANNER
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Google OAuth 2.0: Connected (gaurav@jadli.dev)
          </span>
          <span className="bg-gray-800 text-gray-300 px-2.5 py-1 rounded-lg border border-gray-700">
            Timezone: IST (UTC+05:30)
          </span>
        </div>
      </div>

      {/* Main Grid: Left Chat & Action Parser / Right Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT COLUMN: Prompt Input & Voice Stream (6 cols) */}
        <div className="lg:col-span-6 p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-gray-800 space-y-4 bg-[#0e1626]">
          {/* Ask Orbit Hero Input Card */}
          <div className="bg-[#1F2937] p-4 rounded-xl border border-gray-700 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <span>✨</span> Ask Orbit (Natural Language & Voice)
              </span>
              <button
                onClick={() => setIsListening(!isListening)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  isListening
                    ? "bg-red-600 text-white animate-pulse"
                    : "bg-gray-800 hover:bg-gray-700 text-cyan-400 border border-gray-600"
                }`}
              >
                <span>🎙️</span>
                <span>{isListening ? "Whisper-1 Ingesting..." : "OpenAI Whisper Voice"}</span>
              </button>
            </div>

            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full bg-[#111827] text-white p-3 rounded-lg border border-gray-700 text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none h-20"
              placeholder="e.g. schedule meeting tomorrow at 4:30pm..."
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
              <div className="flex items-center gap-1 text-gray-400 font-mono">
                <span className="bg-gray-800 px-2 py-0.5 rounded text-gray-300">📅 Calendar Event</span>
                <span className="bg-gray-800 px-2 py-0.5 rounded text-gray-300">⏰ Lead-up Alert</span>
                <span className="bg-gray-800 px-2 py-0.5 rounded text-gray-300">📋 Kanban Sync</span>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-1.5 rounded-lg text-xs flex items-center gap-1 shadow-md">
                <span>Parse & Execute</span> ❯
              </button>
            </div>
          </div>

          {/* Parsed Action Stream Cards */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase text-gray-400 font-bold flex items-center justify-between">
              <span>Deterministic Router Output (GPT-4o-mini)</span>
              <span className="text-emerald-400 text-[10px]">100% Deterministic JSON</span>
            </div>

            {parsedActions.map((act, ai) => (
              <div key={ai} className="p-3 bg-[#1F2937] border border-gray-700 rounded-xl space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <span>⚡</span> {act.type}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    {act.status}
                  </span>
                </div>
                <div className="font-semibold text-white">{act.title}</div>
                <div className="text-[11px] text-gray-400 font-mono flex items-center gap-3">
                  <span>🕒 {act.time}</span>
                  <span>🔁 {act.rrule}</span>
                  <span>Confidence: <strong className="text-emerald-400">{act.confidence}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Kanban Board (6 cols) */}
        <div className="lg:col-span-6 p-4 md:p-6 space-y-4 bg-[#0B1220]">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Integrated Task Board (Offline-First Kanban)
              </h4>
              <p className="text-[11px] text-gray-400 font-mono">
                IndexedDB local persistence syncs to MySQL & Google Tasks
              </p>
            </div>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 rounded">
              AUTO-LINKED
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {kanbanColumns.map((col, ci) => (
              <div key={ci} className="bg-[#111827] p-3 rounded-xl border border-gray-800 space-y-2">
                <div className="text-xs font-bold text-gray-300 border-b border-gray-800 pb-1.5 flex items-center justify-between">
                  <span>{col.title}</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <div className="space-y-1.5">
                  {col.tasks.map((tsk, ti) => (
                    <div
                      key={ti}
                      className="p-2 bg-[#1F2937] hover:bg-[#283548] transition-colors rounded-lg border border-gray-700/60 text-[11px] text-gray-200 leading-snug cursor-pointer flex items-center justify-between group"
                    >
                      <span className="truncate pr-1">{tsk}</span>
                      <span className="text-[9px] text-gray-500 group-hover:text-cyan-400">⋮</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
