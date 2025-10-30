"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Timer, Trophy } from "lucide-react";

interface CPSResult {
  id: number;
  clicks: number;
  cps: number;
  duration: number;
  timestamp: string;
}

export function CPSTest() {
  const [isActive, setIsActive] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [selectedDuration, setSelectedDuration] = useState(5);
  const [results, setResults] = useState<CPSResult[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      endTest();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const startTest = () => {
    setIsActive(true);
    setClicks(0);
    setTimeLeft(selectedDuration);
  };

  const endTest = () => {
    setIsActive(false);
    const cps = Number((clicks / selectedDuration).toFixed(2));

    const result: CPSResult = {
      id: Date.now(),
      clicks,
      cps,
      duration: selectedDuration,
      timestamp: new Date().toLocaleTimeString("es-ES"),
    };

    setResults((prev) => [result, ...prev].slice(0, 10));
  };

  const handleClick = () => {
    if (!isActive) {
      startTest();
    }
    setClicks((prev) => prev + 1);
  };

  const currentCPS = timeLeft < selectedDuration ? (clicks / (selectedDuration - timeLeft)).toFixed(2) : 0;

  const bestCPS = results.length > 0 ? Math.max(...results.map((r) => r.cps)) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl mb-2 text-cyan-400 tracking-wide">[CPS_ANALYZER]</h2>
        <p className="text-gray-400 font-mono text-sm">// Maximum speed detection</p>
      </div>

      <Card className="p-8 text-center bg-[#12121a] border-cyan-500/30">
        <div className="mb-6">
          <p className="text-sm text-cyan-400/70 mb-2 tracking-wider">TEST_DURATION</p>
          <div className="flex gap-2 justify-center">
            {[1, 5, 10, 30].map((duration) => (
              <button
                key={duration}
                onClick={() => {
                  if (!isActive) setSelectedDuration(duration);
                }}
                disabled={isActive}
                className={`px-4 py-2 rounded-lg transition-colors font-mono ${
                  selectedDuration === duration
                    ? "bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500"
                    : "bg-cyan-500/5 border border-cyan-500/30 text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-400"
                } disabled:opacity-50`}
              >
                {duration}s
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleClick}
          className="w-full max-w-md mx-auto h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border-2 border-cyan-500/50 hover:border-cyan-500 text-cyan-400 rounded-lg transition-all transform active:scale-95 mb-6 disabled:opacity-50 glow-cyan"
        >
          <div>
            {!isActive || timeLeft === selectedDuration ? (
              <div>
                <p className="text-sm mb-2 tracking-wider font-mono">[START_TEST]</p>
                <p className="text-5xl font-mono tracking-wider">CLICK</p>
              </div>
            ) : (
              <div>
                <p className="text-6xl mb-2 font-mono tabular-nums text-glow-cyan">{clicks}</p>
                <p className="text-xl tracking-wider">CLICKS</p>
              </div>
            )}
          </div>
        </button>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-cyan-500/5 border border-cyan-500/30 rounded-lg">
            <p className="text-xs text-cyan-400/70 mb-1 tracking-wider">TIME_LEFT</p>
            <div className="flex items-center justify-center gap-2">
              <Timer className="w-5 h-5 text-cyan-400" />
              <p className="text-2xl font-mono tabular-nums text-cyan-400">{timeLeft}s</p>
            </div>
          </div>

          <div className="p-4 bg-purple-500/5 border border-purple-500/30 rounded-lg">
            <p className="text-xs text-purple-400/70 mb-1 tracking-wider">CURRENT_CPS</p>
            <p className="text-2xl font-mono tabular-nums text-purple-400">{currentCPS}</p>
          </div>

          <div className="p-4 bg-yellow-500/5 border border-yellow-500/30 rounded-lg">
            <p className="text-xs text-yellow-400/70 mb-1 tracking-wider">BEST_CPS</p>
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400 animate-pulse" />
              <p className="text-2xl font-mono tabular-nums text-yellow-400">{bestCPS.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-[#12121a] border-cyan-500/30">
        <h3 className="mb-4 text-cyan-400 tracking-wide">[HISTORY]</h3>
        {results.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8 font-mono">// NO_DATA_AVAILABLE</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-cyan-500/20">
                <TableHead className="text-cyan-400 font-mono text-xs">TIME</TableHead>
                <TableHead className="text-right text-cyan-400 font-mono text-xs">CLICKS</TableHead>
                <TableHead className="text-right text-cyan-400 font-mono text-xs">DURATION</TableHead>
                <TableHead className="text-right text-cyan-400 font-mono text-xs">CPS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.id} className="border-cyan-500/10">
                  <TableCell className="font-mono text-sm">{result.timestamp}</TableCell>
                  <TableCell className="text-right font-mono tabular-nums">{result.clicks}</TableCell>
                  <TableCell className="text-right font-mono">{result.duration}s</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={result.cps === bestCPS ? "default" : "outline"}
                      className={`font-mono ${result.cps === bestCPS ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50" : "border-gray-600"}`}
                    >
                      {result.cps}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
