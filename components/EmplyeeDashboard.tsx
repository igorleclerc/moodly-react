'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '@/lib/FirebaseConfig';
import { useRouter } from 'next/navigation';

const EmployeeDashboard = () => {
  const [fatigue, setFatigue] = useState<number | null>(5);
  const [stress, setStress] = useState<number | null>(5);
  const [mood, setMood] = useState<number | null>(5);
  const router = useRouter();

  const handleSubmit = async () => {
    if (fatigue && stress && mood) {
      try {
        const user = auth.currentUser;

        if (user) {
          // Créer un nouveau document dans la collection "moods"
          await addDoc(collection(db, 'moods'), {
            employeeId: user.uid, // UID de l'utilisateur connecté
            date: new Date().toISOString(), // Date actuelle
            fatigue,
            stress,
            mood,
          });

          console.log('Réponse enregistrée avec succès.');
          // Rediriger ou afficher un message de succès
          router.push('/home'); // Par exemple, rediriger après soumission
        }
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement des réponses:', error);
      }
    } else {
      alert('Veuillez répondre à toutes les questions.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-bold">Évaluez votre journée</h2>

      {/* Question 1 - Niveau de fatigue */}
      <div className="flex flex-col items-center">
        <label className="text-lg">Niveau de fatigue</label>
        <input
          type="range"
          min="1"
          max="10"
          value={fatigue || 5}
          onChange={(e) => setFatigue(Number(e.target.value))}
          className="mt-2 w-64"
        />
        <span>{fatigue || 5}</span>
      </div>

      {/* Question 2 - Niveau de stress */}
      <div className="flex flex-col items-center">
        <label className="text-lg">Niveau de stress</label>
        <input
          type="range"
          min="1"
          max="10"
          value={stress || 5}
          onChange={(e) => setStress(Number(e.target.value))}
          className="mt-2 w-64"
        />
        <span>{stress || 5}</span>
      </div>

      {/* Question 3 - Humeur générale */}
      <div className="flex flex-col items-center">
        <label className="text-lg">Humeur générale</label>
        <input
          type="range"
          min="1"
          max="10"
          value={mood || 5}
          onChange={(e) => setMood(Number(e.target.value))}
          className="mt-2 w-64"
        />
        <span>{mood || 5}</span>
      </div>

      <button
        className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Soumettre
      </button>
    </div>
  );
};

export default EmployeeDashboard;