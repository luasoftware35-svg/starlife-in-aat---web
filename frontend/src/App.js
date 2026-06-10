import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

import LandingPage from './pages/LandingPage';
import KurumsalHakkimizda from './pages/KurumsalHakkimizda';
import Iletisim from './pages/Iletisim';
import Blog from './pages/Blog';
import Kvkk from './pages/Kvkk';

import StarlifeHome from './pages/starlife/StarlifeHome';
import StarlifeHakkimizda from './pages/starlife/StarlifeHakkimizda';
import StarlifeInsanKaynaklari from './pages/starlife/StarlifeInsanKaynaklari';
import StarlifeTaahhutIsleri from './pages/starlife/StarlifeTaahhutIsleri';
import StarlifeProjects from './pages/starlife/StarlifeProjects';
import YapiGuvenligiPage from './pages/starlife/YapiGuvenligiPage';

import InvestHome from './pages/invest/InvestHome';
import ErdHome from './pages/erd/ErdHome';

import SubsiteBlog from './pages/SubsiteBlog';
import SubsiteIletisim from './pages/SubsiteIletisim';
import SubsiteAbout from './pages/SubsiteAbout';

import { STARLIFE_NAV, INVEST_NAV, ERD_NAV } from './mock/mock';

const investAboutProps = {
  navItems: INVEST_NAV, brandPrefix: 'İNVEST', brandSuffix: '', basePath: '/invest-insaat',
  label: 'İnvest İnşaat',
  title: 'Geleceğe değer katan yapılar oluşturuyoruz.',
  image: 'https://images.pexels.com/photos/34700467/pexels-photo-34700467.png?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600',
  paragraphs: [
    'İnvest İnşaat, modern şehircilik anlayışıyla yenilikçi, estetik ve sürdürülebilir projeler üreten bir inşaat firmasıdır. Her projede kalite, güvenlik ve konforu ön planda tutarak, yaşam alanlarını sadece inşa etmekle kalmıyor, aynı zamanda geleceğe değer katan yapılar oluşturuyoruz.',
    'Güçlü mühendislik altyapımız ve mimari vizyonumuzla, konut, ticari ve karma kullanımlı projeler geliştirerek, hem yatırımcılar hem de konut sahipleri için değerli ve kazançlı çözümler sunuyoruz.',
    'İnvest İnşaat olarak, geleceğin mimarisini bugünden inşa etme vizyonuyla hareket ediyor ve yaşam alanlarını daha modern, daha güvenli ve daha konforlu hale getirmek için çalışıyoruz.',
  ],
  vizyon: 'Yatırımcılar ve konut sahipleri için değerli, geleceğe miras kalacak modern yaşam alanları üretmek.',
  misyon: 'Yenilikçi, estetik ve sürdürülebilir projelerle şehirciliğe katkı sağlamak ve kazançlı yatırım alanları sunmak.',
};

const erdAboutProps = {
  navItems: ERD_NAV, brandPrefix: 'ERD', brandSuffix: ' İNŞAAT', basePath: '/erd-insaat',
  label: 'ERD İnşaat',
  title: 'İnsan odaklı tasarım, yüksek kalite.',
  image: 'https://images.pexels.com/photos/31197870/pexels-photo-31197870.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600',
  paragraphs: [
    'ERD İnşaat, yenilikçi mimari anlayışı, güçlü mühendislik altyapısı ve kalite odaklı yaklaşımı ile modern yaşam alanları inşa eden bir inşaat firmasıdır. Şehir dokusuna değer katan projeler geliştirerek, estetik, güvenli ve sürdürülebilir yapılar oluşturmayı hedefliyoruz.',
    'Konut, ticari ve karma kullanımlı projelerde fonksiyonelliği ve konforu bir araya getirerek, sadece yaşam alanları değil, geleceğe miras kalacak yapılar tasarlıyoruz.',
    'ERD İnşaat olarak, insan odaklı tasarım ve yüksek kalite standartlarıyla sektörde fark yaratmaya devam ediyoruz. Siz de ERD İnşaat ile geleceğin mimarisini keşfedin!',
  ],
  vizyon: 'İnsan odaklı tasarım anlayışı ile geleceğin mimarisine yön veren bir marka olmak.',
  misyon: 'Yüksek kalite ve güvenlik standartlarıyla, yaşam alanlarını daha değerli ve konforlu hale getirmek.',
};

function YapiGuvenligiRoute() {
  // ensures component re-renders on slug change
  const params = useParams();
  return <YapiGuvenligiPage key={params.slug} />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Holding */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/kurumsal/hakkimizda" element={<KurumsalHakkimizda />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/iletisim" element={<Iletisim />} />
          <Route path="/politika/kvkk-metni" element={<Kvkk />} />

          {/* Starlife */}
          <Route path="/starlife-insaat" element={<StarlifeHome />} />
          <Route path="/starlife-insaat/kurumsal/hakkimizda" element={<StarlifeHakkimizda />} />
          <Route path="/starlife-insaat/insankaynaklari" element={<StarlifeInsanKaynaklari />} />
          <Route path="/starlife-insaat/taahhutisleri" element={<StarlifeTaahhutIsleri />} />
          <Route path="/starlife-insaat/tumprojeler" element={<StarlifeProjects title="Tüm Projeler" breadcrumbLabel="Tüm Projeler" />} />
          <Route path="/starlife-insaat/projeler/tamamlanan-projeler" element={<StarlifeProjects filter="Tamamlanan" title="Tamamlanan Projeler" breadcrumbLabel="Tamamlanan" />} />
          <Route path="/starlife-insaat/projeler/devam-eden-projeler" element={<StarlifeProjects filter="Devam Eden" title="Devam Eden Projeler" breadcrumbLabel="Devam Eden" />} />
          <Route path="/starlife-insaat/yapiguvenligi/:slug" element={<YapiGuvenligiRoute />} />
          <Route path="/starlife-insaat/blog" element={<SubsiteBlog navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" />} />
          <Route path="/starlife-insaat/iletisim" element={<SubsiteIletisim navItems={STARLIFE_NAV} brandPrefix="STAR" brandSuffix="LİFE" basePath="/starlife-insaat" />} />
          <Route path="/starlife-insaat/politika/kvkk-metni" element={<Kvkk />} />

          {/* Invest */}
          <Route path="/invest-insaat" element={<InvestHome />} />
          <Route path="/invest-insaat/kurumsal/invest-insaat" element={<SubsiteAbout {...investAboutProps} />} />
          <Route path="/invest-insaat/blog" element={<SubsiteBlog navItems={INVEST_NAV} brandPrefix="İNVEST" brandSuffix="" basePath="/invest-insaat" />} />
          <Route path="/invest-insaat/iletisim" element={<SubsiteIletisim navItems={INVEST_NAV} brandPrefix="İNVEST" brandSuffix="" basePath="/invest-insaat" />} />

          {/* ERD */}
          <Route path="/erd-insaat" element={<ErdHome />} />
          <Route path="/erd-insaat/kurumsal/erd-insaat" element={<SubsiteAbout {...erdAboutProps} />} />
          <Route path="/erd-insaat/blog" element={<SubsiteBlog navItems={ERD_NAV} brandPrefix="ERD" brandSuffix=" İNŞAAT" basePath="/erd-insaat" />} />
          <Route path="/erd-insaat/iletisim" element={<SubsiteIletisim navItems={ERD_NAV} brandPrefix="ERD" brandSuffix=" İNŞAAT" basePath="/erd-insaat" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
