import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Gauge, Fuel, Settings, MapPin, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import type { CarImage } from '../services/api';

function getImageUrl(img: CarImage, kind: 'main' | 'thumb'): string {
  const dyn = img as unknown as Record<string, unknown>;
  const key = kind === 'main' ? 'urlMain' : 'urlThumb';
  const dynUrl = typeof dyn[key] === 'string' ? (dyn[key] as string) : undefined;
  return dynUrl ?? img.storageBaseKey ?? '';
}


import { formatPriceLakhs } from '../utils/price';
import { Status, useGetApiCarsId } from '../services/api';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('cars');

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: carData, isLoading, isError } = useGetApiCarsId(id ?? '');

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-32 mb-4" />
          <div className="h-64 bg-slate-200 rounded mb-4" />
          <div className="h-4 bg-slate-200 rounded w-48" />
        </div>
      </div>
    );
  }

  if (isError || !carData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('details.back', 'Back')}
        </button>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{t('details.not_found_title', 'Car not found')}</h1>
        <p className="text-gray-600 mb-6">{t('details.not_found_description', 'The car you are looking for does not exist or may have been removed.')}</p>
        <button
          type="button"
          onClick={() => navigate('/buyCars')}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 text-sm font-medium"
        >
          {t('details.back_to_inventory', 'Back to inventory')}
        </button>
      </div>
    );
  }


  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? carData.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === carData.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb / Back */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('details.back', 'Back to results')}
          </button>
          <div className="text-xs text-gray-500 hidden sm:block">
            <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate('/')}>{t('details.breadcrumb_home', 'Home')}</span>
            <span className="mx-1">/</span>
            <span className="cursor-pointer hover:text-gray-800" onClick={() => navigate('/buyCars')}>{t('details.breadcrumb_inventory', 'Cars')}</span>
            <span className="mx-1">/</span>
            <span className="text-gray-700">{carData?.model?.brand?.name ?? ''} {carData?.model?.name ?? ''}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="relative bg-white rounded-2xl shadow-sm overflow-hidden">
              {carData.images[currentImageIndex] && (
                <img
                  src={getImageUrl(carData.images[currentImageIndex], 'main') || ''}
                  alt={`${carData.model?.brand?.name} ${carData?.model?.name}`}
                  className="w-full h-80 sm:h-96 object-cover"
                />
              )}

              {carData.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePreviousImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {carData.images.length > 1 && (
              <div className="mt-4 flex space-x-3 overflow-x-auto pb-2">
                {carData.images.map((image: CarImage, index: number) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors duration-200 ${
                      index === currentImageIndex ? 'border-blue-600' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={getImageUrl(image, 'thumb')}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {carData?.model?.brand?.name} {carData?.model?.name}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{carData.showroom?.city}</span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm text-gray-500 mb-1">{t('details.price_label', 'Price')}</div>
                <div className="text-3xl font-extrabold text-blue-700">
                  {formatPriceLakhs(carData.price)}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  carData.status === Status.Available 
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : carData.status === Status.Sold
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                }`}
              >
                {t(`status.${carData.status}`)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm text-gray-700">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">{t('details.year', 'Year')}</div>
                  <div className="font-medium">{carData.modelYear}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Gauge className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">{t('details.mileage', 'Mileage')}</div>
                  <div className="font-medium">{carData.mileage.toLocaleString()} km</div>
                </div>
              </div>
              <div className="flex items-center">
                <Fuel className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">{t('details.fuel_type', 'Fuel Type')}</div>
                  <div className="font-medium">{carData.fuel}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Settings className="h-4 w-4 mr-2 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-500">{t('details.transmission', 'Transmission')}</div>
                  <div className="font-medium">{carData.transmission}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-10">
              <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors">
                {t('details.call_now', 'Call Now: +95-9-123-456-789')}
              </button>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors">
                {t('details.request_info', 'Request More Info')}
              </button>
              <button className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors">
                {t('details.schedule_test_drive', 'Schedule Test Drive')}
              </button>
            </div>
          </div>
        </div>

        {/* Detailed sections */}
        <div className="mt-12 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {t('details.overview', 'Car Overview')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {'description not available'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('details.key_details', 'Key Details')}
            </h2>
            <dl className="space-y-2 text-sm">
              {carData.color && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">{t('details.color', 'Color')}</dt>
                  <dd className="text-gray-900 font-medium">{carData?.color.name}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-500">{t('details.location', 'Location')}</dt>
                <dd className="text-gray-900 font-medium">{carData.showroom?.city}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Features */}
        {/*
        {car.features && car.features.length > 0 && (
          <div className="mt-10 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('details.features', 'Features')}
            </h2>
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature: string) => (
                <span
                  key={feature}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
*/}
      </div>
    </div>
  );
};

export default CarDetails;
