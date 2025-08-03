"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // BU SATIRI EKLEYİN/DÜZELTİN

interface Scenario {
  id: number;
  title: string;
  description: string;
  question: string;
  options: string[];
  correctAnswerIndex: number; // Doğru cevabın options dizisindeki indeksi
  feedback: {
    correct: string;
    incorrect: string;
  };
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Kimlik Avı Saldırısı Simülasyonu",
    description: "Bir e-posta gelen kutunuza düşüyor. Konu 'Hesabınız Askıya Alındı' ve gönderici 'support@amaz0n.com' gibi görünüyor. E-postada, hesabınızın askıya alındığını ve tekrar etkinleştirmek için bir bağlantıya tıklamanız gerektiğini belirten acil bir mesaj var.",
    question: "Bu e-postaya nasıl tepki verirsiniz?",
    options: [
      "Hemen bağlantıya tıklayıp hesap bilgilerimi güncellerim.",
      "Gönderenin e-posta adresini dikkatlice inceler, şüpheli detaylar ararım.",
      "E-postayı görmezden gelir ve direkt çöp kutusuna taşırım.",
      "Amazon'un resmi web sitesine kendim giderek veya müşteri hizmetlerini arayarak hesabımın durumunu kontrol ederim."
    ],
    correctAnswerIndex: 3,
    feedback: {
      correct: "Tebrikler! Bu doğru bir yaklaşımdır. Şüpheli e-postalardaki bağlantılara tıklamadan doğrudan ilgili web sitesine gitmek en güvenli yoldur.",
      incorrect: "Yanlış cevap. Kimlik avı saldırıları genellikle aciliyet hissi yaratır ve sahte bağlantılarla bilgilerinizi çalmayı hedefler. Her zaman kaynağı doğrulayın."
    }
  },
  {
    id: 2,
    title: "Zayıf Şifre Tespiti",
    description: "Yeni bir çevrimiçi hizmete kaydoluyorsunuz. Şifre belirleme aşamasındasınız. Çoğu kişi kolay hatırlanır şifreler kullanır.",
    question: "Aşağıdaki şifrelerden hangisi en güvenli olanıdır?",
    options: [
      "123456",
      "KullaniciAdi1",
      "BenimKedim123",
      "p@sW0rD_GüçLü!789"
    ],
    correctAnswerIndex: 3,
    feedback: {
      correct: "Doğru! Uzun, büyük/küçük harf, sayı ve özel karakter içeren şifreler, kırılması en zor olanlardır.",
      incorrect: "Yanlış cevap. Kolay tahmin edilebilir, kişisel bilgi içeren veya basit ardışık sayılar/harfler içeren şifreler kolayca kırılabilir."
    }
  },
  {
    id: 3,
    title: "Herkese Açık Wi-Fi Kullanımı",
    description: "Bir kafede oturuyorsunuz ve ücretsiz Wi-Fi ağına bağlanmak istiyorsunuz. 'Cafe_Free_Wifi' adında şifresiz bir ağ görüyorsunuz.",
    question: "Bu ağı kullanırken nelere dikkat etmelisiniz?",
    options: [
      "Hemen bağlanıp bankacılık işlemlerimi hallederim, çünkü ücretsiz internet harika!",
      "Hassas işlemler yapmaktan kaçınır ve yalnızca genel internet gezintisi için kullanırım.",
      "VPN kullanarak bağlantımı şifrelerim ve sonra interneti kullanırım.",
      "Sadece şifre gerektiren Wi-Fi ağlarına bağlanırım, ücretsiz olanlar risklidir."
    ],
    correctAnswerIndex: 2, // VPN kullanmak en güvenli yoldur
    feedback: {
      correct: "Mükemmel! Halka açık Wi-Fi ağları güvenli olmayabilir. VPN kullanarak tüm verilerinizi şifrelemek, bu ağlarda bile güvenliğinizi artırır.",
      incorrect: "Yanlış cevap. Şifrelenmemiş halka açık Wi-Fi ağları, verilerinizin kolayca ele geçirilmesine yol açabilir. Dikkatli olun!"
    }
  }
];

