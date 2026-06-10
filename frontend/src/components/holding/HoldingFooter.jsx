import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import SocialLinks from '../shared/SocialLinks';
import { COMPANY } from '../../mock/mock';

export default function HoldingFooter() {
  return (
    <footer className="bg-cream border-t border-black/5 pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div>
          <Link to="/" className="inline-block">
            <span className="font-black text-2xl tracking-[0.15em] uppercase">
              <span className="text-pomegranate">STAR</span>
              <span className="text-dark">L&Iacute;FE</span>
            </span>
            <div className="text-dark/40 text-[10px] tracking-[0.4em] mt-1">&Iacute;N&#x15E;AAT</div>
          </Link>
          <p className="text-dark/60 text-sm mt-5 max-w-xs leading-relaxed">
            {COMPANY.slogan}. 2009&rsquo;dan bu yana g&uuml;venli ve modern ya&#x15F;am alanlar&#x131; in&#x15F;a ediyoruz.
          </p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>

        <div>
          <h4 className="text-pomegranate text-[10px] tracking-[0.3em] uppercase mb-5 font-semibold">H&#x131;zl&#x131; Linkler</h4>
          <ul className="space-y-3">
            <li><Link to="/" className="text-dark/65 text-sm hover:text-pomegranate hover:translate-x-1 transition-all inline-block">Anasayfa</Link></li>
            <li><Link to="/kurumsal/hakkimizda" className="text-dark/65 text-sm hover:text-pomegranate hover:translate-x-1 transition-all inline-block">Hakk&#x131;m&#x131;zda</Link></li>
            <li><Link to="/blog" className="text-dark/65 text-sm hover:text-pomegranate hover:translate-x-1 transition-all inline-block">Bizden Haberler</Link></li>
            <li><Link to="/iletisim" className="text-dark/65 text-sm hover:text-pomegranate hover:translate-x-1 transition-all inline-block">&Iacute;leti&#x15F;im</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-pomegranate text-[10px] tracking-[0.3em] uppercase mb-5 font-semibold">Grup &#x15E;irketlerimiz</h4>
          <ul className="space-y-3">
            <li><Link to="/starlife-insaat" className="text-dark/65 text-sm hover:text-pomegranate hover:translate-x-1 transition-all inline-block">Starlife &Iacute;n&#x15F;aat</Link></li>
            <li><Link to="/invest-insaat" className="text-dark/65 text-sm hover:text-pomegranate hover:translate-x-1 transition-all inline-block">&Iacute;nvest &Iacute;n&#x15F;aat</Link></li>
            <li><Link to="/erd-insaat" className="text-dark/65 text-sm hover:text-pomegranate hover:translate-x-1 transition-all inline-block">ERD &Iacute;n&#x15F;aat</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-pomegranate text-[10px] tracking-[0.3em] uppercase mb-5 font-semibold">&Iacute;leti&#x15F;im</h4>
          <ul className="space-y-4">
            <li className="flex gap-3 text-dark/65 text-sm"><MapPin size={16} className="text-pomegranate mt-0.5 shrink-0" /><span>{COMPANY.address}</span></li>
            <li className="flex gap-3 text-dark/65 text-sm"><Mail size={16} className="text-pomegranate mt-0.5 shrink-0" /><a href={`mailto:${COMPANY.email}`} className="hover:text-pomegranate">{COMPANY.email}</a></li>
            <li className="flex gap-3 text-dark/65 text-sm"><Phone size={16} className="text-pomegranate mt-0.5 shrink-0" /><a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="hover:text-pomegranate">{COMPANY.phone}</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-14 pt-6 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-dark/40 text-xs">T&uuml;m Haklar&#x131; Sakl&#x131;d&#x131;r &copy; 2025 Starlife &Iacute;n&#x15F;aat</p>
        <Link to="/politika/kvkk-metni" className="text-dark/40 text-xs hover:text-pomegranate transition-colors">KVKK Metni</Link>
      </div>
    </footer>
  );
}
