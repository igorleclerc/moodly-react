import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAydn9SYPD76o1rODcyY18EC7Mgo2OojOA",
  authDomain: "moodly-app-163f1.firebaseapp.com",
  projectId: "moodly-app-163f1",
  storageBucket: "moodly-app-163f1.appspot.com",
  messagingSenderId: "347904279105",
  appId: "1:347904279105:web:b4182f1bfa17f62c29fcc0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
