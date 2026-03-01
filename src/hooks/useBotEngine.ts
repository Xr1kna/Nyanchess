// ============================================
// BOT CHESS ENGINE
// Supports ratings from 200 to 3000
// ============================================

import { useCallback, useRef } from 'react';
import { Chess } from 'chess.js';
import type { BotLevel } from '@/types';

// Piece values for evaluation
const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Position bonus tables (simplified)
const PAWN_TABLE = [
  0, 0, 0, 0, 0, 0, 0, 0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
  5, 5, 10, 25, 25, 10, 5, 5,
  0, 0, 0, 20, 20, 0, 0, 0,
  5, -5, -10, 0, 0, -10, -5, 5,
  5, 10, 10, -20, -20, 10, 10, 5,
  0, 0, 0, 0, 0, 0, 0, 0,
];

export function useBotEngine() {
  const botLevel = useRef<BotLevel | null>(null);

  // Set bot level
  const setBotLevel = useCallback((level: BotLevel) => {
    botLevel.current = level;
  }, []);

  // Evaluate position
  const evaluatePosition = useCallback((game: Chess): number => {
    const board = game.board();
    let score = 0;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        if (piece) {
          const value = PIECE_VALUES[piece.type] || 0;
          const positionBonus = piece.type === 'p' ? PAWN_TABLE[i * 8 + j] : 0;
          
          if (piece.color === 'w') {
            score += value + positionBonus;
          } else {
            score -= value + positionBonus;
          }
        }
      }
    }

    // Mobility bonus
    const mobility = game.moves().length * 10;
    score += game.turn() === 'w' ? mobility : -mobility;

    // Check bonus
    if (game.isCheck()) {
      score += game.turn() === 'w' ? -50 : 50;
    }

    return score;
  }, []);

  // Minimax with alpha-beta pruning
  const minimax = useCallback((
    game: Chess,
    depth: number,
    alpha: number,
    beta: number,
    maximizing: boolean
  ): number => {
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
  }, [evaluatePosition]);

  // Get best move for bot
  const getBestMove = useCallback((game: Chess): string | null => {
    if (!botLevel.current) return null;

    const { depth, randomness } = botLevel.current;
    const moves = game.moves({ verbose: true });
    
    if (moves.length === 0) return null;

    // For very low ratings, make random moves
    if (randomness > 0.7) {
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      return randomMove.san;
    }

    // Evaluate all moves
    const moveScores: { move: typeof moves[0]; score: number }[] = [];

    for (const move of moves) {
      game.move(move);
      let score = minimax(game, depth - 1, -Infinity, Infinity, false);
      game.undo();

      // Add randomness based on bot level
      score += (Math.random() - 0.5) * randomness * 200;

      // Bonus for captures at lower levels
      if (randomness > 0.3 && move.flags.includes('c')) {
        score += 50;
      }

      // Bonus for checks
      if (move.san.includes('+')) {
        score += 30;
      }

      // Bonus for center control
      const centerSquares = ['d4', 'd5', 'e4', 'e5'];
      if (centerSquares.includes(move.to)) {
        score += 20;
      }

      moveScores.push({ move, score });
    }

    // Sort by score
    moveScores.sort((a, b) => b.score - a.score);

    // For higher randomness, pick from top moves randomly
    if (randomness > 0.2) {
      const topMoves = moveScores.slice(0, Math.max(1, Math.floor(moves.length * randomness)));
      const selected = topMoves[Math.floor(Math.random() * topMoves.length)];
      return selected.move.san;
    }

    return moveScores[0].move.san;
  }, [minimax]);

  // Make bot move
  const makeBotMove = useCallback((game: Chess): { success: boolean; move?: string } => {
    const move = getBestMove(game);
    if (move) {
      try {
        game.move(move);
        return { success: true, move };
      } catch {
        return { success: false };
      }
    }
    return { success: false };
  }, [getBestMove]);

  return {
    setBotLevel,
    getBestMove,
    makeBotMove,
    evaluatePosition,
  };
}

export default useBotEngine;
