export function policyPaths(basePath = '') {
  const prefix = basePath.replace(/\/$/, '');
  return {
    kvkk: `${prefix}/politika/kvkk-metni`,
    cookies: `${prefix}/politika/cerez-politikasi`,
  };
}

export function detectSiteContext(pathname = '') {
  if (pathname.startsWith('/starlife-insaat')) {
    return { basePath: '/starlife-insaat', siteName: 'Starlife İnşaat' };
  }
  if (pathname.startsWith('/invest-insaat')) {
    return { basePath: '/invest-insaat', siteName: 'İnvest İnşaat' };
  }
  if (pathname.startsWith('/erd-insaat')) {
    return { basePath: '/erd-insaat', siteName: 'ERD İnşaat' };
  }
  return { basePath: '', siteName: 'Starlife İnşaat' };
}
