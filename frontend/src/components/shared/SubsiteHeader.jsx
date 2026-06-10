import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import NavItem, { useHeaderState } from './NavItem';

const MOBILE_VARIANTS = {
  initial: { x: '100%' },
  animate: { x: '0%' },
  exit: { x: '100%' },
};
const MOBILE_TRANSITION = { duration: 0.4, ease: [0.22, 1, 0.36, 1] };

function MobileNav({ navItems, brandPrefix, brandSuffix, accentClass, onClose, open }) {
  if (!open) return null;
  return (
    <motion.div
      initial={MOBILE_VARIANTS.initial}
      animate={MOBILE_VARIANTS.animate}
      exit={MOBILE_VARIANTS.exit}
      transition={MOBILE_TRANSITION}
      className="fixed inset-0 bg-dark z-[60] flex flex-col"
    >
      <div className="flex justify-between items-center h-16 px-6 border-b border-white/10">
        <span className="font-black text-lg tracking-[0.15em] uppercase">
          <span className={accentClass}>{brandPrefix}</span><span className="text-white">{brandSuffix}</span>
        </span>
        <button onClick={onClose} className="text-white/85" aria-label="Close menu"><X size={24} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-2">
        {navItems.map((item) => (
          <div key={item.label} className="border-b border-white/5 py-2">
            {item.href ? (
              <Link to={item.href} className="block py-2 text-white/85 text-base">{item.label}</Link>
            ) : (
              <details>
                <summary className="py-2 text-white/85 text-base cursor-pointer list-none flex justify-between items-center">
                  {item.label} <ChevronDown size={16} />
                </summary>
                <div className="pl-3 pb-2">
                  {item.children.map((c) => (
                    <Link key={c.href} to={c.href} className="block py-2 text-white/60 text-sm hover:text-pomegranate-light">{c.label}</Link>
                  ))}
                </div>
              </details>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SubsiteHeader({ navItems, brandPrefix, brandSuffix, contactHref, accentClass = 'text-pomegranate' }) {
  const location = useLocation();
  const { scrolled, mobileOpen, openMobile, closeMobile } = useHeaderState(location.pathname);
  const isActive = (href) => location.pathname === href;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 h-16 transition-all duration-300 ${
      scrolled ? 'bg-dark/95 backdrop-blur-sm border-b border-white/10' : 'bg-dark/40 backdrop-blur-sm'
    }`}>
      <div className="h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="font-black text-lg tracking-[0.15em] uppercase">
            <span className={accentClass}>{brandPrefix}</span>
            <span className="text-white">{brandSuffix}</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-7">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} isActive={isActive} />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to={contactHref} className="hidden md:inline-block border border-pomegranate text-pomegranate-light px-5 py-2 text-xs tracking-widest uppercase hover:bg-pomegranate hover:text-white transition-all duration-300">
            Bize Ulaşın
          </Link>
          <button className="xl:hidden text-white/85" onClick={openMobile} aria-label="menu">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        <MobileNav navItems={navItems} brandPrefix={brandPrefix} brandSuffix={brandSuffix} accentClass={accentClass} onClose={closeMobile} open={mobileOpen} />
      </AnimatePresence>
    </header>
  );
}
