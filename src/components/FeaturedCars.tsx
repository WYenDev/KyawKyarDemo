import React from 'react';
import { cars } from '../data/cars';
import CarCard from './CarCard';
 
const FeaturedCars: React.FC = () => {
  const featuredCars = cars.filter(car => car.isFeatured);


  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Featured Cars</h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Handpicked premium vehicles with exceptional value and quality. These cars represent the best of our inventory.
            </p>
          </div>
          <div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold shadow">
              View All Cars
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCars;