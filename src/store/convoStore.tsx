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

type ConvoStore = {
  conversations: any[];
  currentConversation: any | null;
  loading: boolean;
  // fetchConversations: () => Promise<void>;
  fetchConversations: () => Unsubscribe; // <-- change from Promise<void> to Unsubscribe
  fetchConversationById: (id: string) => Promise<void>;
};

const useConvoStore = create<ConvoStore>((set) => ({
  conversations: [],
  currentConversation: null,
  loading: true,

  // fetchConversations: async () => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, "conversation"));
  //     const data = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     set({ conversations: data, loading: false });
  //     console.log('fetched conversations');
  //   } catch (err) {
  //     console.error("Error fetching conversations:", err);
  //     set({ loading: false });
  //   }
  // },

  fetchConversations: () => {
    const unsubscribe = onSnapshot(
      collection(db, "conversation"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        set({ conversations: data, loading: false });
        console.log("Realtime conversations updated");
      },
      (error) => {
        console.error("Error fetching realtime conversations:", error);
        set({ loading: false });
      }
    );

    return unsubscribe; // You can call this later to stop listening
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
