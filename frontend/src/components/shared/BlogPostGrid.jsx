import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/animations';

export default function BlogPostGrid({ posts, basePath = '' }) {
  const blogBase = basePath ? `${basePath}/blog` : '/blog';

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-[1400px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {posts.map((post, index) => (
        <motion.article key={post.id || post.slug} variants={fadeUp} className="group">
          <Link to={`${blogBase}/${post.slug}`} className="block">
            <div className="aspect-[4/3] overflow-hidden bg-ink">
              <img
                src={post.image}
                alt={post.title}
                width={640}
                height={480}
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </Link>
          <div className="mt-5">
            <div className="flex items-center gap-4 text-ink/50 text-xs tracking-widest uppercase">
              <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
              <span className="flex items-center gap-1.5"><User size={12} /> {post.author}</span>
            </div>
            <Link to={`${blogBase}/${post.slug}`} className="block">
              <h3 className="font-bold text-xl mt-3 group-hover:text-gold transition-colors">{post.title}</h3>
            </Link>
            <p className="text-ink/65 text-sm mt-3 leading-relaxed line-clamp-3">{post.excerpt}</p>
            <Link
              to={`${blogBase}/${post.slug}`}
              className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] uppercase mt-5 border-b border-gold/40 pb-1 group-hover:gap-3 transition-all"
            >
              Devamını Oku <ArrowRight size={12} />
            </Link>
          </div>
        </motion.article>
      ))}
    </motion.div>
  );
}
