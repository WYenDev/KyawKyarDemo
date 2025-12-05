import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Phone, Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation('common'); // Use 'common' namespace
  const currentLang = i18n.language;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) => {
    const active = isActive(path);
    return `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
    }`;
  };

  const handleLanguageChange = () => {
    const newLang = currentLang === 'en' ? 'mm' : 'en';
    i18n.changeLanguage(newLang);
  };

  // Use keys from common.json for navigation
  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/buyCars', label: t('nav.buyCars') },
    { path: '/sellCars', label: t('nav.sellCars') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || isMenuOpen
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200'
          : 'bg-white/50 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform duration-200">
              <Car className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-blue-700 transition-colors">
                KyawKyar
              </h1>
              <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                {/* You may want to move tagline to common.json or home.json */}
                {t('tagline', "Myanmar's #1 Used Car Dealer")}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Centered Pill */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1.5 rounded-full border border-gray-200/50 backdrop-blur-sm">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={navLinkClass(item.path)}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleLanguageChange}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
              aria-label="Toggle Language"
            >
              <Globe className="h-4 w-4 text-gray-500 group-hover:text-blue-600" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                {t(`nav.language`)}
              </span>
            </button>

            <a
              href="tel:+959123456789"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200"
              aria-label={t('buttons.call_us')}
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl animate-in slide-in-from-top-5 duration-200">
          <div className="px-4 py-6 space-y-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  handleLanguageChange();
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <Globe className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-700">
                  {currentLang === 'en' ? 'English' : 'မြန်မာ'}
                </span>
              </button>
              <a
                href="tel:+959123456789"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Phone className="h-5 w-5" />
                <span className="font-medium">{t('buttons.call_us')}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
