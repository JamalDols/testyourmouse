import { useState, useRef } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface DoubleClickResult {
  id: number;
  isDoubleClick: boolean;
  interval: number;
  timestamp: string;
}

export function DoubleClickTest() {
  const [results, setResults] = useState<DoubleClickResult[]>([]);
  const [totalClicks, setTotalClicks] = useState(0);
  const [unintendedDoubleClicks, setUnintendedDoubleClicks] = useState(0);
  const lastClickTime = useRef<number>(0);

  const handleTestClick = () => {
    const now = Date.now();
    const interval = now - lastClickTime.current;
    
    // Si el intervalo es menor a 300ms, se considera doble click
    const isDoubleClick = interval < 300 && lastClickTime.current !== 0;
    
    if (isDoubleClick) {
      setUnintendedDoubleClicks(prev => prev + 1);
    }

    const result: DoubleClickResult = {
      id: now,
      isDoubleClick,
      interval: lastClickTime.current === 0 ? 0 : interval,
      timestamp: new Date().toLocaleTimeString('es-ES')
    };

    setResults(prev => [result, ...prev].slice(0, 20));
    setTotalClicks(prev => prev + 1);
    lastClickTime.current = now;
  };

  const reset = () => {
    setResults([]);
    setTotalClicks(0);
    setUnintendedDoubleClicks(0);
    lastClickTime.current = 0;
  };

  const doubleClickRate = totalClicks > 0 ? ((unintendedDoubleClicks / totalClicks) * 100).toFixed(1) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-8 text-center bg-[#12121a] border-cyan-500/30">
        <h2 className="text-xl mb-4 text-cyan-400 tracking-wide">[DOUBLE_CLICK_DETECTOR]</h2>
        <p className="text-gray-400 mb-6 font-mono text-sm">
          // Click individuales detectados automáticamente
        </p>
        
        <button
          onClick={handleTestClick}
          className="w-full max-w-md mx-auto h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border-2 border-cyan-500/50 hover:border-cyan-500 text-cyan-400 rounded-lg transition-all transform active:scale-95 glow-cyan"
        >
          <span className="text-2xl font-mono tracking-wider">[CLICK_HERE]</span>
        </button>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center bg-cyan-500/5 border-cyan-500/30">
          <p className="text-xs text-cyan-400/70 mb-2 tracking-wider">TOTAL_CLICKS</p>
          <p className="text-3xl text-cyan-400 font-mono tabular-nums">{totalClicks.toString().padStart(3, '0')}</p>
        </Card>

        <Card className="p-4 text-center bg-red-500/5 border-red-500/30">
          <p className="text-xs text-red-400/70 mb-2 tracking-wider">DBL_CLICKS</p>
          <p className="text-3xl text-red-400 font-mono tabular-nums">{unintendedDoubleClicks.toString().padStart(3, '0')}</p>
        </Card>

        <Card className="p-4 text-center bg-purple-500/5 border-purple-500/30">
          <p className="text-xs text-purple-400/70 mb-2 tracking-wider">ERROR_RATE</p>
          <p className="text-3xl text-purple-400 font-mono">{doubleClickRate}%</p>
        </Card>
      </div>

      <Card className="p-4 bg-[#12121a] border-cyan-500/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-cyan-400 tracking-wide">[RESULTS]</h3>
          <button
            onClick={reset}
            className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg transition-colors text-sm text-cyan-400 tracking-wider"
          >
            [RESET]
          </button>
        </div>
        
        {results.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8 font-mono">
            // WAITING_FOR_INPUT
          </p>
        ) : (
          <div className="space-y-2">
            {results.map((result) => (
              <div
                key={result.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  result.isDoubleClick
                    ? 'bg-red-500/5 border-red-500/30'
                    : 'bg-green-500/5 border-green-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  {result.isDoubleClick ? (
                    <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  <div>
                    <p className="text-sm font-mono tracking-wide">
                      {result.isDoubleClick ? '[DOUBLE_CLICK]' : '[SINGLE_CLICK]'}
                    </p>
                    {result.interval > 0 && (
                      <p className="text-xs text-gray-500 font-mono">
                        Δt: {result.interval}ms
                      </p>
                    )}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs font-mono border-gray-600">
                  {result.timestamp}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
