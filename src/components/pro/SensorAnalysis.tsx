import { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Activity, Gauge, Zap, TrendingUp } from 'lucide-react';

interface MouseData {
  timestamp: number;
  x: number;
  y: number;
  velocity: number;
}

export function SensorAnalysis() {
  const [isTracking, setIsTracking] = useState(false);
  const [mouseData, setMouseData] = useState<MouseData[]>([]);
  const [currentVelocity, setCurrentVelocity] = useState(0);
  const [maxVelocity, setMaxVelocity] = useState(0);
  const [avgVelocity, setAvgVelocity] = useState(0);
  const [dpi, setDpi] = useState(800);
  const [pollRate, setPollRate] = useState(1000);
  const lastPositionRef = useRef({ x: 0, y: 0, time: 0 });
  const trackingAreaRef = useRef<HTMLDivElement>(null);

  const startTracking = () => {
    setIsTracking(true);
    setMouseData([]);
    setMaxVelocity(0);
    setAvgVelocity(0);
  };

  const stopTracking = () => {
    setIsTracking(false);
    
    if (mouseData.length > 0) {
      const avg = mouseData.reduce((sum, d) => sum + d.velocity, 0) / mouseData.length;
      setAvgVelocity(Math.round(avg));
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTracking) return;

    const currentTime = Date.now();
    const timeDelta = currentTime - lastPositionRef.current.time;
    
    if (timeDelta > 0) {
      const dx = e.clientX - lastPositionRef.current.x;
      const dy = e.clientY - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const velocity = (distance / timeDelta) * 1000; // pixels per second

      const newData: MouseData = {
        timestamp: currentTime,
        x: e.clientX,
        y: e.clientY,
        velocity: velocity
      };

      setMouseData(prev => [...prev, newData].slice(-100)); // Keep last 100 points
      setCurrentVelocity(Math.round(velocity));

      if (velocity > maxVelocity) {
        setMaxVelocity(Math.round(velocity));
      }
    }

    lastPositionRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: currentTime
    };
  };

  const calculateCPI = () => {
    // Estimated counts per inch based on DPI
    return Math.round(dpi * 1.1); // Approximate conversion
  };

  const estimatedPollRate = mouseData.length > 10
    ? Math.round(1000 / ((mouseData[mouseData.length - 1].timestamp - mouseData[0].timestamp) / mouseData.length))
    : pollRate;

  const getVelocityColor = (velocity: number) => {
    if (velocity < 100) return 'text-green-400';
    if (velocity < 500) return 'text-cyan-400';
    if (velocity < 1000) return 'text-purple-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl mb-2 text-cyan-400 tracking-wide">[SENSOR_ANALYSIS]</h2>
        <p className="text-gray-400 font-mono text-sm">
          // Advanced mouse sensor diagnostics
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-[#12121a] border-cyan-500/30">
          <label className="text-xs text-cyan-400/70 mb-2 block tracking-wider">DPI_SETTING</label>
          <input
            type="number"
            value={dpi}
            onChange={(e) => setDpi(Number(e.target.value))}
            className="w-full px-3 py-2 bg-cyan-500/5 border border-cyan-500/30 rounded text-cyan-400 font-mono"
            min="100"
            max="25600"
            step="100"
          />
        </Card>

        <Card className="p-4 bg-[#12121a] border-purple-500/30">
          <label className="text-xs text-purple-400/70 mb-2 block tracking-wider">POLL_RATE_HZ</label>
          <select
            value={pollRate}
            onChange={(e) => setPollRate(Number(e.target.value))}
            className="w-full px-3 py-2 bg-purple-500/5 border border-purple-500/30 rounded text-purple-400 font-mono"
          >
            <option value="125">125 Hz</option>
            <option value="250">250 Hz</option>
            <option value="500">500 Hz</option>
            <option value="1000">1000 Hz</option>
            <option value="2000">2000 Hz</option>
            <option value="4000">4000 Hz</option>
            <option value="8000">8000 Hz</option>
          </select>
        </Card>
      </div>

      <div 
        ref={trackingAreaRef}
        className="relative h-96 overflow-hidden bg-[#0a0a0f] border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-colors cursor-crosshair rounded-lg"
        onMouseMove={handleMouseMove}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="absolute inset-0 flex items-center justify-center">
          {!isTracking ? (
            <div className="text-center">
              <Activity className="w-16 h-16 mx-auto mb-4 text-cyan-400/50" />
              <p className="text-cyan-400/70 tracking-wide mb-4">[TRACKING_ZONE]</p>
              <button
                onClick={startTracking}
                className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border-2 border-cyan-500/50 hover:border-cyan-500 text-cyan-400 rounded-lg transition-all glow-cyan font-mono tracking-wider"
              >
                [START_TRACKING]
              </button>
            </div>
          ) : (
            <div className="text-center">
              <Gauge className={`w-24 h-24 mx-auto mb-4 animate-pulse ${getVelocityColor(currentVelocity)}`} />
              <p className={`text-6xl font-mono mb-2 ${getVelocityColor(currentVelocity)}`}>
                {currentVelocity}
              </p>
              <p className="text-sm text-gray-500 font-mono mb-4">px/s</p>
              <button
                onClick={stopTracking}
                className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg transition-all font-mono tracking-wider"
              >
                [STOP_TRACKING]
              </button>
            </div>
          )}
        </div>

        {/* Velocity trail visualization */}
        {isTracking && mouseData.length > 1 && (
          <svg className="absolute inset-0 pointer-events-none">
            {mouseData.slice(-50).map((point, i, arr) => {
              if (i === 0) return null;
              const prevPoint = arr[i - 1];
              const opacity = i / arr.length;
              return (
                <line
                  key={i}
                  x1={prevPoint.x}
                  y1={prevPoint.y}
                  x2={point.x}
                  y2={point.y}
                  stroke={`rgba(0, 217, 255, ${opacity * 0.5})`}
                  strokeWidth="2"
                />
              );
            })}
          </svg>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 text-center bg-cyan-500/5 border-cyan-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400/70 tracking-wider">CURRENT</span>
          </div>
          <p className="text-2xl text-cyan-400 font-mono tabular-nums">{currentVelocity}</p>
          <p className="text-xs text-gray-500 font-mono">px/s</p>
        </Card>

        <Card className="p-4 text-center bg-purple-500/5 border-purple-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-purple-400/70 tracking-wider">MAX</span>
          </div>
          <p className="text-2xl text-purple-400 font-mono tabular-nums">{maxVelocity}</p>
          <p className="text-xs text-gray-500 font-mono">px/s</p>
        </Card>

        <Card className="p-4 text-center bg-green-500/5 border-green-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-400/70 tracking-wider">AVG</span>
          </div>
          <p className="text-2xl text-green-400 font-mono tabular-nums">{avgVelocity}</p>
          <p className="text-xs text-gray-500 font-mono">px/s</p>
        </Card>

        <Card className="p-4 text-center bg-yellow-500/5 border-yellow-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gauge className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-yellow-400/70 tracking-wider">SAMPLES</span>
          </div>
          <p className="text-2xl text-yellow-400 font-mono tabular-nums">{mouseData.length}</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-[#12121a] border-cyan-500/30">
          <h4 className="text-sm mb-3 text-cyan-400 tracking-wider">[SENSOR_SPECS]</h4>
          <div className="space-y-2 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-gray-400">DPI:</span>
              <span className="text-cyan-400">{dpi}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">CPI:</span>
              <span className="text-cyan-400">{calculateCPI()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Poll Rate:</span>
              <span className="text-purple-400">{pollRate} Hz</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Measured Rate:</span>
              <span className="text-purple-400">{estimatedPollRate} Hz</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-[#12121a] border-cyan-500/30">
          <h4 className="text-sm mb-3 text-cyan-400 tracking-wider">[PERFORMANCE]</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400 font-mono">Response</span>
                <span className="text-green-400 font-mono">
                  {pollRate >= 1000 ? 'EXCELLENT' : pollRate >= 500 ? 'GOOD' : 'AVERAGE'}
                </span>
              </div>
              <div className="h-2 bg-green-500/20 rounded-full overflow-hidden border border-green-500/30">
                <div 
                  className="h-full bg-green-500 transition-all"
                  style={{ width: `${Math.min((pollRate / 1000) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400 font-mono">Precision</span>
                <span className="text-cyan-400 font-mono">
                  {dpi >= 1600 ? 'HIGH' : dpi >= 800 ? 'MEDIUM' : 'LOW'}
                </span>
              </div>
              <div className="h-2 bg-cyan-500/20 rounded-full overflow-hidden border border-cyan-500/30">
                <div 
                  className="h-full bg-cyan-500 transition-all"
                  style={{ width: `${Math.min((dpi / 1600) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
