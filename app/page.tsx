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

export default function Page() {
  const [activeTab, setActiveTab] = useState("home");

  const handleNavigateToTool = (tool: string) => {
    setActiveTab(tool);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-cyan-500/20 sticky top-0 z-50 backdrop-blur-sm bg-background/80">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Mouse className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-medium tracking-wider text-cyan-400">TestYourMouse</h1>
          </div>
          <p className="text-cyan-400/70 text-sm">Testea tu ratón como un pro</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-8 bg-cyan-500/10 border border-cyan-500/30 p-1 flex-wrap h-auto">
            <TabsTrigger value="home" className="flex-1 min-w-[140px]">
              <HomeIcon className="w-4 h-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger value="click-visualizer" className="flex-1 min-w-[140px]">
              Click Visualizer
            </TabsTrigger>
            <TabsTrigger value="double-click" className="flex-1 min-w-[140px]">
              Double Click Test
            </TabsTrigger>
            <TabsTrigger value="cps-test" className="flex-1 min-w-[140px]">
              CPS Test
            </TabsTrigger>
            <TabsTrigger value="scroll-test" className="flex-1 min-w-[140px]">
              Scroll Test
            </TabsTrigger>
            <TabsTrigger value="tracking-jitter" className="flex-1 min-w-[140px]">
              Tracking & Jitter
            </TabsTrigger>
            <TabsTrigger value="pro-tools" className="flex-1 min-w-[140px] relative">
              Pro Tools
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-0">
            <Home onNavigateToTool={handleNavigateToTool} />
          </TabsContent>

          <TabsContent value="click-visualizer" className="mt-0">
            <ClickVisualizer />
          </TabsContent>

          <TabsContent value="double-click" className="mt-0">
            <DoubleClickTest />
          </TabsContent>

          <TabsContent value="cps-test" className="mt-0">
            <CPSTest />
          </TabsContent>

          <TabsContent value="scroll-test" className="mt-0">
            <ScrollTest />
          </TabsContent>

          <TabsContent value="tracking-jitter" className="mt-0">
            <TrackingJitter />
          </TabsContent>

          <TabsContent value="pro-tools" className="mt-0">
            <ProTools />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-cyan-400/50">
          <p>© 2025 TestYourMouse.com • Hecho con ❤️ para gamers y entusiastas de la tecnología</p>
        </div>
      </footer>

      {/* Buy Me a Coffee Button */}
      <a
        href="https://www.buymeacoffee.com"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center gap-2 z-50 font-medium"
      >
        <Coffee className="w-5 h-5" />
        <span className="hidden sm:inline">Buy Me a Coffee</span>
      </a>
    </div>
  );
}
