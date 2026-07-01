import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCookieConsent, setCookieConsent } from '../../lib/cookieConsent';
import { detectSiteContext, policyPaths } from '../../lib/policyPaths';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { pathname } = useLocation();
  const { basePath } = detectSiteContext(pathname);
  const { kvkk, cookies } = policyPaths(basePath);

  useEffect(() => {
    setVisible(!getCookieConsent());
  }, []);

  const accept = (value) => {
    setCookieConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6"
    >
      <div className="max-w-[1400px] mx-auto bg-ink border border-white/10 shadow-2xl p-5 sm:p-6 md:flex md:items-center md:justify-between md:gap-8">
        <div className="md:max-w-3xl">
          <p id="cookie-banner-title" className="text-gold text-[11px] tracking-[0.35em] uppercase font-medium">
            Çerez Bildirimi
          </p>
          <p id="cookie-banner-desc" className="text-white/75 text-sm mt-2 leading-relaxed">
            Web sitemizde temel işlevler için zorunlu çerezler kullanılmaktadır. Google Maps haritası gibi üçüncü taraf
            içerikler yalnızca onay vermeniz halinde yüklenir. Detaylar için{' '}
            <Link to={cookies} className="text-gold underline hover:text-white">Çerez Politikası</Link>
            {' '}ve{' '}
            <Link to={kvkk} className="text-gold underline hover:text-white">KVKK Metni</Link>
            {' '}ni inceleyebilirsiniz.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-5 md:mt-0 shrink-0">
          <button
            type="button"
            onClick={() => accept('essential')}
            className="px-5 py-3 text-[11px] tracking-[0.25em] uppercase border border-white/25 text-white/80 hover:border-white hover:text-white transition-colors"
          >
            Yalnızca Zorunlu
          </button>
          <button
            type="button"
            onClick={() => accept('all')}
            className="px-5 py-3 text-[11px] tracking-[0.25em] uppercase bg-gold text-ink font-semibold hover:bg-white transition-colors"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
