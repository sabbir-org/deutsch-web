import { createContext, useContext, useRef, useState } from "react";

type AudioContextType = {
  playNewAudio: (audio: HTMLAudioElement, id: string) => void;
  activeAudioId: string | null;
};

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);

  const playNewAudio = (audio: HTMLAudioElement, id: string) => {
    if (currentAudioRef.current && currentAudioRef.current !== audio) {
      currentAudioRef.current.pause();
    }
    currentAudioRef.current = audio;
    setActiveAudioId(id);
    audio.play();
  };

  return (
    <AudioContext.Provider value={{ playNewAudio, activeAudioId }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioManager = () => {
  const ctx = useContext(AudioContext);
  if (!ctx)
    throw new Error("useAudioManager must be used inside AudioProvider");
  return ctx;
};
