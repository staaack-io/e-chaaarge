import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <Zap className="mr-2" />
            E-Charge
          </Link>
          <ul className="flex space-x-4">
            <li><Link href="/ajouter" className="hover:text-blue-200">Ajouter une borne</Link></li>
            <li><Link href="/gestion" className="hover:text-blue-200">Gestion des bornes</Link></li>
            <li><Link href="/affichage" className="hover:text-blue-200">Affichage des bornes</Link></li>
            <li><Link href="/recherche" className="hover:text-blue-200">Recherche</Link></li>
            <li><Link href="/carte" className="hover:text-blue-200">Carte</Link></li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;