import { useState, useCallback, useRef } from 'react';
import { Chess, type Square } from 'chess.js';

// Simulated online game state
export type GameMode = 'offline' | 'online' | 'vs-ai';
export type GameStatus = 'waiting' | 'playing' | 'ended';

export interface OnlinePlayer {
  id: string;
  username: string;
  rating: number;
  color: 'w' | 'b';
  connected: boolean;
}

export interface GameState {
  fen: string;
  turn: 'w' | 'b';
  isCheck: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
  isGameOver: boolean;
  lastMove: { from: string; to: string } | null;
  moveHistory: string[];
}

// Hook untuk mengelola game online
export const useOnlineGame = () => {
  const [gameMode, setGameMode] = useState<GameMode>('vs-ai');
  const [gameStatus, setGameStatus] = useState<GameStatus>('waiting');
  const [playerColor, setPlayerColor] = useState<'w' | 'b'>('w');
  const [opponent, setOpponent] = useState<OnlinePlayer | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    turn: 'w',
    isCheck: false,
    isCheckmate: false,
    isDraw: false,
    isGameOver: false,
    lastMove: null,
    moveHistory: [],
  });
  
  const gameRef = useRef(new Chess());
  const moveQueue = useRef<string[]>([]);

  // Reset game
  const resetGame = useCallback(() => {
    gameRef.current = new Chess();
    setGameState({
      fen: gameRef.current.fen(),
      turn: 'w',
      isCheck: false,
      isCheckmate: false,
      isDraw: false,
      isGameOver: false,
      lastMove: null,
      moveHistory: [],
    });
    setGameStatus('waiting');
    moveQueue.current = [];
  }, []);

  // Make a move
  const makeMove = useCallback((from: string, to: string, promotion: string = 'q'): boolean => {
    try {
      const move = gameRef.current.move({ from: from as Square, to: to as Square, promotion });
      if (move) {
        setGameState({
          fen: gameRef.current.fen(),
          turn: gameRef.current.turn() as 'w' | 'b',
          isCheck: gameRef.current.isCheck(),
          isCheckmate: gameRef.current.isCheckmate(),
          isDraw: gameRef.current.isDraw(),
          isGameOver: gameRef.current.isGameOver(),
          lastMove: { from, to },
          moveHistory: [...gameState.moveHistory, move.san],
        });
        return true;
      }
    } catch (error) {
      console.error('Invalid move:', error);
    }
    return false;
  }, [gameState.moveHistory]);

  // Undo last move
  const undoMove = useCallback((): boolean => {
    const undone = gameRef.current.undo();
    if (undone) {
      setGameState({
        fen: gameRef.current.fen(),
        turn: gameRef.current.turn() as 'w' | 'b',
        isCheck: gameRef.current.isCheck(),
        isCheckmate: gameRef.current.isCheckmate(),
        isDraw: gameRef.current.isDraw(),
        isGameOver: gameRef.current.isGameOver(),
        lastMove: null,
        moveHistory: gameState.moveHistory.slice(0, -1),
      });
      return true;
    }
    return false;
  }, [gameState.moveHistory]);

  // Start online match (simulated)
  const startOnlineMatch = useCallback(async (): Promise<boolean> => {
    setGameMode('online');
    setGameStatus('waiting');
    
    // Simulate finding opponent
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Randomly assign colors
    const isWhite = Math.random() > 0.5;
    setPlayerColor(isWhite ? 'w' : 'b');
    
    // Set simulated opponent
    const opponents = [
      { username: 'ChessMaster99', rating: 1850 },
      { username: 'KnightRider', rating: 1620 },
      { username: 'PawnStar', rating: 1450 },
      { username: 'QueenGambit', rating: 1780 },
    ];
    const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
    
    setOpponent({
      id: Math.random().toString(36).substr(2, 9),
      username: randomOpponent.username,
      rating: randomOpponent.rating,
      color: isWhite ? 'b' : 'w',
      connected: true,
    });
    
    resetGame();
    setGameStatus('playing');
    
    return true;
  }, [resetGame]);

  // Cancel matchmaking
  const cancelMatchmaking = useCallback(() => {
    setGameMode('vs-ai');
    setGameStatus('waiting');
    setOpponent(null);
  }, []);

  // Forfeit game
  const forfeit = useCallback(() => {
    setGameStatus('ended');
    setGameMode('vs-ai');
    setOpponent(null);
  }, []);

  // Check if it's player's turn
  const isPlayerTurn = useCallback((): boolean => {
    return gameState.turn === playerColor;
  }, [gameState.turn, playerColor]);

  return {
    // State
    gameMode,
    gameStatus,
    playerColor,
    opponent,
    gameState,
    
    // Actions
    setGameMode,
    makeMove,
    undoMove,
    resetGame,
    startOnlineMatch,
    cancelMatchmaking,
    forfeit,
    isPlayerTurn,
    
    // Refs
    game: gameRef.current,
  };
};

export default useOnlineGame;
