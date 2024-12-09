import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCQeTd6MwsK4VIRV7nuSjy5l7_RSyXE5OE",
  authDomain: "servify-e838d.firebaseapp.com",
  projectId: "servify-e838d",
  storageBucket: "servify-e838d.firebasestorage.app",
  messagingSenderId: "989660892036",
  appId: "1:989660892036:web:977f76215e92745341ebd1",
  measurementId: "G-XGWRNL14TZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };