import { DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS, ORGANIZATION_SCHEMA, WEBSITE_SCHEMA } from './siteConfig';

const SHARED_KEYWORDS = DEFAULT_KEYWORDS;

export const ROUTE_SEO = {
  '/': {
    title: 'Starlife İnşaat | Diyarbakır İnşaat Firması — Konut & Taahhüt İşleri',
    description:
      'Starlife İnşaat, Diyarbakır ve Türkiye genelinde konut, ticari yapı ve TOKİ taahhüt projeleri geliştiren güvenilir inşaat firmasıdır. Deprem dayanıklı, modern yaşam alanları için hemen inceleyin.',
    keywords: SHARED_KEYWORDS,
    jsonLd: [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA],
  },
  '/kurumsal/hakkimizda': {
    title: 'Hakkımızda',
    description:
      '2009\'dan bu yana Starlife İnşaat; kaliteli malzeme, uzman ekipler ve müşteri memnuniyeti odaklı inşaat hizmetleriyle Diyarbakır ve Türkiye\'de güvenilir projeler üretir.',
    keywords: 'Starlife İnşaat hakkında, inşaat firması, Diyarbakır inşaat şirketi, kurumsal',
  },
  '/kurumsal/yonetim': {
    title: 'Yönetim Kurulu',
    description:
      'Starlife İnşaat Yönetim Kurulu; deneyimli liderlik kadrosuyla inşaat, gayrimenkul ve taahhüt projelerinde sürdürülebilir büyüme hedefler.',
    keywords: 'Starlife yönetim kurulu, inşaat yönetimi, liderlik',
  },
  '/kurumsal/operasyon-haritasi': {
    title: 'Operasyon Haritası',
    description:
      'Starlife İnşaat operasyon haritası: Türkiye genelinde yürütülen TOKİ, konut, okul ve yurt projelerini şehir bazında keşfedin.',
    keywords: 'Starlife operasyon haritası, TOKİ projeleri, inşaat projeleri harita',
  },
  '/blog': {
    title: 'Bizden Haberler',
    description:
      'Starlife İnşaat blog: deprem dayanıklılığı, akıllı ev teknolojileri, sürdürülebilir mimari ve inşaat sektöründen güncel haberler.',
    keywords: 'inşaat haberleri, yapı güvenliği blog, Starlife haberler',
  },
  '/iletisim': {
    title: 'İletişim',
    description:
      'Starlife İnşaat ile iletişime geçin. Diyarbakır ofisimizden konut, taahhüt ve yatırım projeleri hakkında bilgi alın.',
    keywords: 'Starlife iletişim, Diyarbakır inşaat firması telefon, inşaat teklifi',
    jsonLd: [{
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Starlife İnşaat İletişim',
      description: 'Starlife İnşaat iletişim sayfası',
    }],
  },
  '/politika/kvkk-metni': {
    title: 'KVKK Aydınlatma Metni',
    description: 'Starlife İnşaat Kişisel Verilerin Korunması Kanunu (KVKK) aydınlatma metni.',
    keywords: 'KVKK, kişisel veriler, Starlife gizlilik',
    noindex: true,
  },
  '/starlife-insaat': {
    title: 'Starlife İnşaat | Güvenli ve Modern Yaşam Alanları',
    description:
      'Starlife İnşaat konut ve ticari projeleriyle Diyarbakır\'da güvenli, deprem dayanıklı ve modern yaşam alanları sunar. Projelerimizi ve taahhüt işlerimizi inceleyin.',
    keywords: 'Starlife İnşaat, Diyarbakır konut projeleri, güvenli yaşam alanları, inşaat firması',
    jsonLd: [ORGANIZATION_SCHEMA],
  },
  '/starlife-insaat/kurumsal/hakkimizda': {
    title: 'Hakkımızda',
    description:
      'Starlife İnşaat; estetik, fonksiyonellik ve güvenliği bir araya getiren konut projeleriyle bölgede öncü inşaat markasıdır.',
    keywords: 'Starlife hakkımızda, inşaat firması Diyarbakır',
  },
  '/starlife-insaat/insankaynaklari': {
    title: 'İnsan Kaynakları',
    description:
      'Starlife İnşaat insan kaynakları: inşaat, mühendislik ve saha ekiplerinde kariyer fırsatları. Ekibimize katılın.',
    keywords: 'Starlife kariyer, inşaat iş ilanları, insan kaynakları',
  },
  '/starlife-insaat/taahhutisleri': {
    title: 'Taahhüt İşleri',
    description:
      'Starlife İnşaat taahhüt işleri: TOKİ ve kamu projelerinde tamamlanan ve devam eden konut, okul ve yurt inşaatları.',
    keywords: 'taahhüt işleri, TOKİ inşaat, kamu projeleri, anahtar teslim inşaat',
  },
  '/starlife-insaat/taahhutisler/tamamlanan-isler': {
    title: 'Tamamlanan Taahhüt İşleri',
    description:
      'Starlife İnşaat tamamlanan taahhüt projeleri: Antalya, Malatya, Diyarbakır, Elazığ, Şanlıurfa ve daha fazlasında teslim edilen işler.',
    keywords: 'tamamlanan taahhüt işleri, TOKİ tamamlanan projeler, Starlife referanslar',
  },
  '/starlife-insaat/taahhutisler/devam-eden-isler': {
    title: 'Devam Eden Taahhüt İşleri',
    description:
      'Starlife İnşaat devam eden taahhüt projeleri: Mardin, Ankara Mamak ve İstanbul Arnavutköy TOKİ konut inşaatları.',
    keywords: 'devam eden taahhüt işleri, TOKİ devam eden projeler',
  },
  '/starlife-insaat/tumprojeler': {
    title: 'Tüm Projeler',
    description:
      'Starlife İnşaat tüm konut ve ticari projeleri: Diyarbakır ve çevresinde tamamlanan ve devam eden yaşam alanları.',
    keywords: 'Starlife projeler, Diyarbakır konut projeleri, inşaat projeleri',
  },
  '/starlife-insaat/projeler/tamamlanan-projeler': {
    title: 'Tamamlanan Projeler',
    description:
      'Starlife İnşaat tamamlanan konut ve ticari projeleri: Elit Life, New Star, Star Office ve daha fazlası.',
    keywords: 'tamamlanan konut projeleri, Diyarbakır tamamlanan projeler',
  },
  '/starlife-insaat/projeler/devam-eden-projeler': {
    title: 'Devam Eden Projeler',
    description:
      'Starlife İnşaat devam eden konut projeleri ve yeni yaşam alanı yatırımları hakkında güncel bilgiler.',
    keywords: 'devam eden konut projeleri, Starlife yeni projeler',
  },
  '/starlife-insaat/blog': {
    title: 'Bizden Haberler',
    description: 'Starlife İnşaat\'tan inşaat, yapı güvenliği ve konut sektörüne dair güncel haberler.',
    keywords: 'Starlife blog, inşaat haberleri',
  },
  '/starlife-insaat/iletisim': {
    title: 'İletişim',
    description: 'Starlife İnşaat iletişim bilgileri ve proje talep formu. Konut ve taahhüt projeleri için bize ulaşın.',
    keywords: 'Starlife iletişim, inşaat teklifi al',
  },
  '/starlife-insaat/politika/kvkk-metni': {
    title: 'KVKK Aydınlatma Metni',
    description: 'Starlife İnşaat KVKK aydınlatma metni.',
    noindex: true,
  },
  '/starlife-insaat/yapiguvenligi/deprem-dayanikliligi': {
    title: 'Deprem Dayanıklılığı',
    description:
      'Starlife İnşaat deprem dayanıklı bina standartları: güncel yönetmeliklere uygun mühendislik ve güçlendirilmiş yapı sistemleri.',
    keywords: 'deprem dayanıklı bina, deprem yönetmeliği, güvenli yapı',
  },
  '/starlife-insaat/yapiguvenligi/yangin-guvenligi': {
    title: 'Yangın Güvenliği',
    description: 'Starlife İnşaat yangın güvenliği çözümleri: yangına dayanıklı malzeme, algılama ve tahliye sistemleri.',
    keywords: 'yangın güvenliği, bina yangın sistemleri',
  },
  '/starlife-insaat/yapiguvenligi/muhendislik-cozumleri': {
    title: 'Mühendislik Çözümleri',
    description: 'Starlife İnşaat mühendislik çözümleri: statik, mekanik, elektrik ve çevre mühendisliği uzmanlığı.',
    keywords: 'inşaat mühendisliği, yapı mühendisliği çözümleri',
  },
  '/starlife-insaat/yapiguvenligi/akilli-guvenlik-sistemleri': {
    title: 'Akıllı Güvenlik Sistemleri',
    description: 'Starlife İnşaat akıllı güvenlik sistemleri: 7/24 izleme, akıllı kamera ve erişim kontrol çözümleri.',
    keywords: 'akıllı güvenlik sistemleri, akıllı ev güvenliği',
  },
  '/invest-insaat': {
    title: 'İnvest İnşaat | Geleceğe Değer Katan Yapılar',
    description:
      'İnvest İnşaat; modern şehircilik anlayışıyla yenilikçi, estetik ve sürdürülebilir konut ve ticari projeler geliştirir.',
    keywords: 'İnvest İnşaat, yatırım projeleri, ticari inşaat',
  },
  '/invest-insaat/kurumsal/invest-insaat': {
    title: 'İnvest İnşaat Hakkında',
    description: 'İnvest İnşaat kurumsal profil, vizyon ve misyon bilgileri.',
    keywords: 'İnvest İnşaat hakkında',
  },
  '/invest-insaat/blog': {
    title: 'İnvest İnşaat Haberler',
    description: 'İnvest İnşaat blog ve sektör haberleri.',
    keywords: 'İnvest İnşaat blog',
  },
  '/invest-insaat/iletisim': {
    title: 'İnvest İnşaat İletişim',
    description: 'İnvest İnşaat iletişim bilgileri ve proje talepleri.',
    keywords: 'İnvest İnşaat iletişim',
  },
  '/erd-insaat': {
    title: 'ERD İnşaat | İnsan Odaklı Tasarım, Yüksek Kalite',
    description:
      'ERD İnşaat; yenilikçi mimari, güçlü mühendislik altyapısı ve kalite odaklı modern yaşam alanları inşa eder.',
    keywords: 'ERD İnşaat, konut projeleri, inşaat firması',
  },
  '/erd-insaat/kurumsal/erd-insaat': {
    title: 'ERD İnşaat Hakkında',
    description: 'ERD İnşaat kurumsal profil, vizyon ve misyon bilgileri.',
    keywords: 'ERD İnşaat hakkında',
  },
  '/erd-insaat/blog': {
    title: 'ERD İnşaat Haberler',
    description: 'ERD İnşaat blog ve sektör haberleri.',
    keywords: 'ERD İnşaat blog',
  },
  '/erd-insaat/iletisim': {
    title: 'ERD İnşaat İletişim',
    description: 'ERD İnşaat iletişim bilgileri ve proje talepleri.',
    keywords: 'ERD İnşaat iletişim',
  },
};

export const DYNAMIC_ROUTE_PATTERNS = [
  /^\/blog\/[^/]+$/,
  /^\/starlife-insaat\/blog\/[^/]+$/,
  /^\/starlife-insaat\/projeler\/[^/]+$/,
  /^\/starlife-insaat\/taahhut\/[^/]+$/,
  /^\/invest-insaat\/blog\/[^/]+$/,
  /^\/erd-insaat\/blog\/[^/]+$/,
];

export function getRouteSeo(pathname) {
  return ROUTE_SEO[pathname] || null;
}

export function isDynamicSeoRoute(pathname) {
  return DYNAMIC_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname));
}

export function isAdminRoute(pathname) {
  return pathname === '/admin' || pathname.startsWith('/admin/');
}
