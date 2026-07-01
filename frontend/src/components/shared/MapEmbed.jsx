import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import {
  COOKIE_CONSENT_EVENT,
  getCookieConsent,
  hasFunctionalConsent,
  setCookieConsent,
} from '../../lib/cookieConsent';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14969.947003694955!2d40.1654883680318!3d37.92940969748189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40751fc6f04755bb%3A0xfc933c3a1f79563!2zU3RhciBMaWZlIMSwbsWfYWF0!5e0!3m2!1str!2str!4v1742219374172!5m2!1str!2str';

export default function MapEmbed({ title = 'Starlife İnşaat Konum Haritası' }) {
  const [allowed, setAllowed] = useState(hasFunctionalConsent());

  useEffect(() => {
    const sync = () => setAllowed(hasFunctionalConsent());
    window.addEventListener(COOKIE_CONSENT_EVENT, sync);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, sync);
  }, []);

  if (allowed) {
    return (
      <iframe
        title={title}
        src={MAP_SRC}
        className="w-full h-72 grayscale hover:grayscale-0 transition-all duration-500 border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="w-full h-72 bg-cream border border-ink/10 flex flex-col items-center justify-center text-center p-6">
      <MapPin className="text-pomegranate mb-3" size={28} />
      <p className="text-ink/70 text-sm max-w-sm leading-relaxed">
        Google Maps haritası çerez kullanımı gerektirir. Haritayı görüntülemek için çerez tercihlerinizi onaylayın.
      </p>
      <button
        type="button"
        onClick={() => {
          if (!getCookieConsent()) {
            setCookieConsent('all');
          }
          setAllowed(true);
        }}
        className="mt-4 px-6 py-2.5 bg-pomegranate text-white text-[11px] tracking-[0.25em] uppercase hover:bg-ink transition-colors"
      >
        Haritayı Yükle
      </button>
    </div>
  );
}
