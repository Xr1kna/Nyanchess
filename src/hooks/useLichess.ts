// ============================================
// LICHESS API INTEGRATION
// Nyanchess - Fork dari Lichess
// ============================================

import { useState, useCallback, useRef } from 'react';
import type { 
  LichessUser, 
  Game, 
  Puzzle, 
  LeaderboardEntry, 
  ArenaTournament,
  Challenge,
  OAuthToken,
  LichessError 
} from '@/types';

const LICHESS_API_BASE = 'https://lichess.org/api';

interface LichessState {
  isLoading: boolean;
  error: string | null;
  token: string | null;
  user: LichessUser | null;
}

// Cache untuk API calls
const apiCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 menit

export function useLichess() {
  const [state, setState] = useState<LichessState>({
    isLoading: false,
    error: null,
    token: localStorage.getItem('lichess-token'),
    user: null,
  });

  const abortController = useRef<AbortController | null>(null);

  // Generic API call dengan caching
  const apiCall = useCallback(async <T>(
    endpoint: string, 
    options: RequestInit = {},
    cacheKey?: string,
    cacheTtl: number = CACHE_TTL
  ): Promise<T | null> => {
    // Check cache
    if (cacheKey) {
      const cached = apiCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < cacheTtl) {
        return cached.data as T;
      }
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      abortController.current?.abort();
      abortController.current = new AbortController();

      const response = await fetch(`${LICHESS_API_BASE}${endpoint}`, {
        ...options,
        headers: {
          'Accept': 'application/json',
          ...(state.token && { 'Authorization': `Bearer ${state.token}` }),
          ...options.headers,
        },
        signal: abortController.current.signal,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' })) as LichessError;
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      const data = await response.json() as T;

      // Cache response
      if (cacheKey) {
        apiCache.set(cacheKey, { data, timestamp: Date.now() });
      }

      setState(prev => ({ ...prev, isLoading: false }));
      return data;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return null;
      }
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }));
      return null;
    }
  }, [state.token]);

  // OAuth Login
  const login = useCallback(async (code: string): Promise<boolean> => {
    try {
      const response = await fetch(`${LICHESS_API_BASE}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: 'nyanchess',
          redirect_uri: `${window.location.origin}/callback`,
          scope: 'challenge:read challenge:write bot:play board:play tournament:write puzzle:read',
        }),
      });

      if (!response.ok) return false;

      const tokenData = await response.json() as OAuthToken;
      localStorage.setItem('lichess-token', tokenData.access_token);
      setState(prev => ({ ...prev, token: tokenData.access_token }));
      
      // Fetch user data
      const user = await apiCall<LichessUser>('/account', {}, 'account', 60000);
      if (user) {
        setState(prev => ({ ...prev, user }));
      }

      return true;
    } catch {
      return false;
    }
  }, [apiCall]);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('lichess-token');
    apiCache.clear();
    setState({
      isLoading: false,
      error: null,
      token: null,
      user: null,
    });
  }, []);

  // Get current user
  const getAccount = useCallback(async (): Promise<LichessUser | null> => {
    return apiCall('/account', {}, 'account', 60000);
  }, [apiCall]);

  // Get user profile
  const getUserProfile = useCallback(async (username: string): Promise<LichessUser | null> => {
    return apiCall(`/user/${username}`, {}, `user-${username}`, 300000);
  }, [apiCall]);

  // Get user games
  const getUserGames = useCallback(async (
    username: string, 
    max: number = 10
  ): Promise<Game[] | null> => {
    const response = await fetch(
      `${LICHESS_API_BASE}/games/user/${username}?max=${max}&pgnInJson=true`,
      {
        headers: {
          'Accept': 'application/x-ndjson',
        },
      }
    );

    if (!response.ok) return null;

    const text = await response.text();
    const games = text
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(line => JSON.parse(line) as Game);

    return games;
  }, []);

  // Get ongoing games
  const getOngoingGames = useCallback(async (): Promise<Game[] | null> => {
    const data = await apiCall<{ nowPlaying: Game[] }>('/account/playing', {}, 'ongoing', 10000);
    return data?.nowPlaying || null;
  }, [apiCall]);

  // Get daily puzzle
  const getDailyPuzzle = useCallback(async (): Promise<Puzzle | null> => {
    return apiCall('/puzzle/daily', {}, 'puzzle-daily', 3600000);
  }, [apiCall]);

  // Get puzzle by ID
  const getPuzzle = useCallback(async (id: string): Promise<Puzzle | null> => {
    return apiCall(`/puzzle/${id}`, {}, `puzzle-${id}`, 3600000);
  }, [apiCall]);

  // Submit puzzle solution
  const submitPuzzleSolution = useCallback(async (
    id: string, 
    solution: string[]
  ): Promise<{ win: boolean; ratingDiff: number } | null> => {
    return apiCall(`/puzzle/${id}/attempt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ solution }),
    });
  }, [apiCall]);

  // Get leaderboard
  const getLeaderboard = useCallback(async (
    perfType: string = 'blitz',
    nb: number = 100
  ): Promise<LeaderboardEntry[] | null> => {
    const data = await apiCall<{ users: LeaderboardEntry[] }>(
      `/player/top/${nb}/${perfType}`,
      {},
      `leaderboard-${perfType}`,
      300000
    );
    return data?.users || null;
  }, [apiCall]);

  // Get tournaments
  const getTournaments = useCallback(async (): Promise<ArenaTournament[] | null> => {
    const data = await apiCall<{ created: ArenaTournament[]; started: ArenaTournament[] }>(
      '/tournament',
      {},
      'tournaments',
      60000
    );
    return data ? [...data.created, ...data.started] : null;
  }, [apiCall]);

  // Create challenge
  const createChallenge = useCallback(async (options: {
    rated?: boolean;
    clock?: { limit: number; increment: number };
    days?: number;
    color?: 'random' | 'white' | 'black';
    variant?: string;
    fen?: string;
  }): Promise<Challenge | null> => {
    return apiCall('/challenge/open', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options),
    });
  }, [apiCall]);

  // Accept challenge
  const acceptChallenge = useCallback(async (challengeId: string): Promise<boolean> => {
    const result = await apiCall<{ ok: boolean }>(`/challenge/${challengeId}/accept`, {
      method: 'POST',
    });
    return result?.ok || false;
  }, [apiCall]);

  // Decline challenge
  const declineChallenge = useCallback(async (
    challengeId: string, 
    reason?: string
  ): Promise<boolean> => {
    const result = await apiCall<{ ok: boolean }>(`/challenge/${challengeId}/decline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    });
    return result?.ok || false;
  }, [apiCall]);

  // Get TV games
  const getTVGames = useCallback(async (): Promise<Game[] | null> => {
    const data = await apiCall<{ games: Game[] }>('/tv/channels', {}, 'tv', 30000);
    return data?.games || null;
  }, [apiCall]);

  // Stream incoming events
  const streamEvents = useCallback((onEvent: (event: unknown) => void) => {
    if (!state.token) return () => {};

    const eventSource = new EventSource(
      `${LICHESS_API_BASE}/stream/event`,
      { withCredentials: true }
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onEvent(data);
      } catch {
        // Ignore parse errors
      }
    };

    return () => eventSource.close();
  }, [state.token]);

  // Stream game state
  const streamGameState = useCallback((
    gameId: string, 
    onState: (state: unknown) => void
  ) => {
    if (!state.token) return () => {};

    const eventSource = new EventSource(
      `${LICHESS_API_BASE}/board/game/stream/${gameId}`,
      { withCredentials: true }
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onState(data);
      } catch {
        // Ignore parse errors
      }
    };

    return () => eventSource.close();
  }, [state.token]);

  // Make move in game
  const makeMove = useCallback(async (
    gameId: string, 
    move: string
  ): Promise<boolean> => {
    const result = await apiCall<{ ok: boolean }>(
      `/board/game/${gameId}/move/${move}`,
      { method: 'POST' }
    );
    return result?.ok || false;
  }, [apiCall]);

  // Abort game
  const abortGame = useCallback(async (gameId: string): Promise<boolean> => {
    const result = await apiCall<{ ok: boolean }>(
      `/board/game/${gameId}/abort`,
      { method: 'POST' }
    );
    return result?.ok || false;
  }, [apiCall]);

  // Resign game
  const resignGame = useCallback(async (gameId: string): Promise<boolean> => {
    const result = await apiCall<{ ok: boolean }>(
      `/board/game/${gameId}/resign`,
      { method: 'POST' }
    );
    return result?.ok || false;
  }, [apiCall]);

  // Handle draw offer
  const handleDrawOffer = useCallback(async (
    gameId: string, 
    accept: boolean
  ): Promise<boolean> => {
    const result = await apiCall<{ ok: boolean }>(
      `/board/game/${gameId}/draw/${accept ? 'yes' : 'no'}`,
      { method: 'POST' }
    );
    return result?.ok || false;
  }, [apiCall]);

  // Handle takeback
  const handleTakeback = useCallback(async (
    gameId: string, 
    accept: boolean
  ): Promise<boolean> => {
    const result = await apiCall<{ ok: boolean }>(
      `/board/game/${gameId}/takeback/${accept ? 'yes' : 'no'}`,
      { method: 'POST' }
    );
    return result?.ok || false;
  }, [apiCall]);

  // Write in chat
  const writeChat = useCallback(async (
    gameId: string, 
    message: string
  ): Promise<boolean> => {
    const result = await apiCall<{ ok: boolean }>(
      `/board/game/${gameId}/chat`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      }
    );
    return result?.ok || false;
  }, [apiCall]);

  // Clear cache
  const clearCache = useCallback(() => {
    apiCache.clear();
  }, []);

  return {
    ...state,
    login,
    logout,
    getAccount,
    getUserProfile,
    getUserGames,
    getOngoingGames,
    getDailyPuzzle,
    getPuzzle,
    submitPuzzleSolution,
    getLeaderboard,
    getTournaments,
    createChallenge,
    acceptChallenge,
    declineChallenge,
    getTVGames,
    streamEvents,
    streamGameState,
    makeMove,
    abortGame,
    resignGame,
    handleDrawOffer,
    handleTakeback,
    writeChat,
    clearCache,
  };
}

export default useLichess;
