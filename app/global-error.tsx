"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#030712] text-gray-100 flex flex-col items-center justify-center min-h-screen p-6 text-center font-mono">
        <div className="cyber-panel p-8 rounded-2xl border border-red-500/30 max-w-md w-full">
          <div className="text-red-400 text-xs mb-2">[SYS_FAULT // EXCEPTION]</div>
          <h2 className="text-2xl font-bold text-white mb-4">Kernel Panic</h2>
          <p className="text-gray-400 text-xs mb-6 font-sans">
            {error?.message || "An unexpected system anomaly has occurred."}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-4 py-2 bg-red-500 text-white font-bold text-xs rounded-lg"
          >
            [REBOOT_SYSTEM]
          </button>
        </div>
      </body>
    </html>
  );
}
