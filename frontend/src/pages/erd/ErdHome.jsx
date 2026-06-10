import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Hammer, Gem } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import ContactForm from '../../components/shared/ContactForm';
import { ERD_NAV } from '../../mock/mock';
import { fadeUp, staggerContainer } from '../../lib/animations';

export default function ErdHome() {
  return (
    <div className="bg-white text-dark">
      <SubsiteHeader navItems={ERD_NAV} brandPrefix="ERD" brandSuffix=" İNŞAAT" contactHref="/erd-insaat/iletisim" />

      <section className="relative h-screen overflow-hidden">
        <img src="https://images.pexels.com/photos/31197870/pexels-photo-31197870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600" alt="ERD İnşaat" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/55 to-dark/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-20 flex flex-col justify-end pb-24">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-gold text-xs tracking-[0.4em] uppercase">ERD İNŞAAT</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white font-black mt-4 leading-[1.05] text-5xl md:text-7xl">
            İnsan Odaklı Tasarım,<br /><span className="clip-text-gold">Yüksek Kalite</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-white/70 text-base md:text-lg max-w-2xl mt-6 leading-relaxed">
            Yenilikçi mimari anlayışı, güçlü mühendislik altyapısı ve kalite odaklı yaklaşımıyla modern yaşam alanları inşa eden ERD İnşaat.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-5 mt-10">
            <Link to="/erd-insaat/iletisim" className="inline-flex items-center gap-3 border border-white text-white px-7 py-3.5 text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-dark transition-all">
              Bize Ulaşın <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-16 bg-white text-dark">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: Users, title: 'İnsan Odaklı', desc: 'Yaşayanın ihtiyacını merkeze alan tasarım.' },
            { icon: Hammer, title: 'Mühendislik Gücü', desc: 'Güçlü altyapı, hassas detaylar.' },
            { icon: Gem, title: 'Yüksek Kalite', desc: 'En iyi malzeme, en iyi işçilik.' },
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
          <h2 className="text-4xl md:text-5xl font-black mt-3 leading-tight">Geleceğe miras kalacak yapılar tasarlıyoruz.</h2>
          <div className="mt-8 space-y-5 text-dark/75 leading-relaxed text-base">
            <p>ERD İnşaat, yenilikçi mimari anlayışı, güçlü mühendislik altyapısı ve kalite odaklı yaklaşımı ile modern yaşam alanları inşa eden bir inşaat firmasıdır. Şehir dokusuna değer katan projeler geliştirerek, estetik, güvenli ve sürdürülebilir yapılar oluşturmayı hedefliyoruz.</p>
            <p>Konut, ticari ve karma kullanımlı projelerde fonksiyonelliği ve konforu bir araya getirerek, sadece yaşam alanları değil, geleceğe miras kalacak yapılar tasarlıyoruz.</p>
            <p>ERD İnşaat olarak, insan odaklı tasarım ve yüksek kalite standartlarıyla sektörde fark yaratmaya devam ediyoruz. Siz de ERD İnşaat ile geleceğin mimarisini keşfedin!</p>
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

      <SubsiteFooter brandPrefix="ERD" brandSuffix=" İNŞAAT" basePath="/erd-insaat" description="İnsan odaklı tasarım ve yüksek kalite ile modern yaşam alanları." />
    </div>
  );
}
