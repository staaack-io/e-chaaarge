'use client';

import React, { useState } from 'react';
import { Edit, Save, ChevronLeft, ChevronRight } from 'lucide-react';

interface BorneFormData {
  id: number;
  nom: string;
  adresse: string;
  ville: string;
  image: string;
}

interface Abonnement {
  id: string;
  nom: string;
  prixKwh: number;
  prixMinute: number;
  couleur: string;
}

const generateBornes = (): BorneFormData[] => {
  const villes = [
    "Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier",
    "Bordeaux", "Lille", "Rennes", "Reims", "Le Havre", "Saint-Étienne", "Toulon", "Grenoble",
    "Dijon", "Angers", "Nîmes", "Villeurbanne"
  ];

  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    nom: `Borne ${villes[i % villes.length]} ${Math.floor(i / villes.length) + 1}`,
    adresse: `${Math.floor(Math.random() * 100) + 1} Rue ${['Principale', 'du Commerce', 'de la Liberté', 'de la République', 'de la Paix'][Math.floor(Math.random() * 5)]}`,
    ville: villes[i % villes.length],
    image: `https://source.unsplash.com/featured/?electric,charger&sig=${i}`
  }));
};

const AjoutBorne: React.FC = () => {
  const [bornes] = useState<BorneFormData[]>(generateBornes());
  const [currentBorneIndex, setCurrentBorneIndex] = useState(0);
  const [mode, setMode] = useState<'visualisation' | 'edition'>('visualisation');
  const [formData, setFormData] = useState<BorneFormData>(bornes[0]);

  const [abonnements] = useState<Abonnement[]>([
    { id: '1', nom: 'Chargemap', prixKwh: 0.45, prixMinute: 0.08, couleur: 'bg-blue-200' },
    { id: '2', nom: 'Ionity', prixKwh: 0.55, prixMinute: 0.12, couleur: 'bg-green-200' },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Données de la borne:', formData);
    bornes[currentBorneIndex] = formData;
    setMode('visualisation');
  };

  const toggleMode = () => {
    setMode(mode === 'visualisation' ? 'edition' : 'visualisation');
  };

  const goToPreviousBorne = () => {
    setCurrentBorneIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : bornes.length - 1));
    setFormData(bornes[currentBorneIndex > 0 ? currentBorneIndex - 1 : bornes.length - 1]);
    setMode('visualisation');
  };

  const goToNextBorne = () => {
    setCurrentBorneIndex((prevIndex) => (prevIndex < bornes.length - 1 ? prevIndex + 1 : 0));
    setFormData(bornes[currentBorneIndex < bornes.length - 1 ? currentBorneIndex + 1 : 0]);
    setMode('visualisation');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button onClick={goToPreviousBorne} className="bg-gray-200 hover:bg-gray-300 rounded-full p-2">
              <ChevronLeft size={24} />
            </button>
            <button onClick={goToNextBorne} className="bg-gray-200 hover:bg-gray-300 rounded-full p-2">
              <ChevronRight size={24} />
            </button>
          </div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={mode === 'edition'}
              onChange={toggleMode}
            />
            <span className="ml-2 text-gray-700">Mode édition</span>
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <img src={formData.image} alt={formData.nom} className="w-full h-48 object-cover rounded-lg mb-4" />
            {mode === 'edition' && (
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="URL de l'image"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
              Nom de la borne
            </label>
            {mode === 'edition' ? (
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nom"
                type="text"
                placeholder="Nom de la borne"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />
            ) : (
              <p className="py-2 px-3 bg-gray-100 rounded">{formData.nom}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adresse">
              Adresse
            </label>
            {mode === 'edition' ? (
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="adresse"
                type="text"
                placeholder="Adresse de la borne"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                required
              />
            ) : (
              <p className="py-2 px-3 bg-gray-100 rounded">{formData.adresse}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ville">
              Ville
            </label>
            {mode === 'edition' ? (
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ville"
                type="text"
                placeholder="Ville de la borne"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                required
              />
            ) : (
              <p className="py-2 px-3 bg-gray-100 rounded">{formData.ville}</p>
            )}
          </div>
          {mode === 'edition' && (
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                type="submit"
              >
                <Save className="mr-2" size={18} />
                Enregistrer les modifications
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-bold mb-4">Abonnements disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {abonnements.map((abonnement) => (
            <div key={abonnement.id} className={`border rounded-lg p-4 ${abonnement.couleur}`}>
              <h4 className="font-bold mb-2">{abonnement.nom}</h4>
              <p>Prix kWh: {abonnement.prixKwh.toFixed(2)} €</p>
              <p>Prix/min: {abonnement.prixMinute.toFixed(2)} €</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AjoutBorne;