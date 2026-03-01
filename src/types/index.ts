// ============================================
// NYANCHESS - TYPES
// Fork dari Lichess dengan tema Kucing
// ============================================

// User Types
export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  rating: {
    bullet: number;
    blitz: number;
    rapid: number;
    classical: number;
    correspondence: number;
    puzzle: number;
    storm: number;
  };
  stats: {
    wins: number;
    losses: number;
    draws: number;
    totalGames: number;
    winRate: number;
    streak?: {
      current: number;
      best: number;
    };
  };
  profile?: {
    country?: string;
    location?: string;
    bio?: string;
    realName?: string;
  };
  isGuest: boolean;
  createdAt: Date;
  isOnline: boolean;
  playing?: boolean;
  streaming?: boolean;
  patron?: boolean;
}

export interface LichessUser {
  id: string;
  username: string;
  perfs: {
    bullet?: { rating: number; prog: number; games: number };
    blitz?: { rating: number; prog: number; games: number };
    rapid?: { rating: number; prog: number; games: number };
    classical?: { rating: number; prog: number; games: number };
    correspondence?: { rating: number; prog: number; games: number };
    puzzle?: { rating: number; prog: number; games: number };
    storm?: { rating: number; runs: number };
  };
  createdAt: number;
  seenAt: number;
  playTime: {
    total: number;
    tv: number;
  };
  url: string;
  count: {
    all: number;
    rated: number;
    ai: number;
    draw: number;
    drawH: number;
    loss: number;
    lossH: number;
    win: number;
    winH: number;
    bookmark: number;
    playing: number;
    import: number;
    me: number;
  };
  followable?: boolean;
  following?: boolean;
  blocking?: boolean;
  followsYou?: boolean;
}

// Game Types
export type GameMode = 'bullet' | 'blitz' | 'rapid' | 'classical' | 'correspondence';
export type GameStatus = 'created' | 'started' | 'aborted' | 'mate' | 'resign' | 'stalemate' | 'timeout' | 'draw' | 'outoftime' | 'cheat' | 'noStart' | 'unknownFinish' | 'variantEnd';
export type GameResult = 'win' | 'loss' | 'draw';

export interface Game {
  id: string;
  fullId?: string;
  white: Player;
  black: Player;
  mode: GameMode;
  speed: GameMode;
  status: GameStatus;
  result?: GameResult;
  fen: string;
  pgn: string;
  moves: string[];
  clock?: {
    initial: number;
    increment: number;
    totalTime: number;
  };
  rated: boolean;
  variant: string;
  createdAt: Date;
  lastMoveAt?: Date;
  winner?: 'white' | 'black';
}

export interface Player {
  id?: string;
  user?: {
    id: string;
    name: string;
    title?: string;
    rating?: number;
  };
  rating?: number;
  ratingDiff?: number;
  color: 'white' | 'black';
  time?: number;
  seconds?: number;
  offeringDraw?: boolean;
  proposingTakeback?: boolean;
}

// Bot Types
export interface BotLevel {
  rating: number;
  name: string;
  depth: number;
  randomness: number;
  description: string;
}

export interface Bot {
  id: string;
  name: string;
  rating: number;
  avatar: string;
  description: string;
  level: number;
  personality?: string;
}

// Puzzle Types
export interface Puzzle {
  id: string;
  fen: string;
  solution: string[];
  themes: string[];
  rating: number;
  popularity?: number;
  nbPlays?: number;
  title?: string;
  attempts?: number;
  successRate?: number;
}

export interface PuzzleRound {
  win: boolean;
  puzzle: Puzzle;
  ratingDiff: number;
}

// Minigame Types
export interface StormRecord {
  runs: number;
  score: number;
}

export interface Minigame {
  id: string;
  name: string;
  description: string;
  icon: string;
  rating: number;
  highScore: number;
}

// Challenge Types
export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  type: 'win_games' | 'solve_puzzles' | 'play_opening' | 'capture_pieces' | 'checkmate';
  target: number;
  current: number;
  reward: {
    points: number;
    badge?: string;
  };
  completed: boolean;
  expiresAt: Date;
}

export interface ArenaTournament {
  id: string;
  name: string;
  status: 'created' | 'started' | 'finished';
  startsAt: Date;
  nbPlayers: number;
  minutes: number;
  schedule?: {
    freq: string;
    speed: GameMode;
  };
}

export interface Challenge {
  id: string;
  challenger: {
    id: string;
    name: string;
    rating: number;
    title?: string;
  };
  destUser?: {
    id: string;
    name: string;
    rating: number;
    title?: string;
  };
  variant: {
    key: string;
    short: string;
    name: string;
  };
  rated: boolean;
  speed: GameMode;
  timeControl: {
    type: 'clock' | 'correspondence' | 'unlimited';
    limit?: number;
    increment?: number;
    daysPerTurn?: number;
  };
  color: 'random' | 'white' | 'black';
  perf: {
    icon: string;
    name: string;
  };
  direction?: 'in' | 'out';
}

