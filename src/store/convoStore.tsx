import { create } from "zustand";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

type ConvoStore = {
  conversations: any[];
  currentConversation: any | null;
  loading: boolean;
  fetchConversations: () => Promise<void>;
  fetchConversationById: (id: string) => Promise<void>;
}

const useConvoStore = create<ConvoStore>((set) => ({
  conversations: [],
  currentConversation: null,
  loading: true,

  fetchConversations: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "conversation"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ conversations: data, loading: false });
    } catch (err) {
      console.error("Error fetching conversations:", err);
      set({ loading: false });
    }
  },

  fetchConversationById: async (id) => {
    set({ loading: true });
    try {
      const docRef = doc(db, "conversation", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({
          currentConversation: { id: docSnap.id, ...docSnap.data() },
          loading: false,
        });
      } else {
        set({ currentConversation: null, loading: false });
      }
    } catch (err) {
      console.error("Error fetching conversation:", err);
      set({ loading: false });
    }
  },
}));

export default useConvoStore;
