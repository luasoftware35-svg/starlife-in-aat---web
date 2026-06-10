import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import SocialLinks from '../shared/SocialLinks';
import { COMPANY } from '../../mock/mock';

export default function HoldingFooter() {
  return (
    <footer className="bg-dark border-t border-white/10 pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div>
          <Link to="/" className="inline-block">
            <span className="font-black text-2xl tracking-[0.15em] uppercase">
              <span className="text-gold">STAR</span>
              <span className="text-white">LİFE</span>
            </span>
            <div className="text-white/40 text-[10px] tracking-[0.4em] mt-1">İNŞAAT</div>
          </Link>
          <p className="text-white/50 text-sm mt-5 max-w-xs leading-relaxed">
            {COMPANY.slogan}. 2009'dan bu yana güvenli ve modern yaşam alanları inşa ediyoruz.
          </p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>

        <div>
          <h4 className="text-gold text-[10px] tracking-[0.3em] uppercase mb-5">Hızlı Linkler</h4>
          <ul className="space-y-3">
            <li><Link to="/" className="text-white/60 text-sm hover:text-white hover:translate-x-1 transition-all inline-block">Anasayfa</Link></li>
            <li><Link to="/kurumsal/hakkimizda" className="text-white/60 text-sm hover:text-white hover:translate-x-1 transition-all inline-block">Hakkımızda</Link></li>
            <li><Link to="/blog" className="text-white/60 text-sm hover:text-white hover:translate-x-1 transition-all inline-block">Bizden Haberler</Link></li>
            <li><Link to="/iletisim" className="text-white/60 text-sm hover:text-white hover:translate-x-1 transition-all inline-block">İletişim</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold text-[10px] tracking-[0.3em] uppercase mb-5">Grup Şirketlerimiz</h4>
          <ul className="space-y-3">
            <li><Link to="/starlife-insaat" className="text-white/60 text-sm hover:text-white hover:translate-x-1 transition-all inline-block">Starlife İnşaat</Link></li>
            <li><Link to="/invest-insaat" className="text-white/60 text-sm hover:text-white hover:translate-x-1 transition-all inline-block">İnvest İnşaat</Link></li>
            <li><Link to="/erd-insaat" className="text-white/60 text-sm hover:text-white hover:translate-x-1 transition-all inline-block">ERD İnşaat</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold text-[10px] tracking-[0.3em] uppercase mb-5">İletişim</h4>
          <ul className="space-y-4">
            <li className="flex gap-3 text-white/60 text-sm"><MapPin size={16} className="text-gold mt-0.5 shrink-0" /><span>{COMPANY.address}</span></li>
            <li className="flex gap-3 text-white/60 text-sm"><Mail size={16} className="text-gold mt-0.5 shrink-0" /><a href={`mailto:${COMPANY.email}`} className="hover:text-white">{COMPANY.email}</a></li>
            <li className="flex gap-3 text-white/60 text-sm"><Phone size={16} className="text-gold mt-0.5 shrink-0" /><a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="hover:text-white">{COMPANY.phone}</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-white/30 text-xs">Tüm Hakları Saklıdır © 2025 Starlife İnşaat</p>
        <Link to="/politika/kvkk-metni" className="text-white/30 text-xs hover:text-gold transition-colors">KVKK Metni</Link>
      </div>
    </footer>
  );
}
