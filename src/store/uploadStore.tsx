import { doc, setDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase/firebase";
import type { TPreviewData } from "../utils/type";

type UploadStore = {
  isShowPreview: boolean;
  previewData: TPreviewData | null;
  error: string | null;
  updatePreviewData: (data: TPreviewData) => void;
  postDialog: () => void;
  openPreview: () => void;
  closePreview: () => void;
};

export const useUploadStore = create<UploadStore>((set, get) => ({
  isShowPreview: false,
  previewData: null,
  error: null,
  updatePreviewData: (data) => set({ previewData: data }),
  postDialog: async () => {
    const data = get().previewData;

    if (!data) {
      set({ error: "No preview data to upload." });
      return { success: false, error: "No data" };
    }

    try {
      await setDoc(doc(db, "aufgabehoren", data.id), data);
      return { success: true };
    } catch (err) {
      if (err instanceof Error) set({ error: err.message });
      return { success: false, error: err };
    }
  },

  openPreview: () => set({ isShowPreview: true }),
  closePreview: () => set({ isShowPreview: false }),
}));
