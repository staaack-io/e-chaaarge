'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <p className="text-center py-4">Chargement de la carte...</p>
});

const CarteBornes: React.FC = () => {
  return (
    <div className="h-full w-full">
      <MapWithNoSSR />
    </div>
  );
};

export default CarteBornes;