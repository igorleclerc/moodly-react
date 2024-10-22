import React, { useState, useEffect } from "react";
import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import Logo from "../assets/logo_moodly.svg";
import { Link } from "react-router-dom";


function MoodlyNavbar() {
    const [openNav, setOpenNav] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
        });
    }, []);

    const handleLogout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(null);
                alert("Signed out successfully");
                window.location.reload();
            })
            .catch((error) => {
                console.error(error);
            });
    }


    return (
        <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Link to="/" className="flex items-center gap-x-2">
                    <img src={Logo} alt="Moodly" className="h-10 w-30" />
                </Link>
                <div className="flex items-center gap-x-1">
                    {user ? (
                        <Button
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block"
                            color="red"
                            onClick={handleLogout}
                        >
                            Déconnexion
                        </Button>
                    ) : (
                        <div></div>
                    )}

                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <MobileNav open={openNav}>
                <div className="container mx-auto">
                    {user ? (
                        <div className="flex items-center gap-x-1">
                            <Button
                                fullWidth
                                variant="gradient"
                                size="sm"
                                className=" lg:inline-block"
                                color="red"
                                onClick={handleLogout}
                            >
                                Déconnexion
                            </Button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </MobileNav>
        </Navbar>
    );
}


export default MoodlyNavbar;
