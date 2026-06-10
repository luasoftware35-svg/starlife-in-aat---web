import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Award, Target } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import PageHero from '../../components/shared/PageHero';
import { STARLIFE_NAV } from '../../mock/mock';
import { fadeUp } from '../../lib/animations';

export default function StarlifeHakkimizda() {
  return (
    <div className="bg-white text-dark min-h-screen">
      <SubsiteHeader navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" contactHref="/starlife-insaat/iletisim" />
      <PageHero title="Hakkımızda" breadcrumb={[{ label: 'Anasayfa', href: '/starlife-insaat' }, { label: 'Kurumsal' }, { label: 'Hakkımızda' }]} image="https://images.pexels.com/photos/5403840/pexels-photo-5403840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600" />

      <section className="bg-white text-dark py-24 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="text-gold text-xs tracking-[0.4em] uppercase">Starlife İnşaat</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 leading-tight">2009'dan bu yana güvenli yaşam alanları</h2>
            <p className="text-dark/70 leading-relaxed mt-6">Starlife İnşaat, Numan Erdoğan liderliğinde şekillenen, kaliteli malzeme kullanımı ve uzman ekipleriyle sektörde fark yaratan köklü bir markadır. Estetik ve fonksiyonelliği bir araya getiren özgün tasarım anlayışımızla, uzun vadeli değer sağlayan yaşam alanları sunuyoruz.</p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="aspect-[4/5] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e" alt="about" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 text-dark py-20 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-8">
          {[
            { icon: Building2, title: 'Vizyonumuz', desc: 'Modern, sürdürülebilir ve estetik yaşam alanları inşa ederek, geleceğin mimarisine yön veren bir marka olmak.' },
            { icon: Target, title: 'Misyonumuz', desc: 'Yüksek mühendislik standartları ve çağdaş tasarım anlayışıyla, güvenli ve konforlu yapılar inşa etmek.' },
          ].map((b) => (
            <motion.div key={b.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white p-10 border-t-2 border-gold">
              <b.icon className="text-gold" size={36} />
              <h3 className="font-black text-2xl mt-4">{b.title}</h3>
              <p className="text-dark/65 mt-3 leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-pomegranate py-20 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[{ v: '2009', l: 'Kuruluş' }, { v: '50+', l: 'Tamamlanan Proje' }, { v: '%100', l: 'Müşteri Memnuniyeti' }].map((s) => (
            <div key={s.l}>
              <div className="text-white font-black text-4xl md:text-5xl">{s.v}</div>
              <p className="text-white/85 text-sm tracking-widest uppercase mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <SubsiteFooter brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" description="Güvenli ve modern yaşam alanları." />
    </div>
  );
}
