import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Mouse, Circle } from 'lucide-react';

interface ClickEvent {
  id: number;
  button: 'left' | 'right' | 'middle';
  timestamp: string;
}

export function ClickVisualizer() {
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [middleCount, setMiddleCount] = useState(0);
  const [clickLog, setClickLog] = useState<ClickEvent[]>([]);
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const button = e.button === 0 ? 'left' : e.button === 2 ? 'right' : 'middle';
    
    if (button === 'left') setLeftCount(prev => prev + 1);
    if (button === 'right') setRightCount(prev => prev + 1);
    if (button === 'middle') setMiddleCount(prev => prev + 1);

    const newEvent: ClickEvent = {
      id: Date.now(),
      button,
      timestamp: new Date().toLocaleTimeString('es-ES')
    };

    setClickLog(prev => [newEvent, ...prev].slice(0, 50));
    setActiveButton(button);
    setTimeout(() => setActiveButton(null), 200);
  };

  const resetCounters = () => {
    setLeftCount(0);
    setRightCount(0);
    setMiddleCount(0);
    setClickLog([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div
          className="relative h-96 rounded-lg border-2 border-cyan-500/30 bg-[#0a0a0f] cursor-crosshair flex items-center justify-center overflow-hidden hover:border-cyan-500/50 transition-colors"
          onClick={handleClick}
          onContextMenu={(e) => { e.preventDefault(); handleClick(e); }}
          onMouseDown={(e) => { if (e.button === 1) { e.preventDefault(); handleClick(e); } }}
        >
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
          
          <div className="text-center space-y-4 pointer-events-none relative z-10">
            <Mouse className="w-16 h-16 mx-auto text-cyan-400/50" />
            <div>
              <p className="text-cyan-400/70 tracking-wide">[CLICK_DETECTION_ZONE]</p>
              <p className="text-sm text-gray-500 mt-2 font-mono">LEFT • RIGHT • MIDDLE</p>
            </div>
          </div>
          
          {activeButton && (
            <div className="absolute inset-0 pointer-events-none z-20">
              <div 
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full animate-ping ${
                  activeButton === 'left' ? 'bg-cyan-500/40 glow-cyan' :
                  activeButton === 'right' ? 'bg-purple-500/40 glow-purple' :
                  'bg-green-500/40 glow-green'
                }`}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-cyan-500/5 border-cyan-500/30 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-4 h-4 fill-cyan-500 text-cyan-500 animate-pulse" />
              <span className="text-xs text-cyan-400/70 tracking-wider">LEFT_BTN</span>
            </div>
            <p className="text-3xl text-cyan-400 font-mono tabular-nums">{leftCount.toString().padStart(4, '0')}</p>
          </Card>

          <Card className="p-4 bg-purple-500/5 border-purple-500/30 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-4 h-4 fill-purple-500 text-purple-500 animate-pulse" />
              <span className="text-xs text-purple-400/70 tracking-wider">RIGHT_BTN</span>
            </div>
            <p className="text-3xl text-purple-400 font-mono tabular-nums">{rightCount.toString().padStart(4, '0')}</p>
          </Card>

          <Card className="p-4 bg-green-500/5 border-green-500/30 hover:border-green-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Circle className="w-4 h-4 fill-green-500 text-green-500 animate-pulse" />
              <span className="text-xs text-green-400/70 tracking-wider">MID_BTN</span>
            </div>
            <p className="text-3xl text-green-400 font-mono tabular-nums">{middleCount.toString().padStart(4, '0')}</p>
          </Card>
        </div>

        <button
          onClick={resetCounters}
          className="w-full px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-colors text-cyan-400 tracking-wide"
        >
          [RESET_COUNTERS]
        </button>
      </div>

      <Card className="p-4 bg-[#12121a] border-cyan-500/30">
        <h3 className="mb-4 text-cyan-400 tracking-wide">[EVENT_LOG]</h3>
        <ScrollArea className="h-[480px] pr-4">
          {clickLog.length === 0 ? (
            <p className="text-sm text-gray-500 text-center mt-8 font-mono">
              // NO_EVENTS_DETECTED
            </p>
          ) : (
            <div className="space-y-2">
              {clickLog.map((event) => (
                <div
                  key={event.id}
                  className={`flex items-center justify-between p-2 rounded border ${
                    event.button === 'left' ? 'bg-cyan-500/5 border-cyan-500/30' :
                    event.button === 'right' ? 'bg-purple-500/5 border-purple-500/30' :
                    'bg-green-500/5 border-green-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Circle className={`w-3 h-3 fill-current ${
                      event.button === 'left' ? 'text-cyan-500' :
                      event.button === 'right' ? 'text-purple-500' :
                      'text-green-500'
                    }`} />
                    <span className="text-sm uppercase tracking-wider font-mono">{event.button}</span>
                  </div>
                  <Badge variant="outline" className="text-xs font-mono border-gray-600">
                    {event.timestamp}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
}
