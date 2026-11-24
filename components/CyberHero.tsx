"use client";

import { useEffect, useRef, useState } from "react";
import DraggableWindow from "./DraggableWindow";
import CyberBoxAgent from "./CyberBoxAgent";
import { sound } from "@/lib/audio";
import { HERO_COUNTER_STATS } from "@/data/stats";
import { cursorQueue } from "@/lib/cursorQueue";
import LiveBuild from "./LiveBuild";
import Typed from "./Typed";

export default function CyberHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [sandboxLog, setSandboxLog] = useState<string[]>([
    "[KERNEL] System core initialized in 14 ms",
    "[AGENT-01] DOM crawler active: 10k+ SKUs indexed",
    "[AGENT-02] Uptime sentinel healthy: 200+ domains online",
  ]);

  // 3D tilt effect on hero stage
  useEffect(() => {
    const stage = stageRef.current;
    const photo = photoRef.current;
    if (!stage || !photo) return;

    // Register hero photo with cursor build queue
    cursorQueue.registerBlock(photo, { id: "hero-photo", isGraphic: true });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      photo.style.setProperty("--ry", `${x * 14}deg`);
      photo.style.setProperty("--rx", `${-y * 10}deg`);
    };
    const handleLeave = () => {
      photo.style.setProperty("--ry", "0deg");
      photo.style.setProperty("--rx", "0deg");
    };
    stage.addEventListener("pointermove", handleMove);
    stage.addEventListener("pointerleave", handleLeave);
    return () => {
      stage.removeEventListener("pointermove", handleMove);
      stage.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  // Live telemetry log stream
  useEffect(() => {
    const logs = [
      "[DB:MYSQL] Query execution cached in 180 ms",
      "[AI:WHISPER] Audio stream parsed to structured JSON",
      "[SCRAPER] 6-stage fallback parser reached 95% accuracy",
      "[ERP:SYNC] Two-way Google Sheets webhook synchronized",
      "[SENTINEL] SSL cert countdown verified (284 days valid)",
    ];
    const interval = setInterval(() => {
      setSandboxLog((prev) => [
        ...prev.slice(-3),
        logs[Math.floor(Math.random() * logs.length)],
      ]);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero" style={{ position: "relative" }}>
      {/* Perspective grid floor */}
      <div className="grid-floor" aria-hidden="true" />

      <div className="wrap">
        {/* Stage: hero-word + photo */}
        <div ref={stageRef} className="stage" id="stage">
          <div className="hero-word" aria-hidden="true">
            PORTFOLIO
          </div>

          <div
            ref={photoRef}
            className="hero-photo cutout live-build-target pre"
            id="heroPhoto"
            data-live-build="hero-photo"
            data-is-graphic="true"
          >
            <img
              src="/gaurav-cutout.png"
              alt="Gaurav Jadli — Software Developer & AI Automation Engineer"
              width={768}
              height={1024}
              loading="eager"
            />
          </div>
        </div>

        {/* Hero meta: name + pitch */}
        <div className="hero-meta">
          {/* Left: name */}
          <LiveBuild id="hero-name-block">
            <p className="hello">
              <Typed>Hello, I&apos;m</Typed>
            </p>
            <h1 className="display hero-name">
              <span>
                <Typed>Gaurav</Typed>
              </span>
              <span className="r">
                {" "}
                <Typed>Jadli</Typed>
              </span>
            </h1>
            <span className="role-chip">
              <Typed>Software Developer / AI &amp; Automation Engineer</Typed>
            </span>
          </LiveBuild>

          {/* Right: status + pitch + stats */}
          <LiveBuild id="hero-pitch-block">
            <p className="now">
              <i />
              <Typed>Open to opportunities · Mumbai, India</Typed>
            </p>
            <p className="pitch">
              <Typed>
                Building autonomous scrapers, enterprise ERPs, and real-time monitoring tools. Computer
                Engineering at Pillai College of Engineering, University of Mumbai.
              </Typed>
            </p>
            <div className="stats">
              {HERO_COUNTER_STATS.map((stat, i) => (
                <div key={i} className="stat">
                  <b>{stat.value}</b>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              <a
                href="#projects"
                onClick={() => sound.playClick(1000)}
                className="btn"
                style={{
                  fontSize: 14,
                  padding: "12px 22px",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.1em",
                }}
              >
                [▶ VIEW_PROJECTS]
              </a>
              <a
                href="#contact"
                onClick={() => sound.playClick(900)}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 14,
                  letterSpacing: "0.1em",
                  padding: "12px 22px",
                  border: "1px solid var(--accent)",
                  color: "var(--accent-2)",
                  background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all .2s",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                [&gt;_ INITIALIZE_CONTACT]
              </a>
              <a
                href="https://github.com/GAURAV2082004"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  padding: "12px 16px",
                  border: "1px solid var(--line)",
                  color: "var(--mute)",
                  background: "var(--panel)",
                  transition: "all .2s",
                }}
              >
                GITHUB ↗
              </a>
              <a
                href="https://linkedin.com/in/gauravjadli04"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 12,
                  padding: "12px 16px",
                  border: "1px solid var(--line)",
                  color: "var(--mute)",
                  background: "var(--panel)",
                  transition: "all .2s",
                }}
              >
                LINKEDIN ↗
              </a>
            </div>
          </LiveBuild>
        </div>

        {/* Live agent terminal */}
        <LiveBuild id="hero-terminal-block" isGraphic className="mt-12">
          <DraggableWindow title="agent_orchestrator.sh" badge="LIVE TELEMETRY">
            <CyberBoxAgent
              agent={{ id: "agent-01", name: "Agent 01", role: "Scraper", color: "#ff1f2d" }}
              waypoints={[
                {
                  xPercent: 18,
                  yPercent: 70,
                  action: "type",
                  targetLabel: "COMMAND_BUFFER",
                  statusText: "Injecting DOM crawler queue...",
                  typeText: "python3 scrape.py --skus=10482",
                  pause: 2600,
                },
                {
                  xPercent: 42,
                  yPercent: 36,
                  action: "highlight",
                  targetLabel: "LOG_STREAM",
                  statusText: "Auditing: 10k+ SKUs parsed",
                  pause: 2200,
                },
                {
                  xPercent: 68,
                  yPercent: 88,
                  action: "click",
                  targetLabel: "UPTIME_METRIC",
                  statusText: "Pinging benchmark: 99.98%",
                  pause: 2000,
                },
              ]}
            />
            <div
              style={{
                padding: "16px 20px",
                fontFamily: "var(--mono)",
                fontSize: 12,
                background: "rgba(7,6,10,0.95)",
                minHeight: 220,
              }}
            >
              <div
                style={{
                  color: "var(--mute)",
                  fontSize: 11,
                  paddingBottom: 8,
                  borderBottom: "1px solid var(--line)",
                  marginBottom: 12,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>// Multi-Agent Execution Node</span>
                <span style={{ color: "var(--accent-2)", fontSize: 10 }}>● LIVE</span>
              </div>
              {sandboxLog.map((log, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>&gt;</span>
                  <span style={{ color: "var(--fg)", lineHeight: 1.5 }}>{log}</span>
                </div>
              ))}
              <div
                style={{
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "var(--mute)",
                }}
              >
                <span style={{ color: "var(--accent)" }}>&gt;</span>
                <span>waiting for next packet...</span>
                <span
                  style={{
                    width: 8,
                    height: 16,
                    background: "var(--accent)",
                    display: "inline-block",
                    animation: "pulse 1s infinite",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 4,
                padding: "10px 16px",
                background: "var(--bg-2)",
                borderTop: "1px solid var(--line)",
                fontFamily: "var(--mono)",
                fontSize: 10,
                textAlign: "center",
              }}
            >
              <div>
                <span style={{ color: "var(--mute)" }}>CPU: </span>
                <span style={{ color: "var(--accent-2)" }}>14%</span>
              </div>
              <div>
                <span style={{ color: "var(--mute)" }}>LATENCY: </span>
                <span style={{ color: "#3dff8a" }}>&lt; 180 ms</span>
              </div>
              <div>
                <span style={{ color: "var(--mute)" }}>UPTIME: </span>
                <span style={{ color: "#3bd9ff" }}>99.98%</span>
              </div>
            </div>
          </DraggableWindow>
        </LiveBuild>
      </div>
    </section>
  );
}
