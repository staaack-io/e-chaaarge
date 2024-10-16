import Link from 'next/link';
import { Zap, User } from 'lucide-react';

const Header = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center hover:text-blue-200 transition-colors">
          <Zap className="mr-2" />
          e-chaaarge
        </Link>
        <ul className="flex space-x-6">
          <li><Link href="/ajouter" className="hover:text-blue-200 transition-colors">Ajouter</Link></li>
          <li><Link href="/gestion" className="hover:text-blue-200 transition-colors">Gestion</Link></li>
          <li><Link href="/affichage" className="hover:text-blue-200 transition-colors">Affichage</Link></li>
          <li><Link href="/recherche" className="hover:text-blue-200 transition-colors">Recherche</Link></li>
          <li><Link href="/carte" className="hover:text-blue-200 transition-colors">Carte</Link></li>
          <li><Link href="/mon-compte" className="hover:text-blue-200 transition-colors flex items-center"><User className="mr-1" size={18} />Mon compte</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;