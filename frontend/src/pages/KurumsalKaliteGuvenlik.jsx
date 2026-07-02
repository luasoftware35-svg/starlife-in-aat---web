import React from 'react';
import { motion } from 'framer-motion';
import { HardHat, Leaf, Shield } from 'lucide-react';
import HoldingHeader from '../components/holding/HoldingHeader';
import HoldingFooter from '../components/holding/HoldingFooter';
import PageHero from '../components/shared/PageHero';
import { fadeUp } from '../lib/animations';

const SECTIONS = [
  {
    icon: Shield,
    title: 'Kalite Yönetimi',
    paragraphs: [
      'Tüm projelerimizde malzeme seçiminden saha uygulamasına kadar kalite kontrol süreçleri uygulanır. Proje bazlı denetim, test raporları ve teslim öncesi kontrol listeleri ile standartlarımız korunur.',
      'Mühendislik, mimari ve saha ekipleri arasında koordineli çalışma modeli ile hatasız teslim hedeflenir.',
    ],
  },
  {
    icon: HardHat,
    title: 'İş Sağlığı ve Güvenliği (İSG)',
    paragraphs: [
      'Şantiye alanlarında kişisel koruyucu ekipman kullanımı, düzenli İSG eğitimleri ve risk analizi çalışmaları zorunlu uygulamalarımızdır.',
      'İş kazalarını önlemeye yönelik prosedürler, acil durum planları ve saha denetimleri periyodik olarak yürütülür.',
    ],
  },
  {
    icon: Leaf,
    title: 'Sürdürülebilirlik',
    paragraphs: [
      'Enerji verimliliği, atık yönetimi ve çevreye duyarlı malzeme tercihleri proje tasarım sürecine entegre edilir.',
      'Uzun ömürlü, bakım maliyeti düşük ve depreme dayanıklı yapılar inşa ederek kaynak kullanımını optimize ediyoruz.',
    ],
  },
];

export default function KurumsalKaliteGuvenlik() {
  return (
    <div className="bg-white text-ink min-h-screen">
      <HoldingHeader />
      <PageHero
        title="Kalite & Güvenlik"
        breadcrumb={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Kurumsal' }, { label: 'Kalite & Güvenlik' }]}
        image="https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600"
      />

      <section className="py-16 px-6 md:px-16 md:py-24">
        <div className="max-w-[900px] mx-auto space-y-14">
          {SECTIONS.map(({ icon: Icon, title, paragraphs }) => (
            <motion.article
              key={title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border-b border-stone-200 pb-12 last:border-0"
            >
              <div className="flex items-center gap-3 text-gold mb-4">
                <Icon size={24} />
                <h2 className="text-2xl font-black">{title}</h2>
              </div>
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-ink/75 leading-relaxed mt-4">{paragraph}</p>
              ))}
            </motion.article>
          ))}
        </div>
      </section>

      <HoldingFooter />
    </div>
  );
}
