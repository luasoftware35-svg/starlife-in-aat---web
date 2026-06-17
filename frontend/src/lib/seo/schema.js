import {
  buildCanonical,
  buildTitle,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from './siteConfig';

export function buildArticleSchema({ title, description, image, url, datePublished, author }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image ? [image] : [DEFAULT_OG_IMAGE],
    url,
    datePublished: datePublished || undefined,
    author: {
      '@type': 'Organization',
      name: author || SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: DEFAULT_OG_IMAGE,
      },
    },
    mainEntityOfPage: url,
    inLanguage: 'tr-TR',
  };
}

export function buildProjectSchema({
  title,
  description,
  image,
  url,
  location,
  status,
  year,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description: description || `${title} — ${SITE_NAME} inşaat projesi`,
    image: image ? [image] : [DEFAULT_OG_IMAGE],
    url,
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    locationCreated: location ? {
      '@type': 'Place',
      name: location,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'TR',
      },
    } : undefined,
    keywords: [status, year, 'inşaat projesi', SITE_NAME].filter(Boolean).join(', '),
    inLanguage: 'tr-TR',
  };
}

export function buildBreadcrumbSchema(items = []) {
  if (!items.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href ? buildCanonical(item.href) : undefined,
    })),
  };
}

export function buildSeoPayload({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  pathname = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd = [],
}) {
  const canonical = buildCanonical(pathname);
  const resolvedTitle = title?.includes(SITE_NAME) ? title : buildTitle(title);

  return {
    title: resolvedTitle,
    description,
    keywords,
    canonical,
    image,
    type,
    noindex,
    jsonLd,
    siteName: SITE_NAME,
    tagline: SITE_TAGLINE,
  };
}
