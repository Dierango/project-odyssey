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

Proje görevlerimizin detaylı takibi için [ClickUp Sprint 1 Görevleri](https://app.clickup.com/90181414742/v/li/901809301383) linkini ziyaret edebilirsiniz.

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

### 📊 Sprint 2 Raporu: Mobil ve Backend'in Yükselişi, Web için Zemin Hazırlığı

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
![Sprint 2 ClickUp Board](https://via.placeholder.com/1024x768.png?text=Sprint+2+ClickUp+Board)

#### **Ürün Durumu: Ekran Görüntüleri**

<details>
<summary>Açmak için tıklayın</summary>

* **Mobil Uygulama - Kimlik Doğrulama Akışı:** Kullanıcıların sisteme dahil olmasını sağlayan modern ve kullanıcı dostu arayüzler.

    ![Mobil Giriş Ekranı](https://via.placeholder.com/400x800.png?text=Mobil+Giriş+Ekranı)
    ![Mobil Kayıt Ekranı](https://via.placeholder.com/400x800.png?text=Mobil+Kayıt+Ekranı)

* **Mobil Uygulama - Ana Sayfa ve Profil:** Kullanıcının kimlik doğrulama sonrası karşılandığı, temel modüllere erişim sunan ana sayfa ve profil ekranı.

    ![Mobil Ana Sayfa](https://via.placeholder.com/400x800.png?text=Mobil+Ana+Sayfa)
    ![Mobil Profil Sayfası](https://via.placeholder.com/400x800.png?text=Mobil+Profil+Sayfası)

* **Mobil Uygulama - Diğer Arayüzler:** Uygulamanın diğer temel bileşenleri.

    ![Mobil Ekran 5](https://via.placeholder.com/400x800.png?text=Mobil+Ekran+5)
    ![Mobil Ekran 6](https://via.placeholder.com/400x800.png?text=Mobil+Ekran+6)

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
