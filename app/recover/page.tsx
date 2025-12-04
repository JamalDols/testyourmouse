"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useProContext } from "@/components/ProContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function RecoverPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { unlockPro } = useProContext();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      toast.error("Invalid recovery link", {
        description: "No token provided.",
      });
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch("/api/recover", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (data.success) {
          setStatus("success");
          unlockPro();
          toast.success("Purchase Restored!", {
            description: "Your Pro Tools have been unlocked.",
          });

          // Redirect to pro tools after a short delay
          setTimeout(() => {
            router.push("/pro-tools");
          }, 2000);
        } else {
          setStatus("error");
          toast.error("Recovery Failed", {
            description: data.error || "Invalid or expired token.",
          });
        }
      } catch (error) {
        setStatus("error");
        toast.error("Recovery Failed", {
          description: "An unexpected error occurred.",
        });
      }
    };

    verifyToken();
  }, [searchParams, unlockPro, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white">
      <div className="text-center p-8">
        {status === "verifying" && (
          <>
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Verifying Purchase...</h1>
            <p className="text-gray-400">Please wait while we verify your recovery token.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500">
              <span className="text-2xl">✓</span>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-green-400">Purchase Restored!</h1>
            <p className="text-gray-400">Redirecting you to Pro Tools...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500">
              <span className="text-2xl">✕</span>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-red-400">Recovery Failed</h1>
            <p className="text-gray-400 mb-6">The recovery link is invalid or has expired.</p>
            <button onClick={() => router.push("/pro-tools")} className="px-6 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/50 rounded-lg transition-colors">
              Back to Pro Tools
            </button>
          </>
        )}
      </div>
    </div>
  );
}
