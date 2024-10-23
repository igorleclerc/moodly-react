'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-white shadow-md flex justify-between items-center px-6 py-4">
      {/* Icône de gauche - Articles */}
      <Link href="/home/articles" className={`flex flex-col items-center ${isActive('/home/articles') ? 'text-orange-500' : 'text-gray-400'} transition duration-300`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 20a2 2 0 002-2H8a2 2 0 002 2zm7-6V8a7 7 0 00-14 0v6H1v2h18v-2h-2zM6 8a4 4 0 118 0v6H6V8z" />
        </svg>
        <span className="text-sm font-semibold">Articles</span>
      </Link>

      {/* Bouton central - Mood */}
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2 flex justify-center">
          <button
            className="flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full shadow-lg transition transform hover:scale-110"
            onClick={() => router.push('/home')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.707-7.707a1 1 0 011.414 0L10 11.586l.707-.707a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Icône de droite - Profil */}
      <Link href="/home/profile" className={`flex flex-col items-center ${isActive('/home/profile') ? 'text-orange-500' : 'text-gray-400'} transition duration-300`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 10a4 4 0 110-8 4 4 0 010 8zm-2 5a6 6 0 1112 0H8z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-semibold">Profil</span>
      </Link>
    </nav>
  );
};

export default Navbar;