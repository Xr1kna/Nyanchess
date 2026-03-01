import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Search, X, User, Bot, Clock } from 'lucide-react';

interface OnlineMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMatchmaking: boolean;
  opponent: { username: string; rating: number } | null;
  onCancel: () => void;
}

export default function OnlineMatchModal({ 
  isOpen, 
  onClose, 
  isMatchmaking, 
  opponent,
  onCancel 
}: OnlineMatchModalProps) {
  const [dots, setDots] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);

  // Animate dots
  useEffect(() => {
    if (!isMatchmaking) return;
    
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, [isMatchmaking]);

  // Track elapsed time
  useEffect(() => {
    if (!isMatchmaking) {
      setElapsedTime(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isMatchmaking]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass border-white/10 max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-white text-center">
            {opponent ? 'Match Found!' : 'Finding Opponent'}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {!opponent ? (
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full" />
                <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <Search className="absolute inset-0 m-auto w-8 h-8 text-purple-400" />
              </div>
              
              <p className="text-white text-lg mb-2">
                Searching for opponent{dots}
              </p>
              
              <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>{formatTime(elapsedTime)}</span>
              </div>

              <p className="text-gray-500 text-xs mt-4">
                Estimated wait: &lt; 30 seconds
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-2">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white text-sm font-medium">You</p>
                  <p className="text-gray-400 text-xs">1200</p>
                </div>
                
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-purple-400">VS</span>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mx-auto mb-2 border-2 border-purple-500">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white text-sm font-medium">{opponent.username}</p>
                  <p className="text-gray-400 text-xs">{opponent.rating}</p>
                </div>
              </div>

              <p className="text-green-400 text-sm mb-4">
                Match found! Starting game...
              </p>
            </div>
          )}
        </div>

        {!opponent && (
          <Button 
            onClick={onCancel}
            variant="outline" 
            className="w-full border-white/20 text-gray-300 hover:bg-white/10"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
