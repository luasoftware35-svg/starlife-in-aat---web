import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { HOLDING_NAV } from '../../mock/mock';

export default function HoldingHeader({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenDropdown(null); }, [location.pathname]);

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
            <span className="text-gold">STAR</span>
            <span className="text-white">LİFE</span>
          </span>
          <span className="hidden sm:inline text-white/50 font-light text-xs tracking-[0.3em]">İNŞAAT</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {HOLDING_NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.href ? (
                <Link
                  to={item.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive(item.href) ? 'text-gold' : 'text-white/85 hover:text-gold'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button className="flex items-center gap-1 text-sm font-medium text-white/85 hover:text-gold transition-colors">
                  {item.label}
                  <ChevronDown size={14} className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                </button>
              )}
              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                  >
                    <div className="bg-dark/97 backdrop-blur-md border border-white/10 shadow-2xl min-w-[220px] py-2">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          to={c.href}
                          className="block px-5 py-3 text-sm text-white/75 hover:text-gold hover:bg-white/5 transition-colors"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/iletisim"
            className="hidden md:inline-block border border-gold text-gold px-5 py-2 text-xs tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-300"
          >
            Bize Ulaşın
          </Link>
          <button
            className="lg:hidden text-white/85 hover:text-gold transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-dark z-[60] flex flex-col"
          >
            <div className="flex justify-between items-center h-16 px-6 border-b border-white/10">
              <span className="font-black text-lg tracking-[0.15em] uppercase">
                <span className="text-gold">STAR</span><span className="text-white">LİFE</span>
              </span>
              <button onClick={() => setMobileOpen(false)} className="text-white/85">
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
                          <Link key={c.href} to={c.href} className="block py-2 text-white/60 text-sm hover:text-gold">{c.label}</Link>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              ))}
              <Link to="/iletisim" className="block mt-6 border border-gold text-gold px-5 py-3 text-xs tracking-widest uppercase text-center hover:bg-gold hover:text-black transition-all">
                Bize Ulaşın
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
