import type { Metadata } from "next";
import { ScrollTest } from "@/components/ScrollTest";

export const metadata: Metadata = {
  title: "Scroll Test - Mouse Wheel Precision Tester",
  description: "Test your mouse scroll wheel precision and smoothness. Detect scroll issues and measure wheel performance. Free online scroll wheel tester.",
  keywords: ["scroll test", "mouse wheel test", "scroll wheel checker", "wheel precision", "mouse scroll tester"],
  alternates: {
    canonical: "https://testyourmouse.com/scroll-test",
  },
  openGraph: {
    title: "Scroll Test - Test Your Mouse Wheel",
    description: "Evaluate scroll wheel precision and smoothness with detailed metrics.",
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
  return <ScrollTest />;
}
