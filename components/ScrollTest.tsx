"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { MousePointer2, ArrowUp, ArrowDown } from "lucide-react";

export function ScrollTest() {
  const [scrollEvents, setScrollEvents] = useState<{ id: number; direction: "up" | "down"; delta: number; timestamp: string }[]>([]);
  const [scrollPosition, setScrollPosition] = useState(50);
  const [upScrolls, setUpScrolls] = useState(0);
  const [downScrolls, setDownScrolls] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const delta = e.deltaY;
    const direction: "up" | "down" = delta > 0 ? "down" : "up";

    if (direction === "up") {
      setUpScrolls((prev) => prev + 1);
      setScrollPosition((prev) => Math.max(0, prev - 5));
    } else {
      setDownScrolls((prev) => prev + 1);
      setScrollPosition((prev) => Math.min(100, prev + 5));
    }

    const event = {
      id: Date.now() + Math.random(),
      direction,
      delta: Math.abs(delta),
      timestamp: new Date().toLocaleTimeString("es-ES"),
    };

    setScrollEvents((prev) => [event, ...prev].slice(0, 30));
  };

  const reset = () => {
    setScrollEvents([]);
    setScrollPosition(50);
    setUpScrolls(0);
    setDownScrolls(0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl mb-2 text-cyan-400 tracking-wide">[SCROLL_ANALYZER]</h2>
        <p className="text-gray-400 font-mono text-sm">// Mouse wheel detection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card ref={scrollAreaRef} className="h-96 overflow-hidden relative cursor-pointer bg-[#0a0a0f] border-cyan-500/30 hover:border-cyan-500/50 transition-colors" onWheel={handleWheel}>
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-purple-500/5 to-cyan-500/5" />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative h-full flex flex-col items-center justify-center p-8">
              <MousePointer2 className="w-16 h-16 text-cyan-400/50 mb-4" />
              <p className="text-center text-cyan-400/70 mb-2 tracking-wide">[SCROLL_DETECTION_ZONE]</p>
              <p className="text-sm text-gray-500 font-mono">UP • DOWN</p>
            </div>

            {/* Barra de progreso visual */}
            <div className="absolute left-8 top-8 bottom-8 w-2 bg-cyan-500/20 rounded-full overflow-hidden border border-cyan-500/30">
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-cyan-500 to-purple-500 transition-all duration-300 rounded-full glow-cyan" style={{ height: `${scrollPosition}%` }} />
              <div
                className="absolute w-6 h-6 bg-cyan-400 border-2 border-cyan-300 rounded-full shadow-lg transition-all duration-300 glow-cyan"
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: `calc(${scrollPosition}% - 12px)`,
                }}
              />
            </div>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center bg-cyan-500/5 border-cyan-500/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ArrowUp className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-xs text-cyan-400/70 tracking-wider">UP</span>
              </div>
              <p className="text-3xl text-cyan-400 font-mono tabular-nums">{upScrolls.toString().padStart(3, "0")}</p>
            </Card>

            <Card className="p-4 text-center bg-purple-500/5 border-purple-500/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ArrowDown className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-xs text-purple-400/70 tracking-wider">DOWN</span>
              </div>
              <p className="text-3xl text-purple-400 font-mono tabular-nums">{downScrolls.toString().padStart(3, "0")}</p>
            </Card>

            <Card className="p-4 text-center bg-green-500/5 border-green-500/30">
              <p className="text-xs text-green-400/70 mb-2 tracking-wider">TOTAL</p>
              <p className="text-3xl text-green-400 font-mono tabular-nums">{(upScrolls + downScrolls).toString().padStart(3, "0")}</p>
            </Card>
          </div>

          <button
            onClick={reset}
            className="w-full px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-colors text-cyan-400 tracking-wider"
          >
            [RESET]
          </button>
        </div>

        <Card className="p-4 bg-[#12121a] border-cyan-500/30">
          <h3 className="mb-4 text-cyan-400 tracking-wide">[EVENTS]</h3>
          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-2">
            {scrollEvents.length === 0 ? (
              <p className="text-sm text-gray-500 text-center mt-8 font-mono">// NO_EVENTS_DETECTED</p>
            ) : (
              scrollEvents.map((event) => (
                <div
                  key={event.id}
                  className={`flex items-center justify-between p-2 rounded border ${event.direction === "up" ? "bg-cyan-500/5 border-cyan-500/30" : "bg-purple-500/5 border-purple-500/30"}`}
                >
                  <div className="flex items-center gap-2">
                    {event.direction === "up" ? <ArrowUp className="w-4 h-4 text-cyan-400" /> : <ArrowDown className="w-4 h-4 text-purple-400" />}
                    <div>
                      <p className="text-sm uppercase tracking-wider font-mono">{event.direction === "up" ? "UP" : "DOWN"}</p>
                      <p className="text-xs text-gray-500 font-mono">Δ {event.delta.toFixed(0)}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs font-mono border-gray-600">
                    {event.timestamp}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
