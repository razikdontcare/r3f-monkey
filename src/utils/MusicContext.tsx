'use client';
import { createContext, useContext, useRef, useState, ReactNode } from 'react';

interface MusicContextType {
  playMusic: () => void;
  pauseMusic: () => void;
  toggleMute: () => void;
  increaseVolume: () => void;
  decreaseVolume: () => void;
  isPlaying: boolean;
  isMuted: boolean;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null); // Reference to audio element
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Function to play audio
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Function to pause audio
  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Function to toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Function to increase volume by 50%
  const increaseVolume = () => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
    }
  };

  // Function to decrease volume by 50%
  const decreaseVolume = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
    }
  };

  return (
    <MusicContext.Provider
      value={{
        playMusic,
        pauseMusic,
        toggleMute,
        increaseVolume,
        decreaseVolume,
        isPlaying,
        isMuted,
      }}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/Indila - Tourner Dans Le Vide (no vocal) (Instrumental).mp3"
        loop={true}
      />
      {children}
    </MusicContext.Provider>
  );
};

// Custom hook to use the MusicContext
export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
