import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en/translation.json';
import es from './locales/es/translation.json';

i18n
  .use(LanguageDetector) // ✅ Detecta el idioma del navegador
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // en caso de que el idioma no esté soportado
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    detection: {
      order: ['navigator', 'htmlTag'],
      caches: [], // ⛔️ NO usar localStorage o cookies para forzar nueva detección cada visita
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;