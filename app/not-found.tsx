"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#030712] text-gray-100 flex flex-col items-center justify-center p-6 text-center font-mono">
      <div className="cyber-panel p-8 rounded-2xl border border-cyan-500/30 max-w-md w-full corner-bracket">
        <div className="text-cyan-400 text-xs mb-2">[ERR_404 // NOT_FOUND]</div>
        <h1 className="text-4xl font-extrabold text-white mb-3">404</h1>
        <p className="text-gray-400 text-sm mb-6 font-sans">
          The requested system node or transmission path does not exist.
        </p>
        <Link
          href="/"
          className="btn-cyber inline-block px-5 py-2.5 bg-cyan-400 text-gray-950 font-bold text-xs"
        >
          [RETURN_TO_SYSTEM_ROOT]
        </Link>
      </div>
    </main>
  );
}
