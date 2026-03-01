// ============================================
// MULTIPLAYER SYSTEM
// Real-time game management (WebSocket simulation)
// ============================================

import { useState, useCallback, useRef } from 'react';
import { Chess } from 'chess.js';
import { toast } from 'sonner';
import type { Game, Player, GameMode, ChatMessage } from '@/types';

interface TimeControl {
  initial: number;
  increment: number;
}

interface MultiplayerState {
  isConnected: boolean;
  isSearching: boolean;
  currentGame: Game | null;
  opponent: Player | null;
  timeRemaining: { white: number; black: number };
  messages: ChatMessage[];
}

// Mock players from around the world
const MOCK_PLAYERS = [
  { username: 'MagnusFan99', rating: 1850, country: 'NO', flag: '🇳🇴' },
  { username: 'ChessMaster_CN', rating: 2100, country: 'CN', flag: '🇨🇳' },
  { username: 'VishyFan_IN', rating: 1950, country: 'IN', flag: '🇮🇳' },
  { username: 'KarpovStyle', rating: 2200, country: 'RU', flag: '🇷🇺' },
  { username: 'NakamuraFan', rating: 2050, country: 'US', flag: '🇺🇸' },
  { username: 'LondonSystem', rating: 1650, country: 'GB', flag: '🇬🇧' },
  { username: 'SicilianKing', rating: 1750, country: 'IT', flag: '🇮🇹' },
  { username: 'FrenchDefense', rating: 1550, country: 'FR', flag: '🇫🇷' },
  { username: 'CaroKannPro', rating: 1800, country: 'DE', flag: '🇩🇪' },
  { username: 'PircMaster', rating: 1600, country: 'ES', flag: '🇪🇸' },
  { username: 'DutchStonewall', rating: 1700, country: 'NL', flag: '🇳🇱' },
  { username: 'BenkoGambit', rating: 1900, country: 'HU', flag: '🇭🇺' },
  { username: 'GrunfeldExpert', rating: 2000, country: 'IL', flag: '🇮🇱' },
  { username: 'NimzoIndian', rating: 1850, country: 'PL', flag: '🇵🇱' },
  { username: 'KingsIndian', rating: 1750, country: 'IN', flag: '🇮🇳' },
  { username: 'QueenGambit', rating: 1650, country: 'US', flag: '🇺🇸' },
  { username: 'RuyLopezFan', rating: 1550, country: 'ES', flag: '🇪🇸' },
  { username: 'ItalianGame', rating: 1450, country: 'IT', flag: '🇮🇹' },
  { username: 'ScotchGame', rating: 1750, country: 'GB', flag: '🇬🇧' },
  { username: 'PetrovDefense', rating: 1950, country: 'RU', flag: '🇷🇺' },
];

