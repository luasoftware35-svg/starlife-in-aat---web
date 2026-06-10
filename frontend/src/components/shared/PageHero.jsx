import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PageHero({ title, breadcrumb = [], image, height = '45vh' }) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      <div className="absolute inset-0">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy to-dark" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/60 to-dark/40" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-12 max-w-7xl">
        {breadcrumb.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white/50 text-xs tracking-widest uppercase mb-3"
          >
            {breadcrumb.map((b, i) => (
              <span key={i}>
                {b.href ? (
                  <Link to={b.href} className="hover:text-gold transition-colors">{b.label}</Link>
                ) : (
                  <span>{b.label}</span>
                )}
                {i < breadcrumb.length - 1 && <span className="mx-2 text-white/30">/</span>}
              </span>
            ))}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-black text-4xl md:text-5xl lg:text-6xl leading-tight"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-[3px] bg-gold mt-5"
        />
      </div>
    </section>
  );
}
