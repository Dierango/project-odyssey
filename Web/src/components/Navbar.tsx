"use client";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white/5 border-b border-white/10 px-8 py-6 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link href="/">ATHENA</Link>
      </div>
      <div className="space-x-6">
        <Link href="#simulasyon" className="hover:underline">
          Simülasyonlar
        </Link>
        <Link href="#Analiz" className="hover:underline">
          Analiz
        </Link>
        <Link href="#chatbot" className="hover:underline">
          Chatbot
        </Link>
      </div>
    </nav>
  );
}
