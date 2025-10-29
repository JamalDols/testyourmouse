import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Home } from './components/Home';
import { ClickVisualizer } from './components/ClickVisualizer';
import { DoubleClickTest } from './components/DoubleClickTest';
import { CPSTest } from './components/CPSTest';
import { ScrollTest } from './components/ScrollTest';
import { TrackingJitter } from './components/TrackingJitter';
import { ProTools } from './components/ProTools';
import { ProProvider } from './components/ProContext';
import { Toaster } from './components/ui/sonner';
import { Coffee, Mouse, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <ProProvider>
      <div className="min-h-screen relative z-10">
      {/* Header */}
      <header className="border-b border-cyan-500/30 bg-[#0a0a0f]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <Mouse className="w-8 h-8 text-cyan-400" />
              <div className="absolute inset-0 w-8 h-8 text-cyan-400 animate-ping opacity-20">
                <Mouse className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl tracking-tight">
              <span className="text-cyan-400">&gt;_</span> TestYourMouse
            </h1>
          </div>
          <p className="text-gray-400 text-sm tracking-wide">
            <Terminal className="w-3 h-3 inline mr-2" />
            PROFESSIONAL MOUSE TESTING SUITE v2.0
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-8 bg-[#12121a] border border-cyan-500/20 p-1 flex-wrap h-auto">
            <TabsTrigger value="home" className="flex-1 min-w-[120px] data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50 text-gray-400 hover:text-cyan-300 transition-colors">
              [HOME]
            </TabsTrigger>
            <TabsTrigger value="click-visualizer" className="flex-1 min-w-[120px] data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50 text-gray-400 hover:text-cyan-300 transition-colors">
              [CLICK_VIS]
            </TabsTrigger>
            <TabsTrigger value="double-click" className="flex-1 min-w-[120px] data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50 text-gray-400 hover:text-cyan-300 transition-colors">
              [DBL_CLICK]
            </TabsTrigger>
            <TabsTrigger value="cps-test" className="flex-1 min-w-[120px] data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50 text-gray-400 hover:text-cyan-300 transition-colors">
              [CPS_TEST]
            </TabsTrigger>
            <TabsTrigger value="scroll-test" className="flex-1 min-w-[120px] data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50 text-gray-400 hover:text-cyan-300 transition-colors">
              [SCROLL]
            </TabsTrigger>
            <TabsTrigger value="tracking-jitter" className="flex-1 min-w-[120px] data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50 text-gray-400 hover:text-cyan-300 transition-colors">
              [TRACKING]
            </TabsTrigger>
            <TabsTrigger value="pro-tools" className="flex-1 min-w-[120px] relative data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-400 data-[state=active]:border-purple-500/50 text-gray-400 hover:text-purple-300 transition-colors">
              [PRO_TOOLS]
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-0">
            <Home onNavigateToTool={setActiveTab} />
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
      <footer className="border-t border-cyan-500/30 mt-16 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p className="font-mono">
            <span className="text-cyan-400">©</span> 2025 TestYourMouse.com 
            <span className="text-cyan-400 mx-2">•</span> 
            <span className="text-purple-400">[BUILT_FOR_GAMERS]</span>
          </p>
        </div>
      </footer>

      {/* Buy Me a Coffee Button */}
      <a
        href="https://www.buymeacoffee.com"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 rounded-lg shadow-lg transition-all transform hover:scale-110 flex items-center gap-2 z-50 border-2 border-yellow-500/50 glow-cyan"
      >
        <Coffee className="w-5 h-5" />
        <span className="hidden sm:inline tracking-wide">SUPPORT</span>
      </a>

      {/* Toast Notifications */}
      <Toaster />
    </div>
    </ProProvider>
  );
}
