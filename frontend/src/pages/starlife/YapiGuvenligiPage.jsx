import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Flame, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import SubsiteHeader from '../../components/shared/SubsiteHeader';
import SubsiteFooter from '../../components/shared/SubsiteFooter';
import PageHero from '../../components/shared/PageHero';
import { STARLIFE_NAV, YAPI_GUVENLIGI } from '../../mock/mock';
import { fadeUp } from '../../lib/animations';

const ICONS = {
  'deprem-dayanikliligi': Shield,
  'yangin-guvenligi': Flame,
  'muhendislik-cozumleri': Cpu,
  'akilli-guvenlik-sistemleri': ShieldCheck,
};

export default function YapiGuvenligiPage() {
  const params = useParams();
  const location = useLocation();
  const slug = params.slug || location.pathname.split('/').pop();
  const item = YAPI_GUVENLIGI.find((y) => y.slug === slug) || YAPI_GUVENLIGI[0];
  const Icon = ICONS[item.slug] || Shield;

  return (
    <div className="bg-white text-ink min-h-screen">
      <SubsiteHeader navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" contactHref="/starlife-insaat/iletisim" />
      <PageHero title={item.title} breadcrumb={[{ label: 'Anasayfa', href: '/starlife-insaat' }, { label: 'Yapı Güvenliği', href: '/starlife-insaat/yapiguvenligi/deprem-dayanikliligi' }, { label: item.title }]} image="https://images.pexels.com/photos/31197870/pexels-photo-31197870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600" />

      <section className="bg-white text-ink py-20 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-3 gap-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="lg:col-span-2">
            <Icon className="text-gold" size={42} />
            <h2 className="text-3xl md:text-4xl font-black mt-5">{item.title}</h2>
            <p className="text-ink/75 leading-relaxed mt-6 text-base">{item.content}</p>
            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { k: 'Yüksek', v: 'Standartlar' },
                { k: '7/24', v: 'İzleme' },
                { k: '%100', v: 'Memnuniyet' },
              ].map((s) => (
                <div key={s.v} className="bg-gray-50 p-6 border-l-2 border-gold">
                  <div className="text-gold font-black text-2xl">{s.k}</div>
                  <p className="text-ink/60 text-xs tracking-widest uppercase mt-1">{s.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <aside className="lg:col-span-1">
            <div className="bg-gray-50 p-6">
              <h4 className="text-gold text-[10px] tracking-[0.3em] uppercase">Yapı Güvenliği</h4>
              <div className="mt-4 divide-y divide-gray-200">
                {YAPI_GUVENLIGI.map((y) => {
                  const active = y.slug === item.slug;
                  return (
                    <Link
                      key={y.slug}
                      to={`/starlife-insaat/yapiguvenligi/${y.slug}`}
                      className={`flex justify-between items-center py-3 text-sm transition-all ${active ? 'text-gold pl-2' : 'text-ink/70 hover:text-gold hover:pl-2'}`}
                    >
                      <span>{y.title}</span> <ArrowRight size={14} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <SubsiteFooter brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" description="Güvenli ve modern yaşam alanları." />
    </div>
  );
}
