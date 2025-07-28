// app/chatbot/page.tsx
"use client";
import React, { useState, useRef, useEffect, FormEvent } from "react";
import { SendHorizonal } from "lucide-react";
import { useSearchParams } from 'next/navigation'; // useSearchParams'ı import et

interface Message {
  id: number;
  text: string;
  sender: "user" | "athena";
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams(); // URL'deki query parametrelerini al

  // Query parametresinden benzersiz bir key oluştur
  // Örneğin, '/chatbot?newChat=123456789' olduğunda bu key değişecek.
  const newChatKey = searchParams.get('newChat') || 'default';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  // messages state'ini sıfırlamak için bir useEffect daha ekleyelim
  // newChatKey değiştiğinde (yani "Yeni Sohbet"e tıklandığında) çalışacak
  useEffect(() => {
    setMessages([]); // Mesajları sıfırla
    setInput("");    // Input'u sıfırla
  }, [newChatKey]); // newChatKey her değiştiğinde bu useEffect çalışır

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput("");

    try {
      const athenaResponseText = `Siber güvenlik konusunda '${input}' hakkında yardımcı olabilirim. Başka ne öğrenmek istersiniz?`;

      setTimeout(() => {
        const newAthenaMessage: Message = {
          id: messages.length + 2,
          text: athenaResponseText,
          sender: "athena",
        };
        setMessages((prevMessages) => [...prevMessages, newAthenaMessage]);
      }, 1000);
    } catch (error) {
      console.error("Error sending message to Athena:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Üzgünüm, şu anda Athena ile iletişim kuramıyorum. Lütfen daha sonra tekrar deneyin.",
        sender: "athena",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    // Ana kapsayıcıya newChatKey'i key olarak veriyoruz.
    // Bu sayede newChatKey her değiştiğinde bu component yeniden monte edilecek.
    <div key={newChatKey} className="flex flex-col h-full p-4">

      {messages.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-gray-500 text-lg mb-8">Merhaba! Athena'ya bir soru sorarak başlayın.</p>
          <div className="relative w-full max-w-md rounded-full shadow-lg bg-white/10 backdrop-blur">
            <form onSubmit={handleSendMessage} className="flex items-center p-2">
              <label htmlFor="prompt" className="sr-only">
                Athena'ya soru sor
              </label>
              <div className="pl-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                id="prompt"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Merhaba! Athena'ya bir soru sorarak başlayın..."
                className="flex-grow bg-transparent text-white focus:outline-none placeholder-gray-500 ml-2"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full text-white hover:bg-indigo-500 transition-colors ml-2"
              >
                <SendHorizonal size={20} />
                <span className="sr-only">Gönder</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto p-4 space-y-4 w-full max-w-2xl mx-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === "user" ? "bg-indigo-600 text-white" : "bg-gray-700 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex-shrink-0 w-full max-w-md rounded-full shadow-lg bg-white/10 backdrop-blur mx-auto mt-4">
            <form onSubmit={handleSendMessage} className="flex items-center p-2">
              <label htmlFor="prompt" className="sr-only">
                Athena'ya soru sor
              </label>
              <div className="pl-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                id="prompt"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Bir mesaj yazın..."
                className="flex-grow bg-transparent text-white focus:outline-none placeholder-gray-500 ml-2"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full text-white hover:bg-indigo-500 transition-colors ml-2"
              >
                <SendHorizonal size={20} />
                <span className="sr-only">Gönder</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}