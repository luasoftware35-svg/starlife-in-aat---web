import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import HoldingHeader from '../components/holding/HoldingHeader';
import HoldingFooter from '../components/holding/HoldingFooter';
import PageHero from '../components/shared/PageHero';
import { BLOG_POSTS } from '../mock/mock';
import { fadeUp, staggerContainer } from '../lib/animations';
import { mapBlogPost, useSupabaseRows } from '../lib/supabase/content';

export default function Blog() {
  const posts = useSupabaseRows(
    'blog_posts',
    { orderBy: 'created_at', ascending: false, filters: [{ column: 'published', value: true }] },
    BLOG_POSTS,
    mapBlogPost,
  );

  return (
    <div className="bg-white text-ink min-h-screen">
      <HoldingHeader />
      <PageHero title="Bizden Haberler" breadcrumb={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Bizden Haberler' }]} image="https://images.pexels.com/photos/4458205/pexels-photo-4458205.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600" />

      <section className="bg-white text-ink py-16 px-5 sm:px-6 md:px-16 md:py-24">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-[1400px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((b) => (
            <motion.article key={b.id} variants={fadeUp} className="group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden bg-ink">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="mt-5">
                <div className="flex items-center gap-4 text-ink/50 text-xs tracking-widest uppercase">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {b.date}</span>
                  <span className="flex items-center gap-1.5"><User size={12} /> {b.author}</span>
                </div>
                <h3 className="font-bold text-xl mt-3 group-hover:text-gold transition-colors">{b.title}</h3>
                <p className="text-ink/65 text-sm mt-3 leading-relaxed">{b.excerpt}</p>
                <Link to="#" className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] uppercase mt-5 border-b border-gold/40 pb-1 group-hover:gap-3 transition-all">
                  Devamını Oku <ArrowRight size={12} />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <HoldingFooter />
    </div>
  );
}
