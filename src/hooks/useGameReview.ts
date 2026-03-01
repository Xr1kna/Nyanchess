// ============================================
// GAME REVIEW & ANALYSIS ENGINE
// Like Chess.com Game Review
// ============================================

import { useState, useCallback, useRef } from 'react';
import { Chess } from 'chess.js';
import type { GameReview, MoveClassification, KeyMoment } from '@/types';

interface ReviewState {
  isAnalyzing: boolean;
  progress: number;
  review: GameReview | null;
  currentMove: number;
}

// Simple evaluation function
function evaluatePosition(game: Chess): number {
  const board = game.board();
  const pieceValues: Record<string, number> = {
    p: 100, n: 320, b: 330, r: 500, q: 900, k: 0,
  };

  let score = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        const value = pieceValues[piece.type] || 0;
        score += piece.color === 'w' ? value : -value;
      }
    }
  }

  // Mobility
  const mobility = game.moves().length * 10;
  score += game.turn() === 'w' ? mobility : -mobility;

  return score;
}

// Get best move using simple minimax
function getBestMove(game: Chess, depth: number = 3): { move: string; eval: number } | null {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;

  let bestMove = moves[0];
  let bestEval = game.turn() === 'w' ? -Infinity : Infinity;

  for (const move of moves) {
    game.move(move);
    const eval_ = minimax(game, depth - 1, -Infinity, Infinity, game.turn() === 'b');
    game.undo();

    if (game.turn() === 'w') {
      if (eval_ > bestEval) {
        bestEval = eval_;
        bestMove = move;
      }
    } else {
      if (eval_ < bestEval) {
        bestEval = eval_;
        bestMove = move;
      }
    }
  }

  return { move: bestMove.san, eval: bestEval };
}

function minimax(game: Chess, depth: number, alpha: number, beta: number, maximizing: boolean): number {
  if (depth === 0 || game.isGameOver()) {
    return evaluatePosition(game);
  }

  const moves = game.moves({ verbose: true });

  if (maximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      game.move(move);
      const eval_ = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, eval_);
      alpha = Math.max(alpha, eval_);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      game.move(move);
      const eval_ = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, eval_);
      beta = Math.min(beta, eval_);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

// Classify move based on evaluation change
function classifyMove(
  playedEval: number,
  bestEval: number,
  prevEval: number
): MoveClassification {
  const diff = Math.abs(bestEval - playedEval);
  
  // Check for brilliant moves (sacrifices that lead to advantage)
  if (playedEval > bestEval + 100 && playedEval > 200) {
    return 'brilliant';
  }

  // Check for great moves
  if (diff < 20) {
    if (playedEval > prevEval + 100) return 'great';
    return 'best';
  }

  if (diff < 50) return 'excellent';
  if (diff < 100) return 'good';
  if (diff < 200) return 'inaccuracy';
  if (diff < 400) return 'mistake';
  return 'blunder';
}

export function useGameReview() {
  const [state, setState] = useState<ReviewState>({
    isAnalyzing: false,
    progress: 0,
    review: null,
    currentMove: 0,
  });

  const abortRef = useRef(false);

  // Analyze game
  const analyzeGame = useCallback(async (pgn: string): Promise<void> => {
    setState({ isAnalyzing: true, progress: 0, review: null, currentMove: 0 });
    abortRef.current = false;

    const game = new Chess();
    game.loadPgn(pgn);
    const history = game.history({ verbose: true });
    
    const reviewMoves: ReviewMove[] = [];
    const keyMoments: KeyMoment[] = [];
    let whiteAccuracy = 0;
    let blackAccuracy = 0;
    let whiteMoves = 0;
    let blackMoves = 0;

    // Reset game for analysis
    const analysisGame = new Chess();

    for (let i = 0; i < history.length; i++) {
      if (abortRef.current) break;

      const move = history[i];
      const prevEval = evaluatePosition(analysisGame);

      // Get best move
      const bestMoveResult = getBestMove(analysisGame, 3);
      const bestMove = bestMoveResult?.move || move.san;
      const bestEval = bestMoveResult?.eval || prevEval;

      // Play the actual move
      analysisGame.move(move);
      const playedEval = evaluatePosition(analysisGame);

      // Classify move
      const classification = classifyMove(playedEval, bestEval, prevEval);

      // Calculate accuracy
      const accuracy = Math.max(0, 100 - Math.abs(bestEval - playedEval) / 10);
      
      if (move.color === 'w') {
        whiteAccuracy += accuracy;
        whiteMoves++;
      } else {
        blackAccuracy += accuracy;
        blackMoves++;
      }

      reviewMoves.push({
        moveNumber: i + 1,
        san: move.san,
        evaluation: playedEval,
        classification,
        bestMove,
        bestEvaluation: bestEval,
      });

      // Check for key moments
      if (Math.abs(playedEval - prevEval) > 200) {
        keyMoments.push({
          moveNumber: i + 1,
          description: getKeyMomentDescription(classification, move.san),
          fen: analysisGame.fen(),
          importance: classification === 'blunder' ? 'critical' : 
                      classification === 'mistake' ? 'high' : 'medium',
        });
      }

      // Update progress
      setState(prev => ({
        ...prev,
        progress: Math.round(((i + 1) / history.length) * 100),
        currentMove: i + 1,
      }));

      // Small delay to not block UI
      await new Promise(resolve => setTimeout(resolve, 10));
    }

    // Detect openings
    const openingGame = new Chess();
    const openingMoves = history.slice(0, 10).map(m => m.san);
    for (const move of openingMoves) {
      openingGame.move(move);
    }

    const review: GameReview = {
      gameId: `game-${Date.now()}`,
      accuracy: {
        white: whiteMoves > 0 ? Math.round(whiteAccuracy / whiteMoves) : 0,
        black: blackMoves > 0 ? Math.round(blackAccuracy / blackMoves) : 0,
      },
      mistakes: reviewMoves.filter(m => m.classification === 'mistake'),
      blunders: reviewMoves.filter(m => m.classification === 'blunder'),
      missedWins: reviewMoves.filter(m => 
        m.classification === 'blunder' && m.bestEvaluation > 300
      ),
      brilliantMoves: reviewMoves.filter(m => m.classification === 'brilliant'),
      openings: {
        white: detectOpening(openingGame.pgn(), 'w'),
        black: detectOpening(openingGame.pgn(), 'b'),
        eco: getECOCode(openingGame.pgn()),
      },
      keyMoments,
    };

    setState({
      isAnalyzing: false,
      progress: 100,
      review,
      currentMove: history.length,
    });
  }, []);

  // Cancel analysis
  const cancelAnalysis = useCallback(() => {
    abortRef.current = true;
    setState(prev => ({ ...prev, isAnalyzing: false }));
  }, []);

  // Reset review
  const resetReview = useCallback(() => {
    setState({
      isAnalyzing: false,
      progress: 0,
      review: null,
      currentMove: 0,
    });
  }, []);

  return {
    ...state,
    analyzeGame,
    cancelAnalysis,
    resetReview,
  };
}

// Helper functions
function getKeyMomentDescription(classification: MoveClassification, move: string): string {
  switch (classification) {
    case 'brilliant':
      return `Brilliant move: ${move}`;
    case 'blunder':
      return `Blunder: ${move}`;
    case 'mistake':
      return `Mistake: ${move}`;
    default:
      return `Key moment: ${move}`;
  }
}

function detectOpening(pgn: string, color: 'w' | 'b'): string {
  // Simple opening detection based on first moves
  if (pgn.includes('1.e4 e5 2.Nf3 Nc6 3.Bb5')) return 'Ruy Lopez';
  if (pgn.includes('1.e4 e5 2.Nf3 Nc6 3.Bc4')) return 'Italian Game';
  if (pgn.includes('1.e4 c5')) return 'Sicilian Defense';
  if (pgn.includes('1.e4 e6')) return 'French Defense';
  if (pgn.includes('1.e4 c6')) return 'Caro-Kann Defense';
  if (pgn.includes('1.d4 d5 2.c4')) return "Queen's Gambit";
  if (pgn.includes('1.d4 Nf6 2.c4')) return 'Indian Defense';
  if (pgn.includes('1.d4 Nf6 2.c4 g6')) return "King's Indian Defense";
  if (pgn.includes('1.d4 Nf6 2.c4 e6 3.Nc3 Bb4')) return 'Nimzo-Indian Defense';
  if (pgn.includes('1.c4')) return 'English Opening';
  if (pgn.includes('1.Nf3')) return 'Reti Opening';
  return color === 'w' ? "King's Pawn Game" : "King's Pawn Defense";
}

function getECOCode(pgn: string): string {
  // Simplified ECO detection
  if (pgn.includes('1.e4 e5 2.Nf3 Nc6 3.Bb5')) return 'C60';
  if (pgn.includes('1.e4 e5 2.Nf3 Nc6 3.Bc4')) return 'C50';
  if (pgn.includes('1.e4 c5')) return 'B20';
  if (pgn.includes('1.e4 e6')) return 'C00';
  if (pgn.includes('1.e4 c6')) return 'B10';
  if (pgn.includes('1.d4 d5 2.c4')) return 'D06';
  if (pgn.includes('1.d4 Nf6 2.c4 g6')) return 'E60';
  if (pgn.includes('1.c4')) return 'A10';
  if (pgn.includes('1.Nf3')) return 'A04';
  return 'A00';
}

export default useGameReview;
