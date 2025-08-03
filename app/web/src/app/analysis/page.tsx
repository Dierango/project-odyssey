"use client";

import React, { useState } from 'react';
import { 
  Shield, 
  Mail, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Globe, 
  Eye,
  Lock,
  ShieldCheck,
  Wifi,
  EyeOff,
  Smartphone,
  Search,
  ArrowLeft
} from 'lucide-react';

interface DigitalFootprintResult {
  privacyScore: number;
  breaches: BreachData[];
  socialMediaPresence: SocialMediaCheck[];
  emailAnalysis: EmailAnalysis;
  webPresence: WebPresenceCheck[];
  recommendations: string[];
}

interface BreachData {
  source: string;
  year: number;
  dataTypes: string[];
}

interface SocialMediaCheck {
  platform: string;
  found: boolean;
  isPublic: boolean;
}

interface EmailAnalysis {
  domain: string;
  isCommonDomain: boolean;
  riskLevel: 'Low' | 'Medium' | 'High';
}

interface WebPresenceCheck {
  source: string;
  description: string;
}

const privacyTips = [
  {
    icon: Lock,
    title: 'Strong Passwords',
    preview: 'Use unique passwords for each account',
    description: 'Create strong, unique passwords for every account. Use a combination of uppercase and lowercase letters, numbers, and symbols. Consider using a password manager to generate and store secure passwords.'
  },
  {
    icon: ShieldCheck,
    title: '2FA Security',
    preview: 'Enable two-factor authentication',
    description: 'Two-factor authentication adds an extra layer of security to your accounts. Even if someone gets your password, they would still need access to your phone or email to log in.'
  },
  {
    icon: Eye,
    title: 'Privacy Settings',
    preview: 'Review social media privacy',
    description: 'Regularly review and update your privacy settings on social media platforms. Limit who can see your posts, personal information, and friend lists. Be cautious about what you share publicly.'
  },
  {
    icon: Wifi,
    title: 'Public WiFi',
    preview: 'Avoid sensitive activities on public networks',
    description: 'Avoid accessing sensitive information or making online purchases when connected to public WiFi. Use a VPN for additional protection when using public networks.'
  },
  {
    icon: EyeOff,
    title: 'Browsing Privacy',
    preview: 'Use private browsing modes',
    description: 'Use incognito or private browsing mode when accessing sensitive websites. Clear your browser cookies and history regularly. Consider using privacy-focused browsers.'
  },
  {
    icon: Smartphone,
    title: 'App Permissions',
    preview: 'Review app access permissions',
    description: 'Regularly review the permissions you have granted to apps on your devices. Revoke access for apps that no longer need certain permissions or that you no longer use.'
  }
];

// Mock analysis function that returns realistic data
const analyzeDigitalFootprint = async (email: string): Promise<DigitalFootprintResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    privacyScore: Math.floor(Math.random() * 40) + 60, // 60-100
    breaches: [
      { source: 'LinkedIn', year: 2021, dataTypes: ['Email', 'Password'] },
      { source: 'Adobe', year: 2019, dataTypes: ['Email', 'Username'] }
    ],
    socialMediaPresence: [
      { platform: 'Facebook', found: true, isPublic: false },
      { platform: 'LinkedIn', found: true, isPublic: true },
      { platform: 'Twitter', found: false, isPublic: false },
      { platform: 'Instagram', found: true, isPublic: false }
    ],
    emailAnalysis: {
      domain: email.split('@')[1],
      isCommonDomain: ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'].includes(email.split('@')[1]),
      riskLevel: 'Low'
    },
    webPresence: [
      { source: 'Google Search', description: 'Professional profile found' },
      { source: 'Social Networks', description: 'Multiple social media accounts detected' }
    ],
    recommendations: [
      'Enable two-factor authentication on all accounts',
      'Review and update privacy settings on social media',
      'Use a password manager for unique passwords',
      'Regularly monitor your accounts for suspicious activity',
      'Consider using a VPN for enhanced privacy'
    ]
  };
};

