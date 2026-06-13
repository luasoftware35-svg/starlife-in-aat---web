import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import cities from 'react-turkey-map/src/cities';
import HoldingHeader from '../components/holding/HoldingHeader';
import HoldingFooter from '../components/holding/HoldingFooter';
import PageHero from '../components/shared/PageHero';
import { mapLocation, useSupabaseRows } from '../lib/supabase/content';

const EASE = [0.22, 1, 0.36, 1];

const locations = [
  {
    id: 1,
    plate: '34',
    city: 'İstanbul',
    region: 'MARMARA',
    count: 1,
    year: '2024-2026',
    cx: '14%',
    cy: '26%',
    project: { name: 'İstanbul Konut Projesi', desc: 'Modern şehir yaşamı için tasarlanmış premium konut projesi.', image: '/images/projects/istanbul.jpg', units: 120, sqm: 8500, year: '2024-2026', status: 'DEVAM EDİYOR' },
  },
  {
    id: 2,
    plate: '06',
    city: 'Ankara',
    region: 'İÇ ANADOLU',
    count: 1,
    year: '2025',
    cx: '38%',
    cy: '38%',
    project: { name: 'Ankara Karma Proje', desc: 'Ticari ve konut kullanımını bir arada sunan karma proje.', image: '/images/projects/ankara.jpg', units: 85, sqm: 12000, year: '2025', status: 'DEVAM EDİYOR' },
  },
  {
    id: 3,
    plate: '41',
    city: 'Kocaeli',
    region: 'MARMARA',
    count: 1,
    year: '2023',
    cx: '22%',
    cy: '22%',
    project: { name: 'Kocaeli Residence', desc: 'Sanayi şehrinin kalbinde huzurlu yaşam alanları.', image: '/images/projects/kocaeli.jpg', units: 60, sqm: 4200, year: '2023', status: 'TAMAMLANDI' },
  },
  {
    id: 4,
    plate: '11',
    city: 'Bilecik',
    region: 'MARMARA',
    count: 1,
    year: '2022',
    cx: '27%',
    cy: '30%',
    project: { name: 'Bilecik Konut', desc: 'Doğayla iç içe, modern yaşam standartlarında konutlar.', image: '/images/projects/bilecik.jpg', units: 40, sqm: 3100, year: '2022', status: 'TAMAMLANDI' },
  },
  {
    id: 5,
    plate: '20',
    city: 'Denizli',
    region: 'EGE',
    count: 1,
    year: '2024-2025',
    cx: '20%',
    cy: '56%',
    project: { name: 'Denizli Residence', desc: "Ege'nin sıcaklığında modern yaşam kompleksi.", image: '/images/projects/denizli.jpg', units: 72, sqm: 5800, year: '2024-2025', status: 'DEVAM EDİYOR' },
  },
  {
    id: 6,
    plate: '07',
    city: 'Antalya',
    region: 'AKDENİZ',
    count: 1,
    year: '2025-2026',
    cx: '30%',
    cy: '70%',
    project: { name: 'Lara Coastal Villas', desc: 'Akdeniz kıyısında, doğal taş ve travertenin ışıkla diyaloğunu kuran limitli sayıda villa serisi.', image: '/images/projects/antalya.jpg', units: 42, sqm: 16500, year: '2025-2026', status: 'DEVAM EDİYOR' },
  },
  {
    id: 7,
    plate: '63',
    city: 'Şanlıurfa',
    region: 'GÜNEYDOĞU',
    count: 1,
    year: '2024-2026',
    cx: '62%',
    cy: '68%',
    project: { name: 'Urfa Konut Projesi', desc: 'Tarihi dokunun modern yorumu ile şekillenen yaşam alanları.', image: '/images/projects/urfa.jpg', units: 95, sqm: 7200, year: '2024-2026', status: 'DEVAM EDİYOR' },
  },
  {
    id: 8,
    plate: '44',
    city: 'Malatya',
    region: 'DOĞU ANADOLU',
    count: 1,
    year: '2024-2026',
    cx: '65%',
    cy: '52%',
    project: { name: 'Malatya Residence', desc: "Doğu Anadolu'nun merkezinde kaliteli ve güvenli yaşam.", image: '/images/projects/malatya.jpg', units: 55, sqm: 4600, year: '2024-2026', status: 'DEVAM EDİYOR' },
  },
  {
    id: 9,
    plate: '23',
    city: 'Elazığ',
    region: 'DOĞU ANADOLU',
    count: 1,
    year: '2024-2026',
    cx: '70%',
    cy: '48%',
    project: { name: 'Elazığ Konut', desc: 'Depreme dayanıklı modern yapı teknolojisiyle inşa edilen konut projesi.', image: '/images/projects/elazig.jpg', units: 48, sqm: 3800, year: '2024-2026', status: 'DEVAM EDİYOR' },
  },
  {
    id: 10,
    plate: '21',
    city: 'Diyarbakır',
    region: 'GÜNEYDOĞU',
    count: 1,
    year: '2024-2025',
    cx: '74%',
    cy: '60%',
    project: { name: 'Starlife Residence', desc: "Starlife İnşaat'ın Diyarbakır'daki amiral gemisi konut projesi.", image: '/images/projects/diyarbakir.jpg', units: 110, sqm: 9200, year: '2024-2025', status: 'DEVAM EDİYOR' },
  },
  {
    id: 11,
    plate: '73',
    city: 'Şırnak',
    region: 'GÜNEYDOĞU',
    count: 1,
    year: '2024-2025',
    cx: '82%',
    cy: '66%',
    project: { name: 'Şırnak Konut Projesi', desc: 'Sınır şehrinde modern ve güvenli yaşam alanları.', image: '/images/projects/sirnak.jpg', units: 35, sqm: 2900, year: '2024-2025', status: 'DEVAM EDİYOR' },
  },
];

