# 🌟 Athena: Dijital Kimliğini Koru, Kendini Güvende Hisset! 🌟

![Athena_Banner](https://github.com/user-attachments/assets/08f38f51-3b3b-42b8-b4ae-7a2232ac9caa)

Athena, dijital dünyada siber güvenlik farkındalığını artırmak ve kullanıcıları olası tehditlere karşı güçlendirmek için tasarlanmış kişisel bir yapay zeka eğitmenidir. Kullanıcıların dijital ayak izini analiz etmeyi, interaktif eğitim modülleri sunmayı ve akıllı bir chatbot ile anında destek sağlamayı hedeflemektedir.

## 👤 Takımımız: Imagine 4

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
        ![Athena Chatbot Response](https://github.user-attachments/assets/6d996675-6d56-4116-a984-831f17d2c67f)
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
