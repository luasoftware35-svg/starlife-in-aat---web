import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import PageHero from '../../components/shared/PageHero';
import { useProjectFilterState } from '../../components/shared/ProjectFilterBar';
import { STARLIFE_NAV, PROJECTS } from '../../mock/mock';
import { fadeUp } from '../../lib/animations';
import { mapProject, useSupabaseRows } from '../../lib/supabase/content';

const HERO_IMAGE = 'https://images.pexels.com/photos/33230969/pexels-photo-33230969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600';
const PROJECT_VIEWPORT = { once: true, margin: '-50px' };

export default function StarlifeProjects({ filter, title, breadcrumbLabel }) {
  const projects = useSupabaseRows(
    'projects',
    { orderBy: 'order_index', ascending: true },
    PROJECTS,
    mapProject,
  );

  const sourceProjects = useMemo(
    () => (filter ? projects.filter((p) => p.status === filter) : projects),
    [filter, projects],
  );

  const { filtered, filterBar } = useProjectFilterState(sourceProjects, {
    lockedStatus: filter || null,
    showStatusFilter: !filter,
  });

  const breadcrumb = useMemo(
    () => [{ label: 'Anasayfa', href: '/starlife-insaat' }, { label: 'Projeler' }, { label: breadcrumbLabel || title }],
    [breadcrumbLabel, title],
  );

  return (
    <div className="bg-white text-ink min-h-screen">
      <SubsiteHeader navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" contactHref="/starlife-insaat/iletisim" />
      <PageHero title={title} breadcrumb={breadcrumb} image={HERO_IMAGE} />

      <section className="bg-white text-ink py-20 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          {filterBar}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={PROJECT_VIEWPORT}
                transition={{ delay: i * 0.04 }}
                className="group relative overflow-hidden aspect-[4/5] cursor-pointer"
              >
                <Link to={`/starlife-insaat/projeler/${p.slug}`} className="block h-full">
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-pomegranate-light text-[10px] tracking-[0.3em] uppercase font-semibold">{p.tag} · {p.status}</span>
                    <h3 className="text-white font-bold text-xl mt-2">{p.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-white/55 text-xs">
                      <span className="flex items-center gap-1"><MapPin size={11} aria-hidden="true" /> {p.location}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} aria-hidden="true" /> {p.year}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center text-ink/50 mt-10">Aramanıza uygun proje bulunamadı.</p>}
        </div>
      </section>

      <SubsiteFooter brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" description="Güvenli ve modern yaşam alanları." />
    </div>
  );
}
