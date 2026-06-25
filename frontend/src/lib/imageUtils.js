export function optimizeImageUrl(url, { width = 1600, quality = 75 } = {}) {
  if (!url) return url;

  if (url.includes('images.unsplash.com')) {
    const base = url.split('?')[0];
    return `${base}?auto=format&fit=crop&w=${width}&q=${quality}`;
  }

  if (url.includes('images.pexels.com')) {
    if (url.includes('w=') && url.includes('auto=compress')) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}auto=compress&cs=tinysrgb&dpr=1&w=${width}`;
  }

  return url;
}
