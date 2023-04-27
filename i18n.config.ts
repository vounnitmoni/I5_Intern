import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en, km} from './src/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: en,
    },
    km: {
      translation: km,
    },
  },
});

export default i18n;
