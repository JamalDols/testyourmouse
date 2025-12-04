import { TrackingJitter } from "@/components/TrackingJitter";
import { SeoContent } from "@/components/SeoContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mouse Tracking & Jitter Test - Check Sensor Accuracy",
  description: "Analyze your mouse sensor performance. Test for jitter, angle snapping, and tracking consistency to ensure pixel-perfect aim.",
  keywords: ["jitter test", "tracking test", "mouse accuracy", "sensor test", "mouse precision", "tracking accuracy", "gaming mouse sensor"],
  alternates: {
    canonical: "https://testyourmouse.com/tracking-jitter",
  },
  openGraph: {
    title: "Mouse Tracking & Jitter Test - Check Sensor Accuracy",
    description: "Analyze your mouse sensor performance. Test for jitter, angle snapping, and tracking consistency to ensure pixel-perfect aim.",
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

export default function TrackingPage() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-cyan-400">Tracking & Jitter Test</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Analyze your mouse sensor performance. Check for jitter, angle snapping, and tracking consistency.</p>
      </div>

      <TrackingJitter />

      <SeoContent
        title="Mouse Sensor Tracking & Jitter Test"
        description="Advanced analysis tool for mouse sensors. Detects cursor jitter, angle snapping prediction, and tracking anomalies."
        whatIsIt={{
          title: "What is the Tracking & Jitter Test?",
          content:
            "This test visualizes the raw path of your mouse cursor to reveal sensor imperfections. It helps you identify 'Jitter' (erratic micro-movements when the mouse should be still or moving straight) and 'Angle Snapping' (software prediction that forces your cursor into straight lines, which is bad for muscle memory).",
        }}
        whyItFails={{
          title: "What causes Jitter?",
          content:
            "Jitter is often caused by a high DPI setting that exceeds the sensor's native capabilities (interpolation), a dirty sensor lens, or a poor-quality mouse pad surface. Wireless interference can also cause the cursor to 'stutter' or jump. If your cursor vibrates even when the mouse is stationary, that is sensor noise.",
        }}
        howToInterpret={{
          title: "How to Interpret the Results",
          content:
            "Move your mouse in smooth circles and diagonal lines. The drawn line should be smooth and follow your hand movement precisely. If the line looks jagged or 'stepped' like a staircase, you may have Angle Snapping enabled. If the line looks shaky or fuzzy despite smooth hand movement, your sensor has high jitter. A good sensor produces a clean, raw input line.",
        }}
        faqs={[
          {
            question: "What is Angle Snapping?",
            answer:
              "Angle snapping (or prediction) is a feature where the mouse software tries to straighten your lines. While useful for office work, it is terrible for gaming because it alters your raw aim, making it hard to make small micro-adjustments.",
          },
          {
            question: "Is higher DPI better?",
            answer:
              "Not necessarily. Extremely high DPI (like 20,000+) often introduces noise and jitter. Most competitive gamers play between 400 and 1600 DPI for the best balance of precision and sensor stability.",
          },
          {
            question: "Does my mouse pad matter?",
            answer:
              "Yes. Optical sensors need a consistent texture to track movement. A dirty, shiny, or uneven surface can cause the sensor to lose tracking (spin out) or jitter. A quality cloth or hard pad is essential for accurate tracking.",
          },
        ]}
      />
    </div>
  );
}
