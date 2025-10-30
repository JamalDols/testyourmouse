"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home } from "@/components/Home";
import { ClickVisualizer } from "@/components/ClickVisualizer";
import { DoubleClickTest } from "@/components/DoubleClickTest";
import { CPSTest } from "@/components/CPSTest";
import { ScrollTest } from "@/components/ScrollTest";
import { TrackingJitter } from "@/components/TrackingJitter";
import { ProTools } from "@/components/ProTools";
import { Coffee, Mouse, Home as HomeIcon } from "lucide-react";
import { useState } from "react";
import Script from "next/script";

export default function Page() {
  const [activeTab, setActiveTab] = useState("home");

  const handleNavigateToTool = (tool: string) => {
    setActiveTab(tool);
  };

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
      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b border-cyan-500/20 sticky top-0 z-50 backdrop-blur-sm bg-background/80" role="banner">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-3 mb-2">
              <Mouse className="w-8 h-8 text-cyan-400" aria-hidden="true" />
              <h1 className="text-3xl font-medium tracking-wider text-cyan-400">TestYourMouse</h1>
            </div>
            <p className="text-cyan-400/70 text-sm">Test your mouse like a pro</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8" role="main">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start mb-8 bg-cyan-500/10 border border-cyan-500/30 p-1 flex-wrap h-auto" role="tablist" aria-label="Mouse testing tools">
              <TabsTrigger value="home" className="flex-1 min-w-[140px]" aria-label="Home page">
                <HomeIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Home
              </TabsTrigger>
              <TabsTrigger value="click-visualizer" className="flex-1 min-w-[140px]" aria-label="Click visualizer">
                Click Visualizer
              </TabsTrigger>
              <TabsTrigger value="double-click" className="flex-1 min-w-[140px]" aria-label="Double click test">
                Double Click Test
              </TabsTrigger>
              <TabsTrigger value="cps-test" className="flex-1 min-w-[140px]" aria-label="Clicks per second speed test">
                CPS Test
              </TabsTrigger>
              <TabsTrigger value="scroll-test" className="flex-1 min-w-[140px]" aria-label="Mouse scroll test">
                Scroll Test
              </TabsTrigger>
              <TabsTrigger value="tracking-jitter" className="flex-1 min-w-[140px]" aria-label="Tracking and jitter test">
                Tracking & Jitter
              </TabsTrigger>
              <TabsTrigger value="pro-tools" className="flex-1 min-w-[140px] relative" aria-label="Professional tools">
                Pro Tools
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" aria-hidden="true" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="mt-0" role="tabpanel" aria-labelledby="home-tab">
              <Home onNavigateToTool={handleNavigateToTool} />
            </TabsContent>

            <TabsContent value="click-visualizer" className="mt-0" role="tabpanel" aria-labelledby="click-visualizer-tab">
              <ClickVisualizer />
            </TabsContent>

            <TabsContent value="double-click" className="mt-0" role="tabpanel" aria-labelledby="double-click-tab">
              <DoubleClickTest />
            </TabsContent>

            <TabsContent value="cps-test" className="mt-0" role="tabpanel" aria-labelledby="cps-test-tab">
              <CPSTest />
            </TabsContent>

            <TabsContent value="scroll-test" className="mt-0" role="tabpanel" aria-labelledby="scroll-test-tab">
              <ScrollTest />
            </TabsContent>

            <TabsContent value="tracking-jitter" className="mt-0" role="tabpanel" aria-labelledby="tracking-jitter-tab">
              <TrackingJitter />
            </TabsContent>

            <TabsContent value="pro-tools" className="mt-0" role="tabpanel" aria-labelledby="pro-tools-tab">
              <ProTools />
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t border-cyan-500/20 mt-16 py-8" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-cyan-400/50">
            <p>© 2025 TestYourMouse.com • Made with ❤️ for gamers and tech enthusiasts</p>
          </div>
        </footer>

        {/* Buy Me a Coffee Button */}
        <a
          href="https://www.buymeacoffee.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buy me a coffee - Support this project"
          className="fixed bottom-6 right-6 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center gap-2 z-50 font-medium"
        >
          <Coffee className="w-5 h-5" aria-hidden="true" />
          <span className="hidden sm:inline">Buy Me a Coffee</span>
        </a>
      </div>
    </>
  );
}
