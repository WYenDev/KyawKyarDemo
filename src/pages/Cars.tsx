import React from 'react';
import CarInventory from '../components/CarInventory';

const Cars: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <CarInventory />
    </div>
  );
};

export default Cars;