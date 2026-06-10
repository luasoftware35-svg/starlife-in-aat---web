import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, ArrowRight, X, ChevronDown } from 'lucide-react';
import { HERO_SLIDES, HOLDING_NAV } from '../mock/mock';

const SLIDE_COUNT = HERO_SLIDES.length;

export default function LandingPage() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % SLIDE_COUNT), 6000);
    return () => clearInterval(t);
  }, []);

  const goToSlide = useCallback((i) => setActive(i), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const slides = HERO_SLIDES;

  return (
    <main className="relative h-screen w-full overflow-hidden flex flex-col-reverse md:flex-row bg-dark">
      {/* === LEFT PANEL (35%) === */}
      <aside className="relative w-full md:w-[38%] h-[55vh] md:h-full flex flex-col justify-between
                        bg-gradient-to-b from-[#1a1a1a] via-[#111111] to-[#080808] z-10
                        overflow-hidden shrink-0">
        {/* Light leak verticals - pomegranate tones */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-[15%] w-[1px] h-full bg-gradient-to-b from-transparent via-pomegranate/30 to-transparent" />
          <div className="absolute top-0 left-[40%] w-[1px] h-full bg-gradient-to-b from-transparent via-pomegranate-light/20 to-transparent" />
          <div className="absolute top-0 left-[70%] w-[1px] h-full bg-gradient-to-b from-transparent via-pomegranate/15 to-transparent" />
          {/* subtle pomegranate grain */}
          <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(200,16,46,0.5) 0%, transparent 50%)' }} />
        </div>

        {/* Vertical pagination dots */}
        <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-20">
          {slides.map((s, i) => (
            <button
              key={`dot-${s.tag}`}
              onClick={() => goToSlide(i)}
              aria-label={`slide-${i + 1}`}
              className={`rounded-full transition-all duration-500 ${
                i === active ? 'w-2 h-7 bg-pomegranate' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Mobile horizontal pagination */}
        <div className="flex md:hidden gap-2 absolute top-4 left-1/2 -translate-x-1/2 z-20">
          {slides.map((s, i) => (
            <button key={`mdot-${s.tag}`} onClick={() => goToSlide(i)} className={`rounded-full transition-all duration-500 ${i === active ? 'w-7 h-1.5 bg-pomegranate' : 'w-1.5 h-1.5 bg-white/30'}`} />
          ))}
        </div>

        <div className="flex flex-col justify-end h-full pb-10 md:pb-20 px-6 md:pl-16 md:pr-8 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-white/40 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 md:mb-5 font-medium"
              >
                {slides[active].tag}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-white font-black leading-[1.1] mb-5 whitespace-pre-line"
                style={{ fontSize: 'clamp(1.75rem, 3.2vw, 3rem)' }}
              >
                {slides[active].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-white/55 text-sm leading-relaxed mb-8 md:mb-10 max-w-[320px]"
              >
                {slides[active].desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to={slides[active].href}
                  className="inline-flex items-center gap-3 border border-gold text-gold text-[11px] tracking-[0.3em] uppercase px-7 py-3 hover:bg-gold hover:text-black transition-all duration-300"
                >
                  {slides[active].cta} <ArrowRight size={12} />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </aside>

      {/* === RIGHT PANEL (65%) === */}
      <div className="relative w-full md:w-[62%] h-[45vh] md:h-full overflow-hidden bg-dark">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={slides[active].image}
              alt={slides[active].title}
              className="w-full h-full object-cover"
            />
            {/* Edge gradient for blend with left panel */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Slide counter */}
        <div className="absolute bottom-6 right-8 text-white/40 text-xs tracking-[0.3em] font-mono">
          <span className="text-gold">0{active + 1}</span> <span className="text-white/20">/</span> 0{slides.length}
        </div>

        {/* Vertical text label */}
        <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3">
          <div className="w-[1px] h-16 bg-white/20" />
          <span className="text-white/40 text-[10px] tracking-[0.4em] uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        </div>
      </div>

      {/* === HEADER === */}
      <header className="absolute top-0 left-0 w-full z-40 flex items-center justify-between px-6 md:px-10 h-16">
        <button onClick={openMenu} className="text-white/85 hover:text-gold transition-colors" aria-label="menu">
          <Menu size={22} />
        </button>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-end gap-2">
          <span className="font-black text-base md:text-lg tracking-[0.15em] uppercase leading-none">
            <span className="text-gold">STAR</span>
            <span className="text-white">LİFE</span>
          </span>
          <span className="hidden sm:inline text-white/55 font-light text-[10px] md:text-xs tracking-[0.3em] leading-none mb-0.5">İNŞAAT</span>
        </Link>

        <div className="flex items-center gap-5">
          <button onClick={openSearch} className="text-white/70 hover:text-gold transition-colors" aria-label="search">
            <Search size={18} />
          </button>
          <Link to="/iletisim" className="hidden sm:inline-block text-white/70 hover:text-white text-[11px] tracking-[0.25em] uppercase border-b border-transparent hover:border-gold transition-all pb-0.5">
            E-Katalog
          </Link>
        </div>
      </header>

      {/* Hamburger Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-dark/97 backdrop-blur-md"
          >
            <div className="max-w-[1400px] mx-auto h-full px-8 md:px-16 flex flex-col">
              <div className="flex justify-between items-center h-16">
                <span className="font-black text-lg tracking-[0.15em] uppercase">
                  <span className="text-gold">STAR</span><span className="text-white">LİFE</span>
                </span>
                <button onClick={closeMenu} className="text-white/85 hover:text-gold"><X size={22} /></button>
              </div>
              <motion.nav
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                className="flex-1 flex flex-col justify-center gap-3 md:gap-5"
              >
                {HOLDING_NAV.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
                  >
                    {item.href ? (
                      <Link to={item.href} onClick={closeMenu} className="text-white text-3xl md:text-5xl font-black hover:text-gold transition-colors block py-2">
                        {item.label}
                      </Link>
                    ) : (
                      <details className="group">
                        <summary className="text-white text-3xl md:text-5xl font-black hover:text-gold transition-colors py-2 cursor-pointer list-none flex items-center gap-3">
                          {item.label}
                          <ChevronDown size={28} className="text-gold/60 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="pl-6 mt-3 space-y-2">
                          {item.children.map((c) => (
                            <Link key={c.href} to={c.href} onClick={closeMenu} className="block text-white/60 text-lg hover:text-gold transition-colors py-1">
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </details>
                    )}
                  </motion.div>
                ))}
              </motion.nav>
              <div className="py-8 border-t border-white/10 text-white/40 text-xs tracking-widest">
                <p>Ceysa Serhat Plaza B Blok Kat 2 No:2 Kayapınar/Diyarbakır</p>
                <p className="mt-1">0412 504 1008 · tanitimmedya@starlifeinsaat.com</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-dark/97 backdrop-blur-md flex items-center justify-center px-6"
            onClick={closeSearch}
          >
            <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4 border-b border-gold/40 pb-4">
                <Search size={20} className="text-gold" />
                <input autoFocus placeholder="Aramak istediğinizi yazın..." className="flex-1 bg-transparent outline-none text-white text-2xl placeholder:text-white/30" />
                <button onClick={closeSearch}><X size={20} className="text-white/60 hover:text-white" /></button>
              </div>
              <p className="mt-6 text-white/40 text-xs tracking-widest uppercase">Popüler: Konut Projeleri · Deprem Dayanıklılığı · Hakkımızda</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
