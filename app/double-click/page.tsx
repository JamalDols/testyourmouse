import type { Metadata } from "next";
import { DoubleClickTest } from "@/components/DoubleClickTest";

export const metadata: Metadata = {
  title: "Double Click Test - Detect Mouse Double Click Issues",
  description: "Test your mouse for unwanted double clicking. Identify click stability issues and hardware defects. Free online double click tester.",
  keywords: ["double click test", "mouse double click", "click stability", "mouse defect test", "button bouncing"],
  alternates: {
    canonical: "https://testyourmouse.com/double-click",
  },
  openGraph: {
    title: "Double Click Test - Mouse Stability Checker",
    description: "Test if your mouse suffers from unwanted double clicking. Free tool.",
    url: "https://testyourmouse.com/double-click",
  },
};

export default function DoubleClickPage() {
  return <DoubleClickTest />;
}
