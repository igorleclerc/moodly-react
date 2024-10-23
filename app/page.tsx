'use client'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/FirebaseConfig';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home'); // Redirection après connexion
    } catch (err) {
      setError('Identifiants incorrects. Veuillez réessayer.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full h-full p-8 flex flex-col justify-center bg-white">
        {/* Logo */}
        <img src="/logo_moodly.svg" alt="Moodly logo" className="mx-auto h-16 w-auto mb-6" />

        {/* Titre */}
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-8">Se connecter</h2>
        
        {/* Formulaire */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">Adresse mail</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Adresse mail"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Mot de passe"
              />
            </div>
          </div>

          {/* Message d'erreur */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Bouton de connexion */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-3xl text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Let's start!
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;
