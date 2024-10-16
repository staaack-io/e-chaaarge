'use client';

import React, { useState } from 'react';
import { Edit, Trash2, Save, X } from 'lucide-react';

interface Borne {
  id: number;
  nom: string;
  adresse: string;
  prixKwh: number;
  prixMinute: number;
}

const GestionBornes: React.FC = () => {
  const [bornes, setBornes] = useState<Borne[]>([
    { id: 1, nom: "Borne Centre-Ville", adresse: "1 Rue de la République, 75001 Paris", prixKwh: 0.50, prixMinute: 0.10 },
    { id: 2, nom: "Borne Gare", adresse: "Place de la Gare, 69003 Lyon", prixKwh: 0.45, prixMinute: 0.08 },
    { id: 3, nom: "Borne Parc", adresse: "Avenue du Parc, 33000 Bordeaux", prixKwh: 0.55, prixMinute: 0.12 },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Borne | null>(null);

  const handleDelete = (id: number) => {
    setBornes(bornes.filter(borne => borne.id !== id));
  };

  const handleEdit = (borne: Borne) => {
    setEditingId(borne.id);
    setEditForm({ ...borne });
  };

  const handleSave = () => {
    if (editForm) {
      setBornes(bornes.map(borne => borne.id === editForm.id ? editForm : borne));
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editForm) {
      setEditForm({
        ...editForm,
        [e.target.name]: e.target.name === 'prixKwh' || e.target.name === 'prixMinute'
          ? parseFloat(e.target.value)
          : e.target.value
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Gestion des bornes de recharge</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Nom</th>
              <th className="py-2 px-4 border-b">Adresse</th>
              <th className="py-2 px-4 border-b">Prix kWh</th>
              <th className="py-2 px-4 border-b">Prix/min</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bornes.map((borne) => (
              <tr key={borne.id}>
                <td className="py-2 px-4 border-b">
                  {editingId === borne.id ? (
                    <input
                      type="text"
                      name="nom"
                      value={editForm?.nom}
                      onChange={handleChange}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    borne.nom
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingId === borne.id ? (
                    <input
                      type="text"
                      name="adresse"
                      value={editForm?.adresse}
                      onChange={handleChange}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    borne.adresse
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingId === borne.id ? (
                    <input
                      type="number"
                      name="prixKwh"
                      value={editForm?.prixKwh}
                      onChange={handleChange}
                      className="w-full p-1 border rounded"
                      step="0.01"
                    />
                  ) : (
                    `${borne.prixKwh.toFixed(2)} €`
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingId === borne.id ? (
                    <input
                      type="number"
                      name="prixMinute"
                      value={editForm?.prixMinute}
                      onChange={handleChange}
                      className="w-full p-1 border rounded"
                      step="0.01"
                    />
                  ) : (
                    `${borne.prixMinute.toFixed(2)} €`
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingId === borne.id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-800 mr-2"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(borne)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(borne.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionBornes;