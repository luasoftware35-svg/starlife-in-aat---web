import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { SOCIALS } from '../../mock/mock';

const iconMap = {
  Facebook: Facebook,
  Instagram: Instagram,
  Twitter: Twitter,
  Linkedin: Linkedin,
  Youtube: Youtube,
};

export default function SocialLinks({ vertical = false, size = 16, className = '' }) {
  return (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} gap-3 ${className}`}>
      {SOCIALS.map((s) => {
        const Icon = iconMap[s.name];
        return (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.name}
            className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-colors duration-300"
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}
