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
                    color="gray"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Email" size="lg" type="email" color="lightBlue" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <Input label="Password" size="lg" type="password" color="lightBlue" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }} variant="gradient" fullWidth>
                        Sign In
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don&apos;t have an account?
                        <Typography
                            as="a"
                            href="/signup"
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                        >
                            Sign up
                        </Typography>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    );
}


export default LoginCard;