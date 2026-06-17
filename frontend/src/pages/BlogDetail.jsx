import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import HoldingHeader from '../components/holding/HoldingHeader';
import HoldingFooter from '../components/holding/HoldingFooter';
import SubsiteHeader from '../components/shared/SubsiteHeader';
import SubsiteFooter from '../components/shared/SubsiteFooter';
import PageHero from '../components/shared/PageHero';
import Seo from '../components/seo/Seo';
import { BLOG_POSTS } from '../mock/mock';
import { mapBlogPost, slugify } from '../lib/supabase/content';
import { buildArticleSchema, buildBreadcrumbSchema } from '../lib/seo/schema';
import { buildCanonical } from '../lib/seo/siteConfig';
import { supabase } from '../lib/supabase/client';

function renderContent(content) {
  return String(content || '')
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => (
      <p key={paragraph} className="text-base font-light leading-8 text-ink/65">
        {paragraph}
      </p>
    ));
}

export default function BlogDetail({ navItems, brandPrefix, brandSuffix, basePath = '/blog' }) {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const isSubsite = Boolean(navItems);
  const listPath = isSubsite ? `${basePath}/blog` : '/blog';
  const [state, setState] = useState({ loading: true, posts: [] });

  useEffect(() => {
    let mounted = true;
    const fallback = BLOG_POSTS.map(mapBlogPost);

    if (!supabase) {
      setState({ loading: false, posts: fallback });
      return () => {
        mounted = false;
      };
    }

    supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!mounted) return;
        if (error || !data?.length) {
          setState({ loading: false, posts: fallback });
          return;
        }
        setState({ loading: false, posts: data.map(mapBlogPost) });
      });

    return () => {
      mounted = false;
    };
  }, []);

  const post = useMemo(() => (
    state.posts.find((item) => item.slug === slug || String(item.id) === slug || slugify(item.title) === slug)
  ), [slug, state.posts]);

  const seoDescription = post?.excerpt || post?.content?.slice(0, 160) || 'Starlife İnşaat blog yazısı';
  const articleSchema = post ? buildArticleSchema({
    title: post.title,
    description: seoDescription,
    image: post.image,
    url: buildCanonical(pathname),
    author: post.author,
  }) : null;
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Bizden Haberler', href: listPath },
    { name: post?.title || 'Haber Detayı' },
  ]);

  const Header = isSubsite
    ? <SubsiteHeader navItems={navItems} brandPrefix={brandPrefix} brandSuffix={brandSuffix} contactHref={`${basePath}/iletisim`} />
    : <HoldingHeader />;
  const Footer = isSubsite
    ? <SubsiteFooter brandPrefix={brandPrefix} brandSuffix={brandSuffix} basePath={basePath} description="Güvenli ve modern yaşam alanları." />
    : <HoldingFooter />;

  if (state.loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-white text-ink">
        <p className="text-sm tracking-[0.3em] uppercase text-ink/50">Haber yükleniyor...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-ink">
        {Header}
        <PageHero title="Haber Detayı" breadcrumb={[{ label: 'Bizden Haberler', href: listPath }, { label: 'Haber Detayı' }]} />
        <section className="px-6 py-24 text-center">
          <p className="text-ink/60">Haber bulunamadı.</p>
          <Link to={listPath} className="mt-6 inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] uppercase">
            <ArrowLeft size={14} /> Haberlere Dön
          </Link>
        </section>
        {Footer}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      {post && (
        <Seo
          title={post.title}
          description={seoDescription}
          keywords={`${post.title}, Starlife İnşaat, inşaat haberleri, yapı güvenliği`}
          pathname={pathname}
          image={post.image}
          type="article"
          jsonLd={[articleSchema, breadcrumbSchema].filter(Boolean)}
        />
      )}
      {Header}
      <PageHero
        title={post.title}
        breadcrumb={[{ label: 'Bizden Haberler', href: listPath }, { label: post.title }]}
        image={post.image}
      />

      <article className="bg-white px-5 py-16 sm:px-6 md:px-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Link to={listPath} className="inline-flex items-center gap-2 text-gold text-[11px] font-medium tracking-[0.3em] uppercase">
            <ArrowLeft size={14} /> Haberlere Dön
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-4 text-xs uppercase tracking-widest text-ink/45">
            <span className="inline-flex items-center gap-1.5"><Calendar size={13} /> {post.date}</span>
            <span className="inline-flex items-center gap-1.5"><User size={13} /> {post.author}</span>
          </div>

          {post.excerpt && (
            <p className="mt-8 text-xl font-light leading-9 text-ink/70">
              {post.excerpt}
            </p>
          )}

          <div className="mt-10 overflow-hidden bg-ink">
            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
          </div>

          <div className="mt-12 space-y-6">
            {renderContent(post.content || post.excerpt)}
          </div>
        </div>
      </article>

      {Footer}
    </div>
  );
}
