import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { filterProjects, getProjectFilterOptions } from '../../lib/projectFilters';

const SORT_OPTIONS = [
  { value: 'default', label: 'Varsayılan' },
  { value: 'title-asc', label: 'Ada göre (A-Z)' },
  { value: 'title-desc', label: 'Ada göre (Z-A)' },
  { value: 'year-desc', label: 'Yıla göre (Yeni)' },
  { value: 'year-asc', label: 'Yıla göre (Eski)' },
  { value: 'city-asc', label: 'Şehre göre' },
];

export default function ProjectFilterBar({
  items,
  lockedStatus = null,
  showStatusFilter = true,
  onChange,
}) {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('Hepsi');
  const [city, setCity] = useState('Hepsi');
  const [status, setStatus] = useState('Hepsi');
  const [sort, setSort] = useState('default');

  const options = useMemo(() => getProjectFilterOptions(items), [items]);

  const filtered = useMemo(
    () => filterProjects(items, { query, tag, city, status, sort, lockedStatus }),
    [items, query, tag, city, status, sort, lockedStatus],
  );

  React.useEffect(() => {
    onChange(filtered);
  }, [filtered, onChange]);

  const selectClass =
    'w-full bg-white border border-ink/15 px-3 py-2.5 text-sm text-ink focus:border-pomegranate outline-none transition-colors';

  return (
    <div className="mb-12 space-y-5">
      <div className="relative">
        <label htmlFor="project-search" className="sr-only">
          Proje ara
        </label>
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" aria-hidden="true" />
        <input
          id="project-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Proje adı, şehir veya anahtar kelime ara..."
          className="w-full border border-ink/15 bg-white py-3 pl-11 pr-4 text-sm focus:border-pomegranate outline-none transition-colors"
        />
      </div>

      <div className="flex items-center gap-2 text-ink/50 text-[11px] tracking-[0.25em] uppercase">
        <SlidersHorizontal size={14} aria-hidden="true" />
        <span>Filtrele ve sırala</span>
        <span className="text-ink/35 normal-case tracking-normal">({filtered.length} sonuç)</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div>
          <label htmlFor="project-tag-filter" className="block text-[10px] tracking-[0.25em] uppercase text-ink/50 mb-2">
            Tür
          </label>
          <select id="project-tag-filter" value={tag} onChange={(e) => setTag(e.target.value)} className={selectClass}>
            <option value="Hepsi">Hepsi</option>
            {options.tags.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="project-city-filter" className="block text-[10px] tracking-[0.25em] uppercase text-ink/50 mb-2">
            Şehir / Bölge
          </label>
          <select id="project-city-filter" value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
            <option value="Hepsi">Hepsi</option>
            {options.cities.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>

        {showStatusFilter && !lockedStatus && (
          <div>
            <label htmlFor="project-status-filter" className="block text-[10px] tracking-[0.25em] uppercase text-ink/50 mb-2">
              Durum
            </label>
            <select id="project-status-filter" value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
              <option value="Hepsi">Hepsi</option>
              {options.statuses.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="project-sort" className="block text-[10px] tracking-[0.25em] uppercase text-ink/50 mb-2">
            Sıralama
          </label>
          <select id="project-sort" value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export function useProjectFilterState(items, { lockedStatus = null, showStatusFilter = true } = {}) {
  const [filtered, setFiltered] = useState(items);

  React.useEffect(() => {
    setFiltered(items);
  }, [items]);

  const bar = (
    <ProjectFilterBar
      items={items}
      lockedStatus={lockedStatus}
      showStatusFilter={showStatusFilter}
      onChange={setFiltered}
    />
  );

  return { filtered, filterBar: bar };
}
