import React, { useState } from 'react';
import { Car, Phone, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-700" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AutoMax Myanmar</h1>
              <p className="text-xs text-gray-600">Myanmar's #1 Used Car Dealer</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-blue-700">
              <Phone className="h-4 w-4" />
              <span className="font-semibold">+95-9-123-456-789</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-gray-700 hover:text-blue-700 py-2">Home</a>
              <a href="#inventory" className="text-gray-700 hover:text-blue-700 py-2">Cars</a>
              <a href="#about" className="text-gray-700 hover:text-blue-700 py-2">About</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-700 py-2">Reviews</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-700 py-2">Contact</a>
              <div className="flex items-center space-x-2 text-blue-700 py-2">
                <Phone className="h-4 w-4" />
                <span>+95-9-123-456-789</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;