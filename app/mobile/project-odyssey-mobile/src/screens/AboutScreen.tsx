import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Linking,
  StatusBar,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const AboutScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();

  const features = [
    {
      icon: 'robot',
      title: 'AI Cyber Assistant',
      description: 'Get personalized cybersecurity advice and guidance from our AI companion.'
    },
    {
      icon: 'gamepad',
      title: 'Phishing Game',
      description: 'Learn to identify phishing attempts through interactive scenarios and challenges.'
    },
    {
      icon: 'user-secret',
      title: 'Digital Footprint Analysis',
      description: 'Discover your online presence and get recommendations to improve your privacy.'
    },
    {
      icon: 'shield-alt',
      title: 'Security Scoring',
      description: 'Track your cybersecurity posture with our comprehensive scoring system.'
    }
  ];

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const FeatureCard = ({ icon, title, description }: {
    icon: string;
    title: string;
    description: string;
  }) => (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>
        <FontAwesome5 name={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ImageBackground
        source={require('../assets/home-bg.png')}
        style={styles.background}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
          style={[styles.gradient, { paddingBottom: insets.bottom }]}
        >
          {/* Header */}
          <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
            >
              <FontAwesome5 name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>About Athena</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* App Logo and Info */}
            <View style={styles.appInfoCard}>
              <View style={styles.logoContainer}>
                <Image 
                  source={require('../assets/logo.png')} 
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.appName}>Athena</Text>
              <Text style={styles.appTagline}>Your Personal AI Cybersecurity Companion</Text>
              <Text style={styles.versionInfo}>Version 1.0.0 • Build 100</Text>
            </View>

            {/* Mission Statement */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Our Mission</Text>
              <View style={styles.missionCard}>
                <Text style={styles.missionText}>
                  At Athena, we believe cybersecurity education should be accessible, engaging, and actionable. 
                  Our mission is to empower individuals with the knowledge and tools they need to stay safe 
                  in the digital world through interactive learning and personalized guidance.
                </Text>
              </View>
            </View>

            {/* Features */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Key Features</Text>
              <View style={styles.featuresContainer}>
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </View>
            </View>

            {/* Privacy & Security */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Privacy & Security</Text>
              <View style={styles.privacyCard}>
                <View style={styles.privacyItem}>
                  <FontAwesome5 name="shield-alt" size={20} color={colors.primary} />
                  <Text style={styles.privacyText}>Your data is never stored on our servers</Text>
                </View>
                <View style={styles.privacyItem}>
                  <FontAwesome5 name="lock" size={20} color={colors.primary} />
                  <Text style={styles.privacyText}>All analysis is performed locally when possible</Text>
                </View>
                <View style={styles.privacyItem}>
                  <FontAwesome5 name="eye-slash" size={20} color={colors.primary} />
                  <Text style={styles.privacyText}>No tracking or personal data collection</Text>
                </View>
              </View>
            </View>

            {/* Legal Links */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Legal</Text>
              <View style={styles.legalContainer}>
                <TouchableOpacity 
                  style={styles.legalItem}
                  onPress={() => openLink('https://athena-security.com/privacy')}
                >
                  <Text style={styles.legalText}>Privacy Policy</Text>
                  <FontAwesome5 name="external-link-alt" size={14} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.legalItem}
                  onPress={() => openLink('https://athena-security.com/terms')}
                >
                  <Text style={styles.legalText}>Terms of Service</Text>
                  <FontAwesome5 name="external-link-alt" size={14} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.legalItem}
                  onPress={() => openLink('https://athena-security.com/licenses')}
                >
                  <Text style={styles.legalText}>Open Source Licenses</Text>
                  <FontAwesome5 name="external-link-alt" size={14} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Contact */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Get in Touch</Text>
              <View style={styles.contactCard}>
                <TouchableOpacity 
                  style={styles.contactItem}
                  onPress={() => openLink('mailto:hello@athena-security.com')}
                >
                  <FontAwesome5 name="envelope" size={20} color={colors.primary} />
                  <Text style={styles.contactText}>hello@athena-security.com</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.contactItem}
                  onPress={() => openLink('https://athena-security.com')}
                >
                  <FontAwesome5 name="globe" size={20} color={colors.primary} />
                  <Text style={styles.contactText}>athena-security.com</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Copyright */}
            <View style={styles.copyrightContainer}>
              <Text style={styles.copyrightText}>© 2025 Athena Security</Text>
              <Text style={styles.copyrightSubtext}>Made with ❤️ for digital safety</Text>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appInfoCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 50,
    height: 50,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  versionInfo: {
    fontSize: 14,
    color: '#999',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  missionCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 20,
  },
  missionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
  },
  featuresContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  featureCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  privacyCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 20,
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  privacyText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  legalContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  legalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  legalText: {
    fontSize: 16,
    color: '#333',
  },
  contactCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  copyrightContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  copyrightText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    marginBottom: 4,
  },
  copyrightSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
});

export default AboutScreen;
