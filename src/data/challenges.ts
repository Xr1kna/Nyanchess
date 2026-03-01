// ============================================
// DAILY CHALLENGES & MINIGAMES
// ============================================

import type { DailyChallenge, Minigame, Puzzle } from '@/types';

export const dailyChallenges: DailyChallenge[] = [
  {
    id: 'challenge-1',
    title: 'Win 3 Games',
    description: 'Win 3 games in any time control',
    type: 'win_games',
    target: 3,
    current: 0,
    reward: { points: 100, badge: 'daily_winner' },
    completed: false,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 'challenge-2',
    title: 'Solve 5 Puzzles',
    description: 'Solve 5 puzzles correctly',
    type: 'solve_puzzles',
    target: 5,
    current: 0,
    reward: { points: 75, badge: 'puzzle_solver' },
    completed: false,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 'challenge-3',
    title: 'Play the Sicilian',
    description: 'Play 1.e4 c5 in a rated game',
    type: 'play_opening',
    target: 1,
    current: 0,
    reward: { points: 50, badge: 'sicilian_player' },
    completed: false,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 'challenge-4',
    title: 'Capture 20 Pieces',
    description: 'Capture 20 pieces in any games',
    type: 'capture_pieces',
    target: 20,
    current: 0,
    reward: { points: 60, badge: 'piece_hunter' },
    completed: false,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    id: 'challenge-5',
    title: 'Checkmate!',
    description: 'Deliver checkmate in 2 games',
    type: 'checkmate',
    target: 2,
    current: 0,
    reward: { points: 150, badge: 'checkmate_master' },
    completed: false,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
];

export const minigames: Minigame[] = [
  {
    id: 'puzzle-rush',
    name: 'Puzzle Rush',
    description: 'Solve as many puzzles as you can in 5 minutes!',
    icon: 'Zap',
    rating: 1500,
    highScore: 25,
  },
  {
    id: 'puzzle-battle',
    name: 'Puzzle Battle',
    description: 'Race against opponents to solve puzzles',
    icon: 'Swords',
    rating: 1500,
    highScore: 10,
  },
  {
    id: 'lessons',
    name: 'Lessons',
    description: 'Learn chess with interactive lessons',
    icon: 'BookOpen',
    rating: 1200,
    highScore: 50,
  },
  {
    id: 'vision',
    name: 'Vision Trainer',
    description: 'Improve your board vision',
    icon: 'Eye',
    rating: 1400,
    highScore: 30,
  },
  {
    id: 'coordinates',
    name: 'Coordinates',
    description: 'Master chess board coordinates',
    icon: 'Grid3x3',
    rating: 1000,
    highScore: 40,
  },
  {
    id: 'opening-trainer',
    name: 'Opening Trainer',
    description: 'Practice your favorite openings',
    icon: 'Target',
    rating: 1600,
    highScore: 20,
  },
];

export const puzzles: Puzzle[] = [
  {
    id: 'puzzle-1',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
    solution: ['Qxf7#'],
    themes: ['mate', 'queen', 'scholars-mate'],
    rating: 400,
    title: 'Scholar\'s Mate',
    attempts: 15420,
    successRate: 85,
  },
  {
    id: 'puzzle-2',
    fen: 'r3k2r/ppp2ppp/2n5/3q4/3P4/2P5/PP3PPP/R1BQK2R w KQkq - 0 1',
    solution: ['Qxd5', 'Nxd5', 'Rd8#'],
    themes: ['tactics', 'pin', 'mate'],
    rating: 800,
    title: 'Back Rank Mate',
    attempts: 12300,
    successRate: 72,
  },
  {
    id: 'puzzle-3',
    fen: '2r3k1/pp3ppp/8/3q4/8/8/PPP2QPP/4R1K1 w - - 0 1',
    solution: ['Re8+', 'Rxe8', 'Qf8#'],
    themes: ['sacrifice', 'deflection', 'mate'],
    rating: 1200,
    title: 'Deflection Sacrifice',
    attempts: 8900,
    successRate: 58,
  },
  {
    id: 'puzzle-4',
    fen: 'r4rk1/ppp2ppp/8/3n4/1b1P4/2N5/PPP2PPP/R1BQR1K1 b - - 0 1',
    solution: ['Nxc3', 'bxc3', 'Bxc3', 'Rb1', 'Bxd4+'],
    themes: ['tactics', 'fork', 'pin'],
    rating: 1400,
    title: 'Knight Fork',
    attempts: 6700,
    successRate: 45,
  },
  {
    id: 'puzzle-5',
    fen: '5rk1/ppp3pp/8/3p4/3P4/8/PPP3PP/4R1K1 w - - 0 1',
    solution: ['Re8', 'Rxe8', 'Kf2'],
    themes: ['endgame', 'rook', 'opposition'],
    rating: 1600,
    title: 'Rook Endgame',
    attempts: 4500,
    successRate: 38,
  },
  {
    id: 'puzzle-6',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/1B2p3/1b2P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 1',
    solution: ['Bxc6', 'bxc6', 'Nxe5'],
    themes: ['tactics', 'discovery', 'fork'],
    rating: 1800,
    title: 'Discovered Attack',
    attempts: 3200,
    successRate: 32,
  },
  {
    id: 'puzzle-7',
    fen: '8/8/8/3k4/8/8/4K3/4R3 w - - 0 1',
    solution: ['Re5+', 'Kd4', 'Kd2', 'Kd3', 'Re4'],
    themes: ['endgame', 'rook', 'mate'],
    rating: 2000,
    title: 'Lucena Position',
    attempts: 2100,
    successRate: 28,
  },
  {
    id: 'puzzle-8',
    fen: 'r3r1k1/pp3ppp/2p5/8/3Q4/2P5/P1P2PPP/R3R1K1 w - - 0 1',
    solution: ['Qd8+', 'Rxd8', 'Rxd8#'],
    themes: ['sacrifice', 'mate', 'queen-sacrifice'],
    rating: 2200,
    title: 'Queen Sacrifice Mate',
    attempts: 1500,
    successRate: 22,
  },
];

// Get puzzle by ID
export function getPuzzleById(id: string): Puzzle | undefined {
  return puzzles.find(p => p.id === id);
}

// Get puzzles by rating range
export function getPuzzlesByRating(min: number, max: number): Puzzle[] {
  return puzzles.filter(p => p.rating >= min && p.rating <= max);
}

// Get puzzles by theme
export function getPuzzlesByTheme(theme: string): Puzzle[] {
  return puzzles.filter(p => p.themes.includes(theme));
}

// Get random puzzle
export function getRandomPuzzle(): Puzzle {
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

// Puzzle themes
export const puzzleThemes = [
  'mate',
  'tactics',
  'fork',
  'pin',
  'skewer',
  'discovery',
  'sacrifice',
  'endgame',
  'opening',
  'middlegame',
  'queen',
  'rook',
  'bishop',
  'knight',
  'pawn',
];
