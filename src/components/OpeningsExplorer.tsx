// ============================================
// OPENINGS EXPLORER
// Chess.com-style opening database
// ============================================

import { useState, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { 
  Search, 
  BookOpen, 
  TrendingUp,
  ChevronRight,
  X,
  Filter,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { openings, openingCategories, getPopularOpenings } from '@/data/openings';
import type { Opening } from '@/types';

interface OpeningsExplorerProps {
  onClose: () => void;
}

export function OpeningsExplorer({ onClose }: OpeningsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedOpening, setSelectedOpening] = useState<Opening | null>(null);
  const [currentMove, setCurrentMove] = useState(0);

  // Filter openings
  const filteredOpenings = useMemo(() => {
    return openings.filter(opening => {
      const matchesSearch = opening.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           opening.eco.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           opening.moves.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || opening.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const popularOpenings = useMemo(() => getPopularOpenings(5), []);

  // Get position for opening
  const getOpeningPosition = (opening: Opening, moveIndex: number) => {
    const game = new Chess();
    const moves = opening.moves.split(' ').filter(m => !m.includes('.'));
    
    for (let i = 0; i < Math.min(moveIndex, moves.length); i++) {
      try {
        game.move(moves[i]);
      } catch {
        break;
      }
    }
    
    return game.fen();
  };

  if (selectedOpening) {
    const moves = selectedOpening.moves.split(' ').filter(m => !m.includes('.'));
    
    return (
      <div className="min-h-screen anime-gradient p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setSelectedOpening(null)} className="border-white/20 text-gray-300">
                ← Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">{selectedOpening.name}</h1>
                <p className="text-gray-400">{selectedOpening.eco} • {selectedOpening.category}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onClose} className="border-white/20 text-gray-300">
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Board */}
            <Card className="glass border-white/10">
              <CardContent className="p-4">
                <div className="flex justify-center">
                  <div className="w-full max-w-[400px]">
                    <Chessboard
                      options={{
                        position: getOpeningPosition(selectedOpening, currentMove),
                        boardStyle: {
                          borderRadius: '12px',
                          boxShadow: '0 0 40px rgba(168, 85, 247, 0.5)',
                        },
                        darkSquareStyle: { backgroundColor: '#6d28d9' },
                        lightSquareStyle: { backgroundColor: '#ddd6fe' },
                        showNotation: true,
                      }}
                    />
                  </div>
                </div>

                {/* Move Navigation */}
                <div className="flex justify-center gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentMove(Math.max(0, currentMove - 1))}
                    className="border-white/20 text-gray-300"
                  >
                    ←
                  </Button>
                  <span className="text-white px-4 py-2 bg-white/5 rounded">
                    Move {currentMove} / {moves.length}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentMove(Math.min(moves.length, currentMove + 1))}
                    className="border-white/20 text-gray-300"
                  >
                    →
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <div className="space-y-4">
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-base">Moves</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 font-mono">{selectedOpening.moves}</p>
                </CardContent>
              </Card>

              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-base">Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">White Wins</span>
                        <span className="text-white">{selectedOpening.winRate.white}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full"
                          style={{ width: `${selectedOpening.winRate.white}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Draws</span>
                        <span className="text-yellow-400">{selectedOpening.winRate.draw}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${selectedOpening.winRate.draw}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Black Wins</span>
                        <span className="text-gray-400">{selectedOpening.winRate.black}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gray-600 rounded-full"
                          style={{ width: `${selectedOpening.winRate.black}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-base">Popularity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-white text-lg font-bold">{selectedOpening.popularity}%</span>
                    <span className="text-gray-400">of games</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen anime-gradient p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onClose} className="border-white/20 text-gray-300">
              ← Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-400" />
                Openings Explorer
              </h1>
              <p className="text-gray-400">Browse 50+ chess openings</p>
            </div>
          </div>
        </div>

        {/* Popular Openings */}
        <Card className="glass border-white/10 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              Most Popular
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {popularOpenings.map((opening) => (
                <Button
                  key={opening.eco}
                  variant="outline"
                  className="border-white/20 text-gray-300 hover:bg-white/10 flex-shrink-0"
                  onClick={() => setSelectedOpening(opening)}
                >
                  <span className="text-lg mr-2">
                    {opening.category === 'Open Games' ? '♔' :
                     opening.category === 'Semi-Open Games' ? '♛' :
                     opening.category === 'Closed Games' ? '♜' :
                     opening.category === 'Indian Defenses' ? '♞' : '♝'}
                  </span>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">{opening.name}</div>
                    <div className="text-xs text-gray-500">{opening.popularity}% popularity</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search openings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              size="sm"
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('All')}
              className={selectedCategory === 'All' ? 'btn-anime text-white' : 'border-white/20 text-gray-300'}
            >
              <Filter className="w-4 h-4 mr-1" />
              All
            </Button>
            {openingCategories.map(category => (
              <Button
                key={category}
                size="sm"
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'btn-anime text-white' : 'border-white/20 text-gray-300'}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Openings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOpenings.map((opening) => (
            <Card 
              key={opening.eco} 
              className="glass border-white/10 card-hover cursor-pointer"
              onClick={() => setSelectedOpening(opening)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50">
                    {opening.eco}
                  </Badge>
                  <span className="text-gray-400 text-xs">{opening.category}</span>
                </div>
                <CardTitle className="text-white text-lg mt-2">{opening.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm font-mono mb-3">{opening.moves}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">{opening.popularity}%</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOpenings.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No openings found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OpeningsExplorer;
