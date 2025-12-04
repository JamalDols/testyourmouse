import { ScrollTest } from "@/components/ScrollTest";
import { SeoContent } from "@/components/SeoContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mouse Scroll Test - Check Wheel Speed & Precision",
  description: "Test your mouse scroll wheel speed and precision. Measure pixels per second, detect scrolling issues, and verify encoder health.",
  keywords: ["scroll test", "mouse wheel test", "scroll wheel checker", "wheel precision", "mouse scroll tester"],
  alternates: {
    canonical: "https://testyourmouse.com/scroll-test",
  },
  openGraph: {
    title: "Mouse Scroll Test - Check Wheel Speed & Precision",
    description: "Test your mouse scroll wheel speed and precision. Measure pixels per second, detect scrolling issues, and verify encoder health.",
    url: "https://testyourmouse.com/scroll-test",
    type: "website",
    images: [
      {
        url: "https://testyourmouse.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TestYourMouse - Scroll Test",
      },
    ],
  },
};

export default function ScrollTestPage() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-cyan-400">Scroll Test</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Test your mouse scroll wheel speed and precision. Measure pixels per second and verify smooth scrolling.</p>
      </div>

      <ScrollTest />

      <SeoContent
        title="Mouse Scroll Wheel Test"
        description="A diagnostic tool to measure scroll wheel speed (pixels/sec) and verify the precision of your mouse encoder."
        whatIsIt={{
          title: "What is the Scroll Test?",
          content:
            "This test measures the responsiveness and speed of your mouse's scroll wheel. It tracks the number of pixels scrolled vertically and calculates your scrolling speed in Pixels Per Second. It's useful for verifying that your scroll wheel is registering every 'step' or 'notch' correctly without skipping.",
        }}
        whyItFails={{
          title: "Why does scrolling fail?",
          content:
            "Scroll wheel issues are usually caused by a dirty or faulty 'rotary encoder'. Dust and hair can get trapped inside the wheel mechanism, causing the sensor to miss steps or scroll in the wrong direction (jumping up when you scroll down). This is a very common mechanical failure in older mice.",
        }}
        howToInterpret={{
          title: "How to Interpret the Results",
          content:
            "Scroll slowly one notch at a time. The test should register a consistent pixel amount (usually 100px per notch, depending on OS settings) for each step. If the value is inconsistent or zero for some notches, your encoder is dirty or failing. High-speed scrolling should result in a smooth, high 'Max Speed' value without stuttering.",
        }}
        faqs={[
          {
            question: "Why does my page jump up when I scroll down?",
            answer:
              "This is the classic symptom of a dirty scroll wheel encoder. The sensor is getting conflicting signals due to dust or debris interfering with the contact points. Cleaning it with compressed air might help, but often the encoder needs replacement.",
          },
          {
            question: "What is the difference between optical and mechanical encoders?",
            answer:
              "Mechanical encoders use physical metal contacts to register steps and are prone to wear and dirt. Optical encoders use light and a slotted wheel; they are much more durable and resistant to dust but feel different (often lighter) to scroll.",
          },
          {
            question: "Can I change my scroll speed?",
            answer:
              "Yes, you can adjust how many lines or pixels are scrolled per notch in your Windows (Mouse Settings) or macOS (System Settings) configuration. This test reflects those system-level settings.",
          },
        ]}
      />
    </div>
  );
}
