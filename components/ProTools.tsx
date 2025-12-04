"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Lock, Zap, Target, Gauge, TrendingUp, Award, Unlock, CheckCircle2 } from "lucide-react";
import { useProContext } from "./ProContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ReactionTimeTest } from "./pro/ReactionTimeTest";
import { PixelPerfectTest } from "./pro/PixelPerfectTest";
import { SensorAnalysis } from "./pro/SensorAnalysis";
import { ResponseTimeGraph } from "./pro/ResponseTimeGraph";
import { ProUnlockModal } from "./ProUnlockModal";
import { toast } from "sonner";
import { usePrice } from "@/hooks/usePrice";

export function ProTools() {
  const { isProUnlocked, unlockPro } = useProContext();
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const { price, mounted } = usePrice();

  // Calcular el precio original (redondeado a .99)
  const originalAmount = Math.ceil(price.amount * 2) - 0.01;
  const originalPrice = mounted
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: price.currency,
      }).format(originalAmount)
    : "$9.99";

  // Handle payment success/cancel from URL params
  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    const sessionId = searchParams.get("session_id");
    const donationSuccess = searchParams.get("donation_success");
    const donationCanceled = searchParams.get("donation_canceled");

    if (success === "true" && sessionId) {
      // Payment successful!
      unlockPro();
      toast.success("🎉 Payment Successful!", {
        description: "Pro Tools are now unlocked! Enjoy your professional features.",
        duration: 5000,
      });
      window.history.replaceState({}, "", "/pro-tools");
    } else if (canceled === "true") {
      toast.error("Payment Canceled", {
        description: "You can try again whenever you're ready.",
        duration: 4000,
      });
      window.history.replaceState({}, "", "/pro-tools");
    } else if (donationSuccess === "true") {
      toast.success("☕ Thank you for the coffee!", {
        description: "Your support means the world to us.",
        duration: 5000,
      });
      window.history.replaceState({}, "", "/pro-tools");
    } else if (donationCanceled === "true") {
      toast.info("Donation Canceled", {
        description: "Maybe next time! Thanks for considering it.",
        duration: 4000,
      });
      window.history.replaceState({}, "", "/pro-tools");
    }
  }, [searchParams, unlockPro]);

  const handleUnlockClick = () => {
    setShowModal(true);
  };

  const handleReset = () => {
    localStorage.removeItem("testyourmouse_pro_unlocked");
    window.location.reload();
  };
  const proFeatures = [
    {
      icon: Zap,
      title: "Reaction Time Test",
      description: "Measure precise mouse reaction time",
    },
    {
      icon: Target,
      title: "Pixel Perfect Test",
      description: "Evaluate precision with dynamic targets",
    },
    {
      icon: Gauge,
      title: "Sensor Analysis",
      description: "Advanced DPI and polling rate detection",
    },
    {
      icon: TrendingUp,
      title: "Response Time Graph",
      description: "Real-time latency visualization",
    },
  ];

  // Track 'x' key press for reset button
  const [showReset, setShowReset] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "x") setShowReset(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "x") setShowReset(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  if (isProUnlocked) {
    return (
      <div className="max-w-6xl mx-auto relative">
        {/* Hidden reset button for testing - hold 'x' and double click to reset */}
        {showReset && (
          <button
            onDoubleClick={handleReset}
            id="reset-pro-button"
            className="absolute -top-4 right-0 text-xs text-gray-600 hover:text-red-400 opacity-50 hover:opacity-100 transition-all font-mono animate-in fade-in duration-200"
            title="Double-click to reset PRO status (for testing)"
          >
            [RESET_PRO]
          </button>
        )}

        <Tabs defaultValue="reaction-time" className="w-full">
          <TabsList className="w-full justify-start mb-8 bg-[#12121a] border border-cyan-500/20 p-1 flex-wrap h-auto">
            <TabsTrigger
              value="reaction-time"
              className="flex-1 min-w-[140px] data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50 text-gray-400 hover:text-cyan-300 transition-colors"
            >
              [REACTION]
            </TabsTrigger>
            <TabsTrigger
              value="pixel-perfect"
              className="flex-1 min-w-[140px] data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50 text-gray-400 hover:text-cyan-300 transition-colors"
            >
              [PRECISION]
            </TabsTrigger>
            <TabsTrigger
              value="sensor-analysis"
              className="flex-1 min-w-[140px] data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50 text-gray-400 hover:text-cyan-300 transition-colors"
            >
              [SENSOR]
            </TabsTrigger>
            <TabsTrigger
              value="response-graph"
              className="flex-1 min-w-[140px] data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50 text-gray-400 hover:text-cyan-300 transition-colors"
            >
              [LATENCY]
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reaction-time">
            <ReactionTimeTest />
          </TabsContent>

          <TabsContent value="pixel-perfect">
            <PixelPerfectTest />
          </TabsContent>

          <TabsContent value="sensor-analysis">
            <SensorAnalysis />
          </TabsContent>

          <TabsContent value="response-graph">
            <ResponseTimeGraph />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 text-center mb-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-purple-500/50 glow-purple">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Lock className="w-16 h-16 text-purple-400 animate-pulse" />
            <Badge className="absolute -top-2 -right-2 bg-purple-500 border border-purple-400 font-mono">PRO</Badge>
          </div>
        </div>

        <h2 className="text-2xl mb-3 text-purple-400 tracking-wide">[PROFESSIONAL_TOOLS]</h2>
        <p className="text-gray-400 mb-6 font-mono text-sm">// Advanced metrics & analysis</p>

        {/* Sales Copy */}
        <div className="max-w-2xl mx-auto mb-8 text-left space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed font-mono">
            <span className="text-cyan-400">&gt;</span> Are you a <span className="text-cyan-400">competitive gamer</span> or a <span className="text-purple-400">hardware enthusiast</span>? Take your
            analysis to the next level with our professional tools.
          </p>

          <div className="bg-[#12121a] border border-cyan-500/20 rounded-lg p-4">
            <div className="grid md:grid-cols-2 gap-3 text-xs font-mono text-gray-400">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Advanced sensor and DPI analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Real polling rate detection</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Professional reaction time test</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Real-time latency graphs</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Pixel-perfect precision test</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Data export and statistics</span>
              </div>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed font-mono">
            <span className="text-cyan-400">&gt;</span> Join thousands of gamers and professionals who already trust TestYourMouse PRO to
            <span className="text-purple-400"> optimize their setup</span> and master their performance.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="text-left">
            <p className="text-sm text-gray-500 line-through font-mono">{originalPrice}</p>
            <p className="text-4xl text-cyan-400 font-mono">{mounted ? price.formatted : "$4.99"}</p>
          </div>
          <div className="text-left">
            <p className="text-sm text-gray-400 font-mono tracking-wider">LAUNCH_OFFER</p>
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/50 font-mono">
              -50% OFF
            </Badge>
          </div>
        </div>

        <button
          onClick={handleUnlockClick}
          className="w-full max-w-md mx-auto px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border-2 border-purple-500/50 hover:border-purple-500 text-purple-400 rounded-lg transition-all transform hover:scale-105 glow-purple font-mono tracking-wider flex items-center justify-center gap-2"
        >
          <Unlock className="w-5 h-5" />
          [UNLOCK_NOW]
        </button>

        <p className="text-xs text-gray-500 mt-4 font-mono">ONE_TIME_PAYMENT • LIFETIME_ACCESS • NO_SUBSCRIPTION</p>
      </Card>

      <div className="grid gap-4">
        <h3 className="text-lg text-cyan-400 tracking-wide">[INCLUDED_FEATURES]</h3>
        {proFeatures.map((feature, index) => (
          <Card key={index} className="p-4 bg-[#12121a] border-cyan-500/30 hover:border-cyan-500/50 transition-all hover:glow-cyan">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30">
                <feature.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-cyan-400 font-mono tracking-wide">{feature.title}</h4>
                  <Lock className="w-4 h-4 text-purple-400 animate-pulse" />
                </div>
                <p className="text-sm text-gray-400 font-mono">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pro Unlock Modal */}
      <ProUnlockModal open={showModal} onOpenChange={setShowModal} />

      <Card className="p-6 mt-8 text-center bg-[#12121a] border-cyan-500/30">
        <Award className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
        <p className="text-sm text-gray-300 font-mono mb-4">
          <span className="text-cyan-400">100% satisfaction guaranteed</span> • If you're not satisfied, we'll refund your money within 30 days
        </p>
        <p className="text-xs text-gray-400 font-mono">
          NEED_HELP?
          <span className="text-cyan-400 mx-2">→</span>
          <a href="mailto:support@testyourmouse.com" className="text-cyan-400 hover:text-cyan-300 underline">
            support@testyourmouse.com
          </a>
        </p>
      </Card>
    </div>
  );
}
