'use client';

import { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/FirebaseConfig';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Initialiser Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DailyStat {
  date: string;
  fatigue: number;
  stress: number;
  mood: number;
}

const ManagerDashboard = () => {
  const [averageData, setAverageData] = useState({ fatigue: 0, stress: 0, mood: 0 });
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]); // Met à jour le type pour inclure des objets

  useEffect(() => {
    // Fonction pour récupérer les réponses des employés
    const fetchEmployeeResponses = async () => {
      try {
        const moodsQuery = query(collection(db, 'moods'));
        const querySnapshot = await getDocs(moodsQuery);

        // Variables pour calculer les moyennes
        let totalFatigue = 0;
        let totalStress = 0;
        let totalMood = 0;
        let totalResponses = 0;

        const dailyData: { [key: string]: { fatigue: number; stress: number; mood: number; count: number } } = {};

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const date = new Date(data.date).toLocaleDateString(); // Format de la date

          // Initialiser l'entrée pour la date si elle n'existe pas
          if (!dailyData[date]) {
            dailyData[date] = { fatigue: 0, stress: 0, mood: 0, count: 0 };
          }

          // Ajouter les valeurs
          dailyData[date].fatigue += data.fatigue;
          dailyData[date].stress += data.stress;
          dailyData[date].mood += data.mood;
          dailyData[date].count += 1;

          totalFatigue += data.fatigue;
          totalStress += data.stress;
          totalMood += data.mood;
          totalResponses += 1;
        });

        // Calculer les moyennes globales
        if (totalResponses > 0) {
          setAverageData({
            fatigue: totalFatigue / totalResponses,
            stress: totalStress / totalResponses,
            mood: totalMood / totalResponses,
          });
        }

        // Préparer les données journalières pour le graphique
        const dailyStatsArray: DailyStat[] = Object.keys(dailyData).map((date) => ({
          date,
          fatigue: dailyData[date].fatigue / dailyData[date].count,
          stress: dailyData[date].stress / dailyData[date].count,
          mood: dailyData[date].mood / dailyData[date].count,
        }));

        setDailyStats(dailyStatsArray); // Met à jour le tableau d'objets correctement typé
      } catch (error) {
        console.error('Erreur lors de la récupération des réponses des employés :', error);
      }
    };

    fetchEmployeeResponses();
  }, []);

  // Configuration des données pour le graphique
  const chartData = {
    labels: dailyStats.map((stat) => stat.date),
    datasets: [
      {
        label: 'Fatigue moyenne',
        data: dailyStats.map((stat) => stat.fatigue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Stress moyen',
        data: dailyStats.map((stat) => stat.stress),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Humeur moyenne',
        data: dailyStats.map((stat) => stat.mood),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h2 className="text-xl font-bold">Statistiques du jour</h2>

      {/* Affichage des moyennes */}
      <div className="flex flex-col space-y-2">
        <p>Niveau de fatigue moyen : {averageData.fatigue.toFixed(1)}</p>
        <p>Niveau de stress moyen : {averageData.stress.toFixed(1)}</p>
        <p>Humeur générale moyenne : {averageData.mood.toFixed(1)}</p>
      </div>

      {/* Graphique de l'évolution journalière */}
      <div className="w-96 h-64">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default ManagerDashboard;