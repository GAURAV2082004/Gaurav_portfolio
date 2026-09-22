import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://gaurav-portfolio-phi-three.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Gaurav Jadli | Software Engineer",
  description:
    "Portfolio of Gaurav Shailendra Jadli — Software Engineer, Full-Stack Developer, and AI & Automation Builder. B.Tech Computer Engineering student at Pillai College of Engineering, University of Mumbai.",
  keywords: ["Gaurav Jadli", "Software Engineer", "Full Stack Developer", "PHP Developer", "Python Developer", "AI Automation", "Portfolio"],
  authors: [{ name: "Gaurav Shailendra Jadli" }],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gaurav Jadli | Software Engineer",
    description: "Portfolio of Gaurav Shailendra Jadli — Software Engineer, Full-Stack Developer & AI Automation Builder.",
    type: "website",
    url: SITE_URL,
    siteName: "Gaurav Jadli Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gaurav Jadli — Software Engineer · Full-Stack · AI & Automation Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Jadli | Software Engineer",
    description: "Portfolio of Gaurav Shailendra Jadli — Software Engineer, Full-Stack Developer & AI Automation Builder.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
