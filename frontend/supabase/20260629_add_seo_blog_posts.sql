alter table public.blog_posts add column if not exists category text;

insert into public.blog_posts (title, slug, excerpt, cover_image, content, category, published, created_at)
values
(
  'Starlife İnşaat 2026 Kurumsal Vizyonunu Açıkladı: Diyarbakır''dan Türkiye''ye Güven İnşa Ediyoruz',
  'starlife-insaat-2026-kurumsal-vizyon-diyarbakir-insaat-firmasi',
  'Starlife İnşaat, 2026 kurumsal vizyonunda konut, taahhüt ve grup şirketleriyle Türkiye genelinde güvenilir inşaat hizmeti sunmayı hedefliyor.',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=940',
  $$Starlife İnşaat, 2009 yılından bu yana Diyarbakır merkezli faaliyet gösteren köklü bir inşaat firması olarak 2026 kurumsal vizyonunu kamuoyuyla paylaştı. Şirket; konut projeleri, TOKİ taahhüt işleri ve Starlife, ERD İnşaat, İnvest İnşaat markalarından oluşan grup yapısıyla bölgesel liderlikten ulusal ölçeğe uzanan bir büyüme stratejisi izliyor.

Kurumsal vizyonun odağında deprem yönetmeliğine tam uyum, zamanında teslim, şeffaf müşteri iletişimi ve yüksek malzeme standardı yer alıyor. Starlife İnşaat Yönetimi, Kayapınar ve Talaytepe başta olmak üzere Diyarbakır'da tamamlanan onlarca konut projesinin yanı sıra Antalya, Malatya, Mardin ve İstanbul'da yürütülen taahhüt işleriyle sektörde güvenilirlik vurgusunu sürdürdüklerini belirtti.

Starlife İnşaat olarak hedefimiz yalnızca bina inşa etmek değil; ailelere uzun vadeli değer sunan, güvenli ve modern yaşam alanları üretmektir. 2026 yılında yeni konut lansmanları, tamamlanan taahhüt projeleri ve dijital müşteri deneyimi yatırımlarıyla markamızı inşaat sektöründe üst sıralara taşımayı planlıyoruz.$$,
  'Kurumsal Haber',
  true,
  '2026-06-28 10:00:00+00'
),
(
  'Starlife İnşaat Grup Yapısı Güçleniyor: Üç Marka, Tek Mühendislik ve Kalite Standardı',
  'starlife-insaat-grup-sirketleri-erd-invest-kurumsal-haber',
  'Starlife, ERD İnşaat ve İnvest İnşaat markalarıyla grup şirketleri konut, ticari ve karma projelerde ortak kalite vizyonuyla hareket ediyor.',
  'https://images.pexels.com/photos/1543918/pexels-photo-1543918.jpeg?auto=compress&cs=tinysrgb&w=940',
  $$Starlife İnşaat Grubu; Starlife İnşaat, ERD İnşaat ve İnvest İnşaat markalarıyla konut, ticari yapı ve yatırım odaklı projelerde entegre bir yapı sunuyor. Grup bünyesindeki her marka kendi uzmanlık alanında faaliyet gösterirken mühendislik, kalite kontrol ve iş güvenliği standartları ortak yönetim anlayışıyla yürütülüyor.

ERD İnşaat, insan odaklı mimari ve yüksek kalite standartlarıyla konut projelerinde fark yaratırken; İnvest İnşaat ticari ve karma kullanımlı yatırım projelerinde değer odaklı çözümler geliştiriyor. Ana marka Starlife İnşaat ise Diyarbakır ve çevresindeki konut projeleri ile Türkiye genelindeki taahhüt işlerinde grubun omurgasını oluşturuyor.

Grup şirketlerimizin tek vizyon altında buluşması, müşterilerimize daha güçlü teknik altyapı, daha geniş proje portföyü ve uzun vadeli satış sonrası destek anlamına geliyor.$$,
  'Kurumsal Haber',
  true,
  '2026-06-25 10:00:00+00'
),
(
  'TOKİ Taahhüt Projelerinde Starlife İnşaat: Türkiye Genelinde Kamu Yapımında Güven',
  'toki-taahhut-projeleri-starlife-insaat-kurumsal-basari',
  'Starlife İnşaat, Antalya, Malatya, Mardin ve İstanbul başta olmak üzere TOKİ taahhüt projelerinde kamu yapımında güvenilir çözüm ortağı olmaya devam ediyor.',
  'https://images.pexels.com/photos/159306/pexels-photo-159306.jpeg?auto=compress&cs=tinysrgb&w=940',
  $$Starlife İnşaat, taahhüt işleri portföyünde yer alan TOKİ konut projeleri, okul, yurt ve kamu yapılarıyla Türkiye'nin farklı illerinde faaliyet gösteriyor. Antalya Serik, Malatya Battalgazi, Diyarbakır Çermik, Şanlıurfa Eyyübiye ve İstanbul Arnavutköy gibi projeler; şirketin kamu yapımındaki deneyimini ve operasyonel kapasitesini ortaya koyuyor.

Taahhüt projelerinde zamanında teslim, iş güvenliği, malzeme kalitesi ve şantiye disiplini Starlife İnşaat'ın vazgeçilmez öncelikleri arasında. Her projede zemin etüdü, statik hesap, deprem yönetmeliğine uygun uygulama ve bağımsız denetim süreçleri titizlikle yürütülüyor.

Starlife İnşaat, taahhüt işlerinde edindiği tecrübeyi konut projelerine de taşıyarak hem bireysel müşterilere hem kamu kurumlarına aynı kalite standardını sunuyor.$$,
  'Kurumsal Haber',
  true,
  '2026-06-22 10:00:00+00'
),
(
  'Kayapınar Konut Projelerinde Starlife İnşaat Farkı: Elit Yaşam Alanları Nasıl Planlanıyor?',
  'kayapinar-konut-projeleri-starlife-insaat-kurumsal-haber',
  'Starlife İnşaat, Kayapınar ve Talaytepe bölgelerindeki konut projelerinde sosyal donatı, güvenlik ve modern mimariyi bir araya getiriyor.',
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=940',
  $$Diyarbakır Kayapınar ve Talaytepe bölgelerinde hayata geçirilen Starlife İnşaat konut projeleri; modern mimari, geniş yaşam alanları ve güçlü sosyal donatı anlayışıyla dikkat çekiyor. Elit Life Villaları, New Star Konutları ve Batışehir Konutları gibi tamamlanan projeler, bölgede konut kalitesi ve güvenli yapılaşma beklentisine yanıt veriyor.

Starlife İnşaat projelerinde otopark, güvenlik, peyzaj, çocuk oyun alanları ve depreme dayanıklı mühendislik altyapısı standart olarak planlanıyor. Satış öncesi şeffaf bilgilendirme, teslim sonrası destek ve zamanında teslim taahhüdü markanın müşteri odaklı kurumsal yaklaşımının temelini oluşturuyor.

Diyarbakır konut piyasasında güvenilir inşaat firması arayan aileler için Starlife İnşaat, hem yaşam kalitesi hem uzun vadeli gayrimenkul değeri açısından güçlü bir tercih sunuyor.$$,
  'Kurumsal Haber',
  true,
  '2026-06-18 10:00:00+00'
),
(
  '2026 İnşaat Sektöründe 5 Vizyoner Trend: Sürdürülebilirlikten Akıllı Şantiyeye',
  '2026-insaat-sektoru-vizyoner-trendler-surdurulebilir-akilli-santiye',
  '2026 inşaat sektörü trendleri: yeşil binalar, modüler yapı, BIM teknolojisi, akıllı konut sistemleri ve depreme dayanıklı mühendislik öne çıkıyor.',
  'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=940',
  $$İnşaat sektörü 2026 yılında teknoloji, sürdürülebilirlik ve güvenlik ekseninde hızlı bir dönüşüm yaşıyor. Sektörün geleceğini şekillendiren beş vizyoner trend; yeşil bina sertifikasyonu, modüler ve prefabrik yapı sistemleri, BIM destekli proje yönetimi, akıllı konut otomasyonu ve gelişmiş deprem mühendisliği çözümleri olarak öne çıkıyor.

Enerji verimli cephe sistemleri, ısı yalıtımı ve yenilenebilir enerji entegrasyonu artık lüks değil, yeni konut projelerinde temel beklenti haline geldi. Akıllı şantiye uygulamaları malzeme takibi, iş programı optimizasyonu ve kalite kontrol süreçlerini dijitalleştirerek hem maliyet hem zaman avantajı sağlıyor.

Starlife İnşaat, sektördeki bu vizyoner dönüşümü yakından takip ederek projelerinde dijital mühendislik, yüksek kalite malzeme ve sürdürülebilir tasarım ilkelerini bir arada uyguluyor.$$,
  'Sektör & Vizyon',
  true,
  '2026-06-15 10:00:00+00'
),
(
  'Kentsel Dönüşüm ve Güvenli Konut: İnşaat Sektörünün 2026 Perspektifi',
  'kentsel-donusum-guvenli-konut-insaat-sektoru-2026-perspektifi',
  'Kentsel dönüşüm sürecinde güvenli, modern ve enerji verimli konut üretimi inşaat sektörünün en kritik gündem maddelerinden biri olmaya devam ediyor.',
  'https://images.pexels.com/photos/536215/pexels-photo-536215.jpeg?auto=compress&cs=tinysrgb&w=940',
  $$Türkiye'de kentsel dönüşüm, inşaat sektörünün en stratejik alanlarından biri olarak hem güvenli yapılaşma hem de şehir planlaması açısından belirleyici rol oynuyor. Riskli yapıların modern konutlara dönüştürülmesi; deprem güvenliği, yaşam kalitesi ve uzun vadeli gayrimenkul değeri açısından kritik önem taşıyor.

2026 perspektifinde kentsel dönüşüm projelerinde öne çıkan başlıklar; güçlendirilmiş taşıyıcı sistemler, zemin etüdüne dayalı mühendislik, yeşil alan planlaması ve sosyal donatı entegrasyonu. Vatandaşlar artık yalnızca yeni bir daire değil, güvenli ve sürdürülebilir bir yaşam modeli arıyor.

Starlife İnşaat, modern şehircilik vizyonu ve kentsel dönüşüme katkı yaklaşımıyla riskli yapıların yerine güvenli, estetik ve fonksiyonel projeler üretmeyi hedefliyor.$$,
  'Sektör & Vizyon',
  true,
  '2026-06-12 10:00:00+00'
),
(
  'BIM ve Dijital İnşaat: Şantiyelerde Verimlilik Devrimi Başladı',
  'bim-dijital-insaat-santiye-verimlilik-vizyon-haber',
  'BIM teknolojisi ve dijital şantiye uygulamaları inşaat projelerinde maliyet, süre ve kalite yönetimini kökten değiştiriyor.',
  'https://images.pexels.com/photos/3768146/pexels-photo-3768146.jpeg?auto=compress&cs=tinysrgb&w=940',
  $$Building Information Modeling (BIM) ve dijital şantiye teknolojileri, inşaat sektöründe proje tasarımından uygulama aşamasına kadar tüm süreçleri yeniden tanımlıyor. 3D modelleme, malzeme planlaması, çakışma analizi ve saha ilerleme takibi sayesinde hata oranı düşerken proje teslim süreleri kısalıyor.

Dijital inşaat yaklaşımı; iş güvenliği denetimleri, kalite kontrol raporları ve tedarik zinciri yönetiminde de şeffaflık sağlıyor. Gelişmiş mühendislik yazılımları deprem analizi, statik optimizasyon ve enerji simülasyonu gibi kritik hesaplamaları daha güvenilir hale getiriyor.

Starlife İnşaat, dijital dönüşümü kurumsal vizyonunun parçası olarak benimsiyor ve projelerinde ileri mühendislik teknolojilerini kullanmaya devam ediyor.$$,
  'Sektör & Vizyon',
  true,
  '2026-06-08 10:00:00+00'
),
(
  'Deprem Gerçeği ve Güvenli Yapılaşma: Türkiye İnşaat Sektörü 2026 Beklentileri',
  'deprem-guvenli-yapi-turkiye-insaat-sektoru-2026-beklentileri',
  'Deprem yönetmeliğine uygun güvenli yapılaşma, Türkiye inşaat sektöründe 2026 yılında en öncelikli mühendislik ve yatırım kriteri olmaya devam ediyor.',
  'https://images.pexels.com/photos/4458205/pexels-photo-4458205.jpeg?auto=compress&cs=tinysrgb&w=940',
  $$Türkiye'nin deprem gerçeği, inşaat sektöründe güvenli yapılaşmayı her zamankinden daha merkezi bir konu haline getirdi. 2026 yılında sektörden beklenen standartlar; güncel deprem yönetmeliğine tam uyum, güçlendirilmiş zemin etüdü, kaliteli beton ve donatı kullanımı ile bağımsız denetim süreçlerinin eksiksiz uygulanması.

Güvenli konut arayan aileler artık yalnızca lokasyon ve fiyat değil, mühendislik altyapısı, taşıyıcı sistem güvenliği ve yapı denetim raporlarını da değerlendiriyor. Bu dönüşüm, güvenilir inşaat firmalarını sektörün ön planına taşıyor.

Starlife İnşaat, tüm konut ve taahhüt projelerinde deprem dayanıklılığını temel mühendislik ilkesi olarak kabul ediyor. Radye temel, C sınıfı beton, TSE belgeli malzeme ve deneyimli statik ekiplerimizle geleceğin güvenli yaşam alanlarını inşa etmeye devam ediyoruz.$$,
  'Sektör & Vizyon',
  true,
  '2026-06-05 10:00:00+00'
)
on conflict (slug) do nothing;
