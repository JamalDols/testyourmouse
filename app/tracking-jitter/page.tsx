import type { Metadata } from "next";
import { TrackingJitter } from "@/components/TrackingJitter";

export const metadata: Metadata = {
  title: "Tracking & Jitter Test - Mouse Sensor Precision Analyzer",
  description: "Analyze your mouse sensor precision and detect jitter or unwanted acceleration. Test tracking accuracy for gaming. Free online mouse tracking tester.",
  keywords: ["jitter test", "tracking test", "mouse accuracy", "sensor test", "mouse precision", "tracking accuracy", "gaming mouse sensor"],
  openGraph: {
    title: "Tracking & Jitter Test - Sensor Precision Analyzer",
    description: "Test your mouse sensor precision and detect jitter issues.",
  },
};

export default function TrackingJitterPage() {
  return <TrackingJitter />;
}
