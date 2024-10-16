'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Définir l'URL de base pour les images
const ICON_URL_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';

// Créer une icône personnalisée
const customIcon = new L.Icon({
  iconUrl: `${ICON_URL_BASE}marker-icon.png`,
  iconRetinaUrl: `${ICON_URL_BASE}marker-icon-2x.png`,
  shadowUrl: `${ICON_URL_BASE}marker-shadow.png`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Borne {
  id: number;
  nom: string;
  adresse: string;
  ville: string;
  latitude: number;
  longitude: number;
}

interface Abonnement {
  id: string;
  nom: string;
  prixKwh: number;
  prixMinute: number;
  couleur: string;
}

const bornes: Borne[] = [
  { id: 1, nom: "Borne Centre-Ville", adresse: "1 Rue de la République", ville: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { id: 2, nom: "Borne Gare", adresse: "Place de la Gare", ville: "Lyon", latitude: 45.7578, longitude: 4.8320 },
  { id: 3, nom: "Borne Parc", adresse: "Avenue du Parc", ville: "Marseille", latitude: 43.2965, longitude: 5.3698 },
];

const abonnements: Abonnement[] = [
  { id: '1', nom: 'Chargemap', prixKwh: 0.45, prixMinute: 0.08, couleur: 'bg-blue-200' },
  { id: '2', nom: 'Ionity', prixKwh: 0.55, prixMinute: 0.12, couleur: 'bg-green-200' },
];

const Map: React.FC = () => {
  return (
    <MapContainer center={[46.603354, 1.888334]} zoom={6} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {bornes.map((borne) => (
        <Marker key={borne.id} position={[borne.latitude, borne.longitude]} icon={customIcon}>
          <Popup>
            <div className="max-w-sm">
              <h3 className="text-lg font-bold mb-2">{borne.nom}</h3>
              <p className="mb-1"><strong>Adresse:</strong> {borne.adresse}</p>
              <p className="mb-3"><strong>Ville:</strong> {borne.ville}</p>
              <h4 className="font-semibold mb-2">Abonnements disponibles:</h4>
              <div className="grid grid-cols-1 gap-2">
                {abonnements.map((abonnement) => (
                  <div key={abonnement.id} className={`p-2 rounded ${abonnement.couleur}`}>
                    <p className="font-medium">{abonnement.nom}</p>
                    <p className="text-sm">Prix kWh: {abonnement.prixKwh.toFixed(2)} €</p>
                    <p className="text-sm">Prix/min: {abonnement.prixMinute.toFixed(2)} €</p>
                  </div>
                ))}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;