import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const DROPDOWN_VARIANTS = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
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
        className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
          isActive(item.href) ? 'text-pomegranate' : 'text-white/85 hover:text-pomegranate-light'
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button className="flex items-center gap-1 text-sm font-medium text-white/85 hover:text-pomegranate-light transition-colors">
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
            <div className="bg-dark/97 backdrop-blur-md border border-white/10 shadow-2xl min-w-[240px] py-2">
              {item.children.map((c) => (
                <Link
                  key={c.href}
                  to={c.href}
                  className="block px-5 py-3 text-sm text-white/75 hover:text-pomegranate-light hover:bg-white/5 transition-colors"
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
