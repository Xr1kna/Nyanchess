// ============================================
// GAME REVIEW COMPONENT
// Chess.com-style game analysis
// ============================================

import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw,
  TrendingUp,
  Target,
  AlertTriangle,
  Star,
  Crown,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { GameReview, MoveClassification } from '@/types';

interface GameReviewProps {
  review: GameReview;
  pgn: string;
  onClose: () => void;
}

const CLASSIFICATION_COLORS: Record<MoveClassification, string> = {
  brilliant: 'text-purple-400 bg-purple-400/20',
  great: 'text-blue-400 bg-blue-400/20',
  best: 'text-green-400 bg-green-400/20',
  excellent: 'text-emerald-400 bg-emerald-400/20',
  good: 'text-teal-400 bg-teal-400/20',
  inaccuracy: 'text-yellow-400 bg-yellow-400/20',
  mistake: 'text-orange-400 bg-orange-400/20',
  blunder: 'text-red-400 bg-red-400/20',
};

const CLASSIFICATION_ICONS: Record<MoveClassification, typeof Star> = {
  brilliant: Crown,
  great: Star,
  best: Target,
  excellent: Target,
  good: Target,
  inaccuracy: AlertTriangle,
  mistake: AlertTriangle,
  blunder: AlertTriangle,
};

export function GameReviewComponent({ review, pgn, onClose }: GameReviewProps) {
  const [currentMove, setCurrentMove] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const game = new Chess();
  game.loadPgn(pgn);
  const history = game.history({ verbose: true });
  
  // Get position at current move
  const positionGame = new Chess();
  for (let i = 0; i < currentMove && i < history.length; i++) {
    positionGame.move(history[i]);
  }

  const handlePrevious = () => {
    setCurrentMove(Math.max(0, currentMove - 1));
  };

  const handleNext = () => {
    setCurrentMove(Math.min(history.length, currentMove + 1));
  };

  const handleReset = () => {
    setCurrentMove(0);
    setIsPlaying(false);
  };

  const currentReviewMove = review.mistakes.find(m => m.moveNumber === currentMove) ||
                           review.blunders.find(m => m.moveNumber === currentMove) ||
                           review.brilliantMoves.find(m => m.moveNumber === currentMove);

  return (
    <div className="min-h-screen anime-gradient p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onClose} className="border-white/20 text-gray-300">
              <X className="w-4 h-4 mr-2" />
              Close Review
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white">Game Review</h1>
              <p className="text-gray-400">Analysis complete</p>
            </div>
          </div>
          
          {/* Accuracy */}
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-400">White Accuracy</p>
              <p className="text-2xl font-bold text-white">{review.accuracy.white}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Black Accuracy</p>
              <p className="text-2xl font-bold text-white">{review.accuracy.black}%</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Board */}
          <div className="lg:col-span-2">
            <Card className="glass border-white/10">
              <CardContent className="p-4">
                <div className="flex justify-center mb-4">
                  <div className="w-full max-w-[500px]">
                    <Chessboard
                      options={{
                        position: positionGame.fen(),
                        boardStyle: {
                          borderRadius: '12px',
                          boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)',
                        },
                        darkSquareStyle: { backgroundColor: '#6d28d9' },
                        lightSquareStyle: { backgroundColor: '#ddd6fe' },
                        showNotation: true,
                      }}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="icon" onClick={handleReset} className="border-white/20 text-gray-300">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handlePrevious} className="border-white/20 text-gray-300">
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="border-white/20 text-gray-300"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleNext} className="border-white/20 text-gray-300">
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>

                {/* Move Info */}
                {currentReviewMove && (
                  <div className="mt-4 p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={CLASSIFICATION_COLORS[currentReviewMove.classification]}>
                        {currentReviewMove.classification.toUpperCase()}
                      </Badge>
                      <span className="text-white font-medium">Move {currentReviewMove.moveNumber}</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Played: <span className="text-white">{currentReviewMove.san}</span>
                    </p>
                    <p className="text-gray-400 text-sm">
                      Best: <span className="text-green-400">{currentReviewMove.bestMove}</span>
                    </p>
                    <p className="text-gray-400 text-sm">
                      Evaluation: {currentReviewMove.evaluation > 0 ? '+' : ''}
                      {(currentReviewMove.evaluation / 100).toFixed(2)}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Panel */}
          <div className="space-y-4">
            {/* Summary */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-base">Game Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                    <Crown className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-xl font-bold text-white">{review.brilliantMoves.length}</p>
                    <p className="text-xs text-gray-400">Brilliant</p>
                  </div>
                  <div className="text-center p-3 bg-green-500/10 rounded-lg">
                    <Target className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <p className="text-xl font-bold text-white">
                      {review.mistakes.length + review.blunders.length}
                    </p>
                    <p className="text-xs text-gray-400">Mistakes</p>
                  </div>
                  <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                    <p className="text-xl font-bold text-white">{review.blunders.length}</p>
                    <p className="text-xs text-gray-400">Blunders</p>
                  </div>
                  <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-xl font-bold text-white">{review.missedWins.length}</p>
                    <p className="text-xs text-gray-400">Missed Wins</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opening */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-base">Opening</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 mb-2">
                  {review.openings.eco}
                </Badge>
                <p className="text-white font-medium">{review.openings.white}</p>
                <p className="text-gray-400 text-sm">vs {review.openings.black}</p>
              </CardContent>
            </Card>

            {/* Key Moments */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-base">Key Moments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {review.keyMoments.map((moment) => (
                    <Button
                      key={moment.moveNumber}
                      variant="outline"
                      className="w-full justify-start border-white/10 text-left h-auto py-2"
                      onClick={() => setCurrentMove(moment.moveNumber)}
                    >
                      <Badge 
                        className={`mr-2 ${
                          moment.importance === 'critical' ? 'bg-red-500/20 text-red-300' :
                          moment.importance === 'high' ? 'bg-orange-500/20 text-orange-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}
                      >
                        {moment.importance}
                      </Badge>
                      <span className="text-gray-300 text-sm">{moment.description}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameReviewComponent;
