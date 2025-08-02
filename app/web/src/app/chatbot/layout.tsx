// app/chatbot/layout.tsx
import React from 'react';
import Sidebar from '@/components/Sidebar'; // Sidebar bileşenini import et
import { marked } from "marked";


export default function ChatbotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Ana kapsayıcı: Ekranı yatayda flex yapacak (sidebar ve içerik yanyana)
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sol Sidebar */}
      <Sidebar />

      {/* Ana İçerik Alanı (Chatbot Page) */}
      <main className="flex-grow overflow-hidden"> {/* flex-grow ile kalan alanı doldurur, overflow-hidden ile taşmayı engeller */}
        {children}
      </main>
    </div>
  );
}