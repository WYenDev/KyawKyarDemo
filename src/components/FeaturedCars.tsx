import React, { useState } from 'react';
import { cars } from '../data/cars';
import CarCard from './CarCard';
import CarModal from './CarModal';
import { Car } from '../types';

const FeaturedCars: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const featuredCars = cars.filter(car => car.isFeatured);

  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Cars</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Handpicked premium vehicles with exceptional value and quality. These cars represent 
            the best of our inventory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Car Detail Modal */}
        {selectedCar && (
          <CarModal
            car={selectedCar}
            isOpen={!!selectedCar}
            onClose={() => setSelectedCar(null)}
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;