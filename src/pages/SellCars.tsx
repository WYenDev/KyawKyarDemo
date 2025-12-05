import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Car, Shield, Clock, BadgeDollarSign, MessageCircle } from 'lucide-react';

interface SellCarFormValues {
  ownerName: string;
  phone: string;
  email: string;
  carBrand: string;
  carModel: string;
  year: string;
  mileage: string;
  expectedPrice: string;
  condition: string;
  message: string;
}

type SellCarFormField = keyof Pick<
  SellCarFormValues,
  'ownerName' | 'phone' | 'carBrand' | 'carModel' | 'year'
>;

type SellCarFormErrors = Partial<Record<SellCarFormField, string>>;

const initialValues: SellCarFormValues = {
  ownerName: '',
  phone: '',
  email: '',
  carBrand: '',
  carModel: '',
  year: '',
  mileage: '',
  expectedPrice: '',
  condition: '',
  message: '',
};

const SellCars: React.FC = () => {
  const { t } = useTranslation('cars');
  const [values, setValues] = useState<SellCarFormValues>(initialValues);
  const [errors, setErrors] = useState<SellCarFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: SellCarFormErrors = {};

    if (!values.ownerName.trim()) {
      newErrors.ownerName = `${t('sell.form.owner_name')} is required`;
    }
    if (!values.phone.trim()) {
      newErrors.phone = `${t('sell.form.phone')} is required`;
    }
    if (!values.carBrand.trim()) {
      newErrors.carBrand = `${t('sell.form.car_brand')} is required`;
    }
    if (!values.carModel.trim()) {
      newErrors.carModel = `${t('sell.form.car_model')} is required`;
    }

    if (values.year.trim()) {
      const yearNumber = Number(values.year);
      if (Number.isNaN(yearNumber) || yearNumber < 1980 || yearNumber > new Date().getFullYear() + 1) {
        newErrors.year = `${t('sell.form.year')} is invalid`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof SellCarFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));

    if (field in errors) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field as SellCarFormField];
        return updated;
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(false);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // In a real app, send values to backend here.
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setValues(initialValues);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <div className="mb-10 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-4">
              <Car className="h-4 w-4 mr-2" />
              <span>{t('sell.details_title')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              {t('sell.title')}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {t('sell.description')}
            </p>
            <p className="text-sm text-gray-500 mb-6">
              {t('sell.form_subtitle')}
            </p>

            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
              {t('sell.highlights_title')}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {t('sell.highlights.fast_process_title')}
                  </p>
                  <p className="text-xs text-gray-600">
                    {t('sell.highlights.fast_process_desc')}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <BadgeDollarSign className="h-5 w-5 text-emerald-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {t('sell.highlights.best_price_title')}
                  </p>
                  <p className="text-xs text-gray-600">
                    {t('sell.highlights.best_price_desc')}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-orange-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {t('sell.highlights.trusted_title')}
                  </p>
                  <p className="text-xs text-gray-600">
                    {t('sell.highlights.trusted_desc')}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <BadgeDollarSign className="h-5 w-5 text-purple-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {t('sell.highlights.secure_payment_title')}
                  </p>
                  <p className="text-xs text-gray-600">
                    {t('sell.highlights.secure_payment_desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t('sell.form_title')}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              {t('sell.form_subtitle')}
            </p>

            {isSubmitted && (
              <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                <p className="font-semibold mb-1">
                  {t('sell.form.success_title')}
                </p>
                <p>{t('sell.form.success_message')}</p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('sell.form.owner_name')}
                  </label>
                  <input
                    type="text"
                    value={values.ownerName}
                    onChange={(e) => handleChange('ownerName', e.target.value)}
                    placeholder={t('sell.form.owner_name_placeholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.ownerName && (
                    <p className="mt-1 text-xs text-red-600">{errors.ownerName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('sell.form.phone')}
                  </label>
                  <input
                    type="tel"
                    value={values.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder={t('sell.form.phone_placeholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('sell.form.email')}
                </label>
                <input
                  type="email"
                  value={values.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder={t('sell.form.email_placeholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('sell.form.car_brand')}
                  </label>
                  <input
                    type="text"
                    value={values.carBrand}
                    onChange={(e) => handleChange('carBrand', e.target.value)}
                    placeholder={t('sell.form.car_brand_placeholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.carBrand && (
                    <p className="mt-1 text-xs text-red-600">{errors.carBrand}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('sell.form.car_model')}
                  </label>
                  <input
                    type="text"
                    value={values.carModel}
                    onChange={(e) => handleChange('carModel', e.target.value)}
                    placeholder={t('sell.form.car_model_placeholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.carModel && (
                    <p className="mt-1 text-xs text-red-600">{errors.carModel}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('sell.form.year')}
                  </label>
                  <input
                    type="text"
                    value={values.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                    placeholder={t('sell.form.year_placeholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.year && (
                    <p className="mt-1 text-xs text-red-600">{errors.year}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('sell.form.mileage')}
                  </label>
                  <input
                    type="text"
                    value={values.mileage}
                    onChange={(e) => handleChange('mileage', e.target.value)}
                    placeholder={t('sell.form.mileage_placeholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('sell.form.expected_price')}
                  </label>
                  <input
                    type="text"
                    value={values.expectedPrice}
                    onChange={(e) => handleChange('expectedPrice', e.target.value)}
                    placeholder={t('sell.form.expected_price_placeholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('sell.form.condition')}
                  </label>
                  <select
                    value={values.condition}
                    onChange={(e) => handleChange('condition', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">{t('sell.form.condition_placeholder')}</option>
                    <option value="like_new">{t('sell.form.condition_like_new')}</option>
                    <option value="good">{t('sell.form.condition_good')}</option>
                    <option value="fair">{t('sell.form.condition_fair')}</option>
                    <option value="needs_work">{t('sell.form.condition_needs_work')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('sell.form.message')}
                  </label>
                  <textarea
                    rows={3}
                    value={values.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder={t('sell.form.message_placeholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {isSubmitting ? t('buttons.sending', 'Sending...') : t('sell.form.submit')}
              </button>
            </form>

            <p className="mt-4 text-[11px] text-gray-500">
              {t(
                'sell.disclaimer',
                'By submitting this form you agree that our team may contact you via phone or email about your car. We never share your details with third parties.',
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellCars;
