import React from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp } from 'lucide-react';
import HoldingHeader from '../components/holding/HoldingHeader';
import HoldingFooter from '../components/holding/HoldingFooter';
import PageHero from '../components/shared/PageHero';
import { fadeUp } from '../lib/animations';

export default function KurumsalYatirimciIliskileri() {
  return (
    <div className="bg-white text-ink min-h-screen">
      <HoldingHeader />
      <PageHero
        title="Yatırımcı İlişkileri"
        breadcrumb={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Kurumsal' }, { label: 'Yatırımcı İlişkileri' }]}
        image="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600"
      />

      <section className="py-16 px-6 md:px-16 md:py-24">
        <div className="max-w-[900px] mx-auto space-y-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center gap-3 text-gold mb-4">
              <TrendingUp size={24} />
              <span className="text-[11px] tracking-[0.35em] uppercase font-medium">Holding Vizyonu</span>
            </div>
            <h2 className="text-3xl font-black">Starlife Group yatırımcı yaklaşımı</h2>
            <p className="mt-5 text-ink/75 leading-relaxed">
              Starlife Group; Starlife İnşaat, İnvest İnşaat ve ERD İnşaat markalarıyla konut, ticari ve taahhüt alanlarında büyüyen bir yapıdır.
              2009&apos;dan bu yana Diyarbakır merkezli operasyonumuzu Türkiye geneline taşıyarak sürdürülebilir büyüme hedefliyoruz.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-6">
            {[
              { label: 'Kuruluş', value: '2009' },
              { label: 'Faaliyet Alanı', value: 'Konut, Ticari, TOKİ Taahhüt' },
              { label: 'Grup Şirketleri', value: 'Starlife · İnvest · ERD' },
              { label: 'Merkez', value: 'Diyarbakır, Türkiye' },
            ].map((item) => (
              <div key={item.label} className="border border-stone-200 p-5 bg-surface">
                <p className="text-[11px] tracking-[0.25em] uppercase text-stone-500">{item.label}</p>
                <p className="mt-2 font-semibold text-lg">{item.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center gap-3 text-gold mb-4">
              <FileText size={22} />
              <h3 className="text-xl font-bold">Kurumsal raporlar</h3>
            </div>
            <p className="text-ink/75 leading-relaxed">
              Faaliyet raporları ve kurumsal sunum talepleri için{' '}
              <a href="mailto:iletisim@starlifeinsaat.com" className="text-gold hover:underline">iletisim@starlifeinsaat.com</a>
              {' '}adresinden bizimle iletişime geçebilirsiniz.
            </p>
          </motion.div>
        </div>
      </section>

      <HoldingFooter />
    </div>
  );
}
