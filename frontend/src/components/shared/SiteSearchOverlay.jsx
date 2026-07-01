import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight, X } from 'lucide-react';
import { POPULAR_SEARCHES, searchSite } from '../../lib/siteSearch';

export default function SiteSearchOverlay({ open, onClose, basePath = '' }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return undefined;
    }
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const results = useMemo(
    () => searchSite(query, { basePath, limit: 15 }),
    [query, basePath],
  );

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[120] bg-white/95 backdrop-blur-xl flex items-start justify-center px-6 pt-28 md:pt-36"
        onClick={onClose}
        role="presentation"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="w-full max-w-2xl"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="site-search-title"
        >
          <p id="site-search-title" className="sr-only">
            Site arama
          </p>
          <div className="flex items-center gap-4 border-b border-gold/30 pb-4">
            <Search size={20} strokeWidth={1.5} className="text-gold shrink-0" aria-hidden="true" />
            <label htmlFor="site-search-input" className="sr-only">
              Arama
            </label>
            <input
              ref={inputRef}
              id="site-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Aramak istediğinizi yazın..."
              className="flex-1 bg-transparent outline-none text-ink font-sans font-light text-2xl md:text-4xl placeholder:text-stone-300"
              autoComplete="off"
            />
            <button type="button" onClick={onClose} aria-label="Aramayı kapat">
              <X size={20} strokeWidth={1.5} className="text-stone-500 hover:text-ink" />
            </button>
          </div>

          {query.trim() ? (
            <div className="mt-8 max-h-[55vh] overflow-y-auto">
              {results.length > 0 ? (
                <ul className="space-y-2" aria-live="polite">
                  {results.map((result) => (
                    <li key={`${result.href}-${result.title}`}>
                      <Link
                        to={result.href}
                        onClick={onClose}
                        className="group flex items-start justify-between gap-4 rounded-lg px-4 py-4 transition-colors hover:bg-stone-100"
                      >
                        <div>
                          <p className="font-sans text-lg font-medium text-ink group-hover:text-gold transition-colors">
                            {result.title}
                          </p>
                          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.25em] text-stone-400">
                            {result.category}
                          </p>
                        </div>
                        <ArrowUpRight size={16} className="mt-1 shrink-0 text-stone-300 group-hover:text-gold transition-colors" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-sans text-stone-500 text-base">
                  “{query}” için sonuç bulunamadı. Farklı bir kelime deneyin.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-6">
              <p className="font-sans text-stone-400 text-[11px] font-medium tracking-[0.3em] uppercase mb-4">
                Popüler aramalar
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item.query}
                    type="button"
                    onClick={() => setQuery(item.query)}
                    className="rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-600 transition-colors hover:border-gold hover:text-gold"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function useSiteSearchOverlay() {
  const [open, setOpen] = useState(false);
  return {
    open,
    openSearch: () => setOpen(true),
    closeSearch: () => setOpen(false),
  };
}