const coordinates = {
  İstanbul: '41.01° N · 28.97° E',
  Ankara: '39.93° N · 32.85° E',
  Kocaeli: '40.77° N · 29.94° E',
  Bilecik: '40.14° N · 29.98° E',
  Denizli: '37.78° N · 29.09° E',
  Antalya: '36.91° N · 30.71° E',
  Şanlıurfa: '37.16° N · 38.79° E',
  Malatya: '38.36° N · 38.31° E',
  Elazığ: '38.68° N · 39.22° E',
  Diyarbakır: '37.91° N · 40.23° E',
  Şırnak: '37.52° N · 42.46° E',
};

function ProjectImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-[#202020] via-[#171717] to-[#0F0F0F]" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full aspect-video object-cover"
      onError={() => setFailed(true)}
    />
  );
}

function DetailPanel({ selected, onClose }) {
  return (
    <AnimatePresence mode="wait">
      {selected && (
        <motion.aside
          key={selected.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full lg:w-[400px] bg-[#151515] border border-stone-800 p-6 lg:p-8 shadow-2xl shadow-black/30"
        >
          <div className="flex items-start justify-between gap-6">
            <span className="text-[10px] tracking-[0.4em] text-stone-500 uppercase">
              {selected.region}
            </span>
            <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase text-right">
              {coordinates[selected.city]}
            </span>
          </div>

          <h3 className="font-serif italic text-white mt-4 leading-none" style={{ fontSize: 'clamp(3.5rem, 7vw, 5rem)' }}>
            {selected.city}
          </h3>

          <div className="relative mt-8 overflow-hidden border border-stone-800">
            <ProjectImage src={selected.project.image} alt={selected.project.name} />
            <span className="absolute top-4 left-4 text-[10px] text-gold tracking-[0.35em] uppercase bg-[#0F0F0F]/80 px-3 py-1">
              {selected.project.status}
            </span>
          </div>

          <h4 className="font-serif italic text-white text-2xl mt-6">
            {selected.project.name}
          </h4>
          <p className="font-light text-sm text-stone-400 leading-relaxed mt-3">
            {selected.project.desc}
          </p>

          <div className="grid grid-cols-3 border border-stone-800 mt-8">
            {[
              ['ÜNİTE', selected.project.units],
              ['M²', selected.project.sqm.toLocaleString('tr-TR')],
              ['YIL', selected.project.year],
            ].map(([label, value]) => (
              <div key={label} className="p-4 border-r border-stone-800 last:border-r-0">
                <div className="text-[10px] tracking-widest text-stone-500 uppercase">{label}</div>
                <div className="font-bold text-white text-lg mt-2">{value}</div>
              </div>
            ))}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default function OperasyonHaritasi() {
  const operationLocations = useSupabaseRows(
    'map_locations',
    { orderBy: 'order_index', ascending: true, filters: [{ column: 'active', value: true }] },
    locations,
    mapLocation,
  );
  const [selected, setSelected] = useState(operationLocations[5] || operationLocations[0] || null);
  const chipRefs = useRef({});

  useEffect(() => {
    document.title = 'Operasyon Haritası — Starlife İnşaat';
  }, []);

  useEffect(() => {
    if (!selected && operationLocations.length) {
      setSelected(operationLocations[0]);
      return;
    }

    if (selected && !operationLocations.some((location) => location.id === selected.id)) {
      setSelected(operationLocations[0] || null);
    }
  }, [operationLocations, selected]);

  useEffect(() => {
    if (selected && chipRefs.current[selected.id]) {
      chipRefs.current[selected.id].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selected]);

  const selectLocation = (event, location) => {
    event.stopPropagation();
    setSelected(location);
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen text-white">
      <HoldingHeader />
      <PageHero
        title="Operasyon Haritası"
        breadcrumb={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Kurumsal', href: '/kurumsal/hakkimizda' },
          { label: 'Operasyon Haritası' },
        ]}
      />

      <section className="bg-[#0F0F0F] py-20 px-6 md:px-12 lg:px-20">
        <style>
          {`
            @keyframes provinceFade {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .operation-map svg {
              display: block;
              width: 100%;
              height: auto;
              filter: drop-shadow(0 40px 80px rgba(0,0,0,0.35));
            }
            .operation-map svg path {
              fill: #1A1A1A;
              stroke: #2E2E2E;
              stroke-width: 0.6;
              opacity: 0;
              animation: provinceFade 1.2s ease forwards;
              transition: fill 0.35s ease, stroke 0.35s ease;
            }
            ${Array.from({ length: 81 }, (_, index) => `.operation-map svg > g > g:nth-child(${index + 1}) path { animation-delay: ${(index * 0.012).toFixed(3)}s; }`).join('\n')}
            .operation-map svg g:hover path,
            .operation-map svg path:hover {
              fill: #252525;
              stroke: #333333;
            }
          `}
        </style>

        <div className="max-w-[1500px] mx-auto">
          <div className="mb-14">
            <span className="text-gold text-[11px] font-medium tracking-[0.4em] uppercase block mb-4">
              OPERASYONLARIMIZ
            </span>
            <h2 className="text-5xl font-bold text-white tracking-[-0.01em]">
              Türkiye Genelinde Faaliyet Alanlarımız
            </h2>
            <p className="text-stone-400 font-light text-base mt-4 max-w-xl leading-relaxed">
              Projelerimizi gerçekleştirdiğimiz şehirleri keşfedin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start mt-14">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: EASE }}
              className="min-w-0"
            >
              <div
                className="relative w-full bg-[#0F0F0F] border border-[#202020] p-4 md:p-8 overflow-hidden operation-map"
                onClick={() => setSelected(null)}
              >
                <svg viewBox="0 0 1007 443" xmlns="http://www.w3.org/2000/svg" aria-label="Türkiye operasyon haritası">
                  <g>
                    {cities.map((city) => (
                      <g key={city.plate} data-city={city.city} data-plate={city.plate}>
                        <path
                          d={city.draw}
                          style={selected?.plate === city.plate ? { fill: '#252525', stroke: '#333333' } : undefined}
                        />
                      </g>
                    ))}
                  </g>
                </svg>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.55 } } }}
                  className="absolute inset-4 md:inset-8 pointer-events-none"
                >
                  {operationLocations.map((loc) => {
                    const active = selected?.id === loc.id;
                    const labelOffset = loc.id % 2 === 0 ? '-translate-x-[42%] -translate-y-[135%]' : 'translate-x-[10%] -translate-y-[140%]';
                    return (
                      <motion.button
                        key={loc.id}
                        type="button"
                        variants={{
                          hidden: { opacity: 0, scale: 0 },
                          visible: { opacity: 1, scale: [0, 1.2, 1], transition: { duration: 0.55, ease: EASE } },
                        }}
                        onClick={(event) => selectLocation(event, loc)}
                        className="absolute pointer-events-auto group"
                        style={{ left: loc.cx, top: loc.cy, transform: 'translate(-50%, -50%)' }}
                        aria-label={`${loc.city} projesini göster`}
                      >
                        <span className={`absolute -inset-2 rounded-full border border-gold/40 ${active ? 'animate-ping bg-gold/20' : 'bg-gold/10'}`} />
                        <span className="relative block w-3.5 h-3.5 rounded-full bg-gold border border-gold-light shadow-[0_0_18px_rgba(212,175,55,0.55)] group-hover:scale-125 transition-transform duration-300" />
                        <span className="absolute left-1/2 top-1/2 w-14 h-px bg-gold/30 origin-left rotate-[-18deg]" />
                        <span className={`absolute left-1/2 top-1/2 whitespace-nowrap text-left ${labelOffset}`}>
                          <span className="block font-serif italic text-stone-300 text-sm md:text-base leading-none group-hover:text-white transition-colors">
                            {loc.city}
                          </span>
                          <span className="block mt-1 text-[8px] md:text-[9px] text-stone-500 tracking-[0.28em] uppercase">
                            {loc.count} proje · {loc.year}
                          </span>
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>

              <div className="mt-8">
                <div className="text-[10px] tracking-[0.4em] text-stone-500 uppercase mb-4">
                  YER İŞARETLERİ
                </div>
                <div className="flex gap-2 overflow-x-auto pb-3">
                  {operationLocations.map((loc) => {
                    const active = selected?.id === loc.id;
                    return (
                      <button
                        key={loc.id}
                        ref={(node) => { chipRefs.current[loc.id] = node; }}
                        onClick={() => setSelected(loc)}
                        className={`shrink-0 border px-4 py-2 text-[11px] transition-all duration-300 ${
                          active ? 'border-gold text-white bg-gold/5' : 'border-stone-700 text-stone-400 hover:border-gold/60 hover:text-white'
                        }`}
                      >
                        <span className="text-stone-500 mr-2">{String(loc.id).padStart(2, '0')}</span>
                        <span className="font-bold">{loc.city}</span>
                        <span className="text-stone-500 text-[9px] ml-1">{loc.region}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <div className="lg:sticky lg:top-24">
              <DetailPanel selected={selected} onClose={() => setSelected(null)} />
            </div>
          </div>
        </div>
      </section>

      <HoldingFooter />
    </div>
  );
}
