import { defineConfig } from 'astro/config';

export default defineConfig({
  // site: 'https://your-salon-calculator.com', // Commented out for development
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'fr', 'pl', 'ar', 'ru', 'zh', 'it', 'ja'],
    routing: {
      prefixDefaultLocale: false
    },
    fallback: {
      es: 'en',
      fr: 'en', 
      pl: 'en',
      ar: 'en',
      ru: 'en',
      zh: 'en',
      it: 'en',
      ja: 'en'
    }
  },
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});