import { create } from "zustand";
import { useAudioStore } from "./audioStore";

type PopoverStore = {
  isVisible: boolean;
  hoverIndex: string | null;
  openPopover: (key: string, e: any) => void;
  closePopover: () => void;
  mouse: { x: number; y: number };
};

export const usePopoverStore = create<PopoverStore>((set, get) => ({
  isVisible: false,
  hoverIndex: null,
  mouse: { x: 0, y: 0 },
  openPopover: (key, e) => {
    set({ mouse: { x: e.clientX, y: e.clientY } });
    set({ isVisible: true, hoverIndex: key });
    // useAudioStore.getState().pauseOnHover();
  },
  closePopover: () => {
    set({ isVisible: false, hoverIndex: null });
    // useAudioStore.getState().resumeOnHover();
  },
}));
