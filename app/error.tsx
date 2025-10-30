"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="w-20 h-20 text-red-400 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-mono text-red-400">[ERROR]</h1>
          <p className="text-gray-400 font-mono text-sm">Something went wrong. Please try again.</p>
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={reset} className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 hover:border-cyan-500 text-cyan-400 rounded-lg transition-all font-mono">
            [RETRY]
          </button>

          <a href="/" className="px-6 py-3 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 hover:border-gray-500 text-gray-400 hover:text-gray-300 rounded-lg transition-all font-mono">
            [BACK_TO_HOME]
          </a>
        </div>

        {error.digest && <p className="text-xs text-gray-500 font-mono">Error ID: {error.digest}</p>}
      </div>
    </div>
  );
}
