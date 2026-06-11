import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Shield, Award, Play } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import SocialLinks from '../../components/shared/SocialLinks';
import ContactForm from '../../components/shared/ContactForm';
import { STARLIFE_NAV, PROJECTS } from '../../mock/mock';
import { fadeUp, staggerContainer } from '../../lib/animations';

const VIEWPORT = { once: true, margin: '-80px' };
const VIEWPORT_TIGHT = { once: true, margin: '-50px' };

const VALUES = [
  { icon: Building2, title: 'Modern Tasarım', desc: 'Estetik ve fonksiyonel mimari çözümler.' },
  { icon: Shield, title: 'Yüksek Güvenlik', desc: 'Deprem yönetmeliğine uygun, dayanıklı yapılar.' },
  { icon: Award, title: '%100 Memnuniyet', desc: 'Müşteri odaklı, uzun vadeli değer.' },
];

const TWO_CARDS = [
  { title: 'Projelerimiz', label: 'Konut · Ticari', href: '/starlife-insaat/tumprojeler', image: 'https://images.pexels.com/photos/33230969/pexels-photo-33230969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
  { title: 'Taahhüt İşleri', label: 'Anahtar Teslim', href: '/starlife-insaat/taahhutisleri', image: 'https://images.pexels.com/photos/3818947/pexels-photo-3818947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
];

export default function StarlifeHome() {
  return (
    <div className="bg-white text-charcoal min-h-screen">
      <SubsiteHeader navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" contactHref="/starlife-insaat/iletisim" />

      {/* HERO */}
      <section className="relative h-[100dvh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.pexels.com/photos/5403840/pexels-photo-5403840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920" alt="Starlife project" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/70 to-charcoal/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
        </div>

        <div className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 hidden md:block z-10">
          <SocialLinks vertical theme="dark" />
        </div>

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-20 lg:px-28 flex flex-col justify-end pb-20 md:pb-28">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-pomegranate-light text-[11px] tracking-[0.5em] uppercase font-medium flex items-center gap-3">
            <span className="w-8 h-[1px] bg-pomegranate-light/60" /> Starlife İnşaat
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-display text-white font-medium mt-5 leading-[1.02] tracking-tight"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)' }}>
            Güvenli ve Modern<br /><span className="italic text-pomegranate-light">Yaşam Alanları</span>
          </motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: 64 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="h-[1px] bg-pomegranate-light/60 mt-7" />
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/70 text-base md:text-lg max-w-xl mt-7 leading-[1.7] font-light">
            Kaliteli malzeme kullanımı, uzman ekipler ve %100 müşteri memnuniyeti odaklı hizmet anlayışımızla sektörde fark yaratıyoruz.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-6 md:gap-8 mt-10 md:mt-12 items-center">
            <Link to="/starlife-insaat/iletisim" className="inline-flex items-center gap-3 bg-pomegranate text-white px-8 py-4 text-[11px] tracking-[0.3em] uppercase font-medium hover:bg-pomegranate-dark transition-colors duration-300 group">
              Bize Ulaşın <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/starlife-insaat/tumprojeler" className="text-white/85 text-[11px] tracking-[0.3em] uppercase font-medium border-b border-pomegranate-light/40 pb-1.5 hover:border-pomegranate-light transition-colors flex items-center gap-2 group">
              Projelerimizi İnceleyin <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="absolute bottom-8 right-8 hidden md:flex items-center gap-3 text-white/40 text-[10px] tracking-[0.4em] uppercase"
        >
          <span>Keşfet</span>
          <span className="w-12 h-[1px] bg-white/20" />
        </motion.div>
      </section>

      {/* HAKKIMIZDA + VIDEO */}
      <section className="bg-cream text-charcoal py-20 md:py-32 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            <span className="text-pomegranate text-[11px] tracking-[0.5em] uppercase font-medium flex items-center gap-3">
              <span className="w-8 h-[1px] bg-pomegranate/60" /> Hakkımızda
            </span>
            <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-medium mt-5 leading-[1.05] tracking-tight">
              Mutlu, huzurlu ve <span className="italic text-pomegranate">güvenli</span> bir yaşam için
            </h2>
            <div className="w-12 h-[1px] bg-pomegranate/60 mt-7" />
            <p className="text-charcoal/70 text-[15px] mt-7 leading-[1.85] font-light">
              Starlife İnşaat olarak, kaliteli malzeme kullanımı, alanında uzman profesyonel ekiplerle çalışma ve %100 müşteri memnuniyeti odaklı hizmet anlayışımızla sektörde fark yaratmaya devam ediyoruz.
            </p>
            <p className="text-charcoal/70 text-[15px] mt-5 leading-[1.85] font-light">
              Her bir projemizi, estetik ve fonksiyonelliği bir araya getiren özgün tasarım anlayışıyla hayata geçirirken; güvenli, konforlu ve uzun vadeli değer sağlayan yaşam alanları sunmayı ilke ediniyoruz.
            </p>
            <div className="flex flex-wrap gap-6 md:gap-10 mt-10">
              <Link to="/starlife-insaat/tumprojeler" className="inline-flex items-center gap-2.5 text-charcoal text-[11px] tracking-[0.3em] uppercase font-medium border-b border-pomegranate pb-1.5 hover:gap-4 transition-all">
                Projelerimiz <ArrowRight size={14} />
              </Link>
              <Link to="/starlife-insaat/taahhutisleri" className="inline-flex items-center gap-2.5 text-charcoal text-[11px] tracking-[0.3em] uppercase font-medium border-b border-pomegranate pb-1.5 hover:gap-4 transition-all">
                Taahhüt İşleri <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT}
            className="aspect-video w-full shadow-[0_30px_80px_-30px_rgba(0,0,0,0.3)] overflow-hidden bg-charcoal relative group">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/amrElUEPPUg" title="Starlife Tanıtım" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </motion.div>
        </div>
      </section>

      {/* Values strip */}
      <section className="bg-white py-16 md:py-24 px-6 md:px-16">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={VIEWPORT_TIGHT}
          className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {VALUES.map((v, i) => (
            <motion.div key={v.title} variants={fadeUp}
              className="bg-cream p-9 md:p-10 border-t border-pomegranate/30 hover:border-pomegranate transition-all duration-500 group">
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

      {/* TWO BIG CARDS */}
      <section className="py-16 md:py-24 px-6 md:px-16 bg-cream">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-5 md:gap-6">
          {TWO_CARDS.map((c) => (
            <Link key={c.title} to={c.href} className="relative aspect-[16/10] md:aspect-[16/11] overflow-hidden group block">
              <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-charcoal/10 group-hover:from-charcoal/90 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12">
                <span className="text-pomegranate-light text-[10px] tracking-[0.4em] uppercase font-medium">{c.label}</span>
                <h3 className="font-serif-display text-white font-medium text-3xl md:text-5xl mt-3 leading-tight">{c.title}</h3>
                <span className="inline-flex items-center gap-3 text-white/90 text-[11px] tracking-[0.35em] uppercase font-medium mt-5 group-hover:gap-5 transition-all duration-300">
                  Detaylar <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 md:py-28 px-6 md:px-16 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end flex-wrap gap-6 mb-12 md:mb-16">
            <div>
              <span className="text-pomegranate text-[11px] tracking-[0.5em] uppercase font-medium flex items-center gap-3">
                <span className="w-8 h-[1px] bg-pomegranate/60" /> Projelerimiz
              </span>
              <h2 className="font-serif-display text-charcoal text-4xl md:text-5xl lg:text-6xl font-medium mt-4 leading-tight tracking-tight">
                Öne Çıkan <span className="italic text-pomegranate">Projeler</span>
              </h2>
            </div>
            <Link to="/starlife-insaat/tumprojeler" className="text-charcoal text-[11px] tracking-[0.35em] uppercase font-medium border-b border-pomegranate pb-1.5 hover:gap-4 inline-flex items-center gap-2.5 transition-all">
              Tüm Projeler <ArrowRight size={14} />
            </Link>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={VIEWPORT_TIGHT}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {PROJECTS.slice(0, 6).map((p) => (
              <motion.div
                key={p.id}
                variants={fadeUp}
                className="group relative overflow-hidden aspect-[4/5] cursor-pointer bg-charcoal"
              >
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                <div className="absolute top-5 right-5 px-3 py-1 bg-pomegranate/90 text-white text-[9px] tracking-[0.25em] uppercase font-medium">
                  {p.status}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                  <span className="text-pomegranate-light text-[10px] tracking-[0.35em] uppercase font-medium">{p.tag}</span>
                  <h3 className="font-serif-display text-white font-medium text-2xl mt-2">{p.title}</h3>
                  <p className="text-white/55 text-[13px] mt-1.5 font-light">{p.location} · {p.year}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner — refined, charcoal-based instead of bright red */}
      <section className="bg-charcoal py-20 md:py-32 px-6 md:px-16 text-center relative overflow-hidden bg-noise">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />
        </div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={VIEWPORT_TIGHT} className="max-w-3xl mx-auto relative z-10">
          <span className="text-pomegranate-light text-[11px] tracking-[0.5em] uppercase font-medium flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-pomegranate-light/60" /> İletişim <span className="w-8 h-[1px] bg-pomegranate-light/60" />
          </span>
          <h2 className="font-serif-display text-white text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] mt-6 tracking-tight">
            Mutlu, huzurlu ve <span className="italic text-pomegranate-light">güvenli</span> bir yaşam için
          </h2>
          <Link to="/starlife-insaat/iletisim" className="inline-flex items-center gap-3 bg-pomegranate text-white font-medium px-10 py-4 mt-10 md:mt-12 tracking-[0.3em] text-[11px] uppercase hover:bg-pomegranate-dark transition-colors duration-300 group">
            Bize Ulaşın <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section className="bg-cream py-20 md:py-28 px-6 md:px-16">
        <div className="max-w-[900px] mx-auto">
          <span className="text-pomegranate text-[11px] tracking-[0.5em] uppercase font-medium flex items-center gap-3">
            <span className="w-8 h-[1px] bg-pomegranate/60" /> Bize Ulaşın
          </span>
          <h3 className="font-serif-display text-charcoal font-medium text-3xl md:text-5xl mt-5 leading-tight tracking-tight">
            En kısa sürede sizinle <span className="italic text-pomegranate">irtibata</span> geçeceğiz
          </h3>
          <div className="mt-10 md:mt-12">
            <ContactForm darkMode={false} />
          </div>
        </div>
      </section>

      <SubsiteFooter brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" description="Güvenli ve Modern Yaşam Alanları. 2009'dan bu yana kaliteli projeler." />
    </div>
  );
}
