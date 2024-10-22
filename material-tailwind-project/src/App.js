import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import LoginCard from "./components/Login";
import Manager from "./components/Manager";
import Employe from "./components/Employe";
import Navbar from "./components/Navbar";
import MentionLegales from "./components/MentionsLegales";
import Footer from "./components/Footer";
import RGPD from "./components/RGPD";



export default function App() {
  const [user, setUser] = useState(null);
  const [manager, setManager] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const authUser = await firebase.auth().currentUser;
      if (authUser) {
        setUser(authUser);
        const userId = authUser.uid;
        const userDoc = await firebase.firestore().collection("user").doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setManager(userData.manager || false);
        } else {
          setManager(false);
        }
      } else {
        setUser(null);
        setManager(false);
      }
    };

    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        fetchUserData();
      } else {
        setUser(null);
        setManager(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <div>
              {user ? (
                <div>
                  {manager ? <Manager /> : <Employe />}
                </div>
              ) : (
                <LoginCard />
              )}
            </div>
          }
          />
          <Route path="/mentions-legales" element={<MentionLegales />} />
          <Route path="/politique-de-confidentialite" element={<RGPD />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}