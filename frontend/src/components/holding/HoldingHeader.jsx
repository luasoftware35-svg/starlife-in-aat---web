import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import NavItem, { useHeaderState } from '../shared/NavItem';
import { HOLDING_NAV } from '../../mock/mock';

const MOBILE_VARIANTS = {
  initial: { x: '100%' },
  animate: { x: '0%' },
  exit: { x: '100%' },
};
const MOBILE_TRANSITION = { duration: 0.4, ease: [0.22, 1, 0.36, 1] };

function MobileMenu({ open, onClose }) {
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
          <span className="text-pomegranate">STAR</span><span className="text-white">LİFE</span>
        </span>
        <button onClick={onClose} className="text-white/85" aria-label="Close menu">
          <X size={24} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-2">
        {HOLDING_NAV.map((item) => (
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
        <Link to="/iletisim" className="block mt-6 border border-pomegranate text-pomegranate-light px-5 py-3 text-xs tracking-widest uppercase text-center hover:bg-pomegranate hover:text-white transition-all">
          Bize Ulaşın
        </Link>
      </div>
    </motion.div>
  );
}

export default function HoldingHeader({ transparent = false }) {
  const location = useLocation();
  const { scrolled, mobileOpen, openMobile, closeMobile } = useHeaderState(location.pathname);
  const isActive = (href) => location.pathname === href;
  const showBg = !transparent || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 h-16 transition-all duration-300 ${
        showBg ? 'bg-dark/95 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-black text-lg tracking-[0.15em] uppercase">
            <span className="text-pomegranate">STAR</span>
            <span className="text-white">LİFE</span>
          </span>
          <span className="hidden sm:inline text-white/50 font-light text-xs tracking-[0.3em]">İNŞAAT</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {HOLDING_NAV.map((item) => (
            <NavItem key={item.label} item={item} isActive={isActive} />
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/iletisim"
            className="hidden md:inline-block border border-pomegranate text-pomegranate-light px-5 py-2 text-xs tracking-widest uppercase hover:bg-pomegranate hover:text-white transition-all duration-300"
          >
            Bize Ulaşın
          </Link>
          <button
            className="lg:hidden text-white/85 hover:text-pomegranate-light transition-colors"
            onClick={openMobile}
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
  );
}
