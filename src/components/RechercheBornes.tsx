'use client';

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface Borne {
  id: number;
  nom: string;
  adresse: string;
  prixKwh: number;
  prixMinute: number;
  disponible: boolean;
}

const RechercheBornes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bornes] = useState<Borne[]>([
    { id: 1, nom: "Borne Centre-Ville", adresse: "1 Rue de la République, 75001 Paris", prixKwh: 0.50, prixMinute: 0.10, disponible: true },
    { id: 2, nom: "Borne Gare", adresse: "Place de la Gare, 69003 Lyon", prixKwh: 0.45, prixMinute: 0.08, disponible: false },
    { id: 3, nom: "Borne Parc", adresse: "Avenue du Parc, 33000 Bordeaux", prixKwh: 0.55, prixMinute: 0.12, disponible: true },
  ]);

  const filteredBornes = bornes.filter(borne =>
    borne.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    borne.adresse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Recherche de bornes de recharge</h2>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher par nom ou adresse"
            className="w-full p-2 pl-10 pr-4 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBornes.map((borne) => (
          <div key={borne.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">{borne.nom}</h3>
              <p className="text-gray-700 text-base flex items-center mb-2">
                <MapPin className="mr-2" size={18} />
                {borne.adresse}
              </p>
              <p className="text-gray-700 text-base mb-2">
                Prix kWh: <span className="font-semibold">{borne.prixKwh.toFixed(2)} €</span>
              </p>
              <p className="text-gray-700 text-base mb-2">
                Prix/min: <span className="font-semibold">{borne.prixMinute.toFixed(2)} €</span>
              </p>
              <div className={`flex items-center ${borne.disponible ? 'text-green-500' : 'text-red-500'}`}>
                <span className="font-semibold">
                  {borne.disponible ? 'Disponible' : 'Occupée'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RechercheBornes;