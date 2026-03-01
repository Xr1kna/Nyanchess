// ============================================
// BOT DATABASE - 200 to 3000 ELO
// Complete bot collection with personalities
// ============================================

import type { Bot, BotLevel } from '@/types';

export const botLevels: BotLevel[] = [
  {
    rating: 200,
    name: 'Beginner Bot',
    depth: 1,
    randomness: 0.9,
    description: 'Just learning the rules. Makes many mistakes.',
  },
  {
    rating: 400,
    name: 'Novice Bot',
    depth: 1,
    randomness: 0.8,
    description: 'Knows basic moves but struggles with strategy.',
  },
  {
    rating: 600,
    name: 'Casual Bot',
    depth: 2,
    randomness: 0.7,
    description: 'Plays for fun. Occasionally makes good moves.',
  },
  {
    rating: 800,
    name: 'Intermediate Bot',
    depth: 2,
    randomness: 0.6,
    description: 'Understands basic tactics and openings.',
  },
  {
    rating: 1000,
    name: 'Club Player Bot',
    depth: 3,
    randomness: 0.5,
    description: 'Regular club player. Solid fundamentals.',
  },
  {
    rating: 1200,
    name: 'Advanced Bot',
    depth: 3,
    randomness: 0.4,
    description: 'Strong club player. Good tactical awareness.',
  },
  {
    rating: 1400,
    name: 'Expert Bot',
    depth: 4,
    randomness: 0.3,
    description: 'Experienced player. Rarely makes blunders.',
  },
  {
    rating: 1600,
    name: 'Candidate Master Bot',
    depth: 4,
    randomness: 0.25,
    description: 'Strong tournament player. Good endgame technique.',
  },
  {
    rating: 1800,
    name: 'Master Bot',
    depth: 5,
    randomness: 0.2,
    description: 'National master strength. Deep calculation.',
  },
  {
    rating: 2000,
    name: 'FIDE Master Bot',
    depth: 5,
    randomness: 0.15,
    description: 'International titled player. Very strong.',
  },
  {
    rating: 2200,
    name: 'International Master Bot',
    depth: 6,
    randomness: 0.1,
    description: 'Elite player. Exceptional positional understanding.',
  },
  {
    rating: 2400,
    name: 'Grandmaster Bot',
    depth: 6,
    randomness: 0.08,
    description: 'World-class player. Near-perfect play.',
  },
  {
    rating: 2600,
    name: 'Super Grandmaster Bot',
    depth: 7,
    randomness: 0.05,
    description: 'Elite grandmaster. Among the best in the world.',
  },
  {
    rating: 2800,
    name: 'World Champion Bot',
    depth: 8,
    randomness: 0.03,
    description: 'World champion caliber. Extremely difficult to beat.',
  },
  {
    rating: 3000,
    name: 'Perfect Bot',
    depth: 10,
    randomness: 0.01,
    description: 'Maximum strength. The ultimate challenge.',
  },
];

export const bots: Bot[] = [
  {
    id: 'bot-beginner',
    name: 'Bobby the Beginner',
    rating: 250,
    avatar: '/avatars/bots/beginner.png',
    personality: 'beginner',
    description: 'Hi! I\'m just learning chess. Want to practice with me?',
  },
  {
    id: 'bot-casual',
    name: 'Cathy the Casual',
    rating: 600,
    avatar: '/avatars/bots/casual.png',
    personality: 'casual',
    description: 'I play for fun! Let\'s have a good game.',
  },
  {
    id: 'bot-intermediate',
    name: 'Ian the Intermediate',
    rating: 1000,
    avatar: '/avatars/bots/intermediate.png',
    personality: 'intermediate',
    description: 'I know some tactics. This should be interesting!',
  },
  {
    id: 'bot-advanced',
    name: 'Alex the Advanced',
    rating: 1400,
    avatar: '/avatars/bots/advanced.png',
    personality: 'advanced',
    description: 'I play regularly at the club. Ready for a challenge?',
  },
  {
    id: 'bot-expert',
    name: 'Emma the Expert',
    rating: 1800,
    avatar: '/avatars/bots/expert.png',
    personality: 'expert',
    description: 'I rarely make mistakes. You\'ll need to play well!',
  },
  {
    id: 'bot-master',
    name: 'Master Mike',
    rating: 2200,
    avatar: '/avatars/bots/master.png',
    personality: 'master',
    description: 'International Master strength. Good luck!',
  },
  {
    id: 'bot-grandmaster',
    name: 'GM Garry',
    rating: 2600,
    avatar: '/avatars/bots/gm.png',
    personality: 'grandmaster',
    description: 'Grandmaster level. Are you prepared?',
  },
  {
    id: 'bot-super-gm',
    name: 'Super GM Magnus',
    rating: 2850,
    avatar: '/avatars/bots/supergm.png',
    personality: 'super-grandmaster',
    description: 'The highest rated bot. Almost impossible to beat.',
  },
  {
    id: 'bot-perfect',
    name: 'Stockfish AI',
    rating: 3000,
    avatar: '/avatars/bots/perfect.png',
    personality: 'super-grandmaster',
    description: 'Maximum strength. The ultimate chess challenge.',
  },
];

// Bot opening preferences
export const botOpenings: Record<string, string[]> = {
  beginner: ['e4', 'd4', 'Nf3'],
  casual: ['e4', 'd4', 'c4', 'Nf3'],
  intermediate: ['e4', 'd4', 'c4', 'Nf3', 'g3'],
  advanced: ['e4', 'd4', 'c4', 'Nf3', 'g3', 'b3'],
  expert: ['e4', 'd4', 'c4', 'Nf3', 'g3', 'b3', 'f4'],
  master: ['e4', 'd4', 'c4', 'Nf3'],
  grandmaster: ['e4', 'd4', 'Nf3', 'c4'],
  'super-grandmaster': ['e4', 'd4', 'Nf3', 'c4'],
};

// Get bot by rating
export function getBotByRating(rating: number): Bot {
  const closest = bots.reduce((prev, curr) => {
    return Math.abs(curr.rating - rating) < Math.abs(prev.rating - rating) ? curr : prev;
  });
  return closest;
}

// Get bot level config
export function getBotLevel(rating: number): BotLevel {
  const closest = botLevels.reduce((prev, curr) => {
    return Math.abs(curr.rating - rating) < Math.abs(prev.rating - rating) ? curr : prev;
  });
  return closest;
}
