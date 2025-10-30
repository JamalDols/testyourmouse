"use client";

import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Zap, Clock, TrendingDown } from "lucide-react";

type TestState = "idle" | "waiting" | "ready" | "clicked" | "too-early";

export function ReactionTimeTest() {
  const [testState, setTestState] = useState<TestState>("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [results, setResults] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);

  const averageTime = results.length > 0 ? results.reduce((a, b) => a + b, 0) / results.length : 0;

  const bestTime = results.length > 0 ? Math.min(...results) : 0;

  const startTest = () => {
    setTestState("waiting");
    setReactionTime(null);

    // Random delay between 2-5 seconds
    const randomDelay = Math.random() * 3000 + 2000;

    setTimeout(() => {
      setTestState("ready");
      setStartTime(Date.now());
    }, randomDelay);
  };

  const handleClick = () => {
    if (testState === "waiting") {
      setTestState("too-early");
      setTimeout(() => setTestState("idle"), 2000);
      return;
    }

    if (testState === "ready") {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setResults((prev) => [time, ...prev].slice(0, 10));
      setTestState("clicked");
      setTimeout(() => setTestState("idle"), 2000);
    }
  };

  useEffect(() => {
    if (testState === "waiting") {
      const interval = setInterval(() => {
        setCountdown((prev) => prev + 1);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setCountdown(0);
    }
  }, [testState]);

  const getBackgroundColor = () => {
    switch (testState) {
      case "waiting":
        return "bg-red-500/20 border-red-500/50";
      case "ready":
        return "bg-green-500/20 border-green-500/50 glow-green";
      case "too-early":
        return "bg-yellow-500/20 border-yellow-500/50";
      case "clicked":
        return "bg-cyan-500/20 border-cyan-500/50";
      default:
        return "bg-cyan-500/5 border-cyan-500/30";
    }
  };

  const getMessage = () => {
    switch (testState) {
      case "idle":
        return "[CLICK_TO_START]";
      case "waiting":
        return "[WAIT_FOR_GREEN]";
      case "ready":
        return "[CLICK_NOW!]";
      case "too-early":
        return "[TOO_EARLY!]";
      case "clicked":
        return `${reactionTime}ms`;
      default:
        return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl mb-2 text-cyan-400 tracking-wide">[REACTION_TIME_TEST]</h2>
        <p className="text-gray-400 font-mono text-sm">// Click when the screen turns green</p>
      </div>

      <Card className={`p-8 text-center h-96 flex items-center justify-center cursor-pointer transition-all ${getBackgroundColor()}`} onClick={testState === "idle" ? startTest : handleClick}>
        <div>
          <Zap
            className={`w-24 h-24 mx-auto mb-4 ${
              testState === "ready" ? "text-green-400 animate-pulse" : testState === "waiting" ? "text-red-400" : testState === "too-early" ? "text-yellow-400" : "text-cyan-400"
            }`}
          />
          <p className="text-5xl font-mono tracking-wider mb-2">{getMessage()}</p>
          {testState === "waiting" && (
            <div className="flex justify-center gap-1 mt-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i < Math.floor(countdown / 2) ? "bg-red-500" : "bg-red-500/20"}`} />
              ))}
            </div>
          )}
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center bg-cyan-500/5 border-cyan-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400/70 tracking-wider">LAST</span>
          </div>
          <p className="text-3xl text-cyan-400 font-mono tabular-nums">{reactionTime ? `${reactionTime}` : "---"}</p>
          <p className="text-xs text-gray-500 font-mono">ms</p>
        </Card>

        <Card className="p-4 text-center bg-purple-500/5 border-purple-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-purple-400/70 tracking-wider">AVG</span>
          </div>
          <p className="text-3xl text-purple-400 font-mono tabular-nums">{averageTime ? Math.round(averageTime) : "---"}</p>
          <p className="text-xs text-gray-500 font-mono">ms</p>
        </Card>

        <Card className="p-4 text-center bg-green-500/5 border-green-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-green-400 animate-pulse" />
            <span className="text-xs text-green-400/70 tracking-wider">BEST</span>
          </div>
          <p className="text-3xl text-green-400 font-mono tabular-nums">{bestTime ? bestTime : "---"}</p>
          <p className="text-xs text-gray-500 font-mono">ms</p>
        </Card>
      </div>

      <Card className="p-4 bg-[#12121a] border-cyan-500/30">
        <h3 className="mb-4 text-cyan-400 tracking-wide">[RESULTS_HISTORY]</h3>
        {results.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8 font-mono">// NO_DATA_AVAILABLE</p>
        ) : (
          <div className="grid grid-cols-5 gap-2">
            {results.map((time, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`text-center py-2 font-mono tabular-nums ${
                  time === bestTime
                    ? "bg-green-500/10 border-green-500/50 text-green-400"
                    : time < 200
                    ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                    : time < 300
                    ? "bg-purple-500/10 border-purple-500/50 text-purple-400"
                    : "bg-red-500/10 border-red-500/50 text-red-400"
                }`}
              >
                {time}ms
              </Badge>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-4 bg-[#12121a] border-cyan-500/30">
        <h4 className="text-sm mb-3 text-cyan-400 tracking-wider">[BENCHMARKS]</h4>
        <div className="space-y-2 text-xs text-gray-400 font-mono">
          <div className="flex justify-between items-center p-2 bg-green-500/5 border border-green-500/30 rounded">
            <span>&lt; 200ms</span>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">EXCELLENT</Badge>
          </div>
          <div className="flex justify-between items-center p-2 bg-cyan-500/5 border border-cyan-500/30 rounded">
            <span>200-250ms</span>
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/50">GOOD</Badge>
          </div>
          <div className="flex justify-between items-center p-2 bg-purple-500/5 border border-purple-500/30 rounded">
            <span>250-300ms</span>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">AVERAGE</Badge>
          </div>
          <div className="flex justify-between items-center p-2 bg-red-500/5 border border-red-500/30 rounded">
            <span>&gt; 300ms</span>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/50">SLOW</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
