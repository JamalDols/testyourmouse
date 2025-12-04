"use client";

import { useState } from "react";
import { Coffee, Loader2 } from "lucide-react";
import { trackDonationClick } from "@/lib/analytics";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DonationButton() {
  const [amount, setAmount] = useState("5");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDonate = async () => {
    const value = parseFloat(amount);
    if (isNaN(value) || value < 1) {
      toast.error("Please enter a valid amount (minimum $1)");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: value }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to create donation session");

      window.location.href = data.url;
    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Failed to start donation. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => trackDonationClick()}
          className="fixed bottom-6 right-6 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center gap-2 z-50 font-medium"
        >
          <Coffee className="w-5 h-5" aria-hidden="true" />
          <span className="hidden sm:inline">Buy Me a Coffee</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#12121a] border-cyan-500/20 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2 text-xl font-mono text-yellow-400">
            <Coffee className="w-6 h-6" />
            Buy Me a Coffee
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-center text-gray-400 text-sm">
            Support the development of TestYourMouse.
            <br />
            Enter any amount you'd like to contribute.
          </p>
          <div className="flex items-center gap-4 justify-center">
            <div className="relative w-full max-w-[200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 bg-black/50 border-cyan-500/30 text-center text-lg font-mono focus-visible:ring-cyan-500/50"
                min="1"
                step="1"
              />
            </div>
          </div>
          <Button onClick={handleDonate} disabled={isLoading} className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Donate $${amount || "0"}`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
