import React from "react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";



function MentionLegales () {
    return (
        <div style={{
            paddingLeft:"20%",
            paddingRight:"20%",
            paddingTop:"100px"
        }}>
            <div style={{ textAlign: "center" }}>
                <Typography variant="h2">Mentions Légales</Typography>
            </div>
            <div style={{
                paddingTop:"50px"
            }}>
                <b><p>Droits de propriété intellectuelle</p></b>
                <p>Le présent site est la propriété de Moodly, qui en est l&apos;auteur au sens des
                    articles L.111.1 et suivants du Code de la propriété intellectuelle.</p>
                <p>Les photographies, textes, slogans, dessins, images, séquences animées sonores ou non ainsi que
                    toutes œuvres intégrées dans le site sont la propriété de Moodly ou
                    de tiers ayant autorisé Moodly à les utiliser.</p>
                <p>La reproduction, sur un support papier ou informatique, du site est autorisée sous réserve qu&apos;elle
                    soit strictement réservée à un usage personnel, excluant tout usage à des fins publicitaires et/ou
                    commerciales et/ou d&apos;informations, et qu&apos;elle soit conforme aux dispositions de l&apos;article L122-5 du
                    Code de la Propriété Intellectuelle.</p>
                <p>À l&apos;exception des dispositions ci-dessus, toute reproduction, représentation, utilisation ou modification,
                    par quelque procédé que ce soit et sur quelque support que ce soit, de tout ou partie du site, de tout
                    ou partie des contenus qui le composent, sans avoir obtenu l&apos;autorisation préalable de Moodly, est
                    strictement interdite et constitue un délit de contrefaçon.
                </p>
            </div>
            <div style={{
                paddingTop:"50px"
            }}>
                <b><p>Politique de protection des données</p></b>
                <p>Nous vous invitons à consulter notre <Link to="/politique-de-confidentialite">Politique de confidentialité</Link> et de protection des données personnelles pour en savoir plus
                    sur la manière dont nous traitons vos données personnelles et sur vos droits.</p>
                
            </div>
            <div style={{
                paddingTop:"50px"
            }}>
                <b><p>Liens hypertexte</p></b>
                <p>La mise en place d&apos;un lien hypertexte vers notre site nécessite une autorisation préalable écrite. Faites votre
                    demande à : contact@moodly.app</p>
                <p>Le Moodly ne peut en aucun cas être tenu pour responsables de la mise à disposition des
                    sites qui font l&apos;objet d’un lien hypertexte à partir du site eds-moodly.web.app et ne peut supporter aucune responsabilité
                    sur le contenu disponible sur ces sites ou à partir de ces sites.</p>
            </div>
            <div style={{
                paddingTop:"50px"
            }}>
                <b><p>Moodly</p></b>
                <p>95 Avenue Parmentier<br />75011, Paris 11</p>
                <br />
                <p>Email : <a href='mailto:contact@moodly.app'>contact@moodly.app</a></p>
                <br />
                <p>Directeur de la publication : Corto Colloc<br />Hébergement : Firebase<br />Maintenance : Moodly</p>
            </div>
            <div style={{
                paddingTop:"50px"
            }}>
                <b><p>Attention : La responsabilité de Moodly et de son hébergeur Web, quant à 
                    l’utilisation ou l’interprétation par l’internaute des informations et outils diffusés sur son site, ne
                    pourra en aucun cas être engagée.</p></b>
            </div>
        </div>
    )
}


export default MentionLegales;