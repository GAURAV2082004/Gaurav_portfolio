"use client";

import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

export default function CyberContact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "transmitting" | "sent" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Holographic Cyber Globe Animation
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

      // Outer Glow
      const glow = ctx.createRadialGradient(centerX, centerY, radius * 0.7, centerX, centerY, radius * 1.3);
      glow.addColorStop(0, "rgba(0, 245, 255, 0.1)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      // Draw latitude rings
      for (let lat = -60; lat <= 60; lat += 24) {
        ctx.beginPath();
        const rLat = radius * Math.cos((lat * Math.PI) / 180);
        const yLat = centerY + radius * Math.sin((lat * Math.PI) / 180);

        ctx.ellipse(centerX, yLat, rLat, rLat * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 245, 255, 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw rotating longitude meridians
      for (let lon = 0; lon < 180; lon += 30) {
        const rad = ((lon + rotation * 50) * Math.PI) / 180;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius * Math.cos(rad), radius, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 245, 255, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Mumbai Location Beacon Marker (approx ~19° N, 72° E)
      const beaconAngle = rotation + 1.2;
      const bx = centerX + radius * 0.8 * Math.cos(beaconAngle);
      const by = centerY - radius * 0.28;

      ctx.beginPath();
      ctx.arc(bx, by, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#00f5ff";
      ctx.shadowColor = "#00f5ff";
      ctx.shadowBlur = 10;
      ctx.fill();

      // Beacon ring
      ctx.beginPath();
      ctx.arc(bx, by, 9, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 245, 255, 0.6)";
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
      alert("Please fill all required transmission fields.");
      return;
    }

    setStatus("transmitting");
    setTerminalLogs([
      "[UPLINK] Initiating transmission handshake...",
      `[PACKET] Encrypting payload from: ${formData.email}`,
      "[ROUTER] Routing via primary SMTP / Mailto gateway...",
    ]);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        "[ACK] Transmission packet prepared: 200 OK",
        "[GATEWAY] Opening communication client to dispatch message...",
      ]);
      setStatus("sent");

      // Open mailto client with pre-filled content
      const subject = encodeURIComponent(formData.subject || `Portfolio Uplink from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:jadligaurav2082004@gmail.com?subject=${subject}&body=${body}`;
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal>
          {/* Section Terminal Header */}
          <div className="flex items-center gap-3 mb-12 font-mono">
            <span className="text-cyan-400 text-sm font-bold">[07]</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              // TRANSMISSION_CHANNEL
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 via-gray-800 to-transparent ml-4" />
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & Holographic Globe (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="left">
              <div className="cyber-panel rounded-2xl p-6 sm:p-8 corner-bracket border border-cyan-500/30">
                <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                  Establish Uplink
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-sans">
                  Available for Software Engineering roles, AI automation projects, and systems development.
                  Drop a message or connect through any verified channel.
                </p>

                {/* Direct Channel Badges */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-950/80 border border-gray-800">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base">✉️</span>
                      <span className="truncate text-gray-300">jadligaurav2082004@gmail.com</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="ml-2 px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/60 hover:bg-cyan-900 transition-colors text-[10px] font-bold flex-shrink-0"
                    >
                      {copiedEmail ? "COPIED!" : "COPY"}
                    </button>
                  </div>

                  <a
                    href="https://linkedin.com/in/gauravjadli04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-950/80 border border-gray-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                  >
                    <span className="text-base">💼</span>
                    <span className="truncate">linkedin.com/in/gauravjadli04 ↗</span>
                  </a>

                  <a
                    href="https://github.com/GAURAV2082004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-950/80 border border-gray-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
                  >
                    <span className="text-base">🐙</span>
                    <span className="truncate">github.com/GAURAV2082004 ↗</span>
                  </a>
                </div>

                {/* Holographic Location Globe */}
                <div className="mt-8 pt-6 border-t border-gray-800/80 flex flex-col items-center text-center">
                  <div className="relative">
                    <canvas ref={globeCanvasRef} className="w-[220px] h-[220px]" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-[10px] font-mono text-cyan-400/70 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/20">
                        LOCATION: MUMBAI, IN
                      </div>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-gray-500 mt-2">
                    COORDINATES: 19.0760° N, 72.8777° E (IST UTC+5:30)
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Terminal Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right">
              <div className="cyber-panel rounded-2xl overflow-hidden corner-bracket border border-cyan-500/30">
                {/* Window Header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-gray-950/90 border-b border-gray-800 font-mono text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span>transmit_payload.sh</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                    ENCRYPTION: AES-256
                  </span>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 font-mono text-xs">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 mb-1.5 uppercase tracking-wider">
                        [01] CALLSIGN / NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-gray-950/90 border border-gray-800 rounded-lg px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors font-sans text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1.5 uppercase tracking-wider">
                        [02] TRANSMISSION_EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-gray-950/90 border border-gray-800 rounded-lg px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors font-sans text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1.5 uppercase tracking-wider">
                      [03] SUBJECT
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Opportunity / Collaboration / Query"
                      className="w-full bg-gray-950/90 border border-gray-800 rounded-lg px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors font-sans text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1.5 uppercase tracking-wider">
                      [04] PAYLOAD_MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hello Gaurav, let's discuss..."
                      className="w-full bg-gray-950/90 border border-gray-800 rounded-lg px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors font-sans text-sm resize-none"
                    />
                  </div>

                  {/* Submission Logs Console */}
                  {terminalLogs.length > 0 && (
                    <div className="p-3.5 rounded-lg bg-[#030712] border border-cyan-500/30 space-y-1.5 animate-fade-in font-mono text-[11px]">
                      {terminalLogs.map((log, i) => (
                        <div key={i} className="text-cyan-300">
                          &gt; {log}
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "transmitting"}
                    className="btn-cyber w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-gray-950 font-bold text-sm tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]"
                  >
                    <span>
                      {status === "transmitting" ? "[TRANSMITTING...]" : "[▶ DISPATCH_TRANSMISSION()]"}
                    </span>
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Futuristic System Footer */}
        <div className="mt-20 pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-gray-500">
          <div>
            <span>DEV-OS v4.2 // </span>
            <span className="text-cyan-400">NEXT.JS 16 · TAILWIND · TYPESCRIPT</span>
          </div>
          <div>
            © {new Date().getFullYear()} Gaurav Shailendra Jadli. All systems operational.
          </div>
        </div>
      </div>
    </section>
  );
}
