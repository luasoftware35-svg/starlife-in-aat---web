import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Building2, Calendar, MapPin, Ruler, X } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import PageHero from '../../components/shared/PageHero';
import { PROJECTS, STARLIFE_NAV } from '../../mock/mock';
import { mapProject, slugify } from '../../lib/supabase/content';
import { supabase } from '../../lib/supabase/client';

const DETAIL_STATS = [
  { key: 'status', label: 'Durum', icon: Building2 },
  { key: 'location', label: 'Lokasyon', icon: MapPin },
  { key: 'year', label: 'Yıl', icon: Calendar },
  { key: 'sqm', label: 'M²', icon: Ruler },
];

export default function StarlifeProjectDetail() {
  const { slug } = useParams();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [state, setState] = useState({ loading: true, projects: [] });

  useEffect(() => {
    let mounted = true;
    const fallback = PROJECTS.map(mapProject);

    if (!supabase) {
      setState({ loading: false, projects: fallback });
      return () => {
        mounted = false;
      };
    }

    supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true })
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error || !data?.length) {
          setState({ loading: false, projects: fallback });
          return;
        }
        setState({ loading: false, projects: data.map(mapProject) });
      });

    return () => {
      mounted = false;
    };
  }, []);

  const project = useMemo(() => (
    state.projects.find((item) => item.slug === slug || String(item.id) === slug || slugify(item.title) === slug || slugify(item.slug) === slug)
  ), [state.projects, slug]);

  const gallery = useMemo(() => {
    if (!project) return [];
    return project.images?.length ? project.images : [project.image].filter(Boolean);
  }, [project]);

  const lightboxImage = lightboxIndex !== null ? gallery[lightboxIndex] : null;

  if (state.loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-white text-ink">
        <p className="text-sm tracking-[0.3em] uppercase text-ink/50">Proje yükleniyor...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white text-ink">
        <SubsiteHeader navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" contactHref="/starlife-insaat/iletisim" />
        <PageHero title="Proje Detayı" breadcrumb={[{ label: 'Anasayfa', href: '/starlife-insaat' }, { label: 'Projeler', href: '/starlife-insaat/tumprojeler' }, { label: 'Proje Detayı' }]} />
        <section className="px-6 py-24 text-center">
          <p className="text-ink/60">Proje bulunamadı.</p>
          <Link to="/starlife-insaat/tumprojeler" className="mt-6 inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] uppercase">
            <ArrowLeft size={14} /> Projelere Dön
          </Link>
        </section>
        <SubsiteFooter brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" description="Güvenli ve modern yaşam alanları." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <SubsiteHeader navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" contactHref="/starlife-insaat/iletisim" />
      <PageHero
        title={project.title}
        breadcrumb={[
          { label: 'Anasayfa', href: '/starlife-insaat' },
          { label: 'Projeler', href: '/starlife-insaat/tumprojeler' },
          { label: project.title },
        ]}
        image={project.image}
      />

      <section className="bg-white px-5 py-16 sm:px-6 md:px-16 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <Link to="/starlife-insaat/tumprojeler" className="inline-flex items-center gap-2 text-gold text-[11px] font-medium tracking-[0.3em] uppercase">
              <ArrowLeft size={14} /> Projelere Dön
            </Link>

            <span className="mt-10 block text-gold text-[11px] font-medium tracking-[0.4em] uppercase">
              {project.tag} · {project.status}
            </span>
            <h1 className="mt-4 font-serif-display text-4xl font-medium leading-tight tracking-tight text-ink text-balance md:text-6xl">
              {project.title}
            </h1>
            {project.description && (
              <p className="mt-7 max-w-3xl text-base font-light leading-8 text-ink/65">
                {project.description}
              </p>
            )}

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {DETAIL_STATS.map(({ key, label, icon: Icon }) => {
                const value = key === 'sqm' && project.sqm ? project.sqm.toLocaleString('tr-TR') : project[key];
                if (!value) return null;

                return (
                  <div key={key} className="border border-ink/10 bg-mist p-5">
                    <Icon className="text-gold" size={22} strokeWidth={1.5} />
                    <div className="mt-5 text-[10px] uppercase tracking-[0.3em] text-ink/40">{label}</div>
                    <div className="mt-2 text-lg font-bold text-ink">{value}</div>
                  </div>
                );
              })}
              {project.units > 0 && (
                <div className="border border-ink/10 bg-mist p-5">
                  <Building2 className="text-gold" size={22} strokeWidth={1.5} />
                  <div className="mt-5 text-[10px] uppercase tracking-[0.3em] text-ink/40">Ünite</div>
                  <div className="mt-2 text-lg font-bold text-ink">{project.units}</div>
                </div>
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-ink/10 bg-ink p-6 text-white">
              <div className="text-[10px] uppercase tracking-[0.35em] text-gold">Proje Bilgisi</div>
              <div className="mt-6 space-y-4 text-sm text-white/65">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                  <span>Şirket</span>
                  <span className="text-white">{project.company}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                  <span>Şehir</span>
                  <span className="text-white">{project.city || project.location}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/10 pb-4">
                  <span>Bölge</span>
                  <span className="text-white">{project.region || '-'}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-mist px-5 py-16 sm:px-6 md:px-16 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10">
            <span className="text-gold text-[11px] font-medium tracking-[0.4em] uppercase">Galeri</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Proje Görselleri</h2>
            <p className="mt-3 text-sm font-light text-ink/55">Görselleri büyütmek için üzerine tıklayın.</p>
          </div>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gallery.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group aspect-[4/3] overflow-hidden bg-ink text-left"
              >
                <img src={image} alt={`${project.title} ${index + 1}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-5 top-5 rounded-full border border-white/20 bg-white/10 p-3 text-white"
              aria-label="Galeriyi kapat"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              src={lightboxImage}
              alt={project.title}
              className="max-h-[90vh] max-w-[92vw] object-contain"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SubsiteFooter brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" description="Güvenli ve modern yaşam alanları." />
    </div>
  );
}
