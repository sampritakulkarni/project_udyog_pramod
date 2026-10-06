import { useCallback, useEffect, useRef, useState } from 'react';

const TRACK_URL = `${import.meta.env.BASE_URL}music/veena-background.mp3`;

/** Plays a looping veena/flute background track with smooth fade in/out. */
export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(TRACK_URL);
      audio.loop = true;
      audio.volume = 0;
      audio.preload = 'auto';
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      setIsPlaying(false);
      return;
    }
    const fade = setInterval(() => {
      audio.volume = Math.max(0, audio.volume - 0.04);
      if (audio.volume <= 0) {
        clearInterval(fade);
        audio.pause();
        setIsPlaying(false);
      }
    }, 60);
  }, []);

  const play = useCallback(() => {
    const audio = ensureAudio();
    audio.volume = 0;
    audio.play().then(() => {
      const fade = setInterval(() => {
        audio.volume = Math.min(0.5, audio.volume + 0.03);
        if (audio.volume >= 0.5) clearInterval(fade);
      }, 80);
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
    });
  }, [ensureAudio]);

  const toggle = useCallback(() => {
    if (isPlaying) stop();
    else play();
  }, [isPlaying, play, stop]);

  useEffect(() => () => {
    audioRef.current?.pause();
  }, []);

  return { isPlaying, toggle, play, stop };
}
