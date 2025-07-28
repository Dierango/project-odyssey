"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const features = [
  {
    title: "Athena",
    icon: "🧠",
    desc: "Siber güvenlik sorularınıza anında cevap alın.",
    detail: "Athena, tehditleri analiz ederek öneriler sunar.",
  },
  {
    title: "Dijital Ayak İzi Analizi",
    icon: "🕵🏻‍♀",
    desc: "Adınızı girin ve athena sizin için internet üzerinde tarama yapsın.",
    detail: "Ayak izi analizi, veri sızıntısı risklerinizi ortaya çıkarır ve sizi siber dünyada güvende tutar.",
  },
  {
    title: "Simülasyonlu Eğitim",
    icon: "🎮",
    desc: "Senaryolarla kendinizi test edin.",
    detail: "Etkileşimli simülasyonlarla gerçek saldırı senaryolarını yaşayın ve siber saldırılara karşı daha bilinçli olun.",
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  return (
    
    <main className="font-sans text-gray-100 bg-gradient-to-br from-[#0b1120] via-[#14213d] to-[#1f2937] min-h-screen scroll-smooth">
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 shadow-xl md:hidden"
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
        </div>
      </button>
      <Navbar />

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0b1120] border-r border-white/10 shadow-xl transform transition-transform duration-300 z-40 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <nav className="flex flex-col p-6 space-y-4">
          <h2 className="text-white text-2xl font-bold mb-6">Athena</h2>
          {["simulasyon", "Analiz", "chatbot"].map((id, idx) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-white hover:text-indigo-400"
              onClick={() => setMenuOpen(false)}
            >
              {["🧠 Simülasyon", "🧬 Analiz", "🤖 Chatbot"][idx]}
            </a>
          ))}
        </nav>
      </div>
      

      

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Dijital Kimliğini Koru,<br className="hidden md:block" /> Kendini Güvende Hisset!
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-8">
          Athena ile dijital dünyadaki ayak izinizi analiz edin ve olası tehditlere karşı hazırlıklı olun her zaman yanınızda olacak olan athena sizin siber dünyada ki yardımcınız olacak.
        </p>
        <Link
          href="/register"
          className="text-lg px-8 py-4 rounded-2xl shadow-xl bg-indigo-600 hover:bg-indigo-500 transition-colors"
        >
          Hemen Kayıt Ol
        </Link>
      </section>

      {/* Feature Cards Section */}
      <section id="simulasyon" className="py-20 px-6 md:px-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ title, icon, desc, detail }, index) => {
            const isFlipped = flippedIndex === index;
            return (
              <div
                key={title}
                onClick={() => setFlippedIndex(isFlipped ? null : index)}
                className="cursor-pointer [perspective:1000px] w-full h-96"
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] bg-white/5 border border-white/10 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
                    <div className="text-4xl mb-4">{icon}</div>
                    <h3 className="text-2xl font-semibold my-2">{title}</h3>
                    <p className="text-sm">{desc}</p>
                  </div>

                  {/* Back */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-indigo-600 text-white rounded-2xl p-8 flex items-center justify-center text-center">
                    <p className="text-sm">{detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Section */}
      <section id="Analiz" className="py-24 bg-[#0f172a] px-6 md:px-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Neden Biz?</h2>
        <div className="max-w-3xl mx-auto grid gap-8 md:grid-cols-3">
          {[
            "Yapay zekâ destekli analiz",
            "Etkileşimli simülasyonlar",
            "Veri gizliliğine öncelik",
          ].map((txt) => (
            <div
              key={txt}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg text-sm"
            >
              {txt}
            </div>
          ))}
        </div>
      </section>
       <footer className="bg-gray-800 p-4 text-center text-white">
        &copy; 2025 Athena
      </footer>

    </main>
  );
}
