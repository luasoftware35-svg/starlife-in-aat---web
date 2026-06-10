import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Building2, Construction, Layers, Ruler, HardHat } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import PageHero from '../../components/shared/PageHero';
import { STARLIFE_NAV } from '../../mock/mock';
import { fadeUp, staggerContainer } from '../../lib/animations';

export default function StarlifeTaahhutIsleri() {
  const services = [
    { icon: Building2, title: 'Konut Projeleri', desc: 'Anahtar teslim modern konut projeleri.' },
    { icon: Construction, title: 'Ticari Yapılar', desc: 'Plaza, ofis ve perakende projeleri.' },
    { icon: Layers, title: 'Karma Kullanım', desc: 'Konut + ticari bütüncel projeler.' },
    { icon: Hammer, title: 'Kentsel Dönüşüm', desc: 'Eski yapıların modern dönüşümü.' },
    { icon: Ruler, title: 'Mimari Tasarım', desc: 'Konsept geliştirme ve uygulama projeleri.' },
    { icon: HardHat, title: 'Saha Yönetimi', desc: 'Profesyonel şantiye yapılandırması.' },
  ];

  return (
    <div className="bg-white text-dark min-h-screen">
      <SubsiteHeader navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" contactHref="/starlife-insaat/iletisim" />
      <PageHero title="Taahhüt İşleri" breadcrumb={[{ label: 'Anasayfa', href: '/starlife-insaat' }, { label: 'Taahhüt İşleri' }]} image="https://images.pexels.com/photos/3818947/pexels-photo-3818947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600" />

      <section className="bg-white text-dark py-20 px-6 md:px-16">
        <div className="max-w-[1100px] mx-auto text-center">
          <span className="text-gold text-xs tracking-[0.4em] uppercase">Hizmetlerimiz</span>
          <h2 className="text-3xl md:text-5xl font-black mt-3">Anahtar Teslim Profesyonel Çözümler</h2>
          <p className="text-dark/65 mt-5 leading-relaxed">
            Starlife İnşaat olarak, projelerinizin her aşamasında yanınızdayız. Konseptten teslime kadar tüm süreçleri yönetiyor, kalite ve güvenliği gözeten taahhüt çözümleri sunuyoruz.
          </p>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="max-w-[1400px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {services.map((s) => (
            <motion.div key={s.title} variants={fadeUp} className="bg-gray-50 p-8 border-l-2 border-gold hover:bg-white hover:shadow-xl transition-all">
              <s.icon className="text-gold" size={32} />
              <h3 className="font-bold text-xl mt-4">{s.title}</h3>
              <p className="text-dark/60 text-sm mt-2 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <SubsiteFooter brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" description="Güvenli ve modern yaşam alanları." />
    </div>
  );
}
