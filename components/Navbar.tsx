'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white bg-opacity-50 backdrop-blur-lg shadow-lg flex justify-between items-center px-6 py-4" style={{ clipPath: 'ellipse(75% 100% at 50% 100%)' }}>
      
      {/* Icône de gauche - Articles */}
      <Link href="/home/articles" className={`flex flex-col items-center ${isActive('/home/articles') ? 'text-orange-500' : 'text-gray-400'} transition duration-300`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4C7.58 4 4 6.58 4 10v10c0 .55.45 1 1 1h14c.55 0 1-.45 1-1V10c0-3.42-3.58-6-8-6zM7 18h10v-1H7v1zm7-5H7v1h7v-1zm3-3H7v1h10V10zm-3-4.4c3.48.48 6 2.51 6 4.4H6c0-1.89 2.52-3.92 6-4.4z"/>
        </svg>
        <span className="text-sm font-semibold">Articles</span>
      </Link>

      {/* Bouton central - Mood avec un cercle qui dépasse */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -top-10 transform translate-x-0">
          <button
            className="flex items-center justify-center w-16 h-16 bg-[#FFAC5E] rounded-full shadow-lg transition transform hover:scale-110"
            onClick={() => router.push('/home')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm0 22c-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-14a2 2 0 11.001 4.001A2 2 0 0112 8zm-4 8h8c0-2-3.58-2-4-2s-4 0-4 2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Icône de droite - Profil */}
      <Link href="/home/profile" className={`flex flex-col items-center ${isActive('/home/profile') ? 'text-orange-500' : 'text-gray-400'} transition duration-300`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C9.24 2 7 4.24 7 7s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zm0 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <span className="text-sm font-semibold">Profil</span>
      </Link>
    </nav>
  );
};

export default Navbar;