// Leaderboard Types
export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    name: string;
    title?: string;
    patron?: boolean;
    avatar?: string;
    username?: string;
    country?: string;
    flag?: string;
  };
  rating: number;
  progress?: number;
  stats?: {
    wins: number;
    losses: number;
    draws: number;
  };
  trend?: 'up' | 'down' | 'stable';
}

export interface Crosstable {
  users: {
    [username: string]: number;
  };
  nbGames: number;
}

// Opening Types
export interface Opening {
  eco: string;
  name: string;
  moves: string;
  fen: string;
  category: string;
  popularity?: number;
  winRate?: {
    white?: number;
    draw?: number;
    black?: number;
  };
}

export interface OpeningLine {
  moves: string[];
  name: string;
  result: 'win' | 'loss' | 'draw';
  popularity: number;
}

// Theme Types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface BoardTheme {
  id: string;
  name: string;
  lightSquare: string;
  darkSquare: string;
  highlight: string;
}

export interface PieceTheme {
  id: string;
  name: string;
  set: string;
}

// Game Review Types
export interface GameReview {
  gameId: string;
  accuracy: {
    white: number;
    black: number;
  };
  mistakes: ReviewMove[];
  blunders: ReviewMove[];
  missedWins: ReviewMove[];
  brilliantMoves: ReviewMove[];
  openings: {
    white: string;
    black: string;
    eco: string;
  };
  keyMoments: KeyMoment[];
}

export interface ReviewMove {
  moveNumber: number;
  san: string;
  evaluation: number;
  classification: MoveClassification;
  bestMove: string;
  bestEvaluation: number;
}

export type MoveClassification = 
  | 'brilliant' 
  | 'great' 
  | 'best' 
  | 'excellent' 
  | 'good' 
  | 'inaccuracy' 
  | 'mistake' 
  | 'blunder';

export interface KeyMoment {
  moveNumber: number;
  description: string;
  fen: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
}

// Notification Types
export interface Notification {
  id: string;
  type: 'challenge' | 'gameStart' | 'gameFinish' | 'message' | 'tournament';
  content: string;
  read: boolean;
  createdAt: Date;
  data?: any;
}

// Stream Types
export interface Streamer {
  id: string;
  name: string;
  title?: string;
  online: boolean;
  streaming: boolean;
  stream?: {
    service: string;
    status: string;
  };
}

// Team Types
export interface Team {
  id: string;
  name: string;
  description: string;
  nbMembers: number;
  open: boolean;
  leader: {
    id: string;
    name: string;
  };
}

// Study Types
export interface Study {
  id: string;
  name: string;
  owner: {
    id: string;
    name: string;
  };
  chapters: number;
  members: number;
  likes: number;
}

// Analysis Types
export interface Analysis {
  id: string;
  fen: string;
  pgn: string;
  analysis: {
    move: string;
    eval?: number;
    mate?: number;
    best?: string;
    variation?: string;
    judgment?: {
      name: 'Inaccuracy' | 'Mistake' | 'Blunder';
      comment: string;
    };
  }[];
}

// TV Types
export interface TVGame {
  id: string;
  color: 'white' | 'black';
  variant: string;
  speed: GameMode;
  perf: string;
  rated: boolean;
  hasMoved: boolean;
  opponent: {
    id: string;
    name: string;
    rating: number;
    title?: string;
  };
}

// Forum Types
export interface ForumTopic {
  id: string;
  slug: string;
  name: string;
  category: string;
  posts: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  image?: string;
}

// Simul Types
export interface Simul {
  id: string;
  name: string;
  host: {
    id: string;
    name: string;
    rating: number;
  };
  variants: string[];
  applicants: number;
  pairings: number;
  status: 'created' | 'started' | 'finished';
}

// Swis Types
export interface SwissTournament {
  id: string;
  name: string;
  status: 'created' | 'started' | 'finished';
  startsAt: Date;
  nbPlayers: number;
  nbRounds: number;
  round: number;
}

// Rating History
export interface RatingHistory {
  name: string;
  points: [number, number, number, number][];
}

// Activity Types
export interface Activity {
  interval: {
    start: number;
    end: number;
  };
  games: {
    win: number;
    loss: number;
    draw: number;
    rp: {
      before: number;
      after: number;
    };
  };
  puzzles: {
    win: number;
    loss: number;
    rp: {
      before: number;
      after: number;
    };
  };
}

// Export Game Types
export interface GameExport {
  id: string;
  rated: boolean;
  variant: string;
  speed: GameMode;
  perf: string;
  createdAt: number;
  lastMoveAt: number;
  status: GameStatus;
  players: {
    white: Player;
    black: Player;
  };
  winner?: 'white' | 'black';
  moves?: string;
  pgn?: string;
  clock?: {
    initial: number;
    increment: number;
    totalTime: number;
  };
}

// OAuth Types
export interface OAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Error Types
export interface LichessError {
  error: string;
}

// Success Response
export interface SuccessResponse {
  ok: boolean;
}
