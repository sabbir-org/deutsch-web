import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { Conversation } from "../utils/type";

export function usePersist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (finalData: Conversation) => {
    console.log(finalData);
    setLoading(true);
    try {
      await setDoc(doc(db, "conversation", finalData.id), finalData);
      setLoading(false);
      return { success: true };
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      setLoading(false);
      return { success: false, error: err };
    }
  };

  return { upload, loading, error };
}
