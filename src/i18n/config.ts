// Language configuration
export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  pl: 'Polski',
  ar: 'العربية',
  ru: 'Русский',
  zh: '中文',
  it: 'Italiano',
  ja: '日本語'
} as const;

export const defaultLang = 'en';
export type Lang = keyof typeof languages;

// RTL languages
export const rtlLangs = ['ar'];

// Language display names with their native names
export const languageNames = {
  en: { native: 'English', english: 'English' },
  es: { native: 'Español', english: 'Spanish' },
  fr: { native: 'Français', english: 'French' },
  pl: { native: 'Polski', english: 'Polish' },
  ar: { native: 'العربية', english: 'Arabic' },
  ru: { native: 'Русский', english: 'Russian' },
  zh: { native: '中文', english: 'Chinese' },
  it: { native: 'Italiano', english: 'Italian' },
  ja: { native: '日本語', english: 'Japanese' }
} as const;