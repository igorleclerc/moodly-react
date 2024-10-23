'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../lib/FirebaseConfig';
import EmployeeDashboard from '../../components/EmplyeeDashboard';
import ManagerDashboard from '../../components/ManagerDashboard';

const HomePage = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Suivi du chargement

  useEffect(() => {
    const fetchUserRole = async (userId: string) => {
      try {
        // Requête pour trouver le document avec le champ 'uid' égal à userId
        const q = query(collection(db, 'users'), where('uid', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0]; // Récupère le premier document trouvé
          const userData = userDoc.data();
          console.log("Rôle de l'utilisateur récupéré :", userData.role);
          setRole(userData.role);
        } else {
          console.error('Utilisateur non trouvé dans Firestore.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du rôle :', error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Utilisateur connecté :", user.uid);
        fetchUserRole(user.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center">Chargement...</div>;
  }

  if (!role) {
    return <div className="text-center">Aucun rôle trouvé pour l'utilisateur.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {role === 'Employee' && <EmployeeDashboard/>}
      {role === 'Manager' && <ManagerDashboard />}
      {role !== 'Employee' && role !== 'Manager' && (
        <div className="text-center">Rôle non reconnu : {role}</div>
      )}
    </div>
  );
};

export default HomePage;