// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE-Oquu9GuIAoX7nA-lJoLK0CRan_RcsE",
  authDomain: "space-camp-academy.firebaseapp.com",
  projectId: "space-camp-academy",
  storageBucket: "space-camp-academy.firebasestorage.app",
  messagingSenderId: "972324043693",
  appId: "1:972324043693:web:c325c93822c1433a473f24",
  measurementId: "G-ZPWMLBYG44"
};

// Initialize Firebase (singleton pattern for Next.js SSR)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
