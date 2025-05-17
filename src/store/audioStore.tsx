import { create } from "zustand";

let audio: HTMLAudioElement | null = null;

type AudioState = {
  activeAudioId: string | null;
  isPlaying: boolean;
  playbackRate: number;
  progress: number;
  duration: number;
  userPaused: boolean;
  loadAndPlay: (src: string, id: string) => void;
  toggleAudio: (id: string) => void;
  setProgressFromClick: (percent: number) => void;
  setPlaybackRate: (rate: number) => void;
  pauseOnHover: () => void;
  resumeOnHover: () => void;
};

export const useAudioStore = create<AudioState>((set, get) => ({
  activeAudioId: null,
  isPlaying: false,
  playbackRate: 1,
  progress: 0,
  duration: 0,
  userPaused: false,

  loadAndPlay: (src, id) => {
    if (audio) {
      audio.pause();
    }

    audio = new Audio(src);
    audio.playbackRate = get().playbackRate;

    audio.addEventListener("loadedmetadata", () =>
      set({ duration: audio!.duration })
    );

    audio.addEventListener("timeupdate", () => {
      set({ progress: (audio!.currentTime / audio!.duration) * 100 });
    });

    audio.addEventListener("ended", () => {
      set({ isPlaying: false, activeAudioId: null });
    });

    audio.play();
    set({ isPlaying: true, activeAudioId: id, userPaused: false });
  },

  toggleAudio: (id) => {
    if (!audio) return;

    const { activeAudioId, isPlaying } = get();

    if (activeAudioId !== id) return;

    if (isPlaying) {
      audio.pause();
      set({ isPlaying: false, userPaused: true });
    } else {
      audio.play();
      set({ isPlaying: true, userPaused: false });
    }
  },

  setProgressFromClick: (percent) => {
    if (audio && audio.duration) {
      audio.currentTime = (percent / 100) * audio.duration;
    }
  },

  setPlaybackRate: (rate) => {
    if (audio) audio.playbackRate = rate;
    set({ playbackRate: rate });
  },

  pauseOnHover: () => {
    if (audio && get().isPlaying) {
      audio.pause();
      set({ isPlaying: false });
    }
  },

  resumeOnHover: () => {
    const { isPlaying, activeAudioId, userPaused } = get();
    if (audio && activeAudioId && !isPlaying && !userPaused) {
      audio.play();
      set({ isPlaying: true });
    }
  },
}));
