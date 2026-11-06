import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://gaurav-portfolio-phi-three.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030712",
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
    <html lang="en" className="scroll-smooth dark">
      <body className="bg-[#030712] text-gray-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
