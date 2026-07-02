import React from 'react';
import PolicyPageShell, { LegalDocument } from '../components/shared/PolicyPageShell';
import { getKvkkSections } from '../content/legalTexts';
import { policyPaths } from '../lib/policyPaths';
import { useCompany } from '../lib/siteSettings';

export default function Kvkk({
  layout = 'holding',
  navItems = [],
  brandPrefix = '',
  brandSuffix = '',
  basePath = '',
  footerDescription,
}) {
  const company = useCompany();
  const paths = policyPaths(basePath);
  const homeHref = basePath || '/';

  return (
    <PolicyPageShell
      layout={layout}
      title="KVKK Aydınlatma Metni"
      breadcrumb={[
        { label: 'Ana Sayfa', href: homeHref },
        { label: 'Politika', href: paths.kvkk },
        { label: 'KVKK Metni' },
      ]}
      navItems={navItems}
      brandPrefix={brandPrefix}
      brandSuffix={brandSuffix}
      basePath={basePath || '/'}
      footerDescription={footerDescription}
    >
      <LegalDocument
        intro={{
          title: 'Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni',
          paragraphs: [
            'Starlife İnşaat olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında kişisel verilerinizin güvenliğini sağlamayı, şeffaf bilgilendirme yapmayı ve veri sahiplerinin haklarına saygı göstermeyi ilke ediniyoruz.',
            'Bu metin; web sitemizi ziyaret eden kullanıcılar, iletişim formu dolduran kişiler ve insan kaynakları başvurusu yapan adaylar için hazırlanmıştır.',
          ],
        }}
        sections={getKvkkSections(company)}
      />
    </PolicyPageShell>
  );
}
