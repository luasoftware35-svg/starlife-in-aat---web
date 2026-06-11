import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1];

export default function PageHero({ title, breadcrumb = [], image, height = '52vh' }) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      <div className="absolute inset-0">
        {image ? (
          <>
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/65 to-charcoal/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-charcoal-soft via-charcoal to-pomegranate-deep" />
        )}
      </div>

      <div className="relative z-10 h-full max-w-[1400px] mx-auto flex flex-col justify-end px-6 md:px-16 pb-12 md:pb-16">
        {breadcrumb.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white/45 text-[10px] tracking-[0.35em] uppercase mb-5 font-medium"
          >
            {breadcrumb.map((b, i) => (
              <span key={`bc-${b.label}-${i}`}>
                {b.href ? (
                  <Link to={b.href} className="hover:text-pomegranate-light transition-colors">{b.label}</Link>
                ) : (
                  <span className="text-white/70">{b.label}</span>
                )}
                {i < breadcrumb.length - 1 && <span className="mx-2.5 text-white/20">/</span>}
              </span>
            ))}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="font-serif-display text-white font-medium leading-[1.05] tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 56 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="h-[1px] bg-pomegranate-light/70 mt-7"
        />
      </div>
    </section>
  );
}
