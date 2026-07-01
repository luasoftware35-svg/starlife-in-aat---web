import React from 'react';
import HoldingHeader from '../components/holding/HoldingHeader';
import HoldingFooter from '../components/holding/HoldingFooter';
import PageHero from '../components/shared/PageHero';
import { COMPANY } from '../mock/mock';

export default function Kvkk() {
  return (
    <div className="bg-white text-ink min-h-screen">
      <HoldingHeader />
      <PageHero title="KVKK Metni" breadcrumb={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Politika', href: '/politika/kvkk-metni' }, { label: 'KVKK Metni' }]} />

      <section className="bg-white text-ink py-16 px-5 sm:px-6 md:px-16 md:py-24">
        <div className="max-w-[900px] mx-auto space-y-6 text-ink/75 leading-relaxed">
          <h2 className="text-xl font-black text-ink sm:text-2xl">Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni</h2>
          <p>Starlife İnşaat olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, veri sorumlusu sıfatıyla siz değerli ziyaretçilerimizin kişisel verilerinin güvenliğini sağlamayı ilke edinmiş bulunmaktayız.</p>
          <h3 className="text-xl font-bold text-ink mt-6">1. Veri Sorumlusu</h3>
          <p>Starlife İnşaat, KVKK uyarınca veri sorumlusu olarak hareket eder. Kişisel verileriniz aşağıda belirtilen amaçlar doğrultusunda işlenir.</p>
          <h3 className="text-xl font-bold text-ink mt-6">2. Kişisel Verilerin İşlenme Amacı</h3>
          <p>Kişisel verileriniz; müşteri iletişimi, talep ve şikayetlerin değerlendirilmesi, projelerimiz hakkında bilgilendirme, hukuki yükümlülüklerin yerine getirilmesi amaçlarıyla işlenmektedir.</p>
          <h3 className="text-xl font-bold text-ink mt-6">3. Haklarınız</h3>
          <p>KVKK'nın 11. maddesi uyarınca, veri sahipleri olarak; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmiş ise bilgi talep etme, işleme amacını ve uygun kullanılıp kullanılmadığını öğrenme haklarına sahipsiniz.</p>
          <h3 className="text-xl font-bold text-ink mt-6">4. İletişim</h3>
          <p>Sorularınız için {COMPANY.email} adresine veya {COMPANY.phone} numarasına ulaşabilirsiniz.</p>
        </div>
      </section>

      <HoldingFooter />
    </div>
  );
}
