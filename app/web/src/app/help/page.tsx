"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  MessageCircle, 
  Shield, 
  User, 
  Settings, 
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Book,
  Video,
  FileText
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I start using Athena?",
    answer: "Simply create an account, complete your profile, and start with our interactive tutorials. The chatbot is also available 24/7 to help guide you through any features.",
    category: "Getting Started"
  },
  {
    question: "What is digital footprint analysis?",
    answer: "Digital footprint analysis examines your online presence across various platforms to identify potential privacy risks and security vulnerabilities. It helps you understand what information about you is publicly available.",
    category: "Digital Footprint"
  },
  {
    question: "How does the phishing game work?",
    answer: "Our phishing game presents you with realistic email scenarios where you must identify which are legitimate and which are phishing attempts. You'll receive immediate feedback and tips to improve your recognition skills.",
    category: "Phishing Defense"
  },
  {
    question: "Is my data secure on Athena?",
    answer: "Yes, we use industry-standard encryption and security practices to protect your data. We never store sensitive personal information unnecessarily and follow strict privacy guidelines.",
    category: "Security"
  },
  {
    question: "Can I reset my password?",
    answer: "Yes, you can reset your password from the login page by clicking 'Forgot Password'. You'll receive an email with instructions to create a new password.",
    category: "Account"
  },
  {
    question: "How accurate is the security score?",
    answer: "Your security score is calculated based on various factors including password strength, two-factor authentication usage, privacy settings, and completion of security modules. It's updated in real-time as you improve your security practices.",
    category: "Security"
  }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Getting Started", "Digital Footprint", "Phishing Defense", "Security", "Account"];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <Link href="/" className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Help & Support</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for help topics..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-6 hover:bg-gray-800/70 transition-colors cursor-pointer">
            <MessageCircle className="w-10 h-10 text-indigo-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Live Chat Support</h3>
            <p className="text-gray-400 text-sm">Get instant help from our AI assistant</p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-6 hover:bg-gray-800/70 transition-colors cursor-pointer">
            <Video className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
            <p className="text-gray-400 text-sm">Watch step-by-step guides</p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-6 hover:bg-gray-800/70 transition-colors cursor-pointer">
            <Book className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Documentation</h3>
            <p className="text-gray-400 text-sm">Comprehensive guides and manuals</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700/30 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full p-6 text-left hover:bg-gray-800/70 transition-colors flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-white">{faq.question}</h3>
                    <span className="text-xs text-indigo-400 mt-1">{faq.category}</span>
                  </div>
                  {expandedItems.includes(index) ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No help topics found matching your search.</p>
              <p className="text-gray-500 text-sm mt-2">Try different keywords or browse our categories.</p>
            </div>
          )}
        </div>

        {/* Feature-Specific Help */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Feature Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-6">
              <Shield className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Digital Footprint Analysis</h3>
              <p className="text-gray-400 text-sm mb-4">
                Learn how to analyze and improve your digital footprint for better privacy and security.
              </p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Understanding your online presence</li>
                <li>• Privacy settings optimization</li>
                <li>• Social media security tips</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-6">
              <MessageCircle className="w-8 h-8 text-indigo-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI Chat Assistant</h3>
              <p className="text-gray-400 text-sm mb-4">
                Get the most out of our intelligent chatbot for cybersecurity guidance.
              </p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Asking effective questions</li>
                <li>• Understanding responses</li>
                <li>• Advanced query techniques</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-6">
              <User className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Profile & Security Score</h3>
              <p className="text-gray-400 text-sm mb-4">
                Understand your security score and how to improve it for better protection.
              </p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Score calculation methods</li>
                <li>• Improvement strategies</li>
                <li>• Best practices</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-6">
              <Settings className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
              <p className="text-gray-400 text-sm mb-4">
                Manage your account preferences, privacy settings, and security options.
              </p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Password management</li>
                <li>• Privacy controls</li>
                <li>• Notification settings</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
          <p className="text-gray-300 mb-6">
            Can't find what you're looking for? Our support team is here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Contact Support
            </button>
            <button className="border border-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