export function useMultiplayer(userId: string, username: string) {
  const [state, setState] = useState<MultiplayerState>({
    isConnected: false,
    isSearching: false,
    currentGame: null,
    opponent: null,
    timeRemaining: { white: 0, black: 0 },
    messages: [],
  });

  const gameRef = useRef(new Chess());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  // Connect to multiplayer server (simulated)
  const connect = useCallback(() => {
    setState(prev => ({ ...prev, isConnected: true }));
    
    // Simulate WebSocket connection
    console.log('[Multiplayer] Connected to server');
    
    return () => {
      setState(prev => ({ ...prev, isConnected: false }));
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Find match
  const findMatch = useCallback((mode: GameMode, timeControl: TimeControl) => {
    setState(prev => ({ ...prev, isSearching: true }));

    // Simulate matchmaking delay
    setTimeout(() => {
      const randomOpponent = MOCK_PLAYERS[Math.floor(Math.random() * MOCK_PLAYERS.length)];
      const isWhite = Math.random() > 0.5;

      const game: Game = {
        id: `game-${Date.now()}`,
        white: isWhite 
          ? { id: userId, username, rating: 1500, color: 'w', timeRemaining: timeControl.initial, isConnected: true }
          : { id: 'opponent', ...randomOpponent, color: 'w', timeRemaining: timeControl.initial, isConnected: true },
        black: !isWhite 
          ? { id: userId, username, rating: 1500, color: 'b', timeRemaining: timeControl.initial, isConnected: true }
          : { id: 'opponent', ...randomOpponent, color: 'b', timeRemaining: timeControl.initial, isConnected: true },
        mode,
        timeControl,
        status: 'playing',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        pgn: '',
        moveHistory: [],
        startTime: new Date(),
        chat: [],
      };

      setState(prev => ({
        ...prev,
        isSearching: false,
        currentGame: game,
        opponent: isWhite ? game.black : game.white,
        timeRemaining: { white: timeControl.initial, black: timeControl.initial },
      }));

      // Start timer
      timerRef.current = setInterval(() => {
        setState(prev => {
          if (!prev.currentGame) return prev;
          
          const turn = gameRef.current.turn();
          const newTime = { ...prev.timeRemaining };
          
          if (turn === 'w') {
            newTime.white = Math.max(0, newTime.white - 1);
          } else {
            newTime.black = Math.max(0, newTime.black - 1);
          }

          // Check for timeout
          if (newTime.white === 0 || newTime.black === 0) {
            if (timerRef.current) clearInterval(timerRef.current);
          }

          return { ...prev, timeRemaining: newTime };
        });
      }, 1000);

    }, 2000 + Math.random() * 3000); // 2-5 seconds matchmaking
  }, [userId, username]);

  // Cancel search
  const cancelSearch = useCallback(() => {
    setState(prev => ({ ...prev, isSearching: false }));
  }, []);

  // Make move
  const makeMove = useCallback((from: string, to: string, promotion?: string): boolean => {
    if (!state.currentGame) return false;

    try {
      const move = gameRef.current.move({ from, to, promotion });
      if (move) {
        // Update game state
        setState(prev => {
          if (!prev.currentGame) return prev;

          const updatedGame = { ...prev.currentGame };
          updatedGame.fen = gameRef.current.fen();
          updatedGame.pgn = gameRef.current.pgn();
          updatedGame.moveHistory = [...updatedGame.moveHistory, {
            san: move.san,
            uci: `${from}${to}`,
            from,
            to,
            piece: move.piece,
            captured: move.captured,
            promotion: move.promotion,
            timestamp: Date.now(),
            fen: gameRef.current.fen(),
          }];

          // Add increment
          const turn = gameRef.current.turn() === 'w' ? 'black' : 'white';
          const newTime = { ...prev.timeRemaining };
          newTime[turn] += prev.currentGame.timeControl.increment;

          return {
            ...prev,
            currentGame: updatedGame,
            timeRemaining: newTime,
          };
        });

        return true;
      }
    } catch (error) {
      console.error('Invalid move:', error);
    }
    return false;
  }, [state.currentGame]);

  // Offer draw
  const offerDraw = useCallback(() => {
    // Simulate draw offer
    toast.info('Draw offer sent');
  }, []);

  // Resign
  const resign = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    setState(prev => ({
      ...prev,
      currentGame: prev.currentGame ? { ...prev.currentGame, status: 'ended' } : null,
    }));
  }, []);

  // Send chat message
  const sendMessage = useCallback((message: string) => {
    if (!state.currentGame) return;

    const chatMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId,
      username,
      message,
      timestamp: new Date(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, chatMessage],
    }));

    // Simulate opponent response
    setTimeout(() => {
      const responses = [
        'Good move!',
        'Nice one!',
        'Interesting...',
        'I see what you did there',
        'Well played!',
        'Good game!',
        'gg',
        'Thanks!',
      ];
      
      const response: ChatMessage = {
        id: `msg-${Date.now()}-opp`,
        userId: 'opponent',
        username: state.opponent?.username || 'Opponent',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, response],
      }));
    }, 2000 + Math.random() * 3000);
  }, [state.currentGame, state.opponent, userId, username]);

  // Disconnect
  const disconnect = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState({
      isConnected: false,
      isSearching: false,
      currentGame: null,
      opponent: null,
      timeRemaining: { white: 0, black: 0 },
      messages: [],
    });
  }, []);

  return {
    ...state,
    game: gameRef.current,
    connect,
    findMatch,
    cancelSearch,
    makeMove,
    offerDraw,
    resign,
    sendMessage,
    disconnect,
  };
}

export default useMultiplayer;
