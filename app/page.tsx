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
import CursorLayer from "@/components/CursorLayer";
import LiveBuild from "@/components/LiveBuild";
import Typed from "@/components/Typed";

export default function Home() {
  return (
    <>
      {/* ─── Intro loader (particle orb + GJ initials, auto-dismisses at 2.3s) ─── */}
      <IntroLoader />

      {/* ─── Main page (relative positioning for cursor coordinates) ─── */}
      <main
        style={{
          position: "relative",
          background: "var(--bg)",
          color: "var(--fg)",
          overflowX: "hidden",
        }}
      >
        {/* ─── Unified Multi-Cursor Layer across ALL sections ─── */}
        <CursorLayer />

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
              <LiveBuild id="quote-banner">
                <blockquote className="quote">
                  <q>
                    <Typed>Ship things that work. Then make them fast. Then make them beautiful.</Typed>
                  </q>
                  <cite>— Gaurav Jadli</cite>
                </blockquote>
              </LiveBuild>
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
