import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Target, Award, RotateCcw } from 'lucide-react';

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
  hit: boolean;
}

export function PixelPerfectTest() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [gameStarted, setGameStarted] = useState(false);

  const targetSizes = {
    easy: 40,
    medium: 25,
    hard: 15
  };

  const generateTargets = () => {
    const newTargets: Target[] = [];
    const numTargets = 20;
    
    for (let i = 0; i < numTargets; i++) {
      newTargets.push({
        id: i,
        x: Math.random() * 85 + 5, // 5% to 90%
        y: Math.random() * 85 + 5,
        size: targetSizes[difficulty],
        hit: false
      });
    }
    
    setTargets(newTargets);
    setScore(0);
    setAttempts(0);
    setGameStarted(true);
  };

  const handleTargetClick = (targetId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setTargets(prev => prev.map(t => 
      t.id === targetId ? { ...t, hit: true } : t
    ));
    
    setScore(prev => prev + 1);
    setAttempts(prev => prev + 1);
  };

  const handleMiss = () => {
    if (gameStarted) {
      setAttempts(prev => prev + 1);
    }
  };

  const reset = () => {
    setTargets([]);
    setScore(0);
    setAttempts(0);
    setGameStarted(false);
  };

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  const remaining = targets.filter(t => !t.hit).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl mb-2 text-cyan-400 tracking-wide">[PIXEL_PERFECT_TEST]</h2>
        <p className="text-gray-400 font-mono text-sm">
          // Click all targets as accurately as possible
        </p>
      </div>

      {!gameStarted ? (
        <Card className="p-8 text-center bg-[#12121a] border-cyan-500/30">
          <Target className="w-24 h-24 mx-auto mb-4 text-cyan-400" />
          <h3 className="text-xl mb-4 text-cyan-400 tracking-wide">[SELECT_DIFFICULTY]</h3>
          
          <div className="flex gap-4 justify-center mb-6">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-6 py-3 rounded-lg font-mono transition-all ${
                  difficulty === level
                    ? 'bg-cyan-500/20 text-cyan-400 border-2 border-cyan-500'
                    : 'bg-cyan-500/5 border border-cyan-500/30 text-gray-400 hover:bg-cyan-500/10'
                }`}
              >
                [{level.toUpperCase()}]
              </button>
            ))}
          </div>

          <button
            onClick={generateTargets}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border-2 border-cyan-500/50 hover:border-cyan-500 text-cyan-400 rounded-lg transition-all glow-cyan font-mono tracking-wider"
          >
            [START_TEST]
          </button>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4">
            <Card className="p-4 text-center bg-cyan-500/5 border-cyan-500/30">
              <p className="text-xs text-cyan-400/70 mb-1 tracking-wider">HITS</p>
              <p className="text-2xl text-cyan-400 font-mono tabular-nums">{score}</p>
            </Card>

            <Card className="p-4 text-center bg-purple-500/5 border-purple-500/30">
              <p className="text-xs text-purple-400/70 mb-1 tracking-wider">REMAINING</p>
              <p className="text-2xl text-purple-400 font-mono tabular-nums">{remaining}</p>
            </Card>

            <Card className="p-4 text-center bg-green-500/5 border-green-500/30">
              <p className="text-xs text-green-400/70 mb-1 tracking-wider">ACCURACY</p>
              <p className="text-2xl text-green-400 font-mono tabular-nums">{accuracy}%</p>
            </Card>

            <Card className="p-4 text-center bg-yellow-500/5 border-yellow-500/30">
              <p className="text-xs text-yellow-400/70 mb-1 tracking-wider">DIFFICULTY</p>
              <p className="text-sm text-yellow-400 font-mono">{difficulty.toUpperCase()}</p>
            </Card>
          </div>

          <Card 
            className="relative h-[500px] overflow-hidden bg-[#0a0a0f] border-2 border-cyan-500/30 cursor-crosshair"
            onClick={handleMiss}
          >
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.2) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />

            {targets.map((target) => (
              !target.hit && (
                <div
                  key={target.id}
                  onClick={(e) => handleTargetClick(target.id, e)}
                  className="absolute rounded-full border-2 border-red-500 bg-red-500/20 hover:bg-red-500/40 transition-all cursor-pointer animate-pulse"
                  style={{
                    left: `${target.x}%`,
                    top: `${target.y}%`,
                    width: `${target.size}px`,
                    height: `${target.size}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="absolute inset-0 rounded-full border border-red-400 animate-ping opacity-50" />
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              )
            ))}

            {remaining === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]/90 backdrop-blur-sm">
                <div className="text-center">
                  <Award className="w-24 h-24 mx-auto mb-4 text-green-400 animate-pulse" />
                  <p className="text-3xl font-mono text-green-400 mb-2">[COMPLETE!]</p>
                  <p className="text-xl text-cyan-400 font-mono mb-6">
                    ACCURACY: {accuracy}%
                  </p>
                  <button
                    onClick={reset}
                    className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 rounded-lg transition-all font-mono tracking-wider"
                  >
                    [TRY_AGAIN]
                  </button>
                </div>
              </div>
            )}
          </Card>

          <button
            onClick={reset}
            className="w-full px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg transition-colors text-cyan-400 tracking-wider flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            [RESET]
          </button>
        </>
      )}

      <Card className="p-4 bg-[#12121a] border-cyan-500/30">
        <h4 className="text-sm mb-3 text-cyan-400 tracking-wider">[TIPS]</h4>
        <ul className="space-y-2 text-xs text-gray-400 font-mono">
          <li className="flex items-start gap-2">
            <Badge variant="outline" className="text-xs mt-0.5 border-cyan-500/30 text-cyan-400">1</Badge>
            <span>Smaller targets = higher difficulty</span>
          </li>
          <li className="flex items-start gap-2">
            <Badge variant="outline" className="text-xs mt-0.5 border-cyan-500/30 text-cyan-400">2</Badge>
            <span>Avoid clicking empty space</span>
          </li>
          <li className="flex items-start gap-2">
            <Badge variant="outline" className="text-xs mt-0.5 border-cyan-500/30 text-cyan-400">3</Badge>
            <span>Aim for &gt;90% accuracy</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
