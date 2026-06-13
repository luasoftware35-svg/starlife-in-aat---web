// Mock data for Starlife İnşaat website

export const COMPANY = {
  name: 'Starlife İnşaat',
  slogan: 'Güvenli ve Modern Yaşam Alanları',
  founded: 2009,
  founder: 'Numan Erdoğan',
  address: 'Ceysa Serhat Plaza B Blok Kat 2 No:2 Kayapınar/Diyarbakır',
  phone: '0412 504 1008',
  email: 'luasoftware35@gmail.com',
};

export const SOCIALS = [
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61572449155197' },
  { name: 'Instagram', href: 'https://www.instagram.com/starlifeinsaatt/' },
  { name: 'Twitter', href: 'https://x.com/StarLifeGroup1' },
  { name: 'Linkedin', href: 'https://www.linkedin.com/company/star-life-group/' },
  { name: 'Youtube', href: 'https://www.youtube.com/@Starlifeİnşaat' },
];

export const HERO_SLIDES = [
  {
    tag: 'İnşaat Projeleri',
    title: 'Hayalleriniz\nBizimle Güvende',
    desc: "2009'dan bu yana güvenli, modern ve kaliteli yaşam alanları inşa ediyoruz.",
    cta: 'Keşfet',
    href: '/starlife-insaat',
    image: 'https://images.unsplash.com/photo-1626885930974-4b69aa21bbf9',
  },
  {
    tag: 'Konut Projeleri',
    title: 'Mutlu Aileler\nİçin Modern Evler',
    desc: 'Ailenize huzurlu, güvenli ve konforlu bir yuva sunuyoruz.',
    cta: 'Projeler',
    href: '/starlife-insaat/tumprojeler',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92',
  },
  {
    tag: 'Ticari Projeler',
    title: 'Geleceğin\nMimarisini İnşa Et',
    desc: 'Lüks konut kuleleri ve ticari projelerle şehrin siluetini şekillendiriyoruz.',
    cta: 'İncele',
    href: '/invest-insaat',
    image: 'https://images.unsplash.com/photo-1543158266-0066955047b1',
  },
];

