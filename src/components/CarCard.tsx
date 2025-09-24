import React from 'react';
import { Car } from '../types';
import { Calendar, Gauge, Fuel, Settings, MapPin, Eye } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onViewDetails: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onViewDetails }) => {
  const formatPrice = (price: number) => {
    return `${(price / 1000000).toFixed(1)}M MMK`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'sold':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img 
          src={car.images[0]} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {car.isFeatured && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
          {car.isPopular && (
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Popular
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(car.status)}`}>
            {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {car.brand} {car.model}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {car.location}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            {car.year}
          </div>
          <div className="flex items-center">
            <Gauge className="h-4 w-4 mr-2 text-gray-400" />
            {car.mileage.toLocaleString()} km
          </div>
          <div className="flex items-center">
            <Fuel className="h-4 w-4 mr-2 text-gray-400" />
            {car.fuelType}
          </div>
          <div className="flex items-center">
            <Settings className="h-4 w-4 mr-2 text-gray-400" />
            {car.transmission}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-700">
            {formatPrice(car.price)}
          </div>
          <button
            onClick={() => onViewDetails(car)}
            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;