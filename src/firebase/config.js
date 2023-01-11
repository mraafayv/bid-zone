import { initializeApp } from "firebase/app";
import { getFirestore, doc, addDoc, collection } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBzaSRACEDjUKgFnsz2Tl5ZkKYKg5v8H-M",
  authDomain: "bidzone-a1701.firebaseapp.com",
  projectId: "bidzone-a1701",
  storageBucket: "bidzone-a1701.appspot.com",
  messagingSenderId: "450790718260",
  appId: "1:450790718260:web:a0e46dd16225df6fa74361",
  measurementId: "G-YPHS7N8EX0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
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
  db
};
