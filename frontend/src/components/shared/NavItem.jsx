import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const DROPDOWN_VARIANTS = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

const DROPDOWN_TRANSITION = { duration: 0.2 };

/**
 * Renders a single header navigation item.
 * If `children` are provided, displays a hover dropdown.
 */
export default function NavItem({ item, isActive }) {
  const [open, setOpen] = useState(false);
  const onEnter = useCallback(() => setOpen(true), []);
  const onLeave = useCallback(() => setOpen(false), []);

  if (!item.children) {
    return (
      <Link
        to={item.href}
        className={`border-b border-transparent text-[13px] tracking-[0.12em] transition-all duration-200 ${
          isActive(item.href) ? 'text-gold font-medium' : 'text-stone-700 font-light hover:text-gold hover:border-gold'
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button className="flex items-center gap-1 border-b border-transparent text-[13px] font-light tracking-[0.12em] text-stone-700 hover:text-gold hover:border-gold transition-all duration-200">
        {item.label}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={DROPDOWN_VARIANTS.initial}
            animate={DROPDOWN_VARIANTS.animate}
            exit={DROPDOWN_VARIANTS.exit}
            transition={DROPDOWN_TRANSITION}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
          >
            <div className="bg-white/95 backdrop-blur-sm border border-stone-100 shadow-lg shadow-stone-200/50 min-w-[240px] py-2">
              {item.children.map((c) => (
                <Link
                  key={c.href}
                  to={c.href}
                  className="block px-5 py-3 text-[13px] font-light tracking-wide text-stone-600 hover:text-gold hover:bg-stone-50 transition-colors"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Custom hook: tracks scroll position past a threshold and resets dropdown/mobile state on route change.
 */
export function useHeaderState(pathname) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastPathRef = useRef(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (lastPathRef.current !== pathname) {
      setMobileOpen(false);
      lastPathRef.current = pathname;
    }
  }, [pathname]);

  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return { scrolled, mobileOpen, openMobile, closeMobile };
}
