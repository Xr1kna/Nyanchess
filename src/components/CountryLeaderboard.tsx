// ============================================
// COUNTRY LEADERBOARD
// Leaderboard for each country
// ============================================

import { useState, useMemo } from 'react';
import { 
  Trophy, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { countries, continents } from '@/data/countries';
import type { LeaderboardEntry } from '@/types';

// Generate mock leaderboard data
function generateMockLeaderboard(countryCode: string, count: number = 10): LeaderboardEntry[] {
  const country = countries.find(c => c.code === countryCode);
  const names = [
    'MagnusFan', 'ChessMaster', 'KnightRider', 'PawnStar', 'QueenGambit',
    'RookDestroyer', 'BishopBlast', 'KingSlayer', 'CheckmatePro', 'GrandmasterX',
    'TacticalGenius', 'EndgameExpert', 'OpeningWizard', 'BlitzKing', 'RapidQueen',
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const baseRating = 2800 - (i * 80) + Math.floor(Math.random() * 40);
    const wins = 100 + Math.floor(Math.random() * 200);
    const losses = 50 + Math.floor(Math.random() * 100);
    const draws = 10 + Math.floor(Math.random() * 30);
    
    return {
      rank: i + 1,
      user: {
        id: `user-${countryCode}-${i}`,
        username: `${names[i % names.length]}_${countryCode}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${countryCode}${i}`,
        country: country?.name || 'Unknown',
        flag: country?.flag || '🏳️',
      },
      rating: baseRating,
      stats: { wins, losses, draws },
      trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'stable' : 'down',
    };
  });
}

interface CountryLeaderboardProps {
  onBack: () => void;
}

export function CountryLeaderboard({ onBack }: CountryLeaderboardProps) {
  const [selectedContinent, setSelectedContinent] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Filter countries
  const filteredCountries = useMemo(() => {
    return countries.filter(country => {
      const matchesContinent = selectedContinent === 'All' || country.continent === selectedContinent;
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           country.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesContinent && matchesSearch;
    });
  }, [selectedContinent, searchQuery]);

  // Get leaderboard for selected country
  const countryLeaderboard = useMemo(() => {
    if (!selectedCountry) return [];
    return generateMockLeaderboard(selectedCountry, 20);
  }, [selectedCountry]);

  const selectedCountryData = countries.find(c => c.code === selectedCountry);

  if (selectedCountry) {
    return (
      <div className="min-h-screen anime-gradient p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => setSelectedCountry(null)} className="border-white/20 text-gray-300">
              ← Back
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedCountryData?.flag}</span>
              <div>
                <h1 className="text-2xl font-bold text-white">{selectedCountryData?.name}</h1>
                <p className="text-gray-400">Top Players Leaderboard</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="glass border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-purple-400">{countryLeaderboard.length}</p>
                <p className="text-sm text-gray-400">Top Players</p>
              </CardContent>
            </Card>
            <Card className="glass border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-blue-400">
                  {Math.round(countryLeaderboard.reduce((acc, p) => acc + p.rating, 0) / countryLeaderboard.length)}
                </p>
                <p className="text-sm text-gray-400">Avg Rating</p>
              </CardContent>
            </Card>
            <Card className="glass border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-green-400">{countryLeaderboard[0]?.rating}</p>
                <p className="text-sm text-gray-400">Highest Rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Top 20 Players
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {countryLeaderboard.map((player) => (
                  <div
                    key={player.user.id}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all card-hover ${
                      player.rank === 1 ? 'bg-gradient-to-r from-yellow-500/20 to-transparent border border-yellow-500/30' :
                      player.rank === 2 ? 'bg-gradient-to-r from-gray-400/20 to-transparent border border-gray-400/30' :
                      player.rank === 3 ? 'bg-gradient-to-r from-orange-600/20 to-transparent border border-orange-600/30' :
                      'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        player.rank === 1 ? 'bg-yellow-500 text-black' :
                        player.rank === 2 ? 'bg-gray-400 text-black' :
                        player.rank === 3 ? 'bg-orange-600 text-white' :
                        'bg-purple-500/30 text-purple-300'
                      }`}>
                        {player.rank}
                      </div>
                      <img 
                        src={player.user.avatar} 
                        alt={player.user.username}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-white font-medium">{player.user.username}</p>
                        <p className="text-xs text-gray-400">
                          {player.stats?.wins || 0}W {player.stats?.losses || 0}L {player.stats?.draws || 0}D
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {player.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
                      {player.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-400" />}
                      {player.trend === 'stable' && <Minus className="w-4 h-4 text-gray-400" />}
                      <span className="rating-badge">{player.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
            <Button variant="outline" onClick={onBack} className="border-white/20 text-gray-300">
              ← Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-400" />
                Country Leaderboards
              </h1>
              <p className="text-gray-400">View top players from each country</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {continents.map(continent => (
              <Button
                key={continent}
                size="sm"
                variant={selectedContinent === continent ? 'default' : 'outline'}
                onClick={() => setSelectedContinent(continent)}
                className={selectedContinent === continent ? 'btn-anime text-white' : 'border-white/20 text-gray-300'}
              >
                {continent}
              </Button>
            ))}
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredCountries.map((country) => (
            <Button
              key={country.code}
              variant="outline"
              className="border-white/20 text-gray-300 hover:bg-white/10 h-auto py-4 flex flex-col items-center gap-2"
              onClick={() => setSelectedCountry(country.code)}
            >
              <span className="text-4xl">{country.flag}</span>
              <span className="text-sm font-medium text-white text-center">{country.name}</span>
              <Badge variant="outline" className="border-white/20 text-gray-400 text-xs">
                {country.continent}
              </Badge>
            </Button>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No countries found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryLeaderboard;
