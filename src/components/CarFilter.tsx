import React from 'react';
import { useTranslation } from 'react-i18next'; // <-- Add this
import { FilterOptions } from '../types';
import { brands, fuelTypes, transmissions, bodyTypes, brandModels } from '../data/cars';
import { Filter, X } from 'lucide-react';

interface CarFilterProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const CarFilter: React.FC<CarFilterProps> = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const { t } = useTranslation('cars'); // <-- Use 'cars' namespace

  const updateFilters = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
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
  };

  const getAvailableModels = () => {
    if (filters.brands.length === 0) return [];
    
    const availableModels: string[] = [];
    filters.brands.forEach(brand => {
      if (brandModels[brand]) {
        availableModels.push(...brandModels[brand]);
      }
    });
    return availableModels;
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={onToggle}
          className="flex items-center space-x-2 bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Filter className="h-4 w-4" />
          <span>{t('filters.label', 'Filters')}</span>
        </button>
      </div>

      {/* Filter Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:shadow-none lg:bg-gray-50 lg:rounded-xl lg:p-6
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 lg:p-0 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 lg:mb-0 lg:block">
            <h3 className="text-lg font-semibold text-gray-900">{t('filters.label', 'Filters')}</h3>
            <div className="flex space-x-2">
              <button
                onClick={clearFilters}
                className="text-blue-700 hover:text-blue-800 text-sm"
              >
                {t('filters.clear', 'Clear All')}
              </button>
              <button
                onClick={onToggle}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('filters.price_range')}
              </label>
              <div className="space-y-2">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">{t('filters.min_price')}</label>
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
                    <label className="text-xs text-gray-500 mb-1 block">{t('filters.max_price')}</label>
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
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{(filters.priceRange[0] / 1000000).toFixed(0)}M</span>
                  <span>{(filters.priceRange[1] / 1000000).toFixed(0)}M</span>
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">{t('filters.brand')}</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFilters('brands', [...filters.brands, brand]);
                        } else {
                          updateFilters('brands', filters.brands.filter(b => b !== brand));
                          // Clear models when brand is unchecked
                          const remainingBrands = filters.brands.filter(b => b !== brand);
                          const availableModels = remainingBrands.flatMap(b => brandModels[b] || []);
                          updateFilters('models', filters.models.filter(m => availableModels.includes(m)));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Model Filter - Only show when brands are selected */}
            {filters.brands.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">{t('filters.model')}</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {getAvailableModels().map((model) => (
                    <label key={model} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.models.includes(model)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFilters('models', [...filters.models, model]);
                          } else {
                            updateFilters('models', filters.models.filter(m => m !== model));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{model}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Year Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('filters.year_range')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={filters.yearRange[0]}
                  onChange={(e) => updateFilters('yearRange', [parseInt(e.target.value), filters.yearRange[1]])}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {Array.from({ length: 15 }, (_, i) => 2010 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <select
                  value={filters.yearRange[1]}
                  onChange={(e) => updateFilters('yearRange', [filters.yearRange[0], parseInt(e.target.value)])}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {Array.from({ length: 15 }, (_, i) => 2010 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">{t('filters.fuel_type')}</label>
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
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{fuelType}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">{t('filters.transmission')}</label>
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
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{transmission}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">{t('filters.status')}</label>
              <div className="space-y-2">
                {['available', 'sold', 'reserved'].map((status) => (
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
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{t(`status.${status}`)}</span>
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default CarFilter;