import i18n from '../i18n';

export const LAKH_VALUE = 100000;

export const formatPriceLakhs = (price: number): string => {
  const lakhs = price / LAKH_VALUE;
  const formatted = lakhs.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });

  const lang = i18n.language || i18n.options.lng || 'en';
  const suffix = lang === 'mm' ? 'သိန်း' : ' Lakhs';

  return `${formatted}${suffix}`;
};
