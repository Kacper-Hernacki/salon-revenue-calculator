import { type Lang } from '../i18n/config';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
}

// SEO keywords by language for better targeting
export const seoKeywords = {
  en: [
    'salon revenue calculator',
    'beauty salon rebooking',
    'hair salon AI automation',
    'salon business growth',
    'beauty salon profits',
    'salon customer retention',
    'spa revenue optimization',
    'beauty business calculator',
    'salon booking automation',
    'hair salon marketing',
    'beauty salon ROI',
    'salon revenue recovery'
  ],
  es: [
    'calculadora ingresos salón',
    'salón belleza reservas',
    'automatización salón IA',
    'crecimiento negocio salón',
    'ganancias salón belleza',
    'retención clientes salón',
    'optimización ingresos spa',
    'calculadora negocio belleza',
    'automatización reservas salón',
    'marketing salón cabello',
    'ROI salón belleza',
    'recuperación ingresos salón'
  ],
  fr: [
    'calculateur revenus salon',
    'salon beauté réservations',
    'automatisation salon IA',
    'croissance business salon',
    'profits salon beauté',
    'rétention clients salon',
    'optimisation revenus spa',
    'calculateur business beauté',
    'automatisation réservations salon',
    'marketing salon coiffure',
    'ROI salon beauté',
    'récupération revenus salon'
  ],
  pl: [
    'kalkulator przychodów salon',
    'salon piękności rezerwacje',
    'automatyzacja salon AI',
    'wzrost biznesu salon',
    'zyski salon piękności',
    'zatrzymanie klientów salon',
    'optymalizacja przychodów spa',
    'kalkulator biznes piękność',
    'automatyzacja rezerwacji salon',
    'marketing salon fryzjerski',
    'ROI salon piękności',
    'odzyskiwanie przychodów salon'
  ],
  ar: [
    'حاسبة إيرادات صالون',
    'صالون تجميل حجوزات',
    'أتمتة صالون ذكي',
    'نمو أعمال صالون',
    'أرباح صالون تجميل',
    'احتفاظ عملاء صالون',
    'تحسين إيرادات سبا',
    'حاسبة أعمال تجميل',
    'أتمتة حجوزات صالون',
    'تسويق صالون شعر',
    'عائد استثمار صالون',
    'استرداد إيرادات صالون'
  ],
  ru: [
    'калькулятор доходов салон',
    'салон красоты бронирование',
    'автоматизация салон ИИ',
    'рост бизнеса салон',
    'прибыль салон красоты',
    'удержание клиентов салон',
    'оптимизация доходов спа',
    'калькулятор бизнес красота',
    'автоматизация бронирования салон',
    'маркетинг парикмахерская',
    'ROI салон красоты',
    'восстановление доходов салон'
  ],
  zh: [
    '美容院收入计算器',
    '美容沙龙预订',
    '沙龙人工智能自动化',
    '沙龙业务增长',
    '美容院利润',
    '沙龙客户保留',
    '水疗收入优化',
    '美容业务计算器',
    '沙龙预订自动化',
    '发廊营销',
    '美容院投资回报率',
    '沙龙收入恢复'
  ],
  it: [
    'calcolatore ricavi salone',
    'salone bellezza prenotazioni',
    'automazione salone IA',
    'crescita business salone',
    'profitti salone bellezza',
    'ritenzione clienti salone',
    'ottimizzazione ricavi spa',
    'calcolatore business bellezza',
    'automazione prenotazioni salone',
    'marketing salone parrucchiere',
    'ROI salone bellezza',
    'recupero ricavi salone'
  ],
  ja: [
    'サロン収益計算機',
    'ビューティーサロン予約',
    'サロンAI自動化',
    'サロンビジネス成長',
    'ビューティーサロン利益',
    'サロン顧客維持',
    'スパ収益最適化',
    'ビューティービジネス計算機',
    'サロン予約自動化',
    'ヘアサロンマーケティング',
    'ビューティーサロンROI',
    'サロン収益回復'
  ]
} as const;

// Generate structured data for better SEO
export function generateStructuredData(lang: Lang, url: string): object {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#webapp`,
        "name": getLocalizedText(lang, 'appName'),
        "description": getLocalizedText(lang, 'appDescription'),
        "url": url,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "featureList": [
          getLocalizedText(lang, 'feature1'),
          getLocalizedText(lang, 'feature2'),
          getLocalizedText(lang, 'feature3')
        ]
      },
      {
        "@type": "Organization",
        "@id": `${url}#organization`,
        "name": "Salon Revenue Calculator",
        "url": url,
        "description": getLocalizedText(lang, 'orgDescription'),
        "sameAs": []
      },
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        "name": getLocalizedText(lang, 'siteName'),
        "description": getLocalizedText(lang, 'siteDescription'),
        "url": url,
        "inLanguage": lang,
        "isPartOf": {
          "@id": `${url}#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${url}?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Calculator",
        "@id": `${url}#calculator`,
        "name": getLocalizedText(lang, 'calculatorName'),
        "description": getLocalizedText(lang, 'calculatorDescription'),
        "url": url,
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser"
      }
    ]
  };

  return baseStructuredData;
}

