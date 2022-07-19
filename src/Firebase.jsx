// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVBrMKTouLKMH6M7ki0F10r290HD9b8k4",
  authDomain: "todo-89a1c.firebaseapp.com",
  projectId: "todo-89a1c",
  storageBucket: "todo-89a1c.appspot.com",
  messagingSenderId: "625678501567",
  appId: "1:625678501567:web:f951d75ece31a19cbd680a",
  measurementId: "G-S75DCY0MK7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const analytics = getAnalytics(app);

export { app, auth, db };
