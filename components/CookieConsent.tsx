"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { Button } from "./ui/button";

// Declare gtag function for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    // Set default consent to 'denied' as a placeholder
    // This is the configuration that should be active before the user makes a choice
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted", // Always granted for security purposes
      wait_for_update: 500, // Wait 500ms for the user's consent choice
    });

    // Check if user has already given consent
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      // No consent decision yet - show banner
      setIsVisible(true);
    } else if (consent === "accepted") {
      // User previously accepted - update consent and load GTM
      updateConsent("granted");
      loadGTM();
    } else if (consent === "rejected") {
      // User previously rejected - update consent to denied
      updateConsent("denied");
    }
  }, []);

  const updateConsent = (value: "granted" | "denied") => {
    window.gtag("consent", "update", {
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
      analytics_storage: value,
      functionality_storage: value,
      personalization_storage: value,
    });
  };

  const loadGTM = () => {
    // Only load GTM once
    if (document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) {
      return;
    }

    // Google Tag Manager
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=G-B62Y6EYXSP";
    document.head.appendChild(script);
  };

  const handleAccept = () => {
    // Save consent choice
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());

    // Update consent to granted
    updateConsent("granted");

    // Load GTM
    loadGTM();

    // Send consent event to dataLayer
    window.dataLayer.push({
      event: "cookie_consent_update",
      consent_status: "granted",
      consent_date: new Date().toISOString(),
    });

    // Hide banner
    setIsVisible(false);
  };

  const handleReject = () => {
    // Save rejection choice
    localStorage.setItem("cookie-consent", "rejected");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());

    // Update consent to denied
    updateConsent("denied");

    // Send rejection event to dataLayer (this will be recorded even with denied consent)
    window.dataLayer.push({
      event: "cookie_consent_update",
      consent_status: "denied",
      consent_date: new Date().toISOString(),
    });

    // Hide banner
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300" />

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-7xl mx-auto p-4">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border-2 border-cyan-500/30 rounded-lg shadow-2xl p-6 relative glow-cyan">
            {/* Close button */}
            <button onClick={handleReject} className="absolute top-4 right-4 text-gray-400 hover:text-cyan-400 transition-colors" aria-label="Close cookie banner">
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                  <Cookie className="w-8 h-8 text-cyan-400" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-semibold text-cyan-400">🍪 We value your privacy</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We use cookies and similar technologies to improve your experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to the use of cookies for
                  analytics and marketing purposes.
                </p>
                <p className="text-gray-400 text-xs">
                  Read our{" "}
                  <Link href="/privacy-policy" className="text-cyan-400 hover:text-cyan-300 underline">
                    Privacy Policy
                  </Link>{" "}
                  to learn more about how we handle your data.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button onClick={handleReject} variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 whitespace-nowrap">
                  Reject
                </Button>
                <Button onClick={handleAccept} className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold whitespace-nowrap">
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
