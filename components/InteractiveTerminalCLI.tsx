"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { sound } from "@/lib/audio";

interface LogEntry {
  type: "input" | "output" | "error" | "system";
  text: string;
}

export default function InteractiveTerminalCLI() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    {
      type: "system",
      text: "Developer OS Terminal v4.2 initialized. Type 'help' to inspect available system commands.",
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    sound.playClick(1100);

    // Save to command history
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    const newLogs: LogEntry[] = [...history, { type: "input", text: `gaurav@dev-os:~$ ${cmd}` }];

    const args = cmd.toLowerCase().split(" ");
    const primary = args[0];

    switch (primary) {
      case "help":
        newLogs.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
  help               - List all available OS commands
  skills             - Inspect neural technology matrix & scroll to section
  projects           - Query production systems & scroll to section
  about              - Display developer profile & scroll to section
  exp                - View enterprise experience logs & scroll to section
  contact            - Launch direct transmission channels & scroll to section
  status             - Output live system kernel telemetry
  cat manifest.json  - Output raw system manifest payload
  sudo [command]     - Execute command with elevated permissions
  clear              - Purge terminal buffer`,
        });
        break;

      case "skills":
        newLogs.push({
          type: "output",
          text: "[ROUTER] Navigating to Neural Technology Matrix...",
        });
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        break;

      case "projects":
        newLogs.push({
          type: "output",
          text: "[ROUTER] Loading Bento-Grid Production Systems (5 verified projects)...",
        });
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        break;

      case "about":
        newLogs.push({
          type: "output",
          text: "[ROUTER] Navigating to Developer Specification Manifest...",
        });
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        break;

      case "exp":
      case "experience":
        newLogs.push({
          type: "output",
          text: "[ROUTER] Inspecting Blank Analytica SWE Intern timeline logs...",
        });
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        break;

      case "contact":
        newLogs.push({
          type: "output",
          text: "[UPLINK] Direct channel: jadligaurav2082004@gmail.com | Mumbai, India",
        });
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        break;

      case "status":
        newLogs.push({
          type: "output",
          text: `SYS_TELEMETRY:
  KERNEL:       dev-os v4.2.0-prod
  STACK:        Next.js 16 + React 19 + TypeScript + Tailwind CSS
  STATUS:       OPERATIONAL // 18ms latency
  CPU_LOAD:     14.2%
  LOCATION:     Mumbai, India (19.0760° N, 72.8777° E)
  SECURITY:     TLS 1.3 / AES-256-GCM`,
        });
        break;

      case "cat":
        if (args[1] === "manifest.json" || args[1] === "manifest") {
          newLogs.push({
            type: "output",
            text: JSON.stringify(
              {
                callsign: "Gaurav Shailendra Jadli",
                role: "Software Engineering & Automation Specialist",
                education: "B.Tech Computer Engineering (2022-2026)",
                institution: "Pillai College of Engineering, Univ of Mumbai",
                current_engagement: "Software Engineering Intern @ Blank Analytica",
                verified_certs: 3,
                production_tools_shipped: "7+",
              },
              null,
              2
            ),
          });
        } else {
          newLogs.push({
            type: "error",
            text: `cat: ${args[1] || ""}: No such file. Try 'cat manifest.json'`,
          });
        }
        break;

      case "sudo":
        newLogs.push({
          type: "output",
          text: "[ACCESS_GRANTED] You already hold root developer privileges on this terminal.",
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newLogs.push({
          type: "error",
          text: `command not recognized: '${cmd}'. Type 'help' for available commands.`,
        });
        break;
    }

    setHistory(newLogs);
    setInputVal("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    sound.playKeyType();

    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(cmdHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInputVal("");
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[99990] font-mono">
      {/* Floating CLI Toggle Pill */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            sound.playBeep();
            setIsOpen(true);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0a0a0a]/95 hover:bg-neutral-900 border border-[#ff3333]/40 text-xs text-white shadow-[0_0_20px_rgba(255,51,51,0.3)] hover:shadow-[0_0_30px_rgba(255,51,51,0.5)] transition-all cursor-pointer backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#ff3333] animate-pulse" />
          <span className="text-[#ff4d4d] font-bold">&gt;_</span>
          <span>DEV_CLI</span>
          <span className="text-[10px] text-neutral-400 hidden sm:inline">[TYPE 'HELP']</span>
        </button>
      )}

      {/* Expanded Terminal Window */}
      {isOpen && (
        <div className="w-[94vw] sm:w-[500px] h-72 sm:h-80 bg-[#070707]/98 border border-[#ff3333]/50 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden backdrop-blur-xl animate-fade-in corner-bracket">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-3.5 py-2 bg-neutral-950 border-b border-neutral-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff3333]" />
              <span className="text-white font-bold text-[11px]">gaurav@dev-os:~ (CLI v4.2)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setHistory([])}
                className="text-[10px] text-neutral-400 hover:text-white px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800"
              >
                CLEAR
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick(600);
                  setIsOpen(false);
                }}
                className="text-neutral-400 hover:text-white text-xs px-1.5 py-0.5 rounded hover:bg-neutral-900"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Terminal Output Log Area */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs text-neutral-300 font-mono">
            {history.map((h, i) => (
              <div key={i} className="leading-relaxed whitespace-pre-wrap">
                {h.type === "input" && (
                  <span className="text-[#ff4d4d] font-bold">{h.text}</span>
                )}
                {h.type === "output" && (
                  <span className="text-neutral-200">{h.text}</span>
                )}
                {h.type === "system" && (
                  <span className="text-neutral-500 italic">{h.text}</span>
                )}
                {h.type === "error" && (
                  <span className="text-rose-400">{h.text}</span>
                )}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>

          {/* Terminal Interactive Input */}
          <div className="flex items-center gap-2 px-3 py-2 bg-neutral-950/90 border-t border-neutral-800/80 text-xs">
            <span className="text-[#ff3333] font-bold">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'skills', 'projects'..."
              className="flex-1 bg-transparent text-white focus:outline-none placeholder-neutral-600 font-mono text-xs"
            />
            <span className="w-1.5 h-3.5 bg-[#ff3333] animate-pulse" />
          </div>
        </div>
      )}
    </div>
  );
}
