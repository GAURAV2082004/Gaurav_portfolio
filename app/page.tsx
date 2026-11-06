import CyberNavbar from "@/components/CyberNavbar";
import CyberHero from "@/components/CyberHero";
import CyberAbout from "@/components/CyberAbout";
import CyberExperience from "@/components/CyberExperience";
import CyberProjects from "@/components/CyberProjects";
import CyberSkills from "@/components/CyberSkills";
import CyberEducation from "@/components/CyberEducation";
import CyberCertifications from "@/components/CyberCertifications";
import CyberContact from "@/components/CyberContact";
import CyberBackground from "@/components/CyberBackground";
import MultiCursorAgents from "@/components/MultiCursorAgents";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030712] text-gray-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* ─── Cyberpunk Atmospheric Canvas Background ─── */}
      <CyberBackground />

      {/* ─── Multi-Cursor AI Agent Fleet Simulation (5-6 Artificial Cursors) ─── */}
      <MultiCursorAgents />

      {/* ─── Cyber Navigation HUD ─── */}
      <CyberNavbar />

      {/* ─── Core Futuristic Sections ─── */}
      <div className="relative z-10">
        <CyberHero />
        <CyberAbout />
        <CyberExperience />
        <CyberProjects />
        <CyberSkills />
        <CyberEducation />
        <CyberCertifications />
        <CyberContact />
      </div>
    </main>
  );
}
