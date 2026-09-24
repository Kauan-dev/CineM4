import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwodwxcZeQ8OZpz-VY_NxBjrQDKuhcREk",
  authDomain: "cinem4-1e560.firebaseapp.com",
  projectId: "cinem4-1e560",
  storageBucket: "cinem4-1e560.firebasestorage.app",
  messagingSenderId: "167197889315",
  appId: "1:167197889315:web:32ef80faedf988f1c2f296",
  measurementId: "G-S3VTV3E7C2",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth, db };
