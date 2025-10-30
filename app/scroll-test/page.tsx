import type { Metadata } from "next";
import { ScrollTest } from "@/components/ScrollTest";

export const metadata: Metadata = {
  title: "Scroll Test - Mouse Wheel Precision Tester",
  description: "Test your mouse scroll wheel precision and smoothness. Detect scroll issues and measure wheel performance. Free online scroll wheel tester.",
  keywords: ["scroll test", "mouse wheel test", "scroll wheel checker", "wheel precision", "mouse scroll tester"],
  openGraph: {
    title: "Scroll Test - Test Your Mouse Wheel",
    description: "Evaluate scroll wheel precision and smoothness with detailed metrics.",
  },
};

export default function ScrollTestPage() {
  return <ScrollTest />;
}
