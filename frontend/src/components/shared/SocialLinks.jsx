import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';
import { useSocials } from '../../lib/siteSettings';

const iconMap = {
  Facebook: Facebook,
  Instagram: Instagram,
  Twitter: Twitter,
  Linkedin: Linkedin,
  Youtube: Youtube,
};

export default function SocialLinks({ vertical = false, size = 16, className = '', theme = 'light' }) {
  const socials = useSocials();
  const styles = theme === 'dark'
    ? 'border-white/20 text-white/70 hover:text-pomegranate-light hover:border-pomegranate-light'
    : 'border-ink/15 text-ink/60 hover:text-white hover:border-pomegranate hover:bg-pomegranate';

  if (!socials.length) return null;

  return (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} gap-3 ${className}`}>
      {socials.map((s) => {
        const Icon = iconMap[s.name];
        if (!Icon || !s.href) return null;
        return (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.name}
            className={`w-9 h-9 border rounded-full flex items-center justify-center transition-all duration-300 ${styles}`}
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}
