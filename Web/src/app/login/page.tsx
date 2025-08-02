"use client"; // Bu, istemci tarafı etkileşimleri için gereklidir

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'; // Yönlendirme için useRouter'ı import edin

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter(); // useRouter hook'unu kullanın

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Önceki hataları temizle
    setSuccess(""); // Önceki başarı mesajlarını temizle

    // Burada gerçek bir kimlik doğrulama işlemi yapardınız (API çağrısı vb.)
    // Şimdilik sadece simüle edelim:
    console.log("Giriş denemesi:", { email, password });

    // Basit bir demo doğrulama (gerçek projede böyle yapmayın!)
    if (email === "test@example.com" && password === "password123") {
      setSuccess("Giriş başarılı! Ana sayfaya yönlendiriliyorsunuz...");
      setTimeout(() => {
        router.push('/'); // Başarılı giriş sonrası ana sayfaya yönlendir
      }, 1500);
    } else {
      setError("Geçersiz e-posta veya şifre.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0b1120] via-[#14213d] to-[#1f2937] text-white p-4">
      <div className="w-full max-w-sm mx-auto p-6 rounded-lg bg-gray-800 shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">Giriş Yap</h2>

        {error && (
          <div className="bg-red-600 bg-opacity-30 text-red-200 p-3 rounded mb-4 text-center text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-600 bg-opacity-30 text-green-200 p-3 rounded mb-4 text-center text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="sr-only">
              E-posta
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 rounded-md bg-indigo-600 hover:bg-indigo-700 transition-colors text-lg font-semibold shadow-md"
          >
            Giriş Yap
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Hesabın yok mu?{" "}
          <Link href="/register" className="text-indigo-400 hover:underline">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
}
