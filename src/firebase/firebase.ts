// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBve5cyOcrPqq_Ki8A0ijN-mC1q-6nVko4",
  authDomain: "deutsch-web.firebaseapp.com",
  projectId: "deutsch-web",
  storageBucket: "deutsch-web.firebasestorage.app",
  messagingSenderId: "272265266362",
  appId: "1:272265266362:web:039f31a555cffd6ab9ee83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
