import React from 'react';
import { useLocation } from 'react-router-dom';
import Seo from './Seo';
import { DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS } from '../../lib/seo/siteConfig';
import {
  getRouteSeo,
  isAdminRoute,
  isDynamicSeoRoute,
} from '../../lib/seo/routeSeoConfig';

export default function RouteSeo() {
  const { pathname } = useLocation();

  if (isAdminRoute(pathname) || isDynamicSeoRoute(pathname)) {
    if (isAdminRoute(pathname)) {
      return <Seo title="Admin Panel" description="Starlife İnşaat yönetim paneli" pathname={pathname} noindex />;
    }
    return null;
  }

  const routeSeo = getRouteSeo(pathname);

  if (!routeSeo) {
    return (
      <Seo
        title="Starlife İnşaat"
        description={DEFAULT_DESCRIPTION}
        keywords={DEFAULT_KEYWORDS}
        pathname={pathname}
      />
    );
  }

  return (
    <Seo
      title={routeSeo.title}
      description={routeSeo.description}
      keywords={routeSeo.keywords}
      pathname={pathname}
      image={routeSeo.image}
      type={routeSeo.type}
      noindex={routeSeo.noindex}
      jsonLd={routeSeo.jsonLd}
    />
  );
}
