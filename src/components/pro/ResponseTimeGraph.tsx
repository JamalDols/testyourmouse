import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Clock, TrendingDown, Activity, BarChart3 } from 'lucide-react';

interface ClickData {
  id: number;
  timestamp: string;
  responseTime: number;
  clickType: 'left' | 'right' | 'middle';
}

export function ResponseTimeGraph() {
  const [isTracking, setIsTracking] = useState(false);
  const [clickData, setClickData] = useState<ClickData[]>([]);
  const [lastClickTime, setLastClickTime] = useState<number>(0);
  const [avgResponseTime, setAvgResponseTime] = useState<number>(0);
  const [minResponseTime, setMinResponseTime] = useState<number>(Infinity);
  const [maxResponseTime, setMaxResponseTime] = useState<number>(0);

  const startTracking = () => {
    setIsTracking(true);
    setClickData([]);
    setLastClickTime(0);
    setAvgResponseTime(0);
    setMinResponseTime(Infinity);
    setMaxResponseTime(0);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isTracking) return;

    const currentTime = Date.now();
    const responseTime = lastClickTime === 0 ? 0 : currentTime - lastClickTime;

    if (responseTime > 0) {
      const clickType = e.button === 0 ? 'left' : e.button === 2 ? 'right' : 'middle';
      
      const newClick: ClickData = {
        id: clickData.length,
        timestamp: new Date(currentTime).toLocaleTimeString(),
        responseTime: responseTime,
        clickType: clickType
      };

      const newClickData = [...clickData, newClick];
      setClickData(newClickData);

      // Calculate statistics
      const times = newClickData.map(c => c.responseTime).filter(t => t > 0);
      if (times.length > 0) {
        const avg = times.reduce((a, b) => a + b, 0) / times.length;
        setAvgResponseTime(Math.round(avg));
        setMinResponseTime(Math.min(...times));
        setMaxResponseTime(Math.max(...times));
      }
    }

    setLastClickTime(currentTime);
  };

  const chartData = clickData
    .filter(d => d.responseTime > 0)
    .map((d, i) => ({
      index: i + 1,
      time: d.responseTime,
      name: d.timestamp
    }));

  const getColorForResponseTime = (time: number) => {
    if (time < 200) return '#00ff88';
    if (time < 300) return '#00d9ff';
    if (time < 500) return '#8b5cf6';
    return '#ff3366';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl mb-2 text-cyan-400 tracking-wide">[RESPONSE_TIME_ANALYSIS]</h2>
        <p className="text-gray-400 font-mono text-sm">
          // Real-time click latency monitoring
        </p>
      </div>

      <Card 
        className="relative h-96 overflow-hidden bg-[#0a0a0f] border-2 border-cyan-500/30 hover:border-cyan-500/50 transition-colors cursor-pointer"
        onClick={handleClick}
        onContextMenu={(e) => { e.preventDefault(); handleClick(e); }}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        <div className="absolute inset-0 flex items-center justify-center">
          {!isTracking ? (
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-cyan-400/50" />
              <p className="text-cyan-400/70 tracking-wide mb-4">[CLICK_TO_MEASURE]</p>
              <button
                onClick={(e) => { e.stopPropagation(); startTracking(); }}
                className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border-2 border-cyan-500/50 hover:border-cyan-500 text-cyan-400 rounded-lg transition-all glow-cyan font-mono tracking-wider"
              >
                [START_RECORDING]
              </button>
            </div>
          ) : (
            <div className="text-center pointer-events-none">
              <Activity className="w-24 h-24 mx-auto mb-4 text-cyan-400 animate-pulse" />
              <p className="text-cyan-400/70 tracking-wide mb-2">[RECORDING_ACTIVE]</p>
              <p className="text-sm text-gray-500 font-mono">
                Click anywhere • {clickData.filter(c => c.responseTime > 0).length} samples
              </p>
            </div>
          )}
        </div>

        {isTracking && (
          <button
            onClick={(e) => { e.stopPropagation(); stopTracking(); }}
            className="absolute bottom-4 right-4 z-10 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg transition-all font-mono text-sm tracking-wider"
          >
            [STOP]
          </button>
        )}
      </Card>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 text-center bg-cyan-500/5 border-cyan-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-400/70 tracking-wider">AVG</span>
          </div>
          <p className="text-2xl text-cyan-400 font-mono tabular-nums">
            {avgResponseTime || '---'}
          </p>
          <p className="text-xs text-gray-500 font-mono">ms</p>
        </Card>

        <Card className="p-4 text-center bg-green-500/5 border-green-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-400/70 tracking-wider">MIN</span>
          </div>
          <p className="text-2xl text-green-400 font-mono tabular-nums">
            {minResponseTime === Infinity ? '---' : minResponseTime}
          </p>
          <p className="text-xs text-gray-500 font-mono">ms</p>
        </Card>

        <Card className="p-4 text-center bg-red-500/5 border-red-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-red-400" />
            <span className="text-xs text-red-400/70 tracking-wider">MAX</span>
          </div>
          <p className="text-2xl text-red-400 font-mono tabular-nums">
            {maxResponseTime || '---'}
          </p>
          <p className="text-xs text-gray-500 font-mono">ms</p>
        </Card>

        <Card className="p-4 text-center bg-purple-500/5 border-purple-500/30">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-purple-400/70 tracking-wider">SAMPLES</span>
          </div>
          <p className="text-2xl text-purple-400 font-mono tabular-nums">
            {clickData.filter(c => c.responseTime > 0).length}
          </p>
        </Card>
      </div>

      {chartData.length > 0 && (
        <Card className="p-6 bg-[#12121a] border-cyan-500/30">
          <h3 className="mb-4 text-cyan-400 tracking-wide">[TIME_SERIES_GRAPH]</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00d9ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 217, 255, 0.1)" />
              <XAxis 
                dataKey="index" 
                stroke="#8b8b9a" 
                style={{ fontSize: '12px', fontFamily: 'monospace' }}
                label={{ value: 'Click #', position: 'insideBottom', offset: -5, fill: '#8b8b9a' }}
              />
              <YAxis 
                stroke="#8b8b9a" 
                style={{ fontSize: '12px', fontFamily: 'monospace' }}
                label={{ value: 'ms', angle: -90, position: 'insideLeft', fill: '#8b8b9a' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#12121a', 
                  border: '1px solid rgba(0, 217, 255, 0.3)',
                  borderRadius: '8px',
                  fontFamily: 'monospace'
                }}
                labelStyle={{ color: '#00d9ff' }}
              />
              <Area 
                type="monotone" 
                dataKey="time" 
                stroke="#00d9ff" 
                strokeWidth={2}
                fill="url(#colorTime)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      )}

      {clickData.filter(c => c.responseTime > 0).length > 0 && (
        <Card className="p-4 bg-[#12121a] border-cyan-500/30">
          <h3 className="mb-4 text-cyan-400 tracking-wide">[CLICK_LOG]</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {clickData.filter(c => c.responseTime > 0).reverse().map((click) => (
              <div
                key={click.id}
                className="flex items-center justify-between p-2 rounded border border-cyan-500/20 bg-cyan-500/5"
              >
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline"
                    className="font-mono border-cyan-500/30 text-cyan-400"
                  >
                    #{click.id}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`font-mono uppercase ${
                      click.clickType === 'left' ? 'border-cyan-500/30 text-cyan-400' :
                      click.clickType === 'right' ? 'border-purple-500/30 text-purple-400' :
                      'border-green-500/30 text-green-400'
                    }`}
                  >
                    {click.clickType}
                  </Badge>
                  <span 
                    className="text-lg font-mono tabular-nums"
                    style={{ color: getColorForResponseTime(click.responseTime) }}
                  >
                    {click.responseTime}ms
                  </span>
                </div>
                <span className="text-xs text-gray-500 font-mono">{click.timestamp}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-4 bg-[#12121a] border-cyan-500/30">
        <h4 className="text-sm mb-3 text-cyan-400 tracking-wider">[LATENCY_GUIDE]</h4>
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 p-2 bg-green-500/5 border border-green-500/30 rounded">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-400">&lt; 200ms: Excellent</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-cyan-500/5 border border-cyan-500/30 rounded">
            <div className="w-3 h-3 bg-cyan-500 rounded-full" />
            <span className="text-gray-400">200-300ms: Good</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-purple-500/5 border border-purple-500/30 rounded">
            <div className="w-3 h-3 bg-purple-500 rounded-full" />
            <span className="text-gray-400">300-500ms: Average</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-red-500/5 border border-red-500/30 rounded">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-gray-400">&gt; 500ms: Slow</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
