"use client";

import { Coffee } from "lucide-react";
import { trackDonationClick } from "@/lib/analytics";

export function DonationButton() {
  const handleClick = () => {
    trackDonationClick();
  };

  return (
    <a
      href="https://www.buymeacoffee.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Buy me a coffee - Support this project"
      onClick={handleClick}
      className="fixed bottom-6 right-6 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center gap-2 z-50 font-medium"
    >
      <Coffee className="w-5 h-5" aria-hidden="true" />
      <span className="hidden sm:inline">Buy Me a Coffee</span>
    </a>
  );
}
