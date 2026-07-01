import React from 'react';
import HoldingHeader from '../holding/HoldingHeader';
import HoldingFooter from '../holding/HoldingFooter';
import SubsiteHeader from './SubsiteHeader';
import SubsiteFooter from './SubsiteFooter';
import PageHero from './PageHero';

export default function PolicyPageShell({
  title,
  breadcrumb,
  children,
  layout = 'holding',
  navItems = [],
  brandPrefix = '',
  brandSuffix = '',
  basePath = '/',
  footerDescription = 'Güvenli ve modern yaşam alanları.',
}) {
  const isSubsite = layout === 'subsite';

  return (
    <div className="bg-white text-ink min-h-screen">
      {isSubsite ? (
        <SubsiteHeader
          navItems={navItems}
          brandPrefix={brandPrefix}
          brandSuffix={brandSuffix}
          contactHref={`${basePath}/iletisim`}
        />
      ) : (
        <HoldingHeader />
      )}

      <PageHero title={title} breadcrumb={breadcrumb} />

      <section className="bg-white text-ink py-16 px-5 sm:px-6 md:px-16 md:py-24">
        <div className="max-w-[900px] mx-auto">{children}</div>
      </section>

      {isSubsite ? (
        <SubsiteFooter
          brandPrefix={brandPrefix}
          brandSuffix={brandSuffix}
          basePath={basePath}
          description={footerDescription}
        />
      ) : (
        <HoldingFooter />
      )}
    </div>
  );
}

function LegalSection({ section }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-ink mt-8 first:mt-0">{section.title}</h3>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-ink/75 leading-relaxed">
          {paragraph}
        </p>
      ))}
      {section.list && (
        <ul className="list-disc pl-6 space-y-2 text-ink/75 leading-relaxed">
          {section.list.map((item) => (
            <li key={item.slice(0, 40)}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function LegalDocument({ intro, sections }) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-black text-ink sm:text-2xl">{intro.title}</h2>
      {intro.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="text-ink/75 leading-relaxed">
          {paragraph}
        </p>
      ))}
      {sections.map((section) => (
        <LegalSection key={section.title} section={section} />
      ))}
    </div>
  );
}
