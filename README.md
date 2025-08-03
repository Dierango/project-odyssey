# 🌟 Athena: Dijital Kimliğini Koru, Kendini Güvende Hisset! 🌟

![Athena_Banner](https://github.com/user-attachments/assets/08f38f51-3b3b-42b8-b4ae-7a2232ac9caa)

Athena, dijital dünyada siber güvenlik farkındalığını artırmak ve kullanıcıları olası tehditlere karşı güçlendirmek için tasarlanmış kişisel bir yapay zeka eğitmenidir. Kullanıcıların dijital ayak izini analiz etmeyi, interaktif eğitim modülleri sunmayı ve akıllı bir chatbot ile anında destek sağlamayı hedeflemektedir.

## 👤 Takımımız:

| | <div align="center">Name</div> | <div align="center">Title</div> |
| :-----------: | :---------- | :---------- |
| | Şeyma Sarımehmet | Developer |
| | Özgür AY | Developer |
| | İbrahim Akçal | Developer |
| | Nahide Hüsna Tüten | Product Owner |
| | Ekin Doğu Boztepe | Scrum Master |

## 📈 Proje Yönetimi ve Geliştirme Süreci

Projemizi Scrum metodolojisiyle yönetiyoruz. ClickUp'ı ana proje yönetim aracımız olarak kullanıyor ve Daily Scrum toplantıları, Sprint Review'ler ve Sprint Retrospektifleri düzenli olarak yapıyoruz.

Proje görevlerimizin detaylı takibi için [ClickUp Sprint 1-2-3](https://app.clickup.com/90181414742/v/o/f/90186151144?pr=90185380407) linkini ziyaret edebilirsiniz.

### Git Branching Stratejisi

Geliştirme sürecimizde, `main` ve `develop` ana dallarına ek olarak özellik, hata düzeltme ve sürüm yönetimi için aşağıdaki dallanma stratejisini izliyoruz:

* `main`: Üretim ortamı için kararlı kod.
* `config`: İlgili bölümün konfigürasyon dalı.
* `develop`: Geliştirme sürecindeki en son kod.
* `feature/<ozellik-adi>`: Yeni özellik geliştirme.
* `bugfix/<hata-tanimi>`: Hata düzeltmeleri.
* `release/v<surum-no>`: Yeni sürüm hazırlığı ve son testler.

---

### 📊 Sprint 1 Raporu: Hızlı Başlangıç ve Temel Entegrasyon

Ayrıntılı Sprint 1 raporumuzu [buradan](assets/Athena-sprint-1.pdf) inceleyebilirsiniz.

**Dönem:** 20 Haziran 2025 – 6 Temmuz 2025

#### **Sprint Hedefi:**
Temel proje altyapısını kurmak, güvenli kimlik doğrulama ve chatbotun ilk basit sürümünü devreye almak.

#### **Tamamlanan Başlıca Görevler:**
* **Web Ekibi:** Projenin backend altyapısını (konfigürasyon dahil) kurdu ve web uygulaması için **landing page** ekranını hayata geçirdi.
* **Backend Ekibi:** Projenin web ve mobil servislerinin veri transferlerini sağlamak için backend servisi oluşturdu.
* **Yapay Zeka Ekibi:** Gemini API ile ilk bağlantıyı kurarak chatbotun temel konfigürasyonunu yaptı ve basit yanıtlar verebilen bir servis entegre etti.

#### **Sprint Hızı (Velocity):**
* **Tahmin Edilen Puan:** 15 Puan
* **Tamamlanan Puan:** 12 Puan

Takımımızın ilk sprintteki hızı 12 puan olarak belirlenmiştir. Bu veri, gelecek sprintler için daha gerçekçi ve ulaşılabilir hedefler belirlememize temel teşkil edecektir.

#### **Daily Scrum Özeti:**
Her gün 15.00'da 15 dakikalık kısa Daily Scrum toplantılarımızı düzenli olarak gerçekleştirdik. Bu toplantılar, takım üyelerinin şeffaf bir şekilde ilerlemelerini paylaşmalarını ve olası engelleri erken tespit etmemizi sağladı.

* **Önemli Çıktılar:**
    * Yapay Zeka ekibinin Gemini entegrasyonunda çıkan sorun developer ekibinin birlikte çalışması sonucu çözüldü.
    * Backend servisinde PostgreSQL bağlantısında henüz çözülemeyen bir bağlantı sorunu var. Donanım kaynaklı olduğu düşünülüyor.

#### **Sprint Board Durumu:**
Aşağıdaki ekran görüntüsü, Sprint 1'deki görevlerimizin ClickUp board üzerindeki son durumunu göstermektedir.
![Sprint 1 ClickUp Board](https://github.com/user-attachments/assets/86fbb43b-ed2e-489b-a952-5a3d9bcc6b06)

#### **Ürün Durumu: Ekran Görüntüleri**

<details>
<summary>Açmak için tıklayın</summary>

* **Web Uygulaması - Landing Page:** Athena'nın dijital kimliği koruma vizyonunu yansıtan açılış sayfası.

    ![Athena Web Landing Page](https://github.com/user-attachments/assets/b8f8c77f-f99b-407e-a10c-3106d62b3234)

* **Web Uygulaması - Ana Sayfa Yapısı:** Dijital ayak izi analizi ve simülasyonlu eğitim gibi temel modülleri tanıtan ana sayfa yapısı.

    ![Athena Web Main Page Structure](https://github.com/user-attachments/assets/6841b40d-cf1b-4a55-bb4e-4e6de6c9cb63)

* **Athena Chatbot - İlk Yanıt Örneği:** Chatbotun temel bir siber güvenlik sorusuna (sızma testi nedir?) verdiği ilk yanıt.

    ![Athena Chatbot Response](https://github.com/user-attachments/assets/6d996675-6d56-4116-a984-831f17d2c67f)

</details>

#### **Sprint Review Özeti:**
6 Temmuz 2025, 18:00'de gerçekleştirilen Sprint Review toplantısında, ekibimiz tamamlanan işleri paydaşlara sergiledi. Web Geliştirici, Athena Web Landing Page'i ve örnek kayıt ekranını entegre etti. Yapay Zeka Ekibi, Gemini API entegrasyonunu ve chatbotun ilk basit yanıt verme yeteneğini test etti. Backend Geliştirici ise PostgreSQL ve FastAPI entegrasyonu ile lokal bilgisayarda örnek backend'i ayağa kaldırdı.

* **Önemli Çıktılar/Geri Bildirimler:**
    * Mavi renkli tasarımın devam edilmesine ve mobile entegrasyonuna karar verildi.
    * Chatbotun ilk hali basit olsa da, yapay zeka potansiyeli ve gelecek vaat etmesi açısından heyecan yarattı.
    * Bazı küçük UI düzenlemeleri veya metin düzeltmeleri için notlar alındı ve Product Backlog'a eklenecek.

#### **Sprint Retrospective Özeti:**
6 Temmuz 2025, 20:00'de yapılan retrospektif toplantımızda aşağıdaki sonuçlara ulaştık:

* **Neler İyi Gitti?**
    * Ekip içi iletişim çok verimliydi, Daily Scrum'lar sayesinde herkesin ne üzerinde çalıştığı ve potansiyel engeller netti.
    * Web Landing Page entegrasyonu beklenenden daha hızlı tamamlandı, bu da erken bir başarı hissi yarattı.
    * Git branch stratejisi iyi işledi, kod çakışmaları minimum düzeyde kaldı ve herkesin yetki alanı netti.
    * Görev puanlama konusunda ilk deneme olmasına rağmen, tahminlerimiz oldukça yakın çıktı.

* **Neler Daha İyi Olabilirdi?**
    * Bazı görevlerin bağımlılıkları başlangıçta tam olarak anlaşılamadı, bu da kısa süreli blokajlara yol açtı. Gelecekte daha detaylı ön analiz gerekli.
    * Backend API kontratları (Web ve Mobil entegrasyonları için) daha detaylı ve önceden belirlenebilirdi, bu da küçük uyumsuzluklara neden oldu.

* **Neler Yapacağız (Gelecek Sprintler İçin Aksiyonlar)?**
    * Gelecek sprintlerde her görev için başlangıçta daha net kabul kriterleri ve bağımlılıklar belirlemek ve bunların tüm ekiple gözden geçirildiğinden emin olmak.
    * Backend API endpoint'leri için basit bir dokümantasyon (örn. Postman koleksiyonu) oluşturmak ve ekiple paylaşmak, entegrasyonu kolaylaştırmak.
    * Yeni bir özelliğe başlamadan önce UI/UX mockup'larını gözden geçirmek için 15 dakikalık bir "mini-review" toplantısı yapmak, tasarım ve geliştirme arasındaki uyumu artırmak.

---

### 📊 Sprint 2 Raporu: Mobil ve Backend'in Bağlantısı, Web için Zemin Hazırlığı

**Dönem:** 7 Temmuz 2025 – 20 Temmuz 2025

#### **Sprint Hedefi:**
Bu sprint'in ana hedefi, kullanıcı kimlik doğrulama (authentication) servislerini içeren sağlam bir backend altyapısı kurmak ve mobil uygulama için temel arayüzleri (giriş, kayıt, ana sayfa) geliştirerek bu iki katmanı birbirine entegre etmekti. Başlangıçta hedeflenen web arayüzü ve özel Gemini API entegrasyonu ise bu sprint'e yetiştirilememiştir.

#### **Tamamlanan Başlıca Görevler:**
* **Backend Ekibi:** FastAPI üzerinde kullanıcı kayıt, giriş ve temel profil yönetimi için gerekli API endpoint'lerini başarıyla oluşturdu. Veritabanı şemaları ve modelleri tamamlanarak servisler çalışır hale getirildi.
* **Mobil Ekibi:** React Native ile kullanıcı giriş (Login), kayıt (Register) ve ana sayfa (Home) ekranlarını geliştirdi. Geliştirilen arayüzler, backend servisleriyle başarılı bir şekilde entegre edilerek elle tutulur ilk ürün deneyimi oluşturuldu.

#### **Sprint Hızı (Velocity):**
* **Tahmin Edilen Puan:** 36 Puan
* **Tamamlanan Puan:** 14 Puan

Takım, bu sprint'te 14 puanlık bir hız sergiledi. Tahmin edilen ve tamamlanan puanlar arasındaki büyük fark, sprint planlamasının fazla iddialı olduğunu ve görev dağılımında iyileştirmeler yapılması gerektiğini gösterdi. Bu, gelecek sprint için önemli bir öğrenme fırsatı sundu.

#### **Daily Scrum Özeti:**
Günlük toplantılar, özellikle backend ve mobil ekipleri arasındaki entegrasyon sorunlarının hızla çözülmesinde kritik rol oynadı. Web ekibinin görevlere başlayamaması ve yapay zeka entegrasyonundaki gecikme, toplantılarda sıkça dile getirilen ve çözüm aranan temel engellerdi.

* **Önemli Çıktılar:**
    * Backend ve mobil arasındaki API kontratlarında yaşanan küçük anlaşmazlıklar, anlık iletişimle hızla giderildi.
    * Sprint planının gerçekçi olmadığı ve görev dağılımının dengesiz yapıldığı erken bir aşamada fark edildi.

#### **Sprint Board Durumu:**
Aşağıdaki ekran görüntüsü, Sprint 2'deki görevlerimizin ClickUp board üzerindeki son durumunu göstermektedir.
![Sprint 2 ClickUp Board](https://github.com/user-attachments/assets/20e078ab-bd70-46b2-a863-28aa8e954c5c)

#### **Ürün Durumu: Ekran Görüntüleri**

<details>
<summary>Açmak için tıklayın</summary>

* **Mobil Uygulama - Kimlik Doğrulama Akışı:** Kullanıcıların sisteme dahil olmasını sağlayan modern ve kullanıcı dostu arayüzler.

    ![Mobil Giriş Ekranı](https://github.com/user-attachments/assets/786ffa72-2fb7-425a-b9b6-8fe7cd029d57)
    ![Mobil Kayıt Ekranı](https://github.com/user-attachments/assets/dc35dea2-631e-4d9e-a3da-f92ea6dd5115)

* **Mobil Uygulama - Ana Sayfa ve Profil:** Kullanıcının kimlik doğrulama sonrası karşılandığı, temel modüllere erişim sunan ana sayfa ve profil ekranı.

    ![Mobil Ana Sayfa](https://github.com/user-attachments/assets/474424cf-04c1-4ed5-b28f-ac7a188fe443)
    ![Mobil Profil Sayfası](https://github.com/user-attachments/assets/08557a09-5b2e-45a8-a57d-111854e5a32e)

* **Mobil Uygulama - Diğer Arayüzler:** Uygulamanın diğer temel bileşenleri.

    ![Mobil Ekran 5](https://github.com/user-attachments/assets/81ac4f8c-f612-4eb7-bc7c-f5a4cc89181e)
    ![Mobil Ekran 6](https://github.com/user-attachments/assets/02abcd3a-6c6f-41b2-885d-bea5155cd37b)

</details>

#### **Sprint Review Özeti:**
20 Temmuz 2025, 18:00'de yapılan Sprint Review'de, mobil ve backend ekipleri tamamladıkları işleri canlı bir demo ile sundu. Kullanıcıların mobil uygulama üzerinden başarılı bir şekilde kayıt olup giriş yapabilmesi paydaşlara gösterildi. Web ve yapay zeka tarafındaki eksiklikler ve bunların nedenleri şeffaf bir şekilde paylaşıldı.

* **Önemli Çıktılar/Geri Bildirimler:**
    * Mobil arayüzlerin tasarımı ve akıcılığı genel olarak beğenildi.
    * Backend servislerinin stabil ve beklendiği gibi çalışması güven verdi.
    * Web ve mobil arasındaki özellik farkının bir sonraki sprint'te hızla kapatılması gerektiği önemle vurgulandı.

#### **Sprint Retrospective Özeti:**
20 Temmuz 2025, 20:00'de yapılan retrospektif toplantısında aşağıdaki sonuçlara ulaştık:

* **Neler İyi Gitti?**
    * Karşılaşılan zorluklara rağmen backend ve mobil ekiplerinin somut ve çalışan bir ürün ortaya koyması takımın motivasyonunu önemli ölçüde artırdı.
    * Ekipler arası teknik entegrasyon sorunları, yapıcı ve hızlı bir iletişimle aşıldı.
    * Elle tutulur bir mobil uygulamanın ortaya çıkması, projenin geleceğine dair heyecanı ve inancı pekiştirdi.

* **Neler Daha İyi Olabilirdi?**
    * Sprint planlaması fazla iyimserdi; görevlerin karmaşıklığı ve tamamlanma süreleri doğru analiz edilemedi.
    * Görevlerin ekiplere ve kişilere dağılımında dengesizlikler vardı. Bu durum, bazı ekiplerin hedeflerine ulaşamamasına neden oldu.
    * Web ve yapay zeka gibi kritik ve diğer modülleri etkileyen entegrasyonların ertelenmesi, genel proje takvimini riske attı.

* **Neler Yapacağız (Gelecek Sprintler İçin Aksiyonlar)?**
    * Bir sonraki sprint'in ilk günlerinde, bu sprint'ten kalan web ve yapay zeka görevlerini en yüksek öncelikle ele alıp tamamlamak.
    * Sprint planlama toplantısına ek olarak, sprint'in ortasında ilerlemeyi ve görev dağılımını gözden geçirmek amacıyla ikinci bir "checkpoint" toplantısı yapmak.
    * Her takım üyesinin kendi sorumluluk alanındaki görevleri daha proaktif bir şekilde sahiplenmesini ve olası engelleri erkenden bildirmesini teşvik etmek.

---

### 📊 Sprint 3 Raporu: Web Uygulamasının Tamamlanması ve GitHub Pages Entegrasyonu

**Dönem:** 21 Temmuz 2025 – 3 Ağustos 2025

#### **Sprint Hedefi:**
Bu sprint'in ana hedefi, Sprint 2'de kalan web arayüzü görevlerini tamamlamak, kapsamlı bir web uygulaması geliştirmek ve ürünü GitHub Pages üzerinden canlı ortama çıkarmaktı. Ayrıca, backend ve web entegrasyonunu sağlayarak kullanıcı deneyimini mobil ile eşdeğer seviyeye getirmek hedeflendi.

#### **Tamamlanan Başlıca Görevler:**
* **Web Ekibi:** Profil, Hakkında, Yardım, Phishing Oyunu, Dijital Ayak İzi Analizi, Yapay Zeka ve Ana Sayfa olmak üzere 7 temel modülü başarıyla geliştirdi ve kullanıcı dostu arayüzlerle entegre etti.
* **DevOps ve Deployment:** GitHub Pages entegrasyonu gerçekleştirilerek web uygulaması [https://dierango.github.io/project-odyssey](https://dierango.github.io/project-odyssey) adresinden erişilebilir hale getirildi.
* **Backend Entegrasyon:** Web uygulaması ile backend servisleri arasında güvenli bağlantı kuruldu, ancak Google Cloud bağlantısı sorunları nedeniyle demo sunumları lokal ortamda gerçekleştirildi.

#### **Sprint Hızı (Velocity):**
* **Tahmin Edilen Puan:** 27 Puan
* **Tamamlanan Puan:** 21 Puan

Takım bu sprint'te 21 puanlık bir hız sergiledi. Sprint 2'ye kıyasla önemli bir iyileşme gözlemlendi ve hedeflenen puanın %78'ini başarıyla tamamladı. Bu, takımın sprint planlama becerilerinde gelişim kaydettiğini gösterdi.

#### **Daily Scrum Özeti:**
Web ekibinin yoğun çalışması sayesinde günlük toplantılar daha verimli geçti. Özellikle modüller arası UI/UX tutarlılığının sağlanması ve GitHub Pages deployment sürecinde yaşanan teknik zorluklar, günlük toplantılarda hızla çözüme kavuşturuldu.

* **Önemli Çıktılar:**
    * GitHub Pages ile canlı ortama çıkarma sürecinde routing ve build konfigürasyonları konusunda yaşanan teknik zorluklar, ekip iş birliği ile çözüldü.
    * Google Cloud bağlantı sorunları sprint boyunca devam etti, bu nedenle demo stratejisi lokal sunumlara adapte edildi.

#### **Sprint Board Durumu:**
Aşağıdaki ekran görüntüsü, Sprint 3'teki görevlerimizin ClickUp board üzerindeki son durumunu göstermektedir.
![Sprint 3 ClickUp Board - Placeholder]()

#### **Ürün Durumu: Ekran Görüntüleri**

<details>
<summary>Açmak için tıklayın</summary>

* **Web Uygulaması - Ana Sayfa ve Profil:** Kullanıcıların Athena'ya giriş yaptıktan sonra karşılandığı modern ana sayfa ve kişisel profil yönetimi arayüzü.

    ![Web Ana Sayfa - Placeholder]()
    ![Web Profil Sayfası - Placeholder]()

* **Web Uygulaması - Eğitim Modülleri:** Dijital ayak izi analizi ve phishing farkındalık oyunu gibi interaktif eğitim modülleri.

    ![Web Dijital Ayak İzi - Placeholder]()
    ![Web Phishing Oyunu - Placeholder]()

* **Web Uygulaması - Yapay Zeka ve Destek:** Athena chatbot arayüzü ve kullanıcı yardım merkezi.

    ![Web AI Chatbot - Placeholder]()
    ![Web Yardım Sayfası - Placeholder]()

* **Web Uygulaması - Hakkında Sayfası:** Athena'nın misyonu ve vizyonu hakkında bilgi veren sayfa.

    ![Web Hakkında Sayfası - Placeholder]()

</details>

#### **Canlı Demo ve GitHub Pages:**
Web uygulaması [https://dierango.github.io/project-odyssey](https://dierango.github.io/project-odyssey) adresinden erişilebilir durumdadır. **Not:** Chat ve kullanıcı girişi/kayıt özellikleri Google Cloud bağlantısı olmadığı için şu anda çalışmamaktadır. Tam işlevsellik için lokal demo tercih edilmelidir.

#### **Sprint Review Özeti:**
3 Ağustos 2025, 18:00'de yapılan Sprint Review'de, web ekibi geliştirilen tüm modülleri canlı GitHub Pages üzerinden sundu. Paydaşlara, Athena'nın artık mobil ve web platformlarında tutarlı bir deneyim sunduğu gösterildi.

* **Önemli Çıktılar/Geri Bildirimler:**
    * Web uygulamasının görsel tasarımı ve kullanıcı deneyimi oldukça beğenildi.
    * GitHub Pages entegrasyonu projenin profesyonel görünümünü önemli ölçüde artırdı.
    * Google Cloud bağlantısının bir sonraki sprint'te mutlaka çözülmesi gerektiği vurgulandı.
    * Mobil ve web arasındaki özellik tutarlılığının sağlanması takdir edildi.

#### **Sprint Retrospective Özeti:**
3 Ağustos 2025, 20:00'de yapılan retrospektif toplantısında aşağıdaki sonuçlara ulaştık:

* **Neler İyi Gitti?**
    * Web ekibinin performansı önceki sprintlere kıyasla dramatik bir iyileşme gösterdi ve hedeflenen tüm temel modüller tamamlandı.
    * GitHub Pages entegrasyonu beklenenden daha sorunsuz gerçekleşti ve projeye profesyonel bir görünüm kazandırdı.
    * Takımın sprint planlama becerisi gelişti; tahmin edilen ve tamamlanan puanlar arasındaki fark önemli ölçüde azaldı.
    * Mobil ve web arasındaki özellik tutarlılığı sağlanarak, kullanıcılar her iki platformda da benzer deneyim yaşayabilir hale geldi.

* **Neler Daha İyi Olabilirdi?**
    * Google Cloud bağlantı sorunları tüm sprint boyunca devam etti ve çözülemedi, bu da tam işlevsellik testlerini engelledi.
    * DevOps süreçleri henüz tam olarak otomatikleştirilmemiş durumda, manuel deployment adımları zaman kaybına neden oldu.
    * Yapay zeka entegrasyonu web tarafında henüz tam olarak optimize edilemedi.

* **Neler Yapacağız (Gelecek Sprintler İçin Aksiyonlar)?**
    * Bir sonraki sprint'in en yüksek önceliği Google Cloud bağlantı sorunlarını çözmek ve tam işlevsellik sağlamak olacak.
    * CI/CD pipeline kurarak deployment süreçlerini otomatikleştirmek ve manuel hataları minimize etmek.
    * Web tarafındaki yapay zeka entegrasyonunu optimize ederek mobil ile aynı seviyeye getirmek.
    * Kullanıcı testleri düzenleyerek gerçek kullanıcı geri bildirimlerini toplamaya başlamak.

---

## 🎯 Gelecek Planları

* Kullanıcı kimlik doğrulama süreçlerinin tamamlanması.
* Dijital Ayak İzi Analizi modülünün geliştirilmesi ve entegrasyonu.
* İnteraktif siber güvenlik eğitim modüllerinin geliştirilmesi.
* Chatbotun yeteneklerinin genişletilmesi ve kişiselleştirme özelliklerinin eklenmesi.
* Kullanıcı gelişim paneli ve ilerleme takibi özelliklerinin hayata geçirilmesi.

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak isterseniz, lütfen issue açmaktan veya pull request göndermekten çekinmeyin.

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altındadır.
