import React, { useCallback } from 'react';
import HoldingHeader from '../components/holding/HoldingHeader';
import HoldingFooter from '../components/holding/HoldingFooter';
import PageHero from '../components/shared/PageHero';
import BlogPostGrid from '../components/shared/BlogPostGrid';
import { BLOG_POSTS } from '../mock/mock';
import { BLOG_POST_LIST_QUERY, mapBlogPost, useSupabaseRows } from '../lib/supabase/content';
import { optimizeImageUrl } from '../lib/imageUtils';

const BLOG_HERO_IMAGE = optimizeImageUrl(
  'https://images.pexels.com/photos/4458205/pexels-photo-4458205.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600',
  { width: 1200, quality: 75 },
);

export default function Blog() {
  const mapListPost = useCallback((row) => mapBlogPost(row, { variant: 'list' }), []);
  const posts = useSupabaseRows(
    'blog_posts',
    BLOG_POST_LIST_QUERY,
    BLOG_POSTS,
    mapListPost,
  );

  return (
    <div className="bg-white text-ink min-h-screen">
      <HoldingHeader />
      <PageHero
        title="Bizden Haberler"
        breadcrumb={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Bizden Haberler' }]}
        image={BLOG_HERO_IMAGE}
      />

      <section className="bg-white text-ink py-16 px-5 sm:px-6 md:px-16 md:py-24">
        <BlogPostGrid posts={posts} />
      </section>

      <HoldingFooter />
    </div>
  );
}
