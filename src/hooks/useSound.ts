import { Howl } from 'howler';
import { useCallback, useRef } from 'react';

// Sound cache to avoid reloading
const soundCache: Record<string, Howl> = {};

const getSound = (src: string): Howl => {
  if (!soundCache[src]) {
    soundCache[src] = new Howl({
      src: [src],
      volume: 0.5,
      preload: true,
    });
  }
  return soundCache[src];
};

export const useSound = () => {
  const enabled = useRef(true);

  const play = useCallback((soundName: 'move' | 'capture' | 'check' | 'checkmate' | 'gamestart') => {
    if (!enabled.current) return;
    
    const soundMap: Record<string, string> = {
      move: '/sounds/move.mp3',
      capture: '/sounds/capture.mp3',
      check: '/sounds/check.mp3',
      checkmate: '/sounds/checkmate.mp3',
      gamestart: '/sounds/gamestart.mp3',
    };

    const sound = getSound(soundMap[soundName]);
    sound.play();
  }, []);

  const toggle = useCallback(() => {
    enabled.current = !enabled.current;
    return enabled.current;
  }, []);

  const setEnabled = useCallback((value: boolean) => {
    enabled.current = value;
  }, []);

  const isEnabled = useCallback(() => enabled.current, []);

  return { play, toggle, setEnabled, isEnabled };
};

export default useSound;
