import React from 'react';
import { Car, Facebook, MessageCircle, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation('footer');

  return (
    <footer className="bg-slate-900 text-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
              <Car className="h-8 w-8 text-indigo-400" />
              <div>
                <h3 className="text-2xl font-bold text-slate-50">KyawKyaw</h3>
                <p className="text-sm text-slate-300">{t('tagline')}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('quick_links')}</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">{t('quick_links_home', 'Home')}</a></li>
              <li><a href="#inventory" className="text-gray-300 hover:text-white transition-colors">{t('quick_links_inventory', 'Car Inventory')}</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">{t('quick_links_about', 'About Us')}</a></li>
              <li><a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">{t('quick_links_testimonials', 'Customer Reviews')}</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">{t('quick_links_contact', 'Contact')}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('services.title')}</h4>
            <ul className="space-y-2 text-gray-300">
              <li>{t('services.buy')}</li>
              <li>{t('services.sell')}</li>
              <li>{t('services.financing')}</li>
              <li>{t('services.trade_in')}</li>
              <li>{t('services.insurance')}</li>
              <li>{t('services.after_sale')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div className="text-gray-400 text-sm">
              <p>{t('copyright')}</p>
              <p>{t('license')}</p>
            </div>
            <div className="md:text-right">
              <div className="flex items-center justify-start md:justify-end space-x-4 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+95-9-123-456-789</span>
                <Mail className="h-4 w-4" />
                <span>info@automaxmyanmar.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;