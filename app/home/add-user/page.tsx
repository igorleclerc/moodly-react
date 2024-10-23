'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../../lib/FirebaseConfig'; // Assurez-vous que Firebase est bien configuré

const page = () => {
  const router = useRouter();
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Employee',
  });

  // Fonction pour ajouter un utilisateur à Firebase (Firestore + Auth)
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Création de l'utilisateur dans Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);

      // Ajouter l'utilisateur dans Firestore avec son rôle
      await addDoc(collection(db, 'users'), {
        uid: userCredential.user.uid,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
      });

      // Redirection vers la page de gestion des utilisateurs après l'ajout
      router.push('/home/profile/user-management');
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Ajouter un utilisateur</h1>

      <form onSubmit={handleAddUser} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4">
        <div>
          <label className="block text-gray-700">Prénom</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Nom</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-md"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Mot de passe</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Rôle</label>
          <select
            className="w-full px-4 py-2 border rounded-md"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="Employee">Employé</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        <div className="flex justify-between items-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Enregistrer
          </button>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => router.push('/home/profile/user-management')}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;