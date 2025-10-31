"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Mail, CreditCard, AlertCircle, Loader2 } from "lucide-react";
import { trackProPaymentIntent } from "@/lib/analytics";
import { usePrice } from "@/hooks/usePrice";

interface ProUnlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProUnlockModal({ open, onOpenChange }: ProUnlockModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { price, mounted } = usePrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Track payment intent
      trackProPaymentIntent();

      // Create Stripe Checkout Session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-purple-500/50">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-500/50">
              <Lock className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center text-purple-400">Unlock Pro Tools</DialogTitle>
          <DialogDescription className="text-center text-gray-300">
            Get lifetime access to all professional tools for a one-time payment of <span className="text-purple-400 font-bold">{mounted ? price.formatted : "$4.99"}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-cyan-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-[#12121a] border-cyan-500/30 focus:border-cyan-500 text-white"
              required
            />
            <p className="text-xs text-gray-400">We'll send your receipt to this email</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="bg-red-500/10 border-red-500/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Features List */}
          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold text-cyan-400 mb-2">What's included:</p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✅ Reaction Time Test</li>
              <li>✅ Pixel Perfect Test</li>
              <li>✅ Advanced Sensor Analysis</li>
              <li>✅ Response Time Graph</li>
              <li>✅ Lifetime access (no subscription)</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading} className="flex-1 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-semibold">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Continue to Payment
                </>
              )}
            </Button>
          </div>

          {/* Security Note */}
          <p className="text-xs text-gray-400 text-center">
            🔒 Secure payment powered by <span className="text-purple-400">Stripe</span>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
