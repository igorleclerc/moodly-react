import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";

import React from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";


function LoginCard() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((useCredential) => {
            alert("Signed in successfully");
            console.log(useCredential.user.email);
        })
        .catch((error) => {
            console.log(error);
            alert(error.message);
        });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    color="white"
                    className="mb-4 grid h-28 place-items-center border-2 border-green-500"
                >
                    <Typography variant="h2" color="green">
                        Connexion
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Email" size="lg" type="email" color="green" placeholder="" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <Input label="Mot de passe" size="lg" type="password" color="green" placeholder="" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }} variant="gradient" color="green" fullWidth>
                        Se connecter
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Vous n&apos;avez pas de compte ?
                        <Typography
                            as="a"
                            href="/signup"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                        >
                            Créez un compte
                        </Typography>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    );
}


export default LoginCard;