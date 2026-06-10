import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Send } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import PageHero from '../../components/shared/PageHero';
import { STARLIFE_NAV } from '../../mock/mock';
import { fadeUp } from '../../lib/animations';

export default function StarlifeInsanKaynaklari() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-dark text-white min-h-screen">
      <SubsiteHeader navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" contactHref="/starlife-insaat/iletisim" />
      <PageHero title="İnsan Kaynakları" breadcrumb={[{ label: 'Anasayfa', href: '/starlife-insaat' }, { label: 'Kurumsal' }, { label: 'İ.K.' }]} image="https://images.pexels.com/photos/6082416/pexels-photo-6082416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600" />

      <section className="bg-white text-dark py-20 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Briefcase className="text-gold" size={40} />
            <h2 className="font-black text-3xl md:text-4xl mt-5">Aramıza Katılın</h2>
            <p className="text-dark/70 leading-relaxed mt-5">
              Starlife İnşaat olarak, yetenekli ve tutkulu profesyonellerle birlikte büyüyoruz. Mimari, mühendislik, saha yönetimi, satış ve idari pozisyonlarda kariyer fırsatları sunuyoruz. CV’nizi yanındaki form ile bize ulaştırabilirsiniz.
            </p>
            <ul className="mt-8 space-y-3 text-dark/70 text-sm">
              <li className="flex gap-3"><span className="text-gold">•</span> Profesyonel çalışma ortamı</li>
              <li className="flex gap-3"><span className="text-gold">•</span> Kariyer gelişim olanakları</li>
              <li className="flex gap-3"><span className="text-gold">•</span> Sosyal haklar ve yan ödemeler</li>
              <li className="flex gap-3"><span className="text-gold">•</span> Sektörde 15+ yıllık tecrübe</li>
            </ul>
          </motion.div>

          <motion.form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-gray-50 p-8 md:p-10"
          >
            <h3 className="font-bold text-xl">Başvuru Formu</h3>
            <div className="mt-6 space-y-4">
              <input required placeholder="Ad Soyad *" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:border-gold outline-none transition-colors" />
              <input required type="email" placeholder="E-posta *" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:border-gold outline-none transition-colors" />
              <input required placeholder="Telefon *" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:border-gold outline-none transition-colors" />
              <input placeholder="Pozisyon" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:border-gold outline-none transition-colors" />
              <textarea required rows={4} placeholder="Özgeçmiş özeti *" className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:border-gold outline-none transition-colors resize-none" />
              <button type="submit" className="bg-gold text-black font-bold px-8 py-3 w-full tracking-widest text-xs uppercase hover:bg-dark hover:text-gold transition-colors duration-300 flex items-center justify-center gap-3">
                Gönder <Send size={14} />
              </button>
              {submitted && <p className="text-gold text-sm">Başvurunuz Alındı</p>}
            </div>
          </motion.form>
        </div>
      </section>

      <SubsiteFooter brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" description="Güvenli ve modern yaşam alanları." />
    </div>
  );
}
