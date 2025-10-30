import type { Metadata } from "next";
import { ClickVisualizer } from "@/components/ClickVisualizer";

export const metadata: Metadata = {
  title: "Click Visualizer - Mouse Click Testing Tool",
  description: "Visualize all your mouse clicks in real-time. Detect unintentional double clicks and usage patterns. Free online tool to test your mouse buttons.",
  keywords: ["click visualizer", "mouse click test", "button test", "click counter", "mouse button checker"],
  openGraph: {
    title: "Click Visualizer - Test Your Mouse Clicks",
    description: "Visualize and analyze your mouse clicks in real-time. Free online tool.",
  },
};

export default function ClickVisualizerPage() {
  return <ClickVisualizer />;
}
