import { ClickVisualizer } from "@/components/ClickVisualizer";
import { SeoContent } from "@/components/SeoContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mouse Click Visualizer - Test Mouse Buttons & Polling Rate",
  description: "Visualize your mouse clicks in real-time. Test left, right, and middle buttons, detect double clicks, and monitor polling rate stability.",
  keywords: ["click visualizer", "mouse click test", "button test", "click counter", "mouse button checker"],
  alternates: {
    canonical: "https://testyourmouse.com/click-visualizer",
  },
  openGraph: {
    title: "Mouse Click Visualizer - Test Mouse Buttons & Polling Rate",
    description: "Visualize your mouse clicks in real-time. Test left, right, and middle buttons, detect double clicks, and monitor polling rate stability.",
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
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-cyan-400">Mouse Click Visualizer</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Visualize your mouse clicks and movement in real-time. Detect double clicks, monitor polling rate, and verify button functionality.</p>
      </div>

      <ClickVisualizer />

      <SeoContent
        title="Mouse Click Visualizer"
        description="A professional tool to visualize mouse clicks, test button functionality, and monitor polling rate stability in real-time."
        whatIsIt={{
          title: "What is the Click Visualizer?",
          content:
            "The Click Visualizer is a diagnostic tool that renders every mouse interaction on your screen. It captures button presses (Left, Right, Middle, Side buttons) and movement data to help you verify if your mouse is communicating correctly with your computer. It's particularly useful for detecting 'ghost clicks' or confirming that a specific button is registering input.",
        }}
        whyItFails={{
          title: "Common Mouse Failures",
          content:
            "Mice often fail due to micro-switch degradation. If you see multiple click events registered for a single physical press, your mouse switch might be 'bouncing'. Conversely, if clicks are not registering at all, the switch mechanism or the cable connection might be faulty. Wireless interference can also cause missed clicks or erratic movement.",
        }}
        howToInterpret={{
          title: "How to Interpret the Results",
          content:
            "Watch the event log as you click. A healthy mouse should register exactly one 'MouseDown' and one 'MouseUp' event for each physical click. If you see 'Double Click' warnings appearing when you only clicked once, your mouse switch is likely failing. The Polling Rate graph should remain relatively stable (e.g., near 1000Hz for gaming mice) during continuous movement; significant drops may indicate sensor or USB port issues.",
        }}
        faqs={[
          {
            question: "Why is my mouse double clicking?",
            answer:
              "Double clicking (when you only clicked once) is usually caused by a worn-out micro-switch inside the mouse. The metal contact inside loses tension and 'bounces', sending multiple signals. This is a common issue in mechanical switches after prolonged use.",
          },
          {
            question: "What is a good polling rate?",
            answer:
              "For standard office work, 125Hz is sufficient. For gaming, 1000Hz (1ms latency) is the standard. Some advanced mice offer 4000Hz or 8000Hz, but this requires a powerful CPU and may not be noticeable to all users.",
          },
          {
            question: "Does this test work for side buttons?",
            answer:
              "Yes, this tool detects standard side buttons (Forward/Back or Mouse4/Mouse5). However, some MMO mice with many side buttons map them to keyboard keys (like NumPad numbers), which won't show up as mouse buttons here.",
          },
        ]}
      />
    </div>
  );
}
