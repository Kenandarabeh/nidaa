// src/plugins/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translation files
import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';

const resources = {
  en: {
    translation: enTranslations
  },
  ar: {
    translation: arTranslations
  }
};

const getLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('user-language');
    if (savedLanguage) {
      return savedLanguage;
    }
    const deviceLanguage = getLocales()[0].languageCode;
    return deviceLanguage;
  } catch (error) {
    return 'ar';
  }
};

const i18nInstance = i18n.createInstance();
i18nInstance
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources,
    fallbackLng: 'ar',
    lng: 'ar',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

getLanguage().then(language => {
  i18nInstance.changeLanguage(language);
});

export default i18nInstance;