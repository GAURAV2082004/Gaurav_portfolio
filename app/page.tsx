import CyberNavbar from "@/components/CyberNavbar";
import CyberHero from "@/components/CyberHero";
import TechTickerMarquee from "@/components/TechTickerMarquee";
import CyberAbout from "@/components/CyberAbout";
import CyberExperience from "@/components/CyberExperience";
import CyberProjects from "@/components/CyberProjects";
import CyberSkills from "@/components/CyberSkills";
import CyberEducation from "@/components/CyberEducation";
import CyberCertifications from "@/components/CyberCertifications";
import CyberContact from "@/components/CyberContact";
import CyberBackground from "@/components/CyberBackground";
import InteractiveTerminalCLI from "@/components/InteractiveTerminalCLI";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-neutral-100 overflow-x-hidden selection:bg-[#ff3333]/30 selection:text-white font-sans">
      {/* ─── Developer OS OLED Dark Atmospheric Background ─── */}
      <CyberBackground />

      {/* ─── Top Telemetry OS Navigation Bar with Sound Toggle ─── */}
      <CyberNavbar />

      {/* ─── Core Futuristic Developer OS Sections ─── */}
      <div className="relative z-10">
        <CyberHero />
        
        {/* ─── High-Velocity Technology Ticker Marquee ─── */}
        <TechTickerMarquee />

        <CyberAbout />
        <CyberExperience />
        <CyberProjects />
        <CyberSkills />
        <CyberEducation />
        <CyberCertifications />
        <CyberContact />
      </div>

      {/* ─── Interactive Terminal CLI Command Bar (Floating / Docked) ─── */}
      <InteractiveTerminalCLI />
    </main>
  );
}
