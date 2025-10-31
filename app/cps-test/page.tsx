import type { Metadata } from "next";
import { CPSTest } from "@/components/CPSTest";

export const metadata: Metadata = {
  title: "CPS Test - Clicks Per Second Speed Test",
  description: "Measure your clicking speed with our CPS (Clicks Per Second) test. Test your mouse click rate for gaming. Free online CPS tester with 5s and 10s modes.",
  keywords: ["cps test", "clicks per second", "click speed test", "mouse speed test", "clicking speed", "cps counter", "gaming mouse test"],
  alternates: {
    canonical: "https://testyourmouse.com/cps-test",
  },
  openGraph: {
    title: "CPS Test - Measure Your Clicking Speed",
    description: "Test your clicks per second (CPS) for gaming. Free online tool.",
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

export default function CPSTestPage() {
  return <CPSTest />;
}
