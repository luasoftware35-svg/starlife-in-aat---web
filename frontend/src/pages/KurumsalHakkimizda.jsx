import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Users, Award } from 'lucide-react';
import HoldingHeader from '../components/holding/HoldingHeader';
import HoldingFooter from '../components/holding/HoldingFooter';
import PageHero from '../components/shared/PageHero';
import { fadeUp, staggerContainer } from '../lib/animations';
import { COMPANIES } from '../mock/mock';

export default function KurumsalHakkimizda() {
  return (
    <div className="bg-dark text-white min-h-screen">
      <HoldingHeader />
      <PageHero title="Hakkımızda" breadcrumb={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Kurumsal' }, { label: 'Hakkımızda' }]} image="https://images.pexels.com/photos/34700467/pexels-photo-34700467.png?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600" />

      <section className="bg-white text-dark py-24 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
            <span className="text-gold text-xs tracking-[0.4em] uppercase">2009'dan Beri</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 leading-tight">Numan Erdoğan liderliğinde köklü bir marka</h2>
            <div className="mt-8 space-y-4 text-dark/70 leading-relaxed">
              <p>Starlife İnşaat, 2009 yılından bu yana inşaat sektöründe faaliyet gösteren ve Numan Erdoğan liderliğinde şekillenen köklü bir markadır. Kurulduğu günden bu yana, yaşamı güzelleştiren, insan odaklı ve estetik değerlerle bütünleşen projelere imza atan Starlife İnşaat; kaliteli, fonksiyonel ve modern yaşam alanları üretmeyi temel ilke edinmiştir.</p>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="aspect-[4/5] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1598368195835-91e67f80c9d7" alt="founder" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 text-dark py-20 px-6 md:px-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-[900px] mx-auto text-center">
          <Building2 className="text-gold mx-auto" size={42} />
          <h3 className="font-black text-3xl md:text-4xl mt-5">Vizyonumuz</h3>
          <p className="text-dark/70 leading-relaxed mt-5">Starlife İnşaat olarak, modern, sürdürülebilir ve estetik yaşam alanları inşa ederek, geleceğin mimarisine yön veren bir marka olmak istiyoruz. Güvenli, konforlu ve yenilikçi projeler geliştirerek, sektörde öncü bir rol üstlenmeyi ve insanlara kaliteli yaşam alanları sunmayı hedefliyoruz.</p>
        </motion.div>
      </section>

      <section className="bg-white text-dark py-20 px-6 md:px-16">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-[900px] mx-auto text-center">
          <Award className="text-gold mx-auto" size={42} />
          <h3 className="font-black text-3xl md:text-4xl mt-5">Misyonumuz</h3>
          <p className="text-dark/70 leading-relaxed mt-5">Misyonumuz, yüksek mühendislik standartları ve çağdaş tasarım anlayışıyla yaşam alanlarını yeniden şekillendirmek ve değer üreten projeler ortaya koymaktır. Güvenlik, kalite ve müşteri memnuniyeti ilkelerimizden ödün vermeden, doğaya ve şehre uyumlu yapılar inşa ederek, insanların yaşam kalitesini artırmayı amaçlıyoruz.</p>
        </motion.div>
      </section>

      <section className="bg-navy py-20 px-6 md:px-16">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { value: '2009', label: 'Kuruluş' },
            { value: 'Numan Erdoğan', label: 'Liderliğinde' },
            { value: '3', label: 'Grup Şirketi' },
          ].map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <div className="text-gold font-black text-4xl md:text-5xl">{s.value}</div>
              <p className="text-white/60 text-sm tracking-widest uppercase mt-2">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-dark py-24 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-gold text-xs tracking-[0.4em] uppercase">Grup Şirketlerimiz</span>
            <h2 className="font-black text-3xl md:text-5xl mt-3">3 Şirket, Tek Vizyon</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {COMPANIES.map((c) => (
              <Link key={c.slug} to={c.href} className="group block relative aspect-[3/4] overflow-hidden">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="text-white font-black text-2xl">{c.name}</h3>
                  <p className="text-white/60 text-sm mt-1">{c.desc}</p>
                  <span className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] uppercase mt-4 group-hover:gap-3 transition-all">İncele <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HoldingFooter />
    </div>
  );
}
