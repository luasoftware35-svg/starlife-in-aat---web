import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import PageHero from '../../components/shared/PageHero';
import { STARLIFE_NAV, PROJECTS } from '../../mock/mock';
import { fadeUp } from '../../lib/animations';

export default function StarlifeProjects({ filter, title, breadcrumbLabel }) {
  const [active, setActive] = useState('Hepsi');
  const filtered = useMemo(() => {
    let list = filter ? PROJECTS.filter((p) => p.status === filter) : PROJECTS;
    if (active !== 'Hepsi') list = list.filter((p) => p.tag === active);
    return list;
  }, [filter, active]);

  const tags = ['Hepsi', 'Konut', 'Ticari', 'Karma'];

  return (
    <div className="bg-dark text-white min-h-screen">
      <SubsiteHeader navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" contactHref="/starlife-insaat/iletisim" />
      <PageHero
        title={title}
        breadcrumb={[{ label: 'Anasayfa', href: '/starlife-insaat' }, { label: 'Projeler' }, { label: breadcrumbLabel || title }]}
        image="https://images.pexels.com/photos/33230969/pexels-photo-33230969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600"
      />

      <section className="bg-white text-dark py-20 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap gap-3 mb-12">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`px-5 py-2 text-xs tracking-[0.25em] uppercase border transition-all duration-300 ${
                  active === t ? 'bg-gold border-gold text-black' : 'bg-transparent border-dark/20 text-dark/70 hover:border-gold hover:text-gold'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.04 }}
                className="group relative overflow-hidden aspect-[4/5] cursor-pointer"
              >
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-gold text-[10px] tracking-[0.3em] uppercase">{p.tag} · {p.status}</span>
                  <h3 className="text-white font-bold text-xl mt-2">{p.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-white/55 text-xs">
                    <span className="flex items-center gap-1"><MapPin size={11} /> {p.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={11} /> {p.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center text-dark/50 mt-10">Bu kategoride proje bulunamadı.</p>}
        </div>
      </section>

      <SubsiteFooter brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" description="Güvenli ve modern yaşam alanları." />
    </div>
  );
}
