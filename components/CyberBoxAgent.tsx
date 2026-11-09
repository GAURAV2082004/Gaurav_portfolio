"use client";

import { useEffect, useState, useRef } from "react";

export interface BoxAgentWaypoint {
  xPercent: number;
  yPercent: number;
  action: "click" | "type" | "highlight" | "inspect";
  statusText: string;
  typeText?: string;
  duration?: number;
  pause?: number;
  targetLabel?: string;
}

export interface CyberBoxAgentProps {
  agent: {
    id: string;
    name: string;
    role: string;
    color: string;
    badgeBg?: string;
    badgeBorder?: string;
  };
  waypoints: BoxAgentWaypoint[];
  className?: string;
}

export default function CyberBoxAgent({
  agent,
  waypoints,
  className = "",
}: CyberBoxAgentProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [pos, setPos] = useState({ x: 15, y: 35 });
  const [isClicking, setIsClicking] = useState(false);
  const [typedString, setTypedString] = useState("");
  const [statusText, setStatusText] = useState("Initializing node...");
  const [isTargetLocked, setIsTargetLocked] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || waypoints.length === 0) return;

    let isRunning = true;
    let stepIdx = 0;
    const timeouts: NodeJS.Timeout[] = [];
    const intervals: NodeJS.Timeout[] = [];

    const runStep = () => {
      if (!isRunning) return;

      const wp = waypoints[stepIdx];
      setCurrentIdx(stepIdx);
      stepIdx = (stepIdx + 1) % waypoints.length;

      // 1. Move to waypoint
      const targetX = wp.xPercent;
      const targetY = wp.yPercent;
      setPos({ x: targetX, y: targetY });
      setStatusText(`Targeting sector...`);
      setIsTargetLocked(false);
      setTypedString("");

      const moveDuration = wp.duration || 850;

      // 2. Arrived at target
      const arriveTimeout = setTimeout(() => {
        if (!isRunning) return;

        setIsTargetLocked(true);
        setStatusText(wp.statusText);

        // Perform Action
        if (wp.action === "click" || wp.action === "type" || wp.action === "highlight") {
          // Tactile click
          setIsClicking(true);
          const clickRelease = setTimeout(() => {
            if (!isRunning) return;
            setIsClicking(false);

            // If typing action, stream characters
            if (wp.action === "type" && wp.typeText) {
              const fullText = wp.typeText;
              let charIdx = 0;
              const typeInterval = setInterval(() => {
                if (!isRunning) {
                  clearInterval(typeInterval);
                  return;
                }
                charIdx++;
                setTypedString(fullText.slice(0, charIdx));
                if (charIdx >= fullText.length) {
                  clearInterval(typeInterval);
                }
              }, 42);
              intervals.push(typeInterval);
            }
          }, 240);
          timeouts.push(clickRelease);
        }

        // Wait pause duration then run next step
        const pauseTime = wp.pause || 2200;
        const nextTimeout = setTimeout(() => {
          if (!isRunning) return;
          setIsTargetLocked(false);
          runStep();
        }, pauseTime);
        timeouts.push(nextTimeout);
      }, moveDuration);

      timeouts.push(arriveTimeout);
    };

    // Stagger start slightly
    const initDelay = setTimeout(runStep, 400 + Math.random() * 600);
    timeouts.push(initDelay);

    return () => {
      isRunning = false;
      timeouts.forEach((t) => clearTimeout(t));
      intervals.forEach((i) => clearInterval(i));
    };
  }, [mounted, waypoints]);

  if (!mounted) return null;

  const currentWp = waypoints[currentIdx];

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-20 ${className}`}
    >
      {/* ─── Target Bounding Box / Laser Reticle on the Active Area ─── */}
      {isTargetLocked && (
        <div
          className="absolute transition-all duration-300 pointer-events-none animate-selection-pulse"
          style={{
            left: `calc(${pos.x}% - 14px)`,
            top: `calc(${pos.y}% - 12px)`,
            width: "160px",
            height: "46px",
            borderColor: agent.color,
          }}
        >
          {/* Laser Corner Brackets */}
          <span
            className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2"
            style={{ borderColor: agent.color }}
          />
          <span
            className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2"
            style={{ borderColor: agent.color }}
          />
          <span
            className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2"
            style={{ borderColor: agent.color }}
          />
          <span
            className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2"
            style={{ borderColor: agent.color }}
          />

          {/* Micro Laser Scan Sweep */}
          <div
            className="absolute inset-x-0 h-0.5 animate-laser-sweep"
            style={{
              backgroundColor: agent.color,
              boxShadow: `0 0 6px ${agent.color}`,
            }}
          />

          {/* Target Label */}
          {currentWp?.targetLabel && (
            <div
              className="absolute -top-4 left-0 px-1.5 py-0.2 rounded text-[7px] font-mono font-bold tracking-wider uppercase border backdrop-blur-md whitespace-nowrap shadow"
              style={{
                backgroundColor: "rgba(3, 7, 18, 0.95)",
                borderColor: agent.color,
                color: agent.color,
              }}
            >
              [LOCK // {currentWp.targetLabel}]
            </div>
          )}
        </div>
      )}

      {/* ─── Cyberpunk Agent Cursor ─── */}
      <div
        className="absolute transition-transform duration-700 ease-out will-change-transform"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(calc(${pos.x} * 1% - 3px), calc(${pos.y} * 1% - 3px), 0)`,
        }}
      >
        {/* Tactile Click Shockwave Ring */}
        {isClicking && (
          <div
            className="absolute -top-3.5 -left-3.5 w-9 h-9 rounded-full border-2 pointer-events-none"
            style={{
              borderColor: agent.color,
              animation: "click-ripple 0.45s cubic-bezier(0.1, 0.8, 0.3, 1) forwards",
              boxShadow: `0 0 14px ${agent.color}`,
            }}
          />
        )}

        {/* Reticle Spin when Targeted */}
        {isTargetLocked && (
          <div
            className="absolute -top-3 -left-3 w-8 h-8 rounded-full border border-dashed pointer-events-none animate-reticle-spin"
            style={{
              borderColor: agent.color,
              opacity: 0.7,
            }}
          />
        )}

        {/* Custom SVG Neon Cursor Arrow */}
        <div
          className={`relative ${
            isClicking ? "scale-90 translate-x-0.5 translate-y-0.5" : ""
          } transition-transform duration-100`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
          >
            <path
              d="M3 2L10.5 21L13.5 13.5L21 10.5L3 2Z"
              fill="#030712"
              stroke={agent.color}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <polygon points="5,5 10,18 12.5,12.5 18,10" fill={agent.color} opacity="0.4" />
          </svg>

          {/* Pulsing Beacon on cursor tip */}
          <div
            className="absolute top-0 left-0 w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: agent.color,
              boxShadow: `0 0 8px 1px ${agent.color}`,
            }}
          />
        </div>

        {/* ─── Ultra-Techy Agent Badge ─── */}
        <div
          className="absolute left-5 top-1 flex flex-col items-start gap-1 pointer-events-none select-none"
          style={{ minWidth: "130px" }}
        >
          {/* Header Tag */}
          <div
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold tracking-wider backdrop-blur-md border shadow-lg"
            style={{
              backgroundColor: "rgba(3, 7, 18, 0.95)",
              borderColor: agent.badgeBorder || `${agent.color}50`,
              color: agent.color,
              boxShadow: `0 0 10px ${agent.color}33`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-ping"
              style={{ backgroundColor: agent.color }}
            />
            <span>{agent.name}</span>
            <span className="text-gray-400 font-normal text-[8px]">[{agent.role}]</span>
          </div>

          {/* Dynamic Typing & Status Sub-badge */}
          <div
            className="px-2 py-0.5 rounded text-[8px] font-mono backdrop-blur-md border text-gray-200 max-w-[210px] truncate"
            style={{
              backgroundColor: "rgba(5, 8, 17, 0.92)",
              borderColor: isTargetLocked ? `${agent.color}80` : "rgba(255, 255, 255, 0.1)",
              boxShadow: isTargetLocked ? `0 0 8px ${agent.color}20` : "none",
            }}
          >
            {typedString ? (
              <span className="text-white font-mono flex items-center gap-1">
                <span style={{ color: agent.color }}>&gt;</span>
                <span className="truncate">{typedString}</span>
                <span
                  className="animate-typing-cursor w-1 h-3 inline-block"
                  style={{ backgroundColor: agent.color }}
                />
              </span>
            ) : (
              <span>{statusText}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
