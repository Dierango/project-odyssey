"use client"; // İstemci tarafı etkileşimleri için bu gereklidir

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Yönlendirme için
import { ChevronLeft } from 'lucide-react'; // Geri ikonu için (Lucide Icons kullanılıyorsa)
// Eğer Lucide Icons projenizde kurulu değilse, bu ikonu bir SVG veya başka bir kütüphaneden almanız gerekebilir.
// Kurulum: npm install lucide-react veya yarn add lucide-react

export default function AnalysisPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const router = useRouter(); // useRouter hook'unu kullanın

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsError(false);

    if (!email) {
      setMessage("Lütfen bir e-posta adresi girin.");
      setIsError(true);
      return;
    }

    setLoading(true);

    // Burada aslında bir API çağrısı yapıp e-postayı analiz için gönderirdiniz.
    // Şimdilik sadece bir simülasyon yapalım:
    try {
      // API çağrısı simülasyonu
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 saniye bekle

      // E-posta formatı basit bir doğrulama
      if (!email.includes('@') || !email.includes('.')) {
        throw new Error("Geçersiz e-posta formatı.");
      }

      // Rastgele başarı/hata simülasyonu
      if (Math.random() > 0.3) { // %70 başarılı olma ihtimali
        setMessage(`'${email}' adresi için dijital ayak izi analizi başlatıldı. Sonuçlar e-posta adresinize gönderilecektir.`);
        setIsError(false);
      } else {
        throw new Error("Analiz sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      }
    } catch (err: any) {
      setMessage(err.message || "Analiz sırasında beklenmeyen bir hata oluştu.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0b1120] via-[#14213d] to-[#1f2937] text-white p-4 pt-20"> {/* pt-20 navbar altında kalması için */}
      {/* Geri Butonu */}
      <button
        onClick={() => router.back()} // Bir önceki sayfaya döner
        className="absolute top-6 left-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
        aria-label="Geri"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="w-full max-w-sm mx-auto p-6 rounded-lg bg-gray-800 shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Digital Footprint
        </h2>
        <p className="text-gray-300 text-center mb-8">
          Check your online presence
        </p>

        <form onSubmit={handleAnalyze} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              E-posta Adresinizi Girin
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-4 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="E-posta adresinizi girin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`w-full p-4 rounded-md text-lg font-semibold shadow-md transition-colors duration-300
              ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-rose-600 hover:bg-rose-700"}
            `}
            disabled={loading}
          >
            {loading ? "Analiz Ediliyor..." : "Analiz Et"}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-md text-center text-sm ${
            isError ? "bg-red-600 bg-opacity-30 text-red-200" : "bg-green-600 bg-opacity-30 text-green-200"
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}