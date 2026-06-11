import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Search, ArrowUpRight, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { HERO_SLIDES, HOLDING_NAV, COMPANY } from '../mock/mock';

const SLIDE_COUNT = HERO_SLIDES.length;
const SLIDE_INTERVAL_MS = 7500;
const EASE = [0.22, 1, 0.36, 1];

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
  const num = String(active + 1).padStart(2, '0');
  const total = String(SLIDE_COUNT).padStart(2, '0');

  return (
    <main
      className="relative h-[100dvh] w-full overflow-hidden flex flex-col-reverse md:flex-row bg-charcoal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* === LEFT PANEL === */}
      <aside className="relative w-full md:w-[42%] h-[55vh] md:h-full flex flex-col z-10 overflow-hidden shrink-0 bg-charcoal bg-noise">
        {/* Cinematic gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#141414] via-[#0a0a0a] to-[#000000]" />

        {/* Subtle pomegranate glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-[0.10] blur-3xl" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />
          <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-3xl" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />
        </div>

        {/* Vertical pagination — desktop */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-5 z-20">
          {slides.map((s, i) => (
            <button
              key={`dot-${s.tag}`}
              onClick={() => goToSlide(i)}
              aria-label={`slide-${i + 1}`}
              className="group flex items-center gap-4 outline-none"
            >
              <span className={`font-mono-ui text-[10px] tracking-wider transition-all duration-500 ${i === active ? 'text-pomegranate-light' : 'text-white/25 group-hover:text-white/60'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`block h-[1px] transition-all duration-700 ease-out ${i === active ? 'w-12 bg-pomegranate-light' : 'w-4 bg-white/15 group-hover:w-6 group-hover:bg-white/40'}`} />
            </button>
          ))}
        </div>

        {/* Mobile horizontal pagination */}
        <div className="md:hidden absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {slides.map((s, i) => (
            <button key={`mdot-${s.tag}`} onClick={() => goToSlide(i)} aria-label={`slide-${i + 1}`}
              className={`h-[2px] transition-all duration-500 ${i === active ? 'w-8 bg-pomegranate-light' : 'w-4 bg-white/25'}`} />
          ))}
        </div>

        {/* Content wrapper */}
        <div className="relative h-full flex flex-col justify-end px-7 md:pl-24 md:pr-12 pb-10 md:pb-24 z-10">
          {/* Huge number — desktop only */}
          <div className="hidden md:block absolute right-8 top-24 pointer-events-none select-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`big-${active}`}
                initial={{ opacity: 0, y: 80, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 1, ease: EASE }}
                className="number-outline text-[clamp(8rem,14vw,16rem)] leading-none"
              >
                {num}
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
              }}
              className="flex flex-col relative"
            >
              {/* Eyebrow tag */}
              <motion.div
                variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } }}
                className="flex items-center gap-4 mb-7 md:mb-9"
              >
                <span className="w-9 h-[1px] bg-pomegranate-light" />
                <span className="font-mono-ui text-pomegranate-light text-[10px] tracking-[0.4em] uppercase">
                  {slide.tag}
                </span>
              </motion.div>

              {/* Main heading — Instrument Serif */}
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}
                className="font-serif-display text-white leading-[0.95] mb-7 md:mb-9 whitespace-pre-line"
                style={{ fontSize: 'clamp(3rem, 5.2vw, 5.5rem)' }}
              >
                {slide.title}
              </motion.h1>

              {/* Body copy */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
                className="text-white/55 text-[14px] md:text-[15px] leading-[1.75] mb-10 md:mb-14 max-w-[360px] font-light"
              >
                {slide.desc}
              </motion.p>

              {/* CTA */}
              <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                <Link
                  to={slide.href}
                  className="group inline-flex items-center gap-5 outline-none"
                >
                  <span className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-pomegranate-light/40 group-hover:border-pomegranate-light group-hover:bg-pomegranate-light transition-all duration-500">
                    <ArrowUpRight size={18} strokeWidth={1.5} className="text-pomegranate-light group-hover:text-white transition-colors duration-300" />
                  </span>
                  <span className="font-mono-ui text-white text-[11px] tracking-[0.35em] uppercase">
                    {slide.cta}
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom info bar — desktop */}
        <div className="hidden md:flex absolute bottom-6 left-24 right-10 items-center justify-between font-mono-ui text-white/30 text-[10px] tracking-[0.25em] uppercase">
          <span>Diyarbakır <span className="mx-2 text-white/15">/</span> Türkiye <span className="mx-2 text-white/15">/</span> 2009</span>
          <span>
            <span className="text-pomegranate-light">{num}</span>
            <span className="mx-2 text-white/15">—</span>
            <span className="text-white/40">{total}</span>
          </span>
        </div>
      </aside>

      {/* === RIGHT PANEL — Full bleed image === */}
      <div className="relative w-full md:w-[58%] h-[45vh] md:h-full overflow-hidden bg-charcoal">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            {/* Cinematic blends */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-charcoal/70 via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-charcoal/50 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Editorial label — top right corner */}
        <div className="hidden md:flex absolute top-24 right-10 flex-col items-end gap-2 z-20">
          <span className="font-mono-ui text-white/40 text-[10px] tracking-[0.3em] uppercase">{slide.tag}</span>
          <span className="w-12 h-[1px] bg-pomegranate-light/60" />
        </div>

        {/* Mobile slide counter */}
        <div className="absolute bottom-4 right-5 md:hidden font-mono-ui text-white/55 text-[10px] tracking-[0.3em]">
          <span className="text-pomegranate-light">{num}</span> / {total}
        </div>

        {/* Progress bar — visual interval indicator */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 overflow-hidden">
          <motion.div
            key={`bar-${active}-${paused}`}
            initial={{ width: '0%' }}
            animate={{ width: paused ? '0%' : '100%' }}
            transition={{ duration: paused ? 0 : SLIDE_INTERVAL_MS / 1000, ease: 'linear' }}
            className="h-full bg-pomegranate-light"
          />
        </div>
      </div>

      {/* === HEADER === */}
      <header className="absolute top-0 left-0 w-full z-40 flex items-center justify-between px-5 md:px-12 h-14 md:h-20">
        <button onClick={openMenu} className="flex items-center gap-3 text-white/85 hover:text-pomegranate-light transition-colors group" aria-label="menu">
          <Menu size={20} strokeWidth={1.5} />
          <span className="hidden md:inline font-mono-ui text-[10px] tracking-[0.35em] uppercase">Menü</span>
        </button>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          <span className="font-black text-[15px] md:text-lg tracking-[0.22em] uppercase leading-none">
            <span className="text-pomegranate-light">STAR</span>
            <span className="text-white">LİFE</span>
          </span>
          <span className="hidden sm:inline-block w-px h-3 bg-white/20" />
          <span className="hidden sm:inline text-white/45 font-light text-[10px] md:text-[11px] tracking-[0.4em] leading-none">İNŞAAT</span>
        </Link>

        <div className="flex items-center gap-3 md:gap-7">
          <button onClick={openSearch} className="text-white/70 hover:text-pomegranate-light transition-colors p-2 -mr-2" aria-label="search">
            <Search size={17} strokeWidth={1.5} />
          </button>
          <Link to="/iletisim" className="hidden sm:inline-flex items-center gap-2 text-white/70 hover:text-white text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-mono-ui group">
            E-Katalog
            <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[70] bg-charcoal/98 backdrop-blur-xl bg-noise overflow-y-auto"
          >
            <div className="max-w-[1400px] mx-auto min-h-[100dvh] px-6 md:px-16 flex flex-col">
              <div className="flex justify-between items-center h-14 md:h-20 shrink-0">
                <span className="font-black text-[15px] md:text-lg tracking-[0.22em] uppercase">
                  <span className="text-pomegranate-light">STAR</span><span className="text-white">LİFE</span>
                </span>
                <button onClick={closeMenu} className="flex items-center gap-3 text-white/85 hover:text-pomegranate-light p-2 -mr-2" aria-label="Close">
                  <span className="hidden md:inline font-mono-ui text-[10px] tracking-[0.35em] uppercase">Kapat</span>
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>
              <motion.nav
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                className="flex-1 flex flex-col justify-center gap-1 md:gap-2 py-10"
              >
                {HOLDING_NAV.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex items-baseline gap-4 md:gap-7"
                  >
                    <span className="font-mono-ui text-pomegranate-light/60 text-[10px] tracking-widest">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {item.href ? (
                      <Link
                        to={item.href}
                        onClick={closeMenu}
                        className="block font-serif-display text-white text-4xl md:text-7xl leading-tight hover:text-pomegranate-light hover:italic transition-all duration-300 py-1"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <details className="group flex-1">
                        <summary className="font-serif-display text-white text-4xl md:text-7xl leading-tight cursor-pointer list-none flex items-baseline gap-3 md:gap-5 hover:text-pomegranate-light hover:italic transition-all duration-300 py-1">
                          {item.label}
                          <ChevronDown size={22} strokeWidth={1.5} className="text-pomegranate-light/60 group-open:rotate-180 transition-transform translate-y-1" />
                        </summary>
                        <div className="pl-4 md:pl-8 mt-3 mb-4 space-y-1.5 border-l border-white/10 ml-2">
                          {item.children.map((c) => (
                            <Link
                              key={c.href}
                              to={c.href}
                              onClick={closeMenu}
                              className="block text-white/55 text-base md:text-lg font-light hover:text-pomegranate-light hover:translate-x-1 transition-all duration-300 py-1.5 pl-4"
                            >
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </details>
                    )}
                  </motion.div>
                ))}
              </motion.nav>
              <div className="py-6 border-t border-white/8 flex flex-col md:flex-row gap-3 md:gap-10 md:items-center font-mono-ui text-white/40 text-[11px] tracking-[0.15em] shrink-0">
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="flex items-center gap-2.5 hover:text-pomegranate-light transition-colors">
                  <Phone size={13} strokeWidth={1.5} /> {COMPANY.phone}
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 hover:text-pomegranate-light transition-colors">
                  <Mail size={13} strokeWidth={1.5} /> {COMPANY.email}
                </a>
                <span className="text-white/30 md:ml-auto">Diyarbakır · Türkiye</span>
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
            className="fixed inset-0 z-[70] bg-charcoal/97 backdrop-blur-xl flex items-start justify-center px-6 pt-32 md:pt-44"
            onClick={closeSearch}
          >
            <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4 border-b border-pomegranate-light/30 pb-4">
                <Search size={20} strokeWidth={1.5} className="text-pomegranate-light" />
                <input autoFocus placeholder="Aramak istediğinizi yazın..." className="flex-1 bg-transparent outline-none text-white font-serif-display text-2xl md:text-4xl placeholder:text-white/25" />
                <button onClick={closeSearch} aria-label="Close"><X size={20} strokeWidth={1.5} className="text-white/60 hover:text-white" /></button>
              </div>
              <p className="mt-6 font-mono-ui text-white/35 text-[10px] tracking-[0.3em] uppercase">Popüler / Konut Projeleri · Deprem Dayanıklılığı · Hakkımızda</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
