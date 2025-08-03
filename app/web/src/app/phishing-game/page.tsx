"use client";
import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle, RotateCcw, Award, Target, Brain } from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  description: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Phishing Email Detection",
    description: "You receive an email claiming to be from your bank saying your account will be suspended unless you click a link to verify your information immediately.",
    question: "What should you do?",
    options: [
      "Click the link immediately to avoid account suspension",
      "Check the sender's email address and call the bank directly to verify",
      "Forward the email to friends to warn them",
      "Reply with your banking information to confirm"
    ],
    correctAnswerIndex: 1,
    feedback: {
      correct: "Excellent! Always verify suspicious emails by contacting the organization directly through official channels.",
      incorrect: "This could be a phishing attempt. Banks never ask for sensitive information via email or require immediate action through links."
    }
  },
  {
    id: 2,
    title: "Social Engineering Attack",
    description: "A caller claims to be from IT support and asks for your password to 'update security systems' while you're working from home.",
    question: "How should you respond?",
    options: [
      "Give them the password since they're from IT",
      "Ask for their employee ID and verify with your IT department",
      "Ask them to call back later",
      "Change your password and give them the new one"
    ],
    correctAnswerIndex: 1,
    feedback: {
      correct: "Perfect! Always verify the identity of anyone requesting sensitive information through official channels.",
      incorrect: "Legitimate IT departments never ask for passwords over the phone. This is a common social engineering tactic."
    }
  },
  {
    id: 3,
    title: "Suspicious Link Analysis",
    description: "You receive a text message with a link claiming you've won a prize from a contest you don't remember entering.",
    question: "What's the safest action?",
    options: [
      "Click the link to see what you've won",
      "Delete the message without clicking anything",
      "Forward it to friends to share the good news",
      "Reply asking for more details"
    ],
    correctAnswerIndex: 1,
    feedback: {
      correct: "Smart choice! Unknown prize notifications are common phishing tactics. When in doubt, delete.",
      incorrect: "This is likely a scam. Prize notifications from unknown contests are red flags for phishing attempts."
    }
  },
  {
    id: 4,
    title: "Password Security",
    description: "You need to create a password for a new online account that stores sensitive personal information.",
    question: "Which password is most secure?",
    options: [
      "password123",
      "MyName2024!",
      "Tr@il#Blu3$Sky89",
      "123456789"
    ],
    correctAnswerIndex: 2,
    feedback: {
      correct: "Excellent! This password uses a mix of uppercase, lowercase, numbers, and symbols while being sufficiently long.",
      incorrect: "Strong passwords should be long and include uppercase letters, lowercase letters, numbers, and special characters."
    }
  },
  {
    id: 5,
    title: "Public WiFi Security",
    description: "You're at a coffee shop and need to check your bank account. There are several WiFi networks available including 'Free_WiFi_Here'.",
    question: "What's the safest approach?",
    options: [
      "Connect to 'Free_WiFi_Here' and check your account",
      "Use your mobile data instead of public WiFi",
      "Ask other customers which WiFi they're using",
      "Connect to any network and use incognito mode"
    ],
    correctAnswerIndex: 1,
    feedback: {
      correct: "Perfect! Mobile data is much safer for sensitive activities than public WiFi networks.",
      incorrect: "Public WiFi networks, especially open ones, are risky for sensitive activities like banking. Always use secure connections."
    }
  }
];