export const PROJECTS = [
  { id: 1, title: 'Starlife Residence Diyarbakır', status: 'Devam Eden', location: 'Kayapınar/Diyarbakır', year: 2024, image: 'https://images.pexels.com/photos/5403840/pexels-photo-5403840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tag: 'Konut' },
  { id: 2, title: 'Starlife Park Evleri', status: 'Tamamlanan', location: 'Diyarbakır', year: 2022, image: 'https://images.pexels.com/photos/33230969/pexels-photo-33230969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tag: 'Konut' },
  { id: 3, title: 'İnvest Plaza', status: 'Devam Eden', location: 'Diyarbakır', year: 2025, image: 'https://images.pexels.com/photos/34700467/pexels-photo-34700467.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tag: 'Ticari' },
  { id: 4, title: 'ERD Tower', status: 'Devam Eden', location: 'Diyarbakır', year: 2026, image: 'https://images.pexels.com/photos/31197870/pexels-photo-31197870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940', tag: 'Karma' },
  { id: 5, title: 'Starlife Garden', status: 'Tamamlanan', location: 'Diyarbakır', year: 2021, image: 'https://images.unsplash.com/photo-1542442828-287217bfb87f', tag: 'Konut' },
  { id: 6, title: 'Şehir Konakları', status: 'Tamamlanan', location: 'Diyarbakır', year: 2020, image: 'https://images.unsplash.com/photo-1564078516393-cf04bd966897', tag: 'Konut' },
];

export const BLOG_POSTS = [
  { id: 1, title: 'Deprem Dayanıklı Bina Nasıl Olur?', excerpt: 'Modern mühendislik çözümleri ile deprem dayanıklı binaların temel kriterlerini inceledik.', date: '12 Mart 2025', author: 'Starlife İnşaat', image: 'https://images.pexels.com/photos/4458205/pexels-photo-4458205.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { id: 2, title: 'Akıllı Ev Teknolojileri 2025', excerpt: 'Yeni nesil konut projelerinde akıllı ev sistemleri nasıl entegre ediliyor?', date: '05 Mart 2025', author: 'Starlife İnşaat', image: 'https://images.pexels.com/photos/34573691/pexels-photo-34573691.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { id: 3, title: 'Sürdürülebilir Mimari Trendleri', excerpt: 'Çevre dostu malzemeler ve enerji verimli tasarım uygulamaları.', date: '20 Şubat 2025', author: 'Starlife İnşaat', image: 'https://images.pexels.com/photos/3818947/pexels-photo-3818947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { id: 4, title: 'Diyarbakır Konut Piyasası Analizi', excerpt: 'Bölgemizde gayrimenkul yatırımları ve gelecek beklentileri.', date: '10 Şubat 2025', author: 'Starlife İnşaat', image: 'https://images.pexels.com/photos/6082416/pexels-photo-6082416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
];

export const COMPANIES = [
  {
    slug: 'starlife-insaat',
    name: 'Starlife İnşaat',
    desc: 'Ana marka, konut projeleri ve yapı güvenliği odaklı.',
    image: 'https://images.pexels.com/photos/5403840/pexels-photo-5403840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    href: '/starlife-insaat',
  },
  {
    slug: 'invest-insaat',
    name: 'İnvest İnşaat',
    desc: 'Yatırım odaklı; konut, ticari ve karma kullanımlı projeler.',
    image: 'https://images.pexels.com/photos/33230969/pexels-photo-33230969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    href: '/invest-insaat',
  },
  {
    slug: 'erd-insaat',
    name: 'ERD İnşaat',
    desc: 'Mimari vizyon, mühendislik altyapısı ve yenilikçi projeler.',
    image: 'https://images.pexels.com/photos/34700467/pexels-photo-34700467.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    href: '/erd-insaat',
  },
];

export const YAPI_GUVENLIGI = [
  { slug: 'deprem-dayanikliligi', title: 'Deprem Dayanıklılığı', content: "Star Life İnşaat olarak, güvenli yaşam alanları inşa etmeyi önceliğimiz kabul ediyoruz. Tüm projelerimiz, güncel deprem yönetmeliklerine uygun, yüksek mühendislik standartlarıyla ve güçlendirilmiş yapı sistemleri kullanılarak tasarlanmaktadır. Zemin etütlerinden, malzeme seçimlerine kadar her aşamada titizlikle çalışarak, dayanıklı, sağlam ve güvenli yapılar inşa ediyoruz. Geleceğinize güvenle bakmanız için buradayız." },
  { slug: 'yangin-guvenligi', title: 'Yangın Güvenliği', content: 'Yangın güvenliği, projelerimizin vazgeçilmez bir parçasıdır. Yangına dayanıklı malzemeler, otomatik söndürme sistemleri, duman algılayıcıları ve acil tahliye planları ile yaşam alanlarınızı koruma altına alıyoruz. Tüm sistemler güncel yönetmeliklere uygun şekilde tasarlanır ve düzenli olarak test edilir.' },
  { slug: 'muhendislik-cozumleri', title: 'Mühendislik Çözümleri', content: 'Güçlü mühendislik altyapımız; statik, mekanik, elektrik ve çevre mühendisliği dallarında uzman ekiplerimiz tarafından tasarlanır. Her projede en yeni teknoloji ve yöntemleri kullanarak, dayanıklı, fonksiyonel ve estetik çözümler üretiyoruz.' },
  { slug: 'akilli-guvenlik-sistemleri', title: 'Akıllı Güvenlik Sistemleri', content: '7/24 izleme, akıllı kamera sistemleri, yüz tanıma, kartlı geçiş ve mobil uygulama entegrasyonu ile yaşam alanlarınızı korumak için en son teknolojiyi sunuyoruz. Akıllı evler, modern konfor ile maksimum güvenliği bir araya getiriyor.' },
];

export const HOLDING_NAV = [
  {
    label: 'Kurumsal', children: [
      { label: 'Hakkımızda', href: '/kurumsal/hakkimizda' },
      { label: 'Yönetim Kurulu', href: '/kurumsal/yonetim' },
      { label: 'Operasyon Haritası', href: '/kurumsal/operasyon-haritasi' },
    ]
  },
  {
    label: 'Grup Şirketlerimiz', children: [
      { label: 'Starlife İnşaat', href: '/starlife-insaat' },
      { label: 'İnvest İnşaat', href: '/invest-insaat' },
      { label: 'ERD İnşaat', href: '/erd-insaat' },
    ]
  },
  { label: 'Bizden Haberler', href: '/blog' },
  { label: 'İletişim', href: '/iletisim' },
];

export const STARLIFE_NAV = [
  { label: 'Anasayfa', href: '/starlife-insaat' },
  {
    label: 'Kurumsal', children: [
      { label: 'Hakkımızda', href: '/starlife-insaat/kurumsal/hakkimizda' },
      { label: 'İ.K.', href: '/starlife-insaat/insankaynaklari' },
    ]
  },
  { label: 'Taahhüt İşleri', href: '/starlife-insaat/taahhutisleri' },
  {
    label: 'Projeler', children: [
      { label: 'Tamamlanan Projeler', href: '/starlife-insaat/projeler/tamamlanan-projeler' },
      { label: 'Devam Eden Projeler', href: '/starlife-insaat/projeler/devam-eden-projeler' },
    ]
  },
  {
    label: 'Yapı Güvenliği', children: [
      { label: 'Deprem Dayanıklılığı', href: '/starlife-insaat/yapiguvenligi/deprem-dayanikliligi' },
      { label: 'Yangın Güvenliği', href: '/starlife-insaat/yapiguvenligi/yangin-guvenligi' },
      { label: 'Mühendislik Çözümleri', href: '/starlife-insaat/yapiguvenligi/muhendislik-cozumleri' },
      { label: 'Akıllı Güvenlik Sistemleri', href: '/starlife-insaat/yapiguvenligi/akilli-guvenlik-sistemleri' },
    ]
  },
  { label: 'Bizden Haberler', href: '/starlife-insaat/blog' },
  { label: 'İletişim', href: '/starlife-insaat/iletisim' },
];

export const INVEST_NAV = [
  { label: 'Anasayfa', href: '/invest-insaat' },
  { label: 'Kurumsal', children: [{ label: 'İnvest İnşaat', href: '/invest-insaat/kurumsal/invest-insaat' }] },
  { label: 'Bizden Haberler', href: '/invest-insaat/blog' },
  { label: 'İletişim', href: '/invest-insaat/iletisim' },
];

export const ERD_NAV = [
  { label: 'Anasayfa', href: '/erd-insaat' },
  { label: 'Kurumsal', children: [{ label: 'ERD İnşaat', href: '/erd-insaat/kurumsal/erd-insaat' }] },
  { label: 'Bizden Haberler', href: '/erd-insaat/blog' },
  { label: 'İletişim', href: '/erd-insaat/iletisim' },
];
