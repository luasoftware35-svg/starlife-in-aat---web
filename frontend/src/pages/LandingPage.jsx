import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, ArrowRight, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { HERO_SLIDES, HOLDING_NAV, COMPANY } from '../mock/mock';

const SLIDE_COUNT = HERO_SLIDES.length;
const SLIDE_INTERVAL_MS = 7000;
const EASE_PREMIUM = [0.22, 1, 0.36, 1];

const slideEnter = { opacity: 0, y: 24 };
const slideAnimate = { opacity: 1, y: 0 };
const imageEnter = { opacity: 0, scale: 1.08 };
const imageAnimate = { opacity: 1, scale: 1 };
const imageExit = { opacity: 0, scale: 1.02 };

export default function LandingPage() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setActive((p) => (p + 1) % SLIDE_COUNT), SLIDE_INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused]);

  const goToSlide = useCallback((i) => setActive(i), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const slides = HERO_SLIDES;
  const slide = slides[active];

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden flex flex-col-reverse md:flex-row bg-charcoal"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* === LEFT PANEL (38%) === */}
      <aside className="relative w-full md:w-[38%] h-[52vh] md:h-full flex flex-col justify-between
                        bg-gradient-to-b from-[#1a1a1a] via-[#101010] to-[#080808] z-10
                        overflow-hidden shrink-0 bg-noise">
        {/* Light leaks — refined pomegranate tones */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-[12%] w-[1px] h-full bg-gradient-to-b from-transparent via-pomegranate/25 to-transparent" />
          <div className="absolute top-0 left-[38%] w-[1px] h-full bg-gradient-to-b from-transparent via-pomegranate-light/15 to-transparent" />
          <div className="absolute top-0 left-[72%] w-[1px] h-full bg-gradient-to-b from-transparent via-pomegranate/10 to-transparent" />
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-[0.08]" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />
          <div className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />
        </div>

        {/* Vertical pagination dots */}
        <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-20">
          {slides.map((s, i) => (
            <button
              key={`dot-${s.tag}`}
              onClick={() => goToSlide(i)}
              aria-label={`slide-${i + 1}`}
              className="group flex items-center gap-3"
            >
              <span className={`block transition-all duration-500 ${
                i === active ? 'w-[2px] h-8 bg-pomegranate-light' : 'w-[2px] h-3 bg-white/25 group-hover:bg-white/55'
              }`} />
              <span className={`text-[10px] tracking-[0.3em] font-light transition-all duration-500 ${
                i === active ? 'opacity-100 text-pomegranate-light' : 'opacity-0 -ml-3'
              }`}>
                0{i + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile horizontal pagination */}
        <div className="flex md:hidden gap-2 absolute top-4 left-1/2 -translate-x-1/2 z-20">
          {slides.map((s, i) => (
            <button key={`mdot-${s.tag}`} onClick={() => goToSlide(i)} aria-label={`slide-${i + 1}`}
              className={`rounded-full transition-all duration-500 ${i === active ? 'w-8 h-1 bg-pomegranate-light' : 'w-1 h-1 bg-white/30'}`} />
          ))}
        </div>

        <div className="flex flex-col justify-end h-full pb-10 md:pb-24 px-7 md:pl-20 md:pr-10 z-10 max-w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
              className="flex flex-col"
            >
              <motion.span
                variants={{ hidden: slideEnter, visible: { ...slideAnimate, transition: { duration: 0.6, ease: EASE_PREMIUM } } }}
                className="text-pomegranate-light/90 text-[10px] md:text-[11px] tracking-[0.5em] uppercase mb-5 md:mb-7 font-medium"
              >
                <span className="inline-block w-8 h-[1px] bg-pomegranate-light/60 mr-3 align-middle" />
                {slide.tag}
              </motion.span>

              <motion.h1
                variants={{ hidden: slideEnter, visible: { ...slideAnimate, transition: { duration: 0.8, ease: EASE_PREMIUM } } }}
                className="font-serif-display text-white font-medium leading-[1.05] mb-6 whitespace-pre-line tracking-tight"
                style={{ fontSize: 'clamp(2.25rem, 3.6vw, 3.75rem)' }}
              >
                {slide.title}
              </motion.h1>

              <motion.div
                variants={{ hidden: slideEnter, visible: { ...slideAnimate, transition: { duration: 0.6, ease: EASE_PREMIUM } } }}
                className="w-12 h-[1px] bg-pomegranate-light/60 mb-6"
              />

              <motion.p
                variants={{ hidden: slideEnter, visible: { ...slideAnimate, transition: { duration: 0.6, ease: EASE_PREMIUM } } }}
                className="text-white/55 text-[13.5px] md:text-sm leading-[1.7] mb-9 md:mb-12 max-w-[340px] font-light"
              >
                {slide.desc}
              </motion.p>

              <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                <Link
                  to={slide.href}
                  className="group inline-flex items-center gap-4 text-pomegranate-light text-[11px] tracking-[0.35em] uppercase font-medium border-b border-pomegranate-light/30 hover:border-pomegranate-light pb-2 transition-colors duration-300"
                >
                  {slide.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom info bar on desktop */}
        <div className="hidden md:flex absolute bottom-6 left-20 right-10 items-center justify-between text-white/30 text-[10px] tracking-[0.3em] uppercase">
          <span>Diyarbakır · 2009</span>
          <span className="font-mono">
            <span className="text-pomegranate-light/80">0{active + 1}</span>
            <span className="mx-1 text-white/15">—</span>
            0{SLIDE_COUNT}
          </span>
        </div>
      </aside>

      {/* === RIGHT PANEL (62%) === */}
      <div className="relative w-full md:w-[62%] h-[48vh] md:h-full overflow-hidden bg-charcoal">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={imageEnter}
            animate={imageAnimate}
            exit={imageExit}
            transition={{ duration: 1.0, ease: EASE_PREMIUM }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Mobile: subtle slide indicator at bottom right */}
        <div className="absolute bottom-4 right-5 md:hidden text-white/50 text-[10px] tracking-[0.3em] font-mono">
          <span className="text-pomegranate-light">0{active + 1}</span> / 0{SLIDE_COUNT}
        </div>
      </div>

      {/* === HEADER === */}
      <header className="absolute top-0 left-0 w-full z-40 flex items-center justify-between px-5 md:px-12 h-14 md:h-20">
        <button onClick={openMenu} className="text-white/85 hover:text-pomegranate-light transition-colors p-2 -ml-2" aria-label="menu">
          <Menu size={20} strokeWidth={1.5} />
        </button>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-end gap-2.5">
          <span className="font-black text-[15px] md:text-lg tracking-[0.2em] uppercase leading-none">
            <span className="text-pomegranate-light">STAR</span>
            <span className="text-white">LİFE</span>
          </span>
          <span className="hidden sm:inline text-white/45 font-light text-[10px] md:text-[11px] tracking-[0.4em] leading-none mb-[2px]">İNŞAAT</span>
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <button onClick={openSearch} className="text-white/70 hover:text-pomegranate-light transition-colors p-2" aria-label="search">
            <Search size={17} strokeWidth={1.5} />
          </button>
          <Link to="/iletisim" className="hidden sm:inline-block text-white/70 hover:text-white text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-medium border-b border-transparent hover:border-pomegranate-light/60 transition-all pb-1">
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
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] bg-charcoal/98 backdrop-blur-md bg-noise"
          >
            <div className="max-w-[1400px] mx-auto h-full px-6 md:px-16 flex flex-col">
              <div className="flex justify-between items-center h-14 md:h-20">
                <span className="font-black text-base md:text-lg tracking-[0.2em] uppercase">
                  <span className="text-pomegranate-light">STAR</span><span className="text-white">LİFE</span>
                </span>
                <button onClick={closeMenu} className="text-white/85 hover:text-pomegranate-light p-2 -mr-2" aria-label="Close"><X size={22} strokeWidth={1.5} /></button>
              </div>
              <motion.nav
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                className="flex-1 flex flex-col justify-center gap-1 md:gap-3 overflow-y-auto py-8"
              >
                {HOLDING_NAV.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                  >
                    {item.href ? (
                      <Link to={item.href} onClick={closeMenu} className="block py-2 md:py-3 font-serif-display text-white text-3xl md:text-6xl font-medium hover:text-pomegranate-light transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <details className="group">
                        <summary className="py-2 md:py-3 font-serif-display text-white text-3xl md:text-6xl font-medium hover:text-pomegranate-light transition-colors cursor-pointer list-none flex items-center gap-3">
                          {item.label}
                          <ChevronDown size={24} className="text-pomegranate-light/60 group-open:rotate-180 transition-transform mt-1" />
                        </summary>
                        <div className="pl-4 md:pl-6 mt-2 mb-3 space-y-1">
                          {item.children.map((c) => (
                            <Link key={c.href} to={c.href} onClick={closeMenu} className="block text-white/55 text-base md:text-lg font-light hover:text-pomegranate-light transition-colors py-1.5">
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </details>
                    )}
                  </motion.div>
                ))}
              </motion.nav>
              <div className="py-6 border-t border-white/8 flex flex-col md:flex-row gap-3 md:gap-8 md:items-center text-white/40 text-[11px] tracking-[0.15em]">
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="flex items-center gap-2.5 hover:text-pomegranate-light transition-colors">
                  <Phone size={13} /> {COMPANY.phone}
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 hover:text-pomegranate-light transition-colors">
                  <Mail size={13} /> {COMPANY.email}
                </a>
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-charcoal/97 backdrop-blur-md flex items-start justify-center px-6 pt-32 md:pt-44"
            onClick={closeSearch}
          >
            <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4 border-b border-pomegranate-light/30 pb-4">
                <Search size={20} strokeWidth={1.5} className="text-pomegranate-light" />
                <input autoFocus placeholder="Aramak istediğinizi yazın..." className="flex-1 bg-transparent outline-none text-white text-xl md:text-2xl placeholder:text-white/25 font-light" />
                <button onClick={closeSearch} aria-label="Close"><X size={20} strokeWidth={1.5} className="text-white/60 hover:text-white" /></button>
              </div>
              <p className="mt-6 text-white/35 text-[10px] tracking-[0.3em] uppercase">Popüler: Konut Projeleri · Deprem Dayanıklılığı · Hakkımızda</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
