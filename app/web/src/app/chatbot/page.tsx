"use client";
import React, { useState, useRef, useEffect, FormEvent } from "react";
import { SendHorizonal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { marked } from "marked";

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
  const searchParams = useSearchParams();
  const newChatKey = searchParams.get("newChat") || "default";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [messages]);

  useEffect(() => {
    setMessages([]);
    setInput("");
  }, [newChatKey]);

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
      const response = await fetch("http://localhost:8000/chat/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        throw new Error("Sunucu hatası");
      }

      const data = await response.json();
      const newAthenaMessage: Message = {
        id: messages.length + 2,
        text: data.answer || "Athena'dan cevap alınamadı.",
        sender: "athena",
      };
      setMessages((prevMessages) => [...prevMessages, newAthenaMessage]);
    } catch (error) {
      console.error("API hatası:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Cevap alınamadı.",
        sender: "athena",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div key={newChatKey} className="flex flex-col h-full p-4">
      {messages.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-gray-500 text-lg mb-8">Merhaba! Athena'ya bir soru sorarak başlayın.</p>
          <div className="relative w-full max-w-md rounded-full shadow-lg bg-white/10 backdrop-blur">
            <form onSubmit={handleSendMessage} className="flex items-center p-2">
              <input
                ref={inputRef}
                type="text"
                id="prompt"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Merhaba! Athena'ya bir soru sor..."
                className="flex-grow bg-transparent text-white focus:outline-none placeholder-gray-500 ml-2"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full text-white hover:bg-indigo-500 transition-colors ml-2"
              >
                <SendHorizonal size={20} />
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
                  dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
                ></div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex-shrink-0 w-full max-w-md rounded-full shadow-lg bg-white/10 backdrop-blur mx-auto mt-4">
            <form onSubmit={handleSendMessage} className="flex items-center p-2">
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
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
