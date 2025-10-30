import type { Metadata } from "next";
import { ProTools } from "@/components/ProTools";

export const metadata: Metadata = {
  title: "Pro Tools - Advanced Mouse Testing Features",
  description: "Professional mouse testing tools: Reaction Time, Sensor Analysis, Response Graph and more. Premium features for serious gamers and hardware enthusiasts.",
  keywords: ["pro mouse tools", "advanced mouse test", "reaction time test", "sensor analysis", "professional mouse tester"],
  openGraph: {
    title: "Pro Tools - Advanced Mouse Testing",
    description: "Professional features for advanced mouse testing and analysis.",
  },
};

export default function ProToolsPage() {
  return <ProTools />;
}
