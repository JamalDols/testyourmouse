import { CPSTest } from "@/components/CPSTest";
import { SeoContent } from "@/components/SeoContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CPS Test - Check Your Clicks Per Second Speed",
  description: "Test your clicking speed with our CPS Test (Clicks Per Second). Challenge yourself in 1, 3, 5, or 10-second modes and improve your gaming performance.",
  keywords: ["cps test", "clicks per second", "click speed test", "mouse speed test", "clicking speed", "cps counter", "gaming mouse test"],
  alternates: {
    canonical: "https://testyourmouse.com/cps-test",
  },
  openGraph: {
    title: "CPS Test - Check Your Clicks Per Second Speed",
    description: "Test your clicking speed with our CPS Test (Clicks Per Second). Challenge yourself in 1, 3, 5, or 10-second modes and improve your gaming performance.",
    url: "https://testyourmouse.com/cps-test",
    type: "website",
    images: [
      {
        url: "https://testyourmouse.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TestYourMouse - CPS Test",
      },
    ],
  },
};

export default function CpsTestPage() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-cyan-400">CPS Test</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Measure your clicking speed in Clicks Per Second. Choose your duration and challenge your limits.</p>
      </div>

      <CPSTest />

      <SeoContent
        title="CPS Test (Clicks Per Second)"
        description="A competitive tool to measure your mouse clicking speed over various time intervals. Essential for gamers to benchmark their performance."
        whatIsIt={{
          title: "What is a CPS Test?",
          content:
            "CPS stands for 'Clicks Per Second'. This test measures how many times you can click your mouse button in a specific time interval. It is a popular benchmark in the gaming community, particularly for games like Minecraft (PvP) or clicker games, where high clicking speed gives a competitive advantage.",
        }}
        whyItFails={{
          title: "Why is my CPS low?",
          content:
            "A low CPS score is rarely a hardware failure; it's usually a matter of technique. Standard clicking rarely exceeds 6-7 CPS. To achieve higher scores, gamers use techniques like 'Jitter Clicking' (vibrating the arm muscles) or 'Butterfly Clicking' (using two fingers on one button). However, a faulty mouse switch that misses clicks can artificially lower your score.",
        }}
        howToInterpret={{
          title: "How to Interpret Your Score",
          content:
            "Average: 6-7 CPS (Normal usage). Good: 8-10 CPS (Casual gaming). Pro: 12+ CPS (Competitive gaming). If you score above 15 CPS, you are likely using advanced techniques like Drag Clicking. Consistent scores indicate good muscle memory and a reliable mouse switch.",
        }}
        faqs={[
          {
            question: "What is the world record for CPS?",
            answer:
              "While records vary by technique and duration, top competitive clickers can sustain 20+ CPS using Drag Clicking or Butterfly Clicking methods. For standard single-finger clicking, the limit is usually around 12-14 CPS.",
          },
          {
            question: "Does CPS matter for gaming?",
            answer:
              "It depends on the game. In FPS games (like CS:GO or Valorant), accuracy is far more important than click speed. In Minecraft PvP or MOBA games, high CPS can be beneficial for combos and building speed.",
          },
          {
            question: "Can high CPS damage my mouse?",
            answer:
              "Yes, aggressive clicking techniques like Drag Clicking or Jitter Clicking put significantly more stress on the mouse switches and structure, potentially shortening the lifespan of your device.",
          },
        ]}
      />
    </div>
  );
}