export default function PhishingGamePage() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    const newAnswers = [...userAnswers];
    newAnswers[currentScenario] = answerIndex;
    setUserAnswers(newAnswers);
    
    if (answerIndex === scenarios[currentScenario].correctAnswerIndex) {
      setScore(score + 1);
    }
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setGameComplete(false);
    setUserAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / scenarios.length) * 100;
    if (percentage === 100) return "Perfect! You're a cybersecurity expert! 🎉";
    if (percentage >= 80) return "Excellent! You have strong security awareness! 👏";
    if (percentage >= 60) return "Good job! You're on the right track! 👍";
    if (percentage >= 40) return "Not bad, but there's room for improvement! 📚";
    return "Keep learning! Cybersecurity awareness is crucial! 💪";
  };

  const getScoreColor = () => {
    const percentage = (score / scenarios.length) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Game Complete!</h1>
            <p className="text-gray-300">Here's how you performed:</p>
          </div>

          {/* Score Summary */}
          <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-8 mb-8 text-center">
            <div className={`text-6xl font-bold mb-4 ${getScoreColor()}`}>
              {score}/{scenarios.length}
            </div>
            <div className="text-xl text-white mb-2">{getScoreMessage()}</div>
            <div className="text-gray-400">
              {Math.round((score / scenarios.length) * 100)}% Correct
            </div>
          </div>

          {/* Results Breakdown */}
          <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Detailed Results</h2>
            <div className="space-y-4">
              {scenarios.map((scenario, index) => {
                const userAnswer = userAnswers[index];
                const isCorrect = userAnswer === scenario.correctAnswerIndex;
                
                return (
                  <div key={scenario.id} className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-start space-x-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-400 mt-0.5" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-400 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">{scenario.title}</h3>
                        <div className="text-sm text-gray-300 mb-2">
                          Your answer: {scenario.options[userAnswer]}
                        </div>
                        {!isCorrect && (
                          <div className="text-sm text-green-300">
                            Correct answer: {scenario.options[scenario.correctAnswerIndex]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetGame}
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Play Again</span>
            </button>
            <button
              onClick={() => window.location.href = '/chatbot'}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <Brain className="w-5 h-5" />
              <span>Chat with Athena</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const scenario = scenarios[currentScenario];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-indigo-400" />
            <h1 className="text-3xl font-bold text-white">Phishing Simulation Game</h1>
          </div>
          <p className="text-gray-300">Test your cybersecurity knowledge with interactive scenarios</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentScenario + 1} of {scenarios.length}</span>
            <span>Score: {score}/{scenarios.length}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentScenario + 1) / scenarios.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Scenario Card */}
        <div className="bg-gray-800/50 border border-gray-700/30 rounded-xl p-8 mb-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">{scenario.title}</h2>
              <p className="text-gray-300 leading-relaxed">{scenario.description}</p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">{scenario.question}</h3>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {scenario.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 rounded-lg transition-all duration-200";
              
              if (showFeedback) {
                if (index === scenario.correctAnswerIndex) {
                  buttonClass = "w-full p-4 text-left bg-green-900/50 border border-green-600 rounded-lg";
                } else if (index === selectedAnswer && index !== scenario.correctAnswerIndex) {
                  buttonClass = "w-full p-4 text-left bg-red-900/50 border border-red-600 rounded-lg";
                } else {
                  buttonClass = "w-full p-4 text-left bg-gray-700/30 border border-gray-600 rounded-lg opacity-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={buttonClass}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-white">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-4 rounded-lg mb-6 ${selectedAnswer === scenario.correctAnswerIndex 
              ? 'bg-green-900/30 border border-green-700' 
              : 'bg-red-900/30 border border-red-700'
            }`}>
              <div className="flex items-start space-x-3">
                {selectedAnswer === scenario.correctAnswerIndex ? (
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400 mt-0.5" />
                )}
                <div>
                  <div className={`font-semibold mb-2 ${selectedAnswer === scenario.correctAnswerIndex ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedAnswer === scenario.correctAnswerIndex ? 'Correct!' : 'Incorrect'}
                  </div>
                  <p className="text-sm text-gray-200">
                    {selectedAnswer === scenario.correctAnswerIndex 
                      ? scenario.feedback.correct 
                      : scenario.feedback.incorrect
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showFeedback && (
            <div className="text-center">
              <button
                onClick={nextScenario}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-semibold"
              >
                {currentScenario < scenarios.length - 1 ? 'Next Question' : 'View Results'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
