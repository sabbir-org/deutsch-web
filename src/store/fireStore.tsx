import { create } from "zustand";
import {
  collection,
  doc,
  getDoc,
  // getDocs,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import conversation from "../assets/conversation.json";
import type { TSolution } from "../utils/type";

type ConvoStore = {
  conversations: any[];
  currentConversation: any | null;
  loading: boolean;
  currentSolution: TSolution | null;
  // fetchConversations: () => Promise<void>;
  fetchConversations: () => Unsubscribe; // <-- change from Promise<void> to Unsubscribe
  fetchConversationById: (id: string) => Promise<void>;
};

const useFireStore = create<ConvoStore>((set) => ({
  conversations: [],
  solutions: [],
  currentConversation: null,
  currentSolution: null,
  loading: true,

  fetchConversations: () => {
    // const unsubscribe = onSnapshot(
    //   collection(db, "aufgabehoren"),
    //   (snapshot) => {
    //     const data = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     set({ conversations: data, loading: false });
    //     console.log("Realtime conversations updated");
    //   },
    //   (error) => {
    //     console.error("Error fetching realtime conversations:", error);
    //     set({ loading: false });
    //   }
    // );

    // return unsubscribe; // You can call this later to stop listening

    set({ conversations: conversation, loading: false });
  },

  fetchConversationById: async (id) => {
    set({ loading: true });
    try {
      const docRef = doc(db, "aufgabehoren", id);
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

export default useFireStore;
