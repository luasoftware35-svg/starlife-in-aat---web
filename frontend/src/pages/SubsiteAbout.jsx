import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Target, Award } from 'lucide-react';
import SubsiteHeader from '../components/shared/SubsiteHeader';
import SubsiteFooter from '../components/shared/SubsiteFooter';
import PageHero from '../components/shared/PageHero';
import { fadeUp } from '../lib/animations';

export default function SubsiteAbout({ navItems, brandPrefix, brandSuffix, basePath, label, title, paragraphs, image, vizyon, misyon }) {
  return (
    <div className="bg-dark text-white min-h-screen">
      <SubsiteHeader navItems={navItems} brandPrefix={brandPrefix} brandSuffix={brandSuffix} contactHref={`${basePath}/iletisim`} />
      <PageHero title="Hakkımızda" breadcrumb={[{ label: 'Anasayfa', href: basePath }, { label: 'Kurumsal' }, { label }]} image={image} />

      <section className="bg-white text-dark py-24 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="text-gold text-xs tracking-[0.4em] uppercase">{label}</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 leading-tight">{title}</h2>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-5 text-dark/70 leading-relaxed">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </motion.div>
        </div>
      </section>

      {(vizyon || misyon) && (
        <section className="bg-gray-50 text-dark py-20 px-6 md:px-16">
          <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-8">
            {vizyon && (
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white p-10 border-t-2 border-gold">
                <Building2 className="text-gold" size={36} />
                <h3 className="font-black text-2xl mt-4">Vizyonumuz</h3>
                <p className="text-dark/65 mt-3 leading-relaxed">{vizyon}</p>
              </motion.div>
            )}
            {misyon && (
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white p-10 border-t-2 border-gold">
                <Target className="text-gold" size={36} />
                <h3 className="font-black text-2xl mt-4">Misyonumuz</h3>
                <p className="text-dark/65 mt-3 leading-relaxed">{misyon}</p>
              </motion.div>
            )}
          </div>
        </section>
      )}

      <SubsiteFooter brandPrefix={brandPrefix} brandSuffix={brandSuffix} basePath={basePath} description={label} />
    </div>
  );
}
