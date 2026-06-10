import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Building2, Briefcase } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import ContactForm from '../../components/shared/ContactForm';
import { INVEST_NAV } from '../../mock/mock';
import { fadeUp, staggerContainer } from '../../lib/animations';

export default function InvestHome() {
  return (
    <div className="bg-white text-dark">
      <SubsiteHeader navItems={INVEST_NAV} brandPrefix="İNVEST" brandSuffix="" contactHref="/invest-insaat/iletisim" accentClass="text-gold" />

      <section className="relative h-screen overflow-hidden">
        <img src="https://images.pexels.com/photos/34700467/pexels-photo-34700467.png?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600" alt="Invest İnşaat" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/60 to-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-20 flex flex-col justify-end pb-24">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-gold text-xs tracking-[0.4em] uppercase">İNVEST İNŞAAT</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white font-black mt-4 leading-[1.05] text-5xl md:text-7xl">
            Geleceğin Mimarisini<br /><span className="clip-text-gold">Bugünden İnşa Ediyoruz</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-white/70 text-base md:text-lg max-w-2xl mt-6 leading-relaxed">
            Modern şehircilik anlayışıyla yenilikçi, estetik ve sürdürülebilir projeler üreten İnvest İnşaat; konut, ticari ve karma kullanımlı projelerde yatırımcılar için değerli çözümler sunuyor.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-5 mt-10">
            <Link to="/invest-insaat/iletisim" className="inline-flex items-center gap-3 border border-white text-white px-7 py-3.5 text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-dark transition-all">
              Bize Ulaşın <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-16 bg-white text-dark">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: TrendingUp, title: 'Yatırım Odaklı', desc: 'Kazançlı ve uzun vadeli değer üreten projeler.' },
            { icon: Building2, title: 'Modern Şehircilik', desc: 'Karma kullanımlı, yenilikçi yaşam alanları.' },
            { icon: Briefcase, title: 'Ticari + Konut', desc: 'Geniş kapsamlı portföy, esnek seçenekler.' },
          ].map((v) => (
            <motion.div key={v.title} variants={fadeUp} className="p-8 border border-black/5 hover:border-gold/50 hover:shadow-xl transition-all">
              <v.icon className="text-gold" size={36} />
              <h3 className="font-bold text-xl mt-4">{v.title}</h3>
              <p className="text-dark/60 text-sm mt-2 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-24 px-6 md:px-16 bg-gray-50 text-dark">
        <div className="max-w-[1100px] mx-auto">
          <span className="text-gold text-xs tracking-[0.4em] uppercase">Hakkımızda</span>
          <h2 className="text-4xl md:text-5xl font-black mt-3 leading-tight">Yatırımcılar için değerli, yaşam için konforlu projeler.</h2>
          <div className="mt-8 space-y-5 text-dark/75 leading-relaxed text-base">
            <p>İnvest İnşaat, modern şehircilik anlayışıyla yenilikçi, estetik ve sürdürülebilir projeler üreten bir inşaat firmasıdır. Her projede kalite, güvenlik ve konforu ön planda tutarak, yaşam alanlarını sadece inşa etmekle kalmıyor, aynı zamanda geleceğe değer katan yapılar oluşturuyoruz.</p>
            <p>Güçlü mühendislik altyapımız ve mimari vizyonumuzla, konut, ticari ve karma kullanımlı projeler geliştirerek, hem yatırımcılar hem de konut sahipleri için değerli ve kazançlı çözümler sunuyoruz.</p>
            <p>İnvest İnşaat olarak, geleceğin mimarisini bugünden inşa etme vizyonuyla hareket ediyor ve yaşam alanlarını daha modern, daha güvenli ve daha konforlu hale getirmek için çalışıyoruz.</p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 px-6 md:px-16">
        <div className="max-w-[900px] mx-auto">
          <span className="text-pomegranate text-xs tracking-[0.4em] uppercase font-semibold">BİZE ULAŞIN</span>
          <h3 className="text-dark font-black text-3xl md:text-4xl mt-3">Projelerimiz hakkında bilgi alın</h3>
          <div className="mt-10"><ContactForm darkMode={false} /></div>
        </div>
      </section>

      <SubsiteFooter brandPrefix="İNVEST" brandSuffix="" basePath="/invest-insaat" description="Yatırım odaklı konut, ticari ve karma kullanımlı projeler." />
    </div>
  );
}
