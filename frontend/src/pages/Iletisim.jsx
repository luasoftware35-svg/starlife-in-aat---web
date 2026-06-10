import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import HoldingHeader from '../components/holding/HoldingHeader';
import HoldingFooter from '../components/holding/HoldingFooter';
import PageHero from '../components/shared/PageHero';
import ContactForm from '../components/shared/ContactForm';
import { COMPANY } from '../mock/mock';
import { fadeUp } from '../lib/animations';

export default function Iletisim() {
  return (
    <div className="bg-dark text-white min-h-screen">
      <HoldingHeader />
      <PageHero title="Bize Ulaşın" breadcrumb={[{ label: 'Ana Sayfa', href: '/' }, { label: 'İletişim' }]} image="https://images.pexels.com/photos/3818947/pexels-photo-3818947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600" />

      <section className="grid lg:grid-cols-2 min-h-[600px]">
        <div className="bg-dark p-10 md:p-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="text-gold text-xs tracking-[0.4em] uppercase">BİZE ULAŞIN</span>
            <h2 className="text-white text-3xl md:text-4xl font-black mt-3">En kısa sürede sizinle irtibata geçeceğiz</h2>
            <p className="text-white/60 text-sm mt-3">Sorularınız, talepleriniz veya proje fikirleriniz için formu doldurun.</p>
            <div className="mt-10">
              <ContactForm darkMode />
            </div>
          </motion.div>
        </div>

        <div className="bg-white text-dark p-10 md:p-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="text-gold text-xs tracking-[0.4em] uppercase">İletişim Bilgileri</span>
            <h3 className="font-black text-2xl md:text-3xl mt-3">Sizinle tanışmak isteriz</h3>

            <div className="mt-10 space-y-8">
              {[
                { icon: MapPin, label: 'ADRES', value: COMPANY.address },
                { icon: Mail, label: 'MAİL', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { icon: Phone, label: 'TEL', value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, '')}` },
              ].map((i) => (
                <div key={i.label} className="flex gap-5 items-start">
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center text-gold shrink-0">
                    <i.icon size={20} />
                  </div>
                  <div>
                    <p className="text-gold text-[10px] tracking-[0.3em] uppercase">{i.label}</p>
                    {i.href ? (
                      <a href={i.href} className="text-dark text-base mt-1 block hover:text-gold transition-colors">{i.value}</a>
                    ) : (
                      <p className="text-dark text-base mt-1">{i.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 overflow-hidden">
              <iframe
                title="Starlife Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14969.947003694955!2d40.1654883680318!3d37.92940969748189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40751fc6f04755bb%3A0xfc933c3a1f79563!2zU3RhciBMaWZlIMSwbsWfYWF0!5e0!3m2!1str!2str!4v1742219374172!5m2!1str!2str"
                className="w-full h-72 grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <HoldingFooter />
    </div>
  );
}
