import { ui } from './ui';
import { defaultLang, type Lang } from './config';

export type { Lang };

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui['en']) {
    return ui[lang as keyof typeof ui]?.[key] || ui[defaultLang][key];
  }
}

export function getRouteFromUrl(url: URL): string {
  const lang = getLangFromUrl(url);
  const path = url.pathname.replace(new RegExp(`^/${lang}`), '');
  return path || '/';
}

export function formatCurrency(amount: number, lang: Lang): string {
  const locales = {
    en: 'en-US',
    es: 'es-ES', 
    fr: 'fr-FR',
    pl: 'pl-PL',
    ar: 'ar-SA',
    ru: 'ru-RU',
    zh: 'zh-CN',
    it: 'it-IT',
    ja: 'ja-JP'
  };

  const currencies = {
    en: 'USD',
    es: 'EUR',
    fr: 'EUR', 
    pl: 'PLN',
    ar: 'SAR',
    ru: 'RUB',
    zh: 'CNY',
    it: 'EUR',
    ja: 'JPY'
  };

  try {
    return new Intl.NumberFormat(locales[lang as keyof typeof locales] || locales.en, {
      style: 'currency',
      currency: currencies[lang as keyof typeof currencies] || currencies.en,
      minimumFractionDigits: lang === 'ja' ? 0 : 2,
      maximumFractionDigits: lang === 'ja' ? 0 : 2,
    }).format(amount);
  } catch (error) {
    // Fallback to USD formatting if locale/currency not supported
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }
}

export function formatNumber(number: number, lang: Lang): string {
  const locales = {
    en: 'en-US',
    es: 'es-ES',
    fr: 'fr-FR', 
    pl: 'pl-PL',
    ar: 'ar-SA',
    ru: 'ru-RU',
    zh: 'zh-CN',
    it: 'it-IT',
    ja: 'ja-JP'
  };

  try {
    return new Intl.NumberFormat(locales[lang as keyof typeof locales] || locales.en).format(number);
  } catch (error) {
    return new Intl.NumberFormat('en-US').format(number);
  }
}

export function getTextDirection(lang: Lang): 'ltr' | 'rtl' {
  const rtlLangs: Lang[] = ['ar'];
  return rtlLangs.includes(lang) ? 'rtl' : 'ltr';
}

export function generateAlternateLanguageLinks(currentPath: string): Array<{lang: Lang, url: string, hreflang: string}> {
  const languages = Object.keys(ui) as Lang[];
  
  return languages.map(lang => {
    let url;
    if (lang === defaultLang) {
      // Default language has no prefix
      url = currentPath.replace(/^\/[a-z]{2}\//, '/') || '/';
    } else {
      // Add language prefix
      const cleanPath = currentPath.replace(/^\/[a-z]{2}\//, '/');
      url = `/${lang}${cleanPath}`;
    }

    const hreflangMap = {
      en: 'en',
      es: 'es', 
      fr: 'fr',
      pl: 'pl',
      ar: 'ar',
      ru: 'ru',
      zh: 'zh-CN',
      it: 'it',
      ja: 'ja'
    };

    return {
      lang,
      url: url, // Keep relative URLs for development
      hreflang: hreflangMap[lang as keyof typeof hreflangMap]
    };
  });
}