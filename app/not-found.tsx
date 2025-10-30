import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-mono text-cyan-400">404</h1>
          <p className="text-xl text-purple-400 font-mono">[PAGE_NOT_FOUND]</p>
          <p className="text-gray-400 text-sm">The page you're looking for doesn't exist or has been moved.</p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 hover:border-cyan-500 text-cyan-400 rounded-lg transition-all font-mono"
        >
          <Home className="w-4 h-4" />
          [BACK_TO_HOME]
        </Link>
      </div>
    </div>
  );
}
