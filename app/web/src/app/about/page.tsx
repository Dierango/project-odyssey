"use client";

import React from "react";
import Link from "next/link";
import { Shield, Users, Target, Award, ArrowLeft, Github, Mail, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <Link href="/" className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">About Athena</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Empowering Cybersecurity Education</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Athena is your comprehensive platform for learning cybersecurity through interactive experiences, 
            real-world simulations, and personalized guidance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-6">
            <Target className="w-10 h-10 text-indigo-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Interactive Learning</h3>
            <p className="text-gray-400">
              Engage with hands-on simulations and interactive scenarios that mirror real-world cybersecurity challenges.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-6">
            <Shield className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Digital Footprint Analysis</h3>
            <p className="text-gray-400">
              Understand your online presence and learn how to protect your digital identity across platforms.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-6">
            <Users className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">AI-Powered Chat</h3>
            <p className="text-gray-400">
              Get instant answers to your cybersecurity questions from our intelligent chatbot assistant.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-6">
            <Award className="w-10 h-10 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Phishing Defense Training</h3>
            <p className="text-gray-400">
              Practice identifying and avoiding phishing attempts through gamified training modules.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-gray-300 leading-relaxed">
            At Athena, we believe that cybersecurity education should be accessible, engaging, and practical. 
            Our platform combines cutting-edge technology with proven educational methodologies to create 
            an immersive learning experience that prepares users for real-world cybersecurity challenges.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6">
            <div className="text-3xl font-bold text-indigo-400 mb-2">10K+</div>
            <div className="text-sm text-gray-400">Users Educated</div>
          </div>
          <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
            <div className="text-sm text-gray-400">Phishing Attempts Blocked</div>
          </div>
          <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
            <div className="text-sm text-gray-400">User Satisfaction</div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6">Built with Modern Technology</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold">TS</span>
              </div>
              <div className="text-sm">TypeScript</div>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-black rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <div className="text-sm">Next.js</div>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-cyan-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold">TW</span>
              </div>
              <div className="text-sm">Tailwind CSS</div>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold">API</span>
              </div>
              <div className="text-sm">FastAPI</div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
          <div className="flex justify-center space-x-8">
            <a href="mailto:contact@athena-cyber.com" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>
            <a href="https://github.com/athena-cyber" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a href="https://athena-cyber.com" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
              <Globe className="w-5 h-5" />
              <span>Website</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm py-8">
          <p>&copy; 2024 Athena Cybersecurity Platform. All rights reserved.</p>
          <p className="mt-2">Making cybersecurity education accessible to everyone.</p>
        </div>
      </div>
    </div>
  );
}
