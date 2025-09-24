import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Phone, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-700" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">KyawKyar</h1>
              <p className="text-xs text-gray-600">Myanmar's #1 Used Car Dealer</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              className={`font-medium transition-colors ${
                isActive('/cars') ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              Cars
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${
                isActive('/about') ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              About
            </Link>
            <Link 
              to="/reviews" 
              className={`font-medium transition-colors ${
                isActive('/reviews') ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              Reviews
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                isActive('/contact') ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'
              }`}
            >
              Contact
            </Link>
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
              <Link 
                to="/" 
                className={`py-2 ${isActive('/') ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/cars" 
                className={`py-2 ${isActive('/cars') ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Cars
              </Link>
              <Link 
                to="/about" 
                className={`py-2 ${isActive('/about') ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/reviews" 
                className={`py-2 ${isActive('/reviews') ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                to="/contact" 
                className={`py-2 ${isActive('/contact') ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
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
