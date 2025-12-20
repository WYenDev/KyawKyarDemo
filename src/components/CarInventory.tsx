import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterOptions } from '../types';
import CarCard from './CarCard';
import CarFilter from './CarFilter';
import { Search } from 'lucide-react';
import { useGetApiCarsSearch, useGetApiCarsFilters } from '../services/api';
import type { GetApiCarsSearchParams } from '../services/api';
import { Status } from '../services/api';

 const CarInventory: React.FC = () => {
   const { t } = useTranslation('cars');
 
   const [searchTerm, setSearchTerm] = useState('');

  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'year-new' | 'year-old' | 'mileage-low'>('price-low');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    brand: '',
    model: '',
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

  // Build search params from filters and search term
  const buildSearchParams = (): GetApiCarsSearchParams => {
    const params: GetApiCarsSearchParams = {};
    if (filters.model) params.model = filters.model;
    if (filters.brand) params.brand = filters.brand;
    if (filters.priceRange) {
      params.priceMin = filters.priceRange[0];
      params.priceMax = filters.priceRange[1];
    }
    if (filters.yearRange) {
      params.yearMin = filters.yearRange[0];
      params.yearMax = filters.yearRange[1];
    }
    // map first fuel and transmission if set (API expects single values)
    if (filters.fuelTypes && filters.fuelTypes.length > 0) params.fuel = filters.fuelTypes[0] as any;
    if (filters.transmissions && filters.transmissions.length > 0) params.transmission = filters.transmissions[0] as any;
    // include search term as brand/model fallback
    if (searchTerm) {
      // give priority to model search
      params.model = params.model || searchTerm;
      params.brand = params.brand || searchTerm;
    }
    return params;
  };

  const searchParams = buildSearchParams();

  const { data: searchResponse, isLoading: carsLoading, isError: carsError } = useGetApiCarsSearch(searchParams);


  const availableCars = searchResponse?.items?.filter(car => car.status === Status.Available);
  const soldCars = searchResponse?.items?.filter(car => car.status === Status.Sold);
  const totalCount = searchResponse?.total ?? 0;

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
              Available: {availableCars?.length}
            </div>
            <div className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
              Sold: {soldCars?.length}
            </div>
            <div className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full">
              Total Results: {totalCount}
            </div>
          </div>

          {/* Car Grid */}
          {carsLoading ? (
            <div className="p-6 text-sm text-slate-500">Loading cars...</div>
          ) : carsError ? (
            <div className="p-6 text-sm text-red-500">Failed to load cars</div>
          ) : searchResponse?.total && searchResponse.total > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {searchResponse?.items?.map((car) => (
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
