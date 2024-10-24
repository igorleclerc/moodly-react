# 🎯 Moodly - Application de Suivi d'Humeur au Travail

****Moodly**** est une application conçue pour permettre aux employés d'évaluer leur niveau de fatigue, de stress et leur humeur générale quotidiennement. Les managers peuvent consulter les statistiques anonymes pour surveiller l'état de bien-être de leur équipe.

## 🚀 Fonctionnalités

**-** ****Évaluation quotidienne**** : Les employés peuvent répondre à un questionnaire sur leur niveau de fatigue, de stress et d'humeur.

**-** ****Carrousel interactif**** : Interface utilisateur simple et intuitive avec un carrousel pour les différentes étapes de l'évaluation.

**-** ****Statistiques pour managers**** : Les managers ont accès à des graphiques montrant l'évolution de l'humeur des employés.

**-** ****Limitation à deux envois par jour**** : Les employés peuvent soumettre leur évaluation deux fois par jour (matin et soir).

## 🛠️ Technologies utilisées

**-** ****Next.js**** 15

**-** ****TypeScript****

**-** ****TailwindCSS**** pour le design et le style.

**-** ****Firebase**** pour l'authentification et le stockage des données.

**-** ****Chart.js**** pour l'affichage des graphiques statistiques.

## ⚙️ Installation et configuration

**1.** Clone le projet :

**   **```bash

**   **git clone https://github.com/igorleclerc/moodly-react

**	**2.**	**Installe les dépendances :

pnpm install

**	**3.**	**Configure Firebase :

**	**•**	**Crée un projet Firebase et active l’authentification par email et mot de passe.

**	**•**	**Crée une base de données Firestore avec les collections nécessaires (**users**, **moods**).

**	**4.**	**Démarre le serveur de développement :

pnpm run dev

**🚧 Structure du projet**

.

├── README.md

├── app

│ **  **├── home

│ **  **│ **  **├── add-user

│ **  **│ **  **├── articles

│ **  **│ **  **├── profile

│ **  **│ **  **└── user-management

│ **  **├── layout.tsx

├── components

│ **  **├── Navbar.tsx

│ **  **└── UserTable.tsx

├── lib

│ **  **└── FirebaseConfig.ts

├── public

│ **  **├── logo_moodly.svg

├── tailwind.config.ts

└── tsconfig.json

**✨ Fonctionnalités à venir**

**	**•**	****Améliorations graphiques** pour les managers.

**	**•**	****Notifications** pour rappeler aux employés de remplir leurs évaluations.

**	**•**	****PWA (Progressive Web App)** ou Convertion App mobile 

**🧑‍💻 Contributeurs**

**	**•**	**Igor Le Clerc**

**	**•**	**Elsa Bessonnet**

**	**•**	**Mai-Lyne Verger**

**	**•**	**Nina Chastanier**

**	**•**	**Benjamin Missoffe**

$$


$$

**📄 License**

Ce projet est sous licence MIT.


#### 📋 Todoo :

* [ ] Terminer la conversion en app mobile via capacitor
* [ ] Terminer le front
* [ ] CGV
* [ ] Paramètres & gestion données personnelles
* [ ] Améliorer la partie Dashbaord manager
* [ ] Ajouter la partie articles
