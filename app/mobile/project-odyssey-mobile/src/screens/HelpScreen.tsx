import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const HelpScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();

  const FAQData = [
    {
      question: "What is Athena?",
      answer: "Athena is your personal AI cybersecurity companion that helps you understand and improve your digital security through interactive features like phishing detection games and digital footprint analysis."
    },
    {
      question: "How does the Digital Footprint Analysis work?",
      answer: "Our Digital Footprint feature analyzes your email address to check for data breaches, social media presence, and provides recommendations to improve your online privacy and security."
    },
    {
      question: "Is my data safe with Athena?",
      answer: "Yes! We prioritize your privacy. All analysis is performed securely, and we don't store your personal information. The app uses free, publicly available databases for security checks."
    },
    {
      question: "How can I improve my security score?",
      answer: "Your security score is based on various factors including known data breaches, online exposure, and privacy settings. Follow the recommendations provided after each analysis to improve your score."
    },
    {
      question: "What should I do if I find my data in a breach?",
      answer: "If your data appears in a breach: 1) Change your password immediately, 2) Enable two-factor authentication, 3) Monitor your accounts for suspicious activity, 4) Consider using a password manager."
    }
  ];

  const ContactOptions = [
    {
      title: "Email Support",
      subtitle: "Get help via email",
      icon: "envelope",
      action: () => Linking.openURL('mailto:support@athena-security.com')
    },
    {
      title: "Report a Bug",
      subtitle: "Help us improve the app",
      icon: "bug",
      action: () => Alert.alert(
        "Report a Bug",
        "Please describe the issue you encountered:",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Send Report", onPress: () => Linking.openURL('mailto:bugs@athena-security.com') }
        ]
      )
    },
    {
      title: "Feature Request",
      subtitle: "Suggest new features",
      icon: "lightbulb",
      action: () => Alert.alert(
        "Feature Request",
        "We'd love to hear your ideas!",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Send Suggestion", onPress: () => Linking.openURL('mailto:features@athena-security.com') }
        ]
      )
    }
  ];

  const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <View style={styles.faqItem}>
        <TouchableOpacity 
          style={styles.faqQuestion}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.faqQuestionText}>{question}</Text>
          <FontAwesome5 
            name={expanded ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color="#666" 
          />
        </TouchableOpacity>
        {expanded && (
          <View style={styles.faqAnswer}>
            <Text style={styles.faqAnswerText}>{answer}</Text>
          </View>
        )}
      </View>
    );
  };

  const ContactItem = ({ title, subtitle, icon, action }: {
    title: string;
    subtitle: string;
    icon: string;
    action: () => void;
  }) => (
    <TouchableOpacity style={styles.contactItem} onPress={action}>
      <View style={styles.contactLeft}>
        <View style={styles.contactIcon}>
          <FontAwesome5 name={icon} size={20} color={colors.primary} />
        </View>
        <View>
          <Text style={styles.contactTitle}>{title}</Text>
          <Text style={styles.contactSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <FontAwesome5 name="chevron-right" size={16} color="#666" />
    </TouchableOpacity>
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
            <Text style={styles.headerTitle}>Help & Support</Text>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Quick Help */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Help</Text>
              <View style={styles.quickHelpCard}>
                <View style={styles.quickHelpItem}>
                  <FontAwesome5 name="play-circle" size={24} color={colors.primary} />
                  <Text style={styles.quickHelpText}>
                    New to Athena? Start with the Phishing Game to learn about online threats!
                  </Text>
                </View>
                <View style={styles.quickHelpItem}>
                  <FontAwesome5 name="shield-alt" size={24} color={colors.primary} />
                  <Text style={styles.quickHelpText}>
                    Check your Digital Footprint to see your online exposure and get security tips.
                  </Text>
                </View>
              </View>
            </View>

            {/* FAQ */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
              <View style={styles.faqContainer}>
                {FAQData.map((faq, index) => (
                  <FAQItem 
                    key={index} 
                    question={faq.question} 
                    answer={faq.answer} 
                  />
                ))}
              </View>
            </View>

            {/* Contact Support */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Support</Text>
              <View style={styles.contactContainer}>
                {ContactOptions.map((option, index) => (
                  <ContactItem
                    key={index}
                    title={option.title}
                    subtitle={option.subtitle}
                    icon={option.icon}
                    action={option.action}
                  />
                ))}
              </View>
            </View>

            {/* App Version */}
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>Athena Security App v1.0.0</Text>
              <Text style={styles.versionSubtext}>© 2025 Athena Security. All rights reserved.</Text>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  quickHelpCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 20,
  },
  quickHelpItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  quickHelpText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    lineHeight: 20,
  },
  faqContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactContainer: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${colors.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
});

export default HelpScreen;
