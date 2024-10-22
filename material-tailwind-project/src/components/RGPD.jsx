import React from "react";

import { Typography } from "@material-tailwind/react";

import { Link } from "react-router-dom";


function RGPD() {
  return (
    <div style={{
        paddingLeft:"20%",
        paddingRight:"20%",
        paddingTop:"100px"
    }}>
        <div style={{ textAlign: "center" }}>
            <Typography variant="h2">Politique de confidentialité</Typography>
        </div>
        <div style={{
            paddingTop:"50px"
        }}>
            <p>Nous vous encourageons à consulter la politique de confidentialité de Moodly, qui concerne la collecte et 
                le traitement des données à caractère personnel. Cette politique, présentée sous forme de questions/réponses, 
                offre une explication concise et compréhensible sur les données personnelles détenues par l'entité de Moodly 
                et leur utilisation. Elle met également en lumière vos droits spécifiques en matière de données personnelles 
                et vous guide sur la manière de les exercer. </p>
        </div>


        <div style={{
            paddingTop:"50px"
        }}>
            <b><p>Qui est le responsable du traitement de mes données personnelles ?</p></b>
            <p>Le responsable du traitement de vos données personnelles est la société Moodly, SAS au capital de 10 000 euros,
                immatriculée au RCS de Paris sous le numéro 123 456 789, dont le siège social est situé 95 Avenue Parmentier,
                75011 Paris.</p>
        </div>
        <div style={{
            paddingTop:"50px"
        }}>
            <b><p>Comment avez-vous collecté mes données ?</p></b>
            <p>Moodly collecte vos données en vous posant des questions spécifiques sur votre niveau de stress et de bonheur. 
                Lorsque vous utilisez notre application, vous avez la possibilité de répondre à des questions qui nous fournissent 
                des informations précieuses sur votre bien-être émotionnel. Ces réponses sont ensuite traitées de manière 
                confidentielle et sécurisée, dans le strict respect de notre politique de confidentialité. </p>
        </div>
        <div style={{
            paddingTop:"50px"
        }}>
            <b><p>Qui a accès à mes données personnelles ?</p></b>
            <p>Seul le personnel habilité de votre entreprise et le personnel habilité de Moodly ont accès à vos données. 
                Toutefois, dans certains cas et lorsque cela est strictement nécessaire ou résulte d’une obligation légale 
                ou règlementaire, nous sommes susceptibles de transmettre certaines de vos données personnelles, sur demande des 
                autorités compétentes (notamment URSSAF, inspection de travail, commissaires aux comptes, administration fiscale, 
                autres autorités administratives ou judiciaires dans le cadre d’une décision de justice, etc.). </p>
        </div>
        <div style={{
            paddingTop:"50px"
        }}>
            <b><p>Où sont stockées mes données? </p></b>
            <p>Vos données sont stockées sur des serveurs sécurisés situés en Finlande. </p>
        </div>
        <div style={{
            paddingTop:"50px"
        }}>
            <b><p>Combien de temps mes données sont-elles conservées ? Mes données personnelles sont-elles transférées en dehors de l’Union Européenne[1] ?</p></b>
            <p>Vos données sont conservées pendant toute la durée de votre contrat de travail. </p>
        </div>
        <div style={{
            paddingTop:"50px"
        }}>
            <b><p>Que se passera-t-il si je m’oppose au traitement de mes données personnelles ?</p></b>
            <p>Certaines données personnelles sont nécessaires à l’exécution du contrat ou au respect d’une obligation 
                légale. Si vous vous opposez au traitement de ces données ou si vous demandez-leur effacement, nous prendrons 
                contact avec vous si votre demande est incompatible avec ces finalités.</p>
        </div>
        <div style={{
            paddingTop:"50px"
        }}>
            <b><p>Quels sont mes droits ?</p></b>
            <p>Vous disposez d’un droit d’accès, de rectification, de limitation, d’opposition, de portabilité et d’effacement 
                des données personnelles vous concernant. Vous pouvez exercer ces droits en nous contactant à l’adresse : rgpd@moodly.app</p>
        </div>
        <div style={{
            paddingTop:"50px"
        }}>
            <b><p>Comment puis-je exercer mes droits et qui dois-je contacter ?</p></b>
            <p>Vous avez le droit d'exercer vos droits en matière de protection des données. Si vous souhaitez accéder, corriger, mettre 
            à jour ou supprimer les informations que nous détenons à votre sujet, ou si vous avez des préoccupations concernant 
            l'utilisation de vos données personnelles, veuillez nous contacter à l'adresse électronique suivante : rgpd@moodly.app</p>
        </div>
        <div style={{
            paddingTop:"50px"
        }}>
            <p>Si vous rencontrez des difficultés ou des préoccupations non résolues, vous avez le droit de déposer une plainte 
                auprès de l'autorité de contrôle compétente, la Commission nationale de l'informatique et des libertés (CNIL). 
                Vous pouvez accéder au site de la CNIL pour déposer une plainte à l'adresse suivante : <Link className="text-light-blue-600" to="https://www.cnil.fr/fr/plaintes">https://www.cnil.fr/fr/plaintes</Link></p>
        </div>
        <div style={{
            paddingTop:"50px"
        }}>
            <p>[1] Au 20.12.2023 les pays de l’Union européenne sont les suivants : Allemagne, Autriche, Belgique, Bulgarie, 
                Chypre, Croatie, Danemark, Espagne, Estonie, Finlande, France, Grèce, Hongrie, Irlande, Italie, Lettonie, Lituanie, 
                Luxembourg, Malte, Pologne, Portugal, Pays-Bas, République tchèque, Roumanie, Slovaquie, Slovénie, Suède. </p>
        </div>
    </div>

  );
}

export default RGPD;