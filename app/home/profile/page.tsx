'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../lib/FirebaseConfig';

const page = () => {
  const [role, setRole] = useState<string | null>(null); // Stocke le rôle de l'utilisateur
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async (userId: string) => {
      try {
        console.log("Recherche des informations de l'utilisateur dans Firestore avec UID :", userId);

        // Requête pour trouver le document avec le champ 'uid' égal à userId
        const q = query(collection(db, 'users'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; // Prend le premier document trouvé
          const userData = userDoc.data();
          console.log("Données utilisateur récupérées :", userData);
          setRole(userData.role); // Récupère le rôle depuis Firestore
        } else {
          console.error('Utilisateur non trouvé dans Firestore avec cet UID :', userId);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du rôle utilisateur :', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Utilisateur connecté avec UID :", user.uid);
        fetchUserRole(user.uid); // Si l'utilisateur est connecté, on récupère son rôle
      } else {
        router.push('/'); // Redirection si non connecté
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Profil</h1>
      <ul className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4">
        {/* Mes infos perso */}
        <li className="cursor-pointer text-gray-800 hover:bg-gray-100 p-3 rounded-md" onClick={() => router.push('/home/personal-info')}>
          Mes infos perso
        </li>

        {/* Afficher Gestion des utilisateurs uniquement pour les managers ou admins */}
        {role === 'Manager' || role === 'Admin' ? (
          <li className="cursor-pointer text-gray-800 hover:bg-gray-100 p-3 rounded-md" onClick={() => router.push('/home/profile/user-management')}>
            Gestion des utilisateurs
          </li>
        ) : (
          <li className="text-gray-400 p-3 rounded-md">Accès restreint</li>
        )}

        {/* CGV */}
        <li className="cursor-pointer text-gray-800 hover:bg-gray-100 p-3 rounded-md" onClick={() => router.push('/home/cgv')}>
          CGV
        </li>

        {/* Information concernant l'application */}
        <li className="cursor-pointer text-gray-800 hover:bg-gray-100 p-3 rounded-md" onClick={() => router.push('/home/app-info')}>
          Information concernant l'application
        </li>

        {/* Se déconnecter */}
        <li className="cursor-pointer text-red-600 hover:bg-red-100 p-3 rounded-md font-semibold" onClick={() => auth.signOut()}>
          Se déconnecter
        </li>
      </ul>
    </div>
  );
};

export default page;