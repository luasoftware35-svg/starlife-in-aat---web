import {
  blogSchema,
  heroSlideSchema,
  mapLocationSchema,
  projectSchema,
  settingsSchema,
  teamSchema,
} from '@/lib/validations/adminSchemas';

const text = (key, label, placeholder = '') => ({ key, label, type: 'text', placeholder });
const textarea = (key, label, placeholder = '') => ({ key, label, type: 'textarea', placeholder });
const image = (key, label) => ({ key, label, type: 'image' });
const images = (key, label) => ({ key, label, type: 'images' });
const checkbox = (key, label) => ({ key, label, type: 'checkbox' });
const number = (key, label) => ({ key, label, type: 'number' });
const select = (key, label, options = []) => ({ key, label, type: 'select', options });

export const adminResources = {
  projects: {
    label: 'Projeler',
    basePath: '/admin/projeler',
    editBasePath: '/admin/projeler/duzenle',
    table: 'projects',
    schema: projectSchema,
    orderBy: 'order_index',
    ascending: true,
    defaults: { status: 'devam', featured: false, order_index: 0, images: [] },
    columns: [
      { key: 'title', label: 'Başlık' },
      { key: 'city', label: 'Şehir' },
      { key: 'company', label: 'Şirket' },
      { key: 'status', label: 'Durum' },
      { key: 'year', label: 'Yıl' },
    ],
    fields: [
      text('title', 'Başlık'),
      text('slug', 'Slug'),
      textarea('description', 'Açıklama'),
      text('city', 'Şehir'),
      text('region', 'Bölge'),
      select('company', 'Şirket', [
        { value: 'starlife', label: 'Starlife İnşaat' },
        { value: 'invest', label: 'İnvest İnşaat' },
        { value: 'erd', label: 'ERD İnşaat' },
      ]),
      select('status', 'Durum', [
        { value: 'devam', label: 'Devam Ediyor' },
        { value: 'tamamlandi', label: 'Tamamlandı' },
      ]),
      select('tag', 'Kategori', [
        { value: 'Konut', label: 'Konut' },
        { value: 'Ticari', label: 'Ticari' },
        { value: 'Karma', label: 'Karma' },
      ]),
      number('units', 'Ünite Sayısı'),
      number('sqm', 'Alan (m²)'),
      text('year', 'Yıl'),
      image('cover_image', 'Kapak Görseli'),
      images('images', 'Galeri Görselleri'),
      checkbox('featured', 'Öne çıkar'),
      number('order_index', 'Sıra'),
    ],
  },
  blog: {
    label: 'Blog Yazıları',
    basePath: '/admin/blog',
    editBasePath: '/admin/blog/duzenle',
    table: 'blog_posts',
    schema: blogSchema,
    orderBy: 'created_at',
    defaults: { published: false },
    columns: [
      { key: 'title', label: 'Başlık' },
      { key: 'slug', label: 'Slug' },
      { key: 'published', label: 'Yayın', render: (row) => (row.published ? 'Yayında' : 'Taslak') },
    ],
    fields: [
      text('title', 'Başlık'),
      text('slug', 'Slug'),
      textarea('excerpt', 'Özet'),
      image('cover_image', 'Kapak Görseli'),
      textarea('content', 'İçerik'),
      checkbox('published', 'Yayında'),
    ],
  },
  hero: {
    label: 'Hero Slider',
    basePath: '/admin/hero',
    editBasePath: '/admin/hero/duzenle',
    table: 'hero_slides',
    schema: heroSlideSchema,
    orderBy: 'order_index',
    ascending: true,
    defaults: { order_index: 0, active: true, cta_text: 'Keşfet', cta_href: '/starlife-insaat' },
    columns: [
      { key: 'title', label: 'Başlık' },
      { key: 'tag', label: 'Etiket' },
      { key: 'order_index', label: 'Sıra' },
      { key: 'active', label: 'Durum', render: (row) => (row.active ? 'Aktif' : 'Pasif') },
    ],
    fields: [
      text('tag', 'Etiket'),
      text('title', 'Başlık'),
      textarea('description', 'Açıklama'),
      image('image', 'Görsel'),
      text('cta_text', 'Buton Metni'),
      text('cta_href', 'Buton Linki'),
      number('order_index', 'Sıra'),
      checkbox('active', 'Aktif'),
    ],
  },
  team: {
    label: 'Yönetim Kurulu',
    basePath: '/admin/yonetim',
    editBasePath: '/admin/yonetim/duzenle',
    table: 'team_members',
    schema: teamSchema,
    orderBy: 'order_index',
    ascending: true,
    defaults: { order_index: 0, active: true },
    columns: [
      { key: 'name', label: 'Ad Soyad' },
      { key: 'title', label: 'Unvan' },
      { key: 'order_index', label: 'Sıra' },
    ],
    fields: [
      text('name', 'Ad Soyad'),
      text('title', 'Unvan'),
      image('image', 'Fotoğraf'),
      textarea('bio', 'Özgeçmiş'),
      number('order_index', 'Sıra'),
      checkbox('active', 'Aktif'),
    ],
  },
  map: {
    label: 'Operasyon Haritası',
    basePath: '/admin/harita',
    editBasePath: '/admin/harita/duzenle',
    table: 'map_locations',
    schema: mapLocationSchema,
    orderBy: 'order_index',
    ascending: true,
    defaults: { active: true, order_index: 0 },
    columns: [
      { key: 'city', label: 'Şehir' },
      { key: 'region', label: 'Bölge' },
      { key: 'company', label: 'Şirket' },
    ],
    fields: [
      text('city', 'Şehir'),
      text('region', 'Bölge'),
      text('title', 'Başlık'),
      textarea('description', 'Açıklama'),
      select('company', 'Şirket', [
        { value: 'starlife', label: 'Starlife İnşaat' },
        { value: 'invest', label: 'İnvest İnşaat' },
        { value: 'erd', label: 'ERD İnşaat' },
      ]),
      text('cx', 'Harita Pozisyonu X (%)'),
      text('cy', 'Harita Pozisyonu Y (%)'),
      number('order_index', 'Sıra'),
      checkbox('active', 'Aktif'),
    ],
  },
  settings: {
    label: 'Genel Ayarlar',
    basePath: '/admin/ayarlar',
    editBasePath: '/admin/ayarlar/duzenle',
    table: 'site_settings',
    schema: settingsSchema,
    orderBy: 'key',
    ascending: true,
    columns: [
      { key: 'key', label: 'Anahtar' },
      { key: 'value', label: 'Değer' },
      { key: 'group_name', label: 'Grup' },
    ],
    fields: [
      text('key', 'Anahtar'),
      textarea('value', 'Değer'),
      text('group_name', 'Grup'),
    ],
  },
};

export const contentResources = {
  companies: { label: 'Şirketler', table: 'site_settings', fields: [text('key', 'Anahtar'), textarea('value', 'Değer'), text('group_name', 'Grup')] },
  header: { label: 'Header', table: 'site_settings', fields: [text('key', 'Anahtar'), textarea('value', 'Değer'), text('group_name', 'Grup')] },
  footer: { label: 'Footer', table: 'site_settings', fields: [text('key', 'Anahtar'), textarea('value', 'Değer'), text('group_name', 'Grup')] },
  about: { label: 'Hakkımızda', table: 'site_settings', fields: [text('key', 'Anahtar'), textarea('value', 'Değer'), text('group_name', 'Grup')] },
  contact: { label: 'İletişim', table: 'site_settings', fields: [text('key', 'Anahtar'), textarea('value', 'Değer'), text('group_name', 'Grup')] },
};
