import { create } from "zustand";
import { useAudioStore } from "./audioStore";

type PopoverStore = {
  isVisible: boolean;
  hoverIndex: string | null;
  openPopover: (key: string) => void;
  closePopover: () => void;
};

export const usePopoverStore = create<PopoverStore>((set) => ({
  isVisible: false,
  hoverIndex: null,
  openPopover: (key) => {
    set({ isVisible: true, hoverIndex: key });
    useAudioStore.getState().pauseOnHover();
  },
  closePopover: () => {
    set({ isVisible: false, hoverIndex: null });
    useAudioStore.getState().resumeOnHover();
  },
}));
