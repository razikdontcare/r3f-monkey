'use client'
import { createContext, useContext, useRef, useState, ReactNode } from 'react';

interface MusicContextType {
  playMusic: () => void;
  pauseMusic: () => void;
  toggleMute: () => void;
  isPlaying: boolean;
  isMuted: boolean;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

interface MusicProviderProps {
  children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null); // Referensi ke elemen audio
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Fungsi untuk memutar audio
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Fungsi untuk menghentikan audio
  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Fungsi untuk mute/unmute audio
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        playMusic,
        pauseMusic,
        toggleMute,
        isPlaying,
        isMuted,
      }}
    >
      {/* Elemen audio tersembunyi */}
      <audio ref={audioRef} src="/audio/Indila - Tourner Dans Le Vide (no vocal) (Instrumental).mp3" />
      {children}
    </MusicContext.Provider>
  );
};

// Custom hook untuk menggunakan context
export const useMusic = (): MusicContextType => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
