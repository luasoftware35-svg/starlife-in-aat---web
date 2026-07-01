import {
  COMPANIES,
  ERD_NAV,
  HOLDING_NAV,
  INVEST_NAV,
  PROJECTS,
  STARLIFE_NAV,
  YAPI_GUVENLIGI,
} from '../mock/mock';
import { BLOG_POSTS } from '../mock/blogPosts';
import { TAAHHUT_PROJECTS } from '../mock/taahhutProjects';
import { normalizeSearchText } from './projectFilters';
import { policyPaths } from './policyPaths';
import { slugify } from './supabase/content';

function flattenNav(items, section = '', scope = 'holding') {
  return items.flatMap((item) => {
    if (item.children?.length) {
      return flattenNav(item.children, item.label, scope);
    }
    if (!item.href) return [];
    return [{
      title: item.label,
      href: item.href,
      category: section || 'Sayfa',
      keywords: [item.label, section].filter(Boolean).join(' '),
      scopes: [scope, 'holding'],
    }];
  });
}

function blogHref(post, basePath = '') {
  const slug = post.slug || slugify(post.title);
  if (basePath === '/starlife-insaat') return `/starlife-insaat/blog/${slug}`;
  if (basePath === '/invest-insaat') return `/invest-insaat/blog/${slug}`;
  if (basePath === '/erd-insaat') return `/erd-insaat/blog/${slug}`;
  return `/blog/${slug}`;
}

function buildSearchIndex() {
  const holdingPolicies = policyPaths('');
  const pages = [
    ...flattenNav(HOLDING_NAV, 'Kurumsal', 'holding'),
    ...flattenNav(STARLIFE_NAV, 'Starlife İnşaat', 'starlife'),
    ...flattenNav(INVEST_NAV, 'İnvest İnşaat', 'invest'),
    ...flattenNav(ERD_NAV, 'ERD İnşaat', 'erd'),
    { title: 'Ana Sayfa', href: '/', category: 'Sayfa', keywords: 'starlife insaat ana sayfa holding', scopes: ['holding', 'starlife', 'invest', 'erd'] },
    { title: 'Tüm Projeler', href: '/starlife-insaat/tumprojeler', category: 'Projeler', keywords: 'projeler konut starlife', scopes: ['holding', 'starlife'] },
    { title: 'Taahhüt İşleri', href: '/starlife-insaat/taahhutisleri', category: 'Taahhüt', keywords: 'taahhut toki kamu isleri', scopes: ['holding', 'starlife'] },
    { title: 'KVKK Metni', href: holdingPolicies.kvkk, category: 'Politika', keywords: 'kvkk gizlilik aydinlatma', scopes: ['holding', 'starlife', 'invest', 'erd'] },
    { title: 'Çerez Politikası', href: holdingPolicies.cookies, category: 'Politika', keywords: 'cerez cookie politika', scopes: ['holding', 'starlife', 'invest', 'erd'] },
  ];

  const companies = COMPANIES.map((company) => ({
    title: company.name,
    href: company.href,
    category: 'Grup Şirketi',
    keywords: `${company.name} ${company.desc}`,
    scopes: ['holding', 'starlife', 'invest', 'erd'],
  }));

  const projects = PROJECTS.map((project) => ({
    title: project.title,
    href: `/starlife-insaat/projeler/${slugify(project.title)}`,
    category: 'Konut Projesi',
    keywords: `${project.title} ${project.location} ${project.tag} ${project.status}`,
    scopes: ['holding', 'starlife'],
  }));

  const taahhut = TAAHHUT_PROJECTS.map((project) => ({
    title: project.title,
    href: `/starlife-insaat/taahhut/${project.slug}`,
    category: 'Taahhüt Projesi',
    keywords: `${project.title} ${project.location} ${project.tag} ${project.status} ${project.institution || ''} ${project.year || ''}`,
    scopes: ['holding', 'starlife'],
  }));

  const blog = BLOG_POSTS.map((post) => ({
    title: post.title,
    href: `/blog/${post.slug || slugify(post.title)}`,
    category: post.category || 'Haber',
    keywords: `${post.title} ${post.excerpt} ${post.category || ''}`,
    scopes: ['holding', 'starlife', 'invest', 'erd'],
    kind: 'blog',
    post,
  }));

  const safety = YAPI_GUVENLIGI.map((item) => ({
    title: item.title,
    href: `/starlife-insaat/yapiguvenligi/${item.slug}`,
    category: 'Yapı Güvenliği',
    keywords: `${item.title} ${item.content.slice(0, 120)}`,
    scopes: ['holding', 'starlife'],
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

function getActiveScope(basePath = '') {
  if (basePath.startsWith('/starlife-insaat')) return 'starlife';
  if (basePath.startsWith('/invest-insaat')) return 'invest';
  if (basePath.startsWith('/erd-insaat')) return 'erd';
  return 'holding';
}

function resolveItem(item, basePath = '') {
  if (item.kind === 'blog') {
    return { ...item, href: blogHref(item.post, basePath) };
  }
  return item;
}

function scoreItem(item, tokens, activeScope, basePath = '') {
  const haystack = normalizeSearchText(`${item.title} ${item.category} ${item.keywords}`);
  let score = 0;

  tokens.forEach((token) => {
    if (!token) return;
    const title = normalizeSearchText(item.title);
    if (title === token) score += 120;
    else if (title.startsWith(token)) score += 80;
    else if (title.includes(token)) score += 50;
    else if (haystack.includes(token)) score += 20;
  });

  if (item.scopes?.includes(activeScope)) score += 25;
  if (basePath && item.href?.startsWith(basePath)) score += 30;

  return score;
}

export function searchSite(query, { basePath = '', limit = 15 } = {}) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const tokens = normalizeSearchText(trimmed).split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];

  const activeScope = getActiveScope(basePath);

  return SEARCH_INDEX
    .filter((item) => item.scopes?.includes(activeScope) || item.scopes?.includes('holding'))
    .map((item) => resolveItem(item, basePath))
    .map((item) => ({ item, score: scoreItem(item, tokens, activeScope, basePath) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}
