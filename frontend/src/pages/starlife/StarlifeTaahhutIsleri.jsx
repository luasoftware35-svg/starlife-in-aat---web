import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, HardHat } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import PageHero from '../../components/shared/PageHero';
import { STARLIFE_NAV } from '../../mock/mock';
import { TAAHHUT_PROJECTS } from '../../mock/taahhutProjects';
import { fadeUp, staggerContainer } from '../../lib/animations';

const HERO_IMAGE = 'https://images.pexels.com/photos/3818947/pexels-photo-3818947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600';

const CATEGORIES = [
  {
    title: 'Tamamlanan Taahhüt İşleri',
    label: 'Tamamlanan İşler',
    href: '/starlife-insaat/taahhutisler/tamamlanan-isler',
    status: 'Tamamlanan',
    icon: CheckCircle2,
    image: 'https://starlifeinsaat.com/anaresim/167d16cf408011.webp',
  },
  {
    title: 'Devam Eden Taahhüt İşleri',
    label: 'Devam Eden İşler',
    href: '/starlife-insaat/taahhutisler/devam-eden-isler',
    status: 'Devam Eden',
    icon: HardHat,
    image: 'https://starlifeinsaat.com/anaresim/1697b0dffc7492.webp',
  },
];

export default function StarlifeTaahhutIsleri() {
  const previewByStatus = useMemo(() => ({
    Tamamlanan: TAAHHUT_PROJECTS.filter((p) => p.status === 'Tamamlanan').slice(0, 3),
    'Devam Eden': TAAHHUT_PROJECTS.filter((p) => p.status === 'Devam Eden').slice(0, 3),
  }), []);

  return (
    <div className="bg-white text-ink min-h-screen">
      <SubsiteHeader navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" contactHref="/starlife-insaat/iletisim" />
      <PageHero
        title="Taahhüt İşleri"
        breadcrumb={[{ label: 'Anasayfa', href: '/starlife-insaat' }, { label: 'Taahhüt İşleri' }]}
        image={HERO_IMAGE}
      />

      <section className="bg-white text-ink py-20 px-6 md:px-16">
        <div className="max-w-[1100px] mx-auto text-center">
          <span className="text-gold text-xs tracking-[0.4em] uppercase">Taahhüt İşleri</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3">Anahtar Teslim Profesyonel Çözümler</h2>
          <p className="text-ink/65 mt-5 leading-relaxed">
            TOKİ ve kamu projelerinden konut, okul ve yurt inşaatlarına kadar geniş bir yelpazede taahhüt işlerimizi
            tamamlanan ve devam eden kategorilerde inceleyebilirsiniz.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-8 mt-14"
        >
          {CATEGORIES.map((category) => (
            <motion.div key={category.status} variants={fadeUp}>
              <Link
                to={category.href}
                className="group block relative overflow-hidden aspect-[16/10] border border-ink/10"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <category.icon className="text-gold mb-4" size={32} />
                  <h3 className="text-white font-bold text-2xl md:text-3xl">{category.title}</h3>
                  <p className="text-white/65 text-sm mt-2">
                    {previewByStatus[category.status].length} proje
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold text-[11px] tracking-[0.3em] uppercase font-medium mt-5 group-hover:gap-3 transition-all">
                    {category.label} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {CATEGORIES.map((category) => (
        <section key={category.status} className="bg-mist py-16 px-6 md:px-16 border-t border-ink/5">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-gold text-[11px] tracking-[0.4em] uppercase">Taahhüt İşleri</span>
                <h2 className="text-2xl md:text-4xl font-bold mt-2">{category.title}</h2>
              </div>
              <Link
                to={category.href}
                className="inline-flex items-center gap-2 text-ink text-[11px] tracking-[0.3em] uppercase font-medium border-b border-pomegranate pb-1 hover:gap-3 transition-all"
              >
                Tümünü Gör <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {previewByStatus[category.status].map((project, index) => (
                <motion.article
                  key={project.id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  className="group relative overflow-hidden aspect-[4/5]"
                >
                  <Link to={`/starlife-insaat/taahhut/${project.slug}`} className="block h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="text-pomegranate-light text-[10px] tracking-[0.3em] uppercase font-semibold">
                        {project.tag}
                      </span>
                      <h3 className="text-white font-bold text-lg mt-2">{project.title}</h3>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <SubsiteFooter brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" description="Güvenli ve modern yaşam alanları." />
    </div>
  );
}
