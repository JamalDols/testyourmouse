import type { Metadata } from "next";
import { ClickVisualizer } from "@/components/ClickVisualizer";

export const metadata: Metadata = {
  title: "Click Visualizer - Mouse Click Testing Tool",
  description: "Visualize all your mouse clicks in real-time. Detect unintentional double clicks and usage patterns. Free online tool to test your mouse buttons.",
  keywords: ["click visualizer", "mouse click test", "button test", "click counter", "mouse button checker"],
  alternates: {
    canonical: "https://testyourmouse.com/click-visualizer",
  },
  openGraph: {
    title: "Click Visualizer - Test Your Mouse Clicks",
    description: "Visualize and analyze your mouse clicks in real-time. Free online tool.",
    url: "https://testyourmouse.com/click-visualizer",
    type: "website",
    images: [
      {
        url: "https://testyourmouse.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TestYourMouse - Click Visualizer",
      },
    ],
  },
};

export default function ClickVisualizerPage() {
  return <ClickVisualizer />;
}
