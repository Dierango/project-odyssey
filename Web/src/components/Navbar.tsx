// components/Navbar.tsx
"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-gray-900 backdrop-blur border-b border-white/10 md:flex justify-between items-center px-8 py-4">
      <div className="text-xl font-bold text-white"> {/* Buraya 'text-white' ekledik */}
        <Link href="/">ATHENA</Link>
      </div>
      <div className="space-x-6">
        {/* Her bir Link'e 'text-white' ve 'hover:text-indigo-400' ekledik */}
        <Link href="#simulasyon" className="text-white hover:text-indigo-400">
          Simülasyonlar
        </Link>
        <Link href="#Analiz" className="text-white hover:text-indigo-400">
          Analiz
        </Link>
        <Link href="/chatbot" className="text-white hover:text-indigo-400">
          Chatbot
        </Link>
      </div>
    </nav>
  );
}