/** Fallback images when local /images/* assets or CMS rows are missing. */
export const DEFAULT_PROJECT_IMAGE =
  'https://images.pexels.com/photos/5403840/pexels-photo-5403840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

export const TEAM_FALLBACK_IMAGES = {
  'Numan Erdoğan': 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=600',
  'Ahmet Erdoğan': 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=600',
  'Mahmut Erdoğan': 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=800&w=600',
};

export const MAP_FALLBACK_IMAGES = {
  istanbul: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  ankara: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  kocaeli: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  bilecik: 'https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  denizli: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  antalya: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  urfa: 'https://images.pexels.com/photos/1626885930974-4b69aa21bbf9?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  malatya: 'https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  elazig: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  diyarbakir: 'https://lzgeijdlqadtryfwthqr.supabase.co/storage/v1/object/public/media/project-import/star-life-sitesi.webp',
  sirnak: 'https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
};

export function teamFallbackImage(name) {
  return TEAM_FALLBACK_IMAGES[name] || DEFAULT_PROJECT_IMAGE;
}

export function mapFallbackImage(city = '') {
  const key = city.toLocaleLowerCase('tr-TR');
  if (key.includes('istanbul')) return MAP_FALLBACK_IMAGES.istanbul;
  if (key.includes('ankara')) return MAP_FALLBACK_IMAGES.ankara;
  if (key.includes('kocaeli')) return MAP_FALLBACK_IMAGES.kocaeli;
  if (key.includes('bilecik')) return MAP_FALLBACK_IMAGES.bilecik;
  if (key.includes('denizli')) return MAP_FALLBACK_IMAGES.denizli;
  if (key.includes('antalya')) return MAP_FALLBACK_IMAGES.antalya;
  if (key.includes('urfa') || key.includes('şanlıurfa')) return MAP_FALLBACK_IMAGES.urfa;
  if (key.includes('malatya')) return MAP_FALLBACK_IMAGES.malatya;
  if (key.includes('elaz')) return MAP_FALLBACK_IMAGES.elazig;
  if (key.includes('diyarbak')) return MAP_FALLBACK_IMAGES.diyarbakir;
  if (key.includes('şırnak') || key.includes('sirnak')) return MAP_FALLBACK_IMAGES.sirnak;
  return DEFAULT_PROJECT_IMAGE;
}
