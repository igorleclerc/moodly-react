import React, { useEffect, useState } from "react";

import NewMood from "./NewMood";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


function Employe() {

    const [userMoodToday, setUserMoodToday] = useState({});
    const [userData, setUserData] = useState({});

    // allow only one mood per day
    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = () => {
        const user = firebase.auth().currentUser;
        const userIud = user.uid;
        const db = firebase.firestore();
        db.collection("user")
            .doc(userIud)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    setUserData(doc.data());
                    getUserMoodToday(doc.data());
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }

    const getUserMoodToday = (userData) => {
        const user = firebase.auth().currentUser;
        const userIud = user.uid;
        const db = firebase.firestore();

        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        // have the date in the same format as in the database in timestamp
        const today = new Date(currentYear + "-" + currentMonth + "-" + currentDay);
        // console.log(today);
        const todayTimestamp = firebase.firestore.Timestamp.fromDate(today);
        console.log(todayTimestamp);
        console.log(userIud);

        db.collection("moods")
            .where("userIud", "==", userIud)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                });
            })

        db.collection("moods")
            .where("userIud", "==", userIud)
            .where("date", "==", todayTimestamp)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    setUserMoodToday(doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

        
        console.log(userMoodToday);

    }




    return (
        <div className="flex flex-col items-center justify-center pt-10">
            {userMoodToday && userMoodToday.satisfaction && userMoodToday.stress ? (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-gray-800">Merci d'avoir rempli ton mood aujourd'hui !</h1>
                    <p className="text-gray-500">Tu as évalué ta satisfaction à {userMoodToday.satisfaction} et ton stress à {userMoodToday.stress}.</p>
                </div>
            ) : (
                <div>
                    <NewMood />
                </div>
            )}
        </div>
    )
}


export default Employe;