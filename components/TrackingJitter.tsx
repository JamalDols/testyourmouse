"use client";

import { useRef, useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Eraser, Activity, Target, Move, Crosshair } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function TrackingJitter() {
  const [activeTest, setActiveTest] = useState<"jitter" | "tracking">("jitter");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl mb-2 text-cyan-400 tracking-wide">[PRECISION_&_STABILITY_ANALYZER]</h2>
        <p className="text-gray-400 font-mono text-sm">// Test mouse sensor accuracy and stability</p>
      </div>

      <Tabs value={activeTest} onValueChange={(v) => setActiveTest(v as "jitter" | "tracking")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#12121a] border border-cyan-500/20">
          <TabsTrigger value="jitter" className="data-[state=active]:bg-cyan-500/10 data-[state=active]:text-cyan-400 data-[state=active]:border-cyan-500/50 text-gray-400">
            <Crosshair className="w-4 h-4 mr-2" />
            [JITTER_TEST]
          </TabsTrigger>
          <TabsTrigger value="tracking" className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-400 data-[state=active]:border-purple-500/50 text-gray-400">
            <Move className="w-4 h-4 mr-2" />
            [TRACKING_TEST]
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jitter" className="mt-6">
          <JitterTest />
        </TabsContent>

        <TabsContent value="tracking" className="mt-6">
          <TrackingTest />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Jitter Test Component
function JitterTest() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [points, setPoints] = useState<{ x: number; y: number; timestamp: number }[]>([]);
  const [jitterScore, setJitterScore] = useState<number | null>(null);
  const [maxDeviation, setMaxDeviation] = useState<number | null>(null);
  const [avgDeviation, setAvgDeviation] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const centerPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawCanvas();
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and draw background
    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "rgba(0, 217, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw center target
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Outer ring
    ctx.strokeStyle = "rgba(0, 217, 255, 0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 50, 0, Math.PI * 2);
    ctx.stroke();

    // Middle ring
    ctx.strokeStyle = "rgba(0, 217, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(cx, cy, 30, 0, Math.PI * 2);
    ctx.stroke();

    // Inner circle
    ctx.fillStyle = "rgba(0, 217, 255, 0.2)";
    ctx.beginPath();
    ctx.arc(cx, cy, 15, 0, Math.PI * 2);
    ctx.fill();

    // Center dot
    ctx.fillStyle = "#00d9ff";
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw recorded points
    if (points.length > 0) {
      points.forEach((point, i) => {
        const alpha = Math.max(0.1, 1 - (points.length - i) / points.length);
        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [points]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isRecording) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!centerPoint.current) {
      centerPoint.current = { x, y };
    }

    setPoints((prev) => [...prev, { x, y, timestamp: Date.now() }]);
  };

  const startTest = () => {
    setIsRecording(true);
    setTimeLeft(10);
    setPoints([]);
    setJitterScore(null);
    setMaxDeviation(null);
    setAvgDeviation(null);
    centerPoint.current = null;

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTest = () => {
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    calculateJitter();
  };

  const calculateJitter = () => {
    if (points.length < 10) return;

    // Calculate center point (average position)
    const center = {
      x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
      y: points.reduce((sum, p) => sum + p.y, 0) / points.length,
    };

    // Calculate deviations
    const deviations = points.map((p) => {
      const dx = p.x - center.x;
      const dy = p.y - center.y;
      return Math.sqrt(dx * dx + dy * dy);
    });

    const maxDev = Math.max(...deviations);
    const avgDev = deviations.reduce((a, b) => a + b, 0) / deviations.length;

    setMaxDeviation(maxDev);
    setAvgDeviation(avgDev);

    // Calculate jitter score (0-100, lower deviation = higher score)
    const score = Math.max(0, Math.min(100, 100 - avgDev * 2));
    setJitterScore(Math.round(score));
  };

  const reset = () => {
    setIsRecording(false);
    setTimeLeft(10);
    setPoints([]);
    setJitterScore(null);
    setMaxDeviation(null);
    setAvgDeviation(null);
    centerPoint.current = null;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    drawCanvas();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <Card className="p-4 bg-[#12121a] border-cyan-500/30">
          <canvas ref={canvasRef} className="w-full h-[500px] border-2 border-cyan-500/30 hover:border-cyan-500/50 rounded-lg cursor-crosshair transition-colors" onMouseMove={handleMouseMove} />

          <div className="flex gap-3 mt-4">
            {!isRecording && jitterScore === null && (
              <button
                onClick={startTest}
                className="flex-1 px-4 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-colors text-cyan-400 tracking-wider"
              >
                [START_TEST]
              </button>
            )}

            {isRecording && (
              <button
                onClick={stopTest}
                className="flex-1 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-colors text-red-400 tracking-wider"
              >
                [STOP_TEST]
              </button>
            )}

            {jitterScore !== null && (
              <button
                onClick={reset}
                className="flex-1 px-4 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-colors flex items-center justify-center gap-2 text-cyan-400 tracking-wider"
              >
                <Eraser className="w-4 h-4" />
                [RESET]
              </button>
            )}
          </div>

          {isRecording && (
            <div className="mt-4 text-center">
              <p className="text-2xl font-mono text-cyan-400 tabular-nums">{timeLeft}s</p>
              <p className="text-xs text-gray-500 mt-1">Keep your mouse as still as possible on the center target</p>
            </div>
          )}
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="p-4 bg-cyan-500/5 border-cyan-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs text-cyan-400/70 tracking-wider">JITTER_SCORE</span>
          </div>
          <p className="text-3xl mb-1 font-mono text-cyan-400 tabular-nums">{jitterScore !== null ? jitterScore : "--"}</p>
          <p className="text-xs text-gray-500 font-mono">/100</p>
          {jitterScore !== null && (
            <div className="mt-3 h-2 bg-cyan-500/20 rounded-full overflow-hidden border border-cyan-500/30">
              <div className="h-full bg-cyan-500 transition-all duration-300 glow-cyan" style={{ width: `${jitterScore}%` }} />
            </div>
          )}
        </Card>

        <Card className="p-4 bg-purple-500/5 border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-purple-400/70 tracking-wider">AVG_DEVIATION</span>
          </div>
          <p className="text-2xl mb-1 font-mono text-purple-400 tabular-nums">{avgDeviation !== null ? avgDeviation.toFixed(1) : "--"}</p>
          <p className="text-xs text-gray-500 font-mono">pixels</p>
        </Card>

        <Card className="p-4 bg-orange-500/5 border-orange-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-orange-400" />
            <span className="text-xs text-orange-400/70 tracking-wider">MAX_DEVIATION</span>
          </div>
          <p className="text-2xl mb-1 font-mono text-orange-400 tabular-nums">{maxDeviation !== null ? maxDeviation.toFixed(1) : "--"}</p>
          <p className="text-xs text-gray-500 font-mono">pixels</p>
        </Card>

        <Card className="p-4 bg-[#12121a] border-cyan-500/30">
          <h4 className="text-sm mb-3 text-cyan-400 tracking-wider">[INSTRUCTIONS]</h4>
          <ul className="space-y-2 text-xs text-gray-400 font-mono">
            <li className="flex items-start gap-2">
              <Badge variant="outline" className="text-xs mt-0.5 border-cyan-500/30 text-cyan-400">
                1
              </Badge>
              <span>Click START_TEST</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge variant="outline" className="text-xs mt-0.5 border-cyan-500/30 text-cyan-400">
                2
              </Badge>
              <span>Keep mouse still on center for 10s</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge variant="outline" className="text-xs mt-0.5 border-cyan-500/30 text-cyan-400">
                3
              </Badge>
              <span>Lower deviation = better</span>
            </li>
          </ul>
        </Card>

        <Card className="p-4 bg-green-500/5 border-green-500/30">
          <h4 className="text-sm mb-2 text-green-400 tracking-wider">[DATA_POINTS]</h4>
          <p className="text-2xl font-mono text-green-400 tabular-nums">{points.length}</p>
        </Card>
      </div>
    </div>
  );
}

// Tracking Test Component
function TrackingTest() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [straightnessScore, setStraightnessScore] = useState(0);
  const [smoothnessScore, setSmoothnessScore] = useState(0);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = "rgba(0, 217, 255, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 30) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const calculateMetrics = (pts: { x: number; y: number }[]) => {
    if (pts.length < 3) return;

    // Calculate smoothness (lower angle changes = higher smoothness)
    let totalDeviation = 0;
    for (let i = 1; i < pts.length - 1; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const next = pts[i + 1];

      const dx1 = curr.x - prev.x;
      const dy1 = curr.y - prev.y;
      const dx2 = next.x - curr.x;
      const dy2 = next.y - curr.y;

      const angle1 = Math.atan2(dy1, dx1);
      const angle2 = Math.atan2(dy2, dx2);
      const angleDiff = Math.abs(angle1 - angle2);

      totalDeviation += angleDiff;
    }

    const avgDeviation = totalDeviation / (pts.length - 2);
    const smoothness = Math.max(0, 100 - avgDeviation * 100);
    setSmoothnessScore(Math.round(smoothness));

    // Calculate straightness
    if (pts.length > 1) {
      const start = pts[0];
      const end = pts[pts.length - 1];
      const directDistance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

      let pathDistance = 0;
      for (let i = 1; i < pts.length; i++) {
        const p1 = pts[i - 1];
        const p2 = pts[i];
        pathDistance += Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      }

      const straightness = directDistance > 0 ? (directDistance / pathDistance) * 100 : 0;
      setStraightnessScore(Math.round(straightness));
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    lastPos.current = { x, y };
    setPoints([{ x, y }]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx || !lastPos.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Draw main line
    ctx.strokeStyle = "#00d9ff";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = "#00d9ff";
    ctx.shadowBlur = 5;

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Draw trailing effect
    ctx.strokeStyle = "rgba(168, 85, 247, 0.5)";
    ctx.lineWidth = 1;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#a855f7";

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    const newPoints = [...points, { x, y }];
    setPoints(newPoints);
    calculateMetrics(newPoints);

    lastPos.current = { x, y };
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#0a0a0f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw grid
    ctx.strokeStyle = "rgba(0, 217, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 30) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    setPoints([]);
    setStraightnessScore(0);
    setSmoothnessScore(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-3">
        <Card className="p-4 bg-[#12121a] border-purple-500/30">
          <canvas
            ref={canvasRef}
            className="w-full h-[500px] border-2 border-purple-500/30 hover:border-purple-500/50 rounded-lg cursor-crosshair transition-colors"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          <button
            onClick={clearCanvas}
            className="w-full mt-4 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 rounded-lg transition-colors flex items-center justify-center gap-2 text-purple-400 tracking-wider"
          >
            <Eraser className="w-4 h-4" />
            [CLEAR_CANVAS]
          </button>
        </Card>
      </div>

      <div className="space-y-4">
        <Card className="p-4 bg-cyan-500/5 border-cyan-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs text-cyan-400/70 tracking-wider">SMOOTHNESS</span>
          </div>
          <p className="text-3xl mb-1 font-mono text-cyan-400 tabular-nums">{smoothnessScore}</p>
          <p className="text-xs text-gray-500 font-mono">/100</p>
          <div className="mt-3 h-2 bg-cyan-500/20 rounded-full overflow-hidden border border-cyan-500/30">
            <div className="h-full bg-cyan-500 transition-all duration-300 glow-cyan" style={{ width: `${smoothnessScore}%` }} />
          </div>
        </Card>

        <Card className="p-4 bg-purple-500/5 border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="text-xs text-purple-400/70 tracking-wider">STRAIGHTNESS</span>
          </div>
          <p className="text-3xl mb-1 font-mono text-purple-400 tabular-nums">{straightnessScore}</p>
          <p className="text-xs text-gray-500 font-mono">/100</p>
          <div className="mt-3 h-2 bg-purple-500/20 rounded-full overflow-hidden border border-purple-500/30">
            <div className="h-full bg-purple-500 transition-all duration-300 glow-purple" style={{ width: `${straightnessScore}%` }} />
          </div>
        </Card>

        <Card className="p-4 bg-[#12121a] border-purple-500/30">
          <h4 className="text-sm mb-3 text-purple-400 tracking-wider">[INSTRUCTIONS]</h4>
          <ul className="space-y-2 text-xs text-gray-400 font-mono">
            <li className="flex items-start gap-2">
              <Badge variant="outline" className="text-xs mt-0.5 border-purple-500/30 text-purple-400">
                1
              </Badge>
              <span>Draw straight lines</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge variant="outline" className="text-xs mt-0.5 border-purple-500/30 text-purple-400">
                2
              </Badge>
              <span>Use grid as reference</span>
            </li>
            <li className="flex items-start gap-2">
              <Badge variant="outline" className="text-xs mt-0.5 border-purple-500/30 text-purple-400">
                3
              </Badge>
              <span>Higher score = better tracking</span>
            </li>
          </ul>
        </Card>

        <Card className="p-4 bg-green-500/5 border-green-500/30">
          <h4 className="text-sm mb-2 text-green-400 tracking-wider">[POINTS_TRACKED]</h4>
          <p className="text-2xl font-mono text-green-400 tabular-nums">{points.length}</p>
        </Card>
      </div>
    </div>
  );
}
