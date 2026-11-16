import type { Metadata, Viewport } from "next";
import "./globals.css";
import InteractiveCursorFX from "@/components/InteractiveCursorFX";

const SITE_URL = "https://gaurav-portfolio-phi-three.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07060a",
};

export const metadata: Metadata = {
  title: "Gaurav Jadli | Autonomous Systems & AI Full-Stack Developer",
  description:
    "Gaurav Jadli — Software Developer, Full-Stack & AI Automation Engineer. Computer Engineering at Pillai College of Engineering, University of Mumbai. Building autonomous scrapers, enterprise ERPs, and real-time sentinel telemetry.",
  keywords: [
    "Gaurav Jadli",
    "Software Developer",
    "AI Automation",
    "Full-Stack Developer",
    "Python",
    "PHP",
    "Next.js",
    "System Design",
    "Portfolio",
  ],
  authors: [{ name: "Gaurav Shailendra Jadli" }],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gaurav Jadli | Autonomous Systems & AI Full-Stack Developer",
    description:
      "Futuristic Developer OS & Portfolio of Gaurav Jadli — Software Engineer, Full-Stack Developer & AI Automation Builder.",
    type: "website",
    url: SITE_URL,
    siteName: "Gaurav Jadli Developer OS",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gaurav Jadli — Developer OS // Autonomous Systems & AI Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Jadli | Autonomous Systems & AI Full-Stack Developer",
    description:
      "Futuristic Developer OS & Portfolio of Gaurav Jadli — Software Engineer, Full-Stack Developer & AI Automation Builder.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark js">
      <head>
        {/* Anton (display), Space Grotesk (body), JetBrains Mono (code) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body
        style={{ background: "var(--bg)", color: "var(--fg)", fontFamily: "var(--body)" }}
        className="antialiased selection:bg-[#ff1f2d] selection:text-white overflow-x-hidden"
      >
        {/* Global Interactive Custom Cursor & Click Fireworks */}
        <InteractiveCursorFX />
        {children}
      </body>
    </html>
  );
}
