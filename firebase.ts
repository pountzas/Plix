// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-qJIDEur1UJNMd0qlevyS92v5fnbnvno",
  authDomain: "plix-aaef3.firebaseapp.com",
  projectId: "plix-aaef3",
  storageBucket: "plix-aaef3.appspot.com",
  messagingSenderId: "568145031745",
  appId: "1:568145031745:web:18600fe9328523da040cc0",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Connect to emulators in development (optional)
// if (process.env.NODE_ENV === 'development') {
//   connectAuthEmulator(auth, "http://localhost:9099")
//   connectFirestoreEmulator(db, 'localhost', 8080)
//   connectStorageEmulator(storage, "localhost", 9199)
// }

export { app, auth, db, storage };
