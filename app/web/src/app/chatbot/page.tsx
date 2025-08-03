"use client";
import React, { useState, useRef, useEffect, FormEvent, Suspense } from "react";
import { SendHorizonal } from "lucide-react";
import { useSearchParams } from 'next/navigation';

interface Message {
  id: number;
  text: string;
  sender: "user" | "athena";
  created_at?: string;
}

// Typing animation component
const TypingAnimation = () => (
  <div className="flex justify-start">
    <div className="max-w-[70%] p-3 rounded-lg bg-gray-700 text-white">
      <div className="flex items-center space-x-1">
        <div className="text-gray-400">Athena is typing</div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  </div>
);

// Separate component that uses useSearchParams
function ChatbotContent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();

  // Query parametresinden benzersiz bir key oluştur
  const newChatKey = searchParams.get('newChat') || 'default';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isTyping]);

  // Load chat history on component mount
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          setIsLoadingHistory(false);
          return;
        }

        const response = await fetch('http://localhost:8000/api/v1/chat/history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const chatHistory = await response.json();
          const formattedMessages: Message[] = chatHistory.map((msg: any) => ({
            id: msg.id,
            text: msg.content,
            sender: msg.role === 'user' ? 'user' : 'athena',
            created_at: msg.created_at
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadChatHistory();
  }, []);

  // Reset messages when newChatKey changes (new chat button clicked)
  useEffect(() => {
    if (newChatKey !== 'default') {
      setMessages([]);
      setInput("");
    }
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
    setIsTyping(true); // Start typing animation

    try {
      // Send message to backend API
      const response = await fetch('http://localhost:8000/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          role: 'user',
          content: input
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newAthenaMessage: Message = {
          id: data.id,
          text: data.content || "I received your message but couldn't generate a response.",
          sender: "athena",
          created_at: data.created_at
        };
        setMessages((prevMessages) => [...prevMessages, newAthenaMessage]);
      } else {
        throw new Error('Failed to get response from backend');
      }
    } catch (error) {
      console.error("Error sending message to Athena:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I couldn't connect to the AI service. Please try again later.",
        sender: "athena",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false); // Stop typing animation
    }
  };

  // Show loading state while fetching chat history
  if (isLoadingHistory) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        <p className="text-gray-400 mt-4">Loading chat history...</p>
      </div>
    );
  }

  return (
    <div key={newChatKey} className="flex flex-col h-full p-4">
      {messages.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center">
          <p className="text-gray-500 text-lg mb-8">Hello! Ask Athena a question to get started.</p>
          <div className="relative w-full max-w-md rounded-full shadow-lg bg-white/10 backdrop-blur">
            <form onSubmit={handleSendMessage} className="flex items-center p-2">
              <label htmlFor="prompt" className="sr-only">
                Ask Athena a question
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
                placeholder="Hello! Ask Athena a question to get started..."
                className="flex-grow bg-transparent text-white focus:outline-none placeholder-gray-500 ml-2"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping}
                className="p-2.5 rounded-full text-white hover:bg-indigo-500 transition-colors ml-2 disabled:opacity-50"
              >
                <SendHorizonal size={20} />
                <span className="sr-only">Send</span>
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
                  {msg.created_at && (
                    <div className="text-xs text-gray-300 mt-1 opacity-70">
                      {new Date(msg.created_at).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && <TypingAnimation />}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex-shrink-0 w-full max-w-md rounded-full shadow-lg bg-white/10 backdrop-blur mx-auto mt-4">
            <form onSubmit={handleSendMessage} className="flex items-center p-2">
              <label htmlFor="prompt" className="sr-only">
                Ask Athena a question
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
                placeholder="Type a message..."
                className="flex-grow bg-transparent text-white focus:outline-none placeholder-gray-500 ml-2"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping}
                className="p-2.5 rounded-full text-white hover:bg-indigo-500 transition-colors ml-2 disabled:opacity-50"
              >
                <SendHorizonal size={20} />
                <span className="sr-only">Send</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

// Loading component for Suspense fallback
function ChatbotLoading() {
  return (
    <div className="flex flex-col h-full p-4 items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p className="text-gray-400 mt-4">Loading chatbot...</p>
    </div>
  );
}

// Main component with Suspense boundary
export default function ChatbotPage() {
  return (
    <Suspense fallback={<ChatbotLoading />}>
      <ChatbotContent />
    </Suspense>
  );
}
