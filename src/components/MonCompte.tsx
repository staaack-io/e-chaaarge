'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, CreditCard, Plus, X } from 'lucide-react';

interface UserInfo {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
}

interface Subscription {
  id: string;
  name: string;
}

const availableSubscriptions: Subscription[] = [
  { id: 'chargemap', name: 'Chargemap' },
  { id: 'chargepoint', name: 'Chargepoint' },
  { id: 'chargenow', name: 'Chargenow' },
];

const MonCompte: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@example.com',
    telephone: '0123456789',
    adresse: '123 Rue de la République, 75001 Paris'
  });

  const [subscriptions, setSubscriptions] = useState<string[]>([]);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Informations mises à jour:', userInfo);
    console.log('Abonnements:', subscriptions);
    alert('Informations et abonnements mis à jour avec succès !');
  };

  const handleAddSubscription = (subscriptionId: string) => {
    if (!subscriptions.includes(subscriptionId)) {
      setSubscriptions(prev => [...prev, subscriptionId]);
    }
    setShowSubscriptionModal(false);
  };

  const handleRemoveSubscription = (subscriptionId: string) => {
    setSubscriptions(prev => prev.filter(sub => sub !== subscriptionId));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
            <User className="inline mr-2" size={18} />
            Nom
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nom"
            type="text"
            placeholder="Nom"
            name="nom"
            value={userInfo.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prenom">
            <User className="inline mr-2" size={18} />
            Prénom
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="prenom"
            type="text"
            placeholder="Prénom"
            name="prenom"
            value={userInfo.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            <Mail className="inline mr-2" size={18} />
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telephone">
            <Phone className="inline mr-2" size={18} />
            Téléphone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="telephone"
            type="tel"
            placeholder="Téléphone"
            name="telephone"
            value={userInfo.telephone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adresse">
            <MapPin className="inline mr-2" size={18} />
            Adresse
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="adresse"
            type="text"
            placeholder="Adresse"
            name="adresse"
            value={userInfo.adresse}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            <CreditCard className="inline mr-2" size={18} />
            Mes abonnements
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {subscriptions.map((subId) => {
              const subscription = availableSubscriptions.find(s => s.id === subId);
              return (
                <div key={subId} className="bg-blue-100 p-4 rounded-lg flex justify-between items-center">
                  <span>{subscription?.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubscription(subId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setShowSubscriptionModal(true)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            <Plus className="mr-2" size={18} />
            Ajouter un abonnement
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            type="submit"
          >
            <Save className="mr-2" size={18} />
            Enregistrer les modifications
          </button>
        </div>
      </form>

      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Ajouter un abonnement</h3>
            <div className="grid grid-cols-1 gap-4">
              {availableSubscriptions.filter(sub => !subscriptions.includes(sub.id)).map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => handleAddSubscription(sub.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {sub.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowSubscriptionModal(false)}
              className="mt-4 text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonCompte;