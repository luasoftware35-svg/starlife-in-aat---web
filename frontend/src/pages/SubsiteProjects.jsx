import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import SubsiteHeader from '../components/shared/SubsiteHeader';
import SubsiteFooter from '../components/shared/SubsiteFooter';
import PageHero from '../components/shared/PageHero';
import { useProjectFilterState } from '../components/shared/ProjectFilterBar';
import { PROJECTS } from '../mock/mock';
import { fadeUp } from '../lib/animations';
import { mapProject, useSupabaseRows } from '../lib/supabase/content';

export default function SubsiteProjects({
  company,
  navItems,
  brandPrefix,
  brandSuffix,
  basePath,
  title,
  footerDescription,
  heroImage,
}) {
  const allProjects = useSupabaseRows(
    'projects',
    { orderBy: 'order_index', ascending: true },
    PROJECTS,
    mapProject,
  );

  const projects = useMemo(
    () => allProjects.filter((project) => project.company === company),
    [allProjects, company],
  );

  const { filtered, filterBar } = useProjectFilterState(projects, {
    showStatusFilter: true,
  });

  const breadcrumb = [{ label: 'Anasayfa', href: basePath }, { label: 'Projeler' }];

  return (
    <div className="bg-white text-ink min-h-screen">
      <SubsiteHeader
        navItems={navItems}
        brandPrefix={brandPrefix}
        brandSuffix={brandSuffix}
        contactHref={`${basePath}/iletisim`}
        basePath={basePath}
      />
      <PageHero title={title} breadcrumb={breadcrumb} image={heroImage} />

      <section className="bg-white text-ink py-20 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          {filterBar}
          {filtered.length === 0 ? (
            <p className="text-ink/60 text-center py-16">Bu marka için henüz listelenen proje bulunmuyor.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, index) => (
                <motion.article
                  key={project.id || project.slug}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  custom={index}
                  className="group overflow-hidden border border-stone-200 bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <span className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium">{project.tag}</span>
                    <h3 className="font-bold text-xl mt-2">{project.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink/60">
                      <span className="inline-flex items-center gap-1.5"><MapPin size={12} />{project.location}</span>
                      {project.year && <span className="inline-flex items-center gap-1.5"><Calendar size={12} />{project.year}</span>}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <SubsiteFooter
        brandPrefix={brandPrefix}
        brandSuffix={brandSuffix}
        basePath={basePath}
        description={footerDescription}
      />
    </div>
  );
}
