'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/FirebaseConfig';
import UserTable from '@/components/UserTable';
import { getFunctions, httpsCallable } from 'firebase/functions'; // Importer Firebase Functions

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const functions = getFunctions();

  // Récupérer les utilisateurs depuis Firebase Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(usersList);
    });

    return () => unsubscribe();
  }, []);

  // Fonction pour supprimer un utilisateur
  const handleDelete = async (userId: string) => {
    try {
      // Supprimer l'utilisateur de Firestore
      await deleteDoc(doc(db, 'users', userId));

      // Appeler la Cloud Function pour supprimer l'utilisateur de Firebase Authentication
      const deleteUser = httpsCallable(functions, 'deleteUser');
      await deleteUser({ uid: userId });

      console.log('Utilisateur supprimé de Firestore et Firebase Auth');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    }
  };

  // Fonction pour modifier un utilisateur (redirection)
  const handleEdit = (userId: string) => {
    router.push(`/home/add-user?edit=${userId}`); // Redirection vers un formulaire de modification (à implémenter)
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>

      {/* Affichage du tableau des utilisateurs */}
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Bouton pour ajouter un utilisateur */}
      <button
        className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push('/home/add-user')}
      >
        Ajouter un utilisateur
      </button>
    </div>
  );
};

export default page;