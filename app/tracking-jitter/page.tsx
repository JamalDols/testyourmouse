import type { Metadata } from "next";
import { TrackingJitter } from "@/components/TrackingJitter";

export const metadata: Metadata = {
  title: "Tracking & Jitter Test - Mouse Sensor Precision Analyzer",
  description: "Analyze your mouse sensor precision and detect jitter or unwanted acceleration. Test tracking accuracy for gaming. Free online mouse tracking tester.",
  keywords: ["jitter test", "tracking test", "mouse accuracy", "sensor test", "mouse precision", "tracking accuracy", "gaming mouse sensor"],
  alternates: {
    canonical: "https://testyourmouse.com/tracking-jitter",
  },
  openGraph: {
    title: "Tracking & Jitter Test - Sensor Precision Analyzer",
    description: "Test your mouse sensor precision and detect jitter issues.",
    url: "https://testyourmouse.com/tracking-jitter",
    type: "website",
    images: [
      {
        url: "https://testyourmouse.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TestYourMouse - Tracking & Jitter Test",
      },
    ],
  },
};

export default function TrackingJitterPage() {
  return <TrackingJitter />;
}
