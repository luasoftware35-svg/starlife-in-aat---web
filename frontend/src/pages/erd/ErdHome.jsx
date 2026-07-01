import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Hammer, Gem } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import ContactForm from '../../components/shared/ContactForm';
import { ERD_NAV } from '../../mock/mock';
import { fadeUp, staggerContainer } from '../../lib/animations';

const VIEWPORT = { once: true, margin: '-80px' };
const EASE = [0.22, 1, 0.36, 1];

const VALUES = [
  { icon: Users, title: 'İnsan Odaklı', desc: 'Yaşayanın ihtiyacını merkeze alan tasarım.' },
  { icon: Hammer, title: 'Mühendislik Gücü', desc: 'Güçlü altyapı, hassas detaylar.' },
  { icon: Gem, title: 'Yüksek Kalite', desc: 'En iyi malzeme, en iyi işçilik.' },
];

export default function ErdHome() {
  return (
    <div className="bg-white text-charcoal min-h-screen">
      <SubsiteHeader navItems={ERD_NAV} brandPrefix="ERD" brandSuffix=" İNŞAAT" contactHref="/erd-insaat/iletisim" />

      <section className="relative h-[100dvh] overflow-hidden">
        <img src="https://images.pexels.com/photos/31197870/pexels-photo-31197870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920" alt="ERD İnşaat" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/65 to-charcoal/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-20 lg:px-28 flex flex-col justify-end pb-20 md:pb-28">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-pomegranate-light text-[11px] tracking-[0.5em] uppercase font-medium flex items-center gap-3">
            <span className="w-8 h-[1px] bg-pomegranate-light/60" /> ERD İnşaat
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="font-serif-display text-white font-medium mt-5 leading-[1.02] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)' }}>
            İnsan Odaklı Tasarım,<br /><span className="italic text-pomegranate-light">Yüksek Kalite</span>
          </motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 64 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="h-[1px] bg-pomegranate-light/60 mt-7" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/70 text-base md:text-lg max-w-2xl mt-7 leading-[1.7] font-light">
            Yenilikçi mimari anlayışı, güçlü mühendislik altyapısı ve kalite odaklı yaklaşımıyla modern yaşam alanları inşa eden ERD İnşaat.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-6 md:gap-8 mt-10 md:mt-12">
            <Link to="/erd-insaat/iletisim" className="inline-flex items-center gap-3 bg-pomegranate text-white px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-pomegranate-dark transition-colors duration-300 group">
              Bize Ulaşın <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-16 bg-white text-charcoal">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={VIEWPORT}
          className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
          {VALUES.map((v, i) => (
            <motion.div key={v.title} variants={fadeUp} className="bg-cream p-9 md:p-10 border-t border-pomegranate/30 hover:border-pomegranate transition-all duration-500">
              <div className="flex items-start justify-between mb-7">
                <v.icon className="text-pomegranate" size={28} strokeWidth={1.5} />
                <span className="text-pomegranate/30 font-mono text-[11px] tracking-widest">0{i + 1}</span>
              </div>
              <h3 className="font-serif-display font-medium text-2xl">{v.title}</h3>
              <p className="text-charcoal/60 text-sm mt-3 leading-[1.7] font-light">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-20 md:py-28 px-6 md:px-16 bg-cream text-charcoal">
        <div className="max-w-[1100px] mx-auto">
          <span className="text-pomegranate text-[11px] tracking-[0.5em] uppercase font-medium flex items-center gap-3">
            <span className="w-8 h-[1px] bg-pomegranate/60" /> Hakkımızda
          </span>
          <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-medium mt-5 leading-[1.05] tracking-tight">
            Geleceğe miras kalacak <span className="italic text-pomegranate">yapılar</span> tasarlıyoruz.
          </h2>
          <div className="w-12 h-[1px] bg-pomegranate/60 mt-7" />
          <div className="mt-8 space-y-6 text-charcoal/70 leading-[1.85] text-[15px] font-light">
            <p>ERD İnşaat, yenilikçi mimari anlayışı, güçlü mühendislik altyapısı ve kalite odaklı yaklaşımı ile modern yaşam alanları inşa eden bir inşaat firmasıdır. Şehir dokusuna değer katan projeler geliştirerek, estetik, güvenli ve sürdürülebilir yapılar oluşturmayı hedefliyoruz.</p>
            <p>Konut, ticari ve karma kullanımlı projelerde fonksiyonelliği ve konforu bir araya getirerek, sadece yaşam alanları değil, geleceğe miras kalacak yapılar tasarlıyoruz.</p>
            <p>ERD İnşaat olarak, insan odaklı tasarım ve yüksek kalite standartlarıyla sektörde fark yaratmaya devam ediyoruz. Siz de ERD İnşaat ile geleceğin mimarisini keşfedin!</p>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 md:py-28 px-6 md:px-16 bg-noise">
        <div className="max-w-[900px] mx-auto">
          <span className="text-pomegranate-light text-[11px] tracking-[0.5em] uppercase font-medium flex items-center gap-3">
            <span className="w-8 h-[1px] bg-pomegranate-light/60" /> Bize Ulaşın
          </span>
          <h3 className="font-serif-display text-white font-medium text-3xl md:text-5xl mt-5 leading-tight tracking-tight">
            Projelerimiz hakkında <span className="italic text-pomegranate-light">bilgi alın</span>
          </h3>
          <div className="mt-10 md:mt-12"><ContactForm darkMode policyBasePath="/erd-insaat" /></div>
        </div>
      </section>

      <SubsiteFooter brandPrefix="ERD" brandSuffix=" İNŞAAT" basePath="/erd-insaat" description="İnsan odaklı tasarım ve yüksek kalite ile modern yaşam alanları." />
    </div>
  );
}
