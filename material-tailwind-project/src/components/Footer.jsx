import { Link } from "react-router-dom"

import { Typography } from "@material-tailwind/react"

import Logo from "../assets/logo_moodly.svg"


function FooterWithLogo() {
    return (
        <footer className="w-full bg-green-50 p-8 mt-16">
            <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-green-50 text-center md:justify-between">
            <img src={Logo} alt="Moodly" className="h-14" />
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Typography
                            as={Link}
                            to="/mentions-legales"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Mentions Légales
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as={Link}
                            to="/politique-de-confidentialite"
                            color="blue-gray"
                            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
                        >
                            Politique de confidentialité
                        </Typography>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default FooterWithLogo;