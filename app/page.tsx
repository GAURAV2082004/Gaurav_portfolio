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
import IntroLoader from "@/components/IntroLoader";
import MultiplayerCursors from "@/components/MultiplayerCursors";

export default function Home() {
  return (
    <>
      {/* ─── Intro loader (particle orb + GJ initials, fades at 2.3s) ─── */}
      <IntroLoader />

      {/* ─── Multiplayer cursors + live build-in effect ─── */}
      <MultiplayerCursors />

      {/* ─── Main page (position:relative for cursor layer) ─── */}
      <main
        style={{ position: "relative", background: "var(--bg)", color: "var(--fg)", overflowX: "hidden" }}
      >
        {/* ─── Subtle canvas particle background ─── */}
        <CyberBackground />

        {/* ─── Pill navigation bar ─── */}
        <CyberNavbar />

        {/* ─── All page sections ─── */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <CyberHero />
          <TechTickerMarquee />
          <CyberAbout />
          <CyberExperience />
          <CyberProjects />
          <CyberSkills />

          {/* ─── Quote block ─── */}
          <section className="pad quote-wrap">
            <div className="wrap" style={{ display: "grid", placeItems: "center" }}>
              <blockquote className="quote rv">
                <q>Ship things that work. Then make them fast. Then make them beautiful.</q>
                <cite>— Gaurav Jadli</cite>
              </blockquote>
            </div>
          </section>

          <CyberEducation />
          <CyberCertifications />
          <CyberContact />
        </div>

        {/* ─── Floating Terminal CLI ─── */}
        <InteractiveTerminalCLI />
      </main>
    </>
  );
}
