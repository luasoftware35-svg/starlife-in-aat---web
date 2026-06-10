import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Shield, Award } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import SocialLinks from '../../components/shared/SocialLinks';
import ContactForm from '../../components/shared/ContactForm';
import { STARLIFE_NAV, PROJECTS } from '../../mock/mock';
import { fadeUp, staggerContainer } from '../../lib/animations';

export default function StarlifeHome() {
  return (
    <div className="bg-white text-dark">
      <SubsiteHeader navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" contactHref="/starlife-insaat/iletisim" />

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/5403840/pexels-photo-5403840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600" alt="Starlife project" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/60 to-dark/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
        </div>

        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block">
          <SocialLinks vertical theme="dark" />
        </div>

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-20 flex flex-col justify-end pb-24">
          <motion.span initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-gold text-xs tracking-[0.4em] uppercase">
            Starlife İnşaat
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white font-black mt-4 leading-[1.05] text-5xl md:text-7xl">
            Güvenli ve Modern<br /><span className="clip-text-gold">Yaşam Alanları</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/70 text-base md:text-lg max-w-xl mt-6 leading-relaxed">
            Kaliteli malzeme kullanımı, uzman ekipler ve %100 müşteri memnuniyeti odaklı hizmet anlayışımızla sektörde fark yaratıyoruz.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-5 mt-10 items-center">
            <Link to="/starlife-insaat/iletisim" className="inline-flex items-center gap-3 border border-white text-white px-7 py-3.5 text-xs tracking-[0.25em] uppercase hover:bg-white hover:text-dark transition-all duration-300">
              Bize Ulaşın <ArrowRight size={14} />
            </Link>
            <Link to="/starlife-insaat/tumprojeler" className="text-gold text-xs tracking-[0.25em] uppercase border-b border-gold/40 pb-1 hover:border-gold transition-colors flex items-center gap-2">
              Projelerimizi İnceleyin <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* HAKKIMIZDA + VIDEO */}
      <section className="bg-white text-dark py-24 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <span className="text-gold text-xs tracking-[0.4em] uppercase">Hakkımızda</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 leading-tight">Mutlu, huzurlu ve güvenli bir yaşam için</h2>
            <p className="text-dark/70 text-base mt-6 leading-relaxed">
              Starlife İnşaat olarak, kaliteli malzeme kullanımı, alanında uzman profesyonel ekiplerle çalışma ve %100 müşteri memnuniyeti odaklı hizmet anlayışımızla sektörde fark yaratmaya devam ediyoruz.
            </p>
            <p className="text-dark/70 text-base mt-4 leading-relaxed">
              Her bir projemizi, estetik ve fonksiyonelliği bir araya getiren özgün tasarım anlayışıyla hayata geçirirken; güvenli, konforlu ve uzun vadeli değer sağlayan yaşam alanları sunmayı ilke ediniyoruz.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link to="/starlife-insaat/tumprojeler" className="inline-flex items-center gap-2 text-dark text-xs tracking-[0.25em] uppercase border-b-2 border-gold pb-1 hover:gap-3 transition-all">
                Projelerimiz <ArrowRight size={14} />
              </Link>
              <Link to="/starlife-insaat/taahhutisleri" className="inline-flex items-center gap-2 text-dark text-xs tracking-[0.25em] uppercase border-b-2 border-gold pb-1 hover:gap-3 transition-all">
                Taahhüt İşleri <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            className="aspect-video w-full shadow-2xl rounded-sm overflow-hidden bg-dark">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/amrElUEPPUg" title="Starlife Tanıtım" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </motion.div>
        </div>
      </section>

      {/* Values strip */}
      <section className="bg-gray-50 py-14 px-6 md:px-16">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Building2, title: 'Modern Tasarım', desc: 'Estetik ve fonksiyonel mimari çözümler.' },
            { icon: Shield, title: 'Yüksek Güvenlik', desc: 'Deprem yönetmeliğine uygun, dayanıklı yapılar.' },
            { icon: Award, title: '%100 Memnuniyet', desc: 'Müşteri odaklı, uzun vadeli değer.' },
          ].map((v) => (
            <motion.div key={v.title} variants={fadeUp} className="bg-white p-8 border border-black/5 hover:border-gold/40 hover:shadow-xl transition-all duration-300 group">
              <v.icon className="text-gold" size={32} />
              <h3 className="font-bold text-lg mt-4">{v.title}</h3>
              <p className="text-dark/60 text-sm mt-2 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* TWO BIG CARDS */}
      <section className="py-20 px-6 md:px-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-6">
          {[
            { title: 'Projelerimiz', href: '/starlife-insaat/tumprojeler', image: 'https://images.pexels.com/photos/33230969/pexels-photo-33230969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
            { title: 'Taahhüt İşleri', href: '/starlife-insaat/taahhutisleri', image: 'https://images.pexels.com/photos/3818947/pexels-photo-3818947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
          ].map((c) => (
            <Link key={c.title} to={c.href} className="relative aspect-[16/10] overflow-hidden group block">
              <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-10">
                <h3 className="text-white font-black text-3xl md:text-4xl">{c.title}</h3>
                <span className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] uppercase mt-3 border-b border-gold/40 pb-1 group-hover:gap-4 transition-all">
                  Detaylar <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end flex-wrap gap-4 mb-12">
            <div>
              <span className="text-gold text-xs tracking-[0.4em] uppercase">Projelerimiz</span>
              <h2 className="text-dark text-4xl md:text-5xl font-black mt-3">Öne Çıkan Projeler</h2>
            </div>
            <Link to="/starlife-insaat/tumprojeler" className="text-dark text-xs tracking-[0.3em] uppercase border-b-2 border-gold pb-1 hover:gap-3 inline-flex items-center gap-2 transition-all">
              Tüm Projeler <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.slice(0, 6).map((p) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="group relative overflow-hidden aspect-[4/5] cursor-pointer bg-dark"
              >
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-gold text-[10px] tracking-[0.3em] uppercase">{p.tag} · {p.status}</span>
                  <h3 className="text-white font-bold text-xl mt-2">{p.title}</h3>
                  <p className="text-white/60 text-sm mt-1">{p.location} · {p.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-pomegranate py-20 px-6 md:px-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)' }} />
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-white text-3xl md:text-5xl font-black leading-tight">Mutlu, huzurlu ve güvenli bir yaşam için</h2>
          <Link to="/starlife-insaat/iletisim" className="inline-flex items-center gap-3 bg-white text-pomegranate font-bold px-10 py-5 mt-10 tracking-widest text-sm uppercase hover:bg-dark hover:text-white transition-colors duration-300">
            Bize Ulaşın <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section className="bg-cream py-24 px-6 md:px-16">
        <div className="max-w-[900px] mx-auto">
          <span className="text-pomegranate text-xs tracking-[0.4em] uppercase font-semibold">BİZE ULAŞIN</span>
          <h3 className="text-dark font-black text-3xl md:text-4xl mt-3">En kısa sürede sizinle irtibata geçeceğiz</h3>
          <div className="mt-10">
            <ContactForm darkMode={false} />
          </div>
        </div>
      </section>

      <SubsiteFooter brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" description="Güvenli ve Modern Yaşam Alanları. 2009'dan bu yana kaliteli projeler." />
    </div>
  );
}
