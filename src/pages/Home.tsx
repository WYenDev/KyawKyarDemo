import React from 'react';
import Hero from '../components/Hero';
import FeaturedCars from '../components/FeaturedCars';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeaturedCars />
    </div>
  );
};

export default Home;