import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ThemeProvider } from "@material-tailwind/react";


// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGQWG2QWuWWdcPZXYrBFxErCy9w_GpWRo",
  authDomain: "moodly-c0a3a.firebaseapp.com",
  projectId: "moodly-c0a3a",
  storageBucket: "moodly-c0a3a.appspot.com",
  messagingSenderId: "703637707235",
  appId: "1:703637707235:web:e004ff3cc2b8e77ee4e8d6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
