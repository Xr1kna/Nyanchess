// ============================================
// AUTHENTICATION SYSTEM
// Email & Guest Login
// ============================================

import { useState, useCallback, useEffect } from 'react';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Generate random guest username
function generateGuestUsername(): string {
  const adjectives = ['Happy', 'Clever', 'Swift', 'Mighty', 'Bright', 'Cool', 'Smart', 'Quick'];
  const nouns = ['Pawn', 'Knight', 'Bishop', 'Rook', 'Queen', 'King', 'Player', 'Master'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 9999);
  return `${adj}${noun}${num}`;
}

// Generate avatar URL
function generateAvatar(username: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('chess-user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setState({
          user,
          isLoading: false,
          isAuthenticated: !user.isGuest,
        });
      } catch {
        localStorage.removeItem('chess-user');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Login with email
  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const username = email.split('@')[0];
      const user: User = {
        id: `user-${Date.now()}`,
        username,
        email,
        avatar: generateAvatar(username),
        rating: {
          bullet: 1200,
          blitz: 1250,
          rapid: 1300,
          classical: 1350,
          correspondence: 1400,
          puzzle: 1400,
          storm: 0,
        },
        stats: {
          wins: 45,
          losses: 32,
          draws: 8,
          totalGames: 85,
          winRate: 53,
          streak: { current: 3, best: 10 },
        },
        isGuest: false,
        createdAt: new Date(),
        isOnline: true,
      };

      localStorage.setItem('chess-user', JSON.stringify(user));
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });

      return true;
    } catch {
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  }, []);

  // Register new account
  const register = useCallback(async (
    email: string, 
    _password: string, 
    username: string
  ): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user: User = {
        id: `user-${Date.now()}`,
        username,
        email,
        avatar: generateAvatar(username),
        rating: {
          bullet: 1200,
          blitz: 1200,
          rapid: 1200,
          classical: 1200,
          correspondence: 1200,
          puzzle: 1200,
          storm: 0,
        },
        stats: {
          wins: 0,
          losses: 0,
          draws: 0,
          totalGames: 0,
          winRate: 0,
          streak: { current: 0, best: 0 },
        },
        isGuest: false,
        createdAt: new Date(),
        isOnline: true,
      };

      localStorage.setItem('chess-user', JSON.stringify(user));
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });

      return true;
    } catch {
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  }, []);

  // Play as guest
  const playAsGuest = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true }));

    const username = generateGuestUsername();
    const guestUser: User = {
      id: `guest-${Date.now()}`,
      username,
      isGuest: true,
      rating: {
        bullet: 1200,
        blitz: 1200,
        rapid: 1200,
        classical: 1200,
        correspondence: 1200,
        puzzle: 1200,
        storm: 0,
      },
      stats: {
        wins: 0,
        losses: 0,
        draws: 0,
        totalGames: 0,
        winRate: 0,
      },
      createdAt: new Date(),
      isOnline: true,
    };

    localStorage.setItem('chess-user', JSON.stringify(guestUser));
    setState({
      user: guestUser,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  // Logout
  const logout = useCallback((): void => {
    localStorage.removeItem('chess-user');
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  }, []);

  // Update user profile
  const updateProfile = useCallback((updates: Partial<User>): void => {
    setState(prev => {
      if (!prev.user || prev.user.isGuest) return prev;

      const updatedUser = { ...prev.user, ...updates };
      localStorage.setItem('chess-user', JSON.stringify(updatedUser));

      return {
        ...prev,
        user: updatedUser,
      };
    });
  }, []);

  // Convert guest to registered user
  const convertGuest = useCallback(async (email: string, _password: string): Promise<boolean> => {
    if (!state.user || !state.user.isGuest) return false;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user: User = {
        ...state.user,
        email,
        isGuest: false,
      };

      localStorage.setItem('chess-user', JSON.stringify(user));
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });

      return true;
    } catch {
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  }, [state.user]);

  return {
    ...state,
    login,
    register,
    playAsGuest,
    logout,
    updateProfile,
    convertGuest,
  };
}

export default useAuth;
