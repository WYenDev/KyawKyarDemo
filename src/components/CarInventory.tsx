import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cars } from '../data/cars';
import { FilterOptions } from '../types';
import CarCard from './CarCard';
import CarFilter from './CarFilter';
import { Search } from 'lucide-react';
import { useGetApiCarsFilters } from '../services/api';

 const CarInventory: React.FC = () => {
   const { t } = useTranslation('cars');
 
   const [searchTerm, setSearchTerm] = useState('');

  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'year-new' | 'year-old' | 'mileage-low'>('price-low');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    models: [],
    priceRange: [0, 100000000],
    yearRange: [2010, 2024],
    mileageRange: [0, 200000],
    fuelTypes: [],
    transmissions: [],
    bodyTypes: [],
    status: []
  });

  // Fetch filter metadata from the API
  const { data: filterData, isLoading: filtersLoading, isError: filtersError } = useGetApiCarsFilters();
  const serverBrands = filterData?.brandsWithModels ? Object.keys(filterData.brandsWithModels) : undefined;
  const serverBrandModels = filterData?.brandsWithModels ?? undefined;

  const filteredAndSortedCars = useMemo(() => {
    const filtered = cars.filter(car => {
      // Search filter
      const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Brand filter
      const matchesBrand = filters.brands.length === 0 || filters.brands.includes(car.brand);
      
      // Model filter
      const matchesModel = filters.models.length === 0 || filters.models.includes(car.model);
      
      // Price filter
      const matchesPrice = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1];
      
      // Year filter
      const matchesYear = car.year >= filters.yearRange[0] && car.year <= filters.yearRange[1];
      
      // Mileage filter
      const matchesMileage = car.mileage >= filters.mileageRange[0] && car.mileage <= filters.mileageRange[1];
      
      // Fuel type filter
      const matchesFuelType = filters.fuelTypes.length === 0 || filters.fuelTypes.includes(car.fuelType);
      
      // Transmission filter
      const matchesTransmission = filters.transmissions.length === 0 || filters.transmissions.includes(car.transmission);
      
      // Body type filter
      const matchesBodyType = filters.bodyTypes.length === 0 || filters.bodyTypes.includes(car.bodyType);
      
      // Status filter
      const matchesStatus = filters.status.length === 0 || filters.status.includes(car.status);

      return matchesSearch && matchesBrand && matchesModel && matchesPrice && 
             matchesYear && matchesMileage && matchesFuelType && matchesTransmission && 
             matchesBodyType && matchesStatus;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'year-new':
          return b.year - a.year;
        case 'year-old':
          return a.year - b.year;
        case 'mileage-low':
          return a.mileage - b.mileage;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, filters, sortBy]);
 
  const availableCars = filteredAndSortedCars.filter(car => car.status === 'available');

  const soldCars = filteredAndSortedCars.filter(car => car.status === 'sold');
  const reservedCars = filteredAndSortedCars.filter(car => car.status === 'reserved');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('title')}</h1>
        <p className="text-xl text-slate-600">
          {t('subtitle')}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          {filtersLoading ? (
            <div className="p-4 text-sm text-slate-500">Loading filters...</div>
          ) : filtersError ? (
            <div className="p-4 text-sm text-red-500">Failed to load filters</div>
          ) : (
            <CarFilter
              filters={filters}
              onFiltersChange={setFilters}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              serverBrands={serverBrands}
              serverBrandModels={serverBrandModels}
            />
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
               <input
                 type="text"
                 placeholder="Search by brand or model..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
               />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'price-low' | 'price-high' | 'year-new' | 'year-old' | 'mileage-low')}
              className="px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
              <option value="mileage-low">Mileage: Low to High</option>
            </select>
          </div>

          {/* Results Summary */}
          <div className="mb-6 flex flex-wrap gap-4 text-sm">
            <div className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
              Available: {availableCars.length}
            </div>
            <div className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
              Sold: {soldCars.length}
            </div>
            <div className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
              Reserved: {reservedCars.length}
            </div>
            <div className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
              Total Results: {filteredAndSortedCars.length}
            </div>
          </div>

          {/* Car Grid */}
          {filteredAndSortedCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-slate-400 text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No cars found</h3>
              <p className="text-slate-600">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default CarInventory;