export default function DigitalFootprintAnalysis() {
  const [email, setEmail] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedTip, setSelectedTip] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<DigitalFootprintResult | null>(null);

  const handleAnalyze = async () => {
    if (!email.trim()) {
      alert('Please enter your email address');
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const result = await analyzeDigitalFootprint(email);
      setAnalysisResult(result);
      setShowResults(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const resetAnalysis = () => {
    setShowResults(false);
    setEmail('');
    setAnalysisResult(null);
  };

  if (showResults && analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={resetAnalysis}
            className="flex items-center gap-2 mb-6 text-white hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Analysis
          </button>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Digital Footprint Analysis</h1>
              <p className="text-gray-300">{email}</p>
            </div>

            {/* Privacy Score */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Shield className={`w-6 h-6 ${getScoreColor(analysisResult.privacyScore)}`} />
                <h2 className="text-xl font-semibold">Privacy Score</h2>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className={`text-3xl font-bold ${getScoreColor(analysisResult.privacyScore)}`}>
                  {analysisResult.privacyScore}/100
                </span>
                <div className="flex-1 bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${getScoreBgColor(analysisResult.privacyScore)}`}
                    style={{ width: `${analysisResult.privacyScore}%` }}
                  />
                </div>
              </div>
              <p className="text-gray-300">
                {analysisResult.privacyScore >= 80 
                  ? 'Excellent privacy protection!' 
                  : analysisResult.privacyScore >= 60 
                  ? 'Good privacy, room for improvement' 
                  : 'Privacy needs attention'}
              </p>
            </div>

            {/* Email Analysis */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-red-400" />
                <h2 className="text-xl font-semibold">Email Analysis</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Domain:</span>
                  <span className="text-blue-300">{analysisResult.emailAnalysis.domain}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Type:</span>
                  <span>{analysisResult.emailAnalysis.isCommonDomain ? 'Popular Provider' : 'Custom Domain'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Risk Level:</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    analysisResult.emailAnalysis.riskLevel === 'Low' ? 'bg-green-600' :
                    analysisResult.emailAnalysis.riskLevel === 'Medium' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    {analysisResult.emailAnalysis.riskLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Media Presence */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold">Social Media Presence</h2>
              </div>
              <div className="space-y-3">
                {analysisResult.socialMediaPresence.map((platform) => (
                  <div key={platform.platform} className="flex justify-between items-center">
                    <span>{platform.platform}</span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      platform.found 
                        ? (platform.isPublic ? 'bg-yellow-600' : 'bg-green-600') 
                        : 'bg-gray-600'
                    }`}>
                      {platform.found 
                        ? (platform.isPublic ? 'Public' : 'Private') 
                        : 'Not Found'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Breach History */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-semibold">Data Breach History</h2>
              </div>
              <div className="space-y-2">
                {analysisResult.breaches.length > 0 ? (
                  analysisResult.breaches.map((breach, index) => (
                    <p key={index} className="text-red-300">
                      • {breach.source} ({breach.year}) - {breach.dataTypes.join(', ')}
                    </p>
                  ))
                ) : (
                  <p className="text-green-300">• No breaches detected - Great news!</p>
                )}
              </div>
            </div>

            {/* Web Presence */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold">Web Presence</h2>
              </div>
              <div className="space-y-3">
                {analysisResult.webPresence.length > 0 ? (
                  analysisResult.webPresence.map((presence, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Search className="w-4 h-4 text-purple-400 mt-1" />
                      <div>
                        <p className="font-medium">{presence.source}</p>
                        <p className="text-gray-300 text-sm">{presence.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-300">• Limited web presence detected</p>
                )}
              </div>
            </div>

            {/* Security Recommendations */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-semibold">Security Recommendations</h2>
              </div>
              <div className="space-y-2">
                {analysisResult.recommendations.map((recommendation, index) => (
                  <p key={index} className="text-green-300">✓ {recommendation}</p>
                ))}
              </div>
            </div>

            {/* Privacy Tips */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-indigo-400" />
                <h2 className="text-xl font-semibold">Privacy Tips</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {privacyTips.map((tip, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-600 rounded-lg p-4 cursor-pointer hover:bg-gray-700/50 transition-colors"
                    onClick={() => setSelectedTip(tip)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <tip.icon className="w-5 h-5 text-indigo-400" />
                      <h3 className="font-medium">{tip.title}</h3>
                    </div>
                    <p className="text-gray-300 text-sm">{tip.preview}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Privacy Tips */}
        {selectedTip && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <selectedTip.icon className="w-6 h-6 text-indigo-400" />
                <h3 className="text-xl font-semibold">{selectedTip.title}</h3>
              </div>
              <p className="text-gray-300 mb-6">{selectedTip.description}</p>
              <button 
                onClick={() => setSelectedTip(null)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-lg py-2 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Shield className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Digital Footprint Analysis</h1>
          <p className="text-gray-300 mb-8">
            Discover what information about you is available online and get personalized privacy recommendations.
          </p>

          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-gray-700">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email to analyze"
                className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isAnalyzing}
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !email.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg py-3 font-semibold transition-colors"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Digital Footprint'}
            </button>
          </div>

          {/* Privacy Tips Preview */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Privacy Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {privacyTips.slice(0, 3).map((tip, index) => (
                <div key={index} className="bg-gray-800/30 rounded-lg p-4">
                  <tip.icon className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                  <h3 className="font-medium mb-2">{tip.title}</h3>
                  <p className="text-gray-300 text-sm">{tip.preview}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
