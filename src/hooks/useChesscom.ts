import { useState, useCallback, useRef } from 'react';

// Chess.com API types
export interface ChesscomPlayer {
  username: string;
  rating: number;
  result?: string;
  avatar?: string;
}

export interface ChesscomGame {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  fen: string;
  time_class: string;
  rules: string;
  white: ChesscomPlayer;
  black: ChesscomPlayer;
}

export interface ChesscomPuzzle {
  title: string;
  url: string;
  publish_time: number;
  fen: string;
  pgn: string;
  image: string;
}

interface LeaderboardData {
  live_blitz?: Array<{
    username: string;
    score: number;
    rank: number;
  }>;
}

interface PlayerProfile {
  username: string;
  avatar?: string;
}

// Hook untuk fetch data dari Chess.com API
export const useChesscomAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cache = useRef<Record<string, { data: unknown; timestamp: number }>>({});

  // Fetch dengan caching
  const fetchWithCache = useCallback(async <T>(url: string, cacheKey: string, ttlMinutes = 5): Promise<T | null> => {
    // Check cache
    const cached = cache.current[cacheKey];
    if (cached && Date.now() - cached.timestamp < ttlMinutes * 60 * 1000) {
      return cached.data as T;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json() as T;
      
      // Store in cache
      cache.current[cacheKey] = {
        data,
        timestamp: Date.now(),
      };
      
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get player profile
  const getPlayerProfile = useCallback(async (username: string): Promise<PlayerProfile | null> => {
    return fetchWithCache(
      `https://api.chess.com/pub/player/${username.toLowerCase()}`,
      `player_${username}`,
      10
    );
  }, [fetchWithCache]);

  // Get daily puzzle
  const getDailyPuzzle = useCallback(async (): Promise<ChesscomPuzzle | null> => {
    return fetchWithCache('https://api.chess.com/pub/puzzle', 'daily_puzzle', 60);
  }, [fetchWithCache]);

  // Get random puzzle
  const getRandomPuzzle = useCallback(async (): Promise<ChesscomPuzzle | null> => {
    return fetchWithCache('https://api.chess.com/pub/puzzle/random', 'random_puzzle', 0);
  }, [fetchWithCache]);

  // Get leaderboard
  const getLeaderboard = useCallback(async (): Promise<LeaderboardData | null> => {
    return fetchWithCache('https://api.chess.com/pub/leaderboards', 'leaderboard', 10);
  }, [fetchWithCache]);

  // Clear cache
  const clearCache = useCallback(() => {
    cache.current = {};
  }, []);

  return {
    loading,
    error,
    getPlayerProfile,
    getDailyPuzzle,
    getRandomPuzzle,
    getLeaderboard,
    clearCache,
  };
};

export default useChesscomAPI;
