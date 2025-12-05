export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color?: string;
  status: 'available' | 'sold' | 'reserved';
  location: string;
  features: string[];
  description: string;
  isFeatured?: boolean;
  isPopular?: boolean;
}

export interface FilterOptions {
  brands: string[];
  models: string[];
  priceRange: [number, number];
  yearRange: [number, number];
  mileageRange: [number, number];
  fuelTypes: string[];
  transmissions: string[];
  bodyTypes: string[];
  status: Array<'available' | 'sold' | 'reserved'>;
}
