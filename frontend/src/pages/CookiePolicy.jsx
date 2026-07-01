import React from 'react';
import PolicyPageShell, { LegalDocument } from '../components/shared/PolicyPageShell';
import { getCookiePolicySections } from '../content/legalTexts';
import { policyPaths } from '../lib/policyPaths';

export default function CookiePolicy({
  layout = 'holding',
  navItems = [],
  brandPrefix = '',
  brandSuffix = '',
  basePath = '',
  footerDescription,
}) {
  const paths = policyPaths(basePath);
  const homeHref = basePath || '/';

  return (
    <PolicyPageShell
      layout={layout}
      title="Çerez Politikası"
      breadcrumb={[
        { label: 'Ana Sayfa', href: homeHref },
        { label: 'Politika', href: paths.cookies },
        { label: 'Çerez Politikası' },
      ]}
      navItems={navItems}
      brandPrefix={brandPrefix}
      brandSuffix={brandSuffix}
      basePath={basePath || '/'}
      footerDescription={footerDescription}
    >
      <LegalDocument
        intro={{
          title: 'Çerez Politikası',
          paragraphs: [
            'Bu Çerez Politikası, Starlife İnşaat web sitesinde kullanılan çerezler ve benzeri teknolojiler hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.',
            'Siteyi kullanmaya devam ederek zorunlu çerezlerin kullanımını kabul etmiş olursunuz. Üçüncü taraf çerezleri için çerez bildirim bandı üzerinden tercih belirleyebilirsiniz.',
          ],
        }}
        sections={getCookiePolicySections()}
      />
    </PolicyPageShell>
  );
}
