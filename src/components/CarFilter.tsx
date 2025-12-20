import React from 'react';
import { FilterOptions } from '../types';
import { brands as localBrands, fuelTypes, transmissions, brandModels as localBrandModels } from '../data/cars';
import { Filter, X } from 'lucide-react';
import { formatPriceLakhs } from '../utils/price';

interface CarFilterProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
  serverBrands?: string[];
  serverBrandModels?: Record<string, string[]>;
}

const CarFilter: React.FC<CarFilterProps> = ({ filters, onFiltersChange, isOpen, onToggle, serverBrands, serverBrandModels }) => {

  const updateFilters = (key: keyof FilterOptions, value: FilterOptions[keyof FilterOptions]) => {
    onFiltersChange({ ...filters, [key]: value } as FilterOptions);
  };

  const clearFilters = () => {
    onFiltersChange({
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
  };

  const brandsToShow = serverBrands && serverBrands.length > 0 ? serverBrands : localBrands;
  const brandModelsToUse = serverBrandModels && Object.keys(serverBrandModels).length > 0 ? serverBrandModels : localBrandModels;

  const getAvailableModels = () => {
    if (!filters.brand) return [];
    return brandModelsToUse[filters.brand] || [];
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:shadow-none lg:bg-slate-50 lg:rounded-xl lg:p-6
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 lg:p-0 h-full lg:h-auto overflow-y-auto lg:overflow-visible">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 lg:mb-0">
            <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={onToggle}
                className="lg:hidden text-slate-500 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                onClick={clearFilters}
                className="text-indigo-600 hover:text-teal-700 text-sm"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Price Range
              </label>
              <div className="space-y-2">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Min price</label>
                    <input
                      type="range"
                      min="0"
                      max="100000000"
                      step="1000000"
                      value={filters.priceRange[0]}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value);
                        if (newMin <= filters.priceRange[1]) {
                          updateFilters('priceRange', [newMin, filters.priceRange[1]]);
                        }
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Max price</label>
                    <input
                      type="range"
                      min="0"
                      max="100000000"
                      step="1000000"
                      value={filters.priceRange[1]}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value);
                        if (newMax >= filters.priceRange[0]) {
                          updateFilters('priceRange', [filters.priceRange[0], newMax]);
                        }
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{formatPriceLakhs(filters.priceRange[0])}</span>
                  <span>{formatPriceLakhs(filters.priceRange[1])}</span>
                </div>
              </div>
            </div>

            {/* Brand Filter - single select */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Brand</label>
              <select
                value={filters.brand}
                onChange={(e) => {
                  const newBrand = e.target.value;
                  const availableModels = brandModelsToUse[newBrand] || [];
                  const retainedModel = availableModels.includes(filters.model) ? filters.model : '';
                  onFiltersChange({ ...filters, brand: newBrand, model: retainedModel });
                }}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
              >
                <option value="">All</option>
                {brandsToShow.map((brand: string) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Model Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Model</label>
              <select
                value={filters.model}
                onChange={(e) => updateFilters('model', e.target.value as any)}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm"
                disabled={!filters.brand}
              >
                <option value="">All</option>
                {getAvailableModels().map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            {/* Year Range */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Year Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={filters.yearRange[0]}
                  onChange={(e) => updateFilters('yearRange', [parseInt(e.target.value), filters.yearRange[1]])}
                  className="border border-slate-200 rounded-md px-3 py-2 text-sm"
                >
                  {Array.from({ length: 15 }, (_, i) => 2010 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select
                  value={filters.yearRange[1]}
                  onChange={(e) => updateFilters('yearRange', [filters.yearRange[0], parseInt(e.target.value)])}
                  className="border border-slate-200 rounded-md px-3 py-2 text-sm"
                >
                  {Array.from({ length: 15 }, (_, i) => 2010 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Fuel Type</label>
              <div className="space-y-2">
                {fuelTypes.map((fuelType) => (
                  <label key={fuelType} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.fuelTypes.includes(fuelType)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilters('fuelTypes', [...filters.fuelTypes, fuelType]);
                        } else {
                          updateFilters('fuelTypes', filters.fuelTypes.filter(f => f !== fuelType));
                        }
                      }}
                      className="rounded border-slate-200 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-slate-700">{fuelType}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Transmission</label>
              <div className="space-y-2">
                {transmissions.map((transmission) => (
                  <label key={transmission} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.transmissions.includes(transmission)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilters('transmissions', [...filters.transmissions, transmission]);
                        } else {
                          updateFilters('transmissions', filters.transmissions.filter(t => t !== transmission));
                        }
                      }}
                      className="rounded border-slate-200 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-slate-700">{transmission}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Status</label>
              <div className="space-y-2">
                 {(['available', 'sold', 'reserved'] as const).map((status) => (

                  <label key={status} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilters('status', [...filters.status, status]);
                        } else {
                          updateFilters('status', filters.status.filter(s => s !== status));
                        }
                      }}
                      className="rounded border-slate-200 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-slate-700 capitalize">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default CarFilter;
