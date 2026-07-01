import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import NavItem, { useHeaderState } from '../shared/NavItem';
import BrandLogo from '../shared/BrandLogo';
import SkipToContent from '../shared/SkipToContent';
import SiteSearchOverlay, { useSiteSearchOverlay } from '../shared/SiteSearchOverlay';
import { HOLDING_NAV } from '../../mock/mock';

const MOBILE_VARIANTS = {
  initial: { x: '100%' },
  animate: { x: '0%' },
  exit: { x: '100%' },
};
const MOBILE_TRANSITION = { duration: 0.4, ease: [0.22, 1, 0.36, 1] };

function MobileMenu({ open, onClose }) {
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;
  if (typeof document === 'undefined') return null;

  const toggleItem = (label) => {
    setExpandedItem((current) => (current === label ? null : label));
  };

  return createPortal(
    <motion.div
      initial={MOBILE_VARIANTS.initial}
      animate={MOBILE_VARIANTS.animate}
      exit={MOBILE_VARIANTS.exit}
      transition={MOBILE_TRANSITION}
      className="fixed inset-0 z-[999] flex min-h-[100dvh] flex-col bg-white"
    >
      <div className="flex justify-between items-center h-16 px-6 border-b border-stone-200/60">
        <BrandLogo variant="dark" width={140} height={40} />
        <button type="button" onClick={onClose} className="grid h-11 w-11 place-items-center text-stone-700 hover:text-gold transition-colors" aria-label="Close menu">
          <X size={24} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-2">
        {HOLDING_NAV.map((item) => (
          <div key={item.label} className="border-b border-stone-100 py-2">
            {item.href ? (
              <Link to={item.href} onClick={onClose} className="block py-2 text-ink font-light text-base hover:text-gold transition-colors">{item.label}</Link>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => toggleItem(item.label)}
                  className="flex w-full items-center justify-between py-2 text-left text-base font-light text-ink transition-colors hover:text-gold"
                  aria-expanded={expandedItem === item.label}
                >
                  {item.label}
                  <ChevronDown size={16} className={`transition-transform ${expandedItem === item.label ? 'rotate-180' : ''}`} />
                </button>
                {expandedItem === item.label && (
                  <div className="pl-3 pb-2">
                  {item.children.map((c) => (
                    <Link key={c.href} to={c.href} onClick={onClose} className="block py-2 text-stone-500 text-sm hover:text-gold transition-colors">{c.label}</Link>
                  ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        <Link to="/iletisim" onClick={onClose} className="block mt-6 border border-gold text-gold px-5 py-3 text-[11px] tracking-[0.25em] uppercase text-center font-medium hover:bg-gold hover:text-white transition-all">
          Bize Ulaşın
        </Link>
      </div>
    </motion.div>,
    document.body
  );
}

export default function HoldingHeader({ transparent = false }) {
  const location = useLocation();
  const { scrolled, mobileOpen, openMobile, closeMobile } = useHeaderState(location.pathname);
  const { open, openSearch, closeSearch } = useSiteSearchOverlay();
  const isActive = (href) => location.pathname === href;
  const showBg = !transparent || scrolled;
  const handleOpenMobile = (event) => {
    event.preventDefault();
    event.stopPropagation();
    openMobile();
  };

  return (
    <>
      <SkipToContent />
      <header
      className={`fixed top-0 left-0 w-full z-[100] h-16 transition-all duration-300 ${
        showBg ? 'bg-white/90 backdrop-blur-md border-b border-stone-200/60' : 'backdrop-blur-md bg-white/60 border-b border-white/40'
      }`}
    >
      <div className="h-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BrandLogo variant="dark" width={140} height={40} />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {HOLDING_NAV.map((item) => (
            <NavItem key={item.label} item={item} isActive={isActive} />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openSearch}
            className="grid h-11 w-11 place-items-center text-stone-700 hover:text-gold transition-colors"
            aria-label="Site araması"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>
          <Link
            to="/iletisim"
            className="hidden md:inline-block border border-gold text-gold text-[11px] tracking-[0.25em] font-medium px-5 py-2 hover:bg-gold hover:text-white transition-all duration-300"
          >
            Bize Ulaşın
          </Link>
          <button
            type="button"
            className="relative z-[95] grid h-11 w-11 place-items-center lg:hidden text-stone-700 hover:text-gold transition-colors"
            onClick={handleOpenMobile}
            onTouchEnd={handleOpenMobile}
            aria-label="menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        <MobileMenu open={mobileOpen} onClose={closeMobile} />
      </AnimatePresence>
    </header>
      <SiteSearchOverlay open={open} onClose={closeSearch} basePath="" />
    </>
  );
}