export default function SimulationPage() {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const router = useRouter(); // BU SATIRI EKLEYİN

  const currentScenario = scenarios[currentScenarioIndex];

  const handleOptionClick = (index: number) => {
    setSelectedOptionIndex(index);
    setFeedbackMessage(null); // Yeni seçimde önceki geri bildirimi temizle
    setShowFeedback(false);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null) {
      setFeedbackMessage("Lütfen bir seçenek belirleyin.");
      setShowFeedback(true);
      return;
    }

    if (selectedOptionIndex === currentScenario.correctAnswerIndex) {
      setFeedbackMessage(currentScenario.feedback.correct);
    } else {
      setFeedbackMessage(currentScenario.feedback.incorrect);
    }
    setShowFeedback(true);
  };

  const handleNextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedOptionIndex(null);
      setFeedbackMessage(null);
      setShowFeedback(false);
    } else {
      // Tüm senaryolar bitti
      setFeedbackMessage("Tüm senaryoları tamamladınız! Harika iş çıkardınız.");
      setShowFeedback(true);
      // İsterseniz burada bir "Yeniden Başla" butonu veya ana sayfaya yönlendirme yapabilirsiniz.
    }
  };

  const handleRestart = () => {
    setCurrentScenarioIndex(0);
    setSelectedOptionIndex(null);
    setFeedbackMessage(null);
    setShowFeedback(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0b1120] via-[#14213d] to-[#1f2937] text-white p-4 pt-20"> {/* pt-20 navbar altında kalması için */}
      <div className="w-full max-w-2xl mx-auto p-6 rounded-lg bg-gray-800 shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          Siber Güvenlik Simülasyonu
        </h2>

        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-200">
            Senaryo {currentScenarioIndex + 1} / {scenarios.length}: {currentScenario.title}
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            {currentScenario.description}
          </p>
          <p className="text-lg font-medium text-white mb-4">
            {currentScenario.question}
          </p>

          <div className="space-y-3">
            {currentScenario.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`w-full text-left p-4 rounded-md transition-colors duration-200
                  ${selectedOptionIndex === index
                    ? "bg-indigo-700 border-indigo-500"
                    : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                  } border`}
                disabled={showFeedback} // Geri bildirim gösterildiğinde seçenekleri devre dışı bırak
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showFeedback && feedbackMessage && (
          <div className={`p-4 rounded-md text-sm mb-6 ${
            selectedOptionIndex === currentScenario.correctAnswerIndex ? "bg-green-600 bg-opacity-30 text-green-200" : "bg-red-600 bg-opacity-30 text-red-200"
          }`}>
            {feedbackMessage}
          </div>
        )}

        <div className="flex justify-between mt-6">
          {!showFeedback && (
            <button
              onClick={handleSubmitAnswer}
              className="px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors text-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedOptionIndex === null}
            >
              Cevabı Gönder
            </button>
          )}

          {showFeedback && (
            <>
              {currentScenarioIndex < scenarios.length - 1 ? (
                <button
                  onClick={handleNextScenario}
                  className="px-6 py-3 rounded-md bg-green-600 hover:bg-green-700 transition-colors text-lg font-semibold shadow-md"
                >
                  Sonraki Senaryo
                </button>
              ) : (
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-md bg-yellow-600 hover:bg-yellow-700 transition-colors text-lg font-semibold shadow-md"
                >
                  Yeniden Başla
                </button>
              )}
            </>
          )}
          {/* Eğer tüm senaryolar bittiyse ve 'Yeniden Başla' butonu görünüyorsa, 'Sonraki Senaryo' butonu gizlenmeli. */}
          {showFeedback && currentScenarioIndex < scenarios.length -1 && (
             <button
               onClick={() => router.push('/')} // Ana sayfaya dönüş butonu
               className="px-6 py-3 rounded-md bg-gray-600 hover:bg-gray-700 transition-colors text-lg font-semibold shadow-md"
             >
               Ana Sayfaya Dön
             </button>
          )}
        </div>

      </div>
    </div>
  );
}