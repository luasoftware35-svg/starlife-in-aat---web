import React from 'react';
import { motion } from 'framer-motion';
import { Award, Building2, ShieldCheck } from 'lucide-react';
import HoldingHeader from '../components/holding/HoldingHeader';
import HoldingFooter from '../components/holding/HoldingFooter';
import PageHero from '../components/shared/PageHero';
import { fadeUp } from '../lib/animations';

const CERTIFICATES = [
  { title: 'ISO 9001 Kalite Yönetim Sistemi', desc: 'Proje süreçlerinde kalite standartlarının sürdürülebilir yönetimi.' },
  { title: 'ISO 45001 İş Sağlığı ve Güvenliği', desc: 'Saha operasyonlarında iş güvenliği kültürünün kurumsal düzeyde uygulanması.' },
  { title: 'ISO 14001 Çevre Yönetim Sistemi', desc: 'Çevresel etkilerin kontrol altında tutulması ve sürdürülebilir uygulamalar.' },
];

const REFERENCES = [
  'TOKİ konut ve altyapı projeleri',
  'Kamu kurumları taahhüt işleri',
  'Deprem bölgesi yeniden yapılandırma projeleri',
  'Çok etaplı konut ve ticari karma projeler',
  'Türkiye genelinde 10+ ilde aktif operasyon',
];

export default function KurumsalReferanslar() {
  return (
    <div className="bg-white text-ink min-h-screen">
      <HoldingHeader />
      <PageHero
        title="Referanslar & Sertifikalar"
        breadcrumb={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Kurumsal' }, { label: 'Referanslar & Sertifikalar' }]}
        image="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600"
      />

      <section className="py-16 px-6 md:px-16 md:py-24">
        <div className="max-w-[1100px] mx-auto space-y-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center gap-3 text-gold mb-4">
              <Award size={22} />
              <span className="text-[11px] tracking-[0.35em] uppercase font-medium">Sertifikalar</span>
            </div>
            <h2 className="text-3xl font-black">Kalite ve güvenlik standartlarımız</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {CERTIFICATES.map((item) => (
                <article key={item.title} className="border border-stone-200 p-6 bg-surface">
                  <ShieldCheck className="text-gold mb-4" size={28} />
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="mt-3 text-ink/70 text-sm leading-relaxed">{item.desc}</p>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center gap-3 text-gold mb-4">
              <Building2 size={22} />
              <span className="text-[11px] tracking-[0.35em] uppercase font-medium">Referanslar</span>
            </div>
            <h2 className="text-3xl font-black">Kamu ve özel sektör deneyimi</h2>
            <p className="mt-4 text-ink/70 max-w-3xl leading-relaxed">
              2009&apos;dan bu yana Starlife İnşaat; TOKİ taahhüt projeleri, konut geliştirme ve altyapı işlerinde güvenilir iş ortağı olarak konumlanmaktadır.
            </p>
            <ul className="mt-8 grid sm:grid-cols-2 gap-4">
              {REFERENCES.map((item) => (
                <li key={item} className="flex gap-3 text-ink/75 text-sm border-l-2 border-gold pl-4 py-1">{item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <HoldingFooter />
    </div>
  );
}
