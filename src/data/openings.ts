// ============================================
// CHESS OPENINGS DATABASE
// From Chess.com - Popular openings with stats
// ============================================

import type { Opening, OpeningLine } from '@/types';

export const openings: Opening[] = [
  // Open Games (1.e4 e5)
  {
    eco: 'C20',
    name: 'King\'s Pawn Game',
    moves: '1.e4 e5',
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    category: 'Open Games',
    popularity: 35,
    winRate: { white: 38, draw: 30, black: 32 },
  },
  {
    eco: 'C44',
    name: 'King\'s Knight Opening',
    moves: '1.e4 e5 2.Nf3',
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
    category: 'Open Games',
    popularity: 28,
    winRate: { white: 40, draw: 30, black: 30 },
  },
  {
    eco: 'C60',
    name: 'Ruy Lopez',
    moves: '1.e4 e5 2.Nf3 Nc6 3.Bb5',
    fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    category: 'Open Games',
    popularity: 22,
    winRate: { white: 42, draw: 32, black: 26 },
  },
  {
    eco: 'C50',
    name: 'Italian Game',
    moves: '1.e4 e5 2.Nf3 Nc6 3.Bc4',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    category: 'Open Games',
    popularity: 18,
    winRate: { white: 41, draw: 31, black: 28 },
  },
  {
    eco: 'C55',
    name: 'Two Knights Defense',
    moves: '1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    category: 'Open Games',
    popularity: 12,
    winRate: { white: 39, draw: 30, black: 31 },
  },
  {
    eco: 'C41',
    name: 'Philidor Defense',
    moves: '1.e4 e5 2.Nf3 d6',
    fen: 'rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3',
    category: 'Open Games',
    popularity: 8,
    winRate: { white: 43, draw: 30, black: 27 },
  },
  
  // Sicilian Defense (1.e4 c5)
  {
    eco: 'B20',
    name: 'Sicilian Defense',
    moves: '1.e4 c5',
    fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    category: 'Semi-Open Games',
    popularity: 42,
    winRate: { white: 35, draw: 32, black: 33 },
  },
  {
    eco: 'B90',
    name: 'Sicilian Najdorf',
    moves: '1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6',
    fen: 'rnbqkb1r/1p3ppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    category: 'Semi-Open Games',
    popularity: 25,
    winRate: { white: 34, draw: 35, black: 31 },
  },
  {
    eco: 'B32',
    name: 'Sicilian Lowenthal',
    moves: '1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 e5',
    fen: 'r1bqkbnr/pp1p1ppp/2n5/4p3/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5',
    category: 'Semi-Open Games',
    popularity: 10,
    winRate: { white: 36, draw: 32, black: 32 },
  },
  
  // French Defense (1.e4 e6)
  {
    eco: 'C00',
    name: 'French Defense',
    moves: '1.e4 e6',
    fen: 'rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    category: 'Semi-Open Games',
    popularity: 15,
    winRate: { white: 40, draw: 32, black: 28 },
  },
  {
    eco: 'C11',
    name: 'French Defense Steinitz',
    moves: '1.e4 e6 2.d4 d5 3.Nc3 Nf6',
    fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4',
    category: 'Semi-Open Games',
    popularity: 8,
    winRate: { white: 41, draw: 32, black: 27 },
  },
  
  // Caro-Kann (1.e4 c6)
  {
    eco: 'B10',
    name: 'Caro-Kann Defense',
    moves: '1.e4 c6',
    fen: 'rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    category: 'Semi-Open Games',
    popularity: 12,
    winRate: { white: 38, draw: 35, black: 27 },
  },
  {
    eco: 'B12',
    name: 'Caro-Kann Advance',
    moves: '1.e4 c6 2.d4 d5 3.e5',
    fen: 'rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',
    category: 'Semi-Open Games',
    popularity: 6,
    winRate: { white: 39, draw: 34, black: 27 },
  },
  
  // Pirc/Modern (1.e4 d6/g6)
  {
    eco: 'B07',
    name: 'Pirc Defense',
    moves: '1.e4 d6 2.d4 Nf6',
    fen: 'rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 1 3',
    category: 'Semi-Open Games',
    popularity: 7,
    winRate: { white: 42, draw: 30, black: 28 },
  },
  
  // Scandinavian (1.e4 d5)
  {
    eco: 'B01',
    name: 'Scandinavian Defense',
    moves: '1.e4 d5',
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
    category: 'Semi-Open Games',
    popularity: 9,
    winRate: { white: 44, draw: 28, black: 28 },
  },
  
  // Alekhine (1.e4 Nf6)
  {
    eco: 'B02',
    name: 'Alekhine Defense',
    moves: '1.e4 Nf6',
    fen: 'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2',
    category: 'Semi-Open Games',
    popularity: 3,
    winRate: { white: 45, draw: 28, black: 27 },
  },
  
  // Closed Games (1.d4)
  {
    eco: 'D00',
    name: 'Queen\'s Pawn Game',
    moves: '1.d4',
    fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1',
    category: 'Closed Games',
    popularity: 38,
    winRate: { white: 40, draw: 32, black: 28 },
  },
  {
    eco: 'D06',
    name: 'Queen\'s Gambit',
    moves: '1.d4 d5 2.c4',
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2',
    category: 'Closed Games',
    popularity: 30,
    winRate: { white: 41, draw: 33, black: 26 },
  },
  {
    eco: 'D37',
    name: 'Queen\'s Gambit Declined',
    moves: '1.d4 d5 2.c4 e6',
    fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
    category: 'Closed Games',
    popularity: 20,
    winRate: { white: 42, draw: 34, black: 24 },
  },
  {
    eco: 'D85',
    name: 'Grünfeld Defense',
    moves: '1.d4 Nf6 2.c4 g6 3.Nc3 d5',
    fen: 'rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4',
    category: 'Closed Games',
    popularity: 12,
    winRate: { white: 38, draw: 36, black: 26 },
  },
  {
    eco: 'E00',
    name: 'Catalan Opening',
    moves: '1.d4 Nf6 2.c4 e6 3.g3',
    fen: 'rnbqkb1r/pppp1ppp/4pn2/8/2PP4/6P1/PP2PP1P/RNBQKBNR b KQkq - 0 3',
    category: 'Closed Games',
    popularity: 10,
    winRate: { white: 41, draw: 35, black: 24 },
  },
  
  // Indian Defenses
  {
    eco: 'E20',
    name: 'Nimzo-Indian Defense',
    moves: '1.d4 Nf6 2.c4 e6 3.Nc3 Bb4',
    fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 4 4',
    category: 'Indian Defenses',
    popularity: 14,
    winRate: { white: 38, draw: 37, black: 25 },
  },
  {
    eco: 'E60',
    name: 'King\'s Indian Defense',
    moves: '1.d4 Nf6 2.c4 g6',
    fen: 'rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 1 3',
    category: 'Indian Defenses',
    popularity: 16,
    winRate: { white: 40, draw: 33, black: 27 },
  },
  {
    eco: 'E10',
    name: 'Queen\'s Indian Defense',
    moves: '1.d4 Nf6 2.c4 e6 3.Nf3 b6',
    fen: 'rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4',
    category: 'Indian Defenses',
    popularity: 8,
    winRate: { white: 41, draw: 35, black: 24 },
  },
  {
    eco: 'E91',
    name: 'Benoni Defense',
    moves: '1.d4 Nf6 2.c4 c5',
    fen: 'rnbqkb1r/pp1ppppp/5n2/2p5/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',
    category: 'Indian Defenses',
    popularity: 5,
    winRate: { white: 43, draw: 30, black: 27 },
  },
  
  // English Opening (1.c4)
  {
    eco: 'A10',
    name: 'English Opening',
    moves: '1.c4',
    fen: 'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1',
    category: 'Flank Openings',
    popularity: 12,
    winRate: { white: 41, draw: 33, black: 26 },
  },
  {
    eco: 'A22',
    name: 'English Opening Carls-Bremen',
    moves: '1.c4 e5 2.Nc3 Nf6 3.Nf3',
    fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/2P5/2N2N2/PP1PPPPP/R1BQKB1R b KQkq - 3 3',
    category: 'Flank Openings',
    popularity: 5,
    winRate: { white: 42, draw: 33, black: 25 },
  },
  
  // Reti Opening (1.Nf3)
  {
    eco: 'A04',
    name: 'Reti Opening',
    moves: '1.Nf3',
    fen: 'rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1',
    category: 'Flank Openings',
    popularity: 10,
    winRate: { white: 41, draw: 33, black: 26 },
  },
  {
    eco: 'A09',
    name: 'Reti Opening Advance',
    moves: '1.Nf3 d5 2.c4',
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/2P5/5N2/PP1PPPPP/RNBQKB1R b KQkq - 0 2',
    category: 'Flank Openings',
    popularity: 6,
    winRate: { white: 42, draw: 33, black: 25 },
  },
  
  // Bird's Opening (1.f4)
  {
    eco: 'A02',
    name: 'Bird\'s Opening',
    moves: '1.f4',
    fen: 'rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq - 0 1',
    category: 'Flank Openings',
    popularity: 2,
    winRate: { white: 40, draw: 31, black: 29 },
  },
  
  // King's Indian Attack
  {
    eco: 'A08',
    name: 'King\'s Indian Attack',
    moves: '1.Nf3 d5 2.g3',
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/8/5NP1/PPPPPP1P/RNBQKB1R b KQkq - 0 2',
    category: 'Flank Openings',
    popularity: 4,
    winRate: { white: 42, draw: 33, black: 25 },
  },
];

// Get opening by ECO code
export function getOpeningByECO(eco: string): Opening | undefined {
  return openings.find(o => o.eco === eco);
}

// Get openings by category
export function getOpeningsByCategory(category: string): Opening[] {
  return openings.filter(o => o.category === category);
}

// Search openings
export function searchOpenings(query: string): Opening[] {
  const lowerQuery = query.toLowerCase();
  return openings.filter(o => 
    o.name.toLowerCase().includes(lowerQuery) ||
    o.eco.toLowerCase().includes(lowerQuery) ||
    o.moves.toLowerCase().includes(lowerQuery)
  );
}

// Categories
export const openingCategories = [
  'Open Games',
  'Semi-Open Games',
  'Closed Games',
  'Indian Defenses',
  'Flank Openings',
];

// Get popular openings
export function getPopularOpenings(limit: number = 10): Opening[] {
  return [...openings]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}
