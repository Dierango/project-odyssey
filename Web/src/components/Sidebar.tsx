// src/components/Sidebar.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Plus, MessageSquare, Settings } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNewChat = (e: React.MouseEvent) => {
    e.preventDefault();

    // Yeni bir query parametresi ile aynı "/chatbot" sayfasına yönlendir
    // Date.now() ile her seferinde benzersiz bir değer alıyoruz.
    router.push(`/chatbot?newChat=${Date.now()}`);
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white w-64 p-4 border-r border-gray-700 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold">Athena Chat</h2>
      </div>

      {/* Yeni Sohbet Butonu */}
      <button
        onClick={handleNewChat}
        className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg mb-4 transition-colors w-full justify-center"
      >
        <Plus size={20} className="mr-2" />
        Yeni Sohbet
      </button>

      {/* Sohbet Geçmişi */}
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <h3 className="text-gray-400 text-sm uppercase mb-3">Geçmiş</h3>
        <ul className="space-y-2">
          {/* Örnek Sohbet Öğeleri */}
          <li>
            <Link href="/chatbot/chat-id-1" className="flex items-center text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors">
              <MessageSquare size={16} className="mr-2" />
              Siber Güvenlik Tanımı
            </Link>
          </li>
          <li>
            <Link href="/chatbot/chat-id-2" className="flex items-center text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors">
              <MessageSquare size={16} className="mr-2" />
              DDOS Saldırıları
            </Link>
          </li>
        </ul>
      </div>

      {/* Ayarlar veya Diğer Linkler (Opsiyonel) */}
      <div className="mt-auto border-t border-gray-700 pt-4">
        <ul>
          <li>
            <Link href="/settings" className="flex items-center text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors">
              <Settings size={18} className="mr-2" />
              Ayarlar
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}