const TR_MAP = { ğ: 'g', ü: 'u', ş: 's', ı: 'i', ö: 'o', ç: 'c' };

export function normalizeSearchText(value = '') {
  return value
    .toLocaleLowerCase('tr-TR')
    .replace(/[ğüşıöç]/g, (char) => TR_MAP[char] || char)
    .trim();
}

export function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'tr-TR'));
}

export function extractYear(value = '') {
  const match = String(value).match(/\d{4}/);
  return match ? match[0] : '';
}

export function filterProjects(items, filters) {
  const {
    query = '',
    tag = 'Hepsi',
    city = 'Hepsi',
    status = 'Hepsi',
    sort = 'default',
    lockedStatus = null,
  } = filters;

  const tokens = normalizeSearchText(query).split(/\s+/).filter(Boolean);

  let list = items.filter((item) => {
    if (lockedStatus && item.status !== lockedStatus) return false;
    if (!lockedStatus && status !== 'Hepsi' && item.status !== status) return false;
    if (tag !== 'Hepsi' && item.tag !== tag) return false;
    if (city !== 'Hepsi' && item.location !== city) return false;

    if (!tokens.length) return true;

    const haystack = normalizeSearchText(
      `${item.title} ${item.location} ${item.tag} ${item.status} ${item.year || ''} ${item.description || ''} ${item.institution || ''}`,
    );
    return tokens.every((token) => haystack.includes(token));
  });

  list = [...list];

  switch (sort) {
    case 'title-asc':
      list.sort((a, b) => a.title.localeCompare(b.title, 'tr-TR'));
      break;
    case 'title-desc':
      list.sort((a, b) => b.title.localeCompare(a.title, 'tr-TR'));
      break;
    case 'year-desc':
      list.sort((a, b) => extractYear(b.year).localeCompare(extractYear(a.year)));
      break;
    case 'year-asc':
      list.sort((a, b) => extractYear(a.year).localeCompare(extractYear(b.year)));
      break;
    case 'city-asc':
      list.sort((a, b) => (a.location || '').localeCompare(b.location || '', 'tr-TR'));
      break;
    default:
      break;
  }

  return list;
}

export function getProjectFilterOptions(items) {
  return {
    tags: uniqueSorted(items.map((item) => item.tag)),
    cities: uniqueSorted(items.map((item) => item.location)),
    statuses: uniqueSorted(items.map((item) => item.status)),
    years: uniqueSorted(items.map((item) => extractYear(item.year)).filter(Boolean)),
  };
}
