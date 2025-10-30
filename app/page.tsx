import { Home } from "@/components/Home";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Home - Professional Mouse Testing Tools",
  description: "Test your mouse like a pro with our suite of professional free tools: CPS Test, Double Click Test, Tracking & Jitter, and more.",
};

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://testyourmouse.com/#website",
        url: "https://testyourmouse.com",
        name: "TestYourMouse",
        description: "Professional free tools to test your mouse",
        inLanguage: "en-US",
      },
      {
        "@type": "WebApplication",
        "@id": "https://testyourmouse.com/#webapp",
        url: "https://testyourmouse.com",
        name: "TestYourMouse",
        description: "Professional suite of gaming mouse testing tools",
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "CPS Test - Click speed test",
          "Double Click Test - Double click detector",
          "Click Visualizer - Click visualizer",
          "Scroll Test - Scroll analyzer",
          "Tracking & Jitter - Precision test",
          "Pro Tools - Professional tools",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://testyourmouse.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is TestYourMouse?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "TestYourMouse is a professional suite of free tools designed to test all aspects of your gaming mouse: click speed (CPS), double clicking, precision, tracking, jitter and more.",
            },
          },
          {
            "@type": "Question",
            name: "Is TestYourMouse free to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, all basic tools are 100% free and require no registration.",
            },
          },
          {
            "@type": "Question",
            name: "What is a CPS Test?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CPS stands for Clicks Per Second. It measures how fast you can click with your mouse. A good CPS for gaming is between 5-10 clicks per second.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script id="structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Home />
    </>
  );
}
