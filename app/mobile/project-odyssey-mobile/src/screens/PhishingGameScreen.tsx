import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { colors } from '../styles/colors';
import { dimensions } from '../styles/dimensions';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PhishingScenario {
  id: number;
  type: 'email' | 'sms' | 'website' | 'social';
  title: string;
  content: string;
  sender?: string;
  subject?: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
    points: number;
  }[];
  redFlags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

interface GameStats {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  streak: number;
  level: number;
}

const PHISHING_SCENARIOS: PhishingScenario[] = [
  {
    id: 1,
    type: 'email',
    title: 'Urgent Bank Security Alert',
    sender: 'security@banksafe.com',
    subject: 'URGENT: Verify Your Account Within 24 Hours',
    content: 'Dear Valued Customer,\n\nWe have detected suspicious activity on your account. Your account will be suspended in 24 hours unless you verify your identity immediately.\n\nClick here to verify: http://banksafe-verify.net/secure\n\nThank you,\nBank Security Team',
    redFlags: ['Suspicious URL', 'Urgency pressure', 'Generic greeting', 'Threatening language'],
    difficulty: 'easy',
    options: [
      {
        text: 'Click the link immediately',
        isCorrect: false,
        explanation: 'Never click suspicious links! This is a phishing attempt.',
        points: 0
      },
      {
        text: 'Call the bank directly',
        isCorrect: true,
        explanation: 'Correct! Always verify with the institution directly using official contact information.',
        points: 10
      },
      {
        text: 'Forward to friends for advice',
        isCorrect: false,
        explanation: 'This spreads the phishing attempt and puts others at risk.',
        points: 0
      },
      {
        text: 'Reply with personal information',
        isCorrect: false,
        explanation: 'Never provide personal information via email. Banks never ask for this.',
        points: 0
      }
    ]
  },
  {
    id: 2,
    type: 'sms',
    title: 'Prize Winner SMS',
    content: 'CONGRATULATIONS! You\'ve won $1000 in our monthly draw! To claim your prize, text your full name, DOB and SSN to this number. Claim expires in 2 hours! Reply STOP to opt out.',
    redFlags: ['Too good to be true', 'Urgency', 'Asking for personal info', 'Pressure tactics'],
    difficulty: 'medium',
    options: [
      {
        text: 'Reply with my information',
        isCorrect: false,
        explanation: 'This is a scam! Legitimate contests never ask for SSN via text.',
        points: 0
      },
      {
        text: 'Delete the message',
        isCorrect: true,
        explanation: 'Correct! This is clearly a scam. Delete and block the number.',
        points: 15
      },
      {
        text: 'Ask friends if it\'s real',
        isCorrect: false,
        explanation: 'While seeking advice is good, this message has clear scam indicators.',
        points: 5
      }
    ]
  },
  {
    id: 3,
    type: 'website',
    title: 'Fake Login Page',
    content: 'You receive an email asking you to update your social media password. The link takes you to a page that looks like your social media site but the URL is: socialmedia-security.net instead of the official site.',
    redFlags: ['Wrong URL', 'Suspicious domain', 'Mimicking official site'],
    difficulty: 'medium',
    options: [
      {
        text: 'Enter my credentials',
        isCorrect: false,
        explanation: 'This is a fake website designed to steal your login information!',
        points: 0
      },
      {
        text: 'Check the URL carefully',
        isCorrect: true,
        explanation: 'Excellent! Always verify the URL matches the official website.',
        points: 15
      },
      {
        text: 'Bookmark the page',
        isCorrect: false,
        explanation: 'Never bookmark suspicious sites. This could be a phishing page.',
        points: 0
      }
    ]
  },
  {
    id: 4,
    type: 'social',
    title: 'Friend in Trouble',
    content: 'You receive a message from a friend\'s social media account: "Hey! I\'m stuck abroad and lost my wallet. Can you send me $200 via wire transfer? I\'ll pay you back as soon as I get home. Please don\'t tell anyone, it\'s embarrassing."',
    redFlags: ['Request for money', 'Urgency', 'Secrecy', 'Wire transfer', 'Account might be hacked'],
    difficulty: 'hard',
    options: [
      {
        text: 'Send money immediately',
        isCorrect: false,
        explanation: 'This is likely a scammer using a hacked account!',
        points: 0
      },
      {
        text: 'Call your friend directly',
        isCorrect: true,
        explanation: 'Perfect! Always verify through a different communication method.',
        points: 20
      },
      {
        text: 'Ask for more details first',
        isCorrect: false,
        explanation: 'Good instinct, but direct verification is better. Scammers often have prepared stories.',
        points: 5
      },
      {
        text: 'Post about it publicly',
        isCorrect: false,
        explanation: 'This could embarrass your friend if it\'s real, or alert the scammer.',
        points: 0
      }
    ]
  },
  {
    id: 5,
    type: 'email',
    title: 'COVID-19 Vaccine Survey',
    content: 'From: health.survey@cdc-research.net\nSubject: Official COVID-19 Vaccine Research Survey - $100 Gift Card\n\nParticipate in our official CDC vaccine effectiveness survey and receive a $100 Amazon gift card. Click here to start: cdc-survey-official.com/start\n\nProvide your vaccine records and personal health information to help fight the pandemic.',
    redFlags: ['Fake government domain', 'Money incentive', 'Health information request', 'Suspicious URL'],
    difficulty: 'hard',
    options: [
      {
        text: 'Complete the survey',
        isCorrect: false,
        explanation: 'This impersonates a government agency and seeks sensitive health data!',
        points: 0
      },
      {
        text: 'Verify with official CDC website',
        isCorrect: true,
        explanation: 'Excellent! Government agencies use .gov domains, not .net.',
        points: 20
      },
      {
        text: 'Share with family members',
        isCorrect: false,
        explanation: 'This spreads a dangerous phishing attempt targeting health information.',
        points: 0
      }
    ]
  }
];

const PhishingGameScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  
  // Game state
  const [currentScenario, setCurrentScenario] = useState(0);
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    streak: 0,
    level: 1
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showRedFlags, setShowRedFlags] = useState(false);

  // Shuffle scenarios for variety
  const [scenarios, setScenarios] = useState<PhishingScenario[]>([]);

  useEffect(() => {
    // Shuffle scenarios when game starts
    const shuffled = [...PHISHING_SCENARIOS].sort(() => Math.random() - 0.5);
    setScenarios(shuffled);
  }, []);

  // Reset game state when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      // Reset game to initial state when user navigates back to this screen
      setGameStarted(false);
      setGameCompleted(false);
      setCurrentScenario(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowRedFlags(false);
      setGameStats({
        score: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        streak: 0,
        level: 1
      });
      
      // Shuffle scenarios again for freshness
      const shuffled = [...PHISHING_SCENARIOS].sort(() => Math.random() - 0.5);
      setScenarios(shuffled);
    }, [])
  );

  const currentScenarioData = scenarios[currentScenario];

  const startGame = useCallback(() => {
    setGameStarted(true);
    setCurrentScenario(0);
    setGameStats({
      score: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      streak: 0,
      level: 1
    });
    setGameCompleted(false);
  }, []);

  const selectAnswer = useCallback((optionIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(optionIndex);
    const option = currentScenarioData.options[optionIndex];
    
    setGameStats(prev => {
      const newCorrectAnswers = option.isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers;
      const newStreak = option.isCorrect ? prev.streak + 1 : 0;
      const newScore = prev.score + option.points + (newStreak >= 3 ? 5 : 0); // Bonus for streak
      const newLevel = Math.floor(newScore / 50) + 1;
      
      return {
        ...prev,
        totalQuestions: prev.totalQuestions + 1,
        correctAnswers: newCorrectAnswers,
        streak: newStreak,
        score: newScore,
        level: newLevel
      };
    });
    
    setShowExplanation(true);
  }, [selectedAnswer, currentScenarioData]);

  const nextScenario = useCallback(() => {
    if (currentScenario + 1 >= scenarios.length) {
      setGameCompleted(true);
    } else {
      setCurrentScenario(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowRedFlags(false);
    }
  }, [currentScenario, scenarios.length]);

  const restartGame = useCallback(() => {
    const shuffled = [...PHISHING_SCENARIOS].sort(() => Math.random() - 0.5);
    setScenarios(shuffled);
    startGame();
  }, [startGame]);

  const getScoreColor = useMemo(() => {
    const percentage = gameStats.totalQuestions > 0 ? (gameStats.correctAnswers / gameStats.totalQuestions) * 100 : 0;
    if (percentage >= 80) return '#4CAF50'; // Green
    if (percentage >= 60) return '#FF9800'; // Orange
    return '#F44336'; // Red
  }, [gameStats]);

  const getPerformanceMessage = useMemo(() => {
    const percentage = gameStats.totalQuestions > 0 ? (gameStats.correctAnswers / gameStats.totalQuestions) * 100 : 0;
    if (percentage >= 90) return 'Cybersecurity Expert! 🛡️';
    if (percentage >= 80) return 'Great Security Awareness! 🥇';
    if (percentage >= 70) return 'Good Security Instincts! 🥈';
    if (percentage >= 60) return 'Room for Improvement 🥉';
    return 'Keep Learning! 📚';
  }, [gameStats]);

  if (!gameStarted) {
    return (
      <ImageBackground source={require('../assets/home-bg.png')} style={styles.background}>
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <TouchableOpacity 
            style={[styles.backButton, { top: insets.top + 20 }]} 
            onPress={() => navigation.navigate('Home')}
          >
            <FontAwesome5 name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          
          <ScrollView 
            contentContainerStyle={[styles.introContainer, { paddingTop: insets.top + 80 }]} 
            showsVerticalScrollIndicator={false}
          >
            <Animatable.View animation="fadeInDown" style={styles.introHeader}>
              <FontAwesome5 name="shield-alt" size={60} color={colors.primary} />
              <Text style={styles.introTitle}>Phishing Defense Game</Text>
              <Text style={styles.introSubtitle}>Test your cybersecurity awareness</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={300} style={styles.instructionsCard}>
              <Text style={styles.instructionsTitle}>🎯 How to Play</Text>
              <Text style={styles.instructionsText}>
                • Read each scenario carefully{'\n'}
                • Choose the safest response{'\n'}
                • Learn from detailed explanations{'\n'}
                • Build your cybersecurity knowledge{'\n'}
                • Achieve streak bonuses for consecutive correct answers
              </Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={600} style={styles.featuresCard}>
              <Text style={styles.featuresTitle}>🛡️ What You'll Learn</Text>
              <View style={styles.featuresList}>
                <Text style={styles.featureItem}>📧 Email phishing detection</Text>
                <Text style={styles.featureItem}>📱 SMS scam identification</Text>
                <Text style={styles.featureItem}>🌐 Fake website recognition</Text>
                <Text style={styles.featureItem}>👥 Social engineering tactics</Text>
              </View>
            </Animatable.View>

            <Animatable.View animation="pulse" delay={1000} style={styles.startButtonContainer}>
              <TouchableOpacity style={styles.startButton} onPress={startGame}>
                <LinearGradient
                  colors={[colors.primary, '#c73650']}
                  style={styles.startButtonGradient}
                >
                  <FontAwesome5 name="play" size={20} color="#fff" style={{ marginRight: 10 }} />
                  <Text style={styles.startButtonText}>Start Game</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Animatable.View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    );
  }

  if (gameCompleted) {
    const percentage = (gameStats.correctAnswers / gameStats.totalQuestions) * 100;
    
    return (
      <ImageBackground source={require('../assets/home-bg.png')} style={styles.background}>
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
          style={[styles.gradient, { paddingTop: insets.top }]}
        >
          <ScrollView contentContainerStyle={styles.resultsContainer} showsVerticalScrollIndicator={false}>
            <Animatable.View animation="bounceIn" style={styles.resultsHeader}>
              <FontAwesome5 
                name={percentage >= 80 ? "trophy" : percentage >= 60 ? "medal" : "award"} 
                size={60} 
                color={getScoreColor} 
              />
              <Text style={styles.resultsTitle}>Game Complete!</Text>
              <Text style={[styles.performanceMessage, { color: getScoreColor }]}>
                {getPerformanceMessage}
              </Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={300} style={styles.statsCard}>
              <Text style={styles.statsTitle}>📊 Your Results</Text>
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{gameStats.score}</Text>
                  <Text style={styles.statLabel}>Points</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{gameStats.correctAnswers}/{gameStats.totalQuestions}</Text>
                  <Text style={styles.statLabel}>Correct</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{percentage.toFixed(0)}%</Text>
                  <Text style={styles.statLabel}>Accuracy</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{gameStats.level}</Text>
                  <Text style={styles.statLabel}>Level</Text>
                </View>
              </View>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={600} style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>🔒 Security Tips</Text>
              <Text style={styles.tipsText}>
                • Always verify sender identity through official channels{'\n'}
                • Check URLs carefully before entering credentials{'\n'}
                • Be suspicious of urgent or threatening messages{'\n'}
                • Never provide personal info via email or text{'\n'}
                • Use two-factor authentication when available
              </Text>
            </Animatable.View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.playAgainButton} onPress={restartGame}>
                <Text style={styles.playAgainText}>🔄 Play Again</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.homeText}>🏠 Back to Home</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    );
  }

  if (!currentScenarioData) {
    return null;
  }

  return (
    <ImageBackground source={require('../assets/home-bg.png')} style={styles.background}>
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
        style={[styles.gradient, { paddingTop: insets.top }]}
      >
        {/* Header with stats */}
        <View style={[styles.gameHeader, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
            <FontAwesome5 name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.statsHeader}>
            <View style={styles.statChip}>
              <Text style={styles.statChipText}>Score: {gameStats.score}</Text>
            </View>
            <View style={styles.statChip}>
              <Text style={styles.statChipText}>Level: {gameStats.level}</Text>
            </View>
            {gameStats.streak > 0 && (
              <View style={[styles.statChip, styles.streakChip]}>
                <Text style={styles.statChipText}>🔥 {gameStats.streak}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentScenario + 1} of {scenarios.length}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentScenario + 1) / scenarios.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <ScrollView style={styles.gameContent} showsVerticalScrollIndicator={false}>
          {/* Scenario */}
          <Animatable.View animation="fadeInLeft" style={styles.scenarioCard}>
            <View style={styles.scenarioHeader}>
              <FontAwesome5 
                name={
                  currentScenarioData.type === 'email' ? 'envelope' :
                  currentScenarioData.type === 'sms' ? 'sms' :
                  currentScenarioData.type === 'website' ? 'globe' : 'users'
                } 
                size={20} 
                color={colors.primary} 
              />
              <Text style={styles.scenarioType}>
                {currentScenarioData.type.toUpperCase()} SCENARIO
              </Text>
              <View style={styles.difficultyBadge}>
                <Text style={styles.difficultyText}>
                  {currentScenarioData.difficulty.toUpperCase()}
                </Text>
              </View>
            </View>
            
            <Text style={styles.scenarioTitle}>{currentScenarioData.title}</Text>
            
            {currentScenarioData.sender && (
              <Text style={styles.scenarioSender}>From: {currentScenarioData.sender}</Text>
            )}
            {currentScenarioData.subject && (
              <Text style={styles.scenarioSubject}>Subject: {currentScenarioData.subject}</Text>
            )}
            
            <Text style={styles.scenarioContent}>{currentScenarioData.content}</Text>
            
            <TouchableOpacity 
              style={styles.redFlagsButton}
              onPress={() => setShowRedFlags(!showRedFlags)}
            >
              <FontAwesome5 name="exclamation-triangle" size={16} color="#fff" />
              <Text style={styles.redFlagsButtonText}>
                {showRedFlags ? 'Hide' : 'Show'} Red Flags
              </Text>
            </TouchableOpacity>
            
            {showRedFlags && (
              <Animatable.View animation="slideInDown" style={styles.redFlagsContainer}>
                <Text style={styles.redFlagsTitle}>🚩 Red Flags to Look For:</Text>
                {currentScenarioData.redFlags.map((flag, index) => (
                  <Text key={index} style={styles.redFlagItem}>• {flag}</Text>
                ))}
              </Animatable.View>
            )}
          </Animatable.View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            <Text style={styles.questionText}>What should you do?</Text>
            {currentScenarioData.options.map((option, index) => (
              <Animatable.View
                key={index}
                animation="fadeInRight"
                delay={index * 100}
              >
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedAnswer === index && (option.isCorrect ? styles.correctOption : styles.incorrectOption),
                    selectedAnswer !== null && selectedAnswer !== index && styles.disabledOption
                  ]}
                  onPress={() => selectAnswer(index)}
                  disabled={selectedAnswer !== null}
                >
                  <Text style={styles.optionText}>{option.text}</Text>
                  {selectedAnswer === index && (
                    <FontAwesome5 
                      name={option.isCorrect ? "check-circle" : "times-circle"} 
                      size={20} 
                      color="#fff" 
                    />
                  )}
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </View>

          {/* Explanation */}
          {showExplanation && selectedAnswer !== null && (
            <Animatable.View animation="slideInUp" style={styles.explanationCard}>
              <View style={styles.explanationHeader}>
                <FontAwesome5 
                  name={currentScenarioData.options[selectedAnswer].isCorrect ? "check-circle" : "info-circle"} 
                  size={20} 
                  color={currentScenarioData.options[selectedAnswer].isCorrect ? "#4CAF50" : "#FF9800"} 
                />
                <Text style={styles.explanationTitle}>
                  {currentScenarioData.options[selectedAnswer].isCorrect ? "Correct!" : "Learn More"}
                </Text>
              </View>
              <Text style={styles.explanationText}>
                {currentScenarioData.options[selectedAnswer].explanation}
              </Text>
              <View style={styles.pointsEarned}>
                <Text style={styles.pointsText}>
                  Points earned: {currentScenarioData.options[selectedAnswer].points}
                  {gameStats.streak >= 3 && currentScenarioData.options[selectedAnswer].isCorrect && " + 5 (streak bonus)"}
                </Text>
              </View>
              <TouchableOpacity style={styles.nextButton} onPress={nextScenario}>
                <Text style={styles.nextButtonText}>
                  {currentScenario + 1 >= scenarios.length ? "View Results" : "Next Scenario"}
                </Text>
                <FontAwesome5 name="arrow-right" size={16} color="#fff" />
              </TouchableOpacity>
            </Animatable.View>
          )}
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
  },
  
  // Intro Screen Styles
  introContainer: {
    paddingHorizontal: dimensions.spacing.lg,
    paddingVertical: dimensions.spacing.xl,
    alignItems: 'center',
  },
  introHeader: {
    alignItems: 'center',
    marginBottom: dimensions.spacing.xl,
  },
  introTitle: {
    fontSize: dimensions.fontSize.xxl,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: dimensions.spacing.md,
    marginBottom: dimensions.spacing.xs,
  },
  introSubtitle: {
    fontSize: dimensions.fontSize.lg,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  instructionsCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: dimensions.spacing.lg,
    marginBottom: dimensions.spacing.lg,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  instructionsTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: dimensions.spacing.md,
  },
  instructionsText: {
    fontSize: dimensions.fontSize.md,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 24,
  },
  featuresCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: dimensions.spacing.lg,
    marginBottom: dimensions.spacing.xl,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  featuresTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: dimensions.spacing.md,
  },
  featuresList: {
    gap: dimensions.spacing.xs,
  },
  featureItem: {
    fontSize: dimensions.fontSize.md,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 24,
  },
  startButtonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  startButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: dimensions.spacing.md,
    paddingHorizontal: dimensions.spacing.xl,
  },
  startButtonText: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: '#fff',
  },

  // Game Screen Styles
  gameHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: dimensions.spacing.md,
    paddingBottom: dimensions.spacing.sm,
    backgroundColor: 'transparent',
  },
  statsHeader: {
    flexDirection: 'row',
    gap: dimensions.spacing.xs,
  },
  statChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: dimensions.spacing.sm,
    paddingVertical: dimensions.spacing.xs / 2,
    borderRadius: 12,
  },
  streakChip: {
    backgroundColor: colors.primary,
  },
  statChipText: {
    fontSize: dimensions.fontSize.sm,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressContainer: {
    paddingHorizontal: dimensions.spacing.md,
    marginBottom: dimensions.spacing.md,
  },
  progressText: {
    fontSize: dimensions.fontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: dimensions.spacing.xs,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  gameContent: {
    flex: 1,
    paddingHorizontal: dimensions.spacing.md,
  },
  scenarioCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: dimensions.spacing.lg,
    marginBottom: dimensions.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: dimensions.spacing.md,
    gap: dimensions.spacing.sm,
  },
  scenarioType: {
    fontSize: dimensions.fontSize.xs,
    fontWeight: 'bold',
    color: colors.primary,
    flex: 1,
  },
  difficultyBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: dimensions.spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: dimensions.fontSize.xs,
    fontWeight: 'bold',
    color: '#fff',
  },
  scenarioTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: dimensions.spacing.sm,
  },
  scenarioSender: {
    fontSize: dimensions.fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: dimensions.spacing.xs,
  },
  scenarioSubject: {
    fontSize: dimensions.fontSize.sm,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: dimensions.spacing.sm,
    fontWeight: '500',
  },
  scenarioContent: {
    fontSize: dimensions.fontSize.md,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    marginBottom: dimensions.spacing.md,
  },
  redFlagsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,155,0,0.2)',
    paddingVertical: dimensions.spacing.xs,
    paddingHorizontal: dimensions.spacing.sm,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: dimensions.spacing.xs,
  },
  redFlagsButtonText: {
    fontSize: dimensions.fontSize.sm,
    color: '#fff',
    fontWeight: '500',
  },
  redFlagsContainer: {
    backgroundColor: 'rgba(255,155,0,0.1)',
    padding: dimensions.spacing.md,
    borderRadius: 8,
    marginTop: dimensions.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,155,0,0.3)',
  },
  redFlagsTitle: {
    fontSize: dimensions.fontSize.md,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: dimensions.spacing.sm,
  },
  redFlagItem: {
    fontSize: dimensions.fontSize.sm,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: dimensions.spacing.xs / 2,
  },
  optionsContainer: {
    marginBottom: dimensions.spacing.lg,
  },
  questionText: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: dimensions.spacing.lg,
  },
  optionButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: dimensions.spacing.md,
    marginBottom: dimensions.spacing.sm,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  correctOption: {
    backgroundColor: 'rgba(76,175,80,0.3)',
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: 'rgba(244,67,54,0.3)',
    borderColor: '#F44336',
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: dimensions.fontSize.md,
    color: '#fff',
    flex: 1,
    lineHeight: 20,
  },
  explanationCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: dimensions.spacing.lg,
    marginBottom: dimensions.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: dimensions.spacing.md,
    gap: dimensions.spacing.sm,
  },
  explanationTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: '#fff',
  },
  explanationText: {
    fontSize: dimensions.fontSize.md,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
    marginBottom: dimensions.spacing.md,
  },
  pointsEarned: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: dimensions.spacing.sm,
    borderRadius: 8,
    marginBottom: dimensions.spacing.md,
  },
  pointsText: {
    fontSize: dimensions.fontSize.sm,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: dimensions.spacing.md,
    borderRadius: 10,
    gap: dimensions.spacing.sm,
  },
  nextButtonText: {
    fontSize: dimensions.fontSize.md,
    fontWeight: 'bold',
    color: '#fff',
  },

  // Results Screen Styles
  resultsContainer: {
    paddingHorizontal: dimensions.spacing.lg,
    paddingVertical: dimensions.spacing.xl,
    alignItems: 'center',
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: dimensions.spacing.xl,
  },
  resultsTitle: {
    fontSize: dimensions.fontSize.xxl,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: dimensions.spacing.md,
    marginBottom: dimensions.spacing.sm,
  },
  performanceMessage: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: dimensions.spacing.lg,
    marginBottom: dimensions.spacing.lg,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  statsTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: dimensions.spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: dimensions.spacing.md,
  },
  statNumber: {
    fontSize: dimensions.fontSize.xl,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: dimensions.spacing.xs / 2,
  },
  statLabel: {
    fontSize: dimensions.fontSize.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  tipsCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: dimensions.spacing.lg,
    marginBottom: dimensions.spacing.xl,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  tipsTitle: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: dimensions.spacing.md,
  },
  tipsText: {
    fontSize: dimensions.fontSize.md,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 24,
  },
  actionButtons: {
    width: '100%',
    gap: dimensions.spacing.md,
  },
  playAgainButton: {
    backgroundColor: colors.primary,
    paddingVertical: dimensions.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  playAgainText: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: '#fff',
  },
  homeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: dimensions.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  homeText: {
    fontSize: dimensions.fontSize.lg,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },

  // Legacy styles for compatibility
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#d0d0d0',
    marginTop: 10,
  },
  scenarioContainer: {
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  scenarioText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PhishingGameScreen;