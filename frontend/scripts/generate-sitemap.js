const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.REACT_APP_SITE_URL || 'https://starlifeinsaat.com';
const TODAY = new Date().toISOString().slice(0, 10);

const STATIC_PATHS = [
  '/',
  '/kurumsal/hakkimizda',
  '/kurumsal/yonetim',
  '/kurumsal/operasyon-haritasi',
  '/blog',
  '/iletisim',
  '/starlife-insaat',
  '/starlife-insaat/kurumsal/hakkimizda',
  '/starlife-insaat/insankaynaklari',
  '/starlife-insaat/taahhutisleri',
  '/starlife-insaat/taahhutisler/tamamlanan-isler',
  '/starlife-insaat/taahhutisler/devam-eden-isler',
  '/starlife-insaat/tumprojeler',
  '/starlife-insaat/projeler/tamamlanan-projeler',
  '/starlife-insaat/projeler/devam-eden-projeler',
  '/starlife-insaat/blog',
  '/starlife-insaat/iletisim',
  '/starlife-insaat/yapiguvenligi/deprem-dayanikliligi',
  '/starlife-insaat/yapiguvenligi/yangin-guvenligi',
  '/starlife-insaat/yapiguvenligi/muhendislik-cozumleri',
  '/starlife-insaat/yapiguvenligi/akilli-guvenlik-sistemleri',
  '/invest-insaat',
  '/invest-insaat/kurumsal/invest-insaat',
  '/invest-insaat/blog',
  '/invest-insaat/iletisim',
  '/erd-insaat',
  '/erd-insaat/kurumsal/erd-insaat',
  '/erd-insaat/blog',
  '/erd-insaat/iletisim',
];

const PROJECT_SLUGS = [
  'elit-life-villalari',
  'new-star-konutlari',
  'batisehir-konutlari',
  'kent-park-sitesi',
  'star-office',
  'goletli-park-2',
  'star-plus',
  'goletli-park-1',
  'star-life-sitesi',
  'yenikent-sitesi',
  'bilge-sitesi',
];

const TAAHHUT_SLUGS = [
  'antalya-serik-toki-konutlari',
  'malatya-battalgazi-sehit-feyzi-toki-projesi',
  'diyarbakir-cermik-toki-konutlari',
  'elazig-mustafa-pasa-konutlari',
  'sanliurfa-eyyubiye-toki-konutlari',
  'denizli-honaz-konutlari',
  'bilecik-osmaneli-toki-konutlari',
  'sirnak-okul-projesi',
  'elazig-defterdarlik',
  'kocaeli-kiz-yurdu',
  'mardin-1-etap-526-konut-insaati',
  'ankara-mamak-5-etap-bolge-konut-insaati',
  'mardin-3-etap-326-konut-insaati',
  'istanbul-arnavutkoy-sazlibosna-4-etap-11-bolge-konut-insaati',
];

const BLOG_SLUGS = require('./blog-slugs.cjs');

const urls = [
  ...STATIC_PATHS.map((pathname) => ({ pathname, priority: pathname === '/' ? '1.0' : '0.8' })),
  ...PROJECT_SLUGS.map((slug) => ({ pathname: `/starlife-insaat/projeler/${slug}`, priority: '0.7' })),
  ...TAAHHUT_SLUGS.map((slug) => ({ pathname: `/starlife-insaat/taahhut/${slug}`, priority: '0.7' })),
  ...BLOG_SLUGS.map((slug) => ({ pathname: `/blog/${slug}`, priority: '0.6' })),
  ...BLOG_SLUGS.map((slug) => ({ pathname: `/starlife-insaat/blog/${slug}`, priority: '0.6' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ pathname, priority }) => `  <url>
    <loc>${SITE_URL}${pathname === '/' ? '' : pathname}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`)
  .join('\n')}
</urlset>
`;

const outputPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml);
console.log(`Sitemap generated with ${urls.length} URLs at ${outputPath}`);
