"use client";

import { useState, useEffect, useRef } from "react";
import LiveBuild from "./LiveBuild";
import Typed from "./Typed";

export default function CyberContact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "transmitting" | "sent" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Holographic Cyber Globe Animation (Crimson theme)
  useEffect(() => {
    const canvas = globeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const size = (canvas.width = canvas.height = 260);
    const radius = size * 0.38;
    const centerX = size / 2;
    const centerY = size / 2;

    let rotation = 0;

    const render = () => {
      rotation += 0.012;
      ctx.clearRect(0, 0, size, size);

      // Outer Crimson Glow
      const glow = ctx.createRadialGradient(centerX, centerY, radius * 0.7, centerX, centerY, radius * 1.3);
      glow.addColorStop(0, "rgba(255, 31, 45, 0.12)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      // Draw latitude rings
      for (let lat = -60; lat <= 60; lat += 24) {
        ctx.beginPath();
        const rLat = Math.abs(radius * Math.cos((lat * Math.PI) / 180));
        const yLat = centerY + radius * Math.sin((lat * Math.PI) / 180);

        ctx.ellipse(centerX, yLat, rLat, rLat * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 31, 45, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw rotating longitude meridians
      for (let lon = 0; lon < 180; lon += 30) {
        const rad = ((lon + rotation * 50) * Math.PI) / 180;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, Math.abs(radius * Math.cos(rad)), radius, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 31, 45, 0.28)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Mumbai Location Beacon Marker (approx ~19° N, 72° E)
      const beaconAngle = rotation + 1.2;
      const bx = centerX + radius * 0.8 * Math.cos(beaconAngle);
      const by = centerY - radius * 0.28;

      ctx.beginPath();
      ctx.arc(bx, by, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#ff1f2d";
      ctx.shadowColor = "#ff1f2d";
      ctx.shadowBlur = 12;
      ctx.fill();

      // Beacon ring
      ctx.beginPath();
      ctx.arc(bx, by, 9, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 31, 45, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jadligaurav2082004@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all required fields.");
      return;
    }

    setStatus("transmitting");

    setTimeout(() => {
      const subject = encodeURIComponent(formData.subject || `Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:jadligaurav2082004@gmail.com?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <LiveBuild id="contact-heading">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-12 font-mono">
            <span className="text-[#ff3333] text-sm font-bold">[07]</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              <Typed>Contact</Typed>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#ff3333]/40 via-neutral-800 to-transparent ml-4" />
          </div>
        </LiveBuild>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & Holographic Globe (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <LiveBuild id="contact-card">
              <div className="cyber-panel rounded-2xl p-6 sm:p-8 corner-bracket border border-[#ff3333]/30 bg-[#0a0a0a]">
                <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                  Get in Touch
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-sans">
                  Available for Software Engineering roles, AI automation projects, and systems development.
                  Feel free to send a message or connect through any channel.
                </p>

                {/* Direct Channel Badges */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base">✉️</span>
                      <span className="truncate text-neutral-300">jadligaurav2082004@gmail.com</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="ml-2 px-2.5 py-1 rounded bg-[#ff3333]/15 text-[#ff4d4d] border border-[#ff3333]/40 hover:bg-[#ff3333]/30 transition-colors text-[10px] font-bold flex-shrink-0 cursor-pointer"
                    >
                      {copiedEmail ? "COPIED" : "COPY"}
                    </button>
                  </div>

                  <a
                    href="https://linkedin.com/in/gauravjadli04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-[#ff3333]/50 hover:text-[#ff4d4d] transition-colors"
                  >
                    <span className="text-base">💼</span>
                    <span className="truncate">linkedin.com/in/gauravjadli04 ↗</span>
                  </a>

                  <a
                    href="https://github.com/GAURAV2082004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-[#ff3333]/50 hover:text-[#ff4d4d] transition-colors"
                  >
                    <span className="text-base">🐙</span>
                    <span className="truncate">github.com/GAURAV2082004 ↗</span>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-neutral-400">
                    <span className="text-base">📍</span>
                    <span>Mumbai, India (IST / UTC+5:30)</span>
                  </div>
                </div>

                {/* Cyber Globe Canvas */}
                <div className="mt-6 pt-6 border-t border-neutral-800/80 flex flex-col items-center">
                  <div className="relative">
                    <canvas ref={globeCanvasRef} className="w-[220px] h-[220px]" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-[10px] font-mono text-[#ff4d4d] bg-black/80 px-2.5 py-1 rounded border border-[#ff3333]/40 backdrop-blur-sm">
                        MUMBAI_NODE // ACTIVE
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </LiveBuild>
          </div>

          {/* Right Column: Contact Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <LiveBuild id="contact-form">
              <div className="cyber-panel rounded-2xl p-6 sm:p-8 corner-bracket border border-[#ff3333]/30 bg-[#0a0a0a]">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-800 font-mono text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ff3333] animate-pulse" />
                    <span className="text-white font-semibold">Send a Message</span>
                  </div>
                  <span className="text-[11px] text-[#ff4d4d]">STATUS: READY</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-neutral-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#ff3333] transition-colors text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-neutral-400 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#ff3333] transition-colors text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Inquiry / Job Opportunity"
                      className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#ff3333] transition-colors text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe what you are building or the role you are looking to fill..."
                      className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-[#ff3333] transition-colors text-sm font-mono resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={status === "transmitting"}
                      className="btn-cyber px-6 py-3 bg-[#ff3333] hover:bg-[#ff1a1a] disabled:bg-neutral-800 text-white font-mono font-bold text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_14px_rgba(255,51,51,0.4)]"
                    >
                      {status === "transmitting" ? "Opening Email Client..." : "[▶ Send Message]"}
                    </button>

                    {status === "sent" && (
                      <span className="text-xs font-mono text-emerald-400">
                        ✓ Email client opened!
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </LiveBuild>
          </div>
        </div>
      </div>
    </section>
  );
}
