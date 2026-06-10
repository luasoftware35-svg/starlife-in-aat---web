import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { COMPANY } from '../../mock/mock';

export default function SubsiteFooter({ brandPrefix, brandSuffix, basePath = '/', accentClass = 'text-pomegranate', description }) {
  return (
    <footer className="bg-cream border-t border-black/5 pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div>
          <Link to={basePath} className="inline-block">
            <span className="font-black text-2xl tracking-[0.15em] uppercase">
              <span className={accentClass}>{brandPrefix}</span>
              <span className="text-dark">{brandSuffix}</span>
            </span>
          </Link>
          <p className="text-dark/60 text-sm mt-5 max-w-xs leading-relaxed">{description}</p>
          <div className="mt-6"><SocialLinks /></div>
        </div>

        <div>
          <h4 className="text-pomegranate text-[10px] tracking-[0.3em] uppercase mb-5 font-semibold">H&#x131;zl&#x131; Linkler</h4>
          <ul className="space-y-3">
            <li><Link to={basePath} className="text-dark/65 text-sm hover:text-pomegranate hover:translate-x-1 transition-all inline-block">Anasayfa</Link></li>
            <li><Link to={`${basePath}/blog`} className="text-dark/65 text-sm hover:text-pomegranate hover:translate-x-1 transition-all inline-block">Bizden Haberler</Link></li>
            <li><Link to={`${basePath}/iletisim`} className="text-dark/65 text-sm hover:text-pomegranate hover:translate-x-1 transition-all inline-block">&Iacute;leti&#x15F;im</Link></li>
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
