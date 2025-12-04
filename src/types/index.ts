import { Car } from 'lucide-react';

export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  status: 'available' | 'sold' | 'reserved';
  location: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  // Add other fields as needed
}