// Localized text for structured data
function getLocalizedText(lang: Lang, key: string): string {
  const texts = {
    en: {
      appName: 'Salon Revenue Recovery Calculator',
      appDescription: 'AI-powered calculator to discover hidden revenue potential in your salon business',
      feature1: 'Revenue calculation and analysis',
      feature2: 'AI-powered rebooking recommendations',
      feature3: 'Personalized growth strategies',
      orgDescription: 'Professional salon business optimization tools and calculators',
      siteName: 'Salon Revenue Calculator',
      siteDescription: 'Discover and recover lost revenue in your salon business',
      calculatorName: 'Salon Revenue Recovery Calculator',
      calculatorDescription: 'Calculate potential revenue recovery through improved rebooking rates'
    },
    es: {
      appName: 'Calculadora de Recuperación de Ingresos del Salón',
      appDescription: 'Calculadora impulsada por IA para descubrir el potencial de ingresos ocultos en tu negocio de salón',
      feature1: 'Cálculo y análisis de ingresos',
      feature2: 'Recomendaciones de rebooking impulsadas por IA',
      feature3: 'Estrategias de crecimiento personalizadas',
      orgDescription: 'Herramientas y calculadoras profesionales de optimización de negocios de salón',
      siteName: 'Calculadora de Ingresos del Salón',
      siteDescription: 'Descubre y recupera ingresos perdidos en tu negocio de salón',
      calculatorName: 'Calculadora de Recuperación de Ingresos del Salón',
      calculatorDescription: 'Calcula la recuperación potencial de ingresos mediante tasas de rebooking mejoradas'
    },
    fr: {
      appName: 'Calculateur de Récupération des Revenus du Salon',
      appDescription: 'Calculateur alimenté par IA pour découvrir le potentiel de revenus cachés dans votre salon',
      feature1: 'Calcul et analyse des revenus',
      feature2: 'Recommandations de re-réservation alimentées par IA',
      feature3: 'Stratégies de croissance personnalisées',
      orgDescription: 'Outils et calculateurs professionnels d\'optimisation d\'entreprise de salon',
      siteName: 'Calculateur de Revenus de Salon',
      siteDescription: 'Découvrez et récupérez les revenus perdus dans votre entreprise de salon',
      calculatorName: 'Calculateur de Récupération des Revenus du Salon',
      calculatorDescription: 'Calculez la récupération potentielle des revenus grâce à des taux de re-réservation améliorés'
    },
    pl: {
      appName: 'Kalkulator Odzyskiwania Przychodów Salonu',
      appDescription: 'Kalkulator napędzany AI do odkrywania ukrytego potencjału przychodów w Twoim salonie',
      feature1: 'Obliczenia i analiza przychodów',
      feature2: 'Rekomendacje rebookingu napędzane AI',
      feature3: 'Spersonalizowane strategie wzrostu',
      orgDescription: 'Profesjonalne narzędzia i kalkulatory optymalizacji biznesu salonowego',
      siteName: 'Kalkulator Przychodów Salonu',
      siteDescription: 'Odkryj i odzyskaj utracone przychody w swoim biznesie salonowym',
      calculatorName: 'Kalkulator Odzyskiwania Przychodów Salonu',
      calculatorDescription: 'Oblicz potencjalne odzyskanie przychodów poprzez poprawione wskaźniki rebookingu'
    },
    ar: {
      appName: 'حاسبة استرداد إيرادات الصالون',
      appDescription: 'حاسبة مدعومة بالذكاء الاصطناعي لاكتشاف إمكانات الإيرادات المخفية في أعمال الصالون الخاص بك',
      feature1: 'حساب وتحليل الإيرادات',
      feature2: 'توصيات إعادة الحجز مدعومة بالذكاء الاصطناعي',
      feature3: 'استراتيجيات نمو مخصصة',
      orgDescription: 'أدوات وحاسبات احترافية لتحسين أعمال الصالون',
      siteName: 'حاسبة إيرادات الصالون',
      siteDescription: 'اكتشف واستعد الإيرادات المفقودة في أعمال الصالون الخاص بك',
      calculatorName: 'حاسبة استرداد إيرادات الصالون',
      calculatorDescription: 'احسب استرداد الإيرادات المحتمل من خلال تحسين معدلات إعادة الحجز'
    },
    ru: {
      appName: 'Калькулятор Восстановления Доходов Салона',
      appDescription: 'Калькулятор на основе ИИ для обнаружения скрытого потенциала доходов в вашем салонном бизнесе',
      feature1: 'Расчет и анализ доходов',
      feature2: 'Рекомендации по повторному бронированию на основе ИИ',
      feature3: 'Персонализированные стратегии роста',
      orgDescription: 'Профессиональные инструменты и калькуляторы оптимизации салонного бизнеса',
      siteName: 'Калькулятор Доходов Салона',
      siteDescription: 'Обнаружьте и восстановите потерянные доходы в вашем салонном бизнесе',
      calculatorName: 'Калькулятор Восстановления Доходов Салона',
      calculatorDescription: 'Рассчитайте потенциальное восстановление доходов за счет улучшенных показателей повторного бронирования'
    },
    zh: {
      appName: '美容院收入恢复计算器',
      appDescription: '人工智能驱动的计算器，发现您美容院业务中的隐藏收入潜力',
      feature1: '收入计算和分析',
      feature2: '人工智能驱动的重新预订建议',
      feature3: '个性化增长策略',
      orgDescription: '专业的美容院业务优化工具和计算器',
      siteName: '美容院收入计算器',
      siteDescription: '发现并恢复您美容院业务中的流失收入',
      calculatorName: '美容院收入恢复计算器',
      calculatorDescription: '通过改善重新预订率计算潜在收入恢复'
    },
    it: {
      appName: 'Calcolatore di Recupero Ricavi del Salone',
      appDescription: 'Calcolatore alimentato da AI per scoprire il potenziale di ricavi nascosti nel tuo business del salone',
      feature1: 'Calcolo e analisi dei ricavi',
      feature2: 'Raccomandazioni di riprenotazione alimentate da AI',
      feature3: 'Strategie di crescita personalizzate',
      orgDescription: 'Strumenti e calcolatori professionali di ottimizzazione del business del salone',
      siteName: 'Calcolatore Ricavi Salone',
      siteDescription: 'Scopri e recupera i ricavi persi nel tuo business del salone',
      calculatorName: 'Calcolatore di Recupero Ricavi del Salone',
      calculatorDescription: 'Calcola il recupero potenziale dei ricavi attraverso tassi di riprenotazione migliorati'
    },
    ja: {
      appName: 'サロン収益回復計算機',
      appDescription: 'AIを活用して、あなたのサロンビジネスの隠れた収益ポテンシャルを発見する計算機',
      feature1: '収益の計算と分析',
      feature2: 'AIを活用した再予約推奨',
      feature3: 'パーソナライズされた成長戦略',
      orgDescription: 'プロフェッショナルなサロンビジネス最適化ツールと計算機',
      siteName: 'サロン収益計算機',
      siteDescription: 'あなたのサロンビジネスで失われた収益を発見し回復する',
      calculatorName: 'サロン収益回復計算機',
      calculatorDescription: '改善された再予約率による潜在的収益回復を計算'
    }
  };

  return texts[lang]?.[key] || texts.en[key] || '';
}

