import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { COMPANY } from '../../mock/mock';

export default function SubsiteFooter({ brandPrefix, brandSuffix, basePath = '/', accentClass = 'text-pomegranate', description }) {
  return (
    <footer className="bg-cream border-t border-charcoal/5 pt-20 pb-8 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to={basePath} className="inline-flex items-end gap-2">
            <span className="font-black text-2xl tracking-[0.2em] uppercase leading-none">
              <span className={accentClass}>{brandPrefix}</span>
              <span className="text-charcoal">{brandSuffix}</span>
            </span>
          </Link>
          <p className="text-charcoal/55 text-[13px] mt-5 max-w-xs leading-[1.75] font-light">{description}</p>
          <div className="mt-7"><SocialLinks /></div>
        </div>

        <div>
          <h4 className="text-pomegranate text-[10px] tracking-[0.35em] uppercase mb-6 font-medium">Hızlı Linkler</h4>
          <ul className="space-y-3.5">
            <li><Link to={basePath} className="text-charcoal/65 text-[14px] font-light hover:text-pomegranate hover:translate-x-1 transition-all inline-block">Anasayfa</Link></li>
            <li><Link to={`${basePath}/blog`} className="text-charcoal/65 text-[14px] font-light hover:text-pomegranate hover:translate-x-1 transition-all inline-block">Bizden Haberler</Link></li>
            <li><Link to={`${basePath}/iletisim`} className="text-charcoal/65 text-[14px] font-light hover:text-pomegranate hover:translate-x-1 transition-all inline-block">İletişim</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-pomegranate text-[10px] tracking-[0.35em] uppercase mb-6 font-medium">Grup Şirketlerimiz</h4>
          <ul className="space-y-3.5">
            <li><Link to="/starlife-insaat" className="text-charcoal/65 text-[14px] font-light hover:text-pomegranate hover:translate-x-1 transition-all inline-flex items-center gap-1.5">Starlife İnşaat <ArrowUpRight size={12} className="opacity-60" /></Link></li>
            <li><Link to="/invest-insaat" className="text-charcoal/65 text-[14px] font-light hover:text-pomegranate hover:translate-x-1 transition-all inline-flex items-center gap-1.5">İnvest İnşaat <ArrowUpRight size={12} className="opacity-60" /></Link></li>
            <li><Link to="/erd-insaat" className="text-charcoal/65 text-[14px] font-light hover:text-pomegranate hover:translate-x-1 transition-all inline-flex items-center gap-1.5">ERD İnşaat <ArrowUpRight size={12} className="opacity-60" /></Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-pomegranate text-[10px] tracking-[0.35em] uppercase mb-6 font-medium">İletişim</h4>
          <ul className="space-y-5">
            <li className="flex gap-3 text-charcoal/65 text-[13.5px] font-light leading-[1.6]"><MapPin size={15} strokeWidth={1.5} className="text-pomegranate mt-0.5 shrink-0" /><span>{COMPANY.address}</span></li>
            <li className="flex gap-3 text-charcoal/65 text-[13.5px] font-light"><Mail size={15} strokeWidth={1.5} className="text-pomegranate mt-0.5 shrink-0" /><a href={`mailto:${COMPANY.email}`} className="hover:text-pomegranate transition-colors">{COMPANY.email}</a></li>
            <li className="flex gap-3 text-charcoal/65 text-[13.5px] font-light"><Phone size={15} strokeWidth={1.5} className="text-pomegranate mt-0.5 shrink-0" /><a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="hover:text-pomegranate transition-colors">{COMPANY.phone}</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-16 pt-6 border-t border-charcoal/10 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-charcoal/40 text-[11px] tracking-[0.1em] font-light">Tüm Hakları Saklıdır © 2025 Starlife İnşaat</p>
        <Link to="/politika/kvkk-metni" className="text-charcoal/40 text-[11px] tracking-[0.1em] font-light hover:text-pomegranate transition-colors">KVKK Metni</Link>
      </div>
    </footer>
  );
}
