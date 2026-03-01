// ============================================
// NYANCHESS - MAIN APP
// Fork dari Lichess dengan tema Kucing Pink
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { 
  Play, 
  Puzzle, 
  Trophy, 
  Users, 
  Moon, 
  Sun,
  LogOut,
  User,
  Zap,
  Target,
  Flame,
  Clock,
  BarChart3,
  ChevronRight,
  RotateCcw,
  Flag,
  Volume2,
  VolumeX,
  Cat
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useLichess, useSound } from '@/hooks';
import type { GameMode } from '@/types';

// Theme type
type ThemeMode = 'light' | 'dark';

// View type
type AppView = 'home' | 'play' | 'puzzle' | 'leaderboard' | 'tournament' | 'tv' | 'profile';

function App() {
  // Theme
  const [theme, setTheme] = useState<ThemeMode>('light');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // Lichess API
  const lichess = useLichess();
  
  // Sound
  const { play, toggle: toggleSound, isEnabled } = useSound();
  const [soundEnabled, setSoundEnabled] = useState(isEnabled());

  // View State
  const [currentView, setCurrentView] = useState<AppView>('home');

  // Game State
  const [game, setGame] = useState(new Chess());
  const [gameHistory, setGameHistory] = useState<string[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [botLevel, setBotLevel] = useState(1500);
  const [gameMode] = useState<'bot' | 'online'>('bot');

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('nyanchess-theme') as ThemeMode;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Save theme
  useEffect(() => {
    localStorage.setItem('nyanchess-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Toggle sound
  const handleToggleSound = useCallback(() => {
    const newState = toggleSound();
    setSoundEnabled(newState);
    toast.info(newState ? '🔊 Sound enabled' : '🔇 Sound muted');
  }, [toggleSound]);

  // Make move
  const onPieceDrop = useCallback((sourceSquare: string, targetSquare: string) => {
    if (isThinking) return false;
    
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });
      
      if (move) {
        const newGame = new Chess(game.fen());
        setGame(newGame);
        setGameHistory(prev => [...prev, move.san]);
        
        // Play sound
        if (move.flags.includes('c')) play('capture');
        else play('move');
        
        if (game.isCheck()) play('check');
        
        if (game.isGameOver()) {
          play('checkmate');
          const result = game.isCheckmate() 
            ? (game.turn() === 'w' ? 'Black Wins! 🎉' : 'White Wins! 🎉')
            : 'Draw! 🤝';
          toast.success(result);
        } else if (gameMode === 'bot') {
          // Bot responds
          setIsThinking(true);
          setTimeout(() => {
            makeBotMove(newGame);
          }, 800);
        }
        
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }, [game, isThinking, play, gameMode]);

  // Bot move
  const makeBotMove = (currentGame: Chess) => {
    const moves = currentGame.moves({ verbose: true });
    if (moves.length === 0) {
      setIsThinking(false);
      return;
    }

    // Simple bot logic based on level
    const randomness = Math.max(0, (3000 - botLevel) / 3000);
    let selectedMove;

    if (Math.random() < randomness * 0.8) {
      // Random move for lower levels
      selectedMove = moves[Math.floor(Math.random() * moves.length)];
    } else {
      // Prefer captures and checks
      const scoredMoves = moves.map(m => {
        let score = Math.random() * 50;
        if (m.flags.includes('c')) score += 200;
        if (m.san.includes('+')) score += 100;
        if (m.san.includes('#')) score += 1000;
        return { move: m, score };
      });
      scoredMoves.sort((a, b) => b.score - a.score);
      selectedMove = scoredMoves[0].move;
    }

    try {
      currentGame.move(selectedMove);
      setGame(new Chess(currentGame.fen()));
      setGameHistory(prev => [...prev, selectedMove.san]);
      
      if (selectedMove.flags.includes('c')) play('capture');
      else play('move');
      
      if (currentGame.isCheck()) play('check');
      if (currentGame.isGameOver()) play('checkmate');
    } catch {
      // Ignore errors
    }
    
    setIsThinking(false);
  };

  // Reset game
  const resetGame = useCallback(() => {
    const newGame = new Chess();
    setGame(newGame);
    setGameHistory([]);
    play('gamestart');
    toast.success('🎮 New game started!');
  }, [play]);

  // Undo move
  const undoMove = useCallback(() => {
    if (gameHistory.length >= 2 && gameMode === 'bot') {
      const gameCopy = new Chess();
      for (let i = 0; i < gameHistory.length - 2; i++) {
        gameCopy.move(gameHistory[i]);
      }
      setGame(gameCopy);
      setGameHistory(gameHistory.slice(0, -2));
      toast.info('↩️ Move undone');
    }
  }, [gameHistory, gameMode]);

  // Board colors based on theme
  const boardColors = theme === 'light' 
    ? { light: '#fff0f3', dark: '#ff6b9d' }
    : { light: '#2d1b4e', dark: '#d63384' };

  // Render Home View
  const renderHome = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <Cat className="w-96 h-96 text-pink-500 animate-nyan-float" />
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold gradient-nyan mb-4">
            🐱 Nyanchess
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Play chess with style! Free, open-source, and forever ad-free.
            Fork dari Lichess dengan sentuhan kucing yang menggemaskan.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Button 
              size="lg" 
              className="btn-nyan text-lg px-8"
              onClick={() => setCurrentView('play')}
            >
              <Play className="w-5 h-5 mr-2" />
              Play Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-nyan-secondary text-lg px-8"
              onClick={() => setCurrentView('puzzle')}
            >
              <Puzzle className="w-5 h-5 mr-2" />
              Daily Puzzle
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Play Options */}
      <section className="grid md:grid-cols-4 gap-4">
        {[
          { icon: Zap, label: 'Bullet', time: '1+0', color: 'text-yellow-500' },
          { icon: Flame, label: 'Blitz', time: '3+2', color: 'text-orange-500' },
          { icon: Clock, label: 'Rapid', time: '10+0', color: 'text-green-500' },
          { icon: Target, label: 'Classical', time: '30+0', color: 'text-blue-500' },
        ].map((mode) => (
          <Card 
            key={mode.label} 
            className="glass card-hover cursor-pointer"
            onClick={() => { setTimeControl(mode.label.toLowerCase() as GameMode); setCurrentView('play'); }}
          >
            <CardContent className="p-6 text-center">
              <mode.icon className={`w-10 h-10 mx-auto mb-3 ${mode.color}`} />
              <h3 className="font-bold text-lg">{mode.label}</h3>
              <p className="text-muted-foreground">{mode.time}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="glass card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-pink-500" />
              Play Online
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Challenge players from around the world in real-time matches.
            </p>
            <Button 
              variant="outline" 
              className="w-full btn-nyan-secondary"
              onClick={() => setCurrentView('play')}
            >
              Find Match
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="glass card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Puzzle className="w-5 h-5 text-purple-500" />
              Puzzles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Train your tactical skills with thousands of puzzles.
            </p>
            <Button 
              variant="outline" 
              className="w-full btn-nyan-secondary"
              onClick={() => setCurrentView('puzzle')}
            >
              Solve Puzzles
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="glass card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              See how you rank against players worldwide.
            </p>
            <Button 
              variant="outline" 
              className="w-full btn-nyan-secondary"
              onClick={() => setCurrentView('leaderboard')}
            >
              View Rankings
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Stats Preview */}
      {lichess.user && (
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-pink-500" />
              Your Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Bullet', rating: lichess.user.perfs.bullet?.rating || 1500 },
                { label: 'Blitz', rating: lichess.user.perfs.blitz?.rating || 1500 },
                { label: 'Rapid', rating: lichess.user.perfs.rapid?.rating || 1500 },
                { label: 'Classical', rating: lichess.user.perfs.classical?.rating || 1500 },
                { label: 'Puzzle', rating: lichess.user.perfs.puzzle?.rating || 1500 },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-pink-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-pink-500">{stat.rating}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  // Render Play View
  const renderPlay = () => (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Chess Board */}
      <div className="lg:col-span-2">
        <Card className="glass overflow-hidden">
          {/* Player Info - Top */}
          <div className="p-4 border-b border-pink-200/20 dark:border-pink-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                  <Cat className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">
                    {gameMode === 'bot' ? `Bot (${botLevel})` : 'Opponent'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {gameMode === 'bot' ? '🤖 AI Engine' : '🌐 Online'}
                  </p>
                </div>
              </div>
              {isThinking && (
                <div className="flex items-center gap-2 text-pink-500">
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" />
                  <span>Thinking...</span>
                </div>
              )}
            </div>
          </div>

          {/* Board */}
          <CardContent className="p-6 flex justify-center bg-black/5 dark:bg-white/5">
            <div className="relative w-full max-w-[550px]">
              <Chessboard
                options={{
                  position: game.fen(),
                  onPieceDrop: onPieceDrop,
                  boardStyle: {
                    borderRadius: '16px',
                    boxShadow: theme === 'light' 
                      ? '0 8px 40px rgba(255, 107, 157, 0.3)'
                      : '0 8px 40px rgba(255, 107, 157, 0.2)',
                  },
                  darkSquareStyle: { backgroundColor: boardColors.dark },
                  lightSquareStyle: { backgroundColor: boardColors.light },
                  showNotation: true,
                }}
              />

              {game.isGameOver() && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-2xl">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-white mb-2">
                      {game.isCheckmate() 
                        ? (game.turn() === 'w' ? '🎉 Black Wins!' : '🎉 White Wins!')
                        : '🤝 Draw!'}
                    </h3>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={resetGame} className="btn-nyan">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Play Again
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>

          {/* Player Info - Bottom */}
          <div className="p-4 border-t border-pink-200/20 dark:border-pink-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">{lichess.user?.username || 'You'}</p>
                  <p className="text-sm text-muted-foreground">
                    Rating: {lichess.user?.perfs.blitz?.rating || 1500}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={undoMove}
                  disabled={gameHistory.length < 2 || gameMode !== 'bot'}
                  className="btn-nyan-secondary"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Undo
                </Button>
                <Button
                  size="sm"
                  onClick={resetGame}
                  className="btn-nyan"
                >
                  <Flag className="w-4 h-4 mr-1" />
                  New Game
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        {/* Game Status */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="w-4 h-4 text-pink-500" />
              Game Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Turn</span>
              <Badge variant={game.turn() === 'w' ? 'default' : 'secondary'}>
                {game.turn() === 'w' ? '⚪ White' : '⚫ Black'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check</span>
              <Badge variant={game.isCheck() ? 'destructive' : 'outline'}>
                {game.isCheck() ? '⚠️ Yes' : '✓ No'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Moves</span>
              <span className="font-mono">{gameHistory.length}</span>
            </div>
          </CardContent>
        </Card>

        {/* Bot Levels */}
        {gameMode === 'bot' && (
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-base">Bot Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[400, 800, 1200, 1600, 2000, 2500].map((level) => (
                  <Button
                    key={level}
                    variant="outline"
                    size="sm"
                    onClick={() => setBotLevel(level)}
                    className={`w-full justify-between ${
                      botLevel === level 
                        ? 'bg-pink-500/20 border-pink-500 text-pink-500' 
                        : 'btn-nyan-secondary'
                    }`}
                  >
                    <span>Level {level / 400}</span>
                    <span className="rating-badge">{level}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Move History */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-pink-500" />
              Moves
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 overflow-y-auto space-y-1">
              {gameHistory.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No moves yet</p>
              ) : (
                <div className="grid grid-cols-2 gap-1">
                  {gameHistory.map((move, i) => (
                    <div
                      key={i}
                      className={`px-2 py-1 rounded text-sm ${
                        i % 2 === 0 
                          ? 'bg-pink-500/10 text-pink-600 dark:text-pink-400' 
                          : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                      }`}
                    >
                      {Math.floor(i / 2) + 1}.{i % 2 === 0 ? '' : '..'} {move}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render Puzzle View
  const renderPuzzle = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold gradient-nyan mb-6 text-center">🧩 Daily Puzzle</h2>
      <Card className="glass">
        <CardContent className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-[400px]">
              <Chessboard
                options={{
                  position: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 1',
                  boardStyle: {
                    borderRadius: '16px',
                    boxShadow: '0 8px 40px rgba(255, 107, 157, 0.3)',
                  },
                  darkSquareStyle: { backgroundColor: boardColors.dark },
                  lightSquareStyle: { backgroundColor: boardColors.light },
                  showNotation: true,
                }}
              />
            </div>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Find the best move for White!</p>
            <div className="flex justify-center gap-3">
              <Button className="btn-nyan">Check Solution</Button>
              <Button variant="outline" className="btn-nyan-secondary">Next Puzzle</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render Leaderboard View
  const renderLeaderboard = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold gradient-nyan mb-6 text-center">🏆 Leaderboard</h2>
      <Card className="glass">
        <CardHeader>
          <div className="flex gap-2">
            {['Bullet', 'Blitz', 'Rapid', 'Classical'].map((mode) => (
              <Button
                key={mode}
                variant="outline"
                size="sm"
                className="btn-nyan-secondary"
              >
                {mode}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { rank: 1, name: 'Nakamura', rating: 3200, country: '🇺🇸' },
              { rank: 2, name: 'Carlsen', rating: 3180, country: '🇳🇴' },
              { rank: 3, name: 'Ding', rating: 3150, country: '🇨🇳' },
              { rank: 4, name: 'Nepomniachtchi', rating: 3120, country: '🇷🇺' },
              { rank: 5, name: 'Firouzja', rating: 3100, country: '🇫🇷' },
            ].map((player) => (
              <div
                key={player.rank}
                className={`flex items-center justify-between p-4 rounded-xl ${
                  player.rank === 1 ? 'bg-gradient-to-r from-yellow-400/20 to-transparent border border-yellow-400/30' :
                  player.rank === 2 ? 'bg-gradient-to-r from-gray-400/20 to-transparent border border-gray-400/30' :
                  player.rank === 3 ? 'bg-gradient-to-r from-orange-400/20 to-transparent border border-orange-400/30' :
                  'bg-pink-500/5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    player.rank === 1 ? 'bg-yellow-400 text-black' :
                    player.rank === 2 ? 'bg-gray-400 text-black' :
                    player.rank === 3 ? 'bg-orange-400 text-white' :
                    'bg-pink-500/20 text-pink-500'
                  }`}>
                    {player.rank}
                  </span>
                  <span className="text-2xl">{player.country}</span>
                  <span className="font-bold text-lg">{player.name}</span>
                </div>
                <span className="rating-badge">{player.rating}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'nyan-gradient-light' : 'nyan-gradient-dark'}`}>
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-pink-200/20 dark:border-pink-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentView('home')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center nyan-glow">
                <Cat className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-nyan hidden sm:block">
                Nyanchess
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: 'home', icon: Cat, label: 'Home' },
                { id: 'play', icon: Play, label: 'Play' },
                { id: 'puzzle', icon: Puzzle, label: 'Puzzles' },
                { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as AppView)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    currentView === item.id 
                      ? 'bg-pink-500/20 text-pink-500 border border-pink-500/50' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-pink-500/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleSound}
                className="text-muted-foreground hover:text-foreground"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </Button>
              {lichess.user ? (
                <div className="flex items-center gap-2">
                  <img 
                    src={`https://lichess1.org/assets/______2/flair/img/activity.lichess.webp`}
                    alt={lichess.user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium hidden sm:block">{lichess.user.username}</span>
                </div>
              ) : (
                <Button 
                  size="sm" 
                  className="btn-nyan"
                  onClick={() => setShowLogin(true)}
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && renderHome()}
        {currentView === 'play' && renderPlay()}
        {currentView === 'puzzle' && renderPuzzle()}
        {currentView === 'leaderboard' && renderLeaderboard()}
      </main>

      {/* Footer */}
      <footer className="border-t border-pink-200/20 dark:border-pink-500/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Cat className="w-5 h-5 text-pink-500" />
              <span className="text-muted-foreground text-sm">
                Fork dari Lichess • Free and Open Source
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-pink-500 transition-colors">About</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Terms</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Privacy</a>
              <span>© 2026 Nyanchess</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
