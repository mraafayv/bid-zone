import { initializeApp } from "firebase/app";
import { getFirestore, doc, addDoc, collection } from "firebase/firestore";
import { getDatabase } from "firebase/database";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyB2fkikeYFDY6YIueFwD1XUzpxFU5FZg04",
  authDomain: "bidzone-dd75b.firebaseapp.com",
  projectId: "bidzone-dd75b",
  storageBucket: "bidzone-dd75b.appspot.com",
  messagingSenderId: "588587951490",
  appId: "1:588587951490:web:6c9e7510861bcad79edb9b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
//init services
const db = getFirestore();
const storage = getStorage(app);
//collection ref
// const dbRef = collection(db, "userInformation");
export {
  auth,
  addDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  storage,
  db,
  database
};
