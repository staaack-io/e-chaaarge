import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import AjoutBorne from './components/AjoutBorne';
import GestionBornes from './components/GestionBornes';
import AffichageBornes from './components/AffichageBornes';
import RechercheBornes from './components/RechercheBornes';
import CarteBornes from './components/CarteBornes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <Zap className="mr-2" />
              E-Charge
            </Link>
            <ul className="flex space-x-4">
              <li><Link to="/ajouter" className="hover:text-blue-200">Ajouter une borne</Link></li>
              <li><Link to="/gestion" className="hover:text-blue-200">Gestion des bornes</Link></li>
              <li><Link to="/affichage" className="hover:text-blue-200">Affichage des bornes</Link></li>
              <li><Link to="/recherche" className="hover:text-blue-200">Recherche</Link></li>
              <li><Link to="/carte" className="hover:text-blue-200">Carte</Link></li>
            </ul>
          </div>
        </nav>

        <div className="container mx-auto mt-8 p-4">
          <Routes>
            <Route path="/" element={<AffichageBornes />} />
            <Route path="/ajouter" element={<AjoutBorne />} />
            <Route path="/gestion" element={<GestionBornes />} />
            <Route path="/affichage" element={<AffichageBornes />} />
            <Route path="/recherche" element={<RechercheBornes />} />
            <Route path="/carte" element={<CarteBornes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;