import { DoubleClickTest } from "@/components/DoubleClickTest";
import { SeoContent } from "@/components/SeoContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Double Click Test - Check Mouse Switch Health",
  description: "Test your mouse for double clicking issues. Detect faulty switches, debounce problems, and verify if your mouse is clicking twice when it shouldn't.",
  keywords: ["double click test", "mouse double click", "click stability", "mouse defect test", "button bouncing"],
  alternates: {
    canonical: "https://testyourmouse.com/double-click",
  },
  openGraph: {
    title: "Double Click Test - Check Mouse Switch Health",
    description: "Test your mouse for double clicking issues. Detect faulty switches, debounce problems, and verify if your mouse is clicking twice when it shouldn't.",
    url: "https://testyourmouse.com/double-click",
    type: "website",
    images: [
      {
        url: "https://testyourmouse.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TestYourMouse - Double Click Test",
      },
    ],
  },
};

export default function DoubleClickPage() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-cyan-400">Double Click Test</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Check if your mouse is registering double clicks when you only click once. A common issue with gaming mice switches.</p>
      </div>

      <DoubleClickTest />

      <SeoContent
        title="Mouse Double Click Test"
        description="A specialized tool to detect unintended double clicks caused by faulty mouse switches or debounce issues."
        whatIsIt={{
          title: "What is the Double Click Test?",
          content:
            "This test is designed to identify a specific hardware failure known as 'double clicking'. This occurs when a single physical click of the mouse button sends two or more electrical signals to the computer. This tool counts your clicks and alerts you if two clicks happen within a suspiciously short timeframe (usually under 80-100ms), which is physically impossible for a human to do intentionally.",
        }}
        whyItFails={{
          title: "Why do mice double click?",
          content:
            "The most common cause is the degradation of the copper alloy spring inside the micro-switch (often Omron switches). Over time, the metal fatigues and loses its ability to snap back cleanly, causing it to 'bounce' and make contact multiple times. Dust, humidity, and static electricity can also contribute to this failure.",
        }}
        howToInterpret={{
          title: "How to Interpret the Results",
          content:
            "Click the test area 100 times at a normal pace. If the 'Double Clicks' counter remains at 0, your mouse switch is healthy. If you see even 1 or 2 double clicks registered, your switch is starting to fail. A high number of double clicks indicates a severe hardware problem that will affect your usage, especially in tasks like dragging files or single-tap gaming actions.",
        }}
        faqs={[
          {
            question: "Can I fix a double clicking mouse?",
            answer:
              "Sometimes. You can try blowing compressed air under the button to remove dust. Increasing the 'Debounce Time' in your mouse software (if available) can also mask the issue. However, the only permanent fix is usually to solder a new micro-switch or replace the mouse.",
          },
          {
            question: "What is Debounce Time?",
            answer:
              "Debounce time is a delay (in milliseconds) that the mouse firmware waits after a click before accepting another one. This prevents the natural vibration of the switch from registering as multiple clicks. If this value is too low, an aging switch will double click. If it's too high, it adds latency to your clicks.",
          },
          {
            question: "Which mice are immune to double clicking?",
            answer:
              "Mice with Optical Switches (like newer Razer or Logitech G502 X models) are immune to this specific mechanical failure because they use a beam of light instead of physical metal contact to register the click.",
          },
        ]}
      />
    </div>
  );
}
