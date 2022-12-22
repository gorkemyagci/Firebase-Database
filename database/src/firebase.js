import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDZ56Pi-dlPyp6UxygDGgsSBrXz_2qdTl0",
  authDomain: "database-ddcdb.firebaseapp.com",
  projectId: "database-ddcdb",
  storageBucket: "database-ddcdb.appspot.com",
  messagingSenderId: "1070074800001",
  appId: "1:1070074800001:web:866f9bb8f6aa2e49d52a80",
  measurementId: "G-20STDWNDR7"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const auth = getAuth();