import type { Metadata } from "next";
import { ProTools } from "@/components/ProTools";

export const metadata: Metadata = {
  title: "Pro Tools - Advanced Mouse Testing Features",
  description: "Professional mouse testing tools: Reaction Time, Sensor Analysis, Response Graph and more. Premium features for serious gamers and hardware enthusiasts.",
  keywords: ["pro mouse tools", "advanced mouse test", "reaction time test", "sensor analysis", "professional mouse tester"],
  alternates: {
    canonical: "https://testyourmouse.com/pro-tools",
  },
  openGraph: {
    title: "Pro Tools - Advanced Mouse Testing",
    description: "Professional features for advanced mouse testing and analysis.",
    url: "https://testyourmouse.com/pro-tools",
    type: "website",
    images: [
      {
        url: "https://testyourmouse.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TestYourMouse - Pro Tools",
      },
    ],
  },
};

export default function ProToolsPage() {
  const mask = (val: string | undefined) => (val ? `${val.substring(0, 8)}...` : "NOT_SET");

  const debugInfo = {
    webhookSecret: mask(process.env.STRIPE_WEBHOOK_SECRET),
    priceId: mask(process.env.STRIPE_PRICE_ID),
    secretKey: mask(process.env.STRIPE_SECRET_KEY),
    productId: mask(process.env.STRIPE_PRODUCT_ID),
    publishableKey: mask(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
  };

  return <ProTools debugInfo={debugInfo} />;
}
