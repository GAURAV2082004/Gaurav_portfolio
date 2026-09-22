import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gaurav Jadli | Software Engineer",
  description:
    "Portfolio of Gaurav Shailendra Jadli — Software Engineer, Full-Stack Developer, and AI & Automation Builder. B.Tech Computer Engineering student at Pillai College of Engineering, University of Mumbai.",
  keywords: ["Gaurav Jadli", "Software Engineer", "Full Stack Developer", "PHP Developer", "Python Developer", "Portfolio"],
  authors: [{ name: "Gaurav Shailendra Jadli" }],
  openGraph: {
    title: "Gaurav Jadli | Software Engineer",
    description: "Portfolio of Gaurav Shailendra Jadli — Software Engineer & Full-Stack Developer",
    type: "website",
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
