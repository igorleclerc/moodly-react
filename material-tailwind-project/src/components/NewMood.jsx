import React, { useEffect, useState } from "react";

import { Typography, Rating, Button } from "@material-tailwind/react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


function RatedIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
        >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
    );
}

function UnratedIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
        </svg>
    );
}


function NewMood() {
    const [newSatisfaction, setNewSatisfaction] = useState(0);
    const [newStress, setNewStress] = useState(0);
    const [userData, setUserData] = useState({});

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
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    };

    const postMood = () => {
        const user = firebase.auth().currentUser;
        const userIud = user.uid;
        const db = firebase.firestore();

        const currentDate = new Date();

        const satisfactionData = {
            satisfaction: newSatisfaction,
            stress: newStress,
            date: currentDate,
            managerIud: userData.managerIud,
            userIud: userIud
        };

        db.collection('moods').add(satisfactionData)
            .then((docRef) => {
                console.log('Mood document written with ID: ', docRef.id);
                // Perform any additional actions after successfully posting the mood
            })
            .catch((error) => {
                console.error('Error adding mood document: ', error);
            });
            
        alert('Mood envoyé !');



    };

    return (
        <div className="">
            <Typography color="blue-gray" className="text-2xl font-bold pb-4">
                Bonjour {userData.name}, quelle est ta satisfaction générale au travail aujourd'hui ?
            </Typography>
            <div className="grid lg:col-span-2 md:col-span-2 sm:col-span-1"></div>
            <Rating
                value={newSatisfaction}
                precision={1}
                size="large"
                emptyIcon={<UnratedIcon />}
                icon={<RatedIcon />}
                className="align-middle"
                onChange={(value) => setNewSatisfaction(value)}
            />
            <Typography color="blue-gray" className="text-2xl font-bold pb-4">
                Et comment évaluerais-tu ton niveau de stress ?
            </Typography>
            <div className="grid lg:col-span-2 md:col-span-2 sm:col-span-1"></div>
            <Rating
                value={newStress}
                precision={1}
                size="large"
                emptyIcon={<UnratedIcon />}
                icon={<RatedIcon />}
                className="align-middle"
                onChange={(value) => setNewStress(value)}
            />
            <Button className="mt-6" fullWidth onClick={postMood}>
                Envoyer mon mood
            </Button>

        </div>
    );
}

export default NewMood;
