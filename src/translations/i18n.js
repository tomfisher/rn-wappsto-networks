import * as RNLocalize from 'react-native-localize';
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: require('./en/translation'),
    error: require('./en/error'),
  },
  da: {
    translation: require('./da/translation'),
    error: require('./da/error'),
  },
};

const languageDetector = {
  type: 'languageDetector',
  async: false,
  detect: () => RNLocalize.getLocales()[0].languageCode,
  init: () => {},
  cacheUserLanguage: () => {},
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    nsMode: 'translation',
    resources,
  });

const handleLocalizationChange = a => {
  i18next.changeLanguage(RNLocalize.getLocales()[0].languageCode);
};

RNLocalize.addEventListener('change', handleLocalizationChange);

export default i18next;

export function CapitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function CapitalizeEach(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function Uppercase(str) {
  return str.toUpperCase();
}
