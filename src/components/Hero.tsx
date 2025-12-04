import React from 'react';
import { Search, Award, Users, Car } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation('home');
  const { t: tCommon } = useTranslation('common');

  return (
    <section id="home" className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {t('hero.badge')}
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title_prefix')}{' '}
              <span className="text-orange-400">{t('hero.title_suffix')}</span>
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                {tCommon('buttons.browse_cars')}
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                {tCommon('buttons.get_consultation')}
              </button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Featured Car"
              className="rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-xl shadow-xl">
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-orange-500" />
                <div>
                  <div className="font-bold text-lg">{t('hero.experience_badge.years')}</div>
                  <div className="text-sm text-gray-600">{t('hero.experience_badge.label')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-12 border-t border-blue-600">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Car className="h-8 w-8 text-orange-400" />
            </div>
            <div className="text-3xl font-bold mb-2">5000+</div>
            <div className="text-blue-200">{t('stats.cars_sold')}</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Users className="h-8 w-8 text-orange-400" />
            </div>
            <div className="text-3xl font-bold mb-2">3500+</div>
            <div className="text-blue-200">{t('stats.happy_customers')}</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Award className="h-8 w-8 text-orange-400" />
            </div>
            <div className="text-3xl font-bold mb-2">15+</div>
            <div className="text-blue-200">{t('stats.years_experience')}</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Search className="h-8 w-8 text-orange-400" />
            </div>
            <div className="text-3xl font-bold mb-2">200+</div>
            <div className="text-blue-200">{t('stats.cars_available')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;