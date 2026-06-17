import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import PageHero from '../../components/shared/PageHero';
import { STARLIFE_NAV } from '../../mock/mock';
import { TAAHHUT_PROJECTS } from '../../mock/taahhutProjects';
import { fadeUp } from '../../lib/animations';

const HERO_IMAGE = 'https://images.pexels.com/photos/3818947/pexels-photo-3818947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600';

export default function StarlifeTaahhutListe({ filter, title, breadcrumbLabel }) {
  const filtered = useMemo(
    () => TAAHHUT_PROJECTS.filter((project) => project.status === filter),
    [filter],
  );

  const breadcrumb = useMemo(
    () => [
      { label: 'Anasayfa', href: '/starlife-insaat' },
      { label: 'Taahhüt İşleri', href: '/starlife-insaat/taahhutisleri' },
      { label: breadcrumbLabel || title },
    ],
    [breadcrumbLabel, title],
  );

  return (
    <div className="bg-white text-ink min-h-screen">
      <SubsiteHeader navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" contactHref="/starlife-insaat/iletisim" />
      <PageHero title={title} breadcrumb={breadcrumb} image={HERO_IMAGE} />

      <section className="bg-white text-ink py-20 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <Link
            to="/starlife-insaat/taahhutisleri"
            className="inline-flex items-center gap-2 text-gold text-[11px] font-medium tracking-[0.3em] uppercase mb-10"
          >
            <ArrowLeft size={14} /> Taahhüt İşlerine Dön
          </Link>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <motion.article
                key={project.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.04 }}
                className="group relative overflow-hidden aspect-[4/5] cursor-pointer"
              >
                <Link to={`/starlife-insaat/taahhut/${project.slug}`} className="block h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-pomegranate-light text-[10px] tracking-[0.3em] uppercase font-semibold">
                      {project.tag} · {project.status}
                    </span>
                    <h3 className="text-white font-bold text-xl mt-2">{project.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-white/55 text-xs">
                      {project.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={11} /> {project.location}
                        </span>
                      )}
                      {project.year && (
                        <span className="flex items-center gap-1">
                          <Calendar size={11} /> {project.year}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-ink/50 mt-10">Bu kategoride taahhüt işi bulunamadı.</p>
          )}
        </div>
      </section>

      <SubsiteFooter brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" description="Güvenli ve modern yaşam alanları." />
    </div>
  );
}
