import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Building2, Briefcase } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import ContactForm from '../../components/shared/ContactForm';
import { INVEST_NAV } from '../../mock/mock';
import { fadeUp, staggerContainer } from '../../lib/animations';

const VIEWPORT = { once: true, margin: '-80px' };
const EASE = [0.22, 1, 0.36, 1];

const VALUES = [
  { icon: TrendingUp, title: 'Yatırım Odaklı', desc: 'Kazançlı ve uzun vadeli değer üreten projeler.' },
  { icon: Building2, title: 'Modern Şehircilik', desc: 'Karma kullanımlı, yenilikçi yaşam alanları.' },
  { icon: Briefcase, title: 'Ticari + Konut', desc: 'Geniş kapsamlı portföy, esnek seçenekler.' },
];

export default function InvestHome() {
  return (
    <div className="bg-white text-charcoal min-h-screen">
      <SubsiteHeader navItems={INVEST_NAV} brandPrefix="İNVEST" brandSuffix="" contactHref="/invest-insaat/iletisim" accentClass="text-pomegranate-light" />

      <section className="relative h-[100dvh] overflow-hidden">
        <img src="https://images.pexels.com/photos/34700467/pexels-photo-34700467.png?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920" alt="Invest İnşaat" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-20 lg:px-28 flex flex-col justify-end pb-20 md:pb-28">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-pomegranate-light text-[11px] tracking-[0.5em] uppercase font-medium flex items-center gap-3">
            <span className="w-8 h-[1px] bg-pomegranate-light/60" /> İnvest İnşaat
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="font-serif-display text-white font-medium mt-5 leading-[1.02] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.25rem)' }}>
            Geleceğin Mimarisini<br /><span className="italic text-pomegranate-light">Bugünden İnşa Ediyoruz</span>
          </motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 64 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="h-[1px] bg-pomegranate-light/60 mt-7" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/70 text-base md:text-lg max-w-2xl mt-7 leading-[1.7] font-light">
            Modern şehircilik anlayışıyla yenilikçi, estetik ve sürdürülebilir projeler üreten İnvest İnşaat; konut, ticari ve karma kullanımlı projelerde yatırımcılar için değerli çözümler sunuyor.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex flex-wrap gap-6 md:gap-8 mt-10 md:mt-12">
            <Link to="/invest-insaat/iletisim" className="inline-flex items-center gap-3 bg-pomegranate text-white px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-pomegranate-dark transition-colors duration-300 group">
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
            Yatırımcılar için değerli, yaşam için <span className="italic text-pomegranate">konforlu</span> projeler.
          </h2>
          <div className="w-12 h-[1px] bg-pomegranate/60 mt-7" />
          <div className="mt-8 space-y-6 text-charcoal/70 leading-[1.85] text-[15px] font-light">
            <p>İnvest İnşaat, modern şehircilik anlayışıyla yenilikçi, estetik ve sürdürülebilir projeler üreten bir inşaat firmasıdır. Her projede kalite, güvenlik ve konforu ön planda tutarak, yaşam alanlarını sadece inşa etmekle kalmıyor, aynı zamanda geleceğe değer katan yapılar oluşturuyoruz.</p>
            <p>Güçlü mühendislik altyapımız ve mimari vizyonumuzla, konut, ticari ve karma kullanımlı projeler geliştirerek, hem yatırımcılar hem de konut sahipleri için değerli ve kazançlı çözümler sunuyoruz.</p>
            <p>İnvest İnşaat olarak, geleceğin mimarisini bugünden inşa etme vizyonuyla hareket ediyor ve yaşam alanlarını daha modern, daha güvenli ve daha konforlu hale getirmek için çalışıyoruz.</p>
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
          <div className="mt-10 md:mt-12"><ContactForm darkMode /></div>
        </div>
      </section>

      <SubsiteFooter brandPrefix="İNVEST" brandSuffix="" basePath="/invest-insaat" description="Yatırım odaklı konut, ticari ve karma kullanımlı projeler." />
    </div>
  );
}
