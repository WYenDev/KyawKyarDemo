import React from 'react';
import { Search, Award, Car } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const { t } = useTranslation('home');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();

  const goToInventory = () => navigate('/buyCars');

  return (
    <section id="home" className="bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {t('hero.badge')}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-slate-900">
              {t('hero.title_prefix')} <span className="text-indigo-600">{t('hero.title_suffix')}</span>
            </h2>
            <p className="text-lg sm:text-xl mb-6 text-slate-600 max-w-2xl">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
<button onClick={goToInventory} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold text-base transition-colors shadow">
                 {tCommon('buttons.browse_cars')}
               </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-6 py-3 rounded-lg font-semibold text-base transition-colors">
                {tCommon('buttons.get_consultation')}
              </button>
            </div>


          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-102 transition-transform duration-300">
              <img
                src="https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Featured Car"
                className="w-full h-[380px] object-cover"
              />
            </div>

            <div className="absolute -bottom-8 left-6 bg-white text-gray-900 p-5 rounded-xl shadow-xl w-56">
              <div className="flex items-center space-x-3">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 pt-12 border-t border-slate-200">
          <div className="flex items-start space-x-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <Car className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">5000+</div>
              <div className="text-slate-500 text-sm">{t('stats.cars_sold')}</div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <Award className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">15+</div>
              <div className="text-slate-500 text-sm">{t('stats.years_experience')}</div>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <Search className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">200+</div>
              <div className="text-slate-500 text-sm">{t('stats.cars_available')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

};

export default Hero;