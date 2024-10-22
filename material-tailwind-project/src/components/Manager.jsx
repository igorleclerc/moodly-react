import React from "react";

//import AdminUsers from "./AdminUsers";
import Chart from "./Chart";
import { Typography } from "@material-tailwind/react";



function Manager () {
    return (
        <div className="lg:pt-10 lg:px-20 sm:pt-5">
            <Typography color="blue-gray" className="text-2xl font-bold pb-4">
                Mood de votre équipe sur les 30 derniers jours :
            </Typography>
            <Chart />
        </div>
    )
}

export default Manager;