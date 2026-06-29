import {
  BLOG_POSTS,
  COMPANIES,
  ERD_NAV,
  HOLDING_NAV,
  INVEST_NAV,
  PROJECTS,
  STARLIFE_NAV,
  YAPI_GUVENLIGI,
} from '../mock/mock';
import { TAAHHUT_PROJECTS } from '../mock/taahhutProjects';
import { slugify } from './supabase/content';

function normalize(value = '') {
  return value
    .toLocaleLowerCase('tr-TR')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim();
}

function flattenNav(items, section = '') {
  return items.flatMap((item) => {
    if (item.children?.length) {
      return flattenNav(item.children, item.label);
    }
    if (!item.href) return [];
    return [{
      title: item.label,
      href: item.href,
      category: section || 'Sayfa',
      keywords: [item.label, section].filter(Boolean).join(' '),
    }];
  });
}

function buildSearchIndex() {
  const pages = [
    ...flattenNav(HOLDING_NAV, 'Kurumsal'),
    ...flattenNav(STARLIFE_NAV, 'Starlife İnşaat'),
    ...flattenNav(INVEST_NAV, 'İnvest İnşaat'),
    ...flattenNav(ERD_NAV, 'ERD İnşaat'),
    { title: 'Ana Sayfa', href: '/', category: 'Sayfa', keywords: 'starlife insaat ana sayfa' },
    { title: 'Tüm Projeler', href: '/starlife-insaat/tumprojeler', category: 'Projeler', keywords: 'projeler konut starlife' },
    { title: 'Taahhüt İşleri', href: '/starlife-insaat/taahhutisleri', category: 'Taahhüt', keywords: 'taahhut toki kamu isleri' },
    { title: 'KVKK Metni', href: '/politika/kvkk-metni', category: 'Politika', keywords: 'kvkk gizlilik' },
  ];

  const companies = COMPANIES.map((company) => ({
    title: company.name,
    href: company.href,
    category: 'Grup Şirketi',
    keywords: `${company.name} ${company.desc}`,
  }));

  const projects = PROJECTS.map((project) => ({
    title: project.title,
    href: `/starlife-insaat/projeler/${slugify(project.title)}`,
    category: 'Konut Projesi',
    keywords: `${project.title} ${project.location} ${project.tag} ${project.status}`,
  }));

  const taahhut = TAAHHUT_PROJECTS.map((project) => ({
    title: project.title,
    href: `/starlife-insaat/taahhut/${project.slug}`,
    category: 'Taahhüt Projesi',
    keywords: `${project.title} ${project.location} ${project.tag} ${project.status} ${project.institution || ''}`,
  }));

  const blog = BLOG_POSTS.map((post) => ({
    title: post.title,
    href: `/blog/${slugify(post.title)}`,
    category: 'Haber',
    keywords: `${post.title} ${post.excerpt}`,
  }));

  const safety = YAPI_GUVENLIGI.map((item) => ({
    title: item.title,
    href: `/starlife-insaat/yapiguvenligi/${item.slug}`,
    category: 'Yapı Güvenliği',
    keywords: `${item.title} ${item.content.slice(0, 120)}`,
  }));

  return [...pages, ...companies, ...projects, ...taahhut, ...blog, ...safety];
}

const SEARCH_INDEX = buildSearchIndex();

export const POPULAR_SEARCHES = [
  { label: 'Konut Projeleri', query: 'konut projeleri' },
  { label: 'Deprem Dayanıklılığı', query: 'deprem dayanıklılığı' },
  { label: 'Hakkımızda', query: 'hakkımızda' },
  { label: 'Taahhüt İşleri', query: 'taahhüt' },
  { label: 'İletişim', query: 'iletişim' },
];

function scoreItem(item, tokens) {
  const haystack = normalize(`${item.title} ${item.category} ${item.keywords}`);
  let score = 0;

  tokens.forEach((token) => {
    if (!token) return;
    const title = normalize(item.title);
    if (title === token) score += 120;
    else if (title.startsWith(token)) score += 80;
    else if (title.includes(token)) score += 50;
    else if (haystack.includes(token)) score += 20;
  });

  return score;
}

export function searchSite(query, limit = 8) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const tokens = normalize(trimmed).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];

  return SEARCH_INDEX
    .map((item) => ({ item, score: scoreItem(item, tokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}
