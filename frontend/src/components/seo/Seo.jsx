import React from 'react';
import { Helmet } from 'react-helmet-async';
import { buildSeoPayload } from '../../lib/seo/schema';

export default function Seo({
  title,
  description,
  keywords,
  pathname = '/',
  image,
  type = 'website',
  noindex = false,
  jsonLd = [],
}) {
  const seo = buildSeoPayload({
    title,
    description,
    keywords,
    pathname,
    image,
    type,
    noindex,
    jsonLd,
  });

  const schemas = Array.isArray(seo.jsonLd) ? seo.jsonLd.filter(Boolean) : [];

  return (
    <Helmet prioritizeSeoTags>
      <html lang="tr" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      <meta name="robots" content={seo.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
      <meta name="author" content={seo.siteName} />
      <meta name="publisher" content={seo.siteName} />
      <link rel="canonical" href={seo.canonical} />

      <meta property="og:locale" content="tr_TR" />
      <meta property="og:type" content={seo.type} />
      <meta property="og:site_name" content={seo.siteName} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:alt" content={seo.title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {schemas.map((schema, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
