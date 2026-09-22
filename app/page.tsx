import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import ShardsCanvas from "@/components/ShardsCanvas";

export default function Home() {
  return (
    <main className="relative selection:bg-cyan-500/20 selection:text-cyan-300 min-h-screen bg-gray-950 overflow-hidden">
      {/* Background Interactive Growing Crystal Shards */}
      <ShardsCanvas />
      {/* Interactive Custom Cursor */}
      <CustomCursor />
      {/* Header & Page Sections */}
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </div>
    </main>
  );
}
