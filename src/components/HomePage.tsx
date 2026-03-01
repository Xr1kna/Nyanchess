// ============================================
// HOMEPAGE - Chess.com Style
// Main dashboard with all game modes
// ============================================

import { useState } from 'react';
import { 
  Play, 
  Puzzle, 
  Users, 
  Bot, 
  Trophy, 
  Target,
  Zap,
  BookOpen,
  TrendingUp,
  Clock,
  Flame,
  Crown,
  ChevronRight,
  Star,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import type { GameMode, User } from '@/types';

interface HomePageProps {
  user: User | null;
  onPlayBot: (rating: number) => void;
  onPlayOnline: (mode: GameMode) => void;
  onPlayPuzzle: () => void;
  onViewLeaderboard: () => void;
  onViewOpenings: () => void;
}

const TIME_CONTROLS = [
  { label: 'Bullet', time: '1+0', mode: 'bullet' as GameMode, icon: Zap, color: 'text-yellow-400' },
  { label: 'Blitz', time: '3+2', mode: 'blitz' as GameMode, icon: Flame, color: 'text-orange-400' },
  { label: 'Rapid', time: '10+0', mode: 'rapid' as GameMode, icon: Clock, color: 'text-green-400' },
  { label: 'Daily', time: '1 day', mode: 'daily' as GameMode, icon: Target, color: 'text-blue-400' },
];

const BOT_LEVELS = [
  { rating: 400, name: 'Beginner', color: 'bg-green-500' },
  { rating: 800, name: 'Intermediate', color: 'bg-blue-500' },
  { rating: 1200, name: 'Advanced', color: 'bg-purple-500' },
  { rating: 1600, name: 'Expert', color: 'bg-orange-500' },
  { rating: 2000, name: 'Master', color: 'bg-red-500' },
  { rating: 2500, name: 'Grandmaster', color: 'bg-yellow-500' },
];

const MINIGAMES = [
  { id: 'puzzle-rush', name: 'Puzzle Rush', desc: 'Solve puzzles against the clock', icon: Zap },
  { id: 'puzzle-battle', name: 'Puzzle Battle', desc: 'Race to solve puzzles', icon: Trophy },
  { id: 'lessons', name: 'Lessons', desc: 'Learn chess interactively', icon: BookOpen },
  { id: 'vision', name: 'Vision', desc: 'Train your board vision', icon: Target },
];

export function HomePage({ 
  user, 
  onPlayBot, 
  onPlayOnline, 
  onPlayPuzzle,
  onViewLeaderboard,
  onViewOpenings 
}: HomePageProps) {
  const [selectedBot, setSelectedBot] = useState(1200);

  return (
    <div className="min-h-screen anime-gradient p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Welcome Section */}
        <section className="text-center py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {user ? `Welcome back, ${user.username}!` : 'Welcome to Anime Chess Arena'}
          </h1>
          <p className="text-gray-400 text-lg">
            Play chess online with players from around the world
          </p>
          {user && (
            <div className="flex justify-center gap-4 mt-4">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                <Trophy className="w-4 h-4 mr-1" />
                Rating: {user.rating.blitz}
              </Badge>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/50">
                <TrendingUp className="w-4 h-4 mr-1" />
                Win Rate: {user.stats?.winRate}%
              </Badge>
            </div>
          )}
        </section>

        {/* Main Play Buttons */}
        <section className="grid md:grid-cols-2 gap-4">
          {/* Play Online */}
          <Card className="glass border-white/10 card-hover">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-400" />
                Play Online
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Challenge players from around the world in real-time matches
              </p>
              <div className="grid grid-cols-2 gap-2">
                {TIME_CONTROLS.map((control) => (
                  <Button
                    key={control.mode}
                    variant="outline"
                    className="border-white/20 text-gray-300 hover:bg-white/10 justify-start"
                    onClick={() => onPlayOnline(control.mode)}
                  >
                    <control.icon className={`w-4 h-4 mr-2 ${control.color}`} />
                    <div className="text-left">
                      <div className="text-sm font-medium">{control.label}</div>
                      <div className="text-xs text-gray-500">{control.time}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Play Computer */}
          <Card className="glass border-white/10 card-hover">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                Play Computer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Practice against bots with ratings from 200 to 3000
              </p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Bot Strength</span>
                  <span className="text-white font-medium">{selectedBot} ELO</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={BOT_LEVELS.length - 1}
                  value={BOT_LEVELS.findIndex(b => b.rating === selectedBot)}
                  onChange={(e) => setSelectedBot(BOT_LEVELS[parseInt(e.target.value)].rating)}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  {BOT_LEVELS.map((level) => (
                    <div 
                      key={level.rating}
                      className={`w-2 h-2 rounded-full ${level.color} ${
                        selectedBot === level.rating ? 'ring-2 ring-white' : 'opacity-50'
                      }`}
                    />
                  ))}
                </div>
                <Button 
                  className="w-full btn-anime text-white"
                  onClick={() => onPlayBot(selectedBot)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play vs {BOT_LEVELS.find(b => b.rating === selectedBot)?.name}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Puzzles & Minigames */}
        <section className="grid md:grid-cols-3 gap-4">
          {/* Daily Puzzle */}
          <Card className="glass border-white/10 card-hover md:col-span-1">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Puzzle className="w-5 h-5 text-pink-400" />
                Daily Puzzle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-black/30 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Puzzle className="w-16 h-16 text-pink-400/50 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Solve today's challenge</p>
                </div>
              </div>
              <Button 
                className="w-full btn-anime text-white"
                onClick={onPlayPuzzle}
              >
                Solve Puzzle
              </Button>
            </CardContent>
          </Card>

          {/* Minigames */}
          <Card className="glass border-white/10 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Minigames
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {MINIGAMES.map((game) => (
                  <Button
                    key={game.id}
                    variant="outline"
                    className="border-white/20 text-gray-300 hover:bg-white/10 h-auto py-4 justify-start"
                    onClick={() => toast.info(`${game.name} coming soon!`)}
                  >
                    <game.icon className="w-8 h-8 mr-3 text-purple-400" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">{game.name}</div>
                      <div className="text-xs text-gray-500">{game.desc}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats & Leaderboard */}
        <section className="grid md:grid-cols-2 gap-4">
          {/* User Stats */}
          {user && (
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold text-green-400">{user.stats?.wins}</p>
                    <p className="text-xs text-gray-400">Wins</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold text-red-400">{user.stats?.losses}</p>
                    <p className="text-xs text-gray-400">Losses</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-400">{user.stats?.draws}</p>
                    <p className="text-xs text-gray-400">Draws</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <p className="text-2xl font-bold text-purple-400">{user.stats?.totalGames}</p>
                    <p className="text-xs text-gray-400">Total Games</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Leaderboard Preview */}
          <Card className="glass border-white/10 card-hover">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Global Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {[
                  { rank: 1, name: 'MagnusCarlsen', rating: 2882, country: '🇳🇴' },
                  { rank: 2, name: 'Hikaru', rating: 2804, country: '🇺🇸' },
                  { rank: 3, name: 'Firouzja2003', rating: 2785, country: '🇫🇷' },
                ].map((player) => (
                  <div 
                    key={player.rank} 
                    className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        player.rank === 1 ? 'bg-yellow-500 text-black' :
                        player.rank === 2 ? 'bg-gray-400 text-black' :
                        'bg-orange-600 text-white'
                      }`}>
                        {player.rank}
                      </span>
                      <span className="text-lg">{player.country}</span>
                      <span className="text-white text-sm">{player.name}</span>
                    </div>
                    <span className="rating-badge">{player.rating}</span>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full border-white/20 text-gray-300 hover:bg-white/10"
                onClick={onViewLeaderboard}
              >
                View Full Leaderboard
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: 'Openings', desc: 'Explore 100+ openings', action: onViewOpenings },
            { icon: Users, label: 'Friends', desc: 'Play with friends', action: () => toast.info('Friends feature coming soon!') },
            { icon: Star, label: 'Achievements', desc: 'Unlock badges', action: () => toast.info('Achievements coming soon!') },
            { icon: Crown, label: 'Premium', desc: 'Upgrade for more features', action: () => toast.info('Premium coming soon!') },
          ].map((feature) => (
            <Button
              key={feature.label}
              variant="outline"
              className="border-white/20 text-gray-300 hover:bg-white/10 h-auto py-6 flex flex-col items-center gap-2"
              onClick={feature.action}
            >
              <feature.icon className="w-8 h-8 text-purple-400" />
              <div className="text-center">
                <div className="text-sm font-medium text-white">{feature.label}</div>
                <div className="text-xs text-gray-500">{feature.desc}</div>
              </div>
            </Button>
          ))}
        </section>

      </div>
    </div>
  );
}

export default HomePage;
