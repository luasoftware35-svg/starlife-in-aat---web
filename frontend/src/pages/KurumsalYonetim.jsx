import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import HoldingHeader from '../components/holding/HoldingHeader';
import HoldingFooter from '../components/holding/HoldingFooter';
import PageHero from '../components/shared/PageHero';
import { mapTeamMember, useSupabaseRows } from '../lib/supabase/content';

const EASE = [0.22, 1, 0.36, 1];

const team = [
  {
    name: 'Numan Erdoğan',
    title: 'CEO & Kurucu',
    image: '/images/team/numan-erdogan.jpg',
  },
  {
    name: 'Ahmet Erdoğan',
    title: 'Yönetim Kurulu Üyesi',
    image: '/images/team/ahmet-erdogan.jpg',
  },
  {
    name: 'Mahmut Erdoğan',
    title: 'Yönetim Kurulu Üyesi',
    image: '/images/team/mahmut-erdogan.jpg',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function TeamImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100 text-stone-300">
        <User size={44} strokeWidth={1.4} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
      onError={() => setFailed(true)}
    />
  );
}

export default function KurumsalYonetim() {
  const teamMembers = useSupabaseRows(
    'team_members',
    { orderBy: 'order_index', ascending: true, filters: [{ column: 'active', value: true }] },
    team,
    mapTeamMember,
  );

  useEffect(() => {
    document.title = 'Yönetim Kurulu — Starlife İnşaat';
  }, []);

  return (
    <div className="bg-mist min-h-screen text-ink">
      <HoldingHeader />
      <PageHero
        title="Yönetim Kurulu"
        breadcrumb={[
          { label: 'Ana Sayfa', href: '/' },
          { label: 'Kurumsal', href: '/kurumsal/hakkimizda' },
          { label: 'Yönetim Kurulu' },
        ]}
      />

      <section className="bg-mist py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14">
            <span className="text-gold text-[11px] font-medium tracking-[0.4em] uppercase block mb-4">
              EKİBİMİZ
            </span>
            <h2 className="text-5xl font-bold text-ink tracking-[-0.01em]">
              Vizyonumuzu Şekillendiren İsimler
            </h2>
            <p className="text-stone-500 font-light text-base mt-4 max-w-xl leading-relaxed">
              Starlife İnşaat'ı bugünlere taşıyan deneyimli liderlik kadromuz.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto mt-16"
          >
            {teamMembers.map((member) => (
              <motion.article
                key={member.id || member.name}
                variants={card}
                className="group overflow-hidden bg-surface border border-border hover:shadow-lg hover:shadow-stone-200/60 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-stone-100">
                  <TeamImage src={member.image} alt={member.name} />
                  <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="pt-6 pb-8 px-6">
                  <div className="w-10 h-[2px] bg-gold mb-5" />
                  <h3 className="text-xl font-black text-ink">{member.name}</h3>
                  <p className="text-gold text-[11px] font-medium tracking-[0.3em] uppercase mt-2">
                    {member.title}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <HoldingFooter />
    </div>
  );
}
