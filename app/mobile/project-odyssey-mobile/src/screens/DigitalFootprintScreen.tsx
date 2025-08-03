import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
  Modal,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import DigitalFootprintService, { DigitalFootprintResult, BreachData, SocialMediaCheck, WebPresenceCheck, EmailAnalysis } from '../services/digitalFootprintService';

const privacyTips = [
  {
    icon: 'lock',
    title: 'Strong Passwords',
    preview: 'Use unique passwords for each account',
    description: 'Create strong, unique passwords for every account. Use a combination of uppercase and lowercase letters, numbers, and symbols. Consider using a password manager to generate and store secure passwords.'
  },
  {
    icon: 'shield-alt',
    title: '2FA Security',
    preview: 'Enable two-factor authentication',
    description: 'Two-factor authentication adds an extra layer of security to your accounts. Even if someone gets your password, they would still need access to your phone or email to log in.'
  },
  {
    icon: 'user-secret',
    title: 'Privacy Settings',
    preview: 'Review social media privacy',
    description: 'Regularly review and update your privacy settings on social media platforms. Limit who can see your posts, personal information, and friend lists. Be cautious about what you share publicly.'
  },
  {
    icon: 'wifi',
    title: 'Public WiFi',
    preview: 'Avoid sensitive activities on public networks',
    description: 'Avoid accessing sensitive information or making online purchases when connected to public WiFi. Use a VPN for additional protection when using public networks.'
  },
  {
    icon: 'eye-slash',
    title: 'Browsing Privacy',
    preview: 'Use private browsing modes',
    description: 'Use incognito or private browsing mode when accessing sensitive websites. Clear your browser cookies and history regularly. Consider using privacy-focused browsers.'
  },
  {
    icon: 'mobile-alt',
    title: 'App Permissions',
    preview: 'Review app access permissions',
    description: 'Regularly review the permissions you have granted to apps on your devices. Revoke access for apps that no longer need certain permissions or that you no longer use.'
  }
];

const DigitalFootprintScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedTip, setSelectedTip] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<DigitalFootprintResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeDigitalFootprint = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Real API analysis
      const result = await DigitalFootprintService.analyzeDigitalFootprint(email);
      setAnalysisResult(result);
      setShowResults(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      setError('Analysis failed. Please try again.');
      Alert.alert('Error', 'Failed to analyze digital footprint. Please check your internet connection and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  };

  const resetAnalysis = () => {
    setShowResults(false);
    setEmail('');
    setAnalysisResult(null);
    setError(null);
  };

  if (showResults && analysisResult) {
    return (
      <ImageBackground
        source={require('../assets/home-bg.png')}
        style={styles.background}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
          style={[styles.gradient, { paddingBottom: insets.bottom }]}
        >
          <TouchableOpacity 
            style={[styles.backButton, { top: insets.top + 20 }]} 
            onPress={() => navigation.goBack()}
          >
            <FontAwesome5 name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>

          <ScrollView 
            style={[styles.resultsContainer, { paddingTop: insets.top + 70 }]}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Digital Footprint Analysis</Text>
              <Text style={styles.emailText}>{email}</Text>
            </View>

            {/* Privacy Score */}
            <View style={styles.scoreCard}>
              <View style={styles.scoreHeader}>
                <MaterialIcons name="security" size={24} color={getScoreColor(analysisResult.privacyScore)} />
                <Text style={styles.cardTitle}>Privacy Score</Text>
              </View>
              <View style={styles.scoreContainer}>
                <Text style={[styles.scoreText, { color: getScoreColor(analysisResult.privacyScore) }]}>
                  {analysisResult.privacyScore}/100
                </Text>
                <View style={styles.scoreBar}>
                  <View 
                    style={[
                      styles.scoreProgress, 
                      { 
                        width: `${analysisResult.privacyScore}%`,
                        backgroundColor: getScoreColor(analysisResult.privacyScore) 
                      }
                    ]} 
                  />
                </View>
              </View>
              <Text style={styles.scoreDescription}>
                {analysisResult.privacyScore >= 80 
                  ? 'Excellent privacy protection!' 
                  : analysisResult.privacyScore >= 60 
                  ? 'Good privacy, room for improvement' 
                  : 'Privacy needs attention'}
              </Text>
            </View>

            {/* Email Analysis */}
            <View style={styles.analysisCard}>
              <View style={styles.cardHeader}>
                <FontAwesome5 name="envelope" size={20} color="#e94560" />
                <Text style={styles.cardTitle}>Email Analysis</Text>
              </View>
              <View style={styles.analysisResult}>
                <View style={[styles.statusBadge, { 
                  backgroundColor: analysisResult.breaches.length === 0 ? '#4CAF50' : '#F44336' 
                }]}>
                  <Text style={styles.statusText}>
                    {analysisResult.breaches.length === 0 
                      ? 'No breaches found' 
                      : `${analysisResult.breaches.length} breach${analysisResult.breaches.length > 1 ? 'es' : ''} found`}
                  </Text>
                </View>
                <Text style={styles.resultDetails}>
                  Last checked: {new Date().toLocaleDateString()}
                </Text>
              </View>
            </View>

            {/* Social Media Presence */}
            <View style={styles.analysisCard}>
              <View style={styles.cardHeader}>
                <FontAwesome5 name="users" size={20} color="#1DA1F2" />
                <Text style={styles.cardTitle}>Social Media Presence</Text>
              </View>
              <View style={styles.socialMediaList}>
                {analysisResult.socialMediaPresence.map((platform) => (
                  <View key={platform.platform} style={styles.platformRow}>
                    <Text style={styles.platformName}>{platform.platform}</Text>
                    <View style={[
                      styles.platformStatus, 
                      { backgroundColor: platform.found 
                          ? (platform.isPublic ? '#FF9800' : '#4CAF50') 
                          : '#666' 
                      }
                    ]}>
                      <Text style={styles.platformStatusText}>
                        {platform.found 
                          ? (platform.isPublic ? 'Public' : 'Private') 
                          : 'Not Found'}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Data Breach Checker */}
            <View style={styles.analysisCard}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="warning" size={20} color="#FF9800" />
                <Text style={styles.cardTitle}>Data Breach History</Text>
              </View>
              <View style={styles.breachList}>
                {analysisResult.breaches.length > 0 ? (
                  analysisResult.breaches.map((breach, index) => (
                    <Text key={index} style={styles.breachText}>
                      • {breach.source} ({breach.year}) - {breach.dataTypes.join(', ')}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.noBreachText}>• No breaches detected - Great news!</Text>
                )}
              </View>
            </View>

            {/* Security Recommendations */}
            <View style={styles.analysisCard}>
              <View style={styles.cardHeader}>
                <FontAwesome5 name="shield-alt" size={20} color="#4CAF50" />
                <Text style={styles.cardTitle}>Security Recommendations</Text>
              </View>
              <View style={styles.recommendationsList}>
                {analysisResult.recommendations.map((recommendation, index) => (
                  <Text key={index} style={styles.recommendation}>✓ {recommendation}</Text>
                ))}
              </View>
            </View>

            {/* Email Analysis */}
            <View style={styles.analysisCard}>
              <View style={styles.cardHeader}>
                <MaterialIcons name="email" size={20} color="#2196F3" />
                <Text style={styles.cardTitle}>Email Analysis</Text>
              </View>
              <View style={styles.emailAnalysisContent}>
                <View style={styles.emailDetailRow}>
                  <Text style={styles.emailLabel}>Domain:</Text>
                  <Text style={styles.emailValue}>{analysisResult.emailAnalysis.domain}</Text>
                </View>
                <View style={styles.emailDetailRow}>
                  <Text style={styles.emailLabel}>Type:</Text>
                  <Text style={styles.emailValue}>
                    {analysisResult.emailAnalysis.isCommonDomain ? 'Popular Provider' : 'Custom Domain'}
                  </Text>
                </View>
                <View style={styles.emailDetailRow}>
                  <Text style={styles.emailLabel}>Risk Level:</Text>
                  <View style={[
                    styles.riskBadge, 
                    { backgroundColor: 
                      analysisResult.emailAnalysis.riskLevel === 'Low' ? '#4CAF50' :
                      analysisResult.emailAnalysis.riskLevel === 'Medium' ? '#FF9800' : '#F44336'
                    }
                  ]}>
                    <Text style={styles.riskText}>{analysisResult.emailAnalysis.riskLevel}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Web Presence */}
            <View style={styles.analysisCard}>
              <View style={styles.cardHeader}>
                <FontAwesome5 name="globe" size={20} color="#9C27B0" />
                <Text style={styles.cardTitle}>Web Presence</Text>
              </View>
              <View style={styles.webPresenceList}>
                {analysisResult.webPresence.length > 0 ? (
                  analysisResult.webPresence.map((presence, index) => (
                    <View key={index} style={styles.presenceRow}>
                      <View style={styles.presenceIcon}>
                        <FontAwesome5 name="search" size={12} color="#9C27B0" />
                      </View>
                      <View style={styles.presenceContent}>
                        <Text style={styles.presenceSource}>{presence.source}</Text>
                        <Text style={styles.presenceDescription}>{presence.description}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noPresenceText}>• Limited web presence detected</Text>
                )}
              </View>
            </View>

            {/* Privacy Tips */}
            <View style={styles.analysisCard}>
              <View style={styles.cardHeader}>
                <Ionicons name="bulb" size={20} color="#FFD700" />
                <Text style={styles.cardTitle}>Privacy Tips</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tipsContainer}>
                {privacyTips.map((tip, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.tipCard}
                    onPress={() => setSelectedTip(tip)}
                  >
                    <FontAwesome5 name={tip.icon} size={24} color="#e94560" />
                    <Text style={styles.tipTitle}>{tip.title}</Text>
                    <Text style={styles.tipPreview}>{tip.preview}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.newAnalysisContainer}>
              <TouchableOpacity style={styles.newAnalysisButton} onPress={resetAnalysis}>
                <FontAwesome5 name="refresh" size={16} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.newAnalysisText}>New Analysis</Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 80 }} />
          </ScrollView>

          {/* Tip Modal */}
          <Modal
            visible={selectedTip !== null}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setSelectedTip(null)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity 
                  style={styles.modalClose}
                  onPress={() => setSelectedTip(null)}
                >
                  <FontAwesome5 name="times" size={20} color="#999" />
                </TouchableOpacity>
                {selectedTip && (
                  <>
                    <FontAwesome5 name={selectedTip.icon} size={32} color="#e94560" />
                    <Text style={styles.modalTitle}>{selectedTip.title}</Text>
                    <Text style={styles.modalDescription}>{selectedTip.description}</Text>
                  </>
                )}
              </View>
            </View>
          </Modal>
        </LinearGradient>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/home-bg.png')}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']}
        style={[styles.gradient, { paddingBottom: insets.bottom }]}
      >
        <TouchableOpacity 
          style={[styles.backButton, { top: insets.top + 20 }]} 
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={[styles.header, { paddingTop: insets.top }]}>
          <FontAwesome5 name="user-shield" size={48} color="#e94560" style={styles.headerIcon} />
          <Text style={styles.title}>Digital Footprint</Text>
          <Text style={styles.subtitle}>Analyze your online presence and privacy</Text>
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome5 name="envelope" size={20} color="#a0a0a0" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#a0a0a0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, isAnalyzing && styles.buttonDisabled]} 
          onPress={analyzeDigitalFootprint}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.buttonText}>Analyzing...</Text>
            </View>
          ) : (
            <>
              <FontAwesome5 name="search" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Analyze Digital Footprint</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What we analyze:</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <FontAwesome5 name="shield-alt" size={16} color="#4CAF50" />
              <Text style={styles.featureText}>Data breach history</Text>
            </View>
            <View style={styles.featureItem}>
              <FontAwesome5 name="users" size={16} color="#1DA1F2" />
              <Text style={styles.featureText}>Social media exposure</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="security" size={16} color="#FF9800" />
              <Text style={styles.featureText}>Privacy score</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="bulb" size={16} color="#FFD700" />
              <Text style={styles.featureText}>Security recommendations</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  headerIcon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#d0d0d0',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '80%',
    position: 'relative',
    marginBottom: 20,
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 1,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    paddingHorizontal: 50,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  featuresContainer: {
    width: '80%',
    alignItems: 'center',
  },
  featuresTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  featuresList: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  featureText: {
    color: '#d0d0d0',
    fontSize: 14,
    marginLeft: 10,
  },
  // Results Screen Styles
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 16,
    color: '#d0d0d0',
    marginTop: 5,
  },
  scoreCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scoreBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreProgress: {
    height: '100%',
    borderRadius: 4,
  },
  scoreDescription: {
    fontSize: 14,
    color: '#d0d0d0',
    textAlign: 'center',
  },
  analysisCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  analysisResult: {
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultDetails: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  socialMediaList: {
    marginTop: 10,
  },
  platformRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  platformName: {
    color: '#fff',
    fontSize: 16,
  },
  platformStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  platformStatusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  breachList: {
    marginTop: 10,
  },
  breachText: {
    color: '#F44336',
    fontSize: 14,
    marginBottom: 5,
  },
  noBreachText: {
    color: '#4CAF50',
    fontSize: 14,
    marginBottom: 5,
  },
  recommendationsList: {
    marginTop: 10,
  },
  recommendation: {
    color: '#d0d0d0',
    fontSize: 14,
    marginBottom: 8,
    paddingLeft: 5,
  },
  tipsContainer: {
    marginTop: 10,
  },
  tipCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: 160,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  tipTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  tipPreview: {
    color: '#a0a0a0',
    fontSize: 12,
    textAlign: 'center',
  },
  newAnalysisContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  newAnalysisButton: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    minWidth: 200,
  },
  newAnalysisText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'rgba(26,26,46,0.95)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    maxWidth: 350,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  modalClose: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#d0d0d0',
    textAlign: 'center',
    lineHeight: 20,
  },
  // Email Analysis Styles
  emailAnalysisContent: {
    marginTop: 10,
  },
  emailDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  emailLabel: {
    color: '#d0d0d0',
    fontSize: 14,
    fontWeight: '500',
  },
  emailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  riskText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Web Presence Styles
  webPresenceList: {
    marginTop: 10,
  },
  presenceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  presenceIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(156,39,176,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  presenceContent: {
    flex: 1,
  },
  presenceSource: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  presenceDescription: {
    color: '#a0a0a0',
    fontSize: 12,
    lineHeight: 16,
  },
  noPresenceText: {
    color: '#4CAF50',
    fontSize: 14,
    marginBottom: 5,
  },
});

export default DigitalFootprintScreen;