// Generate meta robots tag based on language and environment
export function generateRobotsTag(lang: Lang, isDevelopment: boolean = false): string {
  if (isDevelopment) {
    return 'noindex, nofollow';
  }
  
  // All languages should be indexed
  return 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
}

// Generate canonical URL
export function generateCanonicalUrl(lang: Lang, path: string, baseUrl?: string): string {
  const base = baseUrl || 'https://your-salon-calculator.com';
  const cleanPath = path.replace(/^\/[a-z]{2}\//, '/');
  
  if (lang === 'en') {
    return `${base}${cleanPath === '/' ? '' : cleanPath}`;
  }
  
  return `${base}/${lang}${cleanPath}`;
}

// SEO configuration per language
export function getSEOConfig(lang: Lang, path: string, baseUrl?: string): SEOConfig {
  const isDev = !baseUrl || baseUrl.includes('localhost');
  const canonical = generateCanonicalUrl(lang, path, baseUrl);
  
  return {
    title: getLocalizedText(lang, 'appName'),
    description: getLocalizedText(lang, 'appDescription'),
    keywords: seoKeywords[lang] || seoKeywords.en,
    canonical,
    robots: generateRobotsTag(lang, isDev),
    ogTitle: getLocalizedText(lang, 'appName'),
    ogDescription: getLocalizedText(lang, 'appDescription'),
    ogImage: '/og-image.png',
    twitterTitle: getLocalizedText(lang, 'appName'),
    twitterDescription: getLocalizedText(lang, 'appDescription'),
    twitterImage: '/og-image.png',
    structuredData: generateStructuredData(lang, canonical)
  };
}