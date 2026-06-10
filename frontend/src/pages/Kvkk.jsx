import React from 'react';
import HoldingHeader from '../components/holding/HoldingHeader';
import HoldingFooter from '../components/holding/HoldingFooter';
import PageHero from '../components/shared/PageHero';

export default function Kvkk() {
  return (
    <div className="bg-white text-dark min-h-screen">
      <HoldingHeader />
      <PageHero title="KVKK Metni" breadcrumb={[{ label: 'Ana Sayfa', href: '/' }, { label: 'Politika' }, { label: 'KVKK Metni' }]} />

      <section className="bg-white text-dark py-24 px-6 md:px-16">
        <div className="max-w-[900px] mx-auto space-y-6 text-dark/75 leading-relaxed">
          <h2 className="text-2xl font-black text-dark">Kişisel Verilerin Korunması Kanunu (KVKK) Aydınlatma Metni</h2>
          <p>Starlife İnşaat olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, veri sorumlusu sıfatıyla siz değerli ziyaretçilerimizin kişisel verilerinin güvenliğini sağlamayı ilke edinmiş bulunmaktayız.</p>
          <h3 className="text-xl font-bold text-dark mt-6">1. Veri Sorumlusu</h3>
          <p>Starlife İnşaat, KVKK uyarınca veri sorumlusu olarak hareket eder. Kişisel verileriniz aşağıda belirtilen amaçlar doğrultusunda işlenir.</p>
          <h3 className="text-xl font-bold text-dark mt-6">2. Kişisel Verilerin İşlenme Amacı</h3>
          <p>Kişisel verileriniz; müşteri iletişimi, talep ve şikayetlerin değerlendirilmesi, projelerimiz hakkında bilgilendirme, hukuki yükümlülüklerin yerine getirilmesi amaçlarıyla işlenmektedir.</p>
          <h3 className="text-xl font-bold text-dark mt-6">3. Haklarınız</h3>
          <p>KVKK'nın 11. maddesi uyarınca, veri sahipleri olarak; kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmiş ise bilgi talep etme, işleme amacını ve uygun kullanılıp kullanılmadığını öğrenme haklarına sahipsiniz.</p>
          <h3 className="text-xl font-bold text-dark mt-6">4. İletişim</h3>
          <p>Sorularınız için tanitimmedya@starlifeinsaat.com adresine ulaşabilirsiniz.</p>
        </div>
      </section>

      <HoldingFooter />
    </div>
  );
}
