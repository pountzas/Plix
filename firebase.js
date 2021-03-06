// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA-qJIDEur1UJNMd0qlevyS92v5fnbnvno',
  authDomain: 'plix-aaef3.firebaseapp.com',
  projectId: 'plix-aaef3',
  storageBucket: 'plix-aaef3.appspot.com',
  messagingSenderId: '568145031745',
  appId: '1:568145031745:web:18600fe9328523da040cc0',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
