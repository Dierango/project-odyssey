import React, { useState, useRef } from 'react';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../styles/colors';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = menuOpen ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setMenuOpen(!menuOpen);
  };

  const phishingButtonStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
  };

  const digitalFootprintButtonStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -160],
        }),
      },
    ],
  };

  const navigateToScreen = (screenName) => {
    toggleMenu(); // Close the menu
    navigation.navigate(screenName);
  };

  return (
    <ImageBackground
      source={require('../assets/home-bg.png')}
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']}
        style={[styles.gradient, { paddingBottom: insets.bottom }]}
      >
        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
          <Text style={styles.title}>Welcome to Athena</Text>
          <Text style={styles.subtitle}>Your personal AI companion</Text>
        </View>

        <View style={styles.featuresContainer}>
          <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('Chat')}>
            <FontAwesome5 name="robot" size={24} color="#fff" />
            <Text style={styles.featureText}>AI Cyber Assistant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('Phishing Game')}>
            <FontAwesome5 name="fish" size={24} color="#fff" />
            <Text style={styles.featureText}>Phishing Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('Digital Footprint')}>
            <FontAwesome5 name="user-secret" size={24} color="#fff" />
            <Text style={styles.featureText}>Digital Footprint</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  header: {
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
  featuresContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  featureCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  menuButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HomeScreen;
