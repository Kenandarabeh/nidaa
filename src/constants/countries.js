export const COUNTRIES = [
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼' },
  { code: 'BH', name: 'Bahrain', dialCode: '+973', flag: '🇧🇭' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
  { code: 'OM', name: 'Oman', dialCode: '+968', flag: '🇴🇲' },
  // يمكنك إضافة المزيد من الدول حسب الحاجة
];

export const getFilteredCountries = (allowedCountries = []) => {
  if (!allowedCountries.length) return COUNTRIES;
  return COUNTRIES.filter(country => allowedCountries.includes(country.code));
};
