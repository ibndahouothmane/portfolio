import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

const STORAGE_KEY = 'language';

function getValueByPath(obj, path) {
  return path.split('.').reduce((acc, key) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
      return acc[key];
    }
    return undefined;
  }, obj);
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    if (savedLanguage === 'fr' || savedLanguage === 'en') {
      return savedLanguage;
    }
    return 'en';
  });

  const changeLanguage = (nextLanguage) => {
    if (nextLanguage !== 'en' && nextLanguage !== 'fr') {
      return;
    }

    setLanguage(nextLanguage);
    localStorage.setItem(STORAGE_KEY, nextLanguage);
  };

  const toggleLanguage = () => {
    const languages = ['en', 'fr'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    changeLanguage(languages[nextIndex]);
  };

  const t = (key) => {
    const currentTranslations = translations[language] || translations.en;
    const fallbackTranslations = translations.en;

    const currentValue = getValueByPath(currentTranslations, key);
    if (currentValue !== undefined) {
      return currentValue;
    }

    const fallbackValue = getValueByPath(fallbackTranslations, key);
    if (fallbackValue !== undefined) {
      return fallbackValue;
    }

    return key;
  };

  useEffect(() => {
    const locale = translations[language]?.locale || 'en-US';
    const documentLanguage = locale.split('-')[0] || 'en';
    const direction = 'ltr';

    document.documentElement.lang = documentLanguage;
    document.documentElement.dir = direction;
    document.body.dir = direction;
  }, [language]);

  const direction = 'ltr';

  const value = useMemo(
    () => ({
      language,
      direction,
      setLanguage: changeLanguage,
      toggleLanguage,
      t
    }),
    [language, direction]